# HUNT READY 30 — Full Build 5.5.0

## Training blocks
- In dumbbell mode the movement in each slot now changes with the phase: Block 1 Foundation (Base), Block 2 Unilateral (Build), Block 3 Peak (Peak and Taper). Without a hunt date, blocks rotate every four weeks from your start date.
- New movements with guides, drawings, and videos: Split Squat, Bulgarian Split Squat, Staggered-Stance RDL, Single-Leg RDL, Single-Arm Floor Press, Gorilla Row, Renegade Row, Rack Carry. Push-ups take the press slot in Block 2. Rucks get longer and hillier each block.
- Train tab shows the current block and when it switches; Today shows a one-time notice when a new block starts.
- Progress tracks each variant separately and keeps every movement you've logged in the list.
- Bodyweight mode keeps its ladders; blocks don't apply there.

# HUNT READY 30 — Full Build 5.4.2

## Session editor
- "Log a past session" now records every exercise: weight, reps, and sets for lifts; level or band in bodyweight mode; load and seconds for carries; rounds for circuits; load, minutes, and miles for rucks. Blank rows are skipped.
- Any logged session can be edited (History → Edit, View details → Edit this session, or Edit on the Done card) or deleted.
- Weights entered in the editor update your current loads on Progress, exactly like a live workout.
- Date and time inputs no longer overlap on iPhone.

# HUNT READY 30 — Full Build 5.4.1

- Train → History → "Log a past session": record a workout you did without the app, or restore one that was lost. It shows as done on that day.
- Settings now warns that data lives only on the phone and to export before deleting the Home Screen app.

# HUNT READY 30 — Full Build 5.4.0

## Today
- Completed workouts now show a Done card in place of Start: minutes, sets, load moved, a commendation verse (rotates daily, in your chosen translation), and View details / Train again.
- Field Tools get drawn icons (target, crossed bow and rifle, checklist, hourglass, flame). Fuel spans the full width on phones.

## Workout
- Session clock runs on the wall clock, so it stays right after the app is in the background.
- Timed blocks (warm-up, circuit, ruck, plank holds) have their own countdown with Start / Pause / Reset, ticks at 3-2-1 and GO at zero. The circuit always starts at 20:00 regardless of what happened in the warm-up.
- Rest timer is wall-clock too.
- Circuit notes render as a stacked list instead of a bullet-separated line.

## Hunts
- Form is stacked; Weapon (bow, rifle, crossbow, muzzleloader) is saved with each hunt and shown on the countdown. Hunts can be edited after saving.

## Weapon Profile (was Bow Profile)
- Bow | Rifle switch. Rifle profile stores make/model, caliber, scope, zero distance, ammo, accessories, handedness, notes, and photos; AI scan reads labels the same conservative way the bow scan does. A Rifle category is added to Hunt Prep when you save a rifle profile or a rifle hunt.

## Fixed
- View details on a logged workout did nothing (a quote inside the button broke the handler).
- Progress: editing Reverse Lunge (and other shared names) in dumbbell mode showed bodyweight levels. Loads and levels are now stored separately per mode.
- New app icon (broadhead over the ridgeline). Re-add the app to your Home Screen to see it.

# HUNT READY 30 — Full Build 5.3.2

- Berean Standard Bible is now the default translation. KJV and WEB remain available in Settings.

# HUNT READY 30 — Full Build 5.3.1

## Scripture
- Berean Standard Bible added as the third translation (public domain since 2023). Text taken verbatim from Berean's published file. Choices are now KJV (default), BSB, WEB.

# HUNT READY 30 — Full Build 5.3.0

## Scripture
- World English Bible added as a second translation (Settings → Bible translation). Both KJV and WEB are public domain. WEB text was taken verbatim from the published edition; it renders the divine name as "Yahweh".

# HUNT READY 30 — Full Build 5.2.1

## Scripture
- Back to the King James Version only. It is public domain, so the verse set can grow without a license or notice to maintain. ESV text and the Crossway notice are removed. Small-caps LORD and the version tag stay.

# HUNT READY 30 — Full Build 5.2.0

## Scripture
- Verses now default to the ESV, with the KJV available under Settings → Bible translation. "LORD" is set in small caps as in print Bibles.
- The ESV copyright notice required by Crossway appears in Settings.

# HUNT READY 30 — Full Build 5.1.2

## Updates now arrive on the first reopen
- The service worker revalidates the app files with the server on every launch instead of trusting the 10-minute browser cache, and the app reloads itself once when a new version takes over.
- Readiness: the "why" is reachable after you've saved the day's check-in via a "Why this matters" link.

# HUNT READY 30 — Full Build 5.1.0

## Readiness now shapes the day
- The readiness card sits right under the scripture with a plain explanation of why it exists, so it's the first thing you do.
- Score 40–54: today's workout is trimmed automatically (one fewer set per lift, shorter carries, ruck capped at 20 min) and loads are held.
- Score under 40: the workout card recommends the easy day (light walk + mobility) with a one-tap swap; the planned session stays available, trimmed.
- The finish summary skips load-jump suggestions on an adjusted day.

# HUNT READY 30 — Full Build 5.0.2

## Today
- Scripture leads. The verse is the first card over the dawn scene; the hunt countdown follows as the first instrument card.
- Taller scene: the picture now fills roughly the top 40% of the screen before the verse.

# HUNT READY 30 — Full Build 5.0.1

## Layout
- Today: the dawn scene is recomposed so the sun and ridgeline sit above the first card instead of behind it, and the first card starts higher, removing the empty band at the top.
- More breathing room: larger card padding and spacing, taller section headings, more space between exercises.

