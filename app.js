const PROGRAM = {
  Monday: {
    title: "Lower Body Strength",
    focus: "Legs • hills • pack carrying",
    duration: 30,
    exercises: [
      { name: "Warm-up", prescription: "5 min", type: "time", rest: 0, notes: "Bodyweight squat, hip hinge, reverse lunge, calf raise, marching." },
      { name: "Goblet Squat", prescription: "3 × 8–12", sets: 3, min: 8, max: 12, rest: 60 },
      { name: "DB Romanian Deadlift", prescription: "3 × 8–12", sets: 3, min: 8, max: 12, rest: 60 },
      { name: "Reverse Lunge", prescription: "2 × 8/leg", sets: 2, min: 8, max: 8, rest: 45 },
      { name: "Standing Calf Raise", prescription: "2 × 15–20", sets: 2, min: 15, max: 20, rest: 45 },
      { name: "Farmer Carry", prescription: "7 × 40 sec", sets: 7, type: "time", seconds: 40, rest: 20 }
    ]
  },
  Tuesday: {
    title: "Archery Upper Body",
    focus: "Back • shoulders • core",
    duration: 30,
    exercises: [
      { name: "Shoulder Prep", prescription: "5 min", type: "time", rest: 0, notes: "Arm circles, scapular push-ups, shoulder blade squeezes, light rows." },
      { name: "1-Arm DB Row", prescription: "3 × 10/side", sets: 3, min: 10, max: 10, rest: 60 },
      { name: "DB Floor Press", prescription: "3 × 8–12", sets: 3, min: 8, max: 12, rest: 60 },
      { name: "Bent-Over Rear-Delt Raise", prescription: "3 × 12–15", sets: 3, min: 12, max: 15, rest: 45 },
      { name: "Hammer Curl", prescription: "2 × 10–12", sets: 2, min: 10, max: 12, rest: 45 },
      { name: "Suitcase Carry", prescription: "4 rounds × 40 sec/side", sets: 8, type: "time", seconds: 40, rest: 20 }
    ]
  },
  Wednesday: {
    title: "Ruck Day",
    focus: "Hunting-specific conditioning",
    duration: 30,
    exercises: [
      { name: "Weighted Walk / Ruck", prescription: "30 min", type: "ruck", rest: 0, notes: "Start with 10–15 lb. Brisk pace. No running. Add ~5 lb every 1–2 weeks until 25–30 lb is comfortable." }
    ]
  },
  Thursday: {
    title: "Full-Body Strength",
    focus: "Strength • stability • durability",
    duration: 30,
    exercises: [
      { name: "Dynamic Warm-up", prescription: "5 min", type: "time", rest: 0 },
      { name: "Goblet Squat", prescription: "3 rounds × 10", sets: 3, min: 10, max: 10, rest: 0 },
      { name: "1-Arm DB Row", prescription: "3 rounds × 10/side", sets: 3, min: 10, max: 10, rest: 0 },
      { name: "DB Floor Press", prescription: "3 rounds × 10", sets: 3, min: 10, max: 10, rest: 0 },
      { name: "DB Romanian Deadlift", prescription: "3 rounds × 10", sets: 3, min: 10, max: 10, rest: 0 },
      { name: "Step-Up", prescription: "3 rounds × 8/leg", sets: 3, min: 8, max: 8, rest: 75 },
      { name: "Plank", prescription: "5 min block", type: "time", seconds: 45, rest: 30 }
    ]
  },
  Friday: {
    title: "Hunter Conditioning",
    focus: "Work capacity • controlled intensity",
    duration: 30,
    exercises: [
      { name: "Warm-up", prescription: "5 min", type: "time", rest: 0 },
      { name: "20-Min Hunter Circuit", prescription: "AMRAP quality rounds", type: "circuit", rest: 0, notes: "8 goblet squats • 8 push-ups • 10 DB RDLs • 8 reverse lunges/leg • 10 one-arm rows/side • 30-sec farmer carry. Do not race." },
      { name: "Easy Walk / Cooldown", prescription: "5 min", type: "time", rest: 0 }
    ]
  },
  Saturday: {
    title: "Easy Outdoor Day",
    focus: "Ruck base • mobility",
    duration: 30,
    exercises: [
      { name: "Easy Weighted Walk", prescription: "20–25 min", type: "ruck", rest: 0, notes: "Use 10–15 lb initially." },
      { name: "Mobility", prescription: "5–10 min", type: "time", rest: 0, notes: "Calves, ankles, hips, hamstrings, thoracic rotation, shoulders/chest." }
    ]
  },
  Sunday: {
    title: "Recovery",
    focus: "Rest • family • easy movement",
    duration: 0,
    exercises: [
      { name: "No structured training", prescription: "Recover", type: "rest", rest: 0, notes: "Easy walking is fine. Recovery counts." }
    ]
  }
};

const BENCHMARKS = [
  { id: "goblet", label: "Goblet squat", target: 52.5, unit: "lb × 12" },
  { id: "rdl", label: "DB Romanian deadlift", target: 105, unit: "lb total × 10–12" },
  { id: "row", label: "1-arm DB row", target: 45, unit: "lb × 10" },
  { id: "carry", label: "Farmer carry", target: 105, unit: "lb total × 60 sec" },
  { id: "pushup", label: "Push-ups", target: 20, unit: "clean reps" },
  { id: "plank", label: "Plank", target: 90, unit: "seconds" },
  { id: "ruck", label: "Ruck", target: 30, unit: "lb for 30 min" }
];

