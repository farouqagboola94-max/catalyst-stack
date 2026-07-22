"""
register_comfyui.py

Two jobs:
  1. Idempotently merge the ComfyUI module record into your Open Source
     Arsenal registry (a json file).
  2. Expose a FastAPI router you can mount in CatalystOS so the module is
     queryable and its local engine is health checkable.

This is a drop in. It writes to disk and to your registry only. It does not
touch any live system I cannot see, so you run it inside your own repo.

Usage:
    # register into the arsenal file
    python register_comfyui.py --registry ./registry/arsenal.json

    # mount the router in your FastAPI app
    from register_comfyui import router as comfyui_router
    app.include_router(comfyui_router)
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any, Dict

import httpx
from fastapi import APIRouter, HTTPException

# --------------------------------------------------------------------------
# Module record. Kept in sync with comfyui.arsenal.json. If you edit one,
# edit both, or load the json instead of this dict.
# --------------------------------------------------------------------------

MODULE_PATH = Path(__file__).with_name("comfyui.arsenal.json")


def load_module() -> Dict[str, Any]:
    """Load the canonical module record from the json next to this file."""
    if MODULE_PATH.exists():
        return json.loads(MODULE_PATH.read_text(encoding="utf-8"))
    raise FileNotFoundError(
        f"Cannot find {MODULE_PATH.name}. Keep it beside this script."
    )


# --------------------------------------------------------------------------
# Registry merge. Idempotent upsert by module id.
# --------------------------------------------------------------------------

def register(registry_path: str) -> Dict[str, Any]:
    """Upsert the ComfyUI module into the arsenal registry json.

    Registry shape assumed: {"modules": [ {...}, {...} ]}.
    If your registry is shaped differently, change the two marked lines.
    """
    module = load_module()
    path = Path(registry_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    if path.exists():
        registry = json.loads(path.read_text(encoding="utf-8"))
    else:
        registry = {"modules": []}

    modules = registry.setdefault("modules", [])  # <- change key if needed
    existing = next((i for i, m in enumerate(modules) if m.get("id") == module["id"]), None)

    if existing is None:
        modules.append(module)
        action = "added"
    else:
        modules[existing] = module  # <- overwrite by id
        action = "updated"

    path.write_text(json.dumps(registry, indent=2, ensure_ascii=False), encoding="utf-8")
    return {"action": action, "id": module["id"], "registry": str(path), "count": len(modules)}


# --------------------------------------------------------------------------
# FastAPI router. Mount this in CatalystOS.
# --------------------------------------------------------------------------

router = APIRouter(prefix="/arsenal/comfyui", tags=["arsenal", "comfyui", "video"])


def _module() -> Dict[str, Any]:
    try:
        return load_module()
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("")
def get_module() -> Dict[str, Any]:
    """Return the full ComfyUI module record."""
    return _module()


@router.get("/health")
async def health() -> Dict[str, Any]:
    """Ping the local ComfyUI engine and report whether the video lane is up.

    Hits the engine health endpoint from the module record. If the engine is
    not running, this returns up=False rather than throwing, so the dashboard
    can show a clean offline state.
    """
    mod = _module()
    base = os.environ.get("COMFYUI_API_BASE", mod["runtime"]["api_base"])
    health_ep = mod["runtime"].get("health_endpoint", "/system_stats")
    url = base.rstrip("/") + health_ep
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(url)
        return {
            "lane": "LOCAL_ZERO_COST",
            "up": resp.status_code == 200,
            "status_code": resp.status_code,
            "endpoint": url,
            "engine": resp.json() if resp.headers.get("content-type", "").startswith("application/json") else None,
        }
    except Exception as exc:  # engine offline or unreachable
        return {"lane": "LOCAL_ZERO_COST", "up": False, "endpoint": url, "error": str(exc)}


@router.post("/generate")
async def generate(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Queue a workflow on the local engine.

    STUB. ComfyUI runs workflows as a node graph posted as json to /prompt.
    Wiring this fully means you export a saved workflow from the ComfyUI web
    UI (Save (API format)), then post it here with your prompt text or input
    image swapped in. I left it as a guarded stub because the exact workflow
    json depends on which model and graph you settle on.
    """
    mod = _module()
    base = os.environ.get("COMFYUI_API_BASE", mod["runtime"]["api_base"])
    workflow = payload.get("workflow")
    if not workflow:
        raise HTTPException(
            status_code=400,
            detail="Provide a ComfyUI workflow json under 'workflow'. Export it from the web UI via Save (API format).",
        )
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(base.rstrip("/") + "/prompt", json={"prompt": workflow})
        resp.raise_for_status()
        return {"queued": True, "engine_response": resp.json()}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Engine call failed: {exc}")


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Register ComfyUI into the Arsenal registry.")
    parser.add_argument(
        "--registry",
        default="./registry/arsenal.json",
        help="Path to your arsenal registry json (default ./registry/arsenal.json)",
    )
    args = parser.parse_args()
    result = register(args.registry)
    print(json.dumps(result, indent=2))
