"""
CatalystOS Skills API Router
Mount this in your FastAPI app:

  from skills_router import router as skills_router
  app.include_router(skills_router, prefix="/skills", tags=["Skills"])

Endpoints:
  GET  /skills/                     List all 48 skills with metadata
  GET  /skills/{skill_id}           Load a specific skill's full content
  GET  /skills/category/{cat}       Load all skills in a category
  POST /skills/stack                Load a named or custom skill stack
  GET  /skills/search?q=...         Search skills by keyword
"""

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
from pathlib import Path
from typing import Optional
import json

router = APIRouter()

SKILLS_BASE = Path(__file__).parent

SKILL_INDEX = {
    "frontend-design":     {"file": "design/frontend-design.md",     "category": "design",       "badge": "UI/UX Design"},
    "claudedesign":        {"file": "design/claudedesign.md",         "category": "design",       "badge": "3D & Motion"},
    "design-auditor":      {"file": "design/design-auditor.md",       "category": "design",       "badge": "QA"},
    "nothing-design":      {"file": "design/nothing-design.md",       "category": "design",       "badge": "Minimal UI"},
    "canvas-design":       {"file": "design/canvas-design.md",        "category": "design",       "badge": "Graphic Design"},
    "drawn-diagrams":      {"file": "design/drawn-diagrams.md",       "category": "design",       "badge": "Visual Communication"},
    "algorithmic-art":     {"file": "design/algorithmic-art.md",      "category": "design",       "badge": "Generative Art"},
    "color-expert":        {"file": "design/color-expert.md",         "category": "design",       "badge": "Color Science"},
    "gpt-image-2":         {"file": "design/gpt-image-2.md",          "category": "design",       "badge": "AI Image Gen"},
    "social-media-os":     {"file": "content/social-media-os.md",     "category": "content",      "badge": "Social Strategy"},
    "voice-builder":       {"file": "content/voice-builder.md",       "category": "content",      "badge": "Personal Branding"},
    "reels-scripting":     {"file": "content/reels-scripting.md",     "category": "content",      "badge": "Short-Form Video"},
    "post-scorer":         {"file": "content/post-scorer.md",         "category": "content",      "badge": "QA & Analytics"},
    "youtube-thumbnail":   {"file": "content/youtube-thumbnail.md",   "category": "content",      "badge": "CTR Optimization"},
    "hook-generator":      {"file": "content/hook-generator.md",      "category": "content",      "badge": "Copywriting"},
    "humanizer":           {"file": "content/humanizer.md",           "category": "content",      "badge": "Writing Enhancement"},
    "notebook-llm":        {"file": "content/notebook-llm.md",        "category": "content",      "badge": "Knowledge Repurposing"},
    "beautiful-prose":     {"file": "content/beautiful-prose.md",     "category": "content",      "badge": "Writing Style"},
    "x-article-publisher": {"file": "content/x-article-publisher.md", "category": "content",      "badge": "Publishing"},
    "tweetclaw":           {"file": "social/tweetclaw.md",            "category": "social",       "badge": "Twitter/X Ops"},
    "twitter-optimizer":   {"file": "social/twitter-optimizer.md",    "category": "social",       "badge": "Algorithm"},
    "sm-research":         {"file": "social/sm-research.md",          "category": "social",       "badge": "Intelligence"},
    "wondelai":            {"file": "marketing/wondelai.md",          "category": "marketing",    "badge": "Growth Strategy"},
    "marketing-skills":    {"file": "marketing/marketing-skills.md",  "category": "marketing",    "badge": "Full-Stack Marketing"},
    "email-marketing":     {"file": "marketing/email-marketing.md",   "category": "marketing",    "badge": "Email"},
    "competitive-ads":     {"file": "marketing/competitive-ads.md",   "category": "marketing",    "badge": "Ad Research"},
    "deep-research":       {"file": "marketing/deep-research.md",     "category": "marketing",    "badge": "Intelligence"},
    "academic-research":   {"file": "marketing/academic-research.md", "category": "marketing",    "badge": "Academic Writing"},
    "kim-barrett":         {"file": "marketing/kim-barrett.md",       "category": "marketing",    "badge": "Direct Response"},
    "marketing-module":    {"file": "marketing/marketing-module.md",  "category": "marketing",    "badge": "Marketing System"},
    "autoresearch":        {"file": "research/autoresearch.md",       "category": "research",     "badge": "Research Automation"},
    "evidence-dialogue":   {"file": "research/evidence-dialogue.md",  "category": "research",     "badge": "Critical Thinking"},
    "jtbd-interview":      {"file": "research/jtbd-interview.md",     "category": "research",     "badge": "Customer Research"},
    "remotion":            {"file": "video/remotion.md",              "category": "video",        "badge": "Video Development"},
    "ai-video-production": {"file": "video/ai-video-production.md",   "category": "video",        "badge": "Full Pipeline"},
    "generative-media":    {"file": "video/generative-media.md",      "category": "video",        "badge": "Multi-Modal AI"},
    "superpowers":         {"file": "engineering/superpowers.md",     "category": "engineering",  "badge": "Software Engineering"},
    "repomix":             {"file": "engineering/repomix.md",         "category": "engineering",  "badge": "Codebase Management"},
    "antfu":               {"file": "engineering/antfu.md",           "category": "engineering",  "badge": "Developer Toolkit"},
    "dev-browser":         {"file": "engineering/dev-browser.md",     "category": "engineering",  "badge": "Browser Automation"},
    "vexor-search":        {"file": "engineering/vexor-search.md",    "category": "engineering",  "badge": "Semantic Search"},
    "skill-seekers":       {"file": "engineering/skill-seekers.md",   "category": "engineering",  "badge": "Skill Generation"},
    "web-scraper":         {"file": "engineering/web-scraper.md",     "category": "engineering",  "badge": "Web Automation"},
    "geo-seo":             {"file": "seo/geo-seo.md",                 "category": "seo",          "badge": "AI SEO"},
    "pm-skills":           {"file": "product/pm-skills.md",           "category": "product",      "badge": "Product Management"},
    "daydream":            {"file": "product/daydream.md",            "category": "product",      "badge": "Creative Strategy"},
    "ai-transformation":   {"file": "ai/ai-transformation.md",        "category": "ai",           "badge": "AI Consulting"},
    "ai-music-album":      {"file": "ai/ai-music-album.md",           "category": "ai",           "badge": "AI Music"},
}

