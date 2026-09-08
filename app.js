const APP_VERSION = "4.7.0-full";
const PROGRAM = {
  Monday:{title:"Lower Body Strength",focus:"Legs • hills • pack carrying",duration:30,exercises:[
    {name:"Warm-up",prescription:"5 min",type:"time",minutes:5,rest:0,notes:"Bodyweight squat, hip hinge, reverse lunge, calf raise, marching."},
    {name:"Goblet Squat",prescription:"3 × 8–12",type:"strength",sets:3,min:8,max:12,rest:60},
    {name:"DB Romanian Deadlift",prescription:"3 × 8–12",type:"strength",sets:3,min:8,max:12,rest:60},
    {name:"Reverse Lunge",prescription:"2 × 8/leg",type:"strength",sets:2,min:8,max:8,rest:45},
    {name:"Standing Calf Raise",prescription:"2 × 15–20",type:"strength",sets:2,min:15,max:20,rest:45},
    {name:"Farmer Carry",prescription:"7 × 40 sec",type:"carry",sets:7,seconds:40,rest:20}
  ]},
  Tuesday:{title:"Archery Upper Body",focus:"Back • shoulders • core",duration:30,exercises:[
    {name:"Shoulder Prep",prescription:"5 min",type:"time",minutes:5,rest:0,notes:"Arm circles, scapular push-ups, shoulder blade squeezes, light rows."},
    {name:"1-Arm DB Row",prescription:"3 × 10/side",type:"strength",sets:3,min:10,max:10,rest:60},
    {name:"DB Floor Press",prescription:"3 × 8–12",type:"strength",sets:3,min:8,max:12,rest:60},
    {name:"Bent-Over Rear-Delt Raise",prescription:"3 × 12–15",type:"strength",sets:3,min:12,max:15,rest:45},
    {name:"Hammer Curl",prescription:"2 × 10–12",type:"strength",sets:2,min:10,max:12,rest:45},
    {name:"Suitcase Carry",prescription:"4 rounds × 40 sec/side",type:"carry",sets:8,seconds:40,rest:20}
  ]},
  Wednesday:{title:"Ruck Day",focus:"Hunting-specific conditioning",duration:30,exercises:[
    {name:"Weighted Walk / Ruck",prescription:"30 min",type:"ruck",minutes:30,rest:0,notes:"Start with 10–15 lb. Brisk pace. No running. Add load gradually until 25–30 lb feels comfortable."}
  ]},
  Thursday:{title:"Full-Body Strength",focus:"Strength • stability • durability",duration:30,exercises:[
    {name:"Dynamic Warm-up",prescription:"5 min",type:"time",minutes:5,rest:0},
    {name:"Goblet Squat",prescription:"3 rounds × 10",type:"strength",sets:3,min:10,max:10,rest:0},
    {name:"1-Arm DB Row",prescription:"3 rounds × 10/side",type:"strength",sets:3,min:10,max:10,rest:0},
    {name:"DB Floor Press",prescription:"3 rounds × 10",type:"strength",sets:3,min:10,max:10,rest:0},
    {name:"DB Romanian Deadlift",prescription:"3 rounds × 10",type:"strength",sets:3,min:10,max:10,rest:0},
    {name:"Step-Up",prescription:"3 rounds × 8/leg",type:"strength",sets:3,min:8,max:8,rest:75},
    {name:"Plank",prescription:"4 × 45 sec",type:"timed",sets:4,seconds:45,rest:30}
  ]},
  Friday:{title:"Hunter Conditioning",focus:"Work capacity • controlled intensity",duration:30,exercises:[
    {name:"Warm-up",prescription:"5 min",type:"time",minutes:5,rest:0},
    {name:"20-Min Hunter Circuit",prescription:"20 min quality rounds",type:"circuit",minutes:20,rest:0,notes:"8 goblet squats • 8 push-ups • 10 DB RDLs • 8 reverse lunges/leg • 10 one-arm rows/side • 30-sec farmer carry. Do not race."},
    {name:"Easy Walk / Cooldown",prescription:"5 min",type:"time",minutes:5,rest:0}
  ]},
  Saturday:{title:"Easy Outdoor Day",focus:"Ruck base • mobility",duration:30,exercises:[
    {name:"Easy Weighted Walk",prescription:"20–25 min",type:"ruck",minutes:25,rest:0,notes:"Use 10–15 lb initially."},
    {name:"Mobility",prescription:"5–10 min",type:"time",minutes:5,rest:0,notes:"Calves, ankles, hips, hamstrings, thoracic rotation, shoulders/chest."}
  ]},
  Sunday:{title:"Recovery",focus:"Rest • family • easy movement",duration:0,exercises:[
    {name:"No structured training",prescription:"Recover",type:"rest",rest:0,notes:"Easy walking is fine. Recovery counts."}
  ]}
};

const BENCHMARKS = [
  {id:"goblet",label:"Goblet squat",target:52.5,unit:"lb × 12"},
  {id:"rdl",label:"DB Romanian deadlift",target:105,unit:"lb total × 10–12"},
  {id:"row",label:"1-arm DB row",target:45,unit:"lb × 10"},
  {id:"carry",label:"Farmer carry",target:105,unit:"lb total × 60 sec"},
  {id:"pushup",label:"Push-ups",target:20,unit:"clean reps"},
  {id:"plank",label:"Plank",target:90,unit:"seconds"},
  {id:"ruck",label:"Ruck",target:30,unit:"lb for 30 min"}
];

const SCRIPTURES = [
  {ref:"Joshua 1:9",text:"Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed.",focus:"Train with courage. Do the next faithful thing well."},
  {ref:"Psalm 18:32",text:"It is God that girdeth me with strength, and maketh my way perfect.",focus:"Strength is stewardship. Use it well."},
  {ref:"Psalm 18:34",text:"He teacheth my hands to war, so that a bow of steel is broken by mine arms.",focus:"Skill is built through patient practice."},
  {ref:"Isaiah 40:31",text:"But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.",focus:"Do not confuse patience with passivity."},
  {ref:"1 Corinthians 9:24",text:"So run, that ye may obtain.",focus:"Train with purpose, not vanity."},
  {ref:"1 Corinthians 9:27",text:"But I keep under my body, and bring it into subjection.",focus:"Discipline your body without making it your master."},
  {ref:"2 Timothy 1:7",text:"For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",focus:"Power with love. Intensity with a sound mind."},
  {ref:"Philippians 4:13",text:"I can do all things through Christ which strengtheneth me.",focus:"Let strength point beyond yourself."},
  {ref:"Proverbs 27:17",text:"Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",focus:"Let training make you more useful to the men around you."},
  {ref:"Micah 6:8",text:"Do justly, and to love mercy, and to walk humbly with thy God.",focus:"Strength without humility misses the point."},
  {ref:"Colossians 3:23",text:"And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",focus:"Make the quality of the work an act of worship."},
  {ref:"Psalm 144:1",text:"Blessed be the LORD my strength, which teacheth my hands to war, and my fingers to fight.",focus:"Learn the skill. Respect the responsibility that comes with it."}
];

