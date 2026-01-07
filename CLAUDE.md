# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page portfolio timeline where career and projects weave together as one story. Pure vanilla HTML/CSS/JS — no build step, no dependencies, no server required. Works on GitHub Pages.

**Key features:**
- Bilingual support (FR/EN) with live language switching
- Guided audio tour with synchronized subtitles
- Era-based visual theming that evolves on scroll
- Progressive skill accumulation panel

## Architecture

```
├── index.html          # Entry point, semantic structure
├── style.css           # All styles, CSS variables, era themes, animations
├── data.js             # Timeline data + TRANSLATIONS object
├── app.js              # Timeline renderer, language toggle, era detection
├── audio-manager.js    # Guided tour: audio playback, subtitles, language switching
├── audio/              # Narration MP3s (FR: *.mp3, EN: *-en.mp3)
└── videos/             # Local project demo videos
```

## Development

Open `index.html` directly in browser. That's it.

**GitHub Pages:** Push to repo → Settings → Pages → Deploy from main branch root.

## Key Files

### data.js
Contains both content and translations:

```js
// Translations for UI, eras, timeline narratives, project descriptions
const TRANSLATIONS = {
  ui: { fr: {...}, en: {...} },
  eras: { fr: {...}, en: {...} },
  timeline: { en: [...] },  // English overrides (French is in PORTFOLIO_DATA)
  projects: { en: {...} }   // English project one-liners
};

// Main portfolio content (French as base language)
const PORTFOLIO_DATA = {
  meta: { name, tagline, contact, github },
  timeline: [{
    period: "2024",
    era: "multiplicateur",  // Links to era theming
    context: { type, title, place, narrative },
    projects: [{ name, repo, video, oneLiner, tech: [], link, isPersonal, client }],
    skills: []
  }],
  eras: { fondations: { audioFile }, ... },
  audioTour: { intro, outro }
};
```

### style.css
CSS variables in `:root` control the theme:
- `--accent`: Primary accent color
- `--era1-accent` to `--era4-accent`: Era-specific colors
- `--bg-void`, `--bg-surface`, `--bg-elevated`: Background hierarchy
- `--font-display`, `--font-serif`, `--font-mono`: Typography stack

Era themes are applied via `body[data-era="..."]` selectors.

### app.js
- Renders hero and timeline from `PORTFOLIO_DATA`
- Manages language state (`STATE.currentLang`)
- `toggleLanguage()` re-renders all content and notifies audio manager
- `detectCurrentEra()` updates visual theme based on scroll position
- `transitionToEra()` applies era-specific CSS variables

### audio-manager.js
- Plays narration audio per section
- Builds subtitles dynamically based on audio duration
- `setLanguage(lang)` switches audio mid-tour (preserves position ratio)
- Falls back to French audio if English file missing

## Design System

- **Theme**: Dark mode, near-black background, era-specific accent colors
- **Typography**: Space Grotesk (display), Instrument Serif (narrative), JetBrains Mono (code/tech)
- **Aesthetic**: Terminal/IDE feel, circuit board traces for timeline, subtle glow effects

### Era Color Progression
```
Fondations    (#00ff88) → Terminal green   - Raw code beginnings
L'Échelle     (#0ea5e9) → Azure blue       - Cloud/Enterprise
Le Créatif    (#c084fc) → Purple           - Game development
SQDC          (#22c55e) → Field green      - Retail tech
Multiplicateur(#f472b6) → Neural pink      - AI orchestration
```

## Adding Content

### New Timeline Entry
Add to `PORTFOLIO_DATA.timeline[]` in data.js, include `era` field.

### New Translation
Add English text to `TRANSLATIONS.timeline.en[]` (same index as French entry).

### New Audio
1. Place French audio: `audio/section-name.mp3`
2. Place English audio: `audio/section-name-en.mp3`
3. Add subtitles to `SUBTITLE_TEXTS` in audio-manager.js
4. Reference in `PORTFOLIO_DATA.eras` or `audioTour`

## Customization

1. **Accent color**: Change `--accent` and `--era*-accent` variables in style.css
2. **Fonts**: Swap Google Fonts imports in index.html, update CSS variables
3. **Animation timing**: Adjust `--ease-out-expo` and keyframe definitions
4. **Timeline layout**: Modify `--timeline-left` and related spacing variables
