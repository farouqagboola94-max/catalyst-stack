# ComfyUI Integration Runbook — CatalystOS

Stand up the local video lane and wire it into the OS. Run every command inside your own repo and machine. I cannot reach your live system, so nothing here touched it.

## 0. Reality check first

Confirm you have a capable GPU, or a rented one ready. No GPU, no local generation. If you are renting (RunPod or Vast), set `COMFYUI_API_BASE` to the rented endpoint instead of localhost and skip step 1.

## 1. Install the engine (local)

```bash
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# install the right torch build for your GPU from pytorch.org, this is the step
# that varies by card and CUDA version. Do not skip the version match.
```

Drop your model checkpoints into `ComfyUI/models/checkpoints` and video model files into the folders the model card tells you. Then launch:

```bash
python main.py --listen 127.0.0.1 --port 8188
```

Open `http://127.0.0.1:8188` to confirm the node graph loads.

**Flag.** Exact install steps and the torch line change with your hardware and the ComfyUI version. Follow the repo README over this summary if they disagree.

## 2. Register into the Arsenal

```bash
# from the folder holding register_comfyui.py and comfyui.arsenal.json
python register_comfyui.py --registry /path/to/CatalystOS/registry/arsenal.json
```

Idempotent. Run it again any time you edit the record, it updates in place by id, it does not duplicate.

If your arsenal registry is not shaped `{"modules": [ ... ]}`, change the two marked lines in `register_comfyui.py` (`setdefault("modules"...)` and the overwrite by id).

## 3. Mount the router

In your CatalystOS FastAPI app:

```python
from register_comfyui import router as comfyui_router
app.include_router(comfyui_router)
```

Now you have:

- `GET /arsenal/comfyui` returns the module record
- `GET /arsenal/comfyui/health` pings the local engine, returns `up` true or false cleanly
- `POST /arsenal/comfyui/generate` queues a workflow (stub, see step 5)

## 4. Wire the Switchboard lane

ComfyUI becomes the **video lane** in your local zero cost philosophy, sitting beside Odysseus (port 7000, text and agents). Add a route rule in the Switchboard so video jobs go to the local lane first, and fall back to the rented cloud GPU when local VRAM is short or the engine is offline.

Suggested routing logic in plain terms:

1. Video job arrives.
2. Hit `/arsenal/comfyui/health`. If `up`, route to local.
3. If down, route to the cloud GPU endpoint (set `COMFYUI_API_BASE` to the rented host on that lane).
4. Log the lane choice so you can see local versus paid split, same way the 80/20 model split is tracked.

## 5. Finish the generate endpoint

The `/generate` route is a guarded stub on purpose. To make it real:

1. In the ComfyUI web UI, build the graph you want (pick a video model, set your text or image input).
2. Save (API format). That gives you a workflow json.
3. Post it to `/arsenal/comfyui/generate` with `{"workflow": <that json>}`. The router forwards it to the engine `/prompt` queue.

Save one workflow json per content lane (WC2026 cinematic, SNEAKFEST hype, COMICIP motion, UGC drafts) so each pipeline has a tuned graph. Park them in the repo next to the module.

## 6. Confirm end to end

```bash
curl http://127.0.0.1:8188/system_stats          # engine alive
curl http://localhost:<your_os_port>/arsenal/comfyui/health   # OS sees it
```

Green on both means the video lane is live in the OS.

## Open items I could not close from here

- Repo URL and GPL 3.0 license: high confidence, not freshly verified. Confirm.
- Port 8188 and `/system_stats`: expected defaults, confirm on your build.
- Strongest current video model: unknown to me with certainty, recency sensitive. Check before locking a pipeline.
- The exact app in the reel was not named on screen. The engine the GitHub footage points to is ComfyUI.