const DEFAULT_CHECKLIST = [
  {category:"Bow",items:["Bow tuned and sighted","Release + backup release","Hunting arrows inspected","Broadheads sharpened / ready","Bow case","Allen keys / bow tools","String wax"]},
  {category:"Optics",items:["10×42 binoculars","Rangefinder","Bino harness"]},
  {category:"Clothing",items:["Base layer","Hunting pants","Hunting shirt","Insulating layer","Rain layer","Boots","Merino / hiking socks","Gloves","Beanie / neck gaiter"]},
  {category:"Field",items:["Hunting backpack","Headlamp + backup batteries","Field-dressing knife","First-aid / bleeding kit","Water / hydration","Food / snacks","Phone + backup battery","Navigation / offline map"]},
  {category:"Legal / Plan",items:["Hunter education complete","License / tags confirmed","Property / hunt rules reviewed","Emergency contact knows plan","Weather and wind checked"]}
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


// Short, specific demonstration videos (YouTube). Played inline on tap; offline the drawn form guide still works.
const DEMO_VIDEOS = {
  "Hip Hinge":               {id:"2W_gXhut5S8", channel:"Hinge Health (physical therapists)", length:"0:58"},
  "Goblet Squat":            {id:"CkFzgR55gho", channel:"Physique Development", length:"1:27"},
  "Bodyweight Squat":        {id:"P-yaD24bUE8", channel:"Runna", length:"0:47"},
  "DB Romanian Deadlift":    {id:"hQgFixeXdZo", channel:"J2FIT Strength & Conditioning", length:"1:19"},
  "Reverse Lunge":           {id:"Ry-wqegeKlE", channel:"Dr. Carl Baird", length:"0:59"},
  "1-Arm DB Row":            {id:"dFzUjzfih7k", channel:"Max Euceda (2-minute tutorial)", length:"2:00"},
  "DB Floor Press":          {id:"Bx4QPVH-J1g", channel:"Colossus Fitness", length:"1:51"},
  "Farmer Carry":            {id:"NH7Xv-7NQNQ", channel:"Buff Dudes Workouts", length:"1:30"},
  "Suitcase Carry":          {id:"y-hn_Ha1-RE", channel:"Dr. Carl Baird", length:"0:57"},
  "Step-Up":                 {id:"WCFCdxzFBa4", channel:"Get Exercise Confident", length:"2:52"},
  "Plank":                   {id:"kL_NJAkCQBg", channel:"Calisthenicmovement", length:"2:19"},
  "Push-Ups":                {id:"IODxDxX7oi4", channel:"Calisthenicmovement", length:"3:38"},
  "Bent-Over Rear-Delt Raise":{id:"ttvfGg9d76c", channel:"ScottHermanFitness", length:"1:42"},
  "Hammer Curl":             {id:"BRVDS6HVR9Q", channel:"Buff Dudes Workouts", length:"1:30"},
  "Standing Calf Raise":     {id:"CtyIVeJH6lI", channel:"Rehab and Revive (physical therapist)", length:"1:48"},
  "Shoulder Prep":           {id:"ztQRlsR44M8", channel:"Squat University", length:"5:45"},
  "Warm-up":                 {id:"LKSC_KujZ4g", channel:"Kaleigh Cohen Strength (follow-along)", length:"5:41"},
  "Dynamic Warm-up":         {id:"LKSC_KujZ4g", channel:"Kaleigh Cohen Strength (follow-along)", length:"5:41"},
  "Mobility":                {id:"dBYjU7iBpck", channel:"Squat University (follow-along)", length:"11:06"},
  "Weighted Walk / Ruck":    {id:"rdQ7k5JhoHA", channel:"GORUCK", length:"1:20"},
  "Easy Weighted Walk":      {id:"rdQ7k5JhoHA", channel:"GORUCK", length:"1:20"}
};

const LEARN_ORDER = [
  "Hip Hinge","Goblet Squat","DB Romanian Deadlift","Reverse Lunge","1-Arm DB Row","DB Floor Press","Farmer Carry","Suitcase Carry","Step-Up","Plank","Push-Ups","Bent-Over Rear-Delt Raise","Hammer Curl","Standing Calf Raise","Weighted Walk / Ruck","Shoulder Prep","Warm-up","Mobility"
];


const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const STORE = {
  get(key, fallback){ try{ const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }catch{ return fallback; } },
  set(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
};
let active = null, workoutTimer = null, restTimer = null, trainView = "week", progressExerciseName = "Goblet Squat", pendingMealPhoto = null;
let archeryView = 'log', archeryDistance = null, pendingTargetPhoto = null, pendingBowPhoto = null, pendingFormFrames = null, lastFormResult = null;

function migrateLegacy(){
  if(!localStorage.hr30_startDate) localStorage.hr30_startDate = new Date().toISOString().slice(0,10);
  if(!localStorage.hr30_workingWeights) STORE.set('hr30_workingWeights',{});
  if(!localStorage.hr30_bodyHistory){
    const legacyWeight = localStorage.hr30_bodyWeight || '';
    const legacyWaist = localStorage.hr30_waist || '';
    STORE.set('hr30_bodyHistory', legacyWeight || legacyWaist ? [{date:new Date().toISOString(),weight:Number(legacyWeight)||0,waist:Number(legacyWaist)||0}] : []);
  }
  if(!localStorage.hr30_readiness) STORE.set('hr30_readiness',{});
  if(!localStorage.hr30_nutritionTargets) STORE.set('hr30_nutritionTargets',{calories:0,protein:0,carbs:0,fat:0,fiber:0});
  if(!localStorage.hr30_meals) STORE.set('hr30_meals',[]);
  if(!localStorage.hr30_archery) STORE.set('hr30_archery',[]);
  if(!localStorage.hr30_checklist){
    const items=[]; DEFAULT_CHECKLIST.forEach(g=>g.items.forEach(label=>items.push({id:uid(),category:g.category,label,done:false})));
    STORE.set('hr30_checklist',items);
  }
  if(!localStorage.hr30_hunts) STORE.set('hr30_hunts',[]);
  if(!localStorage.hr30_formChecks) STORE.set('hr30_formChecks',[]);
  { const bp=STORE.get('hr30_bowProfile',null); if(bp&&!bp.handedness){ bp.handedness=(bp.bow||'').startsWith('Bear Adapt 2 HP')?'left':'right'; STORE.set('hr30_bowProfile',bp); } }
  if(!localStorage.hr30_settings) STORE.set('hr30_settings',{aiEndpoint:'',restSound:true,restVibrate:true});
  { const st=STORE.get('hr30_settings',{}); if(st.restSound===undefined) st.restSound=true; if(st.restVibrate===undefined) st.restVibrate=true; STORE.set('hr30_settings',st); }
  if(!localStorage.hr30_bowProfile) STORE.set('hr30_bowProfile',{
    bow:'Bear Adapt 2 HP RTH+',drawLength:29,drawWeight:70,rest:'QAD UltraRest',sight:'Trophy Ridge SWFT Duo',
    arrows:'Sanlida Dragon X10',spine:'300',arrowLength:'29.75 in shaft / approx. 30.25 in nock-to-tip',broadhead:'Muzzy MX-4 100 gr',handedness:'left',notes:''
  });
}
function getState(){
  return {
    startDate: localStorage.hr30_startDate || new Date().toISOString().slice(0,10),
    history: STORE.get('hr30_history',[]),
    workingWeights: STORE.get('hr30_workingWeights',{}),
    benchmarks: STORE.get('hr30_benchmarks',{}),
    bodyHistory: STORE.get('hr30_bodyHistory',[]),
    readiness: STORE.get('hr30_readiness',{}),
    nutritionTargets: STORE.get('hr30_nutritionTargets',{calories:0,protein:0,carbs:0,fat:0,fiber:0}),
    meals: STORE.get('hr30_meals',[]),
    archery: STORE.get('hr30_archery',[]),
    checklist: STORE.get('hr30_checklist',[]),
    settings: STORE.get('hr30_settings',{aiEndpoint:''}),
    hunts: STORE.get('hr30_hunts',[]),
    formChecks: STORE.get('hr30_formChecks',[]),
    bowProfile: STORE.get('hr30_bowProfile',{}),
    preferredRuck: Number(localStorage.hr30_preferredRuck || 10)
  };
}
function uid(){ return `${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`; }
function esc(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function localDateKey(d=new Date()){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function dayName(d=new Date()){ return d.toLocaleDateString('en-US',{weekday:'long'}); }
function formatDate(d=new Date()){ return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
function weekNumber(){ const start=new Date((localStorage.hr30_startDate||localDateKey())+'T00:00:00'), diff=Math.max(0,new Date()-start); return Math.min(8,Math.floor(diff/604800000)+1); }
function fmt(sec){ const m=Math.floor(sec/60),s=sec%60; return `${m}:${String(s).padStart(2,'0')}`; }
function saveHistory(item){ const h=getState().history; h.unshift(item); STORE.set('hr30_history',h.slice(0,500)); }
function completedThisWeek(){ const now=new Date(), first=new Date(now), day=(now.getDay()+6)%7; first.setDate(now.getDate()-day); first.setHours(0,0,0,0); return getState().history.filter(h=>new Date(h.date)>=first).length; }
function currentStreak(){
  const dates=new Set(getState().history.filter(h=>h.duration>0).map(h=>localDateKey(new Date(h.date))));
  let streak=0,d=new Date();
  if(!dates.has(localDateKey(d))){ d.setDate(d.getDate()-1); }
  while(dates.has(localDateKey(d))){ streak++; d.setDate(d.getDate()-1); }
  return streak;
}
function todaysScripture(){ const d=new Date(); const start=new Date(d.getFullYear(),0,0); const day=Math.floor((d-start)/86400000); return SCRIPTURES[day%SCRIPTURES.length]; }
// ---- Hunt countdown + phase engine ----
// With an opening day set, the plan counts back from it: Base (60+ days out) -> Build (25-59) -> Peak (11-24) -> Taper (0-10).
const PHASES = {
  base:  {label:'Base',  blurb:'Learn the movements, build the ruck base, shoot often. Loads stay at week 1–2 levels.'},
  build: {label:'Build', blurb:'Add reps and small load jumps when form stays clean. Ruck weight climbs toward 20 lb.'},
  peak:  {label:'Peak',  blurb:'Heaviest loads and ruck weight of the plan. Recover on purpose.'},
  taper: {label:'Taper', blurb:'Lighter lifting, daily shooting, sleep, and the hunt-prep checklist. Arrive fresh.'}
};
function getHunts(){ return (STORE.get('hr30_hunts',[])||[]).slice().sort((a,b)=>String(a.date).localeCompare(String(b.date))); }
function daysUntil(dateKey){ const d=new Date(dateKey+'T00:00:00'), t=new Date(); t.setHours(0,0,0,0); return Math.round((d-t)/86400000); }
function nextHunt(){ const today=localDateKey(); return getHunts().find(h=>h.date>=today)||null; }
function huntPlan(){
  const h=nextHunt(); if(!h) return null;
  const days=daysUntil(h.date), startKey=localStorage.hr30_startDate||localDateKey();
  const daysFromStart=Math.max(0,-daysUntil(startKey)), totalDays=Math.max(1,daysFromStart+days);
  let phase, programWeek, phaseWeek, phaseWeeks;
  if(days<=10){ phase='taper'; programWeek=8; phaseWeek=1; phaseWeeks=1; }
  else if(days<=24){ phase='peak'; phaseWeeks=2; phaseWeek=days>17?1:2; programWeek=5+phaseWeek; }
  else if(days<=59){ phase='build'; phaseWeeks=5; phaseWeek=Math.min(5,Math.floor((59-days)/7)+1); programWeek=phaseWeek; }
  else { phase='base'; const baseDays=totalDays-59; phaseWeeks=Math.max(1,Math.ceil(baseDays/7)); phaseWeek=Math.min(phaseWeeks,Math.floor(daysFromStart/7)+1); programWeek=phaseWeek%2?1:2; }
  return {hunt:h, days, phase, label:PHASES[phase].label, blurb:PHASES[phase].blurb, programWeek, phaseWeek, phaseWeeks, pct:Math.min(100,Math.round(daysFromStart/totalDays*100))};
}
function planLabel(){ const p=huntPlan(); return p?`${p.label} • week ${p.phaseWeek} of ${p.phaseWeeks}`:`Week ${weekNumber()}`; }
function effectiveWorkout(day){
  const w=JSON.parse(JSON.stringify(PROGRAM[day])), p=huntPlan();
  if(p&&p.phase==='taper'&&w.duration){
    w.taper=true;
    w.exercises=w.exercises.map(e=>{ const x={...e};
      if(x.type==='strength'&&x.sets>=3) x.sets=x.sets-1;
      if(x.type==='carry'&&x.sets>=4) x.sets=x.sets-2;
      if(x.type==='ruck') x.minutes=Math.min(x.minutes||30,20);
      if(x.type==='circuit') x.minutes=Math.min(x.minutes||20,15);
      if(x.type==='timed'&&x.sets>=3) x.sets=x.sets-1;
      return x; });
    w.focus=w.focus+' • taper: lighter, crisp, done early';
  }
  return w;
}
function phaseTimeline(p){
  const d=p.hunt.date; const rows=[
    ['base', 'until 60 days out'], ['build','59 → 25 days out'], ['peak','24 → 11 days out'], ['taper','last 10 days']
  ];
  return `<section class="card"><div class="kicker">PLAN TO ${esc(p.hunt.name||'OPENING DAY').toUpperCase()}</div>${rows.map(([k,range])=>`<div class="phase-row ${k===p.phase?'current':''}"><div><strong>${PHASES[k].label}</strong><small>${range}</small></div><p class="note">${PHASES[k].blurb}</p></div>`).join('')}</section>`;
}
function countdownCard(){
  const p=huntPlan();
  if(!p) return `<section class="card countdown"><div class="kicker">NEXT HUNT</div><h3 style="margin:6px 0">Set your opening day</h3><p class="sub">The plan will count back from it: Base → Build → Peak → Taper, so the last week leaves you fresh.</p><button class="primary" onclick="openHunts()">ADD A HUNT DATE</button></section>`;
  const items=getState().checklist, undone=items.filter(i=>!i.done).length;
  return `<section class="card countdown phase-${p.phase}"><div class="cd-top"><div><div class="kicker">NEXT HUNT</div><h2>${p.days===0?'Today':p.days===1?'Tomorrow':`${p.days} days`}</h2><p class="sub">${esc(p.hunt.name||'Opening day')} • ${formatDate(new Date(p.hunt.date+'T00:00:00'))}</p></div><div class="phase-badge">${p.label}</div></div><p class="note">${p.blurb}</p><div class="progress-bar"><span style="width:${p.pct}%"></span></div><div class="cd-meta"><small>${p.label} week ${p.phaseWeek} of ${p.phaseWeeks} • program week ${p.programWeek}</small><button class="ghost" onclick="openHunts()">Manage hunts →</button></div>${p.phase==='taper'&&undone?`<button class="secondary" style="width:100%;margin-top:10px" onclick="openHuntPrep()">HUNT PREP: ${undone} ITEM${undone===1?'':'S'} LEFT →</button>`:''}</section>`;
}
function openHunts(){
  const hunts=getHunts(), today=localDateKey();
  openModal(`<div class="close-row"><div><div class="kicker">HUNTS</div><h2>Opening days</h2><p class="note">The next upcoming hunt drives the plan.</p></div><button class="icon-btn" onclick="closeModal()">×</button></div>
    <div class="field"><label>Hunt name</label><input id="huntName" placeholder="e.g. Rifle opener, Late-season bow"></div>
    <div class="set-grid"><div class="field"><label>Opening day</label><input id="huntDate" type="date" min="${today}"></div><div class="field"><label>Notes (optional)</label><input id="huntNotes" placeholder="Unit, property, who's going"></div></div>
    <button class="primary" onclick="saveHunt()">ADD HUNT</button>
    <div class="divider"></div><div class="kicker">YOUR HUNTS</div><div class="field-list">${hunts.length?hunts.map(h=>{const past=h.date<today, d=daysUntil(h.date);return `<div class="archery-item ${past?'past':''}"><div class="top"><strong>${esc(h.name||'Hunt')}</strong><small>${formatDate(new Date(h.date+'T00:00:00'))}</small></div><p class="note">${past?'Done':d===0?'Today':`${d} days out`}${h.notes?` • ${esc(h.notes)}`:''}</p><button class="ghost" onclick="deleteHunt('${h.id}')">Remove</button></div>`;}).join(''):'<div class="empty">No hunts yet.</div>'}</div>`);
}
function saveHunt(){ const name=$('#huntName').value.trim(), date=$('#huntDate').value; if(!date){alert('Pick an opening day.');return;} const hunts=getHunts(); hunts.push({id:uid(),name:name||'Hunt',date,notes:$('#huntNotes').value.trim(),createdAt:new Date().toISOString()}); STORE.set('hr30_hunts',hunts); openHunts(); }
function deleteHunt(id){ if(!confirm('Remove this hunt?')) return; STORE.set('hr30_hunts',getHunts().filter(h=>h.id!==id)); openHunts(); }
function scenicHero(){ return `<svg class="hero-scene" viewBox="0 0 900 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#294a39"/><stop offset=".55" stop-color="#182d22"/><stop offset="1" stop-color="#0b1710"/></linearGradient><linearGradient id="water" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#315d61"/><stop offset="1" stop-color="#122c31"/></linearGradient></defs><rect width="900" height="420" fill="url(#sky)"/><circle cx="700" cy="95" r="42" fill="#c9a75b" opacity=".65"/><path d="M0 230 L150 105 L270 210 L390 70 L560 230 L690 125 L900 245 L900 420 L0 420Z" fill="#17301f"/><path d="M0 258 L150 156 L270 236 L390 117 L560 263 L690 175 L900 270 L900 420 L0 420Z" fill="#0d2015"/><path d="M0 287 C190 260 310 315 450 284 C620 245 740 268 900 292 L900 420 L0 420Z" fill="url(#water)" opacity=".9"/><path d="M0 306 C180 288 330 328 450 304 C610 274 750 300 900 312" fill="none" stroke="#82a7a6" stroke-opacity=".25" stroke-width="3"/><g opacity=".84" transform="translate(545 146)"><rect x="18" y="0" width="7" height="54" rx="2" fill="#d8c384"/><rect x="0" y="17" width="43" height="7" rx="2" fill="#d8c384"/></g><g transform="translate(92 178)" fill="none" stroke="#d7c27e" stroke-width="4" opacity=".45"><path d="M13 63 C-3 36 1 5 28 0 C48 22 46 50 26 67"/><path d="M26 0 C36 20 34 46 26 67"/><path d="M23 18 L72 46"/><path d="M64 39 L75 47 L64 51"/></g></svg><div class="hero-overlay"></div>`; }

let currentTab = 'today';
function tab(name, push=true){
  if(push && name!==currentTab) navPush({kind:'tab', from:currentTab});
  currentTab = name;
  $$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  if(name==='today') renderToday();
  if(name==='train') renderTrain();
  if(name==='learn') renderLearn();
  if(name==='progress') renderProgress();
  if(name==='fuel') renderFuel();
}
$$('.nav-btn').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.tab)));
document.addEventListener('click',e=>{ const jump=e.target.closest('[data-tab-jump]'); if(jump) tab(jump.dataset.tabJump); });

function exerciseActionButtons(name){ return `<div class="mini-actions"><button class="ghost" onclick='showExerciseGuide(${JSON.stringify(name)},"list")'>How to do it →</button></div>`; }
function exerciseList(workout){ return workout.exercises.map((e,i)=>`<div class="exercise"><div class="exercise-num">${i+1}</div><div><h4>${esc(e.name)}</h4><p>${esc(e.prescription)}</p><div class="tag-row">${e.rest?`<span class="tag">${e.rest}s rest</span>`:''}${e.notes?`<span class="tag">${esc(e.notes)}</span>`:''}</div>${exerciseActionButtons(e.name)}</div></div>`).join(''); }

function renderToday(){
  const d=dayName(),w=effectiveWorkout(d),s=getState(),verse=todaysScripture(),ready=s.readiness[localDateKey()];
  const latestBody=s.bodyHistory[0]||{};
  $('#main').innerHTML=`
    <section class="card hero">${scenicHero()}<div class="hero-content"><div class="kicker">FIELD • FAITH • FITNESS</div><h2>Become harder to fatigue and more capable in the field.</h2><div class="metrics"><div class="metric"><strong>${completedThisWeek()}</strong><span>sessions this week</span></div><div class="metric"><strong>${currentStreak()}</strong><span>day training streak</span></div><div class="metric"><strong>${latestBody.weight||'—'}</strong><span>latest body weight</span></div></div></div></section>
    <section class="card scripture-card"><div class="scripture-ref">${verse.ref}</div><p class="scripture-text">“${verse.text}”</p><div class="scripture-focus">TRAIN UNDER THIS: ${verse.focus}</div></section>
    ${countdownCard()}
    <section class="card"><div class="section-title" style="margin:0 0 12px"><h3>Readiness check</h3>${ready?`<small>${ready.score}% today</small>`:'<small>30 seconds</small>'}</div>${ready?readinessSummary(ready):readinessForm()}</section>
    <section class="card"><div class="kicker">${planLabel()} • ${d}${w.taper?' • TAPER':''}</div><h2 style="margin:6px 0">${w.title}</h2><p class="sub">${w.focus}</p>${w.duration?`<button class="primary" onclick="startWorkout('${d}')">START WORKOUT • ${w.duration} MIN</button>`:`<button class="primary" onclick="quickLogRecovery()">LOG RECOVERY DAY</button>`}<div style="margin-top:10px">${exerciseList(w)}</div></section>
    <div class="section-title"><h3>Field tools</h3><small>build the whole hunter</small></div>
    <div class="quick-grid"><button class="quick-card" onclick="openArcheryLog()"><span class="quick-icon">⌁</span><strong>Archery Lab</strong><small>Log, target photos, trends, form check.</small></button><button class="quick-card" onclick="openBowProfile()"><span class="quick-icon">➶</span><strong>Bow Profile</strong><small>Keep your setup in one place.</small></button><button class="quick-card" onclick="openHuntPrep()"><span class="quick-icon">✓</span><strong>Hunt Prep</strong><small>Gear, legal, field, clothing.</small></button><button class="quick-card" onclick="openHunts()"><span class="quick-icon">⌛</span><strong>Hunt Dates</strong><small>Opening days drive the plan.</small></button><button class="quick-card" onclick="tab('fuel')"><span class="quick-icon">＋</span><strong>Fuel</strong><small>Meals, macros, photo log.</small></button></div>`;
}
function readinessForm(){ return `<div class="readiness-grid">${rangeControl('sleep','Sleep',3)}${rangeControl('energy','Energy',3)}${rangeControl('soreness','Soreness',2)}${rangeControl('stress','Stress',2)}</div><button class="primary" onclick="saveReadiness()">SAVE READINESS</button>`; }
function rangeControl(id,label,val){ return `<div class="range-row"><label><span>${label}</span><strong id="${id}Val">${val}/5</strong></label><input id="${id}" type="range" min="1" max="5" value="${val}" oninput="$('#${id}Val').textContent=this.value+'/5'" /></div>`; }
function saveReadiness(){ const sleep=+$(' #sleep'.trim()).value,energy=+$('#energy').value,soreness=+$('#soreness').value,stress=+$('#stress').value; const score=Math.round(((sleep+energy+(6-soreness)+(6-stress))/20)*100); const r=getState().readiness; r[localDateKey()]={sleep,energy,soreness,stress,score,at:new Date().toISOString()}; STORE.set('hr30_readiness',r); renderToday(); }
function readinessSummary(r){ return `<div class="score-wrap"><div class="score-ring" style="--score:${r.score}"><strong>${r.score}</strong></div><div><strong>${r.score>=75?'Ready to work':r.score>=55?'Train, but stay honest':'Keep today conservative'}</strong><p class="note">Sleep ${r.sleep}/5 • Energy ${r.energy}/5 • Soreness ${r.soreness}/5 • Stress ${r.stress}/5</p><button class="ghost" onclick="editReadiness()">Edit check-in →</button></div></div>`; }
function editReadiness(){ const r=getState().readiness; delete r[localDateKey()]; STORE.set('hr30_readiness',r); renderToday(); }

function renderTrain(){ $('#main').innerHTML=`<div class="section-title"><h3>Training</h3><small>${planLabel()}</small></div><div class="segmented"><button class="${trainView==='week'?'active':''}" onclick="trainView='week';renderTrain()">Week</button><button class="${trainView==='history'?'active':''}" onclick="trainView='history';renderTrain()">History</button></div>${trainView==='week'?renderWeekMarkup():renderHistoryMarkup()}`; }
function renderWeekMarkup(){ const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],today=dayName(); return `<div class="day-grid">${days.map(d=>`<div class="day-card ${d===today?'today':''}"><div class="kicker">${d}</div><h4>${PROGRAM[d].title}</h4><p>${PROGRAM[d].focus}</p><button class="ghost" onclick="openDay('${d}')">View →</button></div>`).join('')}</div>${huntPlan()?phaseTimeline(huntPlan()):`<section class="card" style="margin-top:14px"><div class="kicker">PROGRESSION</div><h3>Weeks 1–2</h3><p class="sub">Learn the movements. Finish with 2–3 clean reps in reserve.</p><h3>Weeks 3–4</h3><p class="sub">Add reps or 2.5–5 lb when form stays clean.</p><h3>Weeks 5–8</h3><p class="sub">Push strength and bring ruck load gradually toward 20–30 lb.</p></section>`}`; }
function openDay(d){ const w=effectiveWorkout(d); openModal(`<div class="close-row"><div><div class="kicker">${d}${w.taper?' • TAPER':''}</div><h2>${w.title}</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div><p class="sub">${w.focus}</p><div class="card flat">${exerciseList(w)}</div>${w.duration?`<button class="primary" onclick="closeModal();startWorkout('${d}')">START THIS WORKOUT</button>`:''}`); }
function renderHistoryMarkup(){ const h=getState().history; return `<section class="card">${h.length?h.map(x=>`<div class="history-item"><div class="top"><div><h4>${x.day} — ${x.title}</h4><small>${new Date(x.date).toLocaleString()}</small></div><strong>${x.duration}m</strong></div><p class="note">${x.logs?.length||0} logged sets / blocks</p><button class="ghost" onclick="viewHistory('${x.id||''}',${JSON.stringify(x.date)})">View details →</button></div>`).join(''):`<div class="empty">Complete your first workout and it will show up here.</div>`}</section>`; }
function viewHistory(id,date){ const h=getState().history; const x=h.find(v=>(id&&v.id===id)||v.date===date); if(!x) return; openModal(`<div class="close-row"><div><div class="kicker">WORKOUT HISTORY</div><h2>${x.day} — ${x.title}</h2><p class="note">${new Date(x.date).toLocaleString()} • ${x.duration} min</p></div><button class="icon-btn" onclick="closeModal()">×</button></div>${historyLogMarkup(x.logs||[])}${x.summary?`<div class="notice">${esc(x.summary)}</div>`:''}`); }
function historyLogMarkup(logs){ if(!logs.length) return '<div class="empty">No detailed sets were logged.</div>'; const groups={}; logs.forEach(l=>(groups[l.name]??=[]).push(l)); return Object.entries(groups).map(([name,arr])=>`<section class="card flat"><div class="kicker">${esc(name)}</div>${arr.map(l=>`<div class="weight-row"><span>Set ${l.set||'—'}</span><strong>${logDescription(l)}</strong></div>`).join('')}</section>`).join(''); }
function logDescription(l){ if(l.type==='ruck') return `${l.weight||0} lb • ${l.minutes||0} min${l.distance?` • ${l.distance} mi`:''}`; if(l.type==='carry') return `${l.weight||0} lb • ${l.seconds||0} sec`; if(l.type==='timed') return `${l.seconds||0} sec`; if(l.type==='circuit') return `${l.rounds||0} rounds`; if(l.weight||l.reps) return `${l.weight||0} lb × ${l.reps||0}`; return esc(l.note||'Completed'); }

function renderLearn(){ $('#main').innerHTML=`<section class="card"><div class="kicker">EXERCISE LIBRARY</div><h2>Learn the movement before you load it.</h2><p class="sub">Each guide has a form drawing and written cues that work offline, plus a short demo video you can play right here when you have a connection.</p><div class="notice"><strong>Start here:</strong> Hip Hinge → Goblet Squat → DB Romanian Deadlift.</div></section><div class="learn-search-wrap"><input id="learnSearch" class="learn-search" placeholder="Search exercises…" oninput="filterLearn(this.value)"></div><div id="learnList">${learnCards('')}</div>`; }
function learnCards(query=''){ const q=query.trim().toLowerCase(); const names=LEARN_ORDER.filter(n=>!q||n.toLowerCase().includes(q)||(guideFor(n).why||'').toLowerCase().includes(q)); return names.length?names.map((name,i)=>{const g=guideFor(name),video=DEMO_VIDEOS[name]?'<span class="tag">▶ Video demo</span>':'<span class="tag">Written guide</span>',drawing=FORM_POSES[name]?'<span class="tag">Form drawing</span>':''; return `<section class="card learn-card" onclick='showExerciseGuide(${JSON.stringify(name)},"learn")'><div class="learn-card-top"><div class="exercise-num">${i+1}</div><div><h3>${esc(name)}</h3><p class="sub">${esc(g.subtitle||'')}</p></div></div><div class="tag-row">${video}${drawing}<span class="tag">Form cues</span><span class="tag">Common mistakes</span></div><button class="ghost learn-open">Open guide →</button></section>`;}).join(''):'<div class="empty">No exercises match that search.</div>'; }
function filterLearn(v){ $('#learnList').innerHTML=learnCards(v); }
function guideFor(name){ return EXERCISE_GUIDES[name]||{subtitle:"Quick coaching notes",steps:["Move slowly and with control.","Use a load that keeps form clean."],cues:["Neutral spine.","Steady breathing."],mistakes:["Going too heavy too soon."],why:"Master the pattern first and the load second."}; }
function renderBulletList(items){ return `<ul class="guide-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`; }
function showExerciseGuide(name,source){ const g=guideFor(name),demo=DEMO_VIDEOS[name],fromWorkout=source==='workout'||(!!active&&source!=='learn'); if(fromWorkout&&modalIsOpen()) navPush({kind:'guide'}); openModal(`<div class="close-row"><div><div class="kicker">EXERCISE GUIDE</div><h2>${esc(name)}</h2></div><button class="icon-btn" onclick="${fromWorkout?'returnToWorkout()':'closeModal()'}">${fromWorkout?'‹':'×'}</button></div><p class="sub">${esc(g.subtitle||'')}</p><div class="form-visual">${motionVisual(name)}</div><div id="demo-slot-${demoSlug(name)}">${demo?videoCard(name,demo):''}</div>${g.steps?`<div class="card flat"><div class="kicker">HOW TO DO IT</div>${renderBulletList(g.steps)}</div>`:''}${g.cues?`<div class="card flat"><div class="kicker">COACHING CUES</div>${renderBulletList(g.cues)}</div>`:''}${g.mistakes?`<div class="card flat"><div class="kicker">COMMON MISTAKES</div>${renderBulletList(g.mistakes)}</div>`:''}${g.why?`<div class="card flat"><div class="kicker">WHY IT'S HERE</div><p class="sub">${esc(g.why)}</p></div>`:''}`); upgradeDemoToLocalClip(name); }
// ---- Self-hosted demo clips ----
// Drop a file named <slug>.mp4 (optional <slug>.jpg poster) into media/demos/ and the app uses it automatically,
// in place of the YouTube demo. The slug is the exercise name in lowercase with dashes, e.g. "1-Arm DB Row" -> 1-arm-db-row.
const LOCAL_DEMO_DIR='media/demos/';
function demoSlug(name){ return String(name).toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
function localClipUrl(name,ext='mp4'){ return `${LOCAL_DEMO_DIR}${demoSlug(name)}.${ext}`; }
async function findLocalClip(name){
  const slug=demoSlug(name), cache=STORE.get('hr30_localClips',{}), known=cache[slug], url=localClipUrl(name);
  if(known?.ok) return {url, poster:localClipUrl(name,'jpg')};
  if(known && Date.now()-(known.at||0) < 6*3600*1000) return null;           // re-check misses every 6 hours
  try{
    const r=await fetch(url,{method:'HEAD',cache:'no-store'});
    const ok=r.ok && /video|octet-stream/i.test(r.headers.get('content-type')||'');
    cache[slug]={ok,at:Date.now()}; STORE.set('hr30_localClips',cache);
    return ok?{url, poster:localClipUrl(name,'jpg')}:null;
  }catch{ return null; }                                                       // offline: fall back to whatever is cached
}
function localClipCard(name,clip,yt){ return `<div class="video-card local-clip"><video controls playsinline loop preload="metadata" poster="${clip.poster}" src="${clip.url}"></video><div class="video-meta"><strong>Your demo clip</strong><small>Filmed for HUNT READY 30${yt?' • coach version below':''}</small>${yt?`<a class="ghost" href="https://www.youtube.com/watch?v=${yt.id}" target="_blank" rel="noopener">Watch the coach's version on YouTube →</a>`:''}</div></div>`; }
async function upgradeDemoToLocalClip(name){ const clip=await findLocalClip(name); if(!clip) return; const slot=$('#demo-slot-'+demoSlug(name)); if(slot) slot.innerHTML=localClipCard(name,clip,DEMO_VIDEOS[name]); }
function videoCard(name,v){ return `<div class="video-card" id="video-${v.id}"><button class="video-thumb" onclick='playDemoVideo(${JSON.stringify(v.id)})' aria-label="Play ${esc(name)} demo video"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.parentElement.classList.add('offline')"><span class="play">▶</span><span class="offline-note">Video needs a connection. The drawing and steps work offline.</span></button><div class="video-meta"><strong>Watch the demo</strong><small>${esc(v.channel)} • ${esc(v.length)}</small><a class="ghost" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Open in YouTube →</a></div></div>`; }
function playDemoVideo(id){ const card=$('#video-'+id); if(!card) return; card.innerHTML=`<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1" title="Exercise demo video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`; }
function returnToWorkout(){ if(active){ navConsume('guide'); rerenderWorkout(); } else closeModal(); }
// ---- Offline form drawings ----
// Side view, figure faces right. viewBox 0 0 160 150, floor at y=138. Each entry has two frames (A -> B) that cross-fade.
const FORM_POSES = {
  "Hip Hinge": { labels:["STAND TALL","HIPS BACK"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],footF:[93,138],elbow:[84,56],hand:[86,78]},
                 B:{head:[122,52],neck:[113,58],hip:[68,90],kneeF:[76,114],ankleF:[80,136],footF:[93,138],elbow:[113,80],hand:[113,102]}, note:"Shins stay near vertical. The bend comes from the hips, not the waist." },
  "DB Romanian Deadlift": { labels:["START","HINGE"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],footF:[93,138],elbow:[84,56],hand:[86,80],db:[[86,84]]},
                 B:{head:[122,52],neck:[113,58],hip:[68,90],kneeF:[76,114],ankleF:[80,136],footF:[93,138],elbow:[113,80],hand:[113,104],db:[[113,108]]}, note:"Dumbbells slide down the thighs and stay close to the legs." },
  "Goblet Squat": { labels:["TOP","BOTTOM"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],footF:[93,138],elbow:[90,54],hand:[92,40],db:[[94,36]]},
                 B:{head:[92,48],neck:[88,58],hip:[66,100],kneeF:[96,108],ankleF:[86,136],footF:[99,138],elbow:[98,78],hand:[100,64],db:[[102,60]]}, note:"Whole foot stays flat. Chest stays proud as you sit between the hips." },
  "Bodyweight Squat": { labels:["TOP","BOTTOM"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],footF:[93,138],elbow:[96,40],hand:[112,40]},
                 B:{head:[92,48],neck:[88,58],hip:[66,100],kneeF:[96,108],ankleF:[86,136],footF:[99,138],elbow:[104,62],hand:[120,60]}, note:"Arms reach forward for balance. Knees track over the toes." },
  "Reverse Lunge": { labels:["STAND","STEP BACK"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],footF:[93,138],elbow:[84,56],hand:[86,80],db:[[86,84]]},
                 B:{head:[84,30],neck:[84,42],hip:[80,86],kneeF:[100,104],ankleF:[100,136],footF:[113,138],kneeB:[60,122],ankleB:[42,128],footB:[34,138],elbow:[84,68],hand:[84,92],db:[[84,96]]}, note:"Front shin stays vertical. Most of the work is in the front leg." },
  "Step-Up": { labels:["FOOT ON STEP","STAND UP"], box:[96,108,54,30], A:{head:[74,30],neck:[74,42],hip:[74,88],kneeF:[100,90],ankleF:[100,108],footF:[113,108],kneeB:[74,114],ankleB:[74,136],footB:[87,138],elbow:[74,66],hand:[74,90],db:[[74,94]]},
                 B:{head:[112,2],neck:[112,14],hip:[112,58],kneeF:[112,84],ankleF:[112,106],footF:[125,108],kneeB:[104,82],ankleB:[100,104],footB:[104,106],elbow:[112,38],hand:[112,62],db:[[112,66]]}, note:"Drive through the whole foot on the step. Don't push off the back leg." },
  "Push-Ups": { labels:["TOP","BOTTOM"], A:{head:[132,90],neck:[122,96],hip:[74,106],kneeF:[50,112],ankleF:[26,120],footF:[20,138],elbow:[124,118],hand:[126,138]},
                 B:{head:[134,112],neck:[124,118],hip:[74,124],kneeF:[50,128],ankleF:[26,132],footF:[20,138],elbow:[146,126],hand:[126,138]}, note:"Body stays one straight line from head to heels. Elbows about 45° from the body." },
  "Plank": { labels:["HOLD","HOLD"], A:{head:[130,92],neck:[120,98],hip:[74,108],kneeF:[50,114],ankleF:[26,122],footF:[20,138],elbow:[124,138],hand:[144,138]},
                 B:{head:[130,92],neck:[120,98],hip:[74,108],kneeF:[50,114],ankleF:[26,122],footF:[20,138],elbow:[124,138],hand:[144,138]}, note:"Squeeze glutes, ribs down, breathe. No sagging hips, no piking." },
  "1-Arm DB Row": { labels:["ARM LONG","ELBOW TO HIP"], box:[118,104,32,34], A:{head:[122,50],neck:[112,58],hip:[68,90],kneeF:[76,114],ankleF:[80,136],footF:[93,138],elbow2:[126,86],hand2:[130,104],elbow:[108,84],hand:[106,108],db:[[106,112]]},
                 B:{head:[122,50],neck:[112,58],hip:[68,90],kneeF:[76,114],ankleF:[80,136],footF:[93,138],elbow2:[126,86],hand2:[130,104],elbow:[92,74],hand:[104,90],db:[[104,94]]}, note:"Flat back. Pull the elbow toward the back pocket, not up to the shoulder." },
  "DB Floor Press": { labels:["PRESS UP","LOWER"], A:{head:[18,128],neck:[28,126],hip:[80,128],kneeF:[100,106],ankleF:[112,136],footF:[122,138],elbow:[34,100],hand:[36,74],db:[[36,70]]},
                 B:{head:[18,128],neck:[28,126],hip:[80,128],kneeF:[100,106],ankleF:[112,136],footF:[122,138],elbow:[46,124],hand:[42,100],db:[[42,96]]}, note:"Upper arms touch the floor lightly at the bottom, then press straight up." },
  "Farmer Carry": { labels:["STEP","STEP"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[92,110],ankleF:[98,136],footF:[110,138],kneeB:[70,110],ankleB:[62,136],footB:[56,138],elbow:[80,56],hand:[80,84],db:[[80,88]],elbow2:[80,56],hand2:[80,84],db2:[[80,88]]},
                 B:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[70,110],ankleF:[62,136],footF:[74,138],kneeB:[92,110],ankleB:[98,136],footB:[110,138],elbow:[80,56],hand:[80,84],db:[[80,88]],elbow2:[80,56],hand2:[80,84]}, note:"Tall posture, ribs over hips, short controlled steps." },
  "Suitcase Carry": { labels:["STEP","STEP"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[92,110],ankleF:[98,136],footF:[110,138],kneeB:[70,110],ankleB:[62,136],footB:[56,138],elbow:[80,56],hand:[80,84],db:[[80,88]],elbow2:[70,52],hand2:[62,68]},
                 B:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[70,110],ankleF:[62,136],footF:[74,138],kneeB:[92,110],ankleB:[98,136],footB:[110,138],elbow:[80,56],hand:[80,84],db:[[80,88]],elbow2:[70,52],hand2:[62,68]}, note:"One dumbbell. Don't lean away from it or toward it. Belt buckle stays level." },
  "Standing Calf Raise": { labels:["FLAT","UP ON TOES"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],heel:[70,138],footF:[94,138],elbow:[96,50],hand:[112,48]},
                 B:{head:[80,8],neck:[80,20],hip:[80,72],kneeF:[80,100],ankleF:[82,126],heel:[72,128],footF:[94,138],elbow:[96,40],hand:[112,38]}, note:"Full range: all the way up, pause, all the way down under control." },
  "Bent-Over Rear-Delt Raise": { labels:["ARMS DOWN","RAISE"], A:{head:[122,52],neck:[113,58],hip:[68,90],kneeF:[76,114],ankleF:[80,136],footF:[93,138],elbow:[113,82],hand:[111,104],db:[[111,108]]},
                 B:{head:[122,52],neck:[113,58],hip:[68,90],kneeF:[76,114],ankleF:[80,136],footF:[93,138],elbow:[104,54],hand:[96,50],db:[[93,48]]}, note:"Stay hinged. Small weights, slight elbow bend, raise out to the sides." },
  "Hammer Curl": { labels:["DOWN","CURL"], A:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],footF:[93,138],elbow:[82,56],hand:[84,80],db:[[84,84]]},
                 B:{head:[80,18],neck:[80,30],hip:[80,82],kneeF:[80,110],ankleF:[80,136],footF:[93,138],elbow:[82,56],hand:[100,44],db:[[104,42]]}, note:"Elbows stay pinned at your sides. Palms face each other the whole time." }
};
function poseFrame(f, dim){
  const L=(a,b,cls='')=>a&&b?`<line class="${cls}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`:'';
  const P=(pts,cls='')=>{const v=pts.filter(Boolean);return v.length>1?`<polyline class="${cls}" points="${v.map(p=>p.join(',')).join(' ')}"/>`:'';};
  const DB=(arr)=>(arr||[]).map(([x,y])=>`<rect class="db" x="${x-7}" y="${y-3}" width="14" height="6" rx="2"/>`).join('');
  return `<g class="fig ${dim?'dim':''}">${P([f.kneeB&&f.hip,f.kneeB,f.ankleB,f.footB],'limb back')}${L(f.neck,f.elbow2,'limb back')}${L(f.elbow2,f.hand2,'limb back')}${DB(f.db2)}`+
         `${L(f.neck,f.hip,'torso')}${P([f.hip,f.kneeF,f.ankleF,f.footF],'limb')}${f.heel?L(f.heel,f.ankleF,'limb')+L(f.heel,f.footF,'limb'):''}${L(f.neck,f.elbow,'limb')}${L(f.elbow,f.hand,'limb')}${DB(f.db)}<circle class="head" cx="${f.head[0]}" cy="${f.head[1]}" r="8"/></g>`;
}
function formDrawing(name){
  const p=FORM_POSES[name]; if(!p) return '';
  const box=p.box?`<rect class="box" x="${p.box[0]}" y="${p.box[1]}" width="${p.box[2]}" height="${p.box[3]}" rx="2"/>`:'';
  const still=p.labels[0]===p.labels[1];
  return `<div class="form-drawing ${still?'still':''}"><svg viewBox="0 0 160 150" aria-label="${esc(name)} form drawing"><line class="floor" x1="6" y1="138" x2="154" y2="138"/>${box}<g class="frame fA">${poseFrame(p.A)}</g><g class="frame fB">${poseFrame(p.B)}</g></svg><div class="form-labels"><span class="lA">${esc(p.labels[0])}</span>${still?'':'<span class="arrow">⇄</span>'}<span class="lB">${still?'':esc(p.labels[1])}</span></div>${p.note?`<p class="note form-note">${esc(p.note)}</p>`:''}</div>`;
}
function motionVisual(name){ const d=formDrawing(name); if(d) return d; return `<div class="visual-placeholder"><span>FORM</span><strong>${esc(name)}</strong><small>Use the steps + cues below, then play the video when you have a connection.</small></div>`; }

