/* HUNT READY 30 — Cycles. Start Here: five short orientation sessions. Benchmark: five test days whose results write straight to the benchmarks. */

const START_HERE={ key:'starthere', title:'Start Here', blurb:'Five short sessions. Learn the patterns, find your loads, fit your pack, run one easy circuit. Then the week is yours.', days:[
  { n:1, title:'Move', focus:'Learn the five patterns · 20 min', duration:20, raw:true, exercises:[
    {name:'Warm-up',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Walk 2 min • arm circles • hip circles • 10 bodyweight squats • 10 hip hinges.'},
    {name:'Bodyweight Squat',prescription:'2 × 10',type:'strength',sets:2,min:10,max:10,rest:45,bodyweightOnly:true,notes:'Heels down. Knees over the toes. Sit between your heels with your chest up. This is every hill and every ladder.'},
    {name:'Hip Hinge',prescription:'2 × 10',type:'strength',sets:2,min:10,max:10,rest:45,bodyweightOnly:true,notes:'Push the hips back, flat back, hands sliding down the thighs. Feel the hamstrings. This is the deadlift and the pack lift.'},
    {name:'Reverse Lunge',prescription:'2 × 6/leg',type:'strength',sets:2,min:6,max:6,rest:45,bodyweightOnly:true,notes:'Step back, front shin vertical, drive through the front heel. Hold a wall if balance is shaky.'},
    {name:'Push-Ups',prescription:'2 × 6–10',type:'strength',sets:2,min:6,max:10,rest:45,bodyweightOnly:true,notes:'Elbows at 45°, body in one line. Hands on a bench or counter if the floor is too much today.'},
    {name:'Plank',prescription:'2 × 30 sec',type:'timed',sets:2,seconds:30,rest:30,notes:'Squeeze the glutes, ribs down, breathe through the nose.'}
  ]},
  { n:2, title:'Find your loads · lower', focus:'Squat, hinge, carry · 25 min', duration:25, exercises:[
    {name:'Warm-up',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Bodyweight squat • hip hinge • reverse lunge • calf raise • marching.'},
    {name:'Goblet Squat',prescription:'3 × 8',type:'strength',sets:3,min:8,max:8,rest:75,notes:'Start light. Add weight each set until 8 reps feel like you have 3 left in you. Log that last set. It becomes your working weight.'},
    {name:'DB Romanian Deadlift',prescription:'3 × 8',type:'strength',sets:3,min:8,max:8,rest:75,notes:'Same idea. Flat back, hips back, dumbbells slide down the thighs. Stop the set the moment the back rounds.'},
    {name:'Standing Calf Raise',prescription:'2 × 15',type:'strength',sets:2,min:15,max:15,rest:45,notes:'Full stretch at the bottom, pause at the top. Calves get you up the mountain and down it.'},
    {name:'Farmer Carry',prescription:'3 × 30 sec',type:'carry',sets:3,seconds:30,rest:30,notes:'Pick a pair you can hold 30 seconds tall. Shoulders back, short quick steps.'}
  ]},
  { n:3, title:'Find your loads · upper', focus:'Press, pull, hold · 25 min', duration:25, exercises:[
    {name:'Warm-up',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Arm circles • band or towel pull-aparts • 10 push-ups on a counter • 10 slow rows with anything.'},
    {name:'DB Floor Press',prescription:'3 × 8',type:'strength',sets:3,min:8,max:8,rest:75,notes:'Build up over 3 sets. Elbows at 45°, pause when the arms touch the floor. Log the heaviest clean set.'},
    {name:'1-Arm DB Row',prescription:'3 × 8/side',type:'strength',sets:3,min:8,max:8,rest:60,notes:'Hand on a bench or your knee. Pull the elbow to the hip, not the shoulder to the ear. This is the draw.'},
    {name:'Bent-Over Rear-Delt Raise',prescription:'2 × 12',type:'strength',sets:2,min:12,max:12,rest:45,notes:'Light. Thumbs down, squeeze the shoulder blades. The bow arm lives here.'},
    {name:'Hammer Curl',prescription:'2 × 10',type:'strength',sets:2,min:10,max:10,rest:45,notes:'Neutral grip, no swinging. Grip strength for the pack straps and the drag.'},
    {name:'Plank',prescription:'2 × 40 sec',type:'timed',sets:2,seconds:40,rest:30,notes:'Same cues as day one. Ten seconds longer.'}
  ]},
  { n:4, title:'Ruck shakeout', focus:'Fit the pack, find the pace · 25 min', duration:25, exercises:[
    {name:'Weighted Walk / Ruck',prescription:'20 min · 10–15 lb',type:'ruck',minutes:20,rest:0,notes:'Fit the pack first: hip belt snug on the hip bones, shoulder straps just touching, nothing swinging. Flat ground. Walk at a pace you could talk through. Log the load and the distance if you know it.'},
    {name:'Mobility',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Calves, ankles, hips, hamstrings. Thirty seconds each, easy.'}
  ]},
  { n:5, title:'First circuit', focus:'Twelve easy minutes · 22 min', duration:22, exercises:()=>[
    {name:'Warm-up',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Bodyweight squat • hip hinge • reverse lunge • push-up • marching.'},
    {...PROGRAM.Friday.exercises[1],prescription:'12 min easy rounds',minutes:12,notes:PROGRAM.Friday.exercises[1].notes+' Half the loads you found this week. Count rounds. Do not race.'},
    {name:'Easy Walk / Cooldown',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Walk it off. Breathe through the nose. You are in.'}
  ]}
]};

const BENCH_WARM={name:'Warm-up',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Easy movement, then two light build-up sets of the first test. Do not test cold.'};
const BENCH_COOL={name:'Easy Walk / Cooldown',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Walk it off. Write a note on how it felt.'};
const BENCHMARK_CYCLE={ key:'benchmark', title:'Benchmark', blurb:'Five test days. Run it at the start of a block and again at the end. Every result writes straight to your benchmarks on the Progress tab.', days:{
  dumbbells:[
    { n:1, title:'Lower', focus:'Squat and hinge', duration:30, exercises:[BENCH_WARM,
      {name:'Goblet Squat',type:'bench',benchId:'goblet',prescription:'Heaviest 12',unit:'lb',rest:120,notes:'Work up in 3 or 4 sets. Record the heaviest load you squat for 12 clean reps, heels down and chest up. Stop the set the moment form bends.'},
      {name:'DB Romanian Deadlift',type:'bench',benchId:'rdl',prescription:'Heaviest 10',unit:'lb total, both dumbbells',rest:120,notes:'Heaviest pair you hinge for 10 with a flat back. Log the total of both dumbbells.'},BENCH_COOL]},
    { n:2, title:'Upper', focus:'Pull and push', duration:25, exercises:[BENCH_WARM,
      {name:'1-Arm DB Row',type:'bench',benchId:'row',prescription:'Heaviest 10 per side',unit:'lb',rest:120,notes:'No torso twist, elbow to the hip. The weight you row clean for 10 on your weaker side is the number.'},
      {name:'Push-Ups',type:'bench',benchId:'pushup',prescription:'Max clean reps',unit:'reps',rest:0,notes:'One set. Chest to a fist off the floor, body in one line. Stop at the first rep that is not clean.'},BENCH_COOL]},
    { n:3, title:'Carry & core', focus:'Grip and trunk', duration:25, exercises:[BENCH_WARM,
      {name:'Farmer Carry',type:'bench',benchId:'carry',prescription:'Heaviest 60 sec',unit:'lb total',seconds:60,rest:120,notes:'Heaviest pair you can carry for a full 60 seconds tall, without setting them down. Log the total.'},
      {name:'Plank',type:'bench',benchId:'plank',prescription:'Max hold',unit:'seconds',rest:0,notes:'Hips level, glutes tight. Stop when the hips sag or the shaking takes over. Log the seconds.'},BENCH_COOL]},
    { n:4, title:'Ruck', focus:'Load for 30 minutes', duration:35, exercises:[
      {name:'Weighted Walk / Ruck',type:'bench',benchId:'ruck',prescription:'30 min · log the load',unit:'lb carried',minutes:30,rest:0,notes:'Pick a load you can carry 30 minutes at a steady pace without stopping. Hills if you have them. That load is your number.'}]},
    { n:5, title:'Capacity', focus:'Twenty minutes of work', duration:30, exercises:()=>[BENCH_WARM,
      {...PROGRAM.Friday.exercises[1],type:'bench',benchId:'circuit',prescription:'20 min · count rounds',unit:'rounds',minutes:20,notes:PROGRAM.Friday.exercises[1].notes+' Quality rounds at your normal loads. Count them.'},BENCH_COOL]}
  ],
  bodyweight:[
    { n:1, title:'Lower', focus:'Squat ladder and single-leg hinge', duration:25, exercises:[BENCH_WARM,
      {name:'Squat Ladder',type:'bench',benchId:'squatlvl',prescription:'Highest level for 12',unit:'level',rest:120,notes:'Climb the ladder: bodyweight squat, then pause squat, split squat, rear-foot-elevated, Bulgarian split squat. Log the highest level you own for 12 clean reps.'},
      {name:'Single-Leg RDL',type:'bench',benchId:'slrdl',prescription:'Max balanced reps per leg',unit:'reps per leg',rest:0,notes:'No hopping, no toe-touch. Count the reps on your weaker leg.'},BENCH_COOL]},
    { n:2, title:'Upper', focus:'Pull and push', duration:25, exercises:[BENCH_WARM,
      {name:'Table Row',type:'bench',benchId:'tablerow',prescription:'Max clean reps · legs straight',unit:'reps',rest:120,notes:'Under a sturdy table or bar, body in one line, chest to the edge. Stop at the first rep that is not clean.'},
      {name:'Push-Ups',type:'bench',benchId:'pushup',prescription:'Max clean reps',unit:'reps',rest:0,notes:'One set. Chest to a fist off the floor. Stop at the first rep that is not clean.'},BENCH_COOL]},
    { n:3, title:'Carry & core', focus:'Pack and trunk', duration:25, exercises:[BENCH_WARM,
      {name:'Backpack Carry',type:'bench',benchId:'packcarry',prescription:'Heaviest 60 sec',unit:'lb',seconds:60,rest:120,notes:'Heaviest pack you can carry 60 seconds tall, straps snug. Weigh it on the bathroom scale.'},
      {name:'Plank',type:'bench',benchId:'plank',prescription:'Max hold',unit:'seconds',rest:0,notes:'Hips level, glutes tight. Log the seconds.'},BENCH_COOL]},
    { n:4, title:'Ruck', focus:'Load for 30 minutes', duration:35, exercises:[
      {name:'Weighted Walk / Ruck',type:'bench',benchId:'ruck',prescription:'30 min · log the load',unit:'lb carried',minutes:30,rest:0,notes:'Pick a load you can carry 30 minutes at a steady pace without stopping. Hills if you have them.'}]},
    { n:5, title:'Capacity', focus:'Twenty minutes of work', duration:30, exercises:()=>[BENCH_WARM,
      {...substituteExercise(PROGRAM.Friday.exercises[1],'bodyweight'),type:'bench',benchId:'circuit',prescription:'20 min · count rounds',unit:'rounds',minutes:20},BENCH_COOL]}
  ],
  gym:[
    { n:1, title:'Lower', focus:'Pull and squat', duration:35, exercises:[BENCH_WARM,
      {name:'Trap-Bar Deadlift',type:'bench',benchId:'trapbar',prescription:'Heaviest 5',unit:'lb, bar included',safety:'deadlift',rest:180,notes:'Work up in 4 or 5 sets. Heaviest 5 with a flat back and no grinding. Log the bar weight.'},
      {name:'Back Squat',type:'bench',benchId:'backsquat',prescription:'Heaviest 5',unit:'lb, bar included',safety:'rack',rest:180,notes:'Pins set. Heaviest 5 to parallel with the chest up. Log the bar weight.'},BENCH_COOL]},
    { n:2, title:'Upper', focus:'Press and pull', duration:30, exercises:[BENCH_WARM,
      {name:'Barbell Bench Press',type:'bench',benchId:'bench',prescription:'Heaviest 5',unit:'lb, bar included',safety:'bench',rest:180,notes:'Spotter or pins. Heaviest 5 with a pause on the chest. Log the bar weight.'},
      {name:'Pull-Ups',type:'bench',benchId:'pullups',prescription:'Max clean reps',unit:'reps',rest:0,notes:'Dead hang to chin over the bar, no kip. If you cannot do one, log lat pulldowns at body weight for reps instead.'},BENCH_COOL]},
    { n:3, title:'Carry & core', focus:'Grip and trunk', duration:25, exercises:[BENCH_WARM,
      {name:'Farmer Carry',type:'bench',benchId:'handles',prescription:'Heaviest 60 sec',unit:'lb total',seconds:60,rest:120,notes:'Farmer handles or the heaviest dumbbells. Full 60 seconds without setting down. Log the total.'},
      {name:'Plank',type:'bench',benchId:'plank',prescription:'Max hold',unit:'seconds',rest:0,notes:'Hips level, glutes tight. Log the seconds.'},BENCH_COOL]},
    { n:4, title:'Ruck', focus:'Pack on the stairs', duration:35, exercises:[
      {name:'Stair Climber Ruck',type:'bench',benchId:'stairs',prescription:'30 min · log the pack',unit:'lb pack',minutes:30,rest:0,notes:'Stair climber or incline treadmill at 10% or more. Pack load you can hold for 30 minutes at a steady pace. That load is the number.'}]},
    { n:5, title:'Capacity', focus:'Twenty minutes of work', duration:30, exercises:()=>[BENCH_WARM,
      {...PROGRAM.Friday.exercises[1],type:'bench',benchId:'circuit',prescription:'20 min · count rounds',unit:'rounds',minutes:20,notes:PROGRAM.Friday.exercises[1].notes+' Quality rounds at your normal loads. Count them.'},BENCH_COOL]}
  ]
}};

// ---------- Ruck track: 18 rucks over six weeks, three a week ----------
const RUCK_TRACK={ key:'ruck', title:'Ruck Track', blurb:'Eighteen rucks over six weeks, three a week: one steady, one on hills, one long. Load climbs from 10 to 30 lb and never past 20% of your body weight. Run it beside the program or on its own.' };
const RUCK_PLAN={ load:[10,15,20,20,25,30], steady:[20,25,30,30,35,40], hills:[20,24,24,28,30,30], long:[30,35,40,45,50,60], reps:[4,5,5,6,6,6] };
function ruckTrackDays(){ const days=[]; const warm={name:'Warm-up',prescription:'3 min',type:'time',minutes:3,rest:0,notes:'Walk easy for three minutes with the pack on. Then cinch the hip belt, snug the shoulder straps, nothing swinging.'};
  const cool={name:'Mobility',prescription:'5 min',type:'time',minutes:5,rest:0,notes:'Pack off. Calves, ankles, hips, hamstrings. Thirty seconds each. Check your feet for hot spots.'};
  for(let n=1;n<=18;n++){ const w=Math.ceil(n/3), slot=(n-1)%3, i=w-1, load=RUCK_PLAN.load[i]; let title,focus,main;
    if(slot===0){ const m=RUCK_PLAN.steady[i]; title='Steady'; focus=`${m} min · ${load} lb · flat`; main={name:'Weighted Walk / Ruck',prescription:`${m} min · ${load} lb`,type:'ruck',minutes:m,load,rest:0,notes:`Flat or rolling ground at a pace you could talk through. ${load} lb, or 20% of your body weight if that is less. Log the distance if you know it.`}; }
    else if(slot===1){ const m=RUCK_PLAN.hills[i], r=RUCK_PLAN.reps[i]; title='Hills'; focus=`${m} min · ${load} lb · ${r} climbs`; main={name:'Weighted Walk / Ruck',prescription:`${m} min · ${load} lb · ${r} × 2 min up`,type:'ruck',minutes:m,load,rest:0,notes:`After 4 easy minutes: ${r} rounds of 2 minutes hard uphill, 2 minutes easy down or flat. No hill? Stairs, a parking garage, or a treadmill at 8–12% incline. Short quick steps on the way up.`}; }
    else { const m=RUCK_PLAN.long[i]; const test=n===18; title=test?'5k ruck test':'Long'; focus=test?`3.1 miles for time · ${load} lb`:`${m} min · ${load} lb · long`; main=test?{name:'Weighted Walk / Ruck',prescription:`3.1 mi for time · ${load} lb`,type:'ruck',minutes:m,load,rest:0,notes:'Three point one miles as fast as you can walk it with the pack on. No running. Log the minutes and the load. This is the number you bring back next time.'}:{name:'Weighted Walk / Ruck',prescription:`${m} min · ${load} lb`,type:'ruck',minutes:m,load,rest:0,notes:`The long one. Steady pace, hills if you have them, water on the pack. ${m} minutes is the goal; stop early if a foot or a knee says so and log what you did.`}; }
    days.push({n,title,focus,week:w,duration:main.minutes+8,exercises:[warm,main,cool]}); }
  return days; }

// ---------- state ----------
function cycleState(){ const s=STORE.get('hr30_cycles',null)||{}; s.starthere=s.starthere||{}; s.ruck=s.ruck||{}; s.benchmark=s.benchmark||{}; s.benchmark.current=s.benchmark.current||{}; s.benchmark.runs=s.benchmark.runs||[]; return s; }
function saveCycleState(s){ STORE.set('hr30_cycles',s); }
function cycleModeKey(){ const m=equipmentMode(); return m==='gym'?'gym':m==='bodyweight'?'bodyweight':'dumbbells'; }
function cycleDef(kind){ return kind==='starthere'?START_HERE:kind==='ruck'?RUCK_TRACK:BENCHMARK_CYCLE; }
function cycleLength(kind){ return kind==='ruck'?18:5; }
function cycleDays(kind){ const mode=equipmentMode();
  if(kind==='ruck') return ruckTrackDays();
  if(kind==='starthere') return START_HERE.days.map(d=>{ const ex=typeof d.exercises==='function'?d.exercises():d.exercises; return {...d,exercises:ex.map(e=>d.raw?{...e}:{...substituteExercise(e,mode)})}; });
  return BENCHMARK_CYCLE.days[cycleModeKey()].map(d=>({...d,exercises:(typeof d.exercises==='function'?d.exercises():d.exercises).map(e=>({...e}))})); }
function cycleDone(kind){ const s=cycleState(); return kind==='starthere'?s.starthere:kind==='ruck'?s.ruck:s.benchmark.current; }
function cycleProgress(kind){ const done=cycleDone(kind); let c=0; for(let n=1;n<=cycleLength(kind);n++) if(done[n]) c++; return c; }

// ---------- UI ----------
function openCycle(kind){ const def=cycleDef(kind); const days=cycleDays(kind); const s=cycleState(); const done=cycleDone(kind); let next=null; for(let n=1;n<=cycleLength(kind);n++){ if(!done[n]){ next=n; break; } } const runs=s.benchmark.runs; const lastRun=kind==='benchmark'&&runs.length?runs[runs.length-1]:null;
  openModal(`<div class="close-row"><div><div class="kicker">${kind==='starthere'?'Orientation':kind==='ruck'?'Add-on track · any equipment':'Test cycle'}${kind==='ruck'?'':' · '+modeLabel(equipmentMode())}</div><h2>${def.title}</h2><p class="note" style="margin-top:6px">${def.blurb}</p></div><button class="icon-btn" onclick="closeModal()">×</button></div>
    ${lastRun?`<div class="notice" style="margin-bottom:12px">Last full cycle finished ${new Date(lastRun.completed).toLocaleDateString()}. Results live on the Progress tab.</div>`:''}
    <section class="card flat">${days.map(d=>`${d.week&&(d.n-1)%3===0?`<div class="kicker" style="margin:${d.n===1?0:14}px 0 4px">Week ${d.week} · ${RUCK_PLAN.load[d.week-1]} lb</div>`:''}<div class="weight-row"><div><strong>${d.n} · ${esc(d.title)}</strong><small>${esc(d.focus)}${done[d.n]?` · done ${new Date(done[d.n]).toLocaleDateString()}`:''}</small></div><button class="${d.n===next?'primary':'secondary'}" style="width:auto;margin:0;padding:10px 14px;white-space:nowrap" onclick="startCycleDay('${kind}',${d.n})">${done[d.n]?'AGAIN':'START'}</button></div>`).join('')}</section>
    ${next?'':`<button class="secondary" style="width:100%;margin-top:14px" onclick="resetCycle('${kind}')">${kind==='benchmark'?'START A NEW CYCLE':'RUN IT AGAIN'}</button>`}`); }
function startCycleDay(kind,n){ const def=cycleDef(kind); const d=cycleDays(kind).find(x=>x.n===n); if(!d) return;
  const w={title:kind==='ruck'?`Ruck ${n} · ${d.title} · week ${d.week}`:`${def.title} ${n} · ${d.title}`,focus:d.focus,duration:d.duration||30,exercises:d.exercises,mode:equipmentMode()};
  Alerts.unlock(); active={day:def.title,workout:w,index:0,set:1,logs:[],started:Date.now(),historyStack:[],mode:'workout',block:null,cycle:kind,cycleDay:n};
  openModal(workoutModal()); clearInterval(workoutTimer); workoutTimer=setInterval(tickTimers,500); }
function finishCycleDay(kind,n,entry){ const s=cycleState(); const now=new Date().toISOString();
  if(kind==='starthere'){ s.starthere[n]=now; }
  else if(kind==='ruck'){ s.ruck[n]=now; }
  else { s.benchmark.current[n]=now; s.benchmark.current.results=s.benchmark.current.results||{}; const b=getState().benchmarks, dates=STORE.get('hr30_benchDates',{});
    (entry.logs||[]).forEach(l=>{ if(l.type==='bench'&&l.benchId&&l.value>0){ b[l.benchId]=l.value; dates[l.benchId]=now; s.benchmark.current.results[l.benchId]=l.value; } });
    STORE.set('hr30_benchmarks',b); STORE.set('hr30_benchDates',dates);
    if([1,2,3,4,5].every(k=>s.benchmark.current[k])){ s.benchmark.runs.push({completed:now,mode:cycleModeKey(),results:s.benchmark.current.results}); s.benchmark.current={}; } }
  saveCycleState(s); }
function resetCycle(kind){ const s=cycleState(); if(kind==='starthere') s.starthere={}; else if(kind==='ruck') s.ruck={}; else s.benchmark.current={}; saveCycleState(s); openCycle(kind); }
function cyclesMarkup(){ const s=cycleState(); const sh=cycleProgress('starthere'), bm=cycleProgress('benchmark'), rk=cycleProgress('ruck'); const runs=s.benchmark.runs; const lastRun=runs.length?runs[runs.length-1]:null;
  const card=(kicker,status,what,when,btn,kind,hot)=>`<section class="card ${hot?'prime':''}" style="margin-bottom:12px"><div class="row" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px"><div><div class="kicker">${kicker}</div><h3 style="margin:6px 0 4px">${status}</h3></div></div><p class="sub">${what}</p><p class="note" style="margin-top:6px">${when}</p><button class="secondary" style="width:100%;margin-top:12px" onclick="openCycle('${kind}')">${btn}</button></section>`;
  return card('Start Here · orientation', sh>=5?'Complete':sh?`${sh} of 5 sessions done`:'Five short sessions', 'For a man new to training or new to this app. Day 1 teaches the five patterns with no weight. Days 2 and 3 find your working loads. Day 4 fits the pack on an easy ruck. Day 5 runs a short, easy circuit.', 'Run it before Week 1, or any time a movement feels foreign. About 20 to 25 minutes each.', sh>=5?'RUN IT AGAIN':sh?'CONTINUE START HERE':'BEGIN START HERE','starthere',sh<5&&getState().history.length<5)
   +card('Benchmark · test cycle', bm?`${bm} of 5 test days done`:lastRun?`Last full cycle ${new Date(lastRun.completed).toLocaleDateString()}`:'Five test days', 'One test day per capacity: lower, upper, carry and core, ruck, and the 20-minute circuit. Every result writes straight to your benchmarks on the Progress tab.', 'Run it at the start of a training block and again at the end. The second run shows how many numbers went up.', bm?'CONTINUE THE CYCLE':'RUN THE BENCHMARK CYCLE','benchmark',false)
   +card('Ruck Track · add-on', rk>=18?'Complete':rk?`${rk} of 18 rucks done`:'Six weeks · 18 rucks', 'Three rucks a week: one steady, one on hills with timed climbs, one long. Load climbs from 10 to 30 lb and never past 20% of your body weight. Week six ends with a 5k ruck for time.', 'Run it beside the weekly program when the pack is your weak point, or on its own when you only have the pack.', rk>=18?'RUN IT AGAIN':rk?'CONTINUE THE TRACK':'BEGIN THE RUCK TRACK','ruck',false); }
function startHereNudge(){ if(cycleProgress('starthere')>=5||getState().history.length>=5||localStorage.hr30_hideStartHere) return ''; const n=cycleProgress('starthere');
  return `<section class="card prime"><div class="kicker"><span class="led"></span>New here</div><h3 style="margin:6px 0 4px">Start Here · ${n?`day ${n+1} of 5`:'five short sessions'}</h3><p class="sub">Learn the patterns, find your loads, fit your pack, run one easy circuit. Then the week is yours.</p><div style="display:flex;gap:10px;margin-top:12px"><button class="primary" style="margin:0" onclick="openCycle('starthere')">${n?'CONTINUE':'BEGIN'}</button><button class="secondary" onclick="localStorage.hr30_hideStartHere=1;renderToday()">SKIP</button></div></section>`; }
function benchmarkStatusLine(){ const s=cycleState(); const runs=s.benchmark.runs; const cur=cycleProgress('benchmark'); if(cur) return `Benchmark cycle in progress · ${cur} of 5 days done.`;
  if(runs.length){ const last=runs[runs.length-1], prev=runs[runs.length-2]; const keys=Object.keys(last.results||{}); let up=0; if(prev&&prev.results) keys.forEach(k=>{ if(prev.results[k]&&last.results[k]>prev.results[k]) up++; }); return `Last full cycle ${new Date(last.completed).toLocaleDateString()}${prev?` · ${up} of ${keys.length} numbers up from the cycle before`:''}.`; }
  return 'Tap a number to set it by hand, or run the five-day cycle to test every one.'; }
