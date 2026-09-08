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

This is a static GitHub Pages app. Do **not** put a private Anthropic (Claude) or other AI provider API key directly into `app.js`, browser localStorage, or the Settings field.

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


## AI backend on Vercel (Claude)

`api/analyze-meal.js` is a Vercel serverless function that sends the meal photo to Claude (Anthropic API) using the official `@anthropic-ai/sdk` and structured JSON output, then returns the nutrition estimate to the app. The same GitHub repository deploys to both GitHub Pages (the app) and Vercel (the backend).

Required Vercel environment variables:

- `ANTHROPIC_API_KEY` — server-side only (Secret). Create it at console.anthropic.com → API Keys. The Anthropic API is billed separately from a Claude Max subscription; add a small prepaid balance under Settings → Billing.
- `ALLOWED_ORIGINS` — comma-separated allowed browser origins, for example `https://fabiano-create.github.io`
- `ANTHROPIC_MODEL` — optional; defaults to `claude-opus-5`

After adding or changing variables, redeploy the latest production deployment so the function picks them up.

The endpoint URL (`https://hunt-ready-30.vercel.app/api/analyze-meal`) goes into HUNT READY 30 → Settings → Secure AI nutrition endpoint.

Error responses are JSON `{ "error": "...", "code": "..." }` and the app shows the message directly. HTTP 402 means the Anthropic account has no API credits.
