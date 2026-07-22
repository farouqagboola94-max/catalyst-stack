# Integration Manifest

Where each uploaded artifact landed in the terminal. Everything is wired or
stored — nothing was dropped.

## Skills (the big one)
- **CatalystOS_Skills_v2.zip** → `skills/` — 50 skill `.md` files across 11
  category folders (ai, content, design, engineering, integration, marketing,
  product, research, seo, social, video) plus `skills.sh` CLI and the loader.
  Served live at `GET /skills.json`; visual pages at `/skills` and
  `/skills/cheatsheet`.

## Arsenal cards (show up on the rack at `/arsenal`)
- **catalystosmodelrouter.zip** → engine at `modules/model-router/` + card
  `arsenal/model-router.arsenal.json` (codename **THE SWITCHBOARD**, the
  text/agent lane beside ComfyUI's video lane).
- **CatalystOS_Reddit_Intelligence.zip** → `modules/reddit-intelligence/` +
  card `arsenal/reddit-intelligence.arsenal.json` (**DEEP LISTENING**).
- **catalystmcpcarousel.zip** → `modules/mcp-carousel/` + card
  `arsenal/mcp-carousel.arsenal.json` (**FORGE CAROUSEL**).
- **catalystosarsenal.zip** → `arsenal/reference/` — the rich master
  arsenal registry + its tier/integration docs, kept as reference.

## Web pages (served by the app)
- **catalyst_ceo_slide.html** → `web/ceo-slide.html` → `GET /ceo`
- **CatalystOS_Skills_Registry.html** → `web/skills-registry.html` → `GET /skills`
- **CatalystOS_Skills_Cheatsheet.html** → `web/skills-cheatsheet.html` → `GET /skills/cheatsheet`
- **catalysttalentsseopatch.html** → `web/seo/catalyst-talents-seo-patch.html`
  (a `<head>` SEO patch snippet — paste into the live Catalyst Talents site)
- **catalystservicesportfolio.html** (this drop's copy) → identical to the
  already-committed `web/services.html`; not duplicated.

## React component sources (stored, not built)
- **CatalystOS_Switchboard.jsx**, **catalystorgstructure.jsx**,
  **catalystpipelineextended.jsx** → `web/components/` — kept as source; they
  need a React build step to render.

## Modules pulled from the full-OS bundles
- **CatalystOS_v2_FINAL.zip** → distinct modules copied to `modules/`
  (hyperframes, vibe_trading, obsidian, fincept, autohedge, open_higgsfield,
  agentic_inbox); its top-level orchestrators + `master-index.json` →
  `reference/os-v2-final/`.
- **CatalystOS_v2.zip** → `reference/os-v2/` (project registry, setup, CLAUDE.md).

## Business / admin
- **Catalyst_Admin_and_Licensing_Pack.zip** → `business/` (licensing terms,
  workspace map, VA handoff `.docx`).

## Skipped
- Broken `mkdir` brace-expansion folders (`{autohedge,...}`, `{agents`) and
  `__pycache__` dirs — junk, not copied.
- No live API keys were present in any upload (only `sk-ant-xxx` style
  placeholders); nothing secret was committed.
