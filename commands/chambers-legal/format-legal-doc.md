# /format-legal-doc

---
description: Take raw or poorly formatted legal text and produce a clean, court-ready formatted document following Nigerian High Court standards. No drafting — pure formatting and cleanup.
---

## Instructions

### Step 1 — Identify Document Type
Determine what kind of document this is:
- Affidavit (of Service, of Means, General)
- Particulars of Claim
- Statement of Defence
- Originating Summons
- Motion on Notice
- Written Address
- Agreement/Deed
- Correspondence

### Step 2 — Apply Formatting Standards

**Header Block:**
```
IN THE HIGH COURT OF [COURT]
IN THE [DIVISION] JUDICIAL DIVISION
HOLDEN AT [LOCATION]

SUIT NO: [NUMBER]

BETWEEN:

[PARTY 1 NAME]                     ... [ROLE]

AND

[PARTY 2 NAME]                     ... [ROLE]
```

**Body Rules:**
- Paragraph numbers: Sequential Arabic numerals (1, 2, 3...)
- Sub-paragraphs: Use (a), (b), (c) — lowercase in brackets
- Sub-sub-paragraphs: Use (i), (ii), (iii) — Roman numerals in brackets
- All monetary figures: Written with ₦ symbol and formatted (₦1,500,000.00)
- Dates: Written in full (the 15th day of January, 2026) — not abbreviated
- No contractions in the body of the document
- All caps for: party names in header, document title, exhibit labels
- Exhibit references: "...attached hereto and marked Exhibit 'A'"

**Signature Block (Affidavits):**
```
SWORN to at [LOCATION]
This [DAY] day of [MONTH], [YEAR]

___________________________
DEPONENT

Before me:

___________________________
COMMISSIONER FOR OATHS/NOTARY PUBLIC
```

**Signature Block (Filed Documents):**
```
Dated this [DAY] day of [MONTH], [YEAR]

[SOLICITOR NAME]
Solicitor to the [PARTY]
[CHAMBERS NAME]
[CHAMBERS ADDRESS]
[PHONE/EMAIL]
```

### Step 3 — Clean Up Common Issues
Fix these automatically:
- Inconsistent numbering
- Wrong exhibit letter sequencing
- Lowercase party names in headers
- Abbreviated dates
- Missing "AND" between parties
- Inconsistent spacing between sections
- Broken paragraph flow

### Step 4 — Flag Issues
If anything is unclear or seems legally incorrect, note it in "Formatting Flags" at the end — do not silently change legal substance, only fix formatting.

## Output Format

```
[CLEAN FORMATTED DOCUMENT]

---
FORMATTING FLAGS:
- [Any issues that need legal review]
- [Any information that appears missing]
```
