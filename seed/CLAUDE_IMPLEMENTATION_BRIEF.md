# HUNT READY 30 — CLAUDE IMPLEMENTATION BRIEF
Version: 1.0 | Prepared: 2026-11-01

## INSTRUCTION TO CLAUDE
You are working inside my EXISTING Hunt Ready 30 application. Inspect the repository, current architecture, screens, design system, storage/database, authentication, navigation, and existing hunting functionality FIRST. Implement the feature set below directly in the existing app. Do not replace the application, introduce a second app, or overwrite existing user data. Preserve all current hunting features and branding. Reuse the existing stack and conventions. If a requested capability requires a new dependency, prefer the smallest stable option and explain why. If repository access is unavailable, first request the repo or project files rather than pretending the integration is complete.

This document contains my goals, starting data, UX expectations, acceptance criteria, and safe health-tracking boundaries. A machine-readable companion `USER_SEED_DATA.json` contains initial settings and a two-week workout template. Treat all values as editable defaults, not confirmed medical prescriptions or permanent targets.

## 1. PRODUCT VISION
Turn Hunt Ready 30 into my single mobile-first home for bowhunting preparation, a 15K run, strength training, nutrition, weight loss, recovery, and simple wellness tracking. I should be able to see today's priorities and log them in under 60 seconds without opening multiple apps. Build a cohesive experience, not a collection of disconnected trackers.

Primary user: adult male, 6 ft tall, approximately 250 lb starting weight, long-term target ~225 lb. Goals: first/beginner bowhunting readiness, complete a 15K (9.32 mi) in January or February 2027 (exact event/date not selected), preserve strength and lean mass during gradual weight loss, and be a healthy, active father. Starting continuous running capacity: approximately 0.25–0.5 mile. Target loss rate: 1–1.5 lb/week as a starting guideline, NOT a daily quota.

Equipment: adjustable dumbbells up to 52.5 lb, compound bow Bear Adapt 2 HP RTH+, 29-inch draw length, 70-lb draw weight. History of shoulder/labrum injury and neck-to-arm nerve symptoms. Avoid programming that pushes through pain, numbness, weakness, or radiating symptoms.

## 2. PRIMARY NAVIGATION / UX
Preserve current navigation and add or integrate these sections where appropriate:
- **Today**: one-screen dashboard with today's workout, run/walk intervals, hunting prep, protein progress, hydration, weight trend, recovery check-in, and one-tap logging.
- **Train**: weekly calendar, exercise detail, sets/reps/weight/RPE, running interval timer and completion, strength progression, walking and pack hikes.
- **Hunt Ready**: bow practice sessions, arrows shot, accuracy notes, draw comfort, hiking/terrain/pack readiness, gear checklist and milestones; preserve all existing hunting modules.
- **Fuel**: two meals + two shakes, protein and optional calorie targets, grocery/meal prep checklist, supplement checklist, hydration.
- **Progress**: weight weekly average, waist, strength benchmarks, run/walk duration and distance, longest continuous run, hiking capacity, 15K countdown when race date is known, adherence and energy/recovery.
- **Settings / Plan**: edit targets, days, training availability, race date, units, notifications, privacy, and export.

Mobile-first: responsive, thumb-friendly, accessible contrast, large tap targets, minimal typing, offline-first logging if existing stack supports it, data persistence, and optional push/local reminders only after user opt-in. Avoid guilt-inducing streaks. Show the next actionable step, not a wall of statistics.

## 3. DAILY DASHBOARD
Top: 'Hunt Ready 30' plus concise mission: 'Train for the miles. Prepare for the hunt. Be strong for the people who count on you.'
Show:
1. Today's scheduled training with Start / Log / Complete.
2. Run interval timer if applicable (jog/walk/rest cues, pause/resume, elapsed time, optional GPS only with permission, manual distance entry).
3. Protein consumed / editable daily target (initial 190 g).
4. Hydration servings or ounces (editable; no universal electrolyte dose).
5. Weight trend (weekly average) and 1–1.5 lb/week guideline; avoid projecting exact daily loss.
6. Readiness check-in: sleep duration, energy 1–5, soreness 1–5, pain/symptoms yes/no; suggest easier option if poor recovery, never diagnose.
7. Hunting task: bow practice, walk, terrain, gear, or rest.
8. Supplement checkbox list; NEVER present investigational peptide regimens as medically recommended.

## 4. INITIAL TRAINING PLAN — TWO-WEEK STARTER
The user's current running capacity is 0.25–0.5 mile without stopping. Initial plan is three easy run-walk sessions, two strength sessions, one optional hunting-conditioning session, and at least one recovery day weekly. All sessions should be reschedulable.