function workingWeightExercises(){ const names=[]; Object.values(PROGRAM).flatMap(w=>w.exercises).forEach(e=>{ if(['strength','carry'].includes(e.type)&&!names.includes(e.name)) names.push(e.name); }); return names; }
function renderProgress(){
  const s=getState(),names=workingWeightExercises(); if(!names.includes(progressExerciseName)) progressExerciseName=names[0]; const data=exerciseSessionData(progressExerciseName),last=data.at(-1),best=data.reduce((a,b)=>!a||b.load>a.load?b:a,null); const body=s.bodyHistory;
  $('#main').innerHTML=`<div class="section-title"><h3>Progress</h3><small>make improvement visible</small></div>
    <section class="card"><div class="kicker">EXERCISE PROGRESSION</div><div class="field"><label>Exercise</label><select onchange="progressExerciseName=this.value;renderProgress()">${names.map(n=>`<option ${n===progressExerciseName?'selected':''}>${esc(n)}</option>`).join('')}</select></div><div class="progress-summary"><div class="stat"><strong>${last?.load||'—'}</strong><small>last load</small></div><div class="stat"><strong>${best?.load||'—'}</strong><small>best load</small></div><div class="stat"><strong>${data.length}</strong><small>sessions</small></div></div>${progressChart(data)}</section>
    <section class="card"><div class="section-title" style="margin:0 0 8px"><h3>Current working weights</h3><small>tap to edit</small></div>${names.map(n=>`<div class="weight-row"><div><strong>${esc(n)}</strong><small>${['Farmer Carry','Suitcase Carry'].includes(n)?'total carried load or load used':'working dumbbell load'}</small></div><button class="secondary" onclick='editWorkingWeight(${JSON.stringify(n)})'>${s.workingWeights[n]??'Set'} lb</button></div>`).join('')}</section>
    <section class="card"><div class="kicker">BODY METRICS</div><div class="set-grid"><div class="field"><label>Weight (lb)</label><input id="bodyWeightInput" inputmode="decimal" placeholder="e.g. 240"></div><div class="field"><label>Waist (in)</label><input id="waistInput" inputmode="decimal" placeholder="e.g. 39"></div></div><button class="primary" onclick="saveBodyMetric()">ADD TODAY'S METRICS</button>${bodyChart(body)}</section>
    <section class="card"><div class="kicker">HUNTER READINESS BENCHMARKS</div>${BENCHMARKS.map(b=>{const v=Number(s.benchmarks[b.id]||0),pct=Math.min(100,Math.round((v/b.target)*100));return `<div class="benchmark"><div class="benchmark-top"><div><strong>${b.label}</strong><br><small>Goal: ${b.target} ${b.unit}</small></div><button class="ghost" onclick="editBenchmark('${b.id}')">${v||'Set'}</button></div><div class="progress-bar"><span style="width:${pct}%"></span></div></div>`;}).join('')}</section>`;
}
function editWorkingWeight(name){ const s=getState(),old=s.workingWeights[name]??''; openModal(`<div class="close-row"><div><div class="kicker">WORKING WEIGHT</div><h2>${esc(name)}</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div><div class="field"><label>Current load (lb)</label><input id="workingWeightInput" inputmode="decimal" value="${old}"></div><button class="primary" onclick='saveWorkingWeight(${JSON.stringify(name)})'>SAVE</button>`); }
function saveWorkingWeight(name){ const s=getState().workingWeights; s[name]=Number($('#workingWeightInput').value||0); STORE.set('hr30_workingWeights',s); closeModal(); renderProgress(); }
function exerciseSessionData(name){ return getState().history.slice().reverse().map(h=>{ const logs=(h.logs||[]).filter(l=>l.name===name); if(!logs.length) return null; const loads=logs.map(l=>Number(l.weight||0)).filter(Boolean); const load=loads.length?Math.max(...loads):0; const reps=logs.reduce((sum,l)=>sum+Number(l.reps||0),0); return {date:h.date,load,reps}; }).filter(Boolean).slice(-12); }
function lineChart(points,unit='',label='trend'){ if(!points.length) return ''; const vals=points.map(d=>d.value),min=Math.min(...vals),max=Math.max(...vals),range=Math.max(1,max-min),w=520,h=130,p=14,pts=points.map((d,i)=>{const x=p+(i*(w-2*p)/Math.max(1,points.length-1)),y=h-p-((d.value-min)/range)*(h-2*p);return [x,y];}); return `<div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" aria-label="${esc(label)}"><polyline fill="none" stroke="#c9a75b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="${pts.map(p=>p.join(',')).join(' ')}"/>${pts.map((pt,i)=>`<circle cx="${pt[0]}" cy="${pt[1]}" r="5" fill="#e2c881"><title>${vals[i]}${unit}</title></circle>`).join('')}</svg><div class="chart-labels"><span>${new Date(points[0].date).toLocaleDateString()}</span><span>${new Date(points.at(-1).date).toLocaleDateString()}</span></div></div>`; }
function progressChart(data){ if(!data.length) return '<div class="empty">Log this exercise in a workout and the trend will appear here.</div>'; const vals=data.map(d=>d.load),min=Math.min(...vals),max=Math.max(...vals),range=Math.max(1,max-min),w=520,h=130,p=14,pts=data.map((d,i)=>{const x=p+(i*(w-2*p)/Math.max(1,data.length-1)),y=h-p-((d.load-min)/range)*(h-2*p);return [x,y];}); return `<div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" aria-label="${esc(progressExerciseName)} progression chart"><polyline fill="none" stroke="#c9a75b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="${pts.map(p=>p.join(',')).join(' ')}"/>${pts.map((pt,i)=>`<circle cx="${pt[0]}" cy="${pt[1]}" r="5" fill="#e2c881"><title>${vals[i]} lb</title></circle>`).join('')}</svg><div class="chart-labels"><span>${new Date(data[0].date).toLocaleDateString()}</span><span>${new Date(data.at(-1).date).toLocaleDateString()}</span></div></div>`; }
function saveBodyMetric(){ const weight=Number($('#bodyWeightInput').value||0),waist=Number($('#waistInput').value||0); if(!weight&&!waist){alert('Enter weight, waist, or both.');return;} const h=getState().bodyHistory; h.unshift({date:new Date().toISOString(),weight,waist}); STORE.set('hr30_bodyHistory',h.slice(0,365)); renderProgress(); }
function bodyChart(body){ const points=body.filter(x=>x.weight).slice(0,12).reverse(); if(points.length<2) return '<p class="note">Add body weight over time to see your trend.</p>'; return `<div class="chart-wrap">${progressChart(points.map(x=>({date:x.date,load:x.weight}))).replace('<div class="chart-wrap">','').replace(/<\/div>$/,'')}</div>`; }
function editBenchmark(id){ const b=BENCHMARKS.find(x=>x.id===id),old=getState().benchmarks[id]||''; openModal(`<div class="close-row"><div><div class="kicker">UPDATE</div><h2>${esc(b.label)}</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div><div class="field"><label>Current best (${esc(b.unit)})</label><input id="benchVal" inputmode="decimal" value="${old}"></div><button class="primary" onclick="saveBenchmark('${id}')">SAVE</button>`); }
function saveBenchmark(id){ const b=getState().benchmarks; b[id]=Number($('#benchVal').value||0); STORE.set('hr30_benchmarks',b); closeModal(); renderProgress(); }

