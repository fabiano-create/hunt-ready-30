# HUNT READY 30 — Full Build

A faith-rooted, hunting-specific fitness PWA built for short home workouts with adjustable dumbbells and a weight vest / ruck.

## Current feature set

- 8-week, 30-min-or-less training program
- Per-set weight and rep logging
- Carry, plank, ruck, circuit, and timed-work logging
- Automatic current working-weight updates
- Exercise progression charts
- Detailed workout history
- Hunter-readiness benchmarks
- Body-weight and waist tracking
- Daily subjective readiness check-in
- Daily Scripture and training focus
- Exercise library with cues, mistakes, and selected external demos
- Archery practice log
- Hunt-prep gear / legal checklist
- Nutrition targets and manual meal tracker
- Camera/photo meal journal
- Optional AI meal-photo analysis through a secure server endpoint
- Offline PWA support
- Complete JSON backup / restore, including stored meal photos

## Important: AI meal-photo analysis

This is a static GitHub Pages app. Do **not** put a private OpenAI or other AI provider API key directly into `app.js`, browser localStorage, or the Settings field.

The app expects an optional secure server endpoint configured in Settings. It POSTs:

```json
{
  "imageDataUrl": "data:image/jpeg;base64,..."
}
```

The endpoint should return JSON like:

```json
{
  "name": "Steak and eggs",
  "calories": 820,
  "protein": 72,
  "carbs": 4,
  "fat": 58,
  "fiber": 0,
  "notes": "Estimated from photo; review portion sizes."
}
```

Photo-derived nutrition should always be treated as an estimate and reviewed before saving.

## GitHub Pages update

Replace these files when publishing a new version:

- `index.html`
- `app.js`
- `styles.css`
- `sw.js`
- `manifest.webmanifest`

The `icons` folder only needs replacing when the app icon changes.


## Optional AI backend with Vercel

This package also contains `api/analyze-meal.js`, `package.json`, and `vercel.json` so the same repository can later be deployed on Vercel with a secure meal-photo endpoint.

Required Vercel environment variables:

- `OPENAI_API_KEY` — server-side only
- `ALLOWED_ORIGINS` — comma-separated allowed browser origins, for example `https://fabiano-create.github.io`
- `OPENAI_MODEL` — optional; defaults to `gpt-5.6-luna`

When deployed, put the resulting endpoint URL (for example `https://your-app.vercel.app/api/analyze-meal`) into HUNT READY 30 → Settings → Secure AI nutrition endpoint.
