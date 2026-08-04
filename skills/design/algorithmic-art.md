---
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
