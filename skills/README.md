# Skills — your saved routines

Drop your Claude Code skills here: **one folder per skill**, each containing a
`SKILL.md` (plus any scripts/assets it uses). A skill is a named, repeatable
procedure — "run the WC2026 clip pipeline", "build a sponsor deck" — so you
trigger the whole job by name instead of re-explaining it every time.

## How to drop one in

```
skills/
  my-skill-name/
    SKILL.md        # what it does + the steps
    (any helper files)
```

- Paste or upload the folder here.
- Tell me the name, and I'll (a) sanity-check the `SKILL.md`, (b) add an
  arsenal card so `/arsenal` lists it as a `category: skill`, and (c) if you
  want it live in Claude Code, wire it into `.claude/`.

## Not sure if something is a "skill" vs a "workflow"?

- **Skill** = instructions/procedure (mostly Markdown). Goes here.
- **Workflow** = a machine recipe (ComfyUI graph, n8n/Make export — a JSON the
  engine runs). Goes in `../workflows/`.

Rule of thumb: if a *person or agent* follows it → skill. If an *engine* runs
it → workflow.