SMART_STACKS = {
    "write-reel":      ["reels-scripting", "hook-generator", "voice-builder"],
    "write-post":      ["hook-generator", "voice-builder", "post-scorer", "humanizer"],
    "build-ui":        ["frontend-design", "design-auditor"],
    "build-campaign":  ["marketing-skills", "hook-generator", "kim-barrett", "competitive-ads"],
    "ai-consulting":   ["ai-transformation", "deep-research", "pm-skills"],
    "ugc-video":       ["ai-video-production", "dev-browser", "reels-scripting"],
    "sneakers-fest":   ["canvas-design", "gpt-image-2", "ai-video-production", "social-media-os"],
    "substack-essay":  ["beautiful-prose", "voice-builder", "deep-research", "humanizer"],
    "client-social":   ["social-media-os", "post-scorer", "tweetclaw", "hook-generator"],
    "build-dashboard": ["frontend-design", "superpowers", "design-auditor"],
}

CATEGORIES = {
    "design":      ["frontend-design","claudedesign","design-auditor","nothing-design","canvas-design","drawn-diagrams","algorithmic-art","color-expert","gpt-image-2"],
    "content":     ["social-media-os","voice-builder","reels-scripting","post-scorer","youtube-thumbnail","hook-generator","humanizer","notebook-llm","beautiful-prose","x-article-publisher"],
    "social":      ["tweetclaw","twitter-optimizer","sm-research"],
    "marketing":   ["wondelai","marketing-skills","email-marketing","competitive-ads","deep-research","academic-research","kim-barrett","marketing-module"],
    "research":    ["autoresearch","evidence-dialogue","jtbd-interview"],
    "video":       ["remotion","ai-video-production","generative-media"],
    "engineering": ["superpowers","repomix","antfu","dev-browser","vexor-search","skill-seekers","web-scraper"],
    "seo":         ["geo-seo"],
    "product":     ["pm-skills","daydream"],
    "ai":          ["ai-transformation","ai-music-album"],
}


