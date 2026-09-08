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
- Exercise library with animated form drawings, cues, mistakes, and inline demo videos
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


## AI backend on Vercel (Claude via Vercel AI Gateway)

`api/analyze-meal.js` is a Vercel serverless function that sends the meal photo to Claude using the official `@anthropic-ai/sdk` with structured JSON output. By default it routes through **Vercel AI Gateway**, so the only credential needed is an AI Gateway key created inside the Vercel dashboard (AI Gateway → API Keys). The gateway includes $5/month of free credits once a credit card is on file and charges provider list price with no markup after that.

Required Vercel environment variables:

- `AI_GATEWAY_API_KEY` — Secret. Your Vercel AI Gateway key (starts with `vck_`). If the same key is stored as `ANTHROPIC_API_KEY` instead, it is detected automatically.
- `ALLOWED_ORIGINS` — comma-separated allowed browser origins, for example `https://fabiano-create.github.io`
- `ANTHROPIC_MODEL` — optional; defaults to `anthropic/claude-opus-5`

Alternative: set `ANTHROPIC_API_KEY` to a direct Anthropic key (`sk-ant-…`) from console.anthropic.com and the function calls Anthropic directly instead.

After adding or changing variables, redeploy the latest production deployment so the function picks them up.

The endpoint URL (`https://hunt-ready-30.vercel.app/api/analyze-meal`) goes into HUNT READY 30 → Settings → Secure AI nutrition endpoint.

Error responses are JSON `{ "error": "...", "code": "..." }` and the app shows the message directly. HTTP 402 means the connected AI account has no credits.
