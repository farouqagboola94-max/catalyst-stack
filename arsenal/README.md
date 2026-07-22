# The Arsenal — your rack of tools

Everything CatalystOS can reach is a **card** in this folder: one
`*.arsenal.json` file per tool, engine, connector, or capability you own.

## The one rule

**Drop a `something.arsenal.json` card here → it shows up at `/arsenal`
automatically.** No code change, no rebuild. The running app scans this folder
and treats every card as source of truth. (Files starting with `_`, like the
template, are ignored.)

## Add a tool in 3 steps

1. Copy `_TEMPLATE.arsenal.json` to `yourtool.arsenal.json`.
2. Fill in the fields (at minimum a unique `id`, `display_name`, `one_liner`).
3. Save. Hit `GET /arsenal` — it's on the rack.

That covers **cataloging** any tool. If the tool also needs the OS to *talk to a
live engine* (like ComfyUI does), it additionally ships a small router:

- See `register_comfyui.py` for the pattern (a FastAPI `APIRouter` with
  `/health` and action endpoints), then mount it in `app/main.py` with
  `app.include_router(...)`.

## Card categories (all live here, `category` field tells them apart)

| category | what it is | needs a router? |
|----------|-----------|-----------------|
| `video_generation_local`, `image`, `audio`, `llm`, ... | an engine/app you run | yes, if you want the OS to drive it live |
| `connector` | a hand into another app (Airtable, Notion, Gmail) | the "plug" is the MCP/API connection; the card just documents it |
| `skill` | a named routine you've built (points at `skills/`) | no |

## What's on the rack now

| id | codename | category |
|----|----------|----------|
| `comfyui` | FORGE REEL | video_generation_local |
| `model-router` | THE SWITCHBOARD | llm_router |
| `reddit-intelligence` | DEEP LISTENING | audience_intelligence |
| `mcp-carousel` | FORGE CAROUSEL | content_component |

The rich master registry (many more tools, tiers, revenue-stream mappings) is
kept for reference in [`reference/arsenal-registry.json`](./reference/arsenal-registry.json).

Just tell me the name + drop the file, and I'll write the card (and the router,
if it needs one) for you.