function renderFuel(){
  const s=getState(),today=localDateKey(),meals=s.meals.filter(m=>m.dateKey===today),tot=mealTotals(meals),t=s.nutritionTargets;
  $('#main').innerHTML=`<section class="card"><div class="kicker">FUEL</div><h2>Food log</h2><p class="sub">Track meals manually or attach a photo. AI photo analysis is supported through a secure endpoint when you connect one in Settings.</p><div class="notice">Photo-based nutrition is an estimate, not an exact measurement. Review and edit the numbers before saving.</div></section>
  <section class="card"><div class="section-title" style="margin:0 0 10px"><h3>Today's totals</h3><button class="ghost" onclick="openNutritionTargets()">Set targets →</button></div><div class="fuel-total-grid">${fuelStat('Calories',tot.calories,t.calories,'kcal')}${fuelStat('Protein',tot.protein,t.protein,'g')}${fuelStat('Carbs',tot.carbs,t.carbs,'g')}${fuelStat('Fat',tot.fat,t.fat,'g')}${fuelStat('Fiber',tot.fiber,t.fiber,'g')}</div><button class="primary" onclick="openMealForm()">＋ ADD MEAL / PHOTO</button></section>
  <section class="card"><div class="section-title" style="margin:0 0 10px"><h3>Today's meals</h3><small>${meals.length} logged</small></div><div id="mealList">${meals.length?meals.map(mealCard).join(''):'<div class="empty">No meals logged yet.</div>'}</div></section>`;
  loadMealPhotos(meals);
}
function mealTotals(meals){ return meals.reduce((a,m)=>{['calories','protein','carbs','fat','fiber'].forEach(k=>a[k]+=Number(m[k]||0));return a;},{calories:0,protein:0,carbs:0,fat:0,fiber:0}); }
function fuelStat(label,val,target,unit){ const pct=target?Math.min(100,Math.round(val/target*100)):0; return `<div class="fuel-stat"><strong>${Math.round(val)}${unit==='g'?'g':''}</strong><small>${label}${target?` / ${target}${unit==='g'?'g':''}`:''}</small>${target?`<div class="progress-bar"><span style="width:${pct}%"></span></div>`:''}</div>`; }
function mealCard(m){ return `<div class="meal-card"><div id="photo-${m.id}" class="meal-photo placeholder">◌</div><div><h4>${esc(m.name||'Meal')}</h4><div class="meal-meta"><span>${m.calories||0} kcal</span><span>${m.protein||0}g P</span><span>${m.carbs||0}g C</span><span>${m.fat||0}g F</span></div><div class="meal-actions"><button class="ghost" onclick="editMeal('${m.id}')">Edit</button><button class="ghost" onclick="deleteMeal('${m.id}')">Delete</button></div></div></div>`; }
function openNutritionTargets(){ const t=getState().nutritionTargets; openModal(`<div class="close-row"><div><div class="kicker">DAILY TARGETS</div><h2>Nutrition targets</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div><div class="set-grid">${macroField('targetCalories','Calories',t.calories)}${macroField('targetProtein','Protein (g)',t.protein)}${macroField('targetCarbs','Carbs (g)',t.carbs)}${macroField('targetFat','Fat (g)',t.fat)}${macroField('targetFiber','Fiber (g)',t.fiber)}</div><button class="primary" onclick="saveNutritionTargets()">SAVE TARGETS</button>`); }
function macroField(id,label,val){ return `<div class="field"><label>${label}</label><input id="${id}" inputmode="decimal" value="${val||''}"></div>`; }
function saveNutritionTargets(){ STORE.set('hr30_nutritionTargets',{calories:+$('#targetCalories').value||0,protein:+$('#targetProtein').value||0,carbs:+$('#targetCarbs').value||0,fat:+$('#targetFat').value||0,fiber:+$('#targetFiber').value||0}); closeModal(); renderFuel(); }
function openMealForm(existingId=''){ pendingMealPhoto=null; const m=getState().meals.find(x=>x.id===existingId)||{}; openModal(`<div class="close-row"><div><div class="kicker">${existingId?'EDIT MEAL':'ADD MEAL'}</div><h2>${existingId?'Update meal':'Log food'}</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div><div class="field"><label>Meal name</label><input id="mealName" value="${esc(m.name||'')}" placeholder="e.g. Steak and eggs"></div><div class="field"><label>Photo</label><input id="mealPhotoInput" type="file" accept="image/*" capture="environment" onchange="handleMealPhoto(this.files[0])"></div><img id="mealPhotoPreview" class="photo-preview" style="display:none" alt="Meal preview"><div class="ai-status" id="aiStatus">${getState().settings.aiEndpoint?'AI endpoint connected. Add a photo, then analyze.':'AI photo scan is not connected yet. Manual logging works now.'}</div><button id="aiAnalyzeBtn" class="secondary" style="width:100%;margin-top:10px" onclick="analyzePendingMealPhoto()">AI ANALYZE PHOTO</button><div class="set-grid">${macroField('mealCalories','Calories',m.calories)}${macroField('mealProtein','Protein (g)',m.protein)}${macroField('mealCarbs','Carbs (g)',m.carbs)}${macroField('mealFat','Fat (g)',m.fat)}${macroField('mealFiber','Fiber (g)',m.fiber)}</div><div class="field"><label>Notes / micronutrients</label><textarea id="mealNotes" rows="3" placeholder="Optional">${esc(m.notes||'')}</textarea></div><button class="primary" onclick="saveMeal('${existingId}')">SAVE MEAL</button>`); if(existingId) PhotoStore.get(existingId).then(src=>{if(src){pendingMealPhoto=src;showMealPreview(src);}}); }
function editMeal(id){ openMealForm(id); }
async function handleMealPhoto(file){ if(!file)return; pendingMealPhoto=await compressImage(file,640,.74); showMealPreview(pendingMealPhoto); $('#aiStatus').textContent=getState().settings.aiEndpoint?'Photo ready. Tap AI Analyze Photo.':'Photo attached. AI scan needs a secure endpoint; you can still log manually.'; }
function showMealPreview(src){ const img=$('#mealPhotoPreview'); if(img){img.src=src;img.style.display='block';} }
function compressImage(file,maxW=640,quality=.75){ return new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=reject;r.onload=()=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,maxW/img.width),c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',quality));};img.onerror=reject;img.src=r.result;};r.readAsDataURL(file);}); }
function aiEndpointFor(kind){ const base=(getState().settings.aiEndpoint||'').trim(); if(!base) return ''; return /analyze-meal/.test(base)?base.replace(/analyze-meal[^/?#]*/, 'analyze-'+kind):base; }
async function callAi(kind,payload,statusEl,busyBtn,busyLabel){ const endpoint=aiEndpointFor(kind); if(!endpoint){ if(statusEl) statusEl.textContent='AI is not connected. Add the secure AI endpoint in Settings.'; return null; } const btn=busyBtn?$(busyBtn):null, orig=btn?btn.textContent:''; if(btn){btn.disabled=true;btn.textContent=busyLabel||'WORKING…';} if(statusEl) statusEl.textContent='Analyzing… this can take 10–20 seconds.'; try{ const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); let d=null; try{ d=await res.json(); }catch{} if(!res.ok) throw new Error(friendlyAiError(res.status,d)); if(!d||typeof d!=='object') throw new Error('The AI endpoint returned an unreadable response.'); return d; }catch(e){ if(statusEl) statusEl.textContent=e instanceof TypeError?'Could not reach the AI endpoint. Check your connection and the endpoint URL in Settings.':`AI analysis failed: ${e.message}`; return null; }finally{ if(btn){btn.disabled=false;btn.textContent=orig;} } }
function friendlyAiError(status,body){
  const raw=String(body?.error||body?.message||'').trim(),lower=raw.toLowerCase(),code=String(body?.code||'');
  if(status===402||code==='insufficient_credits'||lower.includes('credit')||lower.includes('billing')) return raw||'AI credits are used up. Add credits to the AI account connected to the server, then try again.';
  if(status===429) return 'The AI service is rate-limited right now. Wait a moment and try again.';
  if(status===401) return raw||'The server\'s AI key was rejected. Check the key in Vercel → Settings → Environment Variables, then redeploy.';
  if(status===403&&lower.includes('origin')) return 'This app\'s web address is not in the server\'s ALLOWED_ORIGINS. Open HUNT READY 30 from your GitHub Pages / Home Screen version, or add this address to ALLOWED_ORIGINS in Vercel.';
  if(status===403) return raw?`Server rejected the request: ${raw}`:'The server rejected the request.';
  if(status===404) return raw||'AI endpoint not found. Check the endpoint URL in Settings.';
  if(status===413) return 'The photo is too large to send. Try a smaller or closer photo.';
  if(status===422) return raw||'The AI could not analyze this photo.';
  if(status===500&&lower.includes('not configured')) return `Server setup problem: ${raw} Add the environment variable in Vercel and redeploy.`;
  if(status>=500) return raw?`Server error: ${raw}`:'The AI server hit an error. Try again in a moment.';
  return raw||`AI request failed (HTTP ${status}).`;
}
async function analyzePendingMealPhoto(){ const endpoint=getState().settings.aiEndpoint,btn=$('#aiAnalyzeBtn'); if(!pendingMealPhoto){alert('Add a meal photo first.');return;} if(!endpoint){ $('#aiStatus').textContent='AI scan is not connected. Add a secure nutrition-analysis endpoint in Settings. Do not put a private API key into this static app.'; return; } if(btn){btn.disabled=true;btn.textContent='ANALYZING…';} $('#aiStatus').textContent='Analyzing photo…'; try{ const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({imageDataUrl:pendingMealPhoto})}); let d=null; try{ d=await res.json(); }catch{} if(!res.ok) throw new Error(friendlyAiError(res.status,d)); if(!d||typeof d!=='object') throw new Error('The AI endpoint returned an unreadable response.'); if(d.name) $('#mealName').value=d.name; [['mealCalories','calories'],['mealProtein','protein'],['mealCarbs','carbs'],['mealFat','fat'],['mealFiber','fiber']].forEach(([id,k])=>{if(d[k]!=null)$('#'+id).value=d[k];}); if(d.notes) $('#mealNotes').value=d.notes; $('#aiStatus').textContent='AI estimate loaded. Review the numbers before saving.'; }catch(e){ const network=e instanceof TypeError; $('#aiStatus').textContent=network?'Could not reach the AI endpoint. Check your connection and the endpoint URL in Settings. If both are right, make sure this app\'s address is listed in ALLOWED_ORIGINS on the server.':`AI analysis failed: ${e.message}`; }finally{ const b=$('#aiAnalyzeBtn'); if(b){b.disabled=false;b.textContent='AI ANALYZE PHOTO';} } }
async function saveMeal(existingId=''){ const meals=getState().meals,id=existingId||uid(),idx=meals.findIndex(x=>x.id===id),obj={id,dateKey:idx>=0?meals[idx].dateKey:localDateKey(),createdAt:idx>=0?meals[idx].createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),name:$('#mealName').value.trim()||'Meal',calories:+$('#mealCalories').value||0,protein:+$('#mealProtein').value||0,carbs:+$('#mealCarbs').value||0,fat:+$('#mealFat').value||0,fiber:+$('#mealFiber').value||0,notes:$('#mealNotes').value.trim()}; if(idx>=0) meals[idx]=obj; else meals.unshift(obj); STORE.set('hr30_meals',meals.slice(0,500)); if(pendingMealPhoto) await PhotoStore.set(id,pendingMealPhoto); closeModal(); renderFuel(); }
async function deleteMeal(id){ if(!confirm('Delete this meal?'))return; STORE.set('hr30_meals',getState().meals.filter(m=>m.id!==id)); await PhotoStore.del(id); renderFuel(); }
async function loadMealPhotos(meals){ for(const m of meals){ const src=await PhotoStore.get(m.id); const el=$('#photo-'+m.id); if(el&&src){ el.outerHTML=`<img id="photo-${m.id}" class="meal-photo" src="${src}" alt="${esc(m.name)}">`; } } }

