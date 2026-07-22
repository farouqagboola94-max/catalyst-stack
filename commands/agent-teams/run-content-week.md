# /run-content-week

---
description: AGENT TEAM — Run a full week of content production across all Catalyst OS platforms. Orchestrates content-pipeline skills in parallel. One command, one week of content output.
---

## What This Agent Team Does

Produces in a single run:
- 1 Substack article (or continuation of The Great Sabotage)
- 3 repurposed platform packages from that article
- 7 days of SMM captions for the active client(s)
- 1 Sneakers Fest weekly content drop (if in pre-event phase)

**Estimated output:** 8,000-12,000 words of content. Full week covered.

---

## Agent Assignments

### Agent 1 — Long-Form Lead
**Task:** Run /substack-draft for the week's primary piece.

Input required:
- Topic or series part number
- Any specific angle or recent event to incorporate

Output: Full Substack article

### Agent 2 — Distribution Machine
**Task:** Run /repurpose-content on Agent 1's output immediately after it's complete.

Input: Agent 1's Substack article
Output: LinkedIn post, Twitter thread, IG carousel script, WhatsApp broadcast

### Agent 3 — SMM Client Engine
**Task:** Run /write-caption for 7 posts across active SMM clients.

Input required:
- Which clients are active this week
- Any specific products, events, or campaigns running

Output: 7 captions with visual directions (distribute across clients as specified)

### Agent 4 — Sneakers Fest Pulse
**Task:** Run /sneakers-fest-promo for this week's event phase.

Input required:
- Current phase (pre-event announcement / countdown / week-of)
- Any vendor confirmed this week worth spotlighting

Output: 2 Sneakers Fest posts (hype + culture versions)

---

## Run Instructions

```bash
claude /run-content-week
```

Claude will ask for the following before starting:
1. Substack topic or part number
2. Active SMM clients this week
3. Sneakers Fest phase
4. Any specific briefs or campaign context

All agents run sequentially (Agent 1 → 2 → 3 → 4). Agent 2 waits for Agent 1 output.

---

## Output Package

```
CATALYST OS — WEEK [X] CONTENT PACKAGE
Generated: [Date]

---
LONG-FORM:
[Substack article]

---
DISTRIBUTION:
[LinkedIn / Twitter / IG / WhatsApp]

---
SMM CLIENT CAPTIONS:
[7 captions with visual briefs]

---
SNEAKERS FEST:
[2 promo posts]

---
PRODUCTION NOTES:
[Any flags, gaps, or items needing human review]
```

---

## Scheduling Notes

After output, copy captions directly into Buffer, Later, or Meta Business Suite for scheduling. Substack draft goes into drafts folder. LinkedIn and Twitter post manually or via Buffer.