Monday — Run/walk: brisk walk 5 min, 8 x (jog 1 min easy + walk 2 min), cooldown walk 5 min. Total ~34 min.
Tuesday — Strength A, 30–40 min: goblet squat, dumbbell Romanian deadlift, chest-supported or supported row, core. Editable sets, reps, loads, and pain-free substitutions; start conservatively, typically 2 working sets each, RPE ~6–7.
Wednesday — Repeat Monday easy run/walk.
Thursday — Recovery: 20–30 min easy walk + gentle mobility, optional full rest.
Friday — Strength B, 30–40 min: step-up, split squat, pain-free upper-body push/pull, core; typically 2 working sets each, RPE ~6–7. No provocative shoulder loading.
Saturday — Longer easy run/walk: 35–40 min total, alternate jog 1 min / walk 2–3 min, conversational effort.
Sunday — Optional hunting conditioning: easy 30–45 min varied-terrain walk; light pack only if symptom-free, or full rest.

Week 2: repeat baseline; only if recovered well, allow selected jog intervals to progress toward 90 sec with 2 min walk. No automatic increase if pain, persistent fatigue, or poor recovery. Don't simultaneously increase speed and duration. Offer user approval for all progression. Easy/conversational running, not speedwork. Avoid aggressive jump in volume. If the event is in January, explain that completion may require substantial run/walk and date-dependent adjustment; do not promise a continuous 15K. If February, use available additional weeks. Once race date is set, build a conservative, adaptable week-by-week plan and taper. Record whether 15K is run/walk completion or continuous-run aspiration.

Strength progression: allow logging sets/reps/weight, weekly review, pain-free movement alternatives, and keep overall lifting volume manageable while building running. Do not imply a 70-lb bow draw is safe to repeatedly practice with shoulder symptoms; allow technique and symptom logs, suggest qualified archery coach/medical evaluation as appropriate.

## 5. HUNTING-SPECIFIC TRACKING
- Bow practice log: date, session length, arrow count, range/distance, grouping/accuracy notes, shoulder comfort 0–10, fatigue, form notes.
- Hike log: time, distance, elevation if available, terrain, pack weight (optional), exertion, recovery.
- Gear readiness checklist, safety checklist, weather awareness, hunter education/licensing notes (do not invent state requirements).
- Bow setup fields prefilled: Bear Adapt 2 HP RTH+, 29-inch draw, 70-lb draw; editable.
- Milestones: 45-minute comfortable hike, 60-minute comfortable hike, consistent pain-free practice, progressive run/walk endurance. No guaranteed dates.
- Keep bowhunting/archery focus; do not replace with rifle-only hunting plans.

## 6. NUTRITION / FUEL
Default daily targets (editable starting estimates): approximately 2,400 kcal and 190 g protein. Earlier macro illustration: 180 g carbohydrate and 102 g fat, which totals ~2,398 kcal. These are estimates, not a fixed clinical prescription; monitor weight trend, hunger, strength, running recovery, and adjust with qualified guidance. No rigid daily deficit on high-training days. Prefer adequate fueling around runs and resistance training.

Meal pattern (no breakfast):
- 11:00 AM — protein shake (own single-ingredient grass-fed protein powder; log grams from actual label, do not assume a scoop size)
- 1:30 PM — lunch, substantial protein meal
- 4:00 PM — protein shake
- 7:00 PM — dinner, substantial protein meal
Protein target distributed roughly 40–55 g across four feedings as convenient. Log actual portions, not fictional nutrition precision.

Preferred foods: eggs, affordable ground beef, chicken breast/thighs, Trader Joe's chicken sausage/meatballs, cottage cheese, Greek yogurt/yogurt, cheese, plain frozen cut sweet potatoes (NOT oily sweet potato fries), green beans, avocado, sourdough, occasional ravioli, olive/avocado oil, butter. Groceries mainly Trader Joe's and Wild Fork; sometimes Sprouts/Publix. Simple repeatable meal prep. Starter meal-prep illustration: 150–200 g plain sweet potato + ~125 g green beans per main meal, protein portion adjusted to hit target; for six main meals (three days), ~900–1,200 g sweet potato and ~750 g green beans. Make portion sizes editable.

Implement: four daily meal slots, reusable meals, portion editor, quick protein logging, grocery checklist with 3-day batch prep, meal-prep quantities, optional calorie and macro tracking. Avoid unnecessary food restrictions.

## 7. SUPPLEMENTS / MEDICATION LOGGING — SAFETY-CRITICAL
Track supplements as USER-REPORTED, not app-endorsed treatments:
- Creatine monohydrate: user plans 3–5 g daily.
- Vitamin D3 and K2: user interested; exact doses not established. Allow blank dose and lab/prescriber notes. K2 caution with warfarin.
- Magnesium: user interested; record elemental mg and formulation; no auto-dose.
- Electrolytes: user uses LMNT and Mountain Ops hydration; record actual servings and label sodium/potassium/magnesium, avoid double-counting.
- Psyllium fiber: user already owns; allow servings and water reminder; caution about spacing from oral medications per label.
- TRT: USER-REPORTED testosterone concentration 200 mg/mL, weekly volume 0.8–0.9 mL = 160–180 mg/week, split across Monday/Wednesday/Friday (~0.267–0.3 mL per injection if evenly divided). This is a logging reference only, NOT a dosing recommendation or automated schedule. Only enable dose reminders if user explicitly confirms their current prescriber-directed regimen. Do not suggest titration.
- Retatrutide: user is considering or intending to use; investigational and not FDA approved as of this brief. DO NOT prefill a dose, injection schedule, sourcing advice, or combine into a recommended protocol. Show clear investigational status and encourage authorized clinical-trial/clinician oversight.
- Tesamorelin + ipamorelin: user is considering combination but plans to hold initially; not active. No recommended stack or timing.
- BPC-157 + TB-500 ('Wolverine'): user interested for both shoulder recovery and muscle preservation; not validated for these purposes. Mark contemplated/inactive. No auto-dosing.
- CJC-1295: user does not think it is needed; mark excluded, not an active item.

