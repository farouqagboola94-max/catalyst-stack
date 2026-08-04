#!/usr/bin/env bash
# ============================================================
# CATALYST STACK — 300 Repo Fork Script
# Run: bash fork_300.sh
# Requires: gh CLI authenticated (gh auth login)
# Forks go to your personal account. You own every fork = admin.
# ============================================================

set -euo pipefail

fork() {
  echo "Forking $1..."
  gh repo fork "$1" --clone=false 2>/dev/null || echo "  ↳ skipped (may already exist): $1"
  sleep 0.5  # gentle rate limiting
}

# ─────────────────────────────────────────────
# 1. COMFYUI CORE ECOSYSTEM (15)
# ─────────────────────────────────────────────
fork Comfy-Org/ComfyUI
fork Comfy-Org/ComfyUI-Manager
fork comfyanonymous/ComfyUI_examples
fork cubiq/ComfyUI_IPAdapter_plus
fork Fannovel16/comfyui_controlnet_aux
fork kijai/ComfyUI-WanVideoWrapper
fork Lightricks/ComfyUI-LTXVideo
fork MrForExample/ComfyUI-3D-Pack
fork city96/ComfyUI-GGUF
fork AIDC-AI/ComfyUI-Copilot
fork Kosinkadink/ComfyUI-VideoHelperSuite
fork Kosinkadink/ComfyUI-AnimateDiff-Evolved
fork 1038lab/ComfyUI-QwenVL
fork ltdrdata/ComfyUI-Impact-Pack
fork WASasquatch/was-node-suite-comfyui

# ─────────────────────────────────────────────
# 2. IMAGE GENERATION ENGINES & UIs (15)
# ─────────────────────────────────────────────
fork AUTOMATIC1111/stable-diffusion-webui
fork invoke-ai/InvokeAI
fork lllyasviel/stable-diffusion-webui-forge
fork LykosAI/StabilityMatrix
fork TheLastBen/fast-stable-diffusion
fork black-forest-labs/flux
fork huggingface/diffusers
fork lllyasviel/ControlNet
fork tencent-ailab/IP-Adapter
fork Stability-AI/generative-models
fork CompVis/stable-diffusion
fork mcmonkeyprojects/SwarmUI
fork nunchaku-ai/nunchaku
fork AbdBarho/stable-diffusion-webui-docker
fork AbdullahAlfaraj/Auto-Photoshop-StableDiffusion-Plugin

# ─────────────────────────────────────────────
# 3. VIDEO GENERATION MODELS (15)
# ─────────────────────────────────────────────
fork Wan-Video/Wan2.1
fork Tencent-Hunyuan/HunyuanVideo
fork THUDM/CogVideo
fork guoyww/AnimateDiff
fork bilibili/Index-anisora
fork AIDC-AI/Pixelle-Video
fork PKU-YuanGroup/Open-Sora
fork hpcaitech/Open-Sora
fork aigc-apps/EasyAnimate
fork modelscope/DiffSynth-Studio
fork duixcom/Duix-Avatar
fork ddean2009/MoneyPrinterPlus
fork 11cafe/jaaz
fork HBAI-Ltd/Toonflow-app
fork Anil-matcha/Open-Generative-AI

# ─────────────────────────────────────────────
# 4. CHARACTER CONSISTENCY & LORA TRAINING (10)
# ─────────────────────────────────────────────
fork kohya-ss/sd-scripts
fork bmaltais/kohya_ss
fork huggingface/peft
fork huggingface/trl
fork huggingface/accelerate
fork ostris/ai-toolkit
fork bghira/SimpleTuner
fork cloneofsimo/lora
fork microsoft/LoRA
fork unslothai/unsloth

# ─────────────────────────────────────────────
# 5. FACE, ENHANCEMENT & VISUAL TOOLS (10)
# ─────────────────────────────────────────────
fork TencentARC/GFPGAN
fork xinntao/Real-ESRGAN
fork sczhou/CodeFormer
fork jantic/DeOldify
fork deepinsight/insightface
fork facefusion/facefusion
fork iperov/DeepFaceLab
fork danielgatis/rembg
fork openai/CLIP
fork IDEA-Research/GroundingDINO

# ─────────────────────────────────────────────
# 6. ANIME, COMIC & CREATIVE AI (8)
# ─────────────────────────────────────────────
fork lllyasviel/Fooocus
fork lllyasviel/IC-Light
fork bryandlee/animegan2-pytorch
fork damo-vilab/i2vgen-xl
fork damo-vilab/videocomposer
fork wiltodelta/remove-ai-watermarks
fork IDEA-Research/Grounded-Segment-Anything
fork facebookresearch/segment-anything

