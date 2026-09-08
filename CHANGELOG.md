# HUNT READY 30 — Full Build 4.5.0

## Added
- Rest timer alerts: ticks at 3-2-1, a double beep and vibration at GO, and a green GO flash on screen for phones on silent. Sounds are generated in code (no audio files) and unlock on the first tap inside a workout.
- Settings → Rest timer alerts: sound and vibration toggles plus a TEST ALERT button.

# HUNT READY 30 — Full Build 4.4.0

## Added
- Self-hosted demo clips. Drop `media/demos/<exercise>.mp4` (optional `.jpg` poster) into the repo and the guide plays your clip instead of the YouTube demo, keeping a link to the coach's version. No configuration needed; see `media/demos/README.md`.
- Settings → "Show clip file names" lists the exact file name for every exercise.
- Service worker streams clips directly instead of caching them.

# HUNT READY 30 — Full Build 4.3.0

## Exercise guides
- Every movement now has a specific, short demonstration video from a reputable coach or physical therapist (no more generic library links). Videos play inline in the guide with one tap; an "Open in YouTube" link is there too.
- New animated form drawings (start → finish position) for 15 movements, including hip hinge, goblet squat, RDL, reverse lunge, step-up, push-up, plank, row, floor press, carries, calf raise, rear-delt raise, and hammer curl. Drawings and written cues work fully offline; the video shows an offline note when there is no connection.
- Learn tab cards now show "Video demo" and "Form drawing" tags.

# HUNT READY 30 — Full Build 4.2.0

## Fixed
- Back button / back gesture now works inside the app. Going back closes an open panel, returns to the previous tab, steps back one set inside an active workout (asking before exiting), and returns from an exercise guide to the workout, instead of leaving the app.
- Escape key closes panels on desktop.

# HUNT READY 30 — Full Build 4.1.1

## Changed
- Meal-photo analysis now routes to Claude through **Vercel AI Gateway** by default (`anthropic/claude-opus-5`), so the only credential needed is a key created in the Vercel dashboard. A direct Anthropic key still works.
- Credential detection: `AI_GATEWAY_API_KEY`, then `ANTHROPIC_API_KEY` (gateway keys starting with `vck_` are recognized automatically), then Vercel's OIDC token.
- Credit / key error messages now say exactly where to fix the problem for the credential in use.

# HUNT READY 30 — Full Build 4.1.0

## Changed
- AI meal-photo analysis now runs on Claude (Anthropic API, `claude-opus-5`) instead of OpenAI.
- Backend uses the official `@anthropic-ai/sdk` with structured JSON output, so the nutrition JSON is schema-guaranteed (no more code-fence stripping).
- Numbers are rounded to whole units before they reach the app.

## Backend errors
- Provider errors are mapped to clear messages and codes: no API credits (402), bad API key (401), rate limit (429), Anthropic busy (503), refusal (422), and setup problems (500).

## App
- Fuel-tab error messages updated for Anthropic wording and the `ANTHROPIC_API_KEY` variable.

## Setup
- Vercel now needs `ANTHROPIC_API_KEY` (Secret) and `ALLOWED_ORIGINS`. `OPENAI_API_KEY` is no longer used and can be deleted.

# HUNT READY 30 — Full Build 4.0.1

## Fixed
- AI meal-photo analysis now shows the real reason a scan failed (for example "OpenAI API credits are exhausted", "rate-limited", "origin not allowed", or a missing server variable) instead of only an HTTP status code.
- AI Analyze button is disabled and shows "Analyzing…" while a request is in flight, so it cannot be double-tapped.
- Network / CORS failures now explain what to check (connection, endpoint URL, ALLOWED_ORIGINS).

## Backend (api/analyze-meal.js)
- Error responses now include a `code` field from the AI provider.
- Non-JSON provider responses and non-JSON model output return clear 502 errors instead of crashing.

## Housekeeping
- Service worker cache key bumped so installed PWAs pick up this version.

# HUNT READY 30 — Full Build 4.0.0

## Added
- Scenic mountains / lake / cross / bow visual system
- Daily KJV Scripture + training focus
- Daily readiness check-in
- Current working-weight editor
- Automatic working-weight updates after workouts
- Per-exercise progression charts
- Detailed workout-history views
- Weight / waist history
- Proper carry, timed, ruck, and circuit logging
- Nutrition targets and daily macro totals
- Manual meal logging
- Meal photo capture and local photo storage
- Secure-endpoint AI photo nutrition workflow
- Archery practice log
- Bow profile with current setup fields
- Hunt-prep checklist with custom items
- Complete data backup / restore
- Optional Vercel AI backend template

## Improved
- Workout back / exit behavior
- Exercise guide access from Today, Learn, and active workout
- Service worker update strategy to reduce stale PWA versions
- App icon and visual identity
- History capacity increased from 100 to 500 sessions

## AI note
Food-photo nutrition estimates cannot be exact from an image alone. The app explicitly requires review before saving an AI estimate.
