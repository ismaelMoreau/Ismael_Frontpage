# Tables Have Turned — Portfolio Timeline

Interactive portfolio showcasing 8 years of software development: from raw JavaScript to AI agent orchestration.

**Live:** [ismaelmoreau.github.io/Ismael_Frontpage](https://ismaelmoreau.github.io/Ismael_Frontpage)

## Features

- **Bilingual (FR/EN)** — Full language toggle with live audio switching
- **Guided Audio Tour** — Narrated walkthrough of career timeline
- **Era-Based Theming** — Colors evolve as you scroll through career phases
- **Progressive Skill Panel** — Skills unlock as you descend the timeline
- **Zero Dependencies** — Pure vanilla HTML/CSS/JS, no build step

## Quick Start

```bash
# Clone
git clone https://github.com/ismaelMoreau/Ismael_Frontpage.git

# Open in browser
open index.html
```

No server required. Works directly from filesystem.

## Architecture

```
├── index.html          # Entry point
├── style.css           # Styles, CSS variables, era themes
├── data.js             # Portfolio content + translations
├── app.js              # Timeline renderer, language toggle
├── audio-manager.js    # Guided tour audio system
├── audio/              # Narration files (FR + EN)
└── videos/             # Project demo videos
```

## Era Color Progression

| Era | Period | Color | Theme |
|-----|--------|-------|-------|
| Fondations | 2017-2019 | Terminal Green | Raw code beginnings |
| L'Échelle | 2019-2021 | Azure Blue | Cloud/Enterprise |
| Le Créatif | 2022-2023 | Purple | Game development |
| SQDC Initiative | 2023-2025 | Field Green | Retail tech |
| Le Multiplicateur | 2024-2025 | Neural Pink | AI orchestration |

## Customization

### Add Content
Edit `data.js`:
- `PORTFOLIO_DATA.timeline[]` — Add timeline entries
- `TRANSLATIONS` — Add bilingual text

### Change Theme
Edit `style.css` `:root` variables:
- `--accent` — Primary accent color
- `--era1-accent` through `--era4-accent` — Era colors

### Add Audio
Place MP3 files in `audio/`:
- French: `section-name.mp3`
- English: `section-name-en.mp3`

## Deployment

Push to GitHub → Settings → Pages → Deploy from `main` branch root.

## License

MIT

---

*Du code qui tourne au code qui pense.*
