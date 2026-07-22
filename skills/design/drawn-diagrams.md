---
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