def _load_file(skill_id: str) -> str:
    if skill_id not in SKILL_INDEX:
        raise HTTPException(status_code=404, detail=f"Skill '{skill_id}' not found")
    skill_path = SKILLS_BASE / SKILL_INDEX[skill_id]["file"]
    if not skill_path.exists():
        raise HTTPException(status_code=500, detail=f"Skill file missing: {skill_path}")
    return skill_path.read_text(encoding="utf-8")


# ─── ROUTES ──────────────────────────────────────────────────

@router.get("/")
def list_skills():
    """Return all 48 skills with metadata — no file content."""
    return {
        "total": len(SKILL_INDEX),
        "categories": list(CATEGORIES.keys()),
        "smart_stacks": list(SMART_STACKS.keys()),
        "skills": [
            {
                "id": skill_id,
                "category": meta["category"],
                "badge": meta["badge"],
                "file": meta["file"],
            }
            for skill_id, meta in SKILL_INDEX.items()
        ]
    }


@router.get("/search")
def search_skills(q: str = Query(..., min_length=2)):
    """Search skills by keyword across ID, category, and badge."""
    q = q.lower()
    results = []
    for skill_id, meta in SKILL_INDEX.items():
        if (q in skill_id.lower() or
            q in meta["category"].lower() or
            q in meta["badge"].lower()):
            results.append({"id": skill_id, **meta})
    return {"query": q, "count": len(results), "results": results}


@router.get("/stacks")
def list_stacks():
    """Return all smart stacks with their skill lists."""
    return {
        "stacks": {
            name: {
                "skills": skills,
                "count": len(skills)
            }
            for name, skills in SMART_STACKS.items()
        }
    }


@router.get("/category/{category}")
def get_category(category: str):
    """Load all skills in a category and return combined content."""
    if category not in CATEGORIES:
        raise HTTPException(
            status_code=404,
            detail=f"Unknown category '{category}'. Valid: {list(CATEGORIES.keys())}"
        )
    skills = CATEGORIES[category]
    combined = []
    for skill_id in skills:
        content = _load_file(skill_id)
        combined.append(f"\n{'='*60}\n# SKILL: {skill_id.upper()}\n{'='*60}\n{content}")

    return PlainTextResponse(
        content=f"# CatalystOS — {category.upper()} Skills ({len(skills)} total)\n" + "\n".join(combined),
        media_type="text/plain"
    )


@router.get("/{skill_id}")
def get_skill(skill_id: str):
    """Load a specific skill by ID. Returns full markdown content."""
    content = _load_file(skill_id)
    meta = SKILL_INDEX[skill_id]
    return {
        "id": skill_id,
        "category": meta["category"],
        "badge": meta["badge"],
        "file": meta["file"],
        "content": content,
        "length": len(content),
    }


class StackRequest(BaseModel):
    name: Optional[str] = None          # named stack (e.g. "write-reel")
    skills: Optional[list[str]] = None  # custom skill list


@router.post("/stack")
def load_stack(req: StackRequest):
    """Load a named smart stack or a custom list of skills."""
    if req.name and req.name in SMART_STACKS:
        skill_ids = SMART_STACKS[req.name]
        label = req.name
    elif req.skills:
        skill_ids = req.skills
        label = "custom"
    else:
        raise HTTPException(
            status_code=400,
            detail="Provide 'name' (named stack) or 'skills' (list of skill IDs)"
        )

    results = []
    errors = []
    for sid in skill_ids:
        try:
            content = _load_file(sid)
            results.append({"id": sid, "content": content})
        except HTTPException as e:
            errors.append({"id": sid, "error": e.detail})

    combined_content = "\n".join(
        f"\n{'='*60}\n# SKILL: {r['id'].upper()}\n{'='*60}\n{r['content']}"
        for r in results
    )

    return {
        "stack": label,
        "skills_loaded": len(results),
        "skills_failed": len(errors),
        "errors": errors,
        "combined_content": combined_content,
    }