const EXERCISE_GUIDES = {
  "Warm-up": {
    subtitle: "Goal: wake up your joints and rehearse the basic patterns.",
    steps: [
      "Move continuously for 5 minutes instead of treating each drill like a hard set.",
      "Cycle through bodyweight squats, hip hinges, reverse lunges, calf raises, and marching.",
      "Stay smooth and relaxed. The goal is to feel more mobile, not tired."
    ],
    cues: ["Breathe through your nose if possible.", "Move deliberately.", "Use the warm-up to grease the movement patterns before loading them."],
    mistakes: ["Rushing through the drills.", "Turning the warm-up into cardio.", "Skipping the hinge because it feels unfamiliar."],
    why: "This prepares your hips, knees, ankles, and trunk for the loaded work coming next."
  },
  "Shoulder Prep": {
    subtitle: "Goal: wake up the shoulder blades before upper-body work and archery training.",
    steps: [
      "Do arm circles forward and backward.",
      "Perform 10 scapular push-ups: keep elbows straight and let your chest sink between the shoulders, then push the floor away.",
      "Do 10 shoulder-blade squeezes: pull shoulder blades gently together and down.",
      "Finish with very light rows to get blood into the upper back."
    ],
    cues: ["Shoulders down, not shrugged.", "Neck relaxed.", "Move smoothly; no jerking."],
    mistakes: ["Turning shoulder prep into a heavy workout.", "Shrugging up toward your ears.", "Arching the low back excessively."],
    why: "Healthy scapular movement helps protect your shoulders and supports a steadier bow hold."
  },
  "Dynamic Warm-up": {
    subtitle: "Goal: prime your body before full-body work.",
    steps: ["Repeat a few rounds of squat, hinge, lunge, and light marching patterns for 5 minutes.", "Add arm circles or easy rows if your upper body feels stiff."],
    cues: ["Feel looser at the end than at the start.", "No pain, no urgency."],
    mistakes: ["Skipping it because you feel short on time."],
    why: "This helps the strength work feel better and lowers the odds of irritating tight joints." 
  },
  "Goblet Squat": {
    subtitle: "Main lower-body strength movement.",
    steps: [
      "Hold one dumbbell vertically at your chest like a goblet.",
      "Stand with feet about shoulder width apart, toes slightly turned out if that feels natural.",
      "Brace your core, sit down between your legs, and keep the dumbbell close to your chest.",
      "Descend as low as you can while keeping your feet flat and chest proud.",
      "Drive through the whole foot and stand tall."
    ],
    cues: ["Ribs down.", "Knees track over toes.", "Keep your chest lifted but don’t overarch your back."],
    mistakes: ["Heels popping up.", "Collapsing forward.", "Letting knees cave inward."],
    why: "Builds legs and trunk strength for hiking, climbing, and stable shooting positions."
  },
  "DB Romanian Deadlift": {
    subtitle: "This is the loaded version of the hip hinge.",
    steps: [
      "Hold a dumbbell in each hand in front of your thighs.",
      "Unlock your knees slightly and keep them there.",
      "Push your hips back like you’re trying to close a car door with your butt.",
      "Keep the dumbbells close to your legs as your torso tips forward.",
      "Stop when you feel a strong hamstring stretch and your back is still flat.",
      "Drive hips forward to stand up tall."
    ],
    cues: ["Soft knees, big hips back.", "Back flat.", "Neck neutral; eyes a few feet in front of you."],
    mistakes: ["Squatting the weight instead of hinging.", "Rounding the low back.", "Letting the dumbbells drift far from the legs."],
    why: "Builds hamstrings, glutes, and posterior chain—the engine for hiking, carrying, and durability."
  },
  "Reverse Lunge": {
    subtitle: "Single-leg strength with less knee irritation than many forward lunges.",
    steps: [
      "Stand tall.",
      "Step one leg back and lower until both knees bend.",
      "Front foot stays flat and front knee tracks over mid-foot.",
      "Push through the front foot to return to standing.",
      "Repeat on the same side or alternate, depending on preference."
    ],
    cues: ["Long spine.", "Control the descent.", "Most of the work happens through the front leg."],
    mistakes: ["Leaning forward excessively.", "Front heel lifting.", "Bouncing off the bottom."],
    why: "Improves balance, coordination, and single-leg strength for trails and uneven terrain."
  },
  "Standing Calf Raise": {
    subtitle: "Simple lower-leg work for ankles, walking, and rucking.",
    steps: ["Stand tall, hold onto something if needed.", "Rise onto the balls of your feet.", "Pause briefly at the top, then lower under control."],
    cues: ["Move through full range.", "Stay tall.", "Control the lowering phase."],
    mistakes: ["Bouncing.", "Cutting the range short."],
    why: "Supports ankle strength and lower-leg endurance for walking and hiking." 
  },
  "Farmer Carry": {
    subtitle: "One of the best total-body hunting exercises.",
    steps: ["Grab two dumbbells and stand tall.", "Walk slowly with short, controlled steps.", "Keep your ribs stacked over your hips and don’t lean around."],
    cues: ["Tall posture.", "Squeeze the handles.", "Walk under control, don’t rush."],
    mistakes: ["Shrugging hard.", "Leaning side to side.", "Using a load so heavy that posture collapses."],
    why: "Builds grip, trunk stiffness, and loaded-carry capacity for gear and meat hauling." 
  },
  "1-Arm DB Row": {
    subtitle: "Upper-back strength that supports posture and archery.",
    steps: [
      "Support yourself with one hand on a bench, chair, or your opposite thigh.",
      "Hold the dumbbell in the free hand with arm extended.",
      "Pull elbow back toward your hip, not straight up toward your shoulder.",
      "Pause briefly, then lower under control."
    ],
    cues: ["Back flat.", "Lead with the elbow.", "Don’t twist your torso."],
    mistakes: ["Yanking with body English.", "Shrugging at the top.", "Shortening the range."],
    why: "Strengthens lats, rhomboids, and grip—key for shoulder health and bow control." 
  },
  "DB Floor Press": {
    subtitle: "A shoulder-friendlier pressing variation.",
    steps: ["Lie on the floor with knees bent and a dumbbell in each hand.", "Press the dumbbells upward until elbows are straight but not hyperextended.", "Lower until upper arms lightly contact the floor, then press again."],
    cues: ["Wrists stacked over elbows.", "Shoulder blades lightly pinned to the floor.", "Control the lowering phase."],
    mistakes: ["Flaring elbows too aggressively.", "Bouncing off the floor.", "Arching excessively."],
    why: "Builds pressing strength without needing a bench and is usually easier on the shoulders."
  },
  "Bent-Over Rear-Delt Raise": {
    subtitle: "Targets the rear shoulders and upper back.",
    steps: ["Hinge forward with a dumbbell in each hand.", "Keep a slight bend in the elbows.", "Raise arms out to the sides until shoulder height or slightly below.", "Lower slowly."],
    cues: ["Small weights are fine here.", "Neck neutral.", "Move from the shoulders, not momentum."],
    mistakes: ["Using too much weight.", "Turning it into a shrug.", "Standing too upright."],
    why: "Great for shoulder balance and posture, especially if you sit or drive a lot." 
  },
  "Hammer Curl": {
    subtitle: "Grip and arm strength support carries and bow control.",
    steps: ["Hold dumbbells at your sides with palms facing each other.", "Curl while keeping palms neutral.", "Lower under control."],
    cues: ["Elbows stay near your sides.", "No swinging."],
    mistakes: ["Using your back to start the rep.", "Shrugging the shoulders."],
    why: "Builds biceps, forearms, and grip in a joint-friendly way." 
  },
  "Suitcase Carry": {
    subtitle: "Anti-side-bend core training.",
    steps: ["Hold one dumbbell in one hand.", "Stand tall and walk while resisting the urge to lean toward or away from the weight.", "Switch sides after the timed interval."],
    cues: ["Belt buckle level.", "Ribs down.", "Slow controlled steps."],
    mistakes: ["Leaning to compensate.", "Using too much weight and losing posture."],
    why: "Builds lateral core stability for uneven terrain, carrying gear, and stability under load." 
  },
  "Weighted Walk / Ruck": {
    subtitle: "Hunting-specific conditioning without beating you up.",
    steps: ["Load your vest or pack with 10–15 lb to start.", "Walk briskly for 30 minutes.", "Keep a pace where you can speak a sentence but know you’re working."],
    cues: ["Tall posture.", "Short quick steps.", "Nasal breathing if possible."],
    mistakes: ["Starting too heavy.", "Jogging.", "Letting posture sag forward."],
    why: "This builds the exact kind of conditioning that carries into hunting and everyday work capacity." 
  },
  "Step-Up": {
    subtitle: "Simple but extremely useful lower-body and hiking strength.",
    steps: ["Use a stable step, bench, or stair.", "Plant the full foot on the step.", "Drive through that foot and stand up without pushing excessively off the back leg.", "Step down under control."],
    cues: ["Full foot on the box.", "Control the descent.", "Stay tall."],
    mistakes: ["Launching off the back foot.", "Letting the knee cave inward.", "Using a step that is too high."],
    why: "Very specific to hiking, climbing, and uphill movement." 
  },
  "Plank": {
    subtitle: "Anti-extension trunk strength.",
    steps: ["Set elbows under shoulders.", "Lift into a straight line from shoulders to ankles (or knees if needed).", "Brace your abs and glutes and breathe behind the brace."],
    cues: ["Squeeze glutes.", "Ribs down.", "Think long, not just hard."],
    mistakes: ["Sagging low back.", "Piking hips too high.", "Holding your breath the whole time."],
    why: "Better trunk endurance helps almost everything—rucking, carries, posture, and safer lifting." 
  },
  "20-Min Hunter Circuit": {
    subtitle: "This is your work-capacity block.",
    steps: ["Cycle through goblet squats, push-ups, DB RDLs, reverse lunges, one-arm rows, and a short farmer carry.", "Move with purpose but do not race.", "Take just enough rest to keep the form clean."],
    cues: ["Quality rounds, not sloppy rounds.", "Nasal breathing whenever you can.", "Stay smooth."],
    mistakes: ["Turning it into an all-out burner.", "Using loads that wreck the form."],
    why: "Builds sustainable conditioning that feels more like real work than treadmill cardio." 
  },
  "Easy Walk / Cooldown": {
    subtitle: "Bring the heart rate down.",
    steps: ["Walk for 5 minutes at an easy pace.", "Breathe slowly and let your body shift back into recovery mode."],
    cues: ["Slow down.", "Nose breathing if possible."],
    mistakes: ["Skipping the cooldown because you’re done training."],
    why: "Helps you recover and leaves the session feeling more complete." 
  },
  "Easy Weighted Walk": {
    subtitle: "A lighter recovery version of the ruck.",
    steps: ["Load 10–15 lb.", "Walk 20–25 minutes at an easy pace.", "Use it as practice for posture and consistency, not a hard conditioning day."],
    cues: ["Relaxed, steady pace.", "Tall posture."],
    mistakes: ["Turning this into another hard session."],
    why: "Builds consistency and low-stress conditioning." 
  },
  "Mobility": {
    subtitle: "Think of this as maintenance work.",
    steps: ["Spend 5–10 minutes on calves, ankles, hips, hamstrings, thoracic rotation, and shoulders/chest.", "Move slowly into positions and breathe."],
    cues: ["Gentle stretch, not pain.", "Exhale into tight areas."],
    mistakes: ["Forcing range aggressively.", "Skipping what feels awkward."],
    why: "Helps you move and recover better with very little fatigue cost." 
  },
  "Bodyweight Squat": {
    subtitle: "Warm-up squat pattern.",
    steps: ["Feet about shoulder width.", "Sit down between the hips.", "Stand back up smoothly."],
    cues: ["Full foot down.", "Chest tall.", "Easy tempo."],
    mistakes: ["Rushing.", "Cutting depth because you’re stiff."],
    why: "Rehearses the squat pattern before loading it." 
  },
  "Hip Hinge": {
    subtitle: "This is the pattern behind the Romanian deadlift.",
    steps: ["Stand tall with soft knees.", "Place your hands in the crease of your hips.", "Push your hips straight back while your torso tips forward.", "Keep your spine neutral and feel tension in the hamstrings.", "Drive the hips forward to stand back up."],
    cues: ["Imagine closing a car door with your butt.", "Shins mostly vertical.", "Back flat."],
    mistakes: ["Turning it into a squat.", "Bending from the spine instead of the hips.", "Locking the knees straight."],
    why: "A clean hinge is foundational for deadlifts, safe lifting, and posterior-chain strength." 
  },
  "Marching": {
    subtitle: "Simple coordination and warm-up drill.",
    steps: ["Stand tall and lift one knee at a time.", "Swing the opposite arm naturally.", "Move continuously for 30–60 seconds."],
    cues: ["Tall posture.", "Easy rhythm."],
    mistakes: ["Stomping or rushing."],
    why: "Gets you moving and raises body temperature with almost no fatigue." 
  },
  "Push-Ups": {
    subtitle: "Basic upper-body pushing movement.",
    steps: ["Hands just outside shoulder width.", "Body in a straight line.", "Lower chest toward the floor.", "Press back up."],
    cues: ["Brace your abs.", "Glutes tight.", "Elbows roughly 30–45° from the body."],
    mistakes: ["Sagging hips.", "Chicken-necking forward.", "Half reps."],
    why: "Builds pressing strength and trunk control with no equipment." 
  },
  "No structured training": {
    subtitle: "Recovery is part of training.",
    steps: ["Take the day off from formal training.", "Easy walking is fine.", "Focus on sleep, hydration, and feeling human again."],
    cues: ["Recover on purpose."],
    mistakes: ["Feeling guilty for resting."],
    why: "Adaptation happens when you recover, not just when you grind." 
  }
};


