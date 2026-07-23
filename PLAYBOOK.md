# CatalystOS Playbook

Five plays, each a step-by-step runbook anyone on the team can follow. They all
run on the same terminal: the **Skill Runner** (`/runner`), the **Skills
Engine** API (`/api/skills/...`), and the Claude Code **command playbooks** in
[`commands/`](./commands).

> New here? Read [`README.md`](./README.md) first, then do the one-time setup
> below.

---

## One-time setup

```bash
pip install -r requirements.txt
cp .env.example .env          # then add ONE key (see "Pick a brain" below)
uvicorn app.main:app --port 7001
```

Open **http://127.0.0.1:7001/runner**. The badge shows **DRY-RUN** until a key
is set, **LIVE** once it is.

### Pick a brain (two options)

**A — Straight to a free provider (simplest).** In `.env`:
```
CATALYST_LLM_BASE=https://openrouter.ai/api/v1
CATALYST_LLM_KEY=sk-or-v1-YOURKEY        # free at openrouter.ai/keys
CATALYST_LLM_MODEL=deepseek/deepseek-chat
```

**B — Zero-cost through your local model-router** (`modules/model-router`,
THE SWITCHBOARD). Start the router, then point the engine at it — one brain for
the whole OS, spend under your control:
```
# 1. configure + launch the router (see modules/model-router/README.md)
#    it exposes an OpenAI-compatible endpoint on a local port
# 2. in .env, point the engine at it:
CATALYST_LLM_BASE=http://127.0.0.1:3456/v1
CATALYST_LLM_KEY=local                    # any non-empty value flips it LIVE
CATALYST_LLM_MODEL=deepseek/deepseek-chat
```
Either way, the Runner and every play below work unchanged. Check
`GET /status` → `skills_engine.mode` to confirm.

---

## Play 1 — Voice note → a week of content
**Stream:** Content & IP · **Runs:** the `substack-essay` + `write-reel` stacks.

1. Record/transcribe a voice note (2–5 min of raw thinking).
2. Open `/runner`, pick stack **`substack-essay`**, paste the transcript, **Run**.
   → chain: `beautiful-prose → voice-builder → deep-research → humanizer`.
   The final step is a publish-ready Substack draft in your voice.
3. Same transcript, stack **`write-reel`** → 3 Reels/Shorts scripts.
4. Want a thread too? Run skill **`x-article-publisher`** or **`social-media-os`**.
5. Polish anything with **`humanizer`** before publishing.

**You get:** one recording → Substack essay + Reels scripts + thread, all
on-voice. Also available as CLI playbooks in
`commands/content-pipeline/` (voice-to-content, substack-draft, repurpose-content).

---

## Play 2 — Run an SMM client on the ₦100k retainer
**Stream:** Social Media Management · **Runs:** the `client-social` stack.

1. `/runner` → stack **`client-social`** (`social-media-os → post-scorer →
   tweetclaw → hook-generator`). Input: the client brand brief + this week's goal.
2. For each planned post, run **`hook-generator`** then **`post-scorer`** to
   grade it before it ships.
3. Month-end: use `commands/smm-clients/smm-report.md` to generate the report.
4. Calendar: `commands/smm-clients/build-content-calendar.md`.

**You get:** a repeatable monthly pipeline (30 posts + report) so you can take
more retainers without more hours.

---

## Play 3 — Sneakers Fest 2026 marketing engine
**Stream:** Event Management · **Runs:** the `sneakers-fest` stack + video lane.

1. `/runner` → stack **`sneakers-fest`** (`canvas-design → gpt-image-2 →
   ai-video-production → social-media-os`). Input: the campaign beat (early-bird,
   vendor call, countdown…).
2. Sponsor + vendor docs: `commands/sneakers-fest/vendor-comms.md`,
   `sneakers-fest-promo.md`.
3. Hype reels at **zero cost**: the **Video Engine** —
   `GET /api/video/workflows` to see parked graphs, then
   `POST /api/video/run {"workflow_name":"seedance2_0_r2v"}`. Dry-run with no
   engine (shows what it would queue); live the moment ComfyUI is up at
   `COMFYUI_API_BASE` (needs a GPU — see `docs/comfyui_integration_runbook.md`).
   Note: re-save the parked Seedance graph via ComfyUI's "Save (API format)"
   before it can queue (the engine flags this for you).

**You get:** sponsor decks, vendor outreach, and clip beds from one system,
feeding the Dec 12 build-up.

---

## Play 4 — AI consulting deliverables you can sell
**Stream:** AI Automation Consulting · **Runs:** the `ai-consulting` stack.

1. `/runner` → stack **`ai-consulting`** (`ai-transformation → deep-research →
   pm-skills`). Input: the prospect's business + pain point.
   → a 60-day AI Integration Blueprint draft.
2. **The demo IS the product.** In the pitch, open `/arsenal`, `/api/skills`,
   and `/runner` live. You're not describing an AI operation — you're standing
   on one.
3. Package with skill **`marketing-skills`** for the proposal copy.

**You get:** a repeatable blueprint + a live proof-of-competence that closes.

---

## Play 5 — Chambers legal batch work
**Stream:** Content / Legal · **Runs:** `commands/chambers-legal/`.

1. `commands/chambers-legal/draft-affidavit.md` — case notes → Nigerian-court
   affidavit.
2. `draft-particulars.md`, `format-legal-doc.md` for the rest.
3. Batch a set with `commands/agent-teams/run-chambers-batch.md`.

**You get:** court-formatted drafts on demand instead of from scratch.

---

## The daily loop
1. `GET /status` — is the brain LIVE? what's on the rack?
2. `/runner` — run the play you need.
3. New capability? Drop a `*.arsenal.json` card (see `arsenal/README.md`) or a
   skill `.md` in `skills/<category>/` — it shows up automatically.

## Honest limits
- **Text plays (1,2,4,5) run today** through the one brain. Add your key, go.
- **Video (Play 3)** needs a GPU for the ComfyUI lane; the rest of the play
  (docs, copy) runs on text.
- Some connectors (Stripe, Tavily, Otter, …) need authorizing in your
  claude.ai connector settings before those specific lanes work.
