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

import re
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException, Query

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = REPO_ROOT / "skills"

router = APIRouter(prefix="/api/skills", tags=["skills-engine"])

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
        if md.name in ("README.md", "CLAUDE.md"):
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