const DEMO_LINKS = {
  "Goblet Squat": {label:"Watch NASM demo", url:"https://www.youtube.com/watch?v=nfX7IFK9UNI"},
  "DB Romanian Deadlift": {label:"Watch NASM demo", url:"https://www.youtube.com/watch?v=V8Hdl1FiNt4"},
  "Hip Hinge": {label:"Watch hinge/RDL demo", url:"https://www.youtube.com/watch?v=V8Hdl1FiNt4"},
  "Plank": {label:"Watch NASM demo", url:"https://www.youtube.com/watch?v=mwlp75MS6Rg"},
  "Push-Ups": {label:"Watch NASM demo", url:"https://www.youtube.com/watch?v=WDIpL0pjun0"},
  "Warm-up": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Shoulder Prep": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Dynamic Warm-up": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "1-Arm DB Row": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "DB Floor Press": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Bent-Over Rear-Delt Raise": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Hammer Curl": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Reverse Lunge": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Standing Calf Raise": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Farmer Carry": {label:"Open ACE movement resource", url:"https://www.acefitness.org/resources/pros/expert-articles/9145/a-hyrox-inspired-workout-combining-functional-and-cardio-training/"},
  "Suitcase Carry": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Weighted Walk / Ruck": {label:"No video needed — read form cues", url:""},
  "Step-Up": {label:"Open ACE movement resource", url:"https://www.acefitness.org/resources/pros/expert-articles/9145/a-hyrox-inspired-workout-combining-functional-and-cardio-training/"},
  "20-Min Hunter Circuit": {label:"Open exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Easy Weighted Walk": {label:"No video needed — read form cues", url:""},
  "Mobility": {label:"Open NASM exercise library", url:"https://www.nasm.org/resource-center/exercise-library"},
  "Bodyweight Squat": {label:"Watch goblet squat pattern", url:"https://www.youtube.com/watch?v=nfX7IFK9UNI"},
  "Marching": {label:"No video needed — read form cues", url:""}
};

const LEARN_ORDER = [
  "Hip Hinge","Goblet Squat","DB Romanian Deadlift","Reverse Lunge","1-Arm DB Row","DB Floor Press","Farmer Carry","Suitcase Carry","Step-Up","Plank","Push-Ups","Bent-Over Rear-Delt Raise","Hammer Curl","Standing Calf Raise","Weighted Walk / Ruck","Shoulder Prep","Warm-up","Mobility"
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let active = null, interval = null, restInterval = null;

function getState() {
  return {
    startDate: localStorage.hr30_startDate || new Date().toISOString().slice(0,10),
    history: JSON.parse(localStorage.hr30_history || '[]'),
    benchmarks: JSON.parse(localStorage.hr30_benchmarks || '{}'),
    bodyWeight: localStorage.hr30_bodyWeight || '',
    waist: localStorage.hr30_waist || '',
    preferredRuck: Number(localStorage.hr30_preferredRuck || 10)
  };
}
if (!localStorage.hr30_startDate) localStorage.hr30_startDate = new Date().toISOString().slice(0,10);

function saveHistory(item) {
  const s = getState();
  s.history.unshift(item);
  localStorage.hr30_history = JSON.stringify(s.history.slice(0,100));
}
function dayName(d=new Date()) { return d.toLocaleDateString('en-US', { weekday:'long' }); }
function formatDate(d=new Date()) { return d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }); }
function weekNumber() {
  const start = new Date(localStorage.hr30_startDate + 'T00:00:00');
  const now = new Date();
  const diff = Math.max(0, now - start);
  return Math.min(8, Math.floor(diff / 604800000) + 1);
}
function completedThisWeek() {
  const now = new Date();
  const first = new Date(now);
  const day = (now.getDay() + 6) % 7;
  first.setDate(now.getDate() - day);
  first.setHours(0,0,0,0);
  return getState().history.filter(h => new Date(h.date) >= first).length;
}

