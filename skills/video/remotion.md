---
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
