# The Fillmore Erased — Museum Exhibit

A Vite + React museum dashboard and spatial exhibit exploring art, space, and Black displacement in San Francisco.

## Setup

```bash
cd fillmore-exhibit
npm install
cp .env.example .env
# Add your Mapbox token to .env (https://account.mapbox.com)
npm run dev
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
