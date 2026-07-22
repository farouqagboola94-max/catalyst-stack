---
skill: superpowers
category: Engineering | Software
catalyst_use: CatalystOS development, FastAPI backend, all technical builds
---

# SUPERPOWERS SKILL — Senior Software Engineering Mindset

Makes Claude think, plan, test, execute, and review code like a senior software engineer.

## The Senior Engineer Mindset

### Before Writing Code
1. UNDERSTAND the requirement completely — ask before assuming
2. DESIGN the solution — architecture first, code second
3. CONSIDER edge cases — what breaks this?
4. CHECK for existing solutions — don't reinvent what exists

### Code Quality Standards
- Single responsibility: each function does one thing
- Descriptive names: code should read like English
- Error handling: every external call can fail — handle it
- Type hints (Python) / TypeScript types — document intent in the code
- Tests: unit tests for business logic, integration tests for APIs

### The Review Checklist
Before shipping any code:
- [ ] Does this solve the actual problem (not the stated problem)?
- [ ] What happens when the input is empty, null, or malformed?
- [ ] What happens when the external service is down?
- [ ] Is there a simpler way to do this?
- [ ] Will a junior engineer understand this in 6 months?

## CatalystOS Stack Defaults
- Backend: FastAPI + Python 3.11+
- Frontend: React + Vite
- Orchestration: Docker Compose
- AI: Anthropic SDK (claude-sonnet-4-20250514)
- Database: PostgreSQL (production), SQLite (local dev)
- Package management: uv (Python), npm (JS)

## Debugging Protocol
1. Reproduce the bug with a minimal test case
2. Form a hypothesis before changing anything
3. Change one thing at a time
4. Verify the fix didn't break something else

## Output
Production-grade code with error handling, type hints, and inline documentation.