const PhotoStore={ db:null, open(){ if(this.db)return Promise.resolve(this.db); return new Promise((resolve,reject)=>{const req=indexedDB.open('huntReady30',1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('mealPhotos'))req.result.createObjectStore('mealPhotos');};req.onsuccess=()=>{this.db=req.result;resolve(this.db)};req.onerror=()=>reject(req.error);});}, async set(id,data){const db=await this.open();return new Promise((res,rej)=>{const tx=db.transaction('mealPhotos','readwrite');tx.objectStore('mealPhotos').put(data,id);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}, async get(id){try{const db=await this.open();return await new Promise((res,rej)=>{const r=db.transaction('mealPhotos').objectStore('mealPhotos').get(id);r.onsuccess=()=>res(r.result||'');r.onerror=()=>rej(r.error);});}catch{return '';}}, async del(id){try{const db=await this.open();return await new Promise((res,rej)=>{const tx=db.transaction('mealPhotos','readwrite');tx.objectStore('mealPhotos').delete(id);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}catch{}}, async keys(){try{const db=await this.open();return await new Promise((res,rej)=>{const r=db.transaction('mealPhotos').objectStore('mealPhotos').getAllKeys();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);});}catch{return [];}} };

function openBowProfile(){
  const b=getState().bowProfile; pendingBowPhoto=null;
  openModal(`<div class="close-row"><div><div class="kicker">BOW PROFILE</div><h2>Your hunting setup</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div>
    <div class="field"><label>Photo of your bow</label><input type="file" accept="image/*" capture="environment" onchange="handleBowPhoto(this.files[0])"></div><img id="bowPhotoPreview" class="photo-preview" style="display:none" alt="Your bow"><div class="ai-status" id="bowAiStatus">${getState().settings.aiEndpoint?'Add a clear photo of the whole bow (labels visible), then scan.':'AI scan needs the secure endpoint in Settings. You can still fill this in by hand.'}</div><button class="secondary" id="bowScanBtn" style="width:100%;margin-top:8px" onclick="scanBowPhoto()">SCAN MY BOW WITH AI</button>
    <div class="set-grid"><div class="field"><label>Bow</label><input id="bowName" value="${esc(b.bow||'')}"></div><div class="field"><label>Handedness</label><select id="bowHand"><option value="right" ${b.handedness==='right'?'selected':''}>Right-handed</option><option value="left" ${b.handedness==='left'?'selected':''}>Left-handed</option></select></div></div>
    <div class="set-grid"><div class="field"><label>Draw length (in)</label><input id="bowDrawLength" inputmode="decimal" value="${b.drawLength||''}"></div><div class="field"><label>Draw weight (lb)</label><input id="bowDrawWeight" inputmode="decimal" value="${b.drawWeight||''}"></div></div>
    <div class="field"><label>Arrow rest</label><input id="bowRest" value="${esc(b.rest||'')}"></div>
    <div class="field"><label>Sight</label><input id="bowSight" value="${esc(b.sight||'')}"></div>
    <div class="set-grid"><div class="field"><label>Arrows</label><input id="bowArrows" value="${esc(b.arrows||'')}"></div><div class="field"><label>Spine</label><input id="bowSpine" value="${esc(b.spine||'')}"></div></div>
    <div class="field"><label>Arrow length</label><input id="bowArrowLength" value="${esc(b.arrowLength||'')}"></div>
    <div class="field"><label>Broadhead</label><input id="bowBroadhead" value="${esc(b.broadhead||'')}"></div>
    <div class="field"><label>Setup notes</label><textarea id="bowNotes" rows="3">${esc(b.notes||'')}</textarea></div>
    <button class="primary" onclick="saveBowProfile()">SAVE BOW PROFILE</button>`);
  PhotoStore.get('bow-photo').then(src=>{ if(src){ pendingBowPhoto=src; const img=$('#bowPhotoPreview'); if(img){img.src=src;img.style.display='block';} } });
}
async function handleBowPhoto(file){ if(!file) return; pendingBowPhoto=await compressImage(file,1024,.8); const img=$('#bowPhotoPreview'); if(img){img.src=pendingBowPhoto;img.style.display='block';} $('#bowAiStatus').textContent=getState().settings.aiEndpoint?'Photo ready. Tap Scan my bow.':'Photo attached. AI scan needs the secure endpoint in Settings.'; }
async function scanBowPhoto(){ if(!pendingBowPhoto){ alert('Add a photo of your bow first.'); return; } const d=await callAi('archery',{kind:'bow',imageDataUrl:pendingBowPhoto},$('#bowAiStatus'),'#bowScanBtn','SCANNING…'); if(!d) return; const set=(id,v)=>{ if(v&&String(v).trim()) $(id).value=String(v).trim(); }; set('#bowName',[d.brand,d.model].filter(Boolean).join(' ')); set('#bowSight',d.sight); set('#bowRest',d.rest); set('#bowArrows',d.arrows); if(['left','right'].includes(d.handedness)) $('#bowHand').value=d.handedness; const extras=[d.bow_type&&d.bow_type!=='unknown'?`${d.bow_type} bow`:'',d.stabilizer?`Stabilizer: ${d.stabilizer}`:'',d.quiver?`Quiver: ${d.quiver}`:'',d.other||''].filter(Boolean).join(' • '); const n=$('#bowNotes'); if(extras) n.value=(n.value?n.value+'\n':'')+`AI scan (${d.confidence} confidence): ${extras}`; $('#bowAiStatus').textContent=`Filled in what the AI could read (${d.confidence} confidence). ${d.notes||''} Check it, then save.`; }
async function saveBowProfile(){
  if(pendingBowPhoto) await PhotoStore.set('bow-photo',pendingBowPhoto);
  STORE.set('hr30_bowProfile',{handedness:$('#bowHand').value,bow:$('#bowName').value.trim(),drawLength:+$('#bowDrawLength').value||0,drawWeight:+$('#bowDrawWeight').value||0,rest:$('#bowRest').value.trim(),sight:$('#bowSight').value.trim(),arrows:$('#bowArrows').value.trim(),spine:$('#bowSpine').value.trim(),arrowLength:$('#bowArrowLength').value.trim(),broadhead:$('#bowBroadhead').value.trim(),notes:$('#bowNotes').value.trim()});
  closeModal(); renderToday();
}

const TARGET_FACES=[["40 cm face (15.7 in)",15.7],["60 cm face (23.6 in)",23.6],["80 cm face (31.5 in)",31.5],["122 cm face (48 in)",48],["Block / bag, 18 in wide",18],["Block / bag, 24 in wide",24]];
function openArcheryLog(view){ if(view) archeryView=view; pendingTargetPhoto=null; const s=getState();
  openModal(`<div class="close-row"><div><div class="kicker">ARCHERY LAB</div><h2>Practice with intent.</h2></div><button class="icon-btn" onclick="closeModal()">×</button></div><div class="segmented three"><button class="${archeryView==='log'?'active':''}" onclick="openArcheryLog('log')">Log</button><button class="${archeryView==='trends'?'active':''}" onclick="openArcheryLog('trends')">Trends</button><button class="${archeryView==='form'?'active':''}" onclick="openArcheryLog('form')">Form check</button></div>${archeryView==='log'?archeryLogMarkup(s):archeryView==='trends'?archeryTrendsMarkup(s):archeryFormMarkup(s)}`);
  if(archeryView==='log') loadArcheryPhotos(s.archery.slice(0,8));
  if(archeryView==='form') loadFormThumbs(s.formChecks.slice(0,6));
}
function archeryLogMarkup(s){ const width=Number(s.settings.archeryTargetWidth)||15.7, ai=!!s.settings.aiEndpoint;
  return `<div class="set-grid">${macroField('archeryDistance','Distance (yd)','')}${macroField('archeryArrows','Arrows shot','')}${macroField('archeryGroup','Group size (in)','')}</div>
  <div class="field"><label>Target photo (optional)</label><input type="file" accept="image/*" capture="environment" onchange="handleTargetPhoto(this.files[0])"></div><img id="targetPhotoPreview" class="photo-preview" style="display:none" alt="Target"><div class="set-grid"><div class="field"><label>Target face</label><select id="targetFace" onchange="$('#targetWidth').value=this.value">${TARGET_FACES.map(([l,v])=>`<option value="${v}" ${Math.abs(v-width)<.05?'selected':''}>${l}</option>`).join('')}</select></div><div class="field"><label>Width (in)</label><input id="targetWidth" inputmode="decimal" value="${width}"></div></div><div class="ai-status" id="targetAiStatus">${ai?'Add a photo of the target after the end, then let the AI measure the group.':'AI measurement needs the secure endpoint in Settings. Manual logging works now.'}</div><button class="secondary" id="targetAiBtn" style="width:100%;margin-top:8px" onclick="analyzeTargetPhoto()">AI MEASURE GROUP</button>
  <div class="field"><label>Notes</label><textarea id="archeryNotes" rows="3" placeholder="Form, sight changes, what felt good, what broke down"></textarea></div><button class="primary" onclick="saveArcherySession()">SAVE SESSION</button>
  <div class="divider"></div><div class="kicker">RECENT SESSIONS</div><div class="field-list">${s.archery.slice(0,8).map(a=>`<div class="archery-item"><div class="archery-row"><div id="aphoto-${a.id}" class="meal-photo placeholder small">◎</div><div style="flex:1"><div class="top"><strong>${a.distance||'—'} yd • ${a.arrows||0} arrows</strong><small>${new Date(a.date).toLocaleDateString()}</small></div><p class="note">${a.group?`${a.group}" group • `:''}${esc(a.notes||'')}</p><button class="ghost" onclick="deleteArcherySession('${a.id}')">Delete</button></div></div></div>`).join('')||'<div class="empty">No archery sessions logged yet.</div>'}</div>`; }
async function handleTargetPhoto(file){ if(!file) return; pendingTargetPhoto=await compressImage(file,1024,.8); const img=$('#targetPhotoPreview'); if(img){img.src=pendingTargetPhoto;img.style.display='block';} $('#targetAiStatus').textContent=getState().settings.aiEndpoint?'Photo ready. Tap AI Measure Group.':'Photo attached. AI needs the secure endpoint in Settings.'; }
async function analyzeTargetPhoto(){ if(!pendingTargetPhoto){ alert('Add a target photo first.'); return; } const width=+$('#targetWidth').value||0; const st=getState().settings; st.archeryTargetWidth=width; STORE.set('hr30_settings',st); const d=await callAi('archery',{kind:'target',imageDataUrl:pendingTargetPhoto,targetWidthIn:width,distanceYd:+$('#archeryDistance').value||0,arrowsShot:+$('#archeryArrows').value||0},$('#targetAiStatus'),'#targetAiBtn','MEASURING…'); if(!d) return; if(d.group_size_in) $('#archeryGroup').value=Math.round(d.group_size_in*10)/10; if(d.arrows_found&&!$('#archeryArrows').value) $('#archeryArrows').value=d.arrows_found; const line=[d.group_center,d.sight_adjustment,d.flyers&&d.flyers!=='none'?`Flyers: ${d.flyers}`:''].filter(Boolean).join('. '); const n=$('#archeryNotes'); n.value=(n.value?n.value+'\n':'')+`AI read (${d.confidence}): ${line}`; $('#targetAiStatus').textContent=`Group ≈ ${d.group_size_in}" from ${d.arrows_found} arrows (${d.confidence} confidence). ${d.notes||''} Review, then save.`; }
async function saveArcherySession(){ const a=getState().archery, id=uid(); a.unshift({id,date:new Date().toISOString(),distance:+$('#archeryDistance').value||0,arrows:+$('#archeryArrows').value||0,group:+$('#archeryGroup').value||0,targetWidthIn:+$('#targetWidth').value||0,notes:$('#archeryNotes').value.trim(),photo:!!pendingTargetPhoto}); STORE.set('hr30_archery',a.slice(0,300)); if(pendingTargetPhoto) await PhotoStore.set('archery-'+id,pendingTargetPhoto); pendingTargetPhoto=null; openArcheryLog('log'); }
async function deleteArcherySession(id){ if(!confirm('Delete this session?')) return; STORE.set('hr30_archery',getState().archery.filter(x=>x.id!==id)); await PhotoStore.del('archery-'+id); openArcheryLog('log'); }
async function loadArcheryPhotos(list){ for(const a of list){ const src=await PhotoStore.get('archery-'+a.id); const el=$('#aphoto-'+a.id); if(el&&src) el.outerHTML=`<img class="meal-photo small" src="${src}" alt="Target">`; } }
function archeryTrendsMarkup(s){ const sessions=s.archery.filter(a=>a.group>0&&a.distance>0); if(!sessions.length) return '<div class="empty">Log a few sessions with distance and group size and the trend will show here.</div>'; const dists=[...new Set(sessions.map(a=>a.distance))].sort((a,b)=>a-b); if(!dists.includes(archeryDistance)) archeryDistance=dists.includes(sessions[0].distance)?sessions[0].distance:dists[0]; const pts=sessions.filter(a=>a.distance===archeryDistance).slice().reverse().slice(-12).map(a=>({date:a.date,value:a.group})); const vals=pts.map(p=>p.value), best=Math.min(...vals), last=vals.at(-1), avg=Math.round(vals.reduce((x,y)=>x+y,0)/vals.length*10)/10;
  return `<section class="card flat"><div class="field"><label>Distance</label><select onchange="archeryDistance=+this.value;openArcheryLog('trends')">${dists.map(d=>`<option value="${d}" ${d===archeryDistance?'selected':''}>${d} yd</option>`).join('')}</select></div><div class="progress-summary"><div class="stat"><strong>${last}"</strong><small>last group</small></div><div class="stat"><strong>${best}"</strong><small>best group</small></div><div class="stat"><strong>${avg}"</strong><small>average</small></div></div>${lineChart(pts,'"','Group size at '+archeryDistance+' yd')}<p class="note" style="margin-top:8px">Lower is better. ${pts.length} session${pts.length===1?'':'s'} at ${archeryDistance} yd.</p></section><section class="card flat"><div class="kicker">BY DISTANCE</div>${dists.map(d=>{const g=sessions.filter(a=>a.distance===d).map(a=>a.group);return `<div class="weight-row"><div><strong>${d} yd</strong><small>${g.length} session${g.length===1?'':'s'}</small></div><span>best ${Math.min(...g)}" • avg ${Math.round(g.reduce((x,y)=>x+y,0)/g.length*10)/10}"</span></div>`;}).join('')}</section>`; }
function archeryFormMarkup(s){ const hand=s.bowProfile.handedness||'right', ai=!!s.settings.aiEndpoint; pendingFormFrames=null;
  return `<p class="sub">Film one shot from the side or from behind, 5–20 seconds, whole body in frame. The app pulls a few still frames and the AI gives coaching observations. It's a second set of eyes, not a substitute for a coach.</p>
  <div class="field"><label>Video of one shot</label><input type="file" accept="video/*" onchange="handleFormVideo(this.files[0])"></div><div id="frameStrip" class="frame-strip"></div>
  <div class="set-grid"><div class="field"><label>Camera view</label><select id="formView"><option value="side (from the bow-arm side)">Side</option><option value="behind the archer">Behind</option><option value="front, from the target">Front</option></select></div><div class="field"><label>Archer</label><select id="formHand"><option value="left" ${hand==='left'?'selected':''}>Left-handed</option><option value="right" ${hand==='right'?'selected':''}>Right-handed</option></select></div></div>
  <div class="field"><label>Anything to focus on? (optional)</label><input id="formNote" placeholder="e.g. I feel like I'm punching the release"></div>
  <div class="ai-status" id="formAiStatus">${ai?'Pick a video to pull frames from.':'Form review needs the secure endpoint in Settings.'}</div><button class="secondary" id="formAnalyzeBtn" style="width:100%;margin-top:8px" onclick="analyzeFormFrames()">REVIEW MY FORM</button><div id="formResult"></div>
  <div class="divider"></div><div class="kicker">PAST REVIEWS</div><div class="field-list">${s.formChecks.slice(0,6).map(f=>`<div class="archery-item" onclick="showFormCheck('${f.id}')" style="cursor:pointer"><div class="archery-row"><div id="fthumb-${f.id}" class="meal-photo placeholder small">▶</div><div style="flex:1"><div class="top"><strong>${esc(f.view||'Form check')}</strong><small>${new Date(f.date).toLocaleDateString()}</small></div><p class="note">${esc((f.result?.summary||'').slice(0,120))}${(f.result?.summary||'').length>120?'…':''}</p></div></div></div>`).join('')||'<div class="empty">No form reviews yet.</div>'}</div>`; }
function seekVideo(v,t){ return new Promise((res,rej)=>{ const to=setTimeout(()=>rej(new Error('seek timeout')),5000); v.onseeked=()=>{ clearTimeout(to); res(); }; v.currentTime=t; }); }
function extractVideoFrames(file,count=6,maxW=480){ return new Promise((resolve,reject)=>{ const url=URL.createObjectURL(file), v=document.createElement('video'); v.muted=true; v.playsInline=true; v.setAttribute('playsinline',''); v.preload='auto'; v.src=url; const fail=()=>{ URL.revokeObjectURL(url); reject(new Error('Could not read that video on this device. Try a shorter clip or a different format.')); }; v.onerror=fail; v.onloadeddata=async()=>{ try{ const dur=v.duration; if(!isFinite(dur)||dur<=0||!v.videoWidth) throw 0; const c=document.createElement('canvas'), scale=Math.min(1,maxW/v.videoWidth); c.width=Math.round(v.videoWidth*scale); c.height=Math.round(v.videoHeight*scale); const ctx=c.getContext('2d'); const frames=[]; for(let i=0;i<count;i++){ const t=Math.min(dur-0.05,dur*(0.08+0.84*i/(count-1))); await seekVideo(v,t); ctx.drawImage(v,0,0,c.width,c.height); frames.push(c.toDataURL('image/jpeg',.72)); } URL.revokeObjectURL(url); resolve(frames); }catch(e){ fail(); } }; }); }
async function handleFormVideo(file){ if(!file) return; const st=$('#formAiStatus'); st.textContent='Pulling frames from the video…'; try{ pendingFormFrames=await extractVideoFrames(file,6,480); $('#frameStrip').innerHTML=pendingFormFrames.map(f=>`<img src="${f}" alt="">`).join(''); st.textContent=getState().settings.aiEndpoint?`${pendingFormFrames.length} frames ready. Tap Review my form.`:'Frames ready, but form review needs the secure endpoint in Settings.'; }catch(e){ pendingFormFrames=null; st.textContent=e.message; } }
async function analyzeFormFrames(){ if(!pendingFormFrames){ alert('Pick a video of one shot first.'); return; } const view=$('#formView').value, hand=$('#formHand').value, note=$('#formNote').value.trim(); const d=await callAi('archery',{kind:'form',frames:pendingFormFrames,view,handedness:hand,note},$('#formAiStatus'),'#formAnalyzeBtn','REVIEWING…'); if(!d) return; const id=uid(), entry={id,date:new Date().toISOString(),view:view.split(' ')[0],handedness:hand,note,result:d}; const list=getState().formChecks; list.unshift(entry); STORE.set('hr30_formChecks',list.slice(0,30)); await PhotoStore.set('form-'+id,pendingFormFrames[Math.floor(pendingFormFrames.length/2)]); $('#formAiStatus').textContent=`Review saved (${d.confidence} confidence).`; $('#formResult').innerHTML=formResultMarkup(d); $('#formResult').scrollIntoView({behavior:'smooth',block:'start'}); }
function formResultMarkup(d){ const sec=(t,v)=>v?`<div class="card flat"><div class="kicker">${t}</div><p class="sub">${esc(v)}</p></div>`:''; return `<div class="form-feedback"><div class="notice"><strong>Summary</strong><br>${esc(d.summary||'')}</div>${d.top_fixes?.length?`<div class="card flat"><div class="kicker">TOP FIXES</div>${renderBulletList(d.top_fixes)}</div>`:''}${sec('STANCE & POSTURE',d.stance_and_posture)}${sec('BOW ARM & GRIP',d.bow_arm_and_grip)}${sec('DRAW',d.draw)}${sec('ANCHOR & HEAD',d.anchor_and_head)}${sec('RELEASE & FOLLOW-THROUGH',d.release_and_follow_through)}${d.drills?.length?`<div class="card flat"><div class="kicker">DRILLS</div>${renderBulletList(d.drills)}</div>`:''}${d.notes?`<p class="note">${esc(d.notes)} Confidence: ${esc(d.confidence||'')}.</p>`:''}</div>`; }
function showFormCheck(id){ const f=getState().formChecks.find(x=>x.id===id); if(!f) return; openModal(`<div class="close-row"><div><div class="kicker">FORM REVIEW • ${esc(f.view||'')}</div><h2>${new Date(f.date).toLocaleDateString()}</h2>${f.note?`<p class="note">Focus: ${esc(f.note)}</p>`:''}</div><button class="icon-btn" onclick="openArcheryLog('form')">‹</button></div><div id="fcThumb"></div>${formResultMarkup(f.result||{})}<button class="secondary danger" style="width:100%;margin-top:12px" onclick="deleteFormCheck('${f.id}')">DELETE REVIEW</button>`); PhotoStore.get('form-'+id).then(src=>{ if(src) $('#fcThumb').innerHTML=`<img class="photo-preview" src="${src}" alt="">`; }); }
async function deleteFormCheck(id){ if(!confirm('Delete this review?')) return; STORE.set('hr30_formChecks',getState().formChecks.filter(x=>x.id!==id)); await PhotoStore.del('form-'+id); openArcheryLog('form'); }
async function loadFormThumbs(list){ for(const f of list){ const src=await PhotoStore.get('form-'+f.id); const el=$('#fthumb-'+f.id); if(el&&src) el.outerHTML=`<img class="meal-photo small" src="${src}" alt="">`; } }
function openHuntPrep(){ const items=getState().checklist,done=items.filter(i=>i.done).length,pct=items.length?Math.round(done/items.length*100):0,cats=[...new Set(items.map(i=>i.category))]; openModal(`<div class="close-row"><div><div class="kicker">HUNT PREP</div><h2>${pct}% ready</h2><p class="note">${done} of ${items.length} items checked</p></div><button class="icon-btn" onclick="closeModal()">×</button></div><div class="progress-bar"><span style="width:${pct}%"></span></div>${cats.map(c=>`<div class="checklist-group"><h4>${esc(c)}</h4>${items.filter(i=>i.category===c).map(i=>`<label class="check-row"><input type="checkbox" ${i.done?'checked':''} onchange="toggleChecklist('${i.id}',this.checked)"><span>${esc(i.label)}</span></label>`).join('')}</div>`).join('')}<div class="divider"></div><div class="set-grid"><div class="field"><label>Custom item</label><input id="customCheckLabel" placeholder="Add something"></div><div class="field"><label>Category</label><input id="customCheckCategory" value="Other"></div></div><button class="secondary" style="width:100%" onclick="addChecklistItem()">ADD ITEM</button>`); }
function toggleChecklist(id,done){ const a=getState().checklist,i=a.find(x=>x.id===id); if(i)i.done=done; STORE.set('hr30_checklist',a); openHuntPrep(); }
function addChecklistItem(){ const label=$('#customCheckLabel').value.trim(); if(!label)return; const a=getState().checklist;a.push({id:uid(),category:$('#customCheckCategory').value.trim()||'Other',label,done:false});STORE.set('hr30_checklist',a);openHuntPrep(); }

// ---- Rest-timer alerts: generated beeps (no audio files), vibration where supported, visual flash as fallback ----
const Alerts = {
  ctx:null,
  unlock(){ try{ const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return; if(!this.ctx) this.ctx=new AC(); if(this.ctx.state==='suspended') this.ctx.resume(); }catch{} },
  beep(freq=880,dur=0.12,when=0,gain=0.3){ const c=this.ctx; if(!c||c.state!=='running') return false; try{ const t=c.currentTime+when, o=c.createOscillator(), g=c.createGain(); o.type='sine'; o.frequency.value=freq; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+0.012); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.connect(g).connect(c.destination); o.start(t); o.stop(t+dur+0.05); return true; }catch{ return false; } },
  tick(){ if(getState().settings.restSound!==false) this.beep(660,0.09); },
  go(){ const st=getState().settings; if(st.restSound!==false){ this.beep(880,0.16,0); this.beep(1175,0.28,0.2); } if(st.restVibrate!==false&&navigator.vibrate){ try{ navigator.vibrate([220,90,220]); }catch{} } },
  test(){ this.unlock(); setTimeout(()=>{ const ok=this.beep(660,0.09,0)&&this.beep(880,0.16,0.35)&&this.beep(1175,0.28,0.55); if(navigator.vibrate) try{ navigator.vibrate([220,90,220]); }catch{} const el=$('#alertTestNote'); if(el) el.textContent=ok?'Played. If you heard nothing, check the phone\'s silent switch and volume.':'Sound is blocked on this device. Vibration and the on-screen GO flash still work.'; },60); }
};
function startWorkout(day){ Alerts.unlock(); const w=effectiveWorkout(day); active={day,workout:w,index:0,set:1,logs:[],started:Date.now(),remaining:w.duration*60,historyStack:[],mode:'workout'}; openModal(workoutModal()); clearInterval(workoutTimer); workoutTimer=setInterval(()=>{if(!active)return;active.remaining=Math.max(0,active.remaining-1);const el=$('#workoutTimer');if(el)el.textContent=fmt(active.remaining);},1000); }
function currentEx(){ return active.workout.exercises[active.index]; }
function suggestedWeight(name){ const inSession=[...active.logs].reverse().find(l=>l.name===name&&l.weight); if(inSession)return inSession.weight; for(const h of getState().history){const f=[...(h.logs||[])].reverse().find(l=>l.name===name&&l.weight);if(f)return f.weight;} return getState().workingWeights[name]||''; }
function snapshot(){ return {index:active.index,set:active.set,logs:JSON.parse(JSON.stringify(active.logs)),remaining:active.remaining,mode:active.mode}; }
function restoreSnapshot(s){ active.index=s.index;active.set=s.set;active.logs=JSON.parse(JSON.stringify(s.logs));active.remaining=s.remaining;active.mode=s.mode; }
function workoutInputs(e){ const weight=suggestedWeight(e.name); if(e.type==='strength')return `<div class="set-grid"><div class="field"><label>Weight (lb)</label><input id="weightInput" inputmode="decimal" value="${weight}"></div><div class="field"><label>Reps</label><input id="repsInput" inputmode="numeric" value="${e.min||''}"></div></div><p class="note">Set ${active.set} of ${e.sets}</p>`; if(e.type==='carry')return `<div class="set-grid"><div class="field"><label>Load (lb)</label><input id="weightInput" inputmode="decimal" value="${weight}"></div><div class="field"><label>Seconds</label><input id="secondsInput" inputmode="numeric" value="${e.seconds||40}"></div></div><p class="note">Carry ${active.set} of ${e.sets}</p>`; if(e.type==='timed')return `<div class="field"><label>Seconds</label><input id="secondsInput" inputmode="numeric" value="${e.seconds||45}"></div><p class="note">Set ${active.set} of ${e.sets}</p>`; if(e.type==='ruck')return `<div class="set-grid"><div class="field"><label>Load (lb)</label><input id="weightInput" inputmode="decimal" value="${getState().preferredRuck}"></div><div class="field"><label>Minutes</label><input id="minutesInput" inputmode="numeric" value="${e.minutes||30}"></div><div class="field"><label>Distance (mi, optional)</label><input id="distanceInput" inputmode="decimal"></div></div>`; if(e.type==='circuit')return `<div class="set-grid"><div class="field"><label>Rounds completed</label><input id="roundsInput" inputmode="decimal"></div><div class="field"><label>Minutes</label><input id="minutesInput" inputmode="numeric" value="${e.minutes||20}"></div></div><div class="field"><label>Notes</label><input id="noteInput" placeholder="Optional"></div>`; return `<div class="field"><label>Notes / result</label><input id="noteInput" placeholder="Optional"></div>`; }
function workoutModal(){ const e=currentEx(),back=active.historyStack.length?'BACK':'EXIT'; return `<div class="workout-header"><div><div class="kicker">${active.day}</div><h2 style="margin:4px 0">${active.workout.title}</h2></div><div class="timer" id="workoutTimer">${fmt(active.remaining)}</div></div><div class="current-ex"><div class="kicker">EXERCISE ${active.index+1} OF ${active.workout.exercises.length}</div><h3>${esc(e.name)}</h3><p class="sub">${esc(e.prescription)}</p>${e.notes?`<p class="note">${esc(e.notes)}</p>`:''}<button class="secondary" style="width:100%;margin-top:10px" onclick='showExerciseGuide(${JSON.stringify(e.name)},"workout")'>HOW TO DO THIS EXERCISE</button>${workoutInputs(e)}<div class="action-row"><button class="secondary" onclick="previousStep()">${back}</button><button class="primary" style="margin-top:0" onclick="completeSet()">COMPLETE</button></div></div><button class="ghost" style="margin-top:16px" onclick="finishWorkout(true)">Finish early</button>`; }
function completeSet(){ Alerts.unlock(); const prev=snapshot(),e=currentEx(),log={name:e.name,set:active.set,type:e.type}; if($('#weightInput'))log.weight=+$('#weightInput').value||0;if($('#repsInput'))log.reps=+$('#repsInput').value||0;if($('#secondsInput'))log.seconds=+$('#secondsInput').value||0;if($('#minutesInput'))log.minutes=+$('#minutesInput').value||0;if($('#distanceInput'))log.distance=+$('#distanceInput').value||0;if($('#roundsInput'))log.rounds=+$('#roundsInput').value||0;if($('#noteInput'))log.note=$('#noteInput').value; active.logs.push(log);active.historyStack.push(prev); const multi=e.sets&&active.set<e.sets;if(multi){active.set++;e.rest?startRest(e.rest):rerenderWorkout();}else{active.index++;active.set=1;if(active.index>=active.workout.exercises.length){finishWorkout(false);return;}e.rest?startRest(e.rest):rerenderWorkout();} }
function startRest(seconds){ active.mode='rest';let left=seconds;$('#modal').innerHTML=`<div class="close-row"><div><div class="kicker">REST</div><h2>Recover, then go.</h2></div><button class="icon-btn" onclick="skipRest()">→</button></div><div class="rest-box"><div class="timer" id="restTimer">${fmt(left)}</div><p class="sub">Next: ${active.index<active.workout.exercises.length?esc(currentEx().name):'Finish'}</p></div><div class="action-row"><button class="secondary" onclick="previousStep()">BACK</button><button class="primary" onclick="skipRest()">SKIP REST</button></div>`;clearInterval(restTimer);restTimer=setInterval(()=>{left--;const el=$('#restTimer');if(el)el.textContent=fmt(Math.max(0,left));if(left>0&&left<=3)Alerts.tick();if(left<=0){clearInterval(restTimer);Alerts.go();const box=$('.rest-box');if(box){box.classList.add('go');const t=$('#restTimer');if(t)t.textContent='GO';}setTimeout(()=>{if(active&&active.mode==='rest')skipRest();},700);}},1000); }
function skipRest(){ clearInterval(restTimer);active.mode='workout';rerenderWorkout(); }
function rerenderWorkout(){ if(active)$('#modal').innerHTML=workoutModal(); }
function previousStep(){ clearInterval(restTimer);if(active.historyStack.length){restoreSnapshot(active.historyStack.pop());rerenderWorkout();}else if(confirm('Exit this workout? Your unsaved session will be discarded.')){clearInterval(workoutTimer);active=null;closeModal();} }
function updateWorkingWeightsFromLogs(logs){ const w=getState().workingWeights;logs.forEach(l=>{if(['strength','carry'].includes(l.type)&&l.weight)w[l.name]=l.weight;});STORE.set('hr30_workingWeights',w); }
function finishWorkout(early){ if(!active)return;clearInterval(workoutTimer);clearInterval(restTimer);const duration=Math.max(1,Math.round((Date.now()-active.started)/60000)),summary=progressionSummary(active.logs),entry={id:uid(),date:new Date().toISOString(),day:active.day,title:active.workout.title,duration,logs:active.logs,summary};saveHistory(entry);updateWorkingWeightsFromLogs(active.logs);active=null;closeModal();tab('today');setTimeout(()=>alert(early?`Workout logged at ${duration} min.`:`Workout complete. ${summary||'Nice work.'}`),100); }
function progressionSummary(logs){ const groups={};logs.forEach(l=>{if(l.type==='strength'&&l.weight&&l.reps)(groups[l.name]??=[]).push(l)});const recs=[];Object.entries(groups).forEach(([name,arr])=>{const e=Object.values(PROGRAM).flatMap(w=>w.exercises).find(x=>x.name===name);if(e?.max&&arr.length>=e.sets&&arr.every(x=>x.reps>=e.max))recs.push(`${name}: consider +2.5–5 lb next time`);});return recs.join(' • '); }
function quickLogRecovery(){ saveHistory({id:uid(),date:new Date().toISOString(),day:'Sunday',title:'Recovery',duration:0,logs:[],summary:'Recovery day logged.'});renderToday(); }

function modalIsOpen(){ return !$('#modalBackdrop').classList.contains('hidden'); }
function openModal(html){ const wasOpen=modalIsOpen(); $('#modal').innerHTML=html; $('#modalBackdrop').classList.remove('hidden'); $('#modalBackdrop').setAttribute('aria-hidden','false'); if(!wasOpen){ if(NAV.pendingModalCloses>0){ NAV.pendingModalCloses--; NAV.stack.push({kind:'modal'}); } else navPush({kind:'modal'}); } }
function hideModal(){ clearInterval(restTimer); $('#modalBackdrop').classList.add('hidden'); $('#modalBackdrop').setAttribute('aria-hidden','true'); }
function closeModal(){ hideModal(); navConsumeModal(); }
$('#modalBackdrop').addEventListener('click',e=>{ if(e.target.id==='modalBackdrop'&&!active)closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modalIsOpen()&&!active) closeModal(); });

