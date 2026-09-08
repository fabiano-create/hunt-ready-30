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
