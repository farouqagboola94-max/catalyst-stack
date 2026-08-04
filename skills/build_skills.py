#!/usr/bin/env python3
"""
CatalystOS Skill Builder
Generates all 48 Roman Knox skill files + integration layer
"""

import os

BASE = "/home/claude/CatalystOS/skills"

SKILLS = {

# ─────────────────────────────────────────────
# DESIGN
# ─────────────────────────────────────────────
"design/frontend-design.md": """---
skill: frontend-design
category: Design | UI/UX
catalyst_use: All dashboards, landing pages, component builds, CatalystOS UI
---

# FRONTEND DESIGN SKILL

Stop. Before any code: commit to a bold aesthetic direction.

## Pre-Code Protocol
1. PURPOSE — what problem, who uses it
2. TONE — pick an extreme: brutally minimal | maximalist chaos | retro-futuristic | industrial | editorial | luxury | brutalist | organic
3. THE ONE THING — what will someone remember about this interface
4. NEVER default to generic AI aesthetics (no purple gradients, no Inter font, no card soup)

## Execution Rules
- Typography: Character-first. Never Inter/Roboto/Arial as primary display
- Color: Dominant + sharp accent. Commit fully
- Motion: One orchestrated entrance beats scattered micro-interactions
- Layout: Asymmetry, overlap, diagonal flow, grid-breaking moments
- Backgrounds: Gradient meshes, noise textures, layered transparencies, grain overlays

## CatalystOS Defaults
- Palette: Void Black #0a0a0a | Forge Orange #FF6B2C | Cold Steel #C0C0C0
- Type: JetBrains Mono (code/data) + DM Sans (body)
- Aesthetic: Lagos Noir industrial — dark, dense, high information architecture
- Sneakers Fest: Crushed blacks, amber glow, neon accents, 35mm grain

## Output
Full production-grade implementation. No placeholders. No stubs. Complete code.
""",

"design/claudedesign.md": """---
skill: claudedesign
category: Design | 3D & Motion
catalyst_use: Sneakers Fest motion graphics, brand animations, visual identity assets
---

# CLAUDEDESIGN SKILL — 3D & Motion Graphics

Cinematic motion graphics, 3D scenes, interactive visuals, and animation systems.

## Core Capabilities
- Three.js scenes: lighting, materials, camera rigs, post-processing
- CSS 3D transforms: perspective stacking, card flips, depth layers
- GSAP animation timelines: staggered reveals, scroll triggers, morph sequences
- Lottie-compatible animation logic and keyframe structures
- Particle systems: flow fields, attractor systems, physics-based motion
- Shader-based effects: displacement, chromatic aberration, glitch, grain

## Execution Protocol
1. Define the CINEMATIC INTENT — what emotion should this motion create
2. Map the timing arc: intro → sustain → exit
3. Build with performance budget in mind (60fps target)
4. Every motion has a PURPOSE — never animate for its own sake

## CatalystOS Application
- Sneakers Fest: Kinetic typography, product reveals, countdown sequences
- The Catalyst brand: Forge-fire particle systems, steel texture morphs
- Client deliverables: Motion specs for handoff to After Effects or Premiere

## Output Format
Working Three.js, GSAP, or CSS animation code. Full scene setup included.
""",

"design/design-auditor.md": """---
skill: design-auditor
category: Design | Analysis
catalyst_use: Client deliverable review, social media visual QA, pitch deck polish
---

# DESIGN AUDITOR SKILL

Audit any interface or visual against professional design principles. No flattery. Pure analysis.

## Audit Framework (Run in sequence)

### 1. Typography Audit
- Hierarchy clarity: H1 > H2 > body — is it instantly readable?
- Font pairing: Do the fonts have chemistry or conflict?
- Line height, letter spacing, measure (line length) — are they within readable ranges?
- Consistency: Same weights used for same importance levels?

### 2. Spacing Audit
- 8pt grid adherence (or chosen grid)
- Padding consistency between similar elements
- Visual breathing room vs. cramped sections
- Whitespace as a design element, not an afterthought

### 3. Color & Contrast Audit
- WCAG AA compliance minimum (4.5:1 text, 3:1 UI elements)
- Palette discipline: max 3 primary colors + neutrals
- Accent color usage — is it punching or bleeding everywhere?

### 4. Consistency Audit
- Button styles: all same radius, padding, weight?
- Icon family: single source or mixed?
- Component patterns: reused or reinvented per section?

### 5. Information Architecture
- Can a new user understand the page in 5 seconds?
- Is the primary CTA obvious?
- Is there visual noise obscuring the core message?

## Output
Score each area 1-10. List specific violations with exact fixes. Priority: Critical | Major | Minor.
""",

"design/nothing-design.md": """---
skill: nothing-design
category: Design | UI Design
catalyst_use: Minimal client interfaces, stripped-back dashboards, monochrome brand assets
---

# NOTHING DESIGN SKILL — Monochrome Industrial UI

Inspired by Nothing Phone's design language: radical reduction, purposeful monochrome, industrial precision.

## Core Principles
1. SUBTRACTION OVER ADDITION — remove until it breaks, then add one thing back
2. MONOCHROME FIRST — grayscale is the default. Color is a decision, not a default
3. MECHANICAL PRECISION — every element aligned, every spacing intentional
4. NEGATIVE SPACE IS CONTENT — silence is as loud as the elements

## Visual Language
- Color: #ffffff, #000000, #1a1a1a, #f0f0f0. Nothing else unless client demands
- Typography: Mono or geometric sans. Space Mono, IBM Plex Mono, or similar
- Borders: Hairline (1px) or absent. No decorative borders
- Icons: Line weight consistent. Single stroke family
- Animations: Mechanical, precise. No organic easing. Linear or cubic-bezier [0.25, 0, 0.75, 1]

## Pattern Library
- Cards: No shadows. Thin border or subtle background shift only
- Buttons: Ghost or solid. Never gradient. Never rounded beyond 4px
- Navigation: Text-only preferred. Icons only when universally understood
- Data display: Table-first. Charts only when tables can't communicate

## CatalystOS Use
Apply to: internal tooling, data dashboards, Chambers law firm interfaces (professional restraint)
Avoid for: Sneakers Fest (needs heat), The Catalyst brand content (needs forge energy)
""",

"design/canvas-design.md": """---
skill: canvas-design
category: Design | Graphic Design
catalyst_use: Social media graphics, event posters, Sneakers Fest visuals, client ad creatives
---

# CANVAS DESIGN SKILL — Graphic & Poster Design

Creates polished posters, social graphics, and artistic visuals using modern aesthetic principles.

## Composition Frameworks

### Rule-Breaking Grid
- Start with a 12-column grid, then break it deliberately in one zone
- Bleeding images off-edge creates energy
- Diagonal elements cut through orthogonal layouts for tension

### Typography as Illustration
- Large type as the primary visual element
- Contrast: one enormous word + small supporting text
- Layering type behind and in front of imagery

### Color Story
- 2-color dominant: one background, one foreground
- Third color for accent/call-to-action only
- Muted + one saturated pop creates sophistication

## Format Presets
- Instagram Post: 1080x1080 | 1080x1350
- Story/Reel Cover: 1080x1920
- Twitter/X Post: 1600x900
- Event Poster: A3 (297x420mm) | Custom
- LinkedIn Banner: 1584x396

## Sneakers Fest Visual System
- Crushed blacks (#080808), Amber glow (#FFA500), Neon accent (#39FF14)
- 35mm grain overlay at 15-20% opacity
- High-contrast, editorial feel
- Product photography integration: dark backgrounds, dramatic lighting

## Output
Design brief + SVG/HTML implementation OR detailed art direction for production.
""",

"design/drawn-diagrams.md": """---
skill: drawn-diagrams
category: Design | Visual Communication
catalyst_use: Client presentations, Chambers legal process flows, CatalystOS architecture diagrams
---

# DRAWN DIAGRAMS SKILL — Hand-drawn Visual Communication

Generates memorable hand-drawn diagrams and flowcharts with animated visual aesthetics.

## When to Use
- Complex processes that need humanization
- Client presentations where data feels cold
- Brainstorming outputs that need to feel organic, not corporate

## Diagram Types
1. Process Flowcharts: Boxes, arrows, decision diamonds — sketchy stroke style
2. Concept Maps: Node-and-edge, radial or hierarchical
3. System Architecture: Informal boxes with hand-drawn connectors
4. Timeline: Wavy line with callout bubbles
5. Comparison: Split layout, pros/cons, side-by-side

## Aesthetic Rules
- Stroke: Slightly imperfect lines simulate hand-drawn (SVG path with noise)
- Fill: Soft washes, not solid fills. Low-opacity color blocks
- Text: Handwriting-adjacent font (Caveat, Kalam, or Patrick Hand)
- Arrows: Curved, slightly loose, with arrowhead at end
- Color: Max 3 colors. Warm palette preferred for readability

## SVG Implementation
Use SVG with:
- stroke-linecap: round
- Slightly randomized path control points for hand-drawn feel
- CSS animation for draw-on effect (stroke-dasharray trick)

## Output
Full working SVG or HTML/Canvas implementation. Animatable where applicable.
""",

"design/algorithmic-art.md": """---
skill: algorithmic-art
category: Design | Generative Art
catalyst_use: Catalyst brand identity assets, generative backgrounds, Sneakers Fest visual system
---

# ALGORITHMIC ART SKILL — Generative & Procedural Visuals

Produces unique procedural artwork using particles, flow fields, seeded randomness, and mathematical systems.

## Core Techniques

### Particle Systems
- Emitter-based: origin point, velocity, lifetime, decay
- Field-based: particles follow vector field (Perlin noise, curl noise)
- Attractor systems: particles orbit or converge toward points
- Collision and flocking (Boids algorithm)

### Flow Fields
- Perlin noise field: smooth, organic directional flow
- Curl noise: divergence-free, creates swirling patterns
- Custom mathematical fields: sine waves, radial, vortex

### Seeded Randomness
- Same seed = reproducible output (brand-safe generative art)
- LCG or Mulberry32 for fast seedable RNG in JS
- Variation parameters: density, speed, color spread, lifetime

### Mathematical Forms
- Lissajous curves, rose curves, spirographs
- Reaction-diffusion (Gray-Scott model)
- L-systems for organic branching
- Fourier epicycles

## CatalystOS Visual System
- The Catalyst brand: Forge fire particles, flowing steel filaments, void black backgrounds
- Sneakers Fest: Neon particle trails, urban flow fields, high-energy motion
- Seed palette: derive from brand hex values for consistency

## Output
p5.js, Three.js, or Canvas 2D implementation. Fully parameterized for easy customization.
""",

"design/color-expert.md": """---
skill: color-expert
category: Design | Color Science
catalyst_use: Brand palette development, client visual identity, accessibility audits
---

# COLOR EXPERT SKILL — Comprehensive Color Science System

Massive color science toolkit covering palettes, accessibility, contrast, harmony, and perception.

## Color Theory Framework

### Harmony Systems
- Complementary: direct opposites on color wheel (maximum contrast)
- Analogous: adjacent hues (3-5 colors, harmonious and natural)
- Triadic: three equidistant hues (vibrant, balanced tension)
- Split-complementary: base + two adjacent to its complement (softer contrast)
- Tetradic: four hues at 90° intervals (complex, needs dominant anchor)

### Palette Construction
1. Anchor: primary brand hue (HSL definition, not hex)
2. Neutrals: derived from anchor (not pure gray — tinted neutrals)
3. Accent: complement or split-complement of anchor
4. Semantic: success (green), warning (amber), error (red), info (blue)

### Perceptual Considerations
- Warm colors advance (red, orange, yellow) — use for CTAs
- Cool colors recede (blue, green, purple) — use for backgrounds
- High saturation = energy and attention demand
- Low saturation = professionalism and calm

## Accessibility Standards
- WCAG AA: 4.5:1 for body text, 3:1 for large text and UI components
- WCAG AAA: 7:1 for enhanced accessibility
- Color-blind safe: test against Deuteranopia, Protanopia, Tritanopia simulations
- Never rely on color alone to convey information

## CatalystOS Palette Reference
- Void Black: #0a0a0a | HSL(0, 0%, 4%)
- Forge Orange: #FF6B2C | HSL(20, 100%, 59%)
- Cold Steel: #C0C0C0 | HSL(0, 0%, 75%)
- Electric Lime (Za.ally): #C8FF00 | HSL(73, 100%, 50%)
- Deep Black (Za.ally): #080808

## Output
Full palette specification: hex, HSL, RGB, CMYK. Accessibility report. Usage guidelines.
""",

"design/gpt-image-2.md": """---
skill: gpt-image-2
category: Design | AI Image Generation
catalyst_use: Product mockups, event visuals, social media imagery, client ad creatives
---

# GPT IMAGE 2 SKILL — Advanced AI Image Generation

Advanced image generation workflow with reasoning modes, editing tools, and platform-specific presets.

## Prompt Engineering Framework

### Structure Template
[SUBJECT] in [SETTING], [LIGHTING], [CAMERA], [STYLE], [MOOD], [TECHNICAL SPECS]

### Lighting Vocabulary
- Golden hour: warm, directional, long shadows
- Rembrandt: dramatic side lighting, triangle highlight on shadow-side cheek
- Rim/backlit: subject outlined against bright background
- Flat: even, shadowless (product photography default)
- Practical: lit by in-scene sources (screens, neon, candles)

### Photography Style Codes
- UGC authentic: "handheld, natural lighting, slightly candid, real person"
- Editorial: "medium format feel, controlled studio, precise composition"
- Street/documentary: "35mm grain, available light, decisive moment"
- Product luxury: "macro detail, specular highlights, clean background"
- Cinematic: "anamorphic lens flare, letterbox, color grade"

## Platform Presets
- Instagram feed: 1:1 or 4:5, vibrant, thumb-stopping first read
- Stories/Reels thumbnail: 9:16, text-safe zones at top and bottom 20%
- Twitter/X: 16:9, strong left-anchor composition (text goes right)
- LinkedIn: Clean, professional, human-forward

## Sneakers Fest Prompt Template
"[Subject/product] photographed in Lagos urban setting, crushed black background with amber rim lighting, 35mm grain, editorial sneaker photography, high contrast, cinematic composition, --ar 4:5"

## Editing Modes
- Inpainting: replace specific regions while preserving composition
- Outpainting: extend image beyond original frame
- Style transfer: apply consistent visual treatment across image series

## Output
Optimized prompts ready for GPT-4o Image, Midjourney, or Stable Diffusion. Batch variant sets included.
""",

# ─────────────────────────────────────────────
# CONTENT
# ─────────────────────────────────────────────
"content/social-media-os.md": """---
skill: social-media-os
category: Content | Social Media
catalyst_use: All client social accounts, Vice Chairman strategy, Sneakers Fest content pipeline
---

# SOCIAL MEDIA OS SKILL — Complete Viral Content Workflow

Full operating system for social media: posts, reels, thumbnails, analytics, audience growth.

## Content Architecture

### The Content Mix (Weekly)
- 40% Value/Education: teach something actionable
- 30% Proof/Social: results, testimonials, behind-scenes
- 20% Culture/Opinion: hot takes, trends, community
- 10% Offers/CTA: direct asks, products, services

### Format Matrix
| Format | Best For | Length | Frequency |
|--------|----------|--------|-----------|
| Carousel | Education, tips | 5-10 slides | 2-3x/week |
| Reel/Short | Reach, discovery | 15-60s | 3-5x/week |
| Static post | Brand, quotes | Single image | 1-2x/week |
| Story | Engagement, polls | Ephemeral | Daily |
| Long video | Authority building | 5-20min | 1x/week |

## Caption Framework
1. HOOK (line 1): Must stop the scroll. Question, bold claim, or contrarian statement
2. BRIDGE: Connect hook to value
3. VALUE: The actual content. Short paragraphs. White space
4. CTA: One action only. Never two asks

## Lagos Posting Windows (Nigeria WAT/GMT+1)
- Instagram peak: 7-9am | 12-2pm | 7-10pm
- Twitter/X peak: 8-10am | 1-3pm | 8-11pm
- Best days: Tue-Thu for professional content, Fri-Sat for culture/entertainment

## Hashtag Strategy
- 5-10 hashtags max (quality over quantity)
- Mix: 2 large (1M+), 3 medium (100K-1M), 3 niche (<100K), 2 branded
- Never hashtag dump in caption — move to first comment

## Growth Levers
- Comment engagement in first 30 minutes is critical
- Collab posts 3x average reach
- Trending audio on Reels extends distribution to non-followers
- Save rate > like rate signals algorithmic favor

## Output
Complete content calendar, caption library, hashtag sets, posting schedule.
""",

"content/voice-builder.md": """---
skill: voice-builder
category: Content | Personal Branding
catalyst_use: All Catalyst Concepts content, client ghostwriting, The Great Sabotage Substack
---

# VOICE BUILDER SKILL — Authentic Writing Voice System

Learns your writing voice and creates consistent, non-generic AI-generated content styles.

## Voice Extraction Protocol
To calibrate: provide 3-5 samples of writing you consider authentic.
Voice Builder will extract:
1. Sentence rhythm pattern (long/short ratio, fragmentation style)
2. Vocabulary level and domain (technical, colloquial, hybrid)
3. Punctuation personality (dash-heavy, ellipsis user, comma-sparse)
4. Rhetorical moves (rhetorical questions, list patterns, callback structures)
5. Emotional register (detached/analytical, warm, provocative, philosophical)
6. Opening and closing patterns

## The Catalyst Voice Profile
- Contractions always: don't, can't, won't, it's
- No hyphens between words — spaces only
- Sentences that can be very short. Or sprawling and complex and layered
- Directness without softening: say the hard thing, then the why
- Lagos-grounded but globally legible references
- Void Perspective: antisocial detachment + surgical psychological observation
- Fictional frameworks as behavioral models (Shelby, Reddington, Scofield)
- No corporate language: no "leverage," "synergy," "utilize," "stakeholders"
- Hooks that cut: bold claim or uncomfortable truth in line 1

## Voice Consistency Checks
Before publishing, verify:
- [ ] Does this sound like a human or an AI press release?
- [ ] Is the hook in first 10 words punching?
- [ ] Contractions used throughout?
- [ ] No banned words: "imagine," "in today's landscape," "game-changer"
- [ ] One idea per paragraph?

## Output
Rewritten content in calibrated voice. Voice score (1-10) for drafts submitted for review.
""",

"content/reels-scripting.md": """---
skill: reels-scripting
category: Content | Short-Form Video
catalyst_use: Sneakers Fest reels, client Instagram/TikTok content, Vice Chairman social
---

# REELS SCRIPTING SKILL — Viral Short-Form Content System

Reverse-engineers viral reels and rewrites them in your own content style.

## Viral Reel Anatomy

### The Hook Window (0-3 seconds)
This is the only thing that matters. If they don't stop here, nothing else exists.
- Visual hook: unexpected image, movement, or text overlay
- Audio hook: bold first line, surprising sound
- Pattern interrupt: something that doesn't match expectations

### Hook Formulas That Work
1. Contrarian: "Everyone says X. They're wrong."
2. Curiosity gap: "This one thing changed how I [result]. Here's what it is."
3. Bold claim: "I made ₦X in Y days. Here's the exact method."
4. Empathy/pain: "You're working harder than anyone you know and still broke. Here's why."
5. Future state: "In 60 seconds you'll know exactly how to [desirable outcome]."

### Middle (3-50 seconds)
- Cut every 1-3 seconds (pattern interrupt rhythm)
- One idea per cut
- Visual variety: face cam → text overlay → B-roll → back to face
- Captions on screen always (85% watch without sound)

### Ending CTA (last 3 seconds)
- Save this for later
- Follow for part 2
- Comment [keyword] to get [resource]
- Share with someone who needs this

## Reverse-Engineering Protocol
1. Find 3 viral reels in your niche (1M+ views)
2. Identify: hook type | content structure | pacing | CTA
3. Extract the framework (not the content)
4. Rebuild with your own story, examples, voice

## Lagos Content Angles
- "Lagos money" content: financial reality in Nigerian context
- "No connection" narrative: building without generational wealth
- Sneakers culture: what your sneakers say about you
- Corporate vs. freedom: 9-5 vs. building your own

## Output
Full reel script with timing markers, visual direction notes, caption, and hashtag set.
""",

"content/post-scorer.md": """---
skill: post-scorer
category: Content | Analytics
catalyst_use: Pre-publish quality control for all social content
---

# POST SCORER SKILL — Content Performance Prediction

Scores social media drafts using performance signals before publishing. Catches weak content before it posts.

## Scoring Dimensions (100 points total)

### Hook Strength (25 points)
- 20-25: Stops scroll in <1 second. Bold, specific, curiosity-driven
- 15-19: Good hook but could be sharper
- 10-14: Weak opening. Generic or slow start
- 0-9: No hook. Starts with "I" or context-setting

### Content Value (25 points)
- 20-25: Actionable, specific, immediately useful or deeply entertaining
- 15-19: Good value but could be more specific
- 10-14: Vague. Lots of statements, little substance
- 0-9: Filler content. No reason to save or share

### Voice Authenticity (20 points)
- 16-20: Sounds like a human with a perspective, not an AI summary
- 12-15: Mostly authentic with a few generic phrases
- 8-11: AI-adjacent. Smooth but characterless
- 0-7: Robotic. Could be from any brand anywhere

### CTA Clarity (15 points)
- 12-15: One clear, compelling action. Specific and low-friction
- 8-11: Has a CTA but vague or buried
- 4-7: Weak or absent CTA
- 0-3: No CTA

### Format & Readability (15 points)
- 12-15: Perfect white space, short paragraphs, scannable
- 8-11: Mostly readable, minor formatting issues
- 4-7: Walls of text or inconsistent formatting
- 0-3: Unreadable on mobile

## Score Interpretation
- 85-100: Post it now
- 70-84: Minor edits needed. Fix the flagged areas
- 55-69: Significant revision needed. Rewrite hook and sharpen value
- Below 55: Rebuild from scratch

## Output
Score breakdown by dimension + specific fixes for each failing area.
""",

"content/youtube-thumbnail.md": """---
skill: youtube-thumbnail
category: Content | Thumbnail Design
catalyst_use: CatalystOS YouTube channel, client video content, Sneakers Fest event recaps
---

# YOUTUBE THUMBNAIL SKILL — Click-Maximizing Thumbnail System

Generates optimized thumbnail prompts and designs to maximize CTR and viewer curiosity.

## The Thumbnail CTR Formula
CTR = (Curiosity Gap) × (Visual Clarity) × (Emotional Trigger)

## What Makes Thumbnails Work

### Face Rules
- Emotion must be extreme: shock, joy, disgust, curiosity, determination
- Direct eye contact with lens (speaks directly to viewer)
- Face takes 30-50% of thumbnail space
- High contrast between face and background

### Text Rules
- 3 words maximum (readable at 120px width)
- Font: Bold, condensed, high contrast
- Never repeat the video title in thumbnail text
- Use tension words: SECRET | NEVER | FINALLY | EXPOSED | TRUTH

### Composition Principles
- Left-third face, right-third text (most common high-CTR pattern)
- Arrows pointing at face or key element draw eye
- Color contrast: thumbnail pops against YouTube's white background
- Red, yellow, orange outperform blue, green, purple in CTR studies

### Curiosity Gap Types
1. Incomplete information: "The mistake every Nigerian entrepreneur makes"
2. Contradiction: "Why working harder is destroying your career"
3. Exclusive knowledge: "What the top 1% know about money that you don't"
4. Before/after: Show transformation without revealing how

## Sneakers Fest Thumbnails
- Dark background (#080808) — stands out on light YouTube UI
- Amber/orange accent text
- Product hero shot + face reaction OR just dramatic product shot
- "Lagos Sneakers Fest 2026" branding in corner

## Output
Thumbnail brief: composition description, color palette, text overlay, emotion direction.
""",

"content/hook-generator.md": """---
skill: hook-generator
category: Content | Copywriting
catalyst_use: All content creation, social media, Substack, client campaigns
---

# HOOK GENERATOR SKILL — Scroll-Stopping Hooks

Creates powerful scroll-stopping hooks using proven marketing and storytelling frameworks.

## The Hook Science
Hooks work by triggering one of four primal responses:
1. CURIOSITY — the brain needs to close the open loop
2. SELF-INTEREST — "this is about me and my problem"
3. CREDIBILITY SIGNAL — "this person knows something I don't"
4. PATTERN INTERRUPT — "this isn't what I expected"

## Hook Templates by Platform

### Twitter/X (280 chars, front-loaded)
- "X years ago I [embarrassing failure]. Last month I [massive result]. Here's what changed:"
- "Unpopular opinion: [contrarian claim about your industry]"
- "Nobody talks about this but [uncomfortable truth]"
- "The difference between [good outcome] and [bad outcome] is [one specific thing]"
- "[Number] things I wish I knew before [relevant experience]:"

### Instagram Caption
- Start with the punchline. The explanation comes after
- "Stop [common behavior]. Here's what to do instead:"
- "This is why [common assumption] is actually destroying [thing they care about]"

### Reel/Video (spoken hook)
- "If you [specific situation], don't scroll past this."
- "I'm about to say something that's going to make a lot of people uncomfortable."
- "The reason you're [pain point] has nothing to do with [what they think it is]."

### Substack/Long-form
- Open in the middle of the action — context comes second
- Start with the most provocative claim in the piece
- The question that the piece answers — but make the question feel urgent

## Catalyst-Specific Hook Vault
- Lagos business context: "The Nigerian market doesn't need your MBA. It needs your street sense."
- Automation angle: "Your competitors are still hiring. I automated their job in 48 hours."
- Sneakers culture: "The sneaker you're wearing tells me exactly where you are in life."

## Output
5-10 hook variations per prompt. Platform-specific. Ranked by predicted engagement.
""",

"content/humanizer.md": """---
skill: humanizer
category: Content | Writing Enhancement
catalyst_use: All AI-generated content before publishing, client ghostwriting polish
---

# HUMANIZER SKILL — Remove AI Writing Patterns

Removes robotic AI writing patterns and makes content feel naturally human-written.

## AI Writing Patterns to Eliminate

### Structural Tells
- "In today's [rapidly evolving/fast-paced/digital] landscape"
- "It's worth noting that..."
- "Let's dive into..."
- "At the end of the day..."
- "Without further ado..."
- Lists of exactly 5 bullet points for everything
- Every paragraph starting with "Additionally" or "Furthermore"
- Ending with "I hope this helps!" or "Feel free to reach out"

### Vocabulary Tells
- Utilize (say: use)
- Leverage (say: use, apply)
- Synergy (delete entirely)
- Robust (say: strong, solid, thorough)
- Comprehensive (usually delete or rewrite)
- Delve into (say: look at, explore)
- Nuanced (say: complex, specific)
- Cutting-edge (delete)

### Rhythm Tells
- Every sentence same length
- Over-qualified statements: "While it's important to consider..."
- Hedging everything: "may," "might," "could," "potentially"
- No sentence fragments. No abrupt stops.

## Humanization Techniques
1. Vary sentence length deliberately: very short. Then something longer that builds on the previous thought
2. Use contractions everywhere — don't, can't, won't, it's, I've
3. Add a specific detail only a real person would know
4. Include one unpredictable word choice per paragraph
5. Let a thought be incomplete or cut off
6. Use "I" and direct address ("you") more than passive voice

## Output
Rewritten version with tracked changes. Human score before and after (1-10).
""",

"content/notebook-llm.md": """---
skill: notebook-llm
category: Content | Knowledge Repurposing
catalyst_use: Repurposing Substack essays, converting client research, Chambers brief compilation
---

# NOTEBOOK LLM SKILL — Content Repurposing Engine

Converts articles, PDFs, videos, and websites into podcasts, quizzes, presentations, and other formats.

## Repurposing Matrix

### Input → Output Formats
| Input | → | Outputs |
|-------|---|---------|
| Long article | → | Twitter thread, carousel, email, quiz, podcast script |
| PDF report | → | Executive summary, slide deck, key points list |
| YouTube video | → | Blog post, Twitter thread, email newsletter |
| Podcast episode | → | Show notes, article, social clips |
| Research paper | → | Plain-English explainer, infographic brief, carousel |

## Podcast Script Protocol
When converting written content to podcast:
1. Conversational register — write as spoken, not read
2. Signal posts: "Coming up in a moment..." | "Here's the part most people miss..."
3. Listener questions injected at key transitions
4. No jargon without immediate plain-English follow-up
5. Emotional beats: vary pace, include stories, use pauses

## Quiz Generation
From any content piece:
- 5 comprehension questions (factual, from the content)
- 3 application questions (how would you use this?)
- 2 reflection questions (what does this mean for you?)

## Slide Deck Logic
One idea per slide. Never more.
- Title slide: hook statement, not topic name
- Each content slide: one claim + one proof
- Final slide: one action to take now

## The Great Sabotage Repurposing Protocol
For Catalyst's Substack essays:
- Extract 5 tweetable moments per essay
- Build carousel: first slide = essay title/hook, slides 2-7 = key frameworks
- Create YouTube script from each essay (10-15 min format)

## Output
Reformatted content in target format with platform-specific optimizations.
""",

"content/beautiful-prose.md": """---
skill: beautiful-prose
category: Content | Writing Style
catalyst_use: The Catalyst Manifesto, Dark Matter manuscript, Substack long-form, The Great Sabotage
---

# BEAUTIFUL PROSE SKILL — Sharp, Timeless Writing

Produces sharp, timeless prose without fluff, filler, or obvious AI writing patterns.

## The Fundamentals

### Sentence Architecture
- Vary sentence length with intention — short sentences land hard, long ones build momentum
- The period is your most powerful punctuation mark
- Every sentence must earn its place. If removing it loses nothing, remove it

### The Delete Protocol
After any draft, delete:
- The first paragraph (you almost never need your own introduction)
- Every adverb that modifies a verb (run quickly → sprint)
- "Very," "really," "quite," "rather," "somewhat"
- Passive constructions when active is available
- Any sentence that says what you just said in different words

### Voice Principles
- Write from a position, not from nowhere
- Have an opinion and state it directly
- The most interesting writing is the writer thinking, not reporting
- Specificity beats generality every time

## Prose Calibration for The Catalyst
- Reference class: Baldwin, Bukowski, McPhee — clarity married to specificity
- Never mistake complexity for depth
- The Void Perspective: observe human behavior without sentimentality
- Lagos specificity: write from inside the culture, not above it

## Long-Form Structure
- Part 1: The rupture — something is wrong, broken, or misunderstood
- Part 2: The investigation — why, what, how
- Part 3: The reframe — what it actually means
- End without moral of the story — let the reader carry the weight

## Output
Polished prose with edit rationale. Before/after comparison on request.
""",

"content/x-article-publisher.md": """---
skill: x-article-publisher
category: Content | Publishing Automation
catalyst_use: Catalyst long-form X presence, Vice Chairman X Articles, thought leadership content
---

# X ARTICLE PUBLISHER SKILL — Long-Form Twitter/X Publishing

Publishes long-form articles directly to X/Twitter with proper formatting and threading.

## X Article Architecture

### Structure for Maximum Read Time
1. HEADLINE: Promise a transformation or reveal. Specific > clever
2. OPENING PARAGRAPH: The most important thing you're going to say. Now, before anything else
3. SUBHEADINGS: Every 200-300 words. Short, declarative, interesting standalone
4. BODY: Short paragraphs. 2-3 sentences max per block. White space is not wasted space
5. PULLQUOTES: Extract the 2-3 most quotable lines. These become tweets that drive traffic back
6. CLOSING: Action or question. Give them somewhere to go

### X Algorithm Signals for Articles
- Articles with images get 2x the reach of text-only
- First 400 characters visible in feed — front-load the value proposition
- Articles that get replies within first hour get boosted
- Bookmarks are the most valuable signal (save > like)

### Thread-to-Article Bridge
Start the thread, then: "Full article in X Articles — link in first reply"
This captures scroll-by readers AND deep readers.

## Writing for X's Audience
- Shorter paragraphs than any other platform
- Bold claims first, evidence second
- Data points increase credibility and shareability
- Personal story as entry point, universal principle as exit

## Publishing Checklist
- [ ] Headline tested against 3 alternatives
- [ ] First 400 characters would stop the scroll
- [ ] Every subheading works as a standalone tweet
- [ ] CTA at end is specific (follow, subscribe, reply with X)
- [ ] Cover image optimized for 16:9 display

## Output
Full article draft formatted for X Articles. Thread version for promotion included.
""",

# ─────────────────────────────────────────────
# SOCIAL
# ─────────────────────────────────────────────
"social/tweetclaw.md": """---
skill: tweetclaw
category: Social | Twitter/X
catalyst_use: Vice Chairman Twitter, Catalyst personal X account, Sneakers Fest X strategy
---

# TWEETCLAW SKILL — Advanced Twitter/X Operations

Advanced Twitter toolkit covering posting, monitoring, extracting patterns, scheduling, and managing content workflows.

## Tweet Architecture

### Single Tweet Formats (280 chars)
- The Statement: bold claim, no hedging
- The Question: open-ended, generates replies
- The Contrast: "X is celebrated. Y is ignored. Y is actually more important."
- The List Tease: "3 things nobody talks about: [first one only, thread below]"
- The Callback: reference something from news/culture + your angle

### Thread Structure
- Tweet 1: The hook (must work standalone)
- Tweets 2-8: One point each. Evidence. Example. Insight
- Tweet 9: Summary or pattern recognition
- Final tweet: CTA (follow for more | save this | reply with X)

## Engagement Mechanics
- Reply to every comment in first 2 hours (algorithmic signal)
- Quote tweet your own threads with the best single insight
- Like before you reply — builds warmth in the interaction
- Engage with accounts 10x your size before posting — warm the timeline

## Content Mining Protocol
To extract viral patterns from competitor accounts:
1. Filter by: most likes | most replies | most retweets (separate signals)
2. Identify: hook type | length | topic angle | posting time
3. Extract the STRUCTURE, not the content
4. Rebuild with your own substance

## Monitoring Setup
Track these terms daily for Nigerian professional/creative audience:
- "Lagos" + business/money/brand
- "Nigeria" + AI/automation/tech
- Sneakers Fest keyword cluster
- Catalyst Concepts brand mentions

## Scheduling Logic
- Post frequency: 3-5x daily for growth phase
- Best times WAT: 8am | 1pm | 8pm
- Never schedule without a manual engagement session after posting

## Output
Tweet calendar, thread drafts, monitoring dashboard setup instructions.
""",

"social/twitter-optimizer.md": """---
skill: twitter-optimizer
category: Social | Social Media
catalyst_use: Optimizing all X posts before publishing, client social media review
---

# TWITTER OPTIMIZER SKILL — Algorithm-Native Tweet Rewriting

Rewrites tweets using real Twitter algorithm insights to maximize reach and engagement.

## What the X Algorithm Actually Rewards (as of 2025)
- Replies > retweets > likes (reply = highest engagement signal)
- Long replies to popular tweets (positions you in high-traffic threads)
- Original tweets that generate discussion (controversial but not ban-worthy)
- Bookmarks signal "save for later" = high value content
- Dwell time: longer reading = better distribution

## Rewriting Protocol

### Step 1: Diagnose the Original
- Hook strength: does line 1 demand reading?
- Specificity: vague claims vs. concrete examples?
- Discussion potential: does it invite response or close the loop?
- Length: too long loses people, too short misses depth opportunity

### Step 2: Apply Optimizations
- Move the most interesting part to tweet position 1
- Cut any introductory context (start in the middle)
- Add specificity: numbers, names, timeframes, places
- End with an open question OR a strong close (not both)
- Remove qualifiers ("I think," "maybe," "sort of")

### Step 3: Maximize Engagement Surface
- If thread: make every tweet quotable
- If single: 100-200 chars performs better than 280
- If data: include the number in tweet 1, explanation in thread
- If story: start at peak tension, flashback to context

## The Clarity Test
Read the tweet aloud. If you hesitate anywhere, that word or phrase needs to change.

## Output
Rewritten version with explanation of each change made. Engagement prediction (Low/Medium/High/Viral).
""",

"social/sm-research.md": """---
skill: sm-research
category: Social | Research
catalyst_use: Trend monitoring, client audience research, Sneakers Fest market intelligence
---

# SM RESEARCH SKILL — Social Media Intelligence System

Tracks public opinion and online trends using Reddit, Twitter/X, and platform discussions.

## Research Frameworks

### Trend Detection Protocol
1. Signal sources: Twitter trending topics + Reddit Hot + TikTok trending sounds
2. Filter for relevance: intersection of trend + your audience's interests
3. Speed window: act within 4 hours of trend emergence for maximum amplification
4. Evaluate: is this a moment (24hr) or a movement (weeks)?

### Audience Research Method
For any target demographic:
1. Find the subreddits they live in (r/Nigeria, r/sneakers, r/startups)
2. Read the top posts from last 30 days
3. Extract: pain points | language they use | what they celebrate | what they complain about
4. Use their exact language in your content (not your industry language)

### Competitor Intelligence
- What is your competitor posting that gets 5x their average engagement?
- What topics do they avoid? (opportunity or minefield — determine which)
- Where is the gap in their content that your audience wants?

## Nigeria-Specific Research Sources
- Twitter/X Nigeria: #LagosBusiness #NaijaTwitter #NigerianEntrepreneur
- Reddit: r/Nigeria, r/lagos, r/NIgerianPolitics, r/africatech
- Facebook Groups: still dominant for Nigerian professional communities
- WhatsApp: pulse monitoring via group sentiment (not scraped, observed)

## Sneakers Market Intelligence
- StockX trending: what's moving in Nigerian-accessible price range
- Instagram hashtag volume: #NigerianSneakerheads tracking
- Twitter: sneaker drops discussion, disappointments, celebrations

## Output
Weekly trend brief. Opportunity map: 5 content angles to capture now.
""",

# ─────────────────────────────────────────────
# MARKETING
# ─────────────────────────────────────────────
"marketing/wondelai.md": """---
skill: wondelai
category: Marketing | Growth & Product Strategy
catalyst_use: Client growth strategy, CatalystOS service packaging, Za.ally product development
---

# WONDELAI SKILL — Growth & Product Strategy Framework

Framework-based skills covering UX, marketing, sales, product growth, and conversion optimization.

## The Growth Framework Stack

### Acquisition Layer
- Channel selection: where does your best customer already spend time?
- Message-market fit: does your language match their internal monologue?
- Offer mechanics: what makes them click NOW vs. "later" (which means never)

### Activation Layer  
- Time to first value: how fast do new users/clients experience the core benefit?
- Onboarding friction audit: every step that requires effort loses 10-30% of people
- The "aha moment": identify it, then move everything to get there faster

### Retention Layer
- Habit formation: what brings them back without a push notification?
- Progress metrics: people stay when they can see they're improving
- Community and identity: belonging is more powerful than features

### Revenue Layer
- Pricing psychology: anchor, decoy, and charm pricing
- Upsell timing: after first success moment, not before
- Expansion revenue: additional services to existing clients > new client acquisition

## Conversion Optimization
- Landing page hierarchy: promise → proof → process → CTA
- CTA copy: specific action + specific outcome ("Get my free audit" > "Submit")
- Trust signals: real names, real results, real faces
- Urgency: real scarcity only (false urgency destroys trust permanently)

## CatalystOS Application
For each service line (Events, Social Media, Marketing, AI Consulting, Content):
- Define the activation moment (first win the client experiences)
- Map the expansion path (what does a 12-month client look like?)
- Build the referral trigger (what makes them tell others?)

## Output
Growth audit with prioritized action items. 90-day growth plan.
""",

"marketing/marketing-skills.md": """---
skill: marketing-skills
category: Marketing | Content Marketing
catalyst_use: All Catalyst Concepts marketing, client campaign strategy, Sneakers Fest promotion
---

# MARKETING SKILLS — Full-Stack Marketing System

SEO, ad creatives, growth systems, analytics, and short-form content strategies.

## The Marketing Operating System

### Organic Traffic (SEO)
- Keyword research: search intent first (informational | navigational | commercial | transactional)
- Content clusters: pillar page + supporting articles (topic authority > individual keywords)
- On-page: title tag, meta description, H1 alignment with primary keyword
- Link building: earn links by being the best source on the topic

### Paid Ads Architecture
- Testing hierarchy: audience → creative → offer (test in this order)
- Creative framework: hook (1-3s) → problem (3-8s) → solution (8-20s) → proof (20-35s) → CTA (35-45s)
- Budget allocation: 80% to winning creatives, 20% to testing new
- Attribution: understand the lag between ad spend and conversion

### Email Marketing
- List segmentation: buyer vs. browser vs. brand-new
- Sequence timing: welcome (immediate) → value (day 2) → case study (day 5) → offer (day 8)
- Subject line rules: specific + personal + low-pressure > generic + salesy
- Deliverability: clean your list every 90 days

### Analytics Stack
- North Star Metric: one number that represents growth
- Weekly metrics: traffic, conversions, revenue, retention
- Monthly review: channel attribution, content performance, funnel drop-off points

## Nigeria-Specific Marketing Notes
- WhatsApp Business: still the highest-converting direct channel in Nigeria
- Payment friction: multiple payment options (Paystack, Flutterwave, bank transfer)
- Trust signals: Nigerian social proof > international (local context matters)

## Output
Marketing audit, channel strategy, 90-day campaign calendar.
""",

"marketing/email-marketing.md": """---
skill: email-marketing
category: Marketing | Email
catalyst_use: Catalyst Concepts client retention, Sneakers Fest attendee nurture, newsletter ops
---

# EMAIL MARKETING SKILL — Complete Email System

Complete email marketing system for segmentation, deliverability, lifecycle flows, and retention.

## Email System Architecture

### List Health
- Validate on signup (never let bad addresses in)
- Segment from day 1: source | interest | behavior
- Clean every 90 days: remove non-openers after re-engagement attempt
- Re-engagement sequence: 3 emails, then unsubscribe inactive

### Deliverability Fundamentals
- SPF, DKIM, DMARC records — non-negotiable (check quarterly)
- Warm up new sending domains over 4-6 weeks
- Spam trigger words to avoid in subject: FREE, URGENT, WINNER, GUARANTEED
- Plain text version must exist alongside HTML
- Unsubscribe link must work immediately

### Lifecycle Flows

**Welcome Sequence (5 emails)**
1. Day 0: Immediate — deliver the lead magnet, set expectations
2. Day 2: Your story — why you exist, what you believe
3. Day 5: Best content — most valuable thing you've created
4. Day 8: Social proof — a real result from a real person
5. Day 12: Soft offer — low-friction first purchase or call

**Post-Purchase**
1. Confirmation: order details + what happens next
2. Day 3: Onboarding tip #1
3. Day 7: Onboarding tip #2
4. Day 14: Check-in + upsell opportunity
5. Day 30: Review request + referral ask

### Subject Line Formulas
- "[First name], this is why you're not seeing results"
- "The thing I wish I told you last week"
- "Quick question about [topic they care about]"
- "This is embarrassing but..."
- "How [similar person] [achieved result] in [timeframe]"

## Output
Full email sequence drafts, segmentation strategy, deliverability checklist.
""",

"marketing/competitive-ads.md": """---
skill: competitive-ads
category: Marketing | Ad Research
catalyst_use: Client ad strategy, Sneakers Fest paid promotion, AI consulting competitive intel
---

# COMPETITIVE ADS SKILL — Ad Intelligence & Analysis

Extracts competitor ad patterns and analyzes messaging for better marketing campaigns.

## Ad Intelligence Sources
- Meta Ad Library: facebook.com/ads/library (free, public)
- TikTok Creative Center: trending ads by category
- Google Ads Transparency Center
- LinkedIn Ad Library
- Twitter/X Ads Transparency

## Analysis Framework

### What to Extract from Each Ad
1. Hook type (first 3 seconds): emotion | problem | curiosity | social proof
2. Offer: what exactly are they selling, how is it framed?
3. Price signal: premium positioning or accessible?
4. Social proof type: testimonial | numbers | logos | before-after
5. CTA: soft (learn more) or hard (buy now)?
6. Visual style: UGC | studio | animated | text-only

### Pattern Recognition
After analyzing 10+ ads from competitors:
- What hooks appear most frequently? (most tested = most proven)
- What offers dominate? (market knows what works)
- What angle is MISSING? (opportunity for differentiation)
- What claims do they avoid? (regulatory risk or unproven claims)

### Nigerian Market Ad Patterns
- Testimonials with Nigerian names and faces convert higher than international
- WhatsApp CTA outperforms website link for Nigerian audiences
- Price in Naira with installment options increases conversions
- Naija English vs. formal English — know your audience segment

## Rebuilding Protocol
Take winning ad structure → swap in your brand, offer, and social proof
Test your version against their structure
Scale what beats the control

## Output
Competitor ad matrix, pattern analysis, 5 ad concepts to test.
""",

"marketing/deep-research.md": """---
skill: deep-research
category: Marketing | Research
catalyst_use: Chambers legal research, Sneakers Fest market analysis, client strategy development
---

# DEEP RESEARCH SKILL — Multi-Stage Research Engine

Multi-stage research engine with source verification and high-quality intelligence gathering.

## Research Protocol (5 Stages)

### Stage 1: Scope Definition
- Primary question: what exactly needs to be answered?
- Sub-questions: what do you need to know to answer the primary?
- Constraints: time period, geography, source type
- Output format: brief | report | data set | decision matrix

### Stage 2: Source Mapping
Primary sources (highest trust):
- Official statistics (NBS for Nigeria, World Bank, IMF)
- Court records and legal databases
- Company filings and annual reports
- Academic journals (Google Scholar, JSTOR, ResearchGate)
- Government databases and policy documents

Secondary sources:
- Quality journalism (The Economist, FT, ThisDay, Punch for Nigeria)
- Industry reports (McKinsey, Deloitte, PwC)
- Think tanks relevant to region/industry

Avoid: uncorroborated social media, anonymous sources for factual claims

### Stage 3: Information Gathering
- Cross-reference every major claim with minimum 2 independent sources
- Note source bias and funding when relevant
- Date-stamp all data points (stale data = misinformation)

### Stage 4: Synthesis
- Separate facts from interpretations from predictions
- Surface contradictions and explain them
- State confidence level for each major conclusion: High | Medium | Low

### Stage 5: Intelligence Product
- Executive summary: 3-5 bullets, key findings only
- Full report with source citations
- Uncertainty flags where confidence is low

## CatalystOS Research Defaults
For Chambers client: Nigerian Law, Lagos State regulations, property law precedents
For Sneakers Fest: Nigerian retail market, Gen Z spending behavior, Lagos event industry
For AI consulting: Nigerian tech adoption, SME digitization data

## Output
Research report with executive summary, full findings, source list, confidence ratings.
""",

"marketing/academic-research.md": """---
skill: academic-research
category: Marketing | Academic Writing
catalyst_use: Chambers legal brief research, Substack citation backbone, client white papers
---

# ACADEMIC RESEARCH SKILL — End-to-End Research Workflow

End-to-end academic research workflow with revisions, style calibration, and AI pattern detection.

## Research Methodology

### Literature Review Protocol
1. Define the scope: topic, time range, geographic scope
2. Database search: Google Scholar, JSTOR, ResearchGate, PubMed (if medical)
3. Citation tracking: forward citations reveal impact, backward citations reveal foundation
4. Saturation point: stop when new sources repeat existing points

### Citation Standards
- APA 7th: (Author, Year) in-text | full reference at end
- Harvard: (Author Year) | alphabetical reference list
- OSCOLA (legal): footnote citation | table of cases | bibliography
- Chicago: footnote + bibliography

### Methodology Types
- Qualitative: interviews, observation, document analysis
- Quantitative: surveys, experiments, statistical analysis
- Mixed methods: both, with clear rationale for combination
- Literature review: synthesis of existing research

## AI Pattern Detection in Research
Flags to watch for AI-generated academic content:
- Suspiciously balanced arguments with no actual position
- Generic citations that don't exist on verification
- No specific data — only claims
- Same structure repeated across multiple sections
- Passive voice everywhere

## Writing Standards
- Claim → Evidence → Analysis (not Claim → Claim → Claim)
- Primary sources > secondary sources where possible
- Hedging language is appropriate in academic context ("suggests," "indicates," "may")
- Every paragraph one idea

## Output
Literature review, annotated bibliography, research brief, or full academic paper.
""",

"marketing/kim-barrett.md": """---
skill: kim-barrett
category: Marketing | Copywriting
catalyst_use: Client ad copy, Sneakers Fest sales messaging, CatalystOS service offers
---

# KIM BARRETT SUITE SKILL — Direct-Response Marketing

Advanced direct-response marketing toolkit for headlines, offers, objections, and conversion messaging.

## Direct Response Fundamentals
Direct response copy has ONE job: get the action NOW.
Unlike brand advertising (awareness), direct response demands an immediate, measurable response.

## The Offer Architecture

### Irresistible Offer Formula
1. Core product/service (what they're paying for)
2. Bonus stack (adds perceived value beyond price)
3. Risk reversal (guarantee removes the reason not to buy)
4. Urgency/scarcity (real reason to act now)
5. Price anchoring (make the price feel like a steal)

### Headline Formulas
- "How to [desired result] without [common objection]"
- "[Number] secrets to [desired result] that [authority] don't want you to know"
- "Finally: a [product category] that [unique claim]"
- "[Timeframe] to [result]: the [adjective] system for [audience]"

## Objection Map & Responses
Every buyer has 4 objections:
1. Time: "I don't have time" → "This saves you 5 hours a week"
2. Money: "I can't afford it" → "What does NOT solving this cost you?"
3. Trust: "Why should I believe you?" → Specific proof, not vague claims
4. Skepticism: "It won't work for me" → "Here's someone exactly like you"

## Nigerian Market Copy Adjustments
- Proof must feel local: Nigerian names, Naira figures, Lagos-specific contexts
- WhatsApp is primary CTA channel (not website forms)
- Payment friction acknowledgment: offer multiple options upfront
- Community trust signals > individual influencer trust

## Output
Full sales page, email sequence, or ad copy with all sections. Swipe file of top-performing frameworks.
""",

"marketing/marketing-module.md": """---
skill: marketing-module
category: Marketing | System
catalyst_use: Comprehensive marketing build for any client or internal project
---

# MARKETING MODULE SKILL — Complete Marketing Automation System

Huge collection of SEO, growth, sales, CRO, and content marketing automation tools.

## The Complete Marketing Stack

### SEO Module
- Keyword research: volume, difficulty, intent, business value score
- Content brief generator: structure, word count, internal link map
- On-page audit: title, meta, headings, image alt, schema
- Technical SEO checklist: crawlability, speed, mobile, Core Web Vitals
- Backlink profile review: domain authority, anchor diversity, toxic links

### Growth Hacking Module
- Viral loop design: what makes users invite others organically?
- Referral program mechanics: two-sided incentives (giver and receiver both benefit)
- A/B test design: one variable at a time, statistical significance required
- Conversion rate optimization: funnel analysis, heat mapping interpretation

### Sales Module
- Outreach sequence: LinkedIn → Email → Call (warm up before ask)
- Proposal template: executive summary → problem → solution → proof → investment → next steps
- Follow-up cadence: Day 1 → Day 3 → Day 7 → Day 14 → Day 30
- Objection handling scripts by objection type

### CRO Module
- Landing page formula: Headline → Sub-headline → Hero image → Benefits → Social proof → CTA
- Button copy: action verb + specific outcome ("Get my free audit" > "Click here")
- Form optimization: fewer fields = higher conversion (name + email only for lead gen)
- Trust signals placement: near the CTA, not buried below the fold

### Content Automation
- Content calendar automation: topic cluster calendar auto-generates from keyword set
- Social scheduling: buffer from blog → social posts across platforms
- Email trigger logic: behavior-based sends (visited pricing page → send case study)

## Output
Full marketing system build-out with implementation order and automation setup.
""",

# ─────────────────────────────────────────────
# RESEARCH
# ─────────────────────────────────────────────
"research/autoresearch.md": """---
skill: autoresearch
category: Research | Automation
catalyst_use: Autonomous client research, Sneakers Fest market monitoring, weekly intelligence briefings
---

# AUTORESEARCH SKILL — Self-Improving Research Workflow

Self-improving AI workflow that continuously modifies, verifies, and optimizes research tasks.

## Autonomous Research Protocol

### Phase 1: Query Decomposition
Break every research task into sub-questions:
- Main question → 3-5 specific answerable sub-questions
- For each sub-question: identify the best source type
- Build dependency map: which answers are needed first?

### Phase 2: Source Hierarchy
Tier 1 (verify here first): Official databases, primary documents, academic sources
Tier 2 (confirm with multiple): Quality journalism, industry reports
Tier 3 (context only): Social media, forums, opinion pieces

### Phase 3: Verification Loop
For every key claim:
1. Find it in source A
2. Find independent confirmation in source B
3. Check if source C contradicts it
4. If contradiction exists: investigate the reason, don't just pick one

### Phase 4: Quality Check
Before delivering research:
- [ ] All statistics have source and date
- [ ] No claims stated as fact without verification
- [ ] Contradictions acknowledged, not hidden
- [ ] Confidence levels assigned to each major conclusion

### Phase 5: Self-Optimization
After each research task:
- What source proved most reliable for this topic?
- What search terms found the best results?
- What gaps remain? (flag for follow-up)

## Continuous Monitoring Setup
For recurring topics (Sneakers Fest market, Nigerian AI landscape, Chambers law updates):
- Define monitoring keywords
- Weekly scan schedule
- Delta report: what changed since last scan?

## Output
Research report with source trail, confidence ratings, and gaps identified.
""",

"research/evidence-dialogue.md": """---
skill: evidence-dialogue
category: Research | Critical Thinking
catalyst_use: Strategy debates, client recommendations, decision-making under uncertainty
---

# EVIDENCE DIALOGUE SKILL — Anti-Sycophancy Thinking System

Replaces AI agreement with structured analysis, honest tradeoffs, and evidence-backed reasoning.

## The Problem This Solves
AI defaults to telling you what you want to hear. This skill forces honest analysis even when it means disagreeing with the premise.

## Evidence Dialogue Protocol

### Step 1: State the Claim
What is being proposed or believed? Write it explicitly.

### Step 2: Steel-man the Claim
What is the strongest possible case FOR this being true?
Use real evidence. Don't build a strawman to knock down.

### Step 3: Challenge the Claim
What evidence contradicts or complicates this?
What assumptions is this resting on?
What would need to be true for this to be wrong?

### Step 4: Tradeoff Map
Every decision has costs. Map them:
- If we do X: what do we gain? what do we lose? what do we risk?
- If we don't do X: same analysis

### Step 5: Confidence Rating
- High confidence: multiple independent sources agree, clear evidence trail
- Medium confidence: some evidence, some gaps, some assumptions
- Low confidence: mostly inference, weak evidence base, should verify before acting

### Step 6: Decision
Given the evidence, what is the most defensible position?
State it directly. No waffling.

## Anti-Patterns to Flag
- Confirmation bias: only seeking evidence that confirms existing belief
- Appeal to authority: X said it, therefore it's true (authority + evidence > authority alone)
- Recency bias: assuming the last data point is the trend
- Availability heuristic: vivid examples feeling more common than they are

## CatalystOS Application
Run every major strategic decision through this protocol before committing.

## Output
Structured analysis with all 6 steps. Clear recommendation with confidence rating.
""",

"research/jtbd-interview.md": """---
skill: jtbd-interview
category: Research | Customer Research
catalyst_use: Client discovery, Sneakers Fest attendee research, service positioning refinement
---

# JTBD INTERVIEW TOOL SKILL — Jobs-to-Be-Done Framework

Converts customer interviews into structured insights, messaging, and JTBD frameworks.

## Jobs-to-Be-Done Theory
People don't buy products — they hire them to do a job.
The "job" is the progress they're trying to make in a specific circumstance.

## Interview Protocol (45-60 min)

### Opening (5 min)
"Tell me about the last time you [used category/made purchase]. Walk me through that day."
Let them narrate. Don't interrupt. Don't suggest.

### Timeline Excavation (20 min)
- "When did you first realize you needed this?"
- "What were you doing when the idea first came to you?"
- "What happened right before you started looking for a solution?"
- "Who else was involved in the decision?"

### Decision Deep-Dive (15 min)
- "What made you choose [this option] over alternatives?"
- "What were you worried about when you made the decision?"
- "How did you feel after?"
- "What surprised you?"

### Progress Mapping (10 min)
- "What were you trying to accomplish?"
- "What were you struggling with in your life before?"
- "What does success look like for you with this?"

## JTBD Output Framework
From interviews, extract:
- Functional job: what they literally needed done
- Emotional job: how they wanted to feel
- Social job: how they wanted to be perceived
- Circumstances: the specific context that triggered the purchase

## Messaging Application
JTBD insight → positioning copy:
"For [person in circumstance], who is trying to [functional job] while feeling [emotional state], [product] is the [category] that [unique differentiator] so they can [desired progress]."

## Output
Interview guide, synthesis framework, positioning statement, messaging matrix.
""",

# ─────────────────────────────────────────────
# VIDEO
# ─────────────────────────────────────────────
"video/remotion.md": """---
skill: remotion
category: Video | Development
catalyst_use: Automated video content, Sneakers Fest recap reels, data visualization videos
---

# REMOTION SKILL — Programmatic Video with React

Creates cinematic videos programmatically with React animations, captions, effects, and rendering workflows.

## Remotion Core Concepts

### The Video as Code Model
- Every frame is a React component rendered at a specific time
- useCurrentFrame() → current frame number
- interpolate() → map frame range to value range
- spring() → physics-based animation curves
- Sequence → component appears at frame X for duration Y

### Basic Scene Structure
```jsx
const {fps, durationInFrames, width, height} = useVideoConfig();
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
```

### Composition Setup
- Width: 1080 (portrait) or 1920 (landscape)
- Height: 1920 (portrait) or 1080 (landscape)
- FPS: 30 (social) or 60 (high quality)
- Duration: calculated from seconds × fps

### Animation Patterns
- Fade in: interpolate opacity 0→1 over first N frames
- Slide in: interpolate translateX -100→0 over first N frames
- Spring bounce: spring({frame, fps, config: {damping: 80}})
- Stagger: offset each element's animation by frame delay

## Caption System
- Generate SRT from transcript
- Parse SRT into frame-accurate caption objects
- Render caption as styled div over video at correct frames
- Style: bold, white text, black background, centered bottom

## Render Pipeline
1. npm start → preview
2. npx remotion render → local MP4
3. Lambda render → cloud-based for long videos

## CatalystOS Use Cases
- Sneakers Fest countdown: animated numbers with particle effects
- Social clip automation: 60-second highlights with auto-captions
- Data visualization: animated bar/line charts from CSV data

## Output
Full Remotion composition code, render configuration, example scenes.
""",

"video/ai-video-production.md": """---
skill: ai-video-production
category: Video | Production
catalyst_use: Full UGC pipeline, Sneakers Fest content, client video campaigns
---

# AI VIDEO PRODUCTION SKILL — Full AI-Native Video Workflow

Complete AI-native video production pipeline from scripting through rendering to polished MP4.

## The Full Pipeline

### Stage 1: Script
- Hook (0-3s): Pattern interrupt. Bold claim or visual surprise
- Setup (3-15s): Context, problem, or scenario
- Body (15-50s): Value delivery or story progression
- Payoff (50-60s): Resolution, transformation, or CTA

### Stage 2: Asset Generation

**AI Avatar (Higgsfield / HeyGen / Synthesia)**
- Choose avatar matching target audience demographics
- Lip-sync script to avatar
- Background: relevant setting, not green screen

**AI B-Roll (Runway / Kling / Pika)**
- Generate scene-by-scene from script descriptions
- Consistent color grade across all generated clips
- Product shots: 3D render style or photorealistic depending on brand

**AI Voiceover (ElevenLabs)**
- Clone voice from 5-minute recording sample
- Emotion control: conversational for UGC, professional for corporate
- Export: 44.1kHz WAV for video editing

### Stage 3: Assembly
- Edit order: hook cut → B-roll → talking head → product → CTA
- Caption burn-in at 80% screen width, bottom quarter
- Music: 20% volume under voice, full for non-spoken segments
- Color grade: match Sneakers Fest Lagos Noir or client brand palette

### Stage 4: Export Specs
- Instagram/TikTok: 1080×1920, H.264, AAC, 30fps, <50MB
- YouTube Shorts: same as above
- YouTube long: 1920×1080 or 3840×2160 (4K), 60fps
- Twitter/X: 1280×720 minimum, <512MB

## CatalystOS + Higgsfield Integration
Claude Code via Playwright MCP → Higgsfield.ai:
1. Claude generates image prompts from script
2. Uploads product image to Higgsfield
3. Triggers video generation via browser automation
4. Downloads finished clips to local folder

## Output
Full production brief. Script. Shot list. Asset generation prompts. Edit decision list.
""",

"video/generative-media.md": """---
skill: generative-media
category: Video | Multi-Modal AI
catalyst_use: All AI-generated visual content, client campaigns, Sneakers Fest media assets
---

# GENERATIVE MEDIA SKILL — Cross-Platform AI Media Toolkit

Cross-platform toolkit for generating AI-powered image, video, and audio media content.

## The Generative Media Stack

### Image Generation
**Tools by use case:**
- Photorealistic people: Higgsfield, Midjourney v6, Flux Pro
- Product photography: GPT-4o Image, Ideogram (text accuracy), DALL-E 3
- Illustration/art: Midjourney, Adobe Firefly, Stable Diffusion XL
- Logo/branding: Looka, Brandmark, Adobe Express

**Prompt Architecture:**
[Subject] + [Environment] + [Lighting] + [Camera] + [Style] + [Mood] + [Technical]

### Video Generation
**Short clips (2-10s):**
- Runway Gen-3 Alpha: cinematic, motion quality leader
- Kling 1.6: realistic movement, good for people
- Pika 2.0: fast, good for product animations
- Higgsfield: UGC style, avatar-in-product workflow

**Full scenes (10-30s):**
- Sora: highest quality, limited access
- Veo 2 (Google): photorealistic, strong physics
- Kling Pro: extended duration, consistent characters

### Audio Generation
**Music:** Suno AI (full songs), Udio (tracks), Mubert (background)
**Voice:** ElevenLabs (cloning + synthesis), PlayHT, Coqui
**SFX:** ElevenLabs SFX, Adobe Podcast, Freesound

## Sneakers Fest Media Brief
- Product reveals: Higgsfield UGC + Runway B-roll
- Atmosphere: Midjourney Lagos urban night scenes
- Music: Suno — Afrobeats/Amapiano fusion, high energy
- Voiceover: ElevenLabs, male Nigerian accent, hype energy

## Consistency Protocol
For a branded series: generate a reference sheet first (character, setting, lighting) then use it as style reference for all subsequent generations.

## Output
Media generation plan with tool selection, prompts for each asset, and quality benchmark criteria.
""",

# ─────────────────────────────────────────────
# ENGINEERING
# ─────────────────────────────────────────────
"engineering/superpowers.md": """---
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
""",

"engineering/repomix.md": """---
skill: repomix
category: Engineering | Codebase Management
catalyst_use: Compressing CatalystOS repos for AI analysis, client codebase reviews
---

# REPOMIX SKILL — Repository Compression for AI

Compresses entire repositories into AI-friendly formats for large-scale code analysis.

## What Repomix Does
Converts a codebase into a single, structured text file that:
- Maintains file hierarchy context
- Strips unnecessary binary/generated files
- Preserves imports and dependencies visible
- Formats consistently for LLM consumption

## Repomix CLI Usage
```bash
npx repomix                              # Current directory
npx repomix --output output.txt          # Custom output file
npx repomix --include "src/**/*.ts"      # Include filter
npx repomix --ignore "node_modules/**"   # Ignore filter
npx repomix --style xml                  # XML format (best for Claude)
npx repomix --compress                   # Remove comments and whitespace
```

## Configuration File (.repomixrc)
```json
{
  "output": {
    "filePath": "repomix-output.txt",
    "style": "xml",
    "compress": true
  },
  "ignore": {
    "customPatterns": ["*.test.ts", "dist/**", ".env*"]
  }
}
```

## CatalystOS Application
Use Repomix when:
- Asking Claude to audit an entire codebase
- Reviewing client code deliverables
- Debugging complex multi-file issues
- Onboarding Claude to a new project context

## Output Size Management
- Full repo output: often 50K-200K tokens (use carefully)
- Targeted output: filter to relevant directories only
- Compressed mode: reduces token count by 30-50%

## Output
Repomix config for CatalystOS projects, analysis workflow, compression guidelines.
""",

"engineering/antfu.md": """---
skill: antfu
category: Engineering | Developer Toolkit
catalyst_use: Frontend development standards, open-source tooling, CatalystOS JS stack
---

# ANTFU SKILLS — Production-Grade Engineering Toolkit

Curated production-grade engineering skills inspired by Anthony Fu's open-source standards.

## The Antfu Philosophy
- Tools should remove friction, not add it
- Configuration should be minimal but opinionated
- Code quality is non-negotiable, not a nice-to-have
- Open source is how you build reputation that compounds

## ESLint Config (Antfu Standard)
```bash
npm i -D eslint @antfu/eslint-config
```
```js
// eslint.config.js
import antfu from '@antfu/eslint-config'
export default antfu({
  typescript: true,
  vue: true,  // or react: true
  stylistic: {
    indent: 2,
    quotes: 'single',
  }
})
```

## Vite Project Setup
```bash
npm create vite@latest my-app -- --template react-ts
```
Key Vite plugins: @vitejs/plugin-react, vite-plugin-pages, unplugin-auto-import

## TypeScript Strictness
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Package Management (ni — Use Correct Package Manager)
```bash
npm i -g @antfu/ni
ni          # installs (detects npm/pnpm/yarn/bun)
nr dev      # runs dev
nun         # uninstalls
```

## Monorepo Setup (pnpm workspaces)
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

## CatalystOS JavaScript Standards
- pnpm for package management
- Vite for bundling
- TypeScript strict mode always
- Antfu ESLint config
- Vitest for testing

## Output
Tooling setup scripts, config files, project scaffolding templates.
""",

"engineering/dev-browser.md": """---
skill: dev-browser
category: Engineering | Browser Automation
catalyst_use: Playwright automation, Higgsfield browser control, web testing pipelines
---

# DEV BROWSER SKILL — Autonomous Web Browsing

Gives AI autonomous web browsing abilities for QA, automation, and online research tasks.

## Playwright Foundation
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://target.com")
    page.fill("#username", "user@email.com")
    page.click("button[type='submit']")
    content = page.content()
    browser.close()
```

## Automation Patterns

### Login Automation
```python
def login(page, url, username, password):
    page.goto(url)
    page.fill('[name="email"]', username)
    page.fill('[name="password"]', password)
    page.click('[type="submit"]')
    page.wait_for_load_state("networkidle")
```

### Data Extraction
```python
items = page.query_selector_all('.product-card')
data = []
for item in items:
    data.append({
        'title': item.query_selector('h2').text_content(),
        'price': item.query_selector('.price').text_content(),
    })
```

### Screenshot and Recording
```python
page.screenshot(path="screenshot.png", full_page=True)
# Video recording:
context = browser.new_context(record_video_dir="videos/")
```

## Higgsfield MCP Integration (CatalystOS)
1. Launch browser in non-headless mode
2. Navigate to higgsfield.ai
3. Upload product image via file input
4. Set prompt parameters
5. Trigger generation
6. Wait for completion (polling or network idle)
7. Download output files
8. Organize into CatalystOS folder structure

## Anti-Detection
- Use realistic viewport (1280×800)
- Random delays between actions (0.5-2s)
- Rotate user agents
- Disable WebDriver flag

## Output
Playwright scripts for target workflows. Error handling included.
""",

"engineering/vexor-search.md": """---
skill: vexor-search
category: Engineering | Semantic Search
catalyst_use: CatalystOS knowledge base, Chambers document search, content archive retrieval
---

# VEXOR SEARCH SKILL — Vector-Powered Semantic Search

Vector-powered search system that intelligently finds files and hidden contextual information.

## How Vector Search Works
Unlike keyword search (exact match), vector search:
1. Converts text to numerical vectors (embeddings) using an embedding model
2. Stores vectors in a vector database
3. On query, converts query to vector
4. Finds documents with closest vector distance (semantic similarity)
Result: "sneakers event Lagos" finds documents about "Sneakers Fest Nigeria" even without exact keywords

## Tech Stack Options

### Local (CatalystOS)
- Embeddings: sentence-transformers (Python), nomic-embed-text
- Vector DB: ChromaDB (embedded, no server needed)
- Search: cosine similarity via ChromaDB query

### Cloud
- Embeddings: OpenAI text-embedding-3-small | Cohere embed
- Vector DB: Pinecone | Weaviate | Qdrant
- Hybrid search: vector + keyword (BM25) for best results

## ChromaDB Quick Setup
```python
import chromadb
from chromadb.utils import embedding_functions

client = chromadb.PersistentClient(path="./catalystos_kb")
ef = embedding_functions.SentenceTransformerEmbeddingFunction("all-MiniLM-L6-v2")
collection = client.get_or_create_collection("documents", embedding_function=ef)

# Add documents
collection.add(documents=["Full text of document"], ids=["doc_001"])

# Search
results = collection.query(query_texts=["my search query"], n_results=5)
```

## CatalystOS Knowledge Base Architecture
- Collections: projects | clients | substack_essays | sops | legal_docs
- Metadata fields: date, category, project_code, source
- Update cadence: daily sync from Obsidian vault

## Output
Vector search setup for CatalystOS, ChromaDB configuration, query interface.
""",

"engineering/skill-seekers.md": """---
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
""",

"engineering/web-scraper.md": """---
skill: web-scraper
category: Engineering | Web Automation
catalyst_use: Market research automation, competitor monitoring, content aggregation
---

# WEB SCRAPER SKILL — Intelligent Multi-Strategy Scraping

Intelligent multi-strategy scraping system with validation, stealth browsing, and API detection.

## Scraping Strategy Selection

### Strategy 1: Direct HTTP (Fastest, simplest)
Use when: static HTML pages, no JavaScript rendering needed
```python
import httpx
from bs4 import BeautifulSoup

response = httpx.get("https://target.com", headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(response.text, "html.parser")
data = soup.select(".product-title")
```

### Strategy 2: Playwright (Dynamic sites)
Use when: JavaScript-rendered content, infinite scroll, login required
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://target.com")
    page.wait_for_selector(".content")
    html = page.content()
```

### Strategy 3: API Detection (Most stable)
Before scraping HTML: check if there's a public API
- Open DevTools → Network → XHR/Fetch tab
- Find the JSON endpoints the site uses
- Call the API directly (faster, more reliable than scraping HTML)

## Anti-Bot Evasion
```python
# Realistic headers
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://google.com"
}
# Random delays
import time, random
time.sleep(random.uniform(1.5, 4.0))
```

## Data Validation
Before storing scraped data:
- Type check: is price actually a number?
- Range check: is price in expected range (not $0 or $1M)?
- Completeness: are required fields present?
- Deduplication: have we seen this item before?

## Legal & Ethical
- Check robots.txt before scraping
- Don't overload servers (rate limit requests)
- Don't scrape personal data without purpose
- Respect Terms of Service for commercial use

## Output
Working scraper for target site. Data pipeline to structured storage. Error handling included.
""",

# ─────────────────────────────────────────────
# SEO
# ─────────────────────────────────────────────
"seo/geo-seo.md": """---
skill: geo-seo
category: SEO | AI Optimization
catalyst_use: Making Catalyst Concepts content discoverable by AI systems, client SEO strategy
---

# GEO/SEO CLAUDE SKILL — AI Search Optimization

Optimizes content for AI search visibility, citations, authority, and discoverability.

## GEO: Generative Engine Optimization
As AI systems (ChatGPT, Claude, Perplexity, Gemini) replace traditional search for many queries, content needs to be optimized for AI citation, not just Google ranking.

## What AI Systems Cite
AI citation factors:
1. **Authority signals**: content from recognized experts/organizations
2. **Factual density**: specific claims, statistics, data points
3. **Source credibility**: published, named, verifiable content
4. **Comprehensiveness**: thorough coverage of the topic
5. **Clarity**: unambiguous, well-structured information
6. **Recency**: recent content for time-sensitive topics

## GEO Optimization Checklist

### Content Structure
- [ ] Clear heading hierarchy (H1 → H2 → H3)
- [ ] Topic cluster coverage (main topic + all related sub-topics)
- [ ] FAQ section with direct question-answer pairs
- [ ] Definition of key terms in plain language
- [ ] Numbered/bulleted lists for process content (AI pulls these)

### Authority Signals
- [ ] Author byline with credentials
- [ ] Publication date visible
- [ ] Citations to primary sources
- [ ] Structured data (Schema.org) markup
- [ ] About page/bio that establishes expertise

### Factual Density
- [ ] Specific statistics with source and date
- [ ] Named examples (real companies, real people, real events)
- [ ] Concrete numbers over vague claims
- [ ] Comparisons that provide clear context

## Traditional SEO (Still Matters)
- Title tag: primary keyword in first 60 characters
- Meta description: 150-160 characters, includes primary keyword + CTA
- URL: short, keyword-including, hyphens not underscores
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

## Output
Content audit for GEO readiness. Optimization recommendations. Rewritten sections.
""",

# ─────────────────────────────────────────────
# PRODUCT
# ─────────────────────────────────────────────
"product/pm-skills.md": """---
skill: pm-skills
category: Product | Management
catalyst_use: CatalystOS product development, client service packaging, Sneakers Fest product ops
---

# PM SKILLS — Product Management Toolkit

Massive toolkit for product discovery, strategy, execution, pricing, and growth systems.

## Discovery Framework

### Problem Validation
Before building anything:
1. Who has this problem? (specific person, not "everyone")
2. How frequently do they have it?
3. How painful is it? (1-10, with financial impact if possible)
4. How are they solving it today?
5. What would they pay to solve it properly?

### User Story Format
"As a [specific user], when [specific context], I want [specific action] so that [specific outcome]."
Good: "As a Lagos-based event manager, when planning my venue booking 3 months out, I want a single dashboard to track vendor commitments so that I don't miss deposit deadlines."
Bad: "As a user, I want a good dashboard."

## Strategy Layer

### Now/Next/Later Roadmap
- NOW: in active development, committed to delivery
- NEXT: planned for next cycle, scoped but not started
- LATER: validated ideas, not yet scheduled
- NEVER: explicitly decided against (document why)

### Prioritization Framework (RICE)
- Reach: how many people affected per period?
- Impact: how significantly? (1=minimal, 3=high)
- Confidence: how certain are we? (percentage)
- Effort: person-weeks to build
- Score = (Reach × Impact × Confidence%) / Effort

## Pricing Strategy

### Pricing Models
- Freemium: free tier converts 2-5% to paid (need volume)
- Per-seat: scales with team size (enterprise-friendly)
- Usage-based: aligns cost with value (startup-friendly)
- Flat subscription: predictable, simple to sell
- Project-based: one-time fee (service businesses)

### Price Anchoring
Show the expensive option first. It makes everything else look reasonable.

## Output
PRD template, roadmap framework, RICE scoring sheet, pricing analysis.
""",

"product/daydream.md": """---
skill: daydream
category: Product | Creativity
catalyst_use: Strategic brainstorming, connecting disparate CatalystOS projects, creative problem solving
---

# DAYDREAM SKILL — Autonomous AI Brainstorming

Finds hidden connections inside your knowledge base through autonomous AI brainstorming sessions.

## What Daydream Does
Most AI gives you what you ask for. Daydream goes lateral — finding non-obvious connections between concepts, projects, and ideas you already have.

## The Brainstorming Protocol

### Phase 1: Knowledge Scan
Inventory what you're working with:
- Active projects and their current states
- Frameworks and mental models in use
- Constraints (budget, time, resources)
- Recent inputs (articles, conversations, observations)

### Phase 2: Cross-Pollination
The question is: "Where does [Project A] meet [Project B] in unexpected ways?"
Examples for CatalystOS:
- Sneakers Fest × AI automation: automated UGC content at the event
- Chambers law firm × The Catalyst: legal IP protection for creative frameworks
- Dark Matter manuscript × Event design: attendee experience as psychological architecture
- Substack essays × Social media: essay framework → carousel system

### Phase 3: Inversion
Flip the problem:
- Instead of: "How do we attract more Sneakers Fest attendees?" 
- Ask: "What would drive people away? Now do the opposite."

### Phase 4: Constraint Removal
"If money/time/resources were unlimited, what would we build?"
Then ask: "What's the 10% version we can do now?"

### Phase 5: Serendipity Mining
What insight from a completely different domain applies here?
- How do restaurateurs handle peak-hour crowd management? (Event crowd flow)
- How do hedge funds manage risk? (Cash flow for multiple revenue streams)
- How do militaries train under uncertainty? (Operating without full information)

## Output
10 non-obvious ideas with connection logic explained. Top 3 with 90-day implementation sketch.
""",

# ─────────────────────────────────────────────
# AI
# ─────────────────────────────────────────────
"ai/ai-transformation.md": """---
skill: ai-transformation
category: AI | Consulting
catalyst_use: Chambers AI Blueprint, all AI automation consulting engagements
---

# AI TRANSFORMATION SKILL — AI Consulting Framework

AI consulting framework for discovering automation opportunities and measuring organizational AI readiness.

## The AI Readiness Assessment

### Dimension 1: Data Readiness (25 points)
- Do you have documented processes? (5)
- Is your data digital and accessible? (5)
- Are your workflows consistent and repeatable? (5)
- Do you have historical data to learn from? (5)
- Is your data quality sufficient for AI? (5)

### Dimension 2: Leadership Alignment (25 points)
- Is leadership willing to invest? (5)
- Is there a clear AI champion internally? (5)
- Are success metrics defined? (5)
- Is there tolerance for iteration and failure? (5)
- Is change management capacity present? (5)

### Dimension 3: Process Maturity (25 points)
- Are workflows documented? (5)
- Are bottlenecks identified and understood? (5)
- Is current tooling mapped? (5)
- Are manual/repetitive tasks catalogued? (5)
- Is there a culture of process improvement? (5)

### Dimension 4: Technical Capacity (25 points)
- Does the team have basic digital literacy? (5)
- Is there someone who can manage AI tools? (5)
- Is IT infrastructure modern enough? (5)
- Can the organization handle new tool adoption? (5)
- Is budget allocated for technology? (5)

**Score interpretation:**
- 80-100: Ready for aggressive AI transformation
- 60-79: Ready for targeted automation in specific areas
- 40-59: Prepare the foundation first (documentation, data, training)
- Below 40: People and process work before technology

## Automation Opportunity Mapping
For each department, identify:
1. Tasks that are repetitive and rule-based (highest AI ROI)
2. Tasks that require judgment (AI-assist, not full automation)
3. Tasks that require human relationship (AI tools, not replacement)

## Chambers AI Blueprint Application
Phase 1 (Weeks 1-4): Audit + documentation
Phase 2 (Weeks 5-8): Tool implementation + training
Phase 3 (Weeks 9-12): Optimization + expansion

## Output
AI readiness score, opportunity map, 90-day transformation roadmap, tool recommendations.
""",

"ai/ai-music-album.md": """---
skill: ai-music-album
category: AI | Music Production
catalyst_use: Sneakers Fest event soundtrack, brand ambient tracks, creative IP development
---

# AI MUSIC ALBUM SKILL — End-to-End AI Music Production

Complete AI music production system covering lyrics, composition, mixing, mastering, and release.

## The Full Production Pipeline

### Stage 1: Concept & Direction
- Genre/subgenre: be specific (not "hip-hop" — "Lagos Afrobeats with trap 808s")
- BPM: 60-90 ballad | 90-110 mid-tempo | 110-140 energetic | 140+ club
- Key: major (happy, triumphant) vs. minor (emotional, dark, complex)
- Reference tracks: 3 songs that capture the target sound

### Stage 2: Lyrics (Claude or AI Lyric Tools)
Structure:
- Verse 1: introduce the world/situation
- Pre-chorus: emotional escalation
- Chorus: the core statement (most memorable, most repeated)
- Verse 2: develop or complicate the situation
- Bridge: perspective shift or peak emotional moment
- Outro: resolution or leave-hanging tension

### Stage 3: Music Generation
**Suno AI:** Best for complete song generation
- Prompt: genre + mood + instrumentation + vocal style + lyric snippet
- Multiple generations (10+), then select and refine
- Extend: use Suno's extension to add sections

**Udio:** Better for instrumental and specific styles
- Custom mode: input lyrics + style tags

**Stems/separation (after generation):**
- Demucs (open source) or Lalal.ai: separate vocals, drums, bass, other

### Stage 4: Production Polish
- Adobe Podcast / iZotope RX: vocal cleanup
- Auphonic: loudness normalization (streaming standard: -14 LUFS)
- AI Mastering: LANDR or eMastered for final master

### Stage 5: Release
- Distribution: DistroKid, TuneCore, CD Baby
- Metadata: ISRC code, songwriter credits, genre tags
- Spotify/Apple Music optimization: playlist pitch 7 days before release

## Sneakers Fest Soundtrack Brief
- Vibe: Lagos street energy + sophisticated — Afrobeats meets UK drill meets electronic
- BPM: 128-140 for event floor, 90-100 for ambient pre-show
- Prompt template: "Energetic Afrobeats with trap 808 bass, Lagos street atmosphere, hype build, no lyrics"

## Output
Production brief, prompt set for Suno/Udio, release checklist, Sneakers Fest playlist structure.
""",

}

def write_skill(path, content):
    full_path = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w') as f:
        f.write(content)
    return full_path

written = []
for path, content in SKILLS.items():
    result = write_skill(path, content)
    written.append(result)
    print(f"✓ {path}")

print(f"\n{'='*50}")
print(f"✅ {len(written)} skill files written")
print(f"{'='*50}")
