#!/usr/bin/env python3
"""
CatalystOS Skills Loader
Loads any skill by name and outputs the full system prompt for use.
Usage:
  python3 skills_loader.py hook-generator
  python3 skills_loader.py --list
  python3 skills_loader.py --category design
  python3 skills_loader.py --stack "reels-scripting hook-generator voice-builder"
"""

import os
import sys
import argparse
from pathlib import Path

BASE = Path(__file__).parent.parent

SKILL_INDEX = {
    # DESIGN
    "frontend-design":  "design/frontend-design.md",
    "claudedesign":     "design/claudedesign.md",
    "design-auditor":   "design/design-auditor.md",
    "nothing-design":   "design/nothing-design.md",
    "canvas-design":    "design/canvas-design.md",
    "drawn-diagrams":   "design/drawn-diagrams.md",
    "algorithmic-art":  "design/algorithmic-art.md",
    "color-expert":     "design/color-expert.md",
    "gpt-image-2":      "design/gpt-image-2.md",
    # CONTENT
    "social-media-os":  "content/social-media-os.md",
    "voice-builder":    "content/voice-builder.md",
    "reels-scripting":  "content/reels-scripting.md",
    "post-scorer":      "content/post-scorer.md",
    "youtube-thumbnail":"content/youtube-thumbnail.md",
    "hook-generator":   "content/hook-generator.md",
    "humanizer":        "content/humanizer.md",
    "notebook-llm":     "content/notebook-llm.md",
    "beautiful-prose":  "content/beautiful-prose.md",
    "x-article-publisher": "content/x-article-publisher.md",
    # SOCIAL
    "tweetclaw":        "social/tweetclaw.md",
    "twitter-optimizer":"social/twitter-optimizer.md",
    "sm-research":      "social/sm-research.md",
    # MARKETING
    "wondelai":         "marketing/wondelai.md",
    "marketing-skills": "marketing/marketing-skills.md",
    "email-marketing":  "marketing/email-marketing.md",
    "competitive-ads":  "marketing/competitive-ads.md",
    "deep-research":    "marketing/deep-research.md",
    "academic-research":"marketing/academic-research.md",
    "kim-barrett":      "marketing/kim-barrett.md",
    "marketing-module": "marketing/marketing-module.md",
    # RESEARCH
    "autoresearch":     "research/autoresearch.md",
    "evidence-dialogue":"research/evidence-dialogue.md",
    "jtbd-interview":   "research/jtbd-interview.md",
    # VIDEO
    "remotion":         "video/remotion.md",
    "ai-video-production": "video/ai-video-production.md",
    "generative-media": "video/generative-media.md",
    # ENGINEERING
    "superpowers":      "engineering/superpowers.md",
    "repomix":          "engineering/repomix.md",
    "antfu":            "engineering/antfu.md",
    "dev-browser":      "engineering/dev-browser.md",
    "vexor-search":     "engineering/vexor-search.md",
    "skill-seekers":    "engineering/skill-seekers.md",
    "web-scraper":      "engineering/web-scraper.md",
    # SEO
    "geo-seo":          "seo/geo-seo.md",
    # PRODUCT
    "pm-skills":        "product/pm-skills.md",
    "daydream":         "product/daydream.md",
    # AI
    "ai-transformation":"ai/ai-transformation.md",
    "ai-music-album":   "ai/ai-music-album.md",
}

CATEGORIES = {
    "design": ["frontend-design","claudedesign","design-auditor","nothing-design",
               "canvas-design","drawn-diagrams","algorithmic-art","color-expert","gpt-image-2"],
    "content": ["social-media-os","voice-builder","reels-scripting","post-scorer",
                "youtube-thumbnail","hook-generator","humanizer","notebook-llm",
                "beautiful-prose","x-article-publisher"],
    "social": ["tweetclaw","twitter-optimizer","sm-research"],
    "marketing": ["wondelai","marketing-skills","email-marketing","competitive-ads",
                  "deep-research","academic-research","kim-barrett","marketing-module"],
    "research": ["autoresearch","evidence-dialogue","jtbd-interview"],
    "video": ["remotion","ai-video-production","generative-media"],
    "engineering": ["superpowers","repomix","antfu","dev-browser","vexor-search",
                    "skill-seekers","web-scraper"],
    "seo": ["geo-seo"],
    "product": ["pm-skills","daydream"],
    "ai": ["ai-transformation","ai-music-album"],
}

