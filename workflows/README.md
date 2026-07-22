# ComfyUI Workflows

One tuned graph per content lane, parked next to the video-lane module
(runbook §5). Post one to the engine via:

```bash
curl -X POST http://localhost:7001/arsenal/comfyui/generate \
  -H 'content-type: application/json' \
  -d "{\"workflow\": $(cat workflows/comfyui/<file>.api.json)}"
```

or route it through the Switchboard (local-first, cloud fallback):

```bash
curl -X POST http://localhost:7001/switchboard/video \
  -H 'content-type: application/json' \
  -d "{\"project_code\": \"UGC_ADS\", \"workflow\": $(cat workflows/comfyui/<file>.api.json)}"
```

## Files

| File | Model | Kind | Lane |
|------|-------|------|------|
| `comfyui/seedance2_0_r2v.api.json` | Seedance 2.0 | reference → video | UGC_ADS |

## ⚠️ Graph export vs. API format

`seedance2_0_r2v.api.json` is a **UI graph export** (it carries `nodes`,
`links`, `groups`, canvas positions). ComfyUI's `/prompt` queue — which the
`/generate` and `/switchboard/video` endpoints post to — expects the flat
**API format** (a dict keyed by node id).

Before queuing, open the graph in the ComfyUI web UI and re-save it with
**Save (API format)**, then overwrite the file here. The graph is kept as-is so
the exact node setup (5 reference images → `ByteDance2ReferenceNode` → 720p 1:1
→ `SaveVideo`) is preserved and versioned.