function tab(name) {
  $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  if (name === 'today') renderToday();
  if (name === 'week') renderWeek();
  if (name === 'learn') renderLearn();
  if (name === 'progress') renderProgress();
  if (name === 'history') renderHistory();
}
$$('.nav-btn').forEach(b => b.onclick = () => tab(b.dataset.tab));

function exerciseActionButtons(name) {
  return `<div class="mini-actions"><button class="ghost" onclick='showExerciseGuide(${JSON.stringify(name)}, "list")'>How to do it →</button></div>`;
}

function exerciseList(workout) {
  return workout.exercises.map((e,i) => `
    <div class="exercise">
      <div class="exercise-num">${i+1}</div>
      <div>
        <h4>${e.name}</h4>
        <p>${e.prescription}</p>
        <div class="tag-row">
          ${e.rest ? `<span class="tag">${e.rest}s rest</span>` : ''}
          ${e.notes ? `<span class="tag">${e.notes}</span>` : ''}
        </div>
        ${exerciseActionButtons(e.name)}
      </div>
    </div>`).join('');
}

function renderToday() {
  const d = dayName();
  const w = PROGRAM[d];
  const s = getState();
  $('#main').innerHTML = `
    <section class="card hero">
      <div class="kicker">Week ${weekNumber()} • ${d}</div>
      <h2>${w.title}</h2>
      <div class="sub">${w.focus}</div>
      <div class="metrics">
        <div class="metric"><strong>${w.duration || '—'}</strong><span>minutes</span></div>
        <div class="metric"><strong>${completedThisWeek()}</strong><span>sessions this week</span></div>
        <div class="metric"><strong>${s.preferredRuck}</strong><span>lb ruck start</span></div>
      </div>
      ${w.duration ? `<button class="primary" onclick="startWorkout('${d}')">START WORKOUT</button>` : `<button class="primary" onclick="quickLogRecovery()">LOG RECOVERY DAY</button>`}
    </section>
    <div class="section-title"><h3>Today's plan</h3><small>${formatDate()}</small></div>
    <section class="card">${exerciseList(w)}</section>
    <section class="card">
      <div class="kicker">PHASE 1 RULE</div>
      <h3>Leave 2–3 clean reps in reserve</h3>
      <p class="sub">Weeks 1–2 are about consistency, not destruction. Once you hit the top of a rep range with clean form, add 2.5–5 lb next time.</p>
    </section>`;
}