// ---- Browser-history integration (back button / back gesture) ----
// Every modal, nested exercise guide, and tab change pushes a history entry, so "back"
// closes or steps back inside the app instead of leaving it.
const NAV = { stack: [], pendingPops: 0, pendingModalCloses: 0, closeTimer: null };
function navPush(entry){ NAV.stack.push(entry); try{ history.pushState({hr30:entry.kind}, ''); }catch{} }
function navConsume(kind){ const top=NAV.stack[NAV.stack.length-1]; if(!top||top.kind!==kind) return false; NAV.stack.pop(); NAV.pendingPops++; try{ history.back(); }catch{} return true; }
// Programmatic close: pop our entries now, but step the browser history back one tick later so a modal
// that opens in the same instant (e.g. "close day view, start workout") can reuse the entry instead of racing it.
function navConsumeModal(){ let n=0; while(NAV.stack.length&&['guide','modal'].includes(NAV.stack[NAV.stack.length-1].kind)){ NAV.stack.pop(); n++; } if(!n) return; NAV.pendingModalCloses+=n; clearTimeout(NAV.closeTimer); NAV.closeTimer=setTimeout(()=>{ const k=NAV.pendingModalCloses; NAV.pendingModalCloses=0; if(k>0){ NAV.pendingPops++; try{ history.go(-k); }catch{} } },0); }
function workoutBack(){
  clearInterval(restTimer);
  if(active.historyStack.length){ restoreSnapshot(active.historyStack.pop()); rerenderWorkout(); navPush({kind:'modal'}); return; }
  if(confirm('Exit this workout? Your unsaved session will be discarded.')){ clearInterval(workoutTimer); hideModal(); active=null; }
  else navPush({kind:'modal'});
}
window.addEventListener('popstate',()=>{
  if(NAV.pendingPops>0){ NAV.pendingPops--; return; }
  const top=NAV.stack.pop();
  if(!top) return;
  if(top.kind==='guide'){ if(active) rerenderWorkout(); else hideModal(); return; }
  if(top.kind==='modal'){ if(active) workoutBack(); else hideModal(); return; }
  if(top.kind==='tab'){ tab(top.from,false); return; }
});
try{ history.replaceState({hr30:'root'}, ''); }catch{}

