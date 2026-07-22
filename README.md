# CATALYST STACK — The Terminal

CatalystOS backend surface. One FastAPI app ties the pieces together: the Open
Source **Arsenal** (registered modules), the local zero-cost **video lane**
(ComfyUI), the **Switchboard** that routes video jobs local-first with a cloud
GPU fallback, the curated **300-repo fork script**, and the Catalyst Concepts
**services portfolio**.

## 🗂 Layout

```
app/
  main.py                     # CatalystOS FastAPI app — mounts everything below
arsenal/
  register_comfyui.py         # video-lane router + idempotent registry upsert
  comfyui.arsenal.json        # canonical ComfyUI module record (FORGE REEL, GRAIL)
  registry/arsenal.json       # the merged arsenal registry (generated)
workflows/
  comfyui/seedance2_0_r2v.api.json  # Seedance 2.0 reference→video graph
  README.md                   # graph-export vs API-format note
web/
  services.html               # Catalyst Concepts services portfolio
docs/
  comfyui_integration_runbook.md    # stand-up + wiring runbook
fork_300.sh                   # 300-repo fork script
.github/workflows/fork-300.yml      # monthly + manual fork automation
requirements.txt
```

## 🚀 Run the terminal

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 7001
```

| Route | What it does |
|-------|--------------|
| `GET /` and `GET /services` | Catalyst Concepts services portfolio (HTML) |
| `GET /status` | Whole-terminal health: arsenal count + video lane |
| `GET /arsenal` | List every registered arsenal module |
| `GET /arsenal/comfyui` | Full ComfyUI module record |
| `GET /arsenal/comfyui/health` | Ping the local engine — clean `up: true/false` |
| `POST /arsenal/comfyui/generate` | Queue a workflow on the local engine |
| `POST /switchboard/video` | Route a video job local-first, cloud fallback |
| `GET /docs` | Interactive API docs |

### Environment

| Var | Purpose | Default |
|-----|---------|---------|
| `COMFYUI_API_BASE` | Local (or rented) ComfyUI engine | `http://127.0.0.1:8188` |
| `COMFYUI_CLOUD_BASE` | Cloud GPU fallback for the Switchboard | *(unset → local only)* |
| `ARSENAL_REGISTRY` | Path to the registry json | `arsenal/registry/arsenal.json` |

## 🎬 Video lane (ComfyUI)

The local, zero-token-cost video engine. Stand it up and wire it in with
[`docs/comfyui_integration_runbook.md`](./docs/comfyui_integration_runbook.md).
Re-register the module any time you edit its record (idempotent, upserts by id):

```bash
python arsenal/register_comfyui.py --registry arsenal/registry/arsenal.json
```

The Switchboard hits the local lane first; when the engine is offline (or you
set `COMFYUI_CLOUD_BASE`) it falls back to the rented GPU and logs the lane
choice so you can track the local-vs-paid split.

## 🍴 300-repo fork script

Forks 300 curated repos across 23 AI/ML categories into your personal account
(you get admin on every fork).

```bash
gh auth login        # needs a token with repo + workflow scope
bash fork_300.sh
```

Or let CI do it: [`.github/workflows/fork-300.yml`](./.github/workflows/fork-300.yml)
runs on the 1st of each month and on manual **Run workflow**. It needs a
`FORK_TOKEN` repo secret (PAT with `repo` + `workflow` scope) — the default
`GITHUB_TOKEN` can't fork to a personal account.

<details>
<summary>The 23 categories (300 repos)</summary>

1. ComfyUI Core Ecosystem (15) · 2. Image Generation Engines & UIs (15) ·
3. Video Generation Models (15) · 4. Character Consistency & LoRA Training (10) ·
5. Face, Enhancement & Visual Tools (10) · 6. Anime, Comic & Creative AI (8) ·
7. Audio Generation & Speech (12) · 8. Local LLM & Inference (12) ·
9. AI Agent Frameworks (15) · 10. RAG & Vector Databases (10) ·
11. FastAPI & Backend Infrastructure (12) · 12. MCP Servers & Tools (12) ·
13. Web Scraping & Data Collection (10) · 14. Media Download & Video Tools (10) ·
15. Social Media Automation (10) · 16. Football & Sports Data — WC2026 (8) ·
17. Monitoring & Observability (10) · 18. AI SDK & Dev Tools (12) ·
19. Deployment & Self-Hosting (10) · 20. Data Viz, Dashboards & Workflow (10) ·
21. Computer Vision & ML Libraries (10) · 22. Creative Content Pipelines (10) ·
23. Agentic AI Research & Tools (8)

</details>

## 🧩 Claude Code plugins

This repo enables 5 Claude Code plugins for everyone who works in it — see
[`.claude/PLUGINS.md`](./.claude/PLUGINS.md).

## 📜 License

MIT
