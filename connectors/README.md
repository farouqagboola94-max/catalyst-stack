# Connectors — hands into your other apps

A connector lets CatalystOS read/write another service you already use —
Airtable, Notion, Gmail, Google Drive, your socials, etc. The actual login
lives in your MCP / API config (outside this repo, kept secret). What lives
*here* is a **card that documents the connection**: what it's for, which
account, what the OS is allowed to do with it.

## How to add one

1. Copy `../arsenal/_TEMPLATE.arsenal.json` → `../arsenal/<name>.connector.arsenal.json`.
2. Set `category: "connector"`, `runtime.local: false`, and drop `api_base`.
3. In `one_liner` / `capabilities`, say what it does
   ("Airtable — read/write the Catalyst CRM base; used by SMM + events").
4. Put any non-secret notes (base IDs, board names, table names) in this folder
   as a plain `.md` if you want them versioned. **Never commit tokens or keys.**

## Secrets rule

Credentials go in environment variables or your MCP config — **never** in a
committed file. The card describes the connection; it does not hold the keys.

Tell me which app + what you want the OS to do with it, and I'll write the card
and note how the live plug gets wired.
