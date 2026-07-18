# Claude Code Plugins

This repo enables 5 Claude Code plugins for everyone who works in it, via
[`.claude/settings.json`](./settings.json) (`extraKnownMarketplaces` +
`enabledPlugins`).

| # | Plugin | What it does | Marketplace | Source |
|---|--------|--------------|-------------|--------|
| 1 | **security-guidance** | Reviews each change Claude makes for common vulnerabilities (injection, XSS, unsafe deserialization/DOM) and fixes them in-session. | `claude-plugins-official` (built-in) | Anthropic |
| 2 | **caveman** | Compresses Claude's output ~65% using "caveman speech" while keeping code/commands/errors byte-exact, to save context tokens. | `caveman` | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |
| 3 | **claude-mem** | Persistent memory across sessions. | `thedotmack` | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) |
| 4 | **context7** | Up-to-date, version-accurate library documentation for the coding agent (MCP). | `claude-plugins-official` (built-in) | [upstash/context7](https://github.com/upstash/context7) |
| 5 | **superpowers** | Skill library — adds skills, a code-reviewer subagent, `/remote-control`, and more. | `superpowers-marketplace` | [obra/superpowers](https://github.com/obra/superpowers) |

## Activating them

`context7` and `security-guidance` come from Anthropic's built-in
`claude-plugins-official` marketplace and load automatically.

The three third-party plugins (`superpowers`, `claude-mem`, `caveman`) come from
external GitHub marketplaces. For safety, Claude Code does **not** silently run
external plugin code: the first time you open this repo it will prompt you to
trust the folder and install the declared marketplaces/plugins. If a plugin
shows as "not installed," run the command Claude Code prints, or install it
yourself:

```bash
claude plugin install superpowers@superpowers-marketplace --scope project
claude plugin install claude-mem@thedotmack --scope project
claude plugin install caveman@caveman --scope project
```

Then run `/reload-plugins` (or restart Claude Code) and check `/plugin` →
**Installed**.

> **Trust note:** plugins run with your user privileges and can execute
> arbitrary code. These three are third-party; caveman is distributed through
> the third-party `claudepluginhub` directory. Review each source before you
> trust it.

### Alternative for Context7

Context7 is enabled here as the official plugin. If you'd rather wire it as a
plain MCP server instead, you can run `npx ctx7 setup` (as shown in the source
video) or add `@upstash/context7-mcp` to your MCP config.
