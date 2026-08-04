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

## Drop 3 — dashboards, hubs, master registry, command playbooks
- **CatalystOS_AI_Hub_v2.html** → `web/ai-hub.html` (`/ai-hub`, 60 tools);
  **CatalystOS_AI_Hub.html** (v1) → `web/ai-hub-v1.html`.
- **catalyst_os_skills_hub.html** → `web/skills-hub.html` (`/skills/hub`);
  the duplicate copy was dropped.
- **CatalystOS_Dashboard.jsx**, **CatalystOS_SkillsOS.jsx** (one of two identical),
  **catalystosaiarsenal.jsx**, and both **catalystskillvault.jsx** variants
  (OS-packs + base) → `web/components/`.
- **CATALYST_OS_MASTER_REGISTRY.json** (2,393 skills across 4 sources) →
  `arsenal/reference/master-skills-registry.json`.
- **catalystosclaudecode.zip** → `commands/` — Claude Code command playbooks by
  project (chambers-legal, sneakers-fest, content-pipeline, smm-clients,
  agent-teams).
- **CatalystOS_v1.zip** → `reference/os-v1/`.
- **CatalystOS_AI4AnimationPy_Integration.docx** → `business/`.

## ⚡ Engine lit: the Skills Engine
`app/skills_engine.py` — mounted at `/api/skills`. Reads the 50 real skill
files and serves the API the Skills Cheatsheet promised: list, get-full-body,
search, by-category, and smart-stacks. Works with **no external API keys** and
is verified end-to-end (see the commit's test run).

## Skipped
- Broken `mkdir` brace-expansion folders (`{autohedge,...}`, `{agents`) and
  `__pycache__` dirs — junk, not copied.
- No live API keys were present in any upload (only `sk-ant-xxx` style
  placeholders); nothing secret was committed.
