# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page portfolio timeline where career and projects weave together as one story. Pure vanilla HTML/CSS/JS — no build step, no dependencies, no server required. Works on GitHub Pages.

## Architecture

```
├── index.html      # Entry point, semantic structure
├── style.css       # All styles, CSS variables, animations
├── data.js         # Timeline data (edit this to populate content)
├── app.js          # Timeline renderer, video handling
└── videos/         # Local project demo videos
```

## Development

Open `index.html` directly in browser. That's it.

**GitHub Pages:** Push to repo → Settings → Pages → Deploy from main branch root.

## Key Files

**data.js** — Edit this to add your content. Structure:
```js
const PORTFOLIO_DATA = {
  meta: { name, tagline, contact: { email }, github },
  timeline: [
    {
      period: "2024",
      context: { type, title, place, narrative },
      projects: [{ name, repo, video, oneLiner, tech: [], link }],
      skills: []
    }
  ]
}
```

**style.css** — CSS variables in `:root` control the theme:
- `--accent`: Primary accent color (#00ffaa)
- `--bg-void`, `--bg-surface`, `--bg-elevated`: Background hierarchy
- `--font-display`, `--font-serif`, `--font-mono`: Typography stack

**app.js** — Reads `PORTFOLIO_DATA` from data.js, renders hero and timeline nodes. IntersectionObserver for scroll animations. Video modal with lazy loading.

## Design System

- **Theme**: Dark mode, near-black background, single bold accent (#00ffaa)
- **Typography**: Space Grotesk (display), Instrument Serif (narrative), JetBrains Mono (code/tech)
- **Aesthetic**: Terminal/IDE feel, circuit board traces for timeline, subtle glow effects

## Customization

1. **Accent color**: Change `--accent` and related variables in style.css
2. **Fonts**: Swap Google Fonts imports in index.html, update CSS variables
3. **Animation timing**: Adjust `--ease-out-expo` and keyframe definitions
4. **Timeline layout**: Modify `--timeline-left` and related spacing variables