# ─────────────────────────────────────────────
# 7. AUDIO GENERATION & SPEECH (12)
# ─────────────────────────────────────────────
fork suno-ai/bark
fork myshell-ai/OpenVoice
fork coqui-ai/TTS
fork RVC-Boss/GPT-SoVITS
fork facebookresearch/audiocraft
fork WhisperSpeech/WhisperSpeech
fork openai/whisper
fork m-bain/whisperX
fork SYSTRAN/faster-whisper
fork fishaudio/fish-speech
fork neonbjb/tortoise-tts
fork deezer/spleeter

# ─────────────────────────────────────────────
# 8. LOCAL LLM & INFERENCE (12)
# ─────────────────────────────────────────────
fork ollama/ollama
fork ggerganov/llama.cpp
fork nomic-ai/gpt4all
fork mudler/LocalAI
fork vllm-project/vllm
fork lm-sys/FastChat
fork deepseek-ai/DeepSeek-V3
fork deepseek-ai/DeepSeek-R1
fork Qwen/Qwen2.5
fork google-deepmind/gemma
fork meta-llama/llama3
fork microsoft/phi-3

# ─────────────────────────────────────────────
# 9. AI AGENT FRAMEWORKS (15)
# ─────────────────────────────────────────────
fork langchain-ai/langchain
fork langchain-ai/langgraph
fork langchain-ai/deepagents
fork bytedance/deer-flow
fork FlowiseAI/Flowise
fork danny-avila/LibreChat
fork microsoft/autogen
fork Significant-Gravitas/AutoGPT
fork crewAIInc/crewAI
fork geekan/MetaGPT
fork pydantic/pydantic-ai
fork mem0ai/mem0
fork assafelovic/gpt-researcher
fork yoheinakajima/babyagi
fork NirDiamant/GenAI_Agents

# ─────────────────────────────────────────────
# 10. RAG & VECTOR DATABASES (10)
# ─────────────────────────────────────────────
fork run-llama/llama_index
fork chroma-core/chroma
fork qdrant/qdrant
fork weaviate/weaviate
fork milvus-io/milvus
fork microsoft/graphrag
fork deepset-ai/haystack
fork SciPhi-AI/R2R
fork pgvector/pgvector
fork headroomlabs-ai/headroom

# ─────────────────────────────────────────────
# 11. FASTAPI & BACKEND INFRASTRUCTURE (12)
# ─────────────────────────────────────────────
fork fastapi/fastapi
fork fastapi/full-stack-fastapi-template
fork fastapi/sqlmodel
fork zhanymkanov/fastapi-best-practices
fork tadata-org/fastapi_mcp
fork mjhea0/awesome-fastapi
fork polarsource/polar
fork encode/starlette
fork encode/httpx
fork tiangolo/asyncer
fork celery/celery
fork redis/redis-py

# ─────────────────────────────────────────────
# 12. MCP SERVERS & TOOLS (12)
# ─────────────────────────────────────────────
fork modelcontextprotocol/servers
fork modelcontextprotocol/python-sdk
fork modelcontextprotocol/typescript-sdk
fork appcypher/awesome-mcp-servers
fork wong2/awesome-mcp-servers
fork executeautomation/mcp-playwright
fork nanbingxyz/5ire
fork getsentry/XcodeBuildMCP
fork microsoft/mcp
fork zcaceres/markdownify-mcp
fork Pimzino/spec-workflow-mcp
fork patruff/ollama-mcp-bridge

# ─────────────────────────────────────────────
# 13. WEB SCRAPING & DATA COLLECTION (10)
# ─────────────────────────────────────────────
fork D4Vinci/Scrapling
fork scrapy/scrapy
fork apify/crawlee-python
fork apify/crawlee
fork alirezamika/autoscraper
fork microsoft/playwright
fork seleniumhq/selenium
fork mendableai/firecrawl
fork jina-ai/reader
fork ultrafunkamsterdam/undetected-chromedriver

# ─────────────────────────────────────────────
# 14. MEDIA DOWNLOAD & VIDEO TOOLS (10)
# ─────────────────────────────────────────────
fork yt-dlp/yt-dlp
fork streamlink/streamlink
fork mikf/gallery-dl
fork ytdl-org/youtube-dl
fork soimort/you-get
fork abhiTronix/vidgear
fork dmlc/decord
fork Zulko/moviepy
fork jiaaro/pydub
fork kkroening/ffmpeg-python

