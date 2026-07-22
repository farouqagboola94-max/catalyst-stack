# /run-chambers-batch

---
description: AGENT TEAM — Process multiple legal documents in a single run. Takes a batch of document briefs and produces formatted, court-ready output for all of them. Designed for high-volume weeks at Abegbe Agboola Chambers.
---

## What This Agent Team Does

Processes up to 10 documents in one run:
- Reads each document brief
- Routes to correct skill (affidavit vs particulars vs formatting)
- Formats each output to court standard
- Generates a batch filing checklist

---

## How to Use

Provide a numbered list of document briefs. Example:

```
1. Affidavit of Service — Suit No. ABC/123/2026 — served John Doe on 20/04/2026
2. Particulars of Claim — contract dispute — ₦500,000 — client vs Supplier X
3. Format existing draft — [paste raw text]
```

Claude processes each in sequence and delivers numbered outputs matching your input list.

---

## Agent Assignments

### Agent 1 — Document Router
**Task:** Read all briefs. For each one, determine:
- Document type
- Missing information (flag immediately before processing)
- Priority order (flag any urgent/filing deadline items)

Output: Routing plan + missing info request (single round)

### Agent 2 — Drafting Engine
**Task:** After missing info is provided, draft all documents that require drafting (affidavits, particulars).
Runs /draft-affidavit or /draft-particulars per document.

### Agent 3 — Formatting Engine
**Task:** Run /format-legal-doc on every output from Agent 2, plus any raw text passed for formatting only.

### Agent 4 — Batch QC
**Task:** Review all formatted documents for:
- Sequential paragraph numbering
- Consistent party names
- Exhibit reference alignment
- Signature block completeness
- Flag anything that needs solicitor review

---

## Output Format

```
CHAMBERS BATCH REPORT — [DATE]
Documents Processed: [X]

---
DOCUMENT 1: [TYPE] — [SUIT/REFERENCE]
[full formatted document]
Filing Checklist: [checklist]

---
DOCUMENT 2: [TYPE] — [SUIT/REFERENCE]
[full formatted document]
Filing Checklist: [checklist]

[Continue for all documents]

---
BATCH QC FLAGS:
- Document [X]: [issue]
- Document [X]: [issue]

ITEMS FOR SOLICITOR REVIEW:
[list]
```

---

## Time Estimate

Per document: 2-3 minutes
Batch of 5: ~15 minutes
Batch of 10: ~30 minutes

All running while you handle other tasks.
