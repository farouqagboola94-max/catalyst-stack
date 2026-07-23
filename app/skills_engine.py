"""
Skills Engine — the lit-up lane.

Turns the ``skills/`` folder of 50 markdown skills into a live, queryable
service. This is the API the CatalystOS Skills Cheatsheet promised
(``/skills/``, ``/skills/{id}``, ``/skills/category/{cat}``,
``/skills/search``, ``/skills/stack``) — implemented for real against the
actual skill files, with zero external API keys required.

Each skill file is ``skills/<category>/<name>.md`` with optional YAML-ish
frontmatter:

    ---
    skill: hook-generator
    category: Content | Copywriting
    catalyst_use: ...
    ---
    # ... markdown body ...

Mounted under ``/api/skills`` so it never collides with the HTML pages served
at ``/skills`` and ``/skills/cheatsheet``.
"""

from __future__ import annotations

import os
import re
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, List, Optional

import httpx
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = REPO_ROOT / "skills"

router = APIRouter(prefix="/api/skills", tags=["skills-engine"])

# --------------------------------------------------------------------------
# The brain. An OpenAI-compatible chat endpoint — point it at the model-router,
# or straight at a free provider (OpenRouter / NVIDIA NIM / DeepSeek, all
# OpenAI-compatible). Configure via env; see .env.example.
#   CATALYST_LLM_BASE   default http://127.0.0.1:3456/v1  (the local router)
#   CATALYST_LLM_KEY    required to actually execute (blank = dry-run mode)
#   CATALYST_LLM_MODEL  default deepseek/deepseek-chat
# --------------------------------------------------------------------------
LLM_BASE = os.environ.get("CATALYST_LLM_BASE", "http://127.0.0.1:3456/v1")
LLM_KEY = os.environ.get("CATALYST_LLM_KEY", "")
LLM_MODEL = os.environ.get("CATALYST_LLM_MODEL", "deepseek/deepseek-chat")


class RunRequest(BaseModel):
    input: str
    model: Optional[str] = None
    max_tokens: int = 1200


def _call_llm(system: str, user: str, model: Optional[str], max_tokens: int) -> Dict[str, Any]:
    """Call the configured OpenAI-compatible brain.

    With no CATALYST_LLM_KEY set, returns a dry-run: exactly what WOULD be sent
    and where. The wiring is proven; add a key and the same call goes live.
    """
    target = LLM_BASE.rstrip("/") + "/chat/completions"
    chosen = model or LLM_MODEL
    if not LLM_KEY:
        return {
            "executed": False,
            "reason": "No CATALYST_LLM_KEY set — dry run. Set it (see .env.example) to run for real.",
            "would_send": {
                "endpoint": target,
                "model": chosen,
                "system_prompt_chars": len(system),
                "system_prompt_preview": system[:200],
                "user_input": user,
            },
        }
    payload = {
        "model": chosen,
        "max_tokens": max_tokens,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    }
    headers = {"Authorization": f"Bearer {LLM_KEY}", "Content-Type": "application/json"}
    try:
        with httpx.Client(timeout=60.0) as client:
            resp = client.post(target, json=payload, headers=headers)
        resp.raise_for_status()
        data = resp.json()
        text = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        return {"executed": True, "model": chosen, "endpoint": target, "output": text}
    except Exception as exc:  # brain offline / bad key / provider error
        raise HTTPException(status_code=502, detail=f"Brain call failed ({target}): {exc}")

# Pre-built skill combinations, lifted from the Skills Cheatsheet. Each stack is
# an ordered list of skill ids you run together for a common Catalyst job.
SMART_STACKS: Dict[str, List[str]] = {
    "write-reel": ["reels-scripting", "hook-generator", "voice-builder"],
    "write-post": ["hook-generator", "voice-builder", "post-scorer", "humanizer"],
    "build-ui": ["frontend-design", "design-auditor"],
    "build-campaign": ["marketing-skills", "hook-generator", "kim-barrett", "competitive-ads"],
    "sneakers-fest": ["canvas-design", "gpt-image-2", "ai-video-production", "social-media-os"],
    "substack-essay": ["beautiful-prose", "voice-builder", "deep-research", "humanizer"],
    "ai-consulting": ["ai-transformation", "deep-research", "pm-skills"],
    "ugc-video": ["ai-video-production", "dev-browser", "reels-scripting"],
    "client-social": ["social-media-os", "post-scorer", "tweetclaw", "hook-generator"],
    "build-dashboard": ["frontend-design", "superpowers", "design-auditor"],
}

_FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def _parse_frontmatter(text: str) -> Dict[str, str]:
    """Parse the simple ``key: value`` frontmatter block, if present."""
    m = _FRONTMATTER_RE.match(text)
    if not m:
        return {}
    meta: Dict[str, str] = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            key, _, val = line.partition(":")
            meta[key.strip()] = val.strip()
    return meta