IMPORTANT: Do not make a 'peptide stack builder' that recommends unapproved compounds, calculates experimental injection doses, or treats research peptides as approved. If the existing app has medication tracking, store only user-confirmed medications and schedules. Health information is sensitive: local encryption where feasible, access control, minimal collection, delete/export controls, no analytics leakage, no public sharing by default. Include brief safety language and 'talk with prescriber' reminders, not medical diagnosis.

## 8. DATA MODEL / STORAGE
Adapt to existing architecture. Suggested entities:
- user_profile: height, weight goal, equipment, preferences, target race, training availability
- daily_checkin: date, sleep, energy, soreness, pain/symptoms, notes
- workout_plan, workout_session, exercise_set: scheduled vs actual, completion, duration, loads, reps, RPE, pain flags
- run_session: intervals, elapsed time, distance (manual/GPS), perceived effort, continuous run max, notes
- hunt_session: type (bow practice/hike/gear), duration, arrow count, distance, accuracy notes, pack weight, comfort
- nutrition_entry: date/time, meal slot, food, serving, calories/protein/carbs/fat if known
- hydration_entry: volume, brand/product, electrolyte content from user label
- supplement_entry and medication_entry: user-confirmed status, dose/unit, schedule, completion, safety note
- body_metric: weight, waist, measurement date
- goals and milestones: type, target date, completion, trend

Store dates in timezone-aware manner, support edit/delete, avoid duplicate entries, and make backups/export possible. Support import from `USER_SEED_DATA.json` as an idempotent initial seed: do not overwrite existing settings without explicit confirmation.

## 9. INSIGHTS AND ADAPTATION
- Weekly weight averages rather than daily fluctuation judgments.
- Show weekly run duration/distance, longest continuous running segment, strength trends, protein adherence, and hunting practice consistency.
- If weight loss exceeds ~1.5 lb/week for multiple weeks or strength/energy declines, flag 'review fueling and recovery' rather than automatically changing meds or diet.
- If pain, numbness, radiating symptoms, or weakness logged, advise pausing provoking activity and seeking qualified evaluation; don't diagnose.
- Adapt run/walk progression only after user confirmation; avoid overuse by respecting recovery.
- Celebrate process milestones (first 30-minute run-walk, consistent training, 60-minute hike) rather than only weight loss.

## 10. IMPLEMENTATION PHASES
Phase 1 (MVP): inspect existing app; integrate Today dashboard, editable profile/goals, 2-week training calendar, run-walk timer, workout logging, weight trend, protein/shake/meal quick log, and basic persistence.
Phase 2: hunting/bow session logging, pack hikes, supplements/hydration, 3-day meal-prep checklist, weekly insights.
Phase 3: date-aware 15K progression, reminders (opt-in), export/import, accessibility and offline polish.

## 11. ACCEPTANCE CRITERIA
1. Existing Hunt Ready 30 functionality remains intact and all additions live in same app/navigation.
2. From phone home screen, I can see today's training, mark it complete, log a shake, record weight, and enter readiness in under 60 seconds total for common actions.
3. Monday/Wednesday/Friday TRT schedule is NOT automatically treated as prescribed unless I explicitly confirm; any displayed amount uses correct mg/mL math.
4. No experimental peptide is represented as an approved, validated, or recommended muscle-building protocol.
5. Three run-walk days, two strength days, recovery and optional hunting conditioning appear in first two weeks.
6. Running plan starts from 0.25–0.5 mi baseline and does not assume I can run 15K today.
7. User can edit race date, workout days, meal times, target weight, and food choices.
8. Data survives app restart, supports edits, and does not duplicate on reimport.
9. Existing bowhunting features and data are preserved.
10. All screens work well on a phone and are keyboard/screen-reader accessible.

## 12. CLAUDE'S REQUIRED RESPONSE / WORKFLOW
A. Inspect and summarize the existing codebase and identify exact files/components to extend.
B. Present a concise integration plan mapping new screens and data models onto existing architecture.
C. Implement Phase 1 fully, run available tests/build/lint, fix errors, and report actual outcomes.
D. Implement Phase 2 and 3 if feasible within the session; otherwise provide a prioritized next-step checklist and precise file changes still needed.
E. Show me how to run/use the updated app on my phone. Do not claim deployment, testing, or integration occurred unless actually completed.