function renderWeek() {
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const today = dayName();
  $('#main').innerHTML = `
    <div class="section-title"><h3>8-week training week</h3><small>Week ${weekNumber()}</small></div>
    <div class="day-grid">${days.map(d => `
      <div class="day-card ${d===today?'today':''}">
        <div class="kicker">${d}</div>
        <h4>${PROGRAM[d].title}</h4>
        <p>${PROGRAM[d].focus}</p>
        <button class="ghost" onclick="openDay('${d}')">View →</button>
      </div>`).join('')}</div>
    <section class="card" style="margin-top:14px">
      <div class="kicker">PROGRESSION</div>
      <h3>Weeks 1–2</h3><p class="sub">Learn the movements. Stay conservative.</p>
      <h3>Weeks 3–4</h3><p class="sub">Add reps or 2.5–5 lb whenever form stays clean.</p>
      <h3>Weeks 5–8</h3><p class="sub">Push strength and bring ruck load gradually toward 20–30 lb.</p>
    </section>`;
}

function openDay(d) {
  openModal(`
    <div class="close-row"><div><div class="kicker">${d}</div><h2>${PROGRAM[d].title}</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div>
    <p class="sub">${PROGRAM[d].focus}</p>
    <div class="card">${exerciseList(PROGRAM[d])}</div>
    ${PROGRAM[d].duration ? `<button class="primary" onclick="closeModal();startWorkout('${d}')">START THIS WORKOUT</button>` : ''}`);
}