@lru_cache(maxsize=1)
def _index() -> Dict[str, Dict[str, Any]]:
    """Scan skills/ once and build an id -> record index."""
    index: Dict[str, Dict[str, Any]] = {}
    if not SKILLS_DIR.is_dir():
        return index
    for md in sorted(SKILLS_DIR.rglob("*.md")):
        # Skip docs, not skills: READMEs and any CLAUDE context file
        # (CLAUDE.md, ROOT_CLAUDE.md, CATALYSTOS_MASTER_CLAUDE.md, ...).
        if md.name == "README.md" or md.name.endswith("CLAUDE.md"):
            continue
        try:
            text = md.read_text(encoding="utf-8")
        except OSError:
            continue
        meta = _parse_frontmatter(text)
        skill_id = meta.get("skill") or md.stem
        folder = md.parent.name if md.parent != SKILLS_DIR else "root"
        # First markdown heading makes a decent title.
        title_m = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
        index[skill_id] = {
            "id": skill_id,
            "folder": folder,
            "category": meta.get("category", folder),
            "catalyst_use": meta.get("catalyst_use", ""),
            "title": title_m.group(1).strip() if title_m else skill_id,
            "path": str(md.relative_to(REPO_ROOT)),
            "_text": text,
        }
    return index


def _public(rec: Dict[str, Any]) -> Dict[str, Any]:
    """Strip the heavy body for list responses."""
    return {k: v for k, v in rec.items() if k != "_text"}


@router.get("")
def list_skills() -> Dict[str, Any]:
    """Every skill on the rack, grouped by folder."""
    idx = _index()
    by_folder: Dict[str, List[str]] = {}
    for rec in idx.values():
        by_folder.setdefault(rec["folder"], []).append(rec["id"])
    return {
        "total": len(idx),
        "categories": {k: sorted(v) for k, v in sorted(by_folder.items())},
        "stacks": sorted(SMART_STACKS.keys()),
    }


@router.get("/search")
def search_skills(q: str = Query(..., min_length=1)) -> Dict[str, Any]:
    """Full-text search across skill id, title, category, and body."""
    needle = q.lower()
    hits = [
        _public(rec)
        for rec in _index().values()
        if needle in rec["id"].lower()
        or needle in rec["title"].lower()
        or needle in rec["category"].lower()
        or needle in rec["catalyst_use"].lower()
        or needle in rec["_text"].lower()
    ]
    return {"query": q, "count": len(hits), "results": sorted(hits, key=lambda r: r["id"])}


@router.get("/category/{category}")
def skills_by_category(category: str) -> Dict[str, Any]:
    """All skills whose folder matches (case-insensitive)."""
    cat = category.lower()
    hits = [_public(r) for r in _index().values() if r["folder"].lower() == cat]
    if not hits:
        raise HTTPException(status_code=404, detail=f"No skills in category '{category}'")
    return {"category": category, "count": len(hits), "skills": sorted(hits, key=lambda r: r["id"])}


@router.get("/stacks")
def list_stacks() -> Dict[str, Any]:
    """The pre-built smart stacks (skill combinations)."""
    return {"count": len(SMART_STACKS), "stacks": SMART_STACKS}


@router.get("/stack/{name}")
def get_stack(name: str) -> Dict[str, Any]:
    """Resolve a smart stack to its skills, flagging any not on the rack."""
    if name not in SMART_STACKS:
        raise HTTPException(status_code=404, detail=f"Unknown stack '{name}'. See /api/skills/stacks")
    idx = _index()
    resolved, missing = [], []
    for sid in SMART_STACKS[name]:
        (resolved.append(_public(idx[sid])) if sid in idx else missing.append(sid))
    return {"stack": name, "skills": resolved, "missing": missing}


@router.post("/stack/{name}/run")
def run_stack(name: str, req: RunRequest) -> Dict[str, Any]:
    """Run a smart stack as a chain: each skill's output feeds the next.

    e.g. POST /api/skills/stack/substack-essay/run with a voice-note transcript
    flows transcript -> beautiful-prose -> voice-builder -> deep-research ->
    humanizer, returning every step.
    """
    if name not in SMART_STACKS:
        raise HTTPException(status_code=404, detail=f"Unknown stack '{name}'. See /api/skills/stacks")
    idx = _index()
    steps: List[Dict[str, Any]] = []
    current = req.input
    for sid in SMART_STACKS[name]:
        rec = idx.get(sid)
        if rec is None:
            steps.append({"skill": sid, "skipped": "not on rack"})
            continue
        result = _call_llm(rec["_text"], current, req.model, req.max_tokens)
        steps.append({"skill": sid, "result": result})
        if result.get("executed"):
            current = result.get("output", current)  # feed forward
    return {"stack": name, "input": req.input, "steps": steps, "final_output": current}


@router.post("/{skill_id}/run")
def run_skill(skill_id: str, req: RunRequest) -> Dict[str, Any]:
    """Run one skill on your input. The skill's markdown body is the system
    prompt; your input is the user turn. Returns the model's output (or a
    dry-run preview when no brain key is configured)."""
    rec = _index().get(skill_id)
    if rec is None:
        raise HTTPException(status_code=404, detail=f"Unknown skill '{skill_id}'")
    result = _call_llm(rec["_text"], req.input, req.model, req.max_tokens)
    return {"skill": skill_id, "title": rec["title"], "input": req.input, **result}


@router.get("/{skill_id}")
def get_skill(skill_id: str) -> Dict[str, Any]:
    """Full record for one skill, including its complete markdown body.

    This is what makes the engine 'lit': the body is the skill's actual
    instructions/system-prompt, ready to feed to a model or a person.
    """
    rec = _index().get(skill_id)
    if rec is None:
        raise HTTPException(status_code=404, detail=f"Unknown skill '{skill_id}'")
    out = _public(rec)
    out["content"] = rec["_text"]
    return out