# ─────────────────────────────────────────────
# 15. SOCIAL MEDIA AUTOMATION (10)
# ─────────────────────────────────────────────
fork instagrapi/instagrapi
fork davidteather/TikTok-Api
fork tweepy/tweepy
fork python-telegram-bot/python-telegram-bot
fork telethon/telethon
fork Evil0ctal/Douyin_TikTok_Download_API
fork JoeanAmier/XHS-Downloader
fork harry0703/MoneyPrinterTurbo
fork auto-editor/auto-editor
fork twintproject/twint

# ─────────────────────────────────────────────
# 16. FOOTBALL & SPORTS DATA (WC2026) (8)
# ─────────────────────────────────────────────
fork statsbombpy/statsbombpy
fork kloppy/kloppy
fork soccerdata/soccerdata
fork openfootball/football.json
fork openfootball/world-cup
fork google-research/football
fork nflverse/nflreadr
fork nflverse/nflfastR

# ─────────────────────────────────────────────
# 17. MONITORING & OBSERVABILITY (10)
# ─────────────────────────────────────────────
fork hyperdxio/hyperdx
fork grafana/grafana
fork prometheus/prometheus
fork netdata/netdata
fork getsentry/sentry
fork posthog/posthog
fork umami-software/umami
fork comet-ml/opik
fork mlflow/mlflow
fork opentelemetry/opentelemetry-python

# ─────────────────────────────────────────────
# 18. AI SDK & DEV TOOLS (12)
# ─────────────────────────────────────────────
fork anthropics/anthropic-sdk-python
fork anthropics/anthropic-sdk-typescript
fork anthropics/anthropic-cookbook
fork BerriAI/litellm
fork openai/openai-python
fork microsoft/semantic-kernel
fork guidance-ai/guidance
fork huggingface/transformers
fork huggingface/datasets
fork pytorch/pytorch
fork microsoft/promptflow
fork openai/evals

# ─────────────────────────────────────────────
# 19. DEPLOYMENT & SELF-HOSTING (10)
# ─────────────────────────────────────────────
fork coollabsio/coolify
fork caprover/caprover
fork dokku/dokku
fork traefik/traefik
fork localstack/localstack
fork docker/compose
fork tiangolo/uvicorn-gunicorn-fastapi-docker
fork n8n-io/n8n
fork activepieces/activepieces
fork 1Panel-dev/MaxKB

# ─────────────────────────────────────────────
# 20. DATA VIZ, DASHBOARDS & WORKFLOW (10)
# ─────────────────────────────────────────────
fork streamlit/streamlit
fork gradio-app/gradio
fork plotly/dash
fork apache/superset
fork metabase/metabase
fork airbytehq/airbyte
fork apache/airflow
fork prefecthq/prefect
fork nocodb/nocodb
fork directus/directus

# ─────────────────────────────────────────────
# 21. COMPUTER VISION & ML LIBRARIES (10)
# ─────────────────────────────────────────────
fork ultralytics/ultralytics
fork roboflow/supervision
fork facebookresearch/detectron2
fork google-research/vision_transformer
fork scikit-learn/scikit-learn
fork Lightning-AI/lightning
fork huggingface/evaluate
fork huggingface/tokenizers
fork damo-vilab/T2I-Adapter
fork IDEA-Research/DWPose

# ─────────────────────────────────────────────
# 22. CREATIVE CONTENT PIPELINES (10)
# ─────────────────────────────────────────────
fork remotion-dev/remotion
fork AIGC-Audio/AudioGPT
fork Stirling-Tools/Stirling-PDF
fork outline/outline
fork hoppscotch/hoppscotch
fork AppFlowy-IO/AppFlowy
fork strapi/strapi
fork payloadcms/payload
fork chatchat-space/Langchain-Chatchat
fork liyupi/ai-guide

# ─────────────────────────────────────────────
# 23. AGENTIC AI RESEARCH & TOOLS (8)
# ─────────────────────────────────────────────
fork huggingface/agents-course
fork GoogleCloudPlatform/generative-ai
fork microsoft/autogen
fork openai/swarm
fork botpress/botpress
fork MODSetter/SurfSense
fork 1Panel-dev/MaxKB
fork comet-ml/opik

echo ""
echo "============================================"
echo " Done! Check github.com/farouqagboola94-max"
echo " for all your new forks."
echo "============================================"