function renderProgress() {
  const s = getState();
  $('#main').innerHTML = `
    <section class="card">
      <div class="kicker">HUNTER READINESS</div>
      <h2 style="margin:6px 0">Benchmarks</h2>
      <p class="sub">Update these as you train. The goal is capability, not a vanity score.</p>
      ${BENCHMARKS.map(b => {
        const val = Number(s.benchmarks[b.id] || 0);
        const pct = Math.min(100, Math.round((val / b.target) * 100));
        return `<div class="benchmark"><div class="benchmark-top"><div><strong>${b.label}</strong><br><small>Goal: ${b.target} ${b.unit}</small></div><button class="ghost" onclick="editBenchmark('${b.id}')">${val || 'Set'}</button></div><div class="progress-bar"><span style="width:${pct}%"></span></div></div>`;
      }).join('')}
    </section>
    <section class="card">
      <div class="kicker">BODY METRICS</div>
      <div class="set-grid">
        <div class="field"><label>Body weight</label><input id="bw" inputmode="decimal" value="${s.bodyWeight}" placeholder="lb"></div>
        <div class="field"><label>Waist</label><input id="waist" inputmode="decimal" value="${s.waist}" placeholder="in"></div>
      </div>
      <button class="primary" onclick="saveBody()">SAVE</button>
    </section>`;
}

function editBenchmark(id) {
  const b = BENCHMARKS.find(x => x.id === id), s = getState(), old = s.benchmarks[id] || '';
  openModal(`
    <div class="close-row"><div><div class="kicker">UPDATE</div><h2>${b.label}</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div>
    <div class="field"><label>Current best (${b.unit})</label><input id="benchVal" inputmode="decimal" value="${old}"></div>
    <button class="primary" onclick="saveBenchmark('${id}')">SAVE</button>`);
}
function saveBenchmark(id) {
  const s = getState();
  s.benchmarks[id] = Number($('#benchVal').value || 0);
  localStorage.hr30_benchmarks = JSON.stringify(s.benchmarks);
  closeModal();
  renderProgress();
}
function saveBody() {
  localStorage.hr30_bodyWeight = $('#bw').value;
  localStorage.hr30_waist = $('#waist').value;
  alert('Saved.');
}

function renderHistory() {
  const h = getState().history;
  $('#main').innerHTML = `
    <div class="section-title"><h3>Workout history</h3><small>${h.length} logged</small></div>
    <section class="card">${h.length ? h.map(x => `
      <div class="history-item">
        <div class="top"><div><h4>${x.day} — ${x.title}</h4><small>${new Date(x.date).toLocaleString()}</small></div><strong>${x.duration}m</strong></div>
        ${x.summary ? `<p class="note">${x.summary}</p>` : ''}
      </div>`).join('') : `<div class="empty">Complete your first workout and it will show up here.</div>`}
    </section>`;
}

function guideFor(name) {
  return EXERCISE_GUIDES[name] || {
    subtitle: "Quick coaching notes",
    steps: ["Move slowly and with control.", "Use a load that lets you keep good form.", "Stop if the movement causes sharp pain."],
    cues: ["Neutral spine.", "Steady breathing.", "Stay honest with your range of motion."],
    mistakes: ["Going too heavy too soon.", "Rushing."],
    why: "If something feels unfamiliar, master the pattern first and the load second."
  };
}
function renderLearn() {
  $('#main').innerHTML = `
    <section class="card hero learn-hero">
      <div class="kicker">EXERCISE LIBRARY</div>
      <h2>Learn the movement before you load it.</h2>
      <p class="sub">Every exercise in HUNT READY 30 lives here. Written coaching stays available offline. Video demos open online when you want to see the movement.</p>
      <div class="learn-tip"><strong>Start here:</strong> Hip Hinge → Goblet Squat → DB Romanian Deadlift. Those three patterns unlock a big part of the program.</div>
    </section>
    <div class="learn-search-wrap"><input id="learnSearch" class="learn-search" placeholder="Search exercises…" oninput="filterLearn(this.value)"></div>
    <div id="learnList">${learnCards('')}</div>`;
}
function learnCards(query='') {
  const q = query.trim().toLowerCase();
  const names = LEARN_ORDER.filter(n => !q || n.toLowerCase().includes(q) || (guideFor(n).why || '').toLowerCase().includes(q));
  return names.length ? names.map((name,i) => {
    const g = guideFor(name);
    const video = DEMO_LINKS[name]?.url ? '<span class="tag">Video/resource</span>' : '<span class="tag">Offline guide</span>';
    return `<section class="card learn-card" onclick='showExerciseGuide(${JSON.stringify(name)}, "learn")'>
      <div class="learn-card-top"><div class="exercise-num">${i+1}</div><div><h3>${name}</h3><p class="sub">${g.subtitle || ''}</p></div></div>
      <div class="tag-row">${video}<span class="tag">Form cues</span><span class="tag">Common mistakes</span></div>
      <button class="ghost learn-open">Open guide →</button>
    </section>`;
  }).join('') : '<div class="empty">No exercises match that search.</div>';
}
function filterLearn(value) { $('#learnList').innerHTML = learnCards(value); }

