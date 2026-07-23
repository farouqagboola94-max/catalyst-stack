"""
Video Engine — lighting up the ComfyUI lane.

Mirrors the Skills Engine pattern for the local video lane: a workflow catalog,
health, and a run endpoint that works in **dry-run** with no engine reachable
(shows exactly what it would queue and where) and goes **live** the moment a
ComfyUI engine is up at ``COMFYUI_API_BASE``.

Parked workflows live in ``workflows/**/*.json`` and can be run by name — no
pasting JSON. ComfyUI's ``/prompt`` queue wants the flat **API format** (a dict
keyed by node id); a **UI graph export** (with ``nodes``/``links``) must be
re-saved via "Save (API format)" first. This engine detects which you have and
tells you.

Mounted at ``/api/video``.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

REPO_ROOT = Path(__file__).resolve().parent.parent
WORKFLOWS_DIR = REPO_ROOT / "workflows"

ENGINE_BASE = os.environ.get("COMFYUI_API_BASE", "http://127.0.0.1:8188")
CLOUD_BASE = os.environ.get("COMFYUI_CLOUD_BASE", "")

router = APIRouter(prefix="/api/video", tags=["video-engine"])


class VideoRunRequest(BaseModel):
    workflow_name: Optional[str] = None          # a parked workflow, e.g. "seedance2_0_r2v"
    workflow: Optional[Dict[str, Any]] = None     # or raw API-format JSON


def _looks_like_api_format(wf: Dict[str, Any]) -> bool:
    """API format = a flat dict whose values carry 'class_type'. UI graph export
    has top-level 'nodes'/'links' instead."""
    if not isinstance(wf, dict) or "nodes" in wf:
        return False
    return any(isinstance(v, dict) and "class_type" in v for v in wf.values())


def _norm(stem: str) -> str:
    """Clean display name: drop a trailing '.api' / '.workflow' qualifier."""
    for suffix in (".api", ".workflow"):
        if stem.endswith(suffix):
            return stem[: -len(suffix)]
    return stem


def _catalog() -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    if not WORKFLOWS_DIR.is_dir():
        return out
    for p in sorted(WORKFLOWS_DIR.rglob("*.json")):
        try:
            wf = json.loads(p.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        api = _looks_like_api_format(wf)
        out.append({
            "name": _norm(p.stem),
            "path": str(p.relative_to(REPO_ROOT)),
            "format": "api" if api else "ui-graph",
            "runnable": api,
            "note": "" if api else "UI graph export — re-save via 'Save (API format)' before queuing.",
        })
    return out


def _find_workflow(name: str) -> Optional[Dict[str, Any]]:
    want = _norm(name)
    for p in WORKFLOWS_DIR.rglob("*.json"):
        if _norm(p.stem) == want:
            try:
                return json.loads(p.read_text(encoding="utf-8"))
            except (json.JSONDecodeError, OSError):
                return None
    return None


async def _engine_up(base: str) -> Dict[str, Any]:
    url = base.rstrip("/") + "/system_stats"
    try:
        async with httpx.AsyncClient(timeout=4.0) as c:
            r = await c.get(url)
        return {"up": r.status_code == 200, "endpoint": url, "status_code": r.status_code}
    except Exception as exc:
        return {"up": False, "endpoint": url, "error": str(exc)}


@router.get("/workflows")
def list_workflows() -> Dict[str, Any]:
    """Every parked workflow, with format detection (api vs ui-graph)."""
    cat = _catalog()
    return {"count": len(cat), "runnable": sum(w["runnable"] for w in cat), "workflows": cat}


@router.get("/health")
async def health() -> Dict[str, Any]:
    """Is the local video lane up? (clean up=false when offline)."""
    local = await _engine_up(ENGINE_BASE)
    return {
        "lane": "LOCAL_ZERO_COST",
        "engine": "comfyui",
        "base": ENGINE_BASE,
        "up": local["up"],
        "detail": local,
        "cloud_fallback_configured": bool(CLOUD_BASE),
    }


@router.post("/run")
async def run_video(req: VideoRunRequest) -> Dict[str, Any]:
    """Queue a workflow on the video lane.

    Resolve a workflow by name (from workflows/) or take raw API-format JSON.
    Local-first, cloud fallback. With no engine reachable it returns a dry-run:
    exactly what it would POST and where. With an engine up, it queues for real.
    """
    # Resolve the workflow.
    if req.workflow is not None:
        wf, source = req.workflow, "inline"
    elif req.workflow_name:
        wf = _find_workflow(req.workflow_name)
        if wf is None:
            raise HTTPException(status_code=404, detail=f"No parked workflow '{req.workflow_name}'. See /api/video/workflows")
        source = req.workflow_name
    else:
        raise HTTPException(status_code=400, detail="Provide 'workflow_name' or 'workflow'.")

    api_ready = _looks_like_api_format(wf)

    # Pick a lane: local first, cloud fallback.
    local = await _engine_up(ENGINE_BASE)
    if local["up"]:
        lane, base = "LOCAL_ZERO_COST", ENGINE_BASE
    elif CLOUD_BASE:
        lane, base = "CLOUD_GPU_FALLBACK", CLOUD_BASE
    else:
        lane, base = None, None

    # No engine anywhere -> dry-run (mirrors the skills engine).
    if lane is None:
        node_count = 0 if not isinstance(wf, dict) else (len(wf.get("nodes", [])) if "nodes" in wf else len(wf))
        return {
            "queued": False,
            "reason": "No video engine reachable (local down, no COMFYUI_CLOUD_BASE). Dry run.",
            "workflow": source,
            "format": "api" if api_ready else "ui-graph",
            "api_ready": api_ready,
            "would_send": {"endpoint": ENGINE_BASE.rstrip("/") + "/prompt", "nodes": node_count},
            "hint": "" if api_ready else "This is a UI graph export; re-save as API format before it can queue.",
        }

    # Engine is up. It can only queue API-format graphs.
    if not api_ready:
        raise HTTPException(
            status_code=422,
            detail=f"Workflow '{source}' is a UI graph export, not API format. Re-save via 'Save (API format)' in the ComfyUI web UI.",
        )
    try:
        async with httpx.AsyncClient(timeout=30.0) as c:
            r = await c.post(base.rstrip("/") + "/prompt", json={"prompt": wf})
        r.raise_for_status()
        return {"queued": True, "lane": lane, "base": base, "workflow": source, "engine_response": r.json()}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"{lane} engine call failed: {exc}")
