# ITE254 Final Project — Mario Forever

A fan-made platformer website built for the ITE254 final project. The site features a
home page, character/music/about/contact pages, a level selector, and a playable
top-down platformer called **Mario Forever** with 46 fan-made levels across 8 worlds
plus bonus and fan-made stages.

## Features

- **Home page** (`index.html`) — hero, world showcase, feature tiles, character strip,
  controls panel, and footer
- **Level selector** (`html/levelselector.html`) — browse and launch the game's levels
- **Play the game** (`Mario Forever/`) — exported HTML5 game builds for Worlds 1–8,
  Extra, Human Lab, Original Level, and Story stages
- **Characters, Music, About, Contact** pages (`html/`)
- **Authentication** — Register, Login, and Forgot Password pages powered by Firebase
- **Settings** page (`html/settings.html`)
- **Theming & effects** — light/dark theme toggle, snowfall and cherry-blossom effects
- **Responsive UI** — Bootstrap 5 with custom styling (DM Sans / Space Grotesk fonts)

## Project structure

```
├── index.html              # Home page
├── html/                   # Site pages (level selector, characters, music, about,
│                           # contact, auth, settings)
├── css/                    # Stylesheets (site refresh, curtain transition,
│                           # snow/cherry-blossom effects, music player, etc.)
├── js/                     # Client scripts (theme switcher, level selector,
│                           # music player, Firebase auth, effects)
├── image/                  # Site imagery (hero art, character renders, icons)
├── songs/ sounds/ voice/   # Game media assets
├── covers/ screenshots/    # Music covers and screenshots
├── levelselector/          # Standalone level-selector game page
├── save game room/         # Background save/persistence iframe page
├── Mario Forever/          # Exported HTML5 game builds (Worlds 1–8, Extra,
│                           # Human Lab, Original Level, Story)
├── scripts/
│   ├── build_pages.py      # Optimized static-site build for GitHub Pages
│   └── shared-assets-loader.js
└── .github/workflows/pages.yml  # GitHub Pages CI/CD workflow
```

## Running locally

The site is plain HTML/CSS/JS — no build step is required for local development.
Because of iframe paths and asset references, serve it over HTTP rather than opening
`index.html` directly:

```bash
# with Python
python -m http.server 8000

# or with Node
npx serve .
```

Then open `http://localhost:8000`. (The project lives in XAMPP's `htdocs`, so it also
works at `http://localhost/ITE254%20Final%20Project/` while Apache is running.)

## Deployment

The repository is deployed to **GitHub Pages** automatically on every push to `main`:

1. `.github/workflows/pages.yml` checks out the repo, runs
   `python3 scripts/build_pages.py _site`, and uploads the result as a Pages artifact.
2. `scripts/build_pages.py` produces an optimized `_site` directory. It shares
   identical exported game resources between levels (deduplicating `src/` assets)
   and adds the shared-assets loader so game pages stay lightweight.

To build locally the same way:

```bash
python3 scripts/build_pages.py _site
```

## Tech stack

- **Frontend:** HTML5, CSS3, JavaScript (ES modules), Bootstrap 5
- **Fonts/icons:** Google Fonts (DM Sans, Space Grotesk), Bootstrap Icons
- **Backend services:** Firebase (Authentication, via `js/firebase-config.js`)
- **Games:** Exported HTML5 platformer builds under `Mario Forever/`
- **CI/CD:** GitHub Actions → GitHub Pages

## Controls (in-game)

| Action      | Key        |
| ----------- | ---------- |
| Move        | ← / →      |
| Enter pipe  | ↑ / ↓      |
| Jump        | Z          |
| Run / Fire  | X          |
| Item box    | Space      |

## License / credits

Fan project for coursework (ITE254). Mario Forever is a fan-made platformer;
all game assets are the property of their respective owners.
