"""
CatalystOS — the terminal.

A small FastAPI service that ties the uploaded artifacts together into one
runnable surface:

  * Mounts the ComfyUI **video lane** router from the Open Source Arsenal
    (``arsenal/register_comfyui.py``), so the local zero-cost engine is
    queryable and health-checkable.
  * Exposes the arsenal registry (``arsenal/registry/arsenal.json``) so you can
    see every registered module.
  * Implements the Switchboard routing rule from the integration runbook: video
    jobs go to the LOCAL lane first, and fall back to the rented cloud GPU when
    local VRAM is short or the engine is offline.
  * Serves the Catalyst Concepts services portfolio at ``/`` and ``/services``.

Run it:

    uvicorn app.main:app --reload --port 7001

Then open http://127.0.0.1:7001 for the portfolio, or
http://127.0.0.1:7001/docs for the API.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Dict, List

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse

from arsenal.register_comfyui import router as comfyui_router

# --------------------------------------------------------------------------
# Paths
# --------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parent.parent
ARSENAL_DIR = Path(os.environ.get("ARSENAL_DIR", REPO_ROOT / "arsenal"))
REGISTRY_PATH = Path(
    os.environ.get("ARSENAL_REGISTRY", ARSENAL_DIR / "registry" / "arsenal.json")
)
PORTFOLIO_HTML = REPO_ROOT / "web" / "services.html"

# Where the switchboard sends video jobs when the local lane is down. Set this
# to your rented RunPod/Vast endpoint. Falls back to the ComfyUI default host so
# the route is always well-defined.
CLOUD_GPU_BASE = os.environ.get("COMFYUI_CLOUD_BASE", "")

app = FastAPI(
    title="CatalystOS",
    version="0.1.0",
    description="The terminal — Open Source Arsenal, video lane, and services surface.",
)

# The ComfyUI video lane: /arsenal/comfyui, /arsenal/comfyui/health, /generate.
app.include_router(comfyui_router)


# --------------------------------------------------------------------------
# Registry
# --------------------------------------------------------------------------

def _load_registry() -> Dict[str, Any]:
    """The arsenal is whatever cards are on the rack.

    Every ``arsenal/*.arsenal.json`` file is a module card and is the source of
    truth. Drop a new card in that folder and it shows up here — no code change,
    no rebuild. Files starting with ``_`` (e.g. the template) are skipped.

    Falls back to the compiled ``registry/arsenal.json`` snapshot if the folder
    can't be scanned (e.g. a packaged deploy).
    """
    modules: List[Dict[str, Any]] = []
    seen: set = set()
    if ARSENAL_DIR.is_dir():
        for card_path in sorted(ARSENAL_DIR.glob("*.arsenal.json")):
            if card_path.name.startswith("_"):
                continue
            try:
                card = json.loads(card_path.read_text(encoding="utf-8"))
            except (json.JSONDecodeError, OSError):
                continue
            mod_id = card.get("id")
            if mod_id and mod_id not in seen:
                seen.add(mod_id)
                modules.append(card)
    if modules:
        return {"modules": modules}
    if REGISTRY_PATH.exists():
        return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    return {"modules": []}


@app.get("/arsenal", tags=["arsenal"])
def list_arsenal() -> Dict[str, Any]:
    """List every module registered in the Open Source Arsenal."""
    registry = _load_registry()
    modules: List[Dict[str, Any]] = registry.get("modules", [])
    return {
        "count": len(modules),
        "registry": str(REGISTRY_PATH),
        "modules": [
            {
                "id": m.get("id"),
                "codename": m.get("codename"),
                "display_name": m.get("display_name"),
                "tier": m.get("tier"),
                "category": m.get("category"),
                "status": m.get("status"),
                "lane": m.get("routing", {}).get("lane"),
            }
            for m in modules
        ],
    }


# --------------------------------------------------------------------------
# Switchboard — video lane routing (runbook §4)
# --------------------------------------------------------------------------

async def _local_video_lane_up() -> Dict[str, Any]:
    """Probe the local ComfyUI engine health endpoint from the module record."""
    registry = _load_registry()
    module = next((m for m in registry.get("modules", []) if m.get("id") == "comfyui"), None)
    if module is None:
        return {"up": False, "reason": "comfyui not registered in arsenal"}

    runtime = module.get("runtime", {})
    base = os.environ.get("COMFYUI_API_BASE", runtime.get("api_base", "http://127.0.0.1:8188"))
    health_ep = runtime.get("health_endpoint", "/system_stats")
    url = base.rstrip("/") + health_ep
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(url)
        return {"up": resp.status_code == 200, "endpoint": url, "status_code": resp.status_code}
    except Exception as exc:  # engine offline / unreachable
        return {"up": False, "endpoint": url, "error": str(exc)}


@app.post("/switchboard/video", tags=["switchboard"])
async def route_video_job(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Route a video job to the local lane first, cloud GPU as fallback.

    Body: ``{"workflow": <comfyui api-format json>, "project_code": "WC2026"}``

    Returns the lane chosen and (when routed) the engine's queue response. The
    lane choice is logged to stdout so you can track the local-vs-paid split,
    the same way the 80/20 model split is tracked.
    """
    workflow = payload.get("workflow")
    project_code = payload.get("project_code", "UNSPECIFIED")

    local = await _local_video_lane_up()
    if local.get("up"):
        lane, base = "LOCAL_ZERO_COST", os.environ.get("COMFYUI_API_BASE", "http://127.0.0.1:8188")
    elif CLOUD_GPU_BASE:
        lane, base = "CLOUD_GPU_FALLBACK", CLOUD_GPU_BASE
    else:
        # No local engine and no cloud fallback configured.
        print(f"[switchboard] project={project_code} lane=NONE (local down, no cloud base)")
        raise HTTPException(
            status_code=503,
            detail=(
                "Local video lane is down and COMFYUI_CLOUD_BASE is not set. "
                "Start ComfyUI locally or configure a rented GPU endpoint."
            ),
        )

    print(f"[switchboard] project={project_code} lane={lane} base={base}")

    if not workflow:
        # No workflow to queue — this was a routing probe. Report the decision.
        return {"routed": False, "lane": lane, "base": base, "local_health": local}

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(base.rstrip("/") + "/prompt", json={"prompt": workflow})
        resp.raise_for_status()
        return {"routed": True, "lane": lane, "base": base, "engine_response": resp.json()}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"{lane} engine call failed: {exc}")


# --------------------------------------------------------------------------
# Portfolio + root
# --------------------------------------------------------------------------

@app.get("/", response_class=HTMLResponse, tags=["web"])
@app.get("/services", response_class=HTMLResponse, tags=["web"])
def services_portfolio() -> HTMLResponse:
    """Serve the Catalyst Concepts services portfolio page."""
    if PORTFOLIO_HTML.exists():
        return HTMLResponse(PORTFOLIO_HTML.read_text(encoding="utf-8"))
    raise HTTPException(status_code=404, detail=f"Missing {PORTFOLIO_HTML.name}")


@app.get("/status", tags=["system"])
async def status() -> JSONResponse:
    """One-shot health of the whole terminal: registry + video lane."""
    registry = _load_registry()
    local = await _local_video_lane_up()
    return JSONResponse(
        {
            "os": "CatalystOS",
            "version": app.version,
            "arsenal_modules": len(registry.get("modules", [])),
            "video_lane": {
                "engine": "comfyui",
                "up": local.get("up", False),
                "detail": local,
                "cloud_fallback_configured": bool(CLOUD_GPU_BASE),
            },
            "portfolio_available": PORTFOLIO_HTML.exists(),
        }
    )
