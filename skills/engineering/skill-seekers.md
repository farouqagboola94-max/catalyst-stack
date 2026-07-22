---
skill: skill-seekers
category: Engineering | Skill Generation
catalyst_use: Building new CatalystOS skills from any documentation, repo, or PDF
---

# SKILL SEEKERS SKILL — Skill Generation from Documentation

Converts documentation, repositories, and PDFs into reusable Claude-compatible AI skills.

## What Makes a Good Skill File
A Claude skill (SKILL.md or similar) contains:
1. Front matter: name, category, use cases
2. Context: what this skill is for and when to use it
3. Core frameworks: the mental models and processes to apply
4. Examples: concrete demonstrations of the skill in action
5. Output format: what the deliverable looks like

## Skill Extraction Protocol

### From Documentation
1. Read the full docs, identify the core workflow
2. Extract: what decision does a user need to make? What are the options? What's the best practice?
3. Write the skill as if explaining to a capable person who has never used this tool
4. Include code examples for technical tools
5. Include decision frameworks for conceptual tools

### From Repositories
1. Repomix the repo (see repomix.skill)
2. Read README, then main entry points
3. Map: primary use cases → API surface → configuration options
4. Skill file: 5-10 most important use cases, with working code

### From PDFs
1. Extract text from PDF
2. Identify the author's core framework or system
3. Reduce to the highest-leverage concepts
4. Skills should be 500-1500 words — dense, not padded

## Skill Quality Checklist
- [ ] Actionable without reading the source? (skill is self-contained)
- [ ] Code examples work without modification? (tested)
- [ ] CatalystOS use cases clearly linked?
- [ ] No jargon without explanation?
- [ ] Would a VA understand this in 5 minutes?

## Output
Complete skill file ready for CatalystOS integration. Testing scenario included.