# HUNT READY 30 — Full Build 5.0.0

## New look: "Field light, instrument numbers"
- Today opens on a full-width dawn scene that changes with the training phase (Base, Build, Peak, Taper), with film grain and a vignette. Cards are frosted glass over it; the top bar is transparent at the top and turns solid as you scroll.
- The countdown is now a gauge: monospaced days-out readout, phase and opening-day readouts, a status light, and a 30-tick plan bar. Sessions this week, streak, and body weight sit beneath it as readouts.
- Typography: Barlow Condensed for headings and labels, Share Tech Mono for every number, Source Sans 3 for body text, Libre Baskerville for scripture only. Fonts are cached by the service worker for offline use and fall back to system faces until loaded.
- Palette blends amber light with deep green and teal shadow; the gold accent is kept; status green marks what is on track.
- Rest timer is a large monospaced readout with a draining track. Charts draw an amber line over a teal fill with the latest point highlighted and monospaced axis labels. Benchmarks show a percent readout.
- Every drawing, video, and piece of logic is unchanged.

# HUNT READY 30 — Full Build 4.9.0

## Equipment modes
- **Bodyweight mode** (Settings → Equipment). Same week, same phases; every dumbbell slot swaps for a bodyweight movement. A loaded backpack stands in for the carries and can add load anywhere.
- **Ladders instead of weights.** Squat, Hinge, Row, and Push-up ladders each have five levels (e.g. bodyweight squat → tempo → pause → split squat → Bulgarian). You log a level and reps; when every set hits the top of the rep range the summary tells you to move up. Progress and "Current loads & levels" show levels.
- **Bands as an add-on** (checkbox). With bands, the row, RDL, rear-delt, and curl slots become banded versions logged by band strength.
- **"Bodyweight today"** one-tap override on the Today screen for hotel rooms and deer camp. Reverts automatically tomorrow.
- Bodyweight benchmarks (squat ladder level, table rows, single-leg RDL, backpack carry, push-ups, plank, ruck) replace the dumbbell ones in bodyweight mode.
- 13 new exercise guides with videos: the four ladders, prone Y-T raise, backpack carry / suitcase carry / curl, single-leg calf raise, banded row, banded RDL, band pull-apart, band hammer curl.

# HUNT READY 30 — Full Build 4.8.0

## Bow scan, reworked
- Scan from **up to five photos** at once: whole bow, riser stamp or limb decal, sight, rest, arrow shaft. All photos are kept with the profile.
- The AI now fills empty fields, and only replaces a value you already entered when it actually read a name off a label. Descriptions of parts it couldn't name go to Setup notes, never into the fields.
- Filler like "none visible" or "unknown" is never written. Handedness only changes when the AI is highly confident; otherwise it tells you what it guessed and leaves your setting alone.
- After a scan, the status line lists exactly what was filled, what was updated, and what was kept.

# HUNT READY 30 — Full Build 4.7.2

## Fixed
- AI text no longer shows codes like `\u2014` where dashes belong. The server decodes double-escaped characters in the model's answer, and the app decodes them on display, so reviews saved earlier are fixed too.
- After a form review is saved, the Past Reviews list updates immediately instead of still saying "No form reviews yet."

# HUNT READY 30 — Full Build 4.7.1

## Fixed
- Form check on iPhone: frame extraction hung at "Pulling frames…" because iOS won't decode an offscreen video until it plays. The extractor now attaches the video hidden in the page, primes it with a muted play/pause, shows progress (1 of 6…), and gives a clear error instead of hanging. Tapping Review while frames are still loading now says so instead of "Pick a video first."
- Target, bow, and meal photos: the file picker now offers Photo Library and Files as well as the camera (previously camera only).

# HUNT READY 30 — Full Build 4.7.0

## Archery Lab (replaces the Archery Log)
- **Log**: attach a photo of the target and let the AI measure the group (size in inches, where it sits, sight-adjustment hint, flyers). Pick your target face once; the width is remembered. Photos are stored with the session.
- **Trends**: group size over time per distance, with last / best / average, and a by-distance summary. Lower is better.
- **Form check**: pick a 5–20 second video of one shot; the app pulls six still frames on the phone and the AI returns coaching observations (stance, bow arm and grip, draw, anchor, release, top fixes, drills). Reviews are saved with a thumbnail.
- **Bow Profile**: photograph your bow and tap Scan; the AI reads brand, model, sight, rest, arrows, and handedness where legible. You confirm before saving. The photo is kept in the profile. New handedness field.

## Backend
- New `api/analyze-archery.js` (kinds: target, bow, form) sharing `lib/claude.js` with the meal endpoint. Same key, same endpoint setting; the app derives the archery URL from the meal one.
- Backups now include every stored photo (meals, targets, bow, form-check thumbnails).

# HUNT READY 30 — Full Build 4.6.0

## Added
- Hunt countdown. Add one or more opening days (Today → Hunt Dates). The next hunt drives the plan, which now counts back from it: Base (60+ days out, loads held at week 1–2), Build (59–25 days), Peak (24–11 days), Taper (last 10 days).
- Countdown card on Today: days left, phase, week within the phase, progress bar, and a Hunt Prep shortcut during the taper.
- Taper automatically trims workouts: one fewer strength set, shorter carries, rucks capped at 20 minutes, circuit at 15.
- Train tab shows the phase timeline for the upcoming hunt instead of the generic 8-week progression.
- Without a hunt date, everything behaves as before.

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
