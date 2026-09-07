# HUNT READY 30

A lightweight, offline-capable Progressive Web App (PWA) for the 8-week HUNT READY 30 program.

## Included
- Daily 30-minute workouts
- Set / rep / weight logging
- Rest timers
- Ruck tracking
- Progressive-overload prompts
- Hunter-readiness benchmarks
- Workout history
- Local-only data storage
- JSON data export
- Offline support after first load

## Run locally
From this folder:

`python3 -m http.server 8080`

Then open `http://localhost:8080`.

## Put it on your iPhone
A PWA needs HTTPS (or localhost). Host this folder on GitHub Pages, Netlify, Cloudflare Pages, or Vercel.

Then on iPhone:
1. Open the HTTPS URL in Safari.
2. Tap Share.
3. Tap **Add to Home Screen**.
4. Launch **HUNT READY 30** from the home-screen icon.

## Data
Everything is stored in the browser on that device using localStorage. There is no account, database, or subscription.

Use Settings → **Export My Data** to save a JSON backup.
