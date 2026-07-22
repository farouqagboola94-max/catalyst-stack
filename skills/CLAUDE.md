# CATALYSTOS — CLAUDE CODE SESSION CONTEXT
# Operator: Oluwatobiloba "The Catalyst" | Lagos, Nigeria
# Version: 2.0 | May 2026
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## WHO YOU ARE WORKING WITH
Catalyst Concepts — Lagos-based multi-disciplinary operator.
Five revenue streams: Events | Social Media | Marketing & PR | AI Automation | Content/IP
Current operator arc: 2023 (Fire) → 2024 (Void) → 2026 (Launch)

## ACTIVE PROJECT CODES
| Code | Project | Priority |
|------|---------|----------|
| SNEAKFEST | Sneakers Fest 2026 | HIGH — event + online platform |
| CHAMBERS | Abegbe Agboola Chambers AI | HIGH — active consulting |
| TGS | The Great Sabotage (Substack 9/12) | MEDIUM — ongoing |
| DARKMATTER | Dark Matter Manuscript | MEDIUM — 50K words |
| ZAALLYERRANDS | Za.allyErrands Platform | MEDIUM — build phase |
| VICCHAIRMANSM | Vice Chairman Social | ACTIVE — retainer |
| CATALYSTOS | OS Infrastructure | CONTINUOUS |

---

## TECH STACK
- Backend: FastAPI + Python 3.11+
- Frontend: React + Vite
- Orchestration: Docker Compose (10 services)
- AI: Anthropic SDK (claude-sonnet-4-20250514)
- Browser Automation: Playwright MCP
- Vector DB: ChromaDB
- Video Gen: Higgsfield Seedance 2.0 (via Playwright)
- Knowledge Base: Obsidian + Git Sync
- Ports: Orchestrator 8000 | Dashboard 5173

## BRAND DEFAULTS
Palette: Void Black #0a0a0a | Forge Orange #FF6B2C | Cold Steel #C0C0C0
Type: JetBrains Mono (code/data) + DM Sans (body)
Sneakers Fest: Amber #FFA500 | Neon Green #39FF14 | Grain 35mm

---

## WRITING PROTOCOL (NON-NEGOTIABLE)
- Contractions always: don't, can't, won't, it's
- NO hyphens between words — spaces only
- NO em-dashes
- BANNED: "Imagine this," "In today's landscape," "leverage," "synergy," "utilize"
- Hook first in every piece of writing
- The Void Perspective: analytical, direct, no sentimentality

---

## SKILLS SYSTEM — 48 SKILLS AVAILABLE

The CatalystOS Skills Hub lives at: `skills/`
Load any skill via CLI: `./skills/skills.sh <skill-name>`
Load via API: `GET /skills/<skill-name>` (port 8000)
Load via Python: `python3 skills/integration/skills_loader.py <skill-name>`

### QUICK REFERENCE — TOP SKILLS BY USE CASE

**Starting any content task?** → `hook-generator` first. Always.
**Writing a Reel?** → `reels-scripting + hook-generator + voice-builder`
**Building UI?** → `frontend-design` (read it before touching code)
**Research task?** → `deep-research` → `evidence-dialogue` (for decisions)
**Before publishing anything?** → `post-scorer + humanizer`
**Client social strategy?** → `social-media-os + tweetclaw`
**AI consulting proposal?** → `ai-transformation + pm-skills`
**Sneakers Fest assets?** → `canvas-design + gpt-image-2 + ai-video-production`
**Substack essay?** → `beautiful-prose + voice-builder + humanizer`

### FULL SKILL MAP

**DESIGN (9):** frontend-design · claudedesign · design-auditor · nothing-design · canvas-design · drawn-diagrams · algorithmic-art · color-expert · gpt-image-2

**CONTENT (10):** social-media-os · voice-builder · reels-scripting · post-scorer · youtube-thumbnail · hook-generator · humanizer · notebook-llm · beautiful-prose · x-article-publisher

**SOCIAL (3):** tweetclaw · twitter-optimizer · sm-research

**MARKETING (8):** wondelai · marketing-skills · email-marketing · competitive-ads · deep-research · academic-research · kim-barrett · marketing-module

**RESEARCH (3):** autoresearch · evidence-dialogue · jtbd-interview

**VIDEO (3):** remotion · ai-video-production · generative-media

**ENGINEERING (7):** superpowers · repomix · antfu · dev-browser · vexor-search · skill-seekers · web-scraper

**SEO (1):** geo-seo

**PRODUCT (2):** pm-skills · daydream

**AI (2):** ai-transformation · ai-music-album

### SMART STACKS (Pre-built combinations)
```
write-reel      → reels-scripting + hook-generator + voice-builder
write-post      → hook-generator + voice-builder + post-scorer + humanizer
build-ui        → frontend-design + design-auditor
build-campaign  → marketing-skills + hook-generator + kim-barrett + competitive-ads
ai-consulting   → ai-transformation + deep-research + pm-skills
ugc-video       → ai-video-production + dev-browser + reels-scripting
sneakers-fest   → canvas-design + gpt-image-2 + ai-video-production + social-media-os
substack-essay  → beautiful-prose + voice-builder + deep-research + humanizer
client-social   → social-media-os + post-scorer + tweetclaw + hook-generator
build-dashboard → frontend-design + superpowers + design-auditor
```

---

## CODE QUALITY STANDARDS
- Error handling on every external call — never assume it works
- Type hints always (Python), TypeScript strict mode (JS)
- One function = one job
- Read the skill file before writing code for any significant task
- Test before declaring done

## COMMON COMMANDS
```bash
# Start CatalystOS
./boot.sh                                    # starts orchestrator + dashboard

# Skills CLI
./skills/skills.sh --list                    # see all 48 skills
./skills/skills.sh hook-generator            # load a skill
./skills/skills.sh --stack write-reel        # load a smart stack
./skills/skills.sh --copy reels-scripting    # copy to clipboard

# Docker
docker compose up -d                         # start all services
docker compose logs -f catalystos            # watch orchestrator logs
docker compose down                          # stop all services

# Dev
uvicorn app.main:app --reload --port 8000    # FastAPI dev server
npm run dev                                  # Vite dashboard dev server
```

---

## WHEN IN DOUBT
1. Check if a skill exists for this task first (`./skills/skills.sh --list`)
2. If building UI: read `frontend-design.md` before any code
3. If writing anything: `voice-builder.md` for voice calibration
4. If making a strategic decision: `evidence-dialogue.md` — no sycophancy
5. If stuck: `daydream.md` — cross-project connection finder

*CatalystOS v2.0 | Metal Dragon | 2026 Launch*