function showExerciseGuide(name, source) {
  const g = guideFor(name);
  const demo = DEMO_LINKS[name];
  const fromWorkout = source === 'workout' || (!!active && source !== 'learn');
  const backAction = fromWorkout ? 'returnToWorkout()' : 'closeModal()';
  const backLabel = fromWorkout ? '‹ Workout' : '×';
  openModal(`
    <div class="close-row"><div><div class="kicker">EXERCISE GUIDE</div><h2>${name}</h2></div><button class="icon-btn guide-back" onclick="${backAction}">${backLabel}</button></div>
    <p class="sub">${g.subtitle || ''}</p>
    ${demo?.url ? `<a class="demo-button" href="${demo.url}" target="_blank" rel="noopener">▶ ${demo.label}</a>` : ''}
    <div class="form-visual">${motionVisual(name)}</div>
    ${g.steps ? `<div class="card"><div class="kicker">HOW TO DO IT</div>${renderBulletList(g.steps)}</div>` : ''}
    ${g.cues ? `<div class="card"><div class="kicker">COACHING CUES</div>${renderBulletList(g.cues)}</div>` : ''}
    ${g.mistakes ? `<div class="card"><div class="kicker">COMMON MISTAKES</div>${renderBulletList(g.mistakes)}</div>` : ''}
    ${g.why ? `<div class="card"><div class="kicker">WHY IT'S HERE</div><p class="sub">${g.why}</p></div>` : ''}`);
}
function returnToWorkout() { if (active) rerenderWorkout(); else closeModal(); }
function motionVisual(name) {
  const visualNames = ['Hip Hinge','DB Romanian Deadlift','Goblet Squat','Reverse Lunge','Step-Up','Farmer Carry','Suitcase Carry','Plank','Push-Ups'];
  if (!visualNames.includes(name)) return `<div class="visual-placeholder"><span>FORM</span><strong>${name}</strong><small>Use the steps + cues below, then open the video/resource when available.</small></div>`;
  const labelA = ['Hip Hinge','DB Romanian Deadlift'].includes(name) ? 'START' : 'POSITION 1';
  const labelB = ['Hip Hinge','DB Romanian Deadlift'].includes(name) ? 'HINGE' : 'POSITION 2';
  return `<div class="two-position"><div class="pose"><span>${labelA}</span><div class="stick-person upright"><i class="head"></i><i class="torso"></i><i class="arm a1"></i><i class="arm a2"></i><i class="leg l1"></i><i class="leg l2"></i></div></div><div class="arrow">→</div><div class="pose"><span>${labelB}</span><div class="stick-person ${['Hip Hinge','DB Romanian Deadlift'].includes(name)?'hinge':'upright'}"><i class="head"></i><i class="torso"></i><i class="arm a1"></i><i class="arm a2"></i><i class="leg l1"></i><i class="leg l2"></i></div></div></div>`;
}

function startWorkout(day) {
  active = {
    day,
    workout: PROGRAM[day],
    index: 0,
    set: 1,
    logs: [],
    started: Date.now(),
    remaining: PROGRAM[day].duration * 60,
    historyStack: [],
    mode: 'workout'
  };
  openModal(workoutModal());
  clearInterval(interval);
  interval = setInterval(() => {
    active.remaining = Math.max(0, active.remaining - 1);
    const el = $('#workoutTimer');
    if (el) el.textContent = fmt(active.remaining);
  }, 1000);
}
function fmt(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
function currentEx() { return active.workout.exercises[active.index]; }
function lastWeight(name) {
  for (const h of getState().history) {
    if (h.logs) {
      const found = [...h.logs].reverse().find(l => l.name === name && l.weight);
      if (found) return found.weight;
    }
  }
  return '';
}
function snapshot() {
  return {
    index: active.index,
    set: active.set,
    logs: JSON.parse(JSON.stringify(active.logs)),
    remaining: active.remaining,
    mode: active.mode
  };
}
function restoreSnapshot(snap) {
  active.index = snap.index;
  active.set = snap.set;
  active.logs = JSON.parse(JSON.stringify(snap.logs));
  active.remaining = snap.remaining;
  active.mode = snap.mode;
}

function workoutModal() {
  const e = currentEx();
  const sets = e.sets || 1;
  const weightDefault = lastWeight(e.name);
  const backLabel = active.historyStack.length ? 'BACK' : 'EXIT';
  return `
    <div class="workout-header">
      <div><div class="kicker">${active.day}</div><h2 style="margin:4px 0">${active.workout.title}</h2></div>
      <div class="timer" id="workoutTimer">${fmt(active.remaining)}</div>
    </div>
    <div class="current-ex">
      <div class="kicker">EXERCISE ${active.index + 1} OF ${active.workout.exercises.length}</div>
      <h3>${e.name}</h3>
      <p class="sub">${e.prescription}</p>
      ${e.notes ? `<p class="note">${e.notes}</p>` : ''}
      <button class="secondary" style="width:100%;margin-top:10px" onclick='showExerciseGuide(${JSON.stringify(e.name)}, "workout")'>HOW TO DO THIS EXERCISE</button>
      ${e.type === 'ruck' ? `
        <div class="set-grid">
          <div class="field"><label>Load (lb)</label><input id="weightInput" inputmode="decimal" value="${getState().preferredRuck}"></div>
          <div class="field"><label>Minutes</label><input id="repsInput" inputmode="decimal" value="30"></div>
        </div>` :
        (e.type === 'time' || e.type === 'circuit' || e.type === 'rest') ? `
        <div class="field"><label>Notes / rounds / result</label><input id="noteInput" placeholder="Optional"></div>` : `
        <div class="set-grid">
          <div class="field"><label>Weight (lb)</label><input id="weightInput" inputmode="decimal" value="${weightDefault || ''}" placeholder="0"></div>
          <div class="field"><label>Reps</label><input id="repsInput" inputmode="numeric" placeholder="${e.min || ''}"></div>
        </div>
        <p class="note">Set ${active.set} of ${sets}</p>`}
      <div class="action-row">
        <button class="secondary" onclick="previousStep()">${backLabel}</button>
        <button class="primary" style="margin-top:0" onclick="completeSet()">COMPLETE</button>
      </div>
    </div>
    <button class="ghost" style="margin-top:16px" onclick="finishWorkout(true)">Finish early</button>`;
}

function completeSet() {
  const prev = snapshot();
  const e = currentEx();
  const log = { name: e.name, set: active.set };
  if ($('#weightInput')) log.weight = Number($('#weightInput').value || 0);
  if ($('#repsInput')) log.reps = Number($('#repsInput').value || 0);
  if ($('#noteInput')) log.note = $('#noteInput').value;
  active.logs.push(log);
  active.historyStack.push(prev);

  if (e.sets && active.set < e.sets) {
    active.set++;
    if (e.rest) startRest(e.rest);
    else rerenderWorkout();
  } else {
    active.index++;
    active.set = 1;
    if (active.index >= active.workout.exercises.length) {
      finishWorkout(false);
      return;
    }
    if (e.rest) startRest(e.rest);
    else rerenderWorkout();
  }
}

function startRest(seconds) {
  active.mode = 'rest';
  let left = seconds;
  $('#modal').innerHTML = `
    <div class="close-row"><div><div class="kicker">REST</div><h2>Recover, then go.</h2></div><button class="icon-btn" onclick="skipRest()">→</button></div>
    <div class="rest-box"><div class="timer" id="restTimer">${fmt(left)}</div><p class="sub">Next: ${active.index < active.workout.exercises.length ? currentEx().name : 'Finish'}</p></div>
    <div class="action-row"><button class="secondary" onclick="previousStep()">BACK</button><button class="primary" onclick="skipRest()">SKIP REST</button></div>`;
  clearInterval(restInterval);
  restInterval = setInterval(() => {
    left--;
    const el = $('#restTimer');
    if (el) el.textContent = fmt(Math.max(0,left));
    if (left <= 0) skipRest();
  }, 1000);
}
function skipRest() {
  clearInterval(restInterval);
  active.mode = 'workout';
  rerenderWorkout();
}
function rerenderWorkout() { $('#modal').innerHTML = workoutModal(); }
function previousStep() {
  clearInterval(restInterval);
  if (active.historyStack.length) {
    const prev = active.historyStack.pop();
    restoreSnapshot(prev);
    rerenderWorkout();
  } else {
    if (confirm('Exit this workout? Your progress from this session will not be saved yet.')) {
      clearInterval(interval);
      closeModal();
      active = null;
    }
  }
}

function finishWorkout(early) {
  clearInterval(interval);
  clearInterval(restInterval);
  const duration = Math.max(1, Math.round((Date.now() - active.started) / 60000));
  const summary = progressionSummary(active.logs);
  saveHistory({ date: new Date().toISOString(), day: active.day, title: active.workout.title, duration, logs: active.logs, summary });
  closeModal();
  active = null;
  tab('today');
  setTimeout(() => alert(early ? `Workout logged at ${duration} min.` : `Workout complete. ${summary || 'Nice work.'}`), 100);
}
function progressionSummary(logs) {
  const grouped = {};
  logs.forEach(l => { if (l.weight && l.reps) (grouped[l.name] ??= []).push(l); });
  const recs = [];
  Object.entries(grouped).forEach(([name, arr]) => {
    const ex = Object.values(PROGRAM).flatMap(x => x.exercises).find(e => e.name === name);
    if (ex?.max && arr.length >= ex.sets && arr.every(x => x.reps >= ex.max)) recs.push(`${name}: consider +2.5–5 lb next time`);
  });
  return recs.join(' • ');
}

function quickLogRecovery() {
  saveHistory({ date: new Date().toISOString(), day: 'Sunday', title: 'Recovery', duration: 0, summary: 'Recovery day logged.' });
  renderToday();
}

function openModal(html) { $('#modal').innerHTML = html; $('#modalBackdrop').classList.remove('hidden'); }
function closeModal() { clearInterval(restInterval); $('#modalBackdrop').classList.add('hidden'); }
$('#modalBackdrop').addEventListener('click', e => { if (e.target.id === 'modalBackdrop') closeModal(); });

$('#settingsBtn').onclick = () => {
  const s = getState();
  openModal(`
    <div class="close-row"><div><div class="kicker">SETTINGS</div><h2>HUNT READY 30</h2><p class="note">Version 3 • Learn Library</p></div><button class="icon-btn" onclick="closeModal()">×</button></div>
    <div class="settings-grid">
      <div class="setting"><label>Program start date</label><input id="startDate" type="date" value="${s.startDate}"></div>
      <div class="setting"><label>Starting ruck load (lb)</label><input id="ruckLoad" inputmode="numeric" value="${s.preferredRuck}"></div>
    </div>
    <button class="primary" onclick="saveSettings()">SAVE SETTINGS</button>
    <p class="note">Your workout history stays on this device using local storage.</p>
    <button class="secondary" style="width:100%;margin-top:10px" onclick="exportData()">EXPORT MY DATA</button>`);
};
function saveSettings() {
  localStorage.hr30_startDate = $('#startDate').value || new Date().toISOString().slice(0,10);
  localStorage.hr30_preferredRuck = Number($('#ruckLoad').value || 10);
  closeModal();
  renderToday();
}
function exportData() {
  const s = getState();
  const data = { exportedAt: new Date().toISOString(), ...s };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'hunt-ready-30-data.json'; a.click();
  URL.revokeObjectURL(url);
}

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
renderToday();
