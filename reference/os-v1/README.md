# CatalystOS SkillsOS v1.0
**The Catalyst — Lagos, Nigeria | 2026 Operational Build**

---

## What's in the OS

```
CatalystOS/
├── build_skills_index.py          # Skills index builder (run this first)
├── master-index.json              # Full skills database (70 skills, 7 categories)
├── master-index.md                # Human-readable skills index
├── dashboard/
│   └── public/skills-db/
│       └── master-index.json      # Skills data served to dashboard
├── integrations/
│   └── agent/
│       └── catalyst_agent.py      # Legal automation agent (port 5000)
├── legal/abegbe/                  # Abegbe Agboola Chambers workspace
└── workspace/                     # Generated document output folder
```

## Skills Index — 70 Skills Across 7 Categories

| Category | Skills |
|---|---|
| Legal | 10 (Affidavit Drafter, Motion Writer, Contract Reviewer, etc.) |
| AI Automation | 10 (Prompt Engineer, Agent Orchestrator, etc.) |
| Content | 10 (Substack Writer, YouTube Scripts, Twitter Threads, etc.) |
| Event Management | 10 (Sneakers Fest ops — Sponsorship, Ticketing, Timeline, etc.) |
| Marketing | 10 (GTM Strategy, PR, Brand Identity, etc.) |
| Psychology | 10 (Catalyst Frameworks — Upstream/Downstream, Cup/Ocean, etc.) |
| Business | 10 (Revenue Models, SOPs, Team Delegation, etc.) |

## Running the Agent

```bash
cd CatalystOS/integrations/agent
python catalyst_agent.py
```

Agent runs on http://localhost:5000

### API Endpoints

- `GET /health` — Status check
- `GET /templates` — Available legal templates
- `POST /generate` — Generate legal document

### Generate a document

```bash
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "template": "affidavit",
    "fields": {
      "plaintiff": "JOHN DOE",
      "defendant": "ABC COMPANY LTD",
      "court": "HIGH COURT",
      "state": "LAGOS"
    }
  }'
```

Templates: `affidavit`, `motion`, `demand_letter`

## Dashboard

The live dashboard (CatalystOS_Dashboard.jsx) runs directly in Claude artifacts.
It connects to the Anthropic API for real AI skill execution.

For local deployment:
```bash
cd CatalystOS/dashboard
npm install
npm run dev
```

---

**Abegbe Agboola Chambers** — Ikoyi, Lagos
Legal automation: Affidavits, Motions, Demand Letters, Case Briefs

**Sneakers Fest 2026** — Event management skills built-in
**The Great Sabotage** — Content skills built-in
**Catalyst OS** — Psychology frameworks built-in

---
Built: 28 April 2026