$('#settingsBtn').addEventListener('click',openSettings);
function openSettings(){ const s=getState();openModal(`<div class="close-row"><div><div class="kicker">SETTINGS</div><h2>HUNT READY 30</h2><p class="note">Version ${APP_VERSION}</p></div><button class="icon-btn" onclick="closeModal()">×</button></div><div class="settings-grid"><div class="setting"><label>Program start date</label><input id="startDate" type="date" value="${s.startDate}"></div><div class="setting"><label>Starting ruck load (lb)</label><input id="ruckLoad" inputmode="numeric" value="${s.preferredRuck}"></div><div class="setting"><label>Rest timer alerts</label><label class="check-row"><input type="checkbox" id="restSound" ${s.settings.restSound!==false?'checked':''}><span>Sound: ticks at 3-2-1, double beep at GO</span></label><label class="check-row"><input type="checkbox" id="restVibrate" ${s.settings.restVibrate!==false?'checked':''}><span>Vibrate at GO (Android; iPhone doesn't allow web vibration)</span></label><button class="secondary" style="width:100%;margin-top:6px" onclick="Alerts.test()">TEST ALERT</button><p class="note" id="alertTestNote" style="margin:6px 0 0">On silent mode the screen still flashes GO when rest ends.</p></div><div class="setting"><label>Secure AI nutrition endpoint (optional)</label><input id="aiEndpoint" type="url" value="${esc(s.settings.aiEndpoint||'')}" placeholder="https://your-secure-endpoint.example/analyze"></div></div><div class="notice" style="margin-top:12px">For meal-photo AI, use a secure server endpoint. Do not paste a private AI API key into this GitHub Pages app.</div><button class="primary" onclick="saveSettings()">SAVE SETTINGS</button><div class="divider"></div><div class="kicker">YOUR OWN DEMO CLIPS</div><p class="note" style="margin:8px 0 10px">Film a short clip of a movement and upload it to the app's <code>media/demos</code> folder using the file name below. The guide switches to your clip automatically.</p><button class="secondary" style="width:100%" onclick="showClipNames()">SHOW CLIP FILE NAMES</button><div class="divider"></div><div class="kicker">DATA</div><button class="secondary" style="width:100%;margin-top:10px" onclick="exportAllData()">EXPORT COMPLETE BACKUP</button><button class="secondary" style="width:100%;margin-top:10px" onclick="$('#importFileInput').click()">IMPORT BACKUP</button><button class="secondary danger" style="width:100%;margin-top:10px" onclick="resetAppData()">RESET APP DATA</button>`); }
function showClipNames(){ const names=[...new Set([...LEARN_ORDER, ...Object.keys(EXERCISE_GUIDES)])]; openModal(`<div class="close-row"><div><div class="kicker">DEMO CLIPS</div><h2>File names</h2><p class="note">MP4 (H.264), 10–25 seconds, under ~15 MB. An optional poster image uses the same name with .jpg.</p></div><button class="icon-btn" onclick="closeModal()">×</button></div><section class="card flat">${names.map(n=>`<div class="weight-row"><strong>${esc(n)}</strong><code>${demoSlug(n)}.mp4</code></div>`).join('')}</section>`); }
function saveSettings(){ localStorage.hr30_startDate=$('#startDate').value||localDateKey();localStorage.hr30_preferredRuck=+$('#ruckLoad').value||10;const st=getState().settings;st.aiEndpoint=$('#aiEndpoint').value.trim();st.restSound=$('#restSound').checked;st.restVibrate=$('#restVibrate').checked;STORE.set('hr30_settings',st);closeModal();renderToday(); }
async function exportAllData(){ const keys=Object.keys(localStorage).filter(k=>k.startsWith('hr30_')),local={};keys.forEach(k=>local[k]=localStorage.getItem(k));const photos={};for(const k of await PhotoStore.keys()){const p=await PhotoStore.get(k);if(p)photos[k]=p;}const blob=new Blob([JSON.stringify({version:APP_VERSION,exportedAt:new Date().toISOString(),localStorage:local,mealPhotos:photos},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`hunt-ready-30-backup-${localDateKey()}.json`;a.click();URL.revokeObjectURL(url); }
$('#importFileInput').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data.localStorage)throw new Error('Invalid backup');if(!confirm('Import this backup and replace current HUNT READY 30 data?'))return;Object.entries(data.localStorage).forEach(([k,v])=>localStorage.setItem(k,v));for(const [id,p] of Object.entries(data.mealPhotos||{}))await PhotoStore.set(id,p);location.reload();}catch(err){alert('Import failed: '+err.message);}finally{e.target.value='';}});
function resetAppData(){ if(!confirm('Reset all HUNT READY 30 data on this device? This cannot be undone unless you exported a backup.'))return;Object.keys(localStorage).filter(k=>k.startsWith('hr30_')).forEach(k=>localStorage.removeItem(k));indexedDB.deleteDatabase('huntReady30');location.reload(); }

migrateLegacy();
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
renderToday();
