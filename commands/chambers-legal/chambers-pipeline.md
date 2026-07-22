# /chambers-pipeline

---
description: Full end-to-end legal document pipeline. Takes a raw instruction or brief and returns a formatted, court-ready document. Chains /draft-affidavit OR /draft-particulars → /format-legal-doc in a single run. Zero manual steps between drafting and formatting.
---

## Instructions

This is a Skill Chain. It runs two skills back to back without stopping.

### Step 1 — Parse the Instruction
Read the input and determine:
- Document type needed (Affidavit of Service / Particulars of Claim / Other)
- What information is already provided
- What information is missing

### Step 2 — Request Missing Information (One Shot)
Ask for everything that's missing in a single numbered list. Do not ask in multiple rounds.

### Step 3 — Run /draft-affidavit or /draft-particulars
Based on document type, execute the appropriate skill using the provided information.

### Step 4 — Run /format-legal-doc Automatically
Take the draft output from Step 3 and immediately pass it through formatting rules. Do not output the unformatted draft.

### Step 5 — Deliver Final Document
Output is the clean, formatted, court-ready document only. Add:
- Word count
- Estimated pages (assume 250 words per page)
- Filing checklist

## Filing Checklist (Auto-Generated)

```
FILING CHECKLIST — [DOCUMENT TYPE] — [SUIT NO]

[ ] Document printed on A4 paper
[ ] All parties' names correctly stated
[ ] Suit number confirmed with court registry
[ ] Exhibit copies attached and labeled
[ ] Signature page completed
[ ] Commissioner for Oaths/Notary attendance scheduled (if affidavit)
[ ] Copy for file retained
[ ] Opposing counsel served (if applicable)
[ ] Service confirmed and recorded
```

## Output Format

```
[COURT HEADER]

[FULL FORMATTED DOCUMENT]

[SIGNATURE BLOCK]

---
WORD COUNT: [X] words (~[X] pages)

FILING CHECKLIST:
[checklist]

NOTES FOR SUPERVISING SOLICITOR:
[any flags or issues]
```