# Smart stacks — common task combinations
SMART_STACKS = {
    "write-reel": ["reels-scripting", "hook-generator", "voice-builder"],
    "write-post": ["hook-generator", "voice-builder", "post-scorer", "humanizer"],
    "build-ui": ["frontend-design", "design-auditor"],
    "build-campaign": ["marketing-skills", "hook-generator", "kim-barrett", "competitive-ads"],
    "ai-consulting": ["ai-transformation", "deep-research", "pm-skills"],
    "ugc-video": ["ai-video-production", "dev-browser", "reels-scripting"],
    "sneakers-fest": ["canvas-design", "gpt-image-2", "ai-video-production", "social-media-os"],
    "substack-essay": ["beautiful-prose", "voice-builder", "deep-research", "humanizer"],
    "client-social": ["social-media-os", "post-scorer", "tweetclaw", "hook-generator"],
    "build-dashboard": ["frontend-design", "superpowers", "design-auditor"],
}

def load_skill(name: str) -> str:
    if name not in SKILL_INDEX:
        return f"ERROR: Skill '{name}' not found. Run --list to see all skills."
    path = BASE / SKILL_INDEX[name]
    if not path.exists():
        return f"ERROR: Skill file not found at {path}"
    return path.read_text()

def list_skills():
    print("\n" + "="*60)
    print("CATALYSTOS SKILL REGISTRY — 48 Skills")
    print("="*60)
    for cat, skills in CATEGORIES.items():
        print(f"\n  [{cat.upper()}] ({len(skills)} skills)")
        for s in skills:
            print(f"    • {s}")
    print("\n  SMART STACKS:")
    for stack, skills in SMART_STACKS.items():
        print(f"    → {stack}: {' + '.join(skills)}")
    print()

def load_stack(names: list) -> str:
    parts = []
    for name in names:
        skill = load_skill(name)
        if not skill.startswith("ERROR"):
            header = f"\n{'='*60}\n## SKILL: {name.upper()}\n{'='*60}\n"
            parts.append(header + skill)
        else:
            parts.append(skill)
    return "\n".join(parts)

def main():
    parser = argparse.ArgumentParser(description="CatalystOS Skills Loader")
    parser.add_argument("skill", nargs="?", help="Skill name to load")
    parser.add_argument("--list", action="store_true", help="List all skills")
    parser.add_argument("--category", help="Load all skills in a category")
    parser.add_argument("--stack", help="Load a smart stack or space-separated skill names")

    args = parser.parse_args()

    if args.list:
        list_skills()

    elif args.category:
        cat = args.category.lower()
        if cat not in CATEGORIES:
            print(f"ERROR: Unknown category '{cat}'")
            print(f"Valid: {', '.join(CATEGORIES.keys())}")
            sys.exit(1)
        skills = CATEGORIES[cat]
        print(f"\nLoading {len(skills)} skills from [{cat.upper()}]...\n")
        print(load_stack(skills))

    elif args.stack:
        # Check if it's a named smart stack first
        if args.stack in SMART_STACKS:
            skills = SMART_STACKS[args.stack]
            print(f"\nLoading smart stack [{args.stack.upper()}]: {' + '.join(skills)}\n")
            print(load_stack(skills))
        else:
            # Treat as space-separated skill names
            skills = args.stack.split()
            print(f"\nLoading skill stack: {' + '.join(skills)}\n")
            print(load_stack(skills))

    elif args.skill:
        content = load_skill(args.skill)
        print(content)

    else:
        list_skills()
        print("Usage examples:")
        print("  python3 skills_loader.py hook-generator")
        print("  python3 skills_loader.py --stack write-reel")
        print("  python3 skills_loader.py --category design")
        print("  python3 skills_loader.py --stack 'reels-scripting hook-generator voice-builder'")

if __name__ == "__main__":
    main()
