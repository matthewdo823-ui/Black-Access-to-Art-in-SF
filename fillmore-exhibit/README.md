# The Fillmore Erased — Museum Exhibit

A Vite + React museum dashboard and spatial exhibit exploring art, space, and Black displacement in San Francisco.

## Setup

```bash
cd fillmore-exhibit
npm install
cp .env.example .env
# Add your Mapbox token to .env (https://account.mapbox.com)
npm run dev   # syncs token to public/mapbox-token.json, then starts Vite
```

## Routes

| Path | Page |
|------|------|
| `/` | Collection dashboard |
| `/exhibit/3` | Exhibit III — The Map (Mapbox + GeoJSON layers) |

## Data

GeoJSON layers live in `public/museum/geojson/` and are loaded at runtime by the map hook.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run clean` — remove the `dist/` build output
- `npm run deploy` — prints GitHub Pages deploy steps (do not use the `gh-pages` npm package; GitHub blocks Mapbox tokens on that branch)

## Deploy to GitHub Pages

`npm run deploy` only prints instructions. Actual hosting uses GitHub Actions (`.github/workflows/deploy-pages.yml`):

1. Add repo secret **`VITE_MAPBOX_ACCESS_TOKEN`** (your Mapbox `pk.` token).
2. **Settings → Pages → Source:** GitHub Actions.
3. Push to **`main`** — the workflow builds and deploys automatically.

Live site: `https://matthewdo823-ui.github.io/Black-Access-to-Art-in-SF/`

## Mapbox token

The token lives in `.env` only. Before dev or build, `sync-mapbox-token` writes `public/mapbox-token.json` (gitignored). The app loads it at runtime so it is not embedded in bundled `dist/assets/*.js`.

Do not commit `dist/` — it is generated output from `npm run build` and is listed in `.gitignore`. If you previously built with a token in `.env`, delete `dist/` (`npm run clean`) and rotate the token in your [Mapbox account](https://account.mapbox.com) if it may have been shared.
