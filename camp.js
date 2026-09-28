/* HUNT READY 30 — Your Camp. Every logged session raises a piece of a hunting camp painted on the Today scene.
   Rules: nothing is ever torn down; sessions count, pounds do not; rest days keep the week. */

// ---------- state ----------
function campWeekKey(d){ const x=new Date(d); const day=(x.getDay()+6)%7; x.setHours(0,0,0,0); x.setDate(x.getDate()-day); return x.toISOString().slice(0,10); }
function campState(){
  const s=getState(), h=s.history||[];
  const byDay=d=>h.filter(x=>x.day===d).length;
  const legs=byDay('Monday'), upper=byDay('Tuesday')+byDay('Thursday'), rucks=byDay('Wednesday')+byDay('Saturday');
  const fridayDates=h.filter(x=>x.day==='Friday').map(x=>+new Date(x.date));
  const lastFri=fridayDates.length?Math.max(...fridayDates):0; const daysSinceFire=lastFri?(Date.now()-lastFri)/864e5:Infinity;
  const fire=daysSinceFire<=8?2:daysSinceFire<=15?1:0;
  const recentFridays=fridayDates.filter(t=>Date.now()-t<=28*864e5).length;
  const weeks={}; h.forEach(x=>{ const k=campWeekKey(x.date); weeks[k]=(weeks[k]||0)+1; });
  const kept=Object.values(weeks).filter(n=>n>=3).length;
  const thisWeek=weeks[campWeekKey(new Date())]||0;
  const arch=s.archery||[]; const tight=arch.some(a=>Number(a.group_size_in)>0&&Number(a.group_size_in)<=3);
  const range=(arch.length>=8||tight)?3:arch.length>=4?2:arch.length>=1?1:0;
  return { sessions:h.length, legs, upper, rucks, fire, fridays:fridayDates.length, recentFridays, stones:kept, thisWeek, archery:arch.length, tight, range,
    trail:Math.min(5,legs), rungs:Math.max(0,Math.min(6,legs-5)), platform:legs>=12,
    logs:Math.min(8,upper), roof:upper>=9, extras:upper>=12,
    woodRows:Math.min(4,Math.ceil(rucks/2)), cache:rucks>=8, meatPole:rucks>=12&&upper>=9,
    lantern:h.length>=5 };
}
function campStageWord(c){ const done=[c.platform,c.extras,c.cache,c.range>=3,c.stones>=12].filter(Boolean).length; if(c.sessions===0) return 'CLEARING'; if(done>=4) return 'READY'; if(c.roof||c.platform) return 'STANDING'; return 'RAISING'; }
function campBuildsFor(day,c){
  switch(day){
    case 'Monday': return c.legs<5?['trail',`Lower Body Strength cuts trail section ${c.legs+1} of 5.`]:c.legs<11?['rung',`Lower Body Strength adds ladder rung ${c.legs-4} of 6.`]:c.legs<12?['stand',`Lower Body Strength hangs the stand platform.`]:['stand','Lower Body Strength keeps the trail open.'];
    case 'Tuesday': case 'Thursday': return c.upper<8?['log',`${day==='Tuesday'?'Archery Upper Body':'Full-Body Strength'} lays cabin log ${c.upper+1} of 8.`]:c.upper<9?['roof',`${day==='Tuesday'?'Archery Upper Body':'Full-Body Strength'} puts the roof on the cabin.`]:c.upper<12?['roof',`${day==='Tuesday'?'Archery Upper Body':'Full-Body Strength'} finishes the roof, ${12-c.upper} to go before the antlers go up.`]:['banner','Rows and presses keep the cabin tight.'];
    case 'Wednesday': case 'Saturday': return c.rucks<8?['wood',`${day==='Wednesday'?'Ruck Day':'Easy Outdoor Day'} stacks the woodpile, ${c.rucks+1} of 8 loads.`]:c.rucks<12?['wood',`${day==='Wednesday'?'Ruck Day':'Easy Outdoor Day'} packs the cache, ${c.rucks+1} of 12.`]:['wood','Rucks keep the cache stocked.'];
    case 'Friday': return ['fire','Hunter Conditioning feeds the fire for the week.'];
    default: return ['stone', c.thisWeek>=3?'Rest kept. The week is already in the stones.':'Rest day. Three sessions this week add a memorial stone.'];
  }
}
function campBuiltPiece(day,c){ // what today's finished session added (state already includes it)
  switch(day){
    case 'Monday': return c.legs<=5?['trail',`Trail · section ${c.legs} of 5`,'Leg day cut the trail toward the stand.']:c.legs<=11?['rung',`Ladder · rung ${c.legs-5} of 6`,'Leg day put another rung on the stand ladder.']:c.legs===12?['stand','Stand platform · hung','Twelve leg days. The stand is up.']:['stand','Trail · kept open','The legs that carry you in are ready.'];
    case 'Tuesday': case 'Thursday': return c.upper<=8?['log',`Cabin wall · log ${c.upper} of 8`,`Rows and presses raised it. ${8-c.upper>0?`${8-c.upper} more and the roof goes on.`:'Next session puts the roof on.'}`]:c.upper<=11?['roof',`Roof · ${c.upper-8} of 3 courses`,'Wood shakes going on. Antlers go up when the roof is done.']:c.upper===12?['banner','Antlers and banner · up','The cabin is finished. Your mark is on the door.']:['log','Cabin · kept tight','Another log on the pile behind the cabin.'];
    case 'Wednesday': case 'Saturday': return c.rucks<=8?['wood',`Woodpile · load ${c.rucks} of 8`,'Pack weight stacked the pile.']:c.rucks<=12?['wood',`Cache · ${c.rucks-8} of 4 crates`,'Supplies packed in on your back.']:['wood','Cache · stocked','The camp eats because you carried it.'];
    case 'Friday': return ['fire','Fire · lit for the week','The circuit keeps the fire burning. Miss two Fridays and it burns low.'];
    default: return ['stone','Rest · kept','Recovery is stewardship. The camp holds.'];
  }
}

// ---------- card ----------
function campCard(c){
  const ICON={
    trail:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 40 C16 30 10 22 22 18 C34 14 30 8 42 6"/><path d="M14 32 h6 M22 22 h6 M30 12 h6"/></svg>`,
    cabin:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22 L24 8 L42 22"/><path d="M10 20 V40 H38 V20"/><path d="M10 27 H38 M10 34 H38"/><path d="M20 40 V30 H28 V40"/></svg>`,
    fire:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6 C30 14 36 18 36 27 A12 12 0 0 1 12 27 C12 20 17 16 18 12 C20 16 23 17 24 6 Z"/><path d="M8 42 L40 42"/></svg>`,
    wood:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="34" r="6"/><circle cx="34" cy="34" r="6"/><circle cx="24" cy="18" r="6"/><path d="M14 34 L24 18 L34 34"/></svg>`,
    range:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="26" r="16"/><circle cx="22" cy="26" r="10"/><circle cx="22" cy="26" r="4" fill="currentColor" stroke="none"/><path d="M22 26 L42 6"/><path d="M34 6 L42 6 L42 14"/></svg>`,
    stones:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="16" cy="36" rx="9" ry="5"/><ellipse cx="34" cy="36" rx="8" ry="5"/><ellipse cx="25" cy="26" rx="9" ry="5"/><ellipse cx="25" cy="16" rx="7" ry="4"/></svg>`};
  const ticks=(on,total,cls)=>{ let s=''; for(let i=0;i<total;i++) s+=`<i class="${i<on?cls:''}"></i>`; return `<div class="ticks">${s}</div>`; };
  const rows=[
    ['trail','Trail & stand', c.legs===0?'Leg days · not started':c.legs<5?`Leg days · ${c.legs} of 5 sections`:c.legs<11?`Leg days · ladder rung ${c.legs-5} of 6`:c.legs<12?'Leg days · platform next':'Complete · stand hung', Math.min(12,c.legs),12,'on'],
    ['cabin','Cabin', c.upper===0?'Rows & presses · footprint staked':c.upper<8?`Rows & presses · log ${c.upper} of 8`:c.upper<9?'Walls up · roof next':c.upper<12?`Roof · ${c.upper-8} of 3 courses`:'Roofed · antlers up', Math.min(12,c.upper),12,'on'],
    ['fire','Fire', c.fire===2?`Friday circuit · burning · ${c.recentFridays} of 4 weeks`:c.fire===1?'Friday circuit · burning low':c.fridays?'Friday circuit · out · light it Friday':'Friday circuit · unlit', c.recentFridays,4,'led'],
    ['wood','Woodpile & cache', c.rucks===0?'Rucks · 1 log':c.rucks<8?`Rucks · ${c.rucks} of 8 loads`:c.rucks<12?`Rucks · cache ${c.rucks-8} of 4`:'Rucks · stocked', Math.min(12,c.rucks),12,'on'],
    ['range','Range', c.range===0?'Archery · not started':c.range===1?`Archery · target butt set · ${c.archery} logged`:c.range===2?`Archery · bow rack up · ${c.archery} logged`:c.tight?'Archery · group under 3 in.':'Archery · arrows flying', c.range,3,'on'],
    ['stones','Memorial stones', c.stones?`${c.stones} week${c.stones===1?'':'s'} kept · 3 sessions a week`:'3 sessions in a week · 0 kept', Math.min(12,c.stones),12,'teal']];
  const [ , nextText]=campBuildsFor(dayName(),c);
  const done=todaysSessions().length>0;
  return `<section class="card camp-card"><div class="camp-head"><div><div class="kicker">Your camp · ${planLabel()}</div><h2>${campStageWord(c)}</h2></div><div class="camp-stat"><strong>${c.sessions}</strong><span>sessions</span></div></div>
    <div class="build-list">${rows.map(r=>`<div class="build ${r[3]===0?'dim':''}">${ICON[r[0]]}<div><b>${r[1]}</b><small>${r[2]}</small></div>${ticks(r[3],r[4],r[5])}</div>`).join('')}</div>
    <div class="notice camp-next"><b>${done?'Built today':'Today builds'}</b>${done?campBuiltPiece(dayName(),c)[1]:nextText}</div></section>`;
}
function campBuiltMarkup(day){ const c=campState(); const [piece,title,sub]=campBuiltPiece(day,c); return `<div class="built"><canvas class="piece" data-piece="${piece}" width="128" height="128"></canvas><div><div class="kicker" style="color:var(--gold)">Built today</div><b>${title}</b><small>${sub}</small></div></div>`; }

// ---------- painter ----------
const CAMP_SKY={
  base: {top:'#13312c',mid:'#2f7d72',band:'#d9a04a',horizon:'#f3c76e',dusk:'#5a4020',sun:'#fff0c0'},
  build:{top:'#1a3a2e',mid:'#3f8562',band:'#e0a44a',horizon:'#f7c364',dusk:'#5b4322',sun:'#fff2c8'},
  peak: {top:'#2a2a1e',mid:'#8a5a2a',band:'#e0a447',horizon:'#f6d27a',dusk:'#4a3a20',sun:'#fff4d0'},
  taper:{top:'#0c1c2b',mid:'#1f4b5d',band:'#6d99a0',horizon:'#d9b46a',dusk:'#3b3222',sun:'#f4e2ac'},
  none: {top:'#13312c',mid:'#2f7d72',band:'#b08040',horizon:'#d9b46a',dusk:'#4a3a24',sun:'#f4e2ac'}
};
const CAMP_W=375, CAMP_H=420;
let campSeed=7; function crnd(){ campSeed=(campSeed*1664525+1013904223)%4294967296; return campSeed/4294967296; }
function cRR(c,x,y,w,h,r){ r=Math.min(r,h/2,w/2); c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath(); }
function cOutline(c,a=.65,w=1.3){ c.lineWidth=w; c.strokeStyle=`rgba(18,10,4,${a})`; c.stroke(); }
function cHexA(h){ const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return `rgba(${r},${g},${b},A)`; }
function cGlow(c,x,y,r,col,a){ c.save(); c.globalCompositeOperation='lighter'; const g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,col.replace('A',a)); g.addColorStop(1,col.replace('A',0)); c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.restore(); }
function cBlob(c,x,y,rx,ry,col){ c.fillStyle=col; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.fill(); }
function cPoly(c,pts){ c.beginPath(); c.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) c.lineTo(pts[i][0],pts[i][1]); c.closePath(); }
function cLog(c,x,y,w,h,{end=true,tone=0}={}){
  const g=c.createLinearGradient(0,y,0,y+h); const L=['#9a6f3c','#8b6437','#7d5a31'][tone]||'#8b6437';
  g.addColorStop(0,L); g.addColorStop(.35,'#6f4a27'); g.addColorStop(.8,'#4a2e16'); g.addColorStop(1,'#2a1709');
  cRR(c,x,y,w,h,h/2); c.fillStyle=g; c.fill();
  if(w>14&&h>4){ c.strokeStyle='rgba(30,16,6,.35)'; c.lineWidth=.8; for(let i=0;i<3;i++){ const yy=y+h*(.3+i*.22); c.beginPath(); c.moveTo(x+6,yy); for(let px=x+6;px<x+w-6;px+=8) c.lineTo(px+8,yy+(crnd()-.5)*1.6); c.stroke(); } }
  c.strokeStyle='rgba(255,224,160,.45)'; c.lineWidth=1.4; c.beginPath(); c.moveTo(x+h/2,y+1.2); c.lineTo(x+w-h/2,y+1.2); c.stroke();
  cRR(c,x,y,w,h,h/2); cOutline(c,.7,1.2);
  if(end&&h>=5){ const r=h/2,cx=x+r,cy=y+r; const eg=c.createRadialGradient(cx-r*.3,cy-r*.3,0,cx,cy,r); eg.addColorStop(0,'#d9b27a'); eg.addColorStop(.6,'#a97f4c'); eg.addColorStop(1,'#5a3a1c'); c.fillStyle=eg; c.beginPath(); c.arc(cx,cy,r,0,7); c.fill(); c.strokeStyle='rgba(70,40,15,.6)'; c.lineWidth=.8; for(let k=r*.3;k<r;k+=r*.28){ c.beginPath(); c.arc(cx,cy,k,0,7); c.stroke(); } c.beginPath(); c.arc(cx,cy,r,0,7); cOutline(c,.7,1.2); }
}
function cStone(c,x,y,rx,ry,{moss=false,tone='#77746a'}={}){
  const g=c.createRadialGradient(x-rx*.35,y-ry*.5,1,x,y,rx*1.3); g.addColorStop(0,'#b5b0a0'); g.addColorStop(.45,tone); g.addColorStop(1,'#2e2c26');
  c.fillStyle=g; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.fill();
  if(moss){ c.fillStyle='rgba(96,132,60,.55)'; c.beginPath(); c.ellipse(x-rx*.2,y-ry*.55,rx*.55,ry*.35,-.3,0,7); c.fill(); }
  c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); cOutline(c,.6,1);
}
function cPine(c,x,base,h,w,{dark='#0f2418',light='#2a5a3a',rim='rgba(255,200,120,.35)'}={}){
  const tg=c.createLinearGradient(x-w*.08,0,x+w*.08,0); tg.addColorStop(0,'#1a110a'); tg.addColorStop(.5,'#4a3018'); tg.addColorStop(1,'#120b06');
  c.fillStyle=tg; c.fillRect(x-w*.07,base-h*.55,w*.14,h*.55);
  for(let i=4;i>=0;i--){ const ty=base-h*(.18+i*.17), tw=w*(1-i*.16), th=h*.28;
    c.fillStyle=dark; c.beginPath(); c.moveTo(x,ty-th);
    for(let k=0;k<=6;k++){ c.lineTo(x+tw/2*(k/6), ty-th+th*(k/6)+(k%2?2.5:0)); }
    c.lineTo(x+tw/2,ty); c.lineTo(x-tw/2,ty);
    for(let k=6;k>=0;k--){ c.lineTo(x-tw/2*(k/6), ty-th+th*(k/6)+(k%2?2.5:0)); }
    c.closePath(); c.fill();
    c.fillStyle=light; c.beginPath(); c.moveTo(x,ty-th); c.lineTo(x+tw/2,ty); c.lineTo(x+tw*.12,ty); c.closePath(); c.fill();
    c.strokeStyle=rim; c.lineWidth=1.2; c.beginPath(); c.moveTo(x,ty-th); c.lineTo(x+tw/2,ty); c.stroke();
    c.beginPath(); c.moveTo(x,ty-th); c.lineTo(x+tw/2,ty); c.lineTo(x-tw/2,ty); c.closePath(); cOutline(c,.35,1);
  }
}
function cGrass(c,x,y,col){ c.strokeStyle=col; c.lineWidth=1.1; for(let i=0;i<4;i++){ c.beginPath(); c.moveTo(x+i*1.6-3,y); c.quadraticCurveTo(x+i*1.6-3+(crnd()-.5)*3,y-4,x+i*1.6-3+(crnd()-.5)*5,y-7-crnd()*3); c.stroke(); } }
function cRidgeY(pts,x){ for(let i=0;i<pts.length-3;i++){ const [x1,y1]=pts[i],[x2,y2]=pts[i+1]; if(x>=x1&&x<=x2) return y1+(y2-y1)*((x-x1)/(x2-x1)); } return pts[0][1]; }

function campSky(c,S,LW){
  const g=c.createLinearGradient(0,0,0,CAMP_H); g.addColorStop(0,S.top); g.addColorStop(.2,S.mid); g.addColorStop(.36,S.band); g.addColorStop(.43,S.horizon); g.addColorStop(.58,S.dusk); g.addColorStop(1,'#0b100d');
  c.fillStyle=g; c.fillRect(0,0,LW,CAMP_H);
  const sx=LW/2+48; cGlow(c,sx,132,120,cHexA(S.sun),.55); cGlow(c,sx,132,30,cHexA('#ffffff'),.55);
  c.save(); c.globalAlpha=.22; for(let i=0;i<14;i++){ const cx=crnd()*LW,cy=40+crnd()*90,rx=30+crnd()*50; cBlob(c,cx,cy,rx,rx*.16,'#fff4dc'); } c.restore();
}
function campMountains(c,LW){
  const k=LW/375;
  const far=[[0,182],[40,140],[80,158],[120,120],[160,148],[200,104],[240,150],[290,112],[330,146],[375,126],[375,420],[0,420]].map(([x,y])=>[x*k,y]);
  const fg=c.createLinearGradient(0,100,0,220); fg.addColorStop(0,'#3d5c57'); fg.addColorStop(1,'#1f3a33'); c.fillStyle=fg; cPoly(c,far); c.fill();
  c.fillStyle='rgba(240,190,110,.28)'; [[[120,120],[160,148],[132,150]],[[200,104],[240,150],[214,150]],[[290,112],[330,146],[306,146]]].forEach(t=>{ cPoly(c,t.map(([x,y])=>[x*k,y])); c.fill(); });
  const hz=c.createLinearGradient(0,150,0,230); hz.addColorStop(0,'rgba(233,184,106,0)'); hz.addColorStop(1,'rgba(233,184,106,.5)'); c.fillStyle=hz; c.fillRect(0,150,LW,80);
  const mid=[[0,222],[50,192],[100,214],[150,178],[200,210],[250,186],[300,214],[340,190],[375,208],[375,420],[0,420]].map(([x,y])=>[x*k,y]);
  const mg=c.createLinearGradient(0,180,0,260); mg.addColorStop(0,'#1e3a2f'); mg.addColorStop(1,'#0f2118'); c.fillStyle=mg; cPoly(c,mid); c.fill();
  for(let x=-6;x<LW+10;x+=9){ const base=cRidgeY(mid,x)+3,h=16+crnd()*14; cPine(c,x,base,h,10,{dark:'#0d1f16',light:'#1c3a28',rim:'rgba(255,200,120,.18)'}); }
}
function campGround(c,LW,ox){
  const g=c.createLinearGradient(0,250,0,420); g.addColorStop(0,'#2b3d26'); g.addColorStop(.35,'#26331f'); g.addColorStop(1,'#0e150f');
  c.fillStyle=g; c.beginPath(); c.moveTo(0,268); c.bezierCurveTo(LW*.16,254,LW*.35,278,LW*.56,262); c.bezierCurveTo(LW*.75,250,LW*.88,266,LW,256); c.lineTo(LW,420); c.lineTo(0,420); c.closePath(); c.fill();
  for(let i=0;i<Math.round(260*LW/375);i++){ const x=crnd()*LW,y=262+crnd()*100,l=6+crnd()*14; c.strokeStyle=`rgba(${60+crnd()*60|0},${80+crnd()*50|0},${30+crnd()*30|0},${.18+crnd()*.25})`; c.lineWidth=1.5+crnd()*2; c.beginPath(); c.moveTo(x,y); c.lineTo(x+l,y+(crnd()-.5)*3); c.stroke(); }
  for(let i=0;i<Math.round(40*LW/375);i++) cGrass(c,crnd()*LW,275+crnd()*85,`rgba(${90+crnd()*50|0},${120+crnd()*40|0},60,.6)`);
  const e=c.createRadialGradient(ox+205,340,10,ox+205,340,150); e.addColorStop(0,'rgba(90,66,40,.55)'); e.addColorStop(1,'rgba(90,66,40,0)'); c.fillStyle=e; c.beginPath(); c.ellipse(ox+205,342,170,26,0,0,7); c.fill();
  const fg=c.createLinearGradient(0,255,0,300); fg.addColorStop(0,'rgba(233,184,106,.35)'); fg.addColorStop(1,'rgba(233,184,106,0)'); c.fillStyle=fg; c.fillRect(0,255,LW,45);
}
function campBigPine(c){ cPine(c,46,356,240,96,{dark:'#0b1c13',light:'#1f4a30',rim:'rgba(255,205,130,.4)'}); c.strokeStyle='rgba(20,12,6,.6)'; c.lineWidth=1; for(let y=250;y<352;y+=7){ c.beginPath(); c.moveTo(40+crnd()*3,y); c.lineTo(52-crnd()*3,y+2); c.stroke(); } }
function campTrail(c,sections){ const pts=[[-4,414],[18,398],[34,384],[42,372],[46,360],[50,349]];
  for(let i=0;i<5;i++){ const on=i<sections; const [x1,y1]=pts[i],[x2,y2]=pts[i+1];
    if(on){ c.strokeStyle='#6b4f2e'; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke(); c.strokeStyle='rgba(200,160,100,.35)'; c.lineWidth=5; c.beginPath(); c.moveTo(x1-1,y1-2); c.lineTo(x2-1,y2-2); c.stroke(); for(let k=0;k<3;k++) cStone(c,x1+(x2-x1)*(k/3)+(crnd()-.5)*6,y1+(y2-y1)*(k/3)+6,2.4,1.5,{tone:'#8a806c'}); }
    else { c.strokeStyle='rgba(255,220,160,.35)'; c.lineWidth=2; c.setLineDash([3,6]); c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke(); c.setLineDash([]); } } }
function campLadder(c,rungs,platform){ const x=46; if(!rungs&&!platform) return; const top=platform?246:352-rungs*15;
  cLog(c,x-16,top,4,352-top,{end:false,tone:2}); cLog(c,x+12,top,4,352-top,{end:false,tone:2});
  for(let i=0;i<rungs;i++) cLog(c,x-18,338-i*15,36,5,{end:false,tone:0});
  if(platform){ cLog(c,x-30,242,60,7,{end:true,tone:0}); cLog(c,x-30,222,3,20,{end:false,tone:2}); cLog(c,x+27,222,3,20,{end:false,tone:2}); cLog(c,x-30,222,60,3,{end:false,tone:1}); c.strokeStyle='#c9a76a'; c.lineWidth=1.2; c.beginPath(); c.moveTo(x-16,246); c.quadraticCurveTo(x,262,x+16,246); c.stroke(); } }
function campTent(c){ const g=c.createLinearGradient(92,0,156,0); g.addColorStop(0,'#3d3121'); g.addColorStop(.5,'#6b573a'); g.addColorStop(1,'#2a2114');
  cPoly(c,[[92,346],[124,292],[156,346]]); c.fillStyle=g; c.fill(); cOutline(c,.7,1.4); cPoly(c,[[124,292],[156,346],[140,346]]); c.fillStyle='rgba(20,12,4,.35)'; c.fill(); cPoly(c,[[116,346],[124,318],[132,346]]); c.fillStyle='#0d0906'; c.fill();
  c.strokeStyle='rgba(255,220,160,.5)'; c.lineWidth=1.6; c.beginPath(); c.moveTo(92,346); c.lineTo(124,292); c.stroke(); c.strokeStyle='#b9a27a'; c.lineWidth=1; c.beginPath(); c.moveTo(124,292); c.lineTo(84,344); c.stroke(); cLog(c,82,338,4,10,{end:false,tone:2}); }
function campMeatPole(c){ cLog(c,96,288,6,58,{end:false,tone:2}); cLog(c,146,288,6,58,{end:false,tone:2}); cLog(c,92,286,62,6,{end:true,tone:0}); c.strokeStyle='#c9c2b0'; c.lineWidth=1.3; c.beginPath(); c.moveTo(112,292); c.lineTo(112,304); c.moveTo(136,292); c.lineTo(136,304); c.stroke(); c.beginPath(); c.arc(112,306,2.5,3.5,6.4); c.stroke(); c.beginPath(); c.arc(136,306,2.5,3.5,6.4); c.stroke(); }
function campCrate(c,x,y,w,h){ const g=c.createLinearGradient(0,y,0,y+h); g.addColorStop(0,'#8a6236'); g.addColorStop(1,'#3a2413'); cRR(c,x,y,w,h,2); c.fillStyle=g; c.fill(); cOutline(c,.7,1.2); c.strokeStyle='rgba(30,16,6,.5)'; c.lineWidth=1; c.beginPath(); c.moveTo(x,y+h*.4); c.lineTo(x+w,y+h*.4); c.stroke(); c.strokeStyle='#5a5a5a'; c.lineWidth=2; c.beginPath(); c.moveTo(x+4,y); c.lineTo(x+4,y+h); c.moveTo(x+w-4,y); c.lineTo(x+w-4,y+h); c.stroke(); }
function campFlame(c,x,y,w,h,col){ c.fillStyle=col; c.beginPath(); c.moveTo(x-w,y); c.bezierCurveTo(x-w,y-h*.45,x-w*.4,y-h*.55,x-w*.3,y-h*.8); c.bezierCurveTo(x-w*.1,y-h*.6,x,y-h*.95,x+w*.1,y-h); c.bezierCurveTo(x+w*.2,y-h*.7,x+w*.6,y-h*.6,x+w,y); c.closePath(); c.fill(); }
function campFire(c,level){ const cx=185,cy=348;
  if(level>0) cGlow(c,cx,cy-8,level===1?60:95,'rgba(255,150,60,A)',level===1?.5:.75);
  c.save(); c.translate(cx,cy); c.rotate(.35); cLog(c,-14,-3,28,6,{end:true,tone:2}); c.rotate(-.7); cLog(c,-14,-3,28,6,{end:true,tone:2}); c.restore();
  if(level>0){ const h=level===1?22:36,w=level===1?9:13; c.save(); c.globalCompositeOperation='lighter'; campFlame(c,cx,cy,w,h,'rgba(255,110,30,.85)'); campFlame(c,cx,cy,w*.65,h*.7,'rgba(255,190,70,.9)'); campFlame(c,cx,cy,w*.35,h*.42,'rgba(255,245,200,.95)'); for(let i=0;i<(level===1?6:14);i++){ c.fillStyle=`rgba(255,${160+crnd()*80|0},60,${.5+crnd()*.5})`; c.beginPath(); c.arc(cx+(crnd()-.5)*30,cy-10-crnd()*50,.7+crnd()*1.1,0,7); c.fill(); } c.restore(); }
  [[-16,4],[-10,8],[-3,9],[5,9],[12,7],[17,2],[13,-3],[-13,-2]].forEach(([dx,dy],i)=>cStone(c,cx+dx,cy+dy,4.6,3,{moss:i%3===0,tone:'#6e6a5c'})); }
function campHunter(c,fire){ // seated on a log with his back to us, facing the fire
  const x=201, base=359, rim=fire?'rgba(255,190,110,.75)':'rgba(255,220,170,.35)';
  cBlob(c,x,base+2,20,4,'rgba(0,0,0,.45)');
  cLog(c,x-19,base-8,38,8,{end:true,tone:1});
  // boots either side of the log
  c.fillStyle='#1c1409'; cRR(c,x-15,base-4,7,5,2); c.fill(); cOutline(c,.6,1); cRR(c,x+8,base-4,7,5,2); c.fill(); cOutline(c,.6,1);
  // torso (jacket)
  const tg=c.createLinearGradient(x-12,0,x+12,0); tg.addColorStop(0,'#2e3320'); tg.addColorStop(.5,'#4d5231'); tg.addColorStop(1,'#242a19');
  cPoly(c,[[x-11,base-33],[x+11,base-33],[x+9,base-8],[x-9,base-8]]); c.fillStyle=tg; c.fill(); cOutline(c,.7,1.3);
  // pack straps
  c.strokeStyle='rgba(20,14,6,.6)'; c.lineWidth=2; c.beginPath(); c.moveTo(x-6,base-32); c.lineTo(x-4,base-12); c.moveTo(x+6,base-32); c.lineTo(x+4,base-12); c.stroke();
  // arms resting on knees
  c.strokeStyle='#3c4227'; c.lineWidth=5; c.lineCap='round'; c.beginPath(); c.moveTo(x-10,base-30); c.lineTo(x-16,base-16); c.moveTo(x+10,base-30); c.lineTo(x+16,base-16); c.stroke();
  c.strokeStyle='rgba(18,10,4,.55)'; c.lineWidth=1; c.beginPath(); c.moveTo(x-10,base-30); c.lineTo(x-16,base-16); c.moveTo(x+10,base-30); c.lineTo(x+16,base-16); c.stroke();
  // rim light on the shoulders (fire side is toward the viewer's far side, so the top edges catch it)
  c.strokeStyle=rim; c.lineWidth=1.6; c.beginPath(); c.moveTo(x-10,base-32); c.lineTo(x+10,base-32); c.stroke();
  // neck + head
  c.fillStyle='#3a2a1c'; c.fillRect(x-2.5,base-38,5,6);
  const hg=c.createRadialGradient(x,base-40,1,x,base-39,7); hg.addColorStop(0,'#5a4330'); hg.addColorStop(1,'#2a1c12'); c.fillStyle=hg; c.beginPath(); c.arc(x,base-40,6,0,7); c.fill(); cOutline(c,.7,1.2);
  // cap with brim, brim toward the fire (away from us)
  c.fillStyle='#3b3a24'; c.beginPath(); c.arc(x,base-42,6.5,Math.PI,0); c.closePath(); c.fill(); cOutline(c,.7,1.2);
  c.fillStyle='#2d2c1a'; c.beginPath(); c.ellipse(x,base-42,9,2.4,0,0,7); c.fill(); cOutline(c,.6,1);
  c.strokeStyle=rim; c.lineWidth=1.4; c.beginPath(); c.arc(x,base-42,6.5,Math.PI*1.15,Math.PI*1.85); c.stroke();
  // bow leaning on the log
  c.strokeStyle='#cbbf9c'; c.lineWidth=2; c.beginPath(); c.moveTo(x+22,base-34); c.quadraticCurveTo(x+30,base-20,x+24,base-2); c.stroke(); c.strokeStyle='rgba(230,220,190,.8)'; c.lineWidth=.8; c.beginPath(); c.moveTo(x+22,base-34); c.lineTo(x+24,base-2); c.stroke();
}
function campCairn(c,n){ const layout=[[0,0],[9,0],[-9,0],[4,-6],[-5,-6],[18,0],[-18,0],[13,-6],[-14,-6],[0,-12],[9,-12],[-9,-12]]; for(let i=0;i<Math.min(n,12);i++){ const [dx,dy]=layout[i]; cStone(c,228+dx,346+dy,5.8,3.8,{moss:i%4===1,tone:i%2?'#7c786a':'#8e8a7a'}); } if(n>=12){ c.strokeStyle='rgba(255,220,150,.7)'; c.lineWidth=1; c.beginPath(); c.moveTo(228,326); c.lineTo(228,338); c.moveTo(224,330); c.lineTo(232,330); c.stroke(); } }
function campLantern(c,x,base){ cLog(c,x-2,base-46,4,46,{end:false,tone:2}); cLog(c,x-2,base-46,16,3,{end:false,tone:1}); const ly=base-38; c.strokeStyle='#3a3a3a'; c.lineWidth=1.2; c.beginPath(); c.moveTo(x+12,base-43); c.lineTo(x+12,ly-6); c.stroke(); cGlow(c,x+12,ly+4,26,'rgba(255,200,90,A)',.7); cRR(c,x+8,ly-4,8,12,1.5); c.fillStyle='#2a2a2a'; c.fill(); cRR(c,x+9,ly-2,6,8,1); c.fillStyle='#ffd67a'; c.fill(); cRR(c,x+8,ly-4,8,12,1.5); cOutline(c,.8,1); c.fillStyle='#3a3a3a'; c.fillRect(x+7,ly-6,10,2); c.fillRect(x+7,ly+8,10,2); }
function campCabin(c,logs,roof,extras){ const x=256,w=76,base=348,lh=9;
  if(logs===0){ c.strokeStyle='rgba(255,220,160,.5)'; c.lineWidth=1.2; c.setLineDash([3,4]); c.strokeRect(x,base-3,w,3); c.setLineDash([]); [x,x+w/2,x+w].forEach(px=>cLog(c,px-2,base-14,4,14,{end:false,tone:2})); return; }
  cBlob(c,x+w/2,base+2,w*.62,5,'rgba(0,0,0,.45)');
  for(let i=0;i<logs;i++){ cLog(c,x-4,base-(i+1)*lh,w+8,lh-1,{end:true,tone:i%3}); }
  if(logs>0&&logs<8) cLog(c,x+w+10,base-8,26,7,{end:true,tone:0});
  if(roof){ const top=base-8*lh; const gg=c.createLinearGradient(0,top-34,0,top); gg.addColorStop(0,'#5b3c1f'); gg.addColorStop(1,'#3a2413'); cPoly(c,[[x-2,top],[x+w/2,top-34],[x+w+2,top]]); c.fillStyle=gg; c.fill(); cOutline(c,.6,1.2);
    for(let r=0;r<4;r++){ const y=top-34+r*8.5; const inset=(4-r)*9; for(let k=0;k<Math.ceil((w+8-inset*2)/7);k++){ const sx=x-4+inset+k*7; const sg=c.createLinearGradient(0,y,0,y+9); sg.addColorStop(0,r%2?'#7a5530':'#8a6238'); sg.addColorStop(1,'#3a2413'); cRR(c,sx,y,6.5,9,1.2); c.fillStyle=sg; c.fill(); cOutline(c,.5,.8); } }
    c.strokeStyle='rgba(255,220,160,.6)'; c.lineWidth=1.8; c.beginPath(); c.moveTo(x-10,top+2); c.lineTo(x+w/2,top-36); c.stroke();
    cBlob(c,x+18,top-8,7,3,'rgba(96,132,60,.5)'); cBlob(c,x+w-20,top-14,6,2.6,'rgba(96,132,60,.5)');
    for(let r=0;r<4;r++) for(let k=0;k<2;k++) cStone(c,x+w-16+k*7,top-26+r*6,3.8,3,{tone:'#7a7568'});
    const dg=c.createLinearGradient(0,base-30,0,base); dg.addColorStop(0,'#3a2816'); dg.addColorStop(1,'#1c120a'); cRR(c,x+8,base-30,16,30,3); c.fillStyle=dg; c.fill(); cOutline(c,.8,1.2); c.strokeStyle='#4a4a4a'; c.lineWidth=2; c.beginPath(); c.moveTo(x+9,base-22); c.lineTo(x+23,base-22); c.moveTo(x+9,base-10); c.lineTo(x+23,base-10); c.stroke(); c.fillStyle='#d9b26a'; c.beginPath(); c.arc(x+20,base-16,1.4,0,7); c.fill();
    cGlow(c,x+50,base-30,22,'rgba(255,200,90,A)',.6); cRR(c,x+42,base-36,16,13,1.5); c.fillStyle='#ffd27a'; c.fill(); c.strokeStyle='#2a1a0c'; c.lineWidth=1.6; c.beginPath(); c.moveTo(x+50,base-36); c.lineTo(x+50,base-23); c.moveTo(x+42,base-29.5); c.lineTo(x+58,base-29.5); c.stroke(); cRR(c,x+42,base-36,16,13,1.5); cOutline(c,.8,1.4); }
  if(extras){ const top=base-8*lh; c.strokeStyle='#e9dfc4'; c.lineWidth=1.8; c.lineCap='round'; c.beginPath(); c.moveTo(x+16,base-33); c.quadraticCurveTo(x+8,base-40,x+6,base-48); c.moveTo(x+10,base-40); c.lineTo(x+6,base-45); c.moveTo(x+16,base-33); c.quadraticCurveTo(x+24,base-40,x+26,base-48); c.moveTo(x+22,base-40); c.lineTo(x+26,base-45); c.stroke();
    const bg=c.createLinearGradient(0,top-20,0,top+18); bg.addColorStop(0,'#7a2a1e'); bg.addColorStop(1,'#4a1710'); cPoly(c,[[x+w/2-9,top-18],[x+w/2+9,top-18],[x+w/2+9,top+10],[x+w/2,top+18],[x+w/2-9,top+10]]); c.fillStyle=bg; c.fill(); cOutline(c,.7,1.2); c.strokeStyle='#e0b45c'; c.lineWidth=1.3; c.beginPath(); c.moveTo(x+w/2,top-8); c.lineTo(x+w/2,top+2); c.moveTo(x+w/2-4,top-4); c.quadraticCurveTo(x+w/2-2,top-10,x+w/2,top-9); c.moveTo(x+w/2+4,top-4); c.quadraticCurveTo(x+w/2+2,top-10,x+w/2,top-9); c.stroke();
    c.save(); c.globalAlpha=.5; [[0,-4,5],[6,-14,7],[14,-26,9],[24,-38,11]].forEach(([dx,dy,r])=>cBlob(c,x+w-8+dx,top-30+dy,r,r*.6,'#e9e2cc')); c.restore(); } }
function campWoodpile(c,rows){ if(!rows){ cLog(c,344,338,26,7,{end:true,tone:1}); return; } for(let r=0;r<rows;r++){ const n=6-r; for(let i=0;i<n;i++){ const cx=343+r*4+i*7.5,cy=344-r*7; const g=c.createRadialGradient(cx-1,cy-1,0,cx,cy,4); g.addColorStop(0,'#d9b27a'); g.addColorStop(.6,'#a97f4c'); g.addColorStop(1,'#4a2e16'); c.fillStyle=g; c.beginPath(); c.arc(cx,cy,3.8,0,7); c.fill(); c.beginPath(); c.arc(cx,cy,3.8,0,7); cOutline(c,.7,1); c.strokeStyle='rgba(70,40,15,.6)'; c.lineWidth=.7; c.beginPath(); c.arc(cx,cy,1.8,0,7); c.stroke(); } } }
function campRange(c,level){ if(!level) return; const g=c.createLinearGradient(0,280,0,302); g.addColorStop(0,'#c9a24e'); g.addColorStop(1,'#6b5224'); cRR(c,324,280,30,22,3); c.fillStyle=g; c.fill(); cOutline(c,.7,1.2); c.strokeStyle='rgba(60,40,10,.5)'; c.lineWidth=.8; for(let i=0;i<12;i++){ c.beginPath(); c.moveTo(326+crnd()*26,282+crnd()*18); c.lineTo(326+crnd()*26,282+crnd()*18); c.stroke(); } c.strokeStyle='#7a4a1a'; c.lineWidth=1.6; c.beginPath(); c.moveTo(324,288); c.lineTo(354,288); c.moveTo(324,295); c.lineTo(354,295); c.stroke();
  [['#f1ead8',7.5],['#c0392b',5],['#f1ead8',2.6],['#c0392b',1.1]].forEach(([col,r])=>{ c.fillStyle=col; c.beginPath(); c.arc(339,291,r,0,7); c.fill(); }); c.beginPath(); c.arc(339,291,7.5,0,7); cOutline(c,.6,1);
  if(level>1){ cLog(c,300,286,3.5,16,{end:false,tone:2}); cLog(c,314,286,3.5,16,{end:false,tone:2}); cLog(c,297,284,22,3.5,{end:false,tone:0}); c.strokeStyle='#efe6cf'; c.lineWidth=1.6; c.beginPath(); c.moveTo(308,287); c.quadraticCurveTo(316,294,308,301); c.stroke(); c.lineWidth=.9; c.beginPath(); c.moveTo(308,287); c.lineTo(308,301); c.stroke(); }
  if(level>2){ c.strokeStyle='#e7dcbd'; c.lineWidth=1; c.beginPath(); c.moveTo(339,291); c.lineTo(347,281); c.moveTo(336,290); c.lineTo(343,279); c.stroke(); } }

function paintCampScene(canvas,phase,camp){
  const cw=canvas.clientWidth||375, ch=canvas.clientHeight||CAMP_H; if(!cw||!ch) return;
  const dpr=Math.min(window.devicePixelRatio||1,2); canvas.width=Math.round(cw*dpr); canvas.height=Math.round(ch*dpr);
  const c=canvas.getContext('2d'); const s=ch/CAMP_H, LW=cw/s; c.setTransform(dpr*s,0,0,dpr*s,0,0);
  campSeed=7; const S=CAMP_SKY[phase]||CAMP_SKY.none; const ox=Math.max(0,(LW-CAMP_W)/2);
  campSky(c,S,LW); campMountains(c,LW); campGround(c,LW,ox);
  c.save(); c.translate(ox,0);
  campBigPine(c); campTrail(c,camp.trail); campLadder(c,camp.rungs,camp.platform);
  if(!camp.meatPole){ if(!camp.roof) campTent(c); } if(camp.meatPole) campMeatPole(c);
  campRange(c,camp.range); campCabin(c,camp.logs,camp.roof,camp.extras); campWoodpile(c,camp.woodRows); if(camp.cache) campCrate(c,344,camp.woodRows>=3?306:320,22,12);
  campCairn(c,camp.stones); if(camp.lantern) campLantern(c,160,346); campFire(c,camp.fire); campHunter(c,camp.fire);
  if(camp.fire>0){ c.save(); c.globalCompositeOperation='lighter'; const g=c.createRadialGradient(185,350,4,185,350,camp.fire===1?70:110); g.addColorStop(0,`rgba(255,140,50,${camp.fire===1?.35:.5})`); g.addColorStop(1,'rgba(255,140,50,0)'); c.fillStyle=g; c.beginPath(); c.ellipse(185,352,camp.fire===1?80:120,camp.fire===1?26:36,0,0,7); c.fill(); c.restore(); }
  c.restore();
  const v=c.createRadialGradient(LW/2,150,80,LW/2,220,Math.max(330,LW*.9)); v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(0,0,0,.5)'); c.fillStyle=v; c.fillRect(0,0,LW,CAMP_H);
  const b=c.createLinearGradient(0,330,0,420); b.addColorStop(0,'rgba(11,16,13,0)'); b.addColorStop(1,'rgba(11,16,13,1)'); c.fillStyle=b; c.fillRect(0,330,LW,90);
}
function paintCampPiece(canvas){ const c=canvas.getContext('2d'); c.setTransform(2,0,0,2,0,0); c.clearRect(0,0,64,64); campSeed=3;
  switch(canvas.dataset.piece){
    case 'log': cLog(c,6,24,52,16,{end:true,tone:0}); break;
    case 'rung': cLog(c,14,8,5,48,{end:false,tone:2}); cLog(c,45,8,5,48,{end:false,tone:2}); cLog(c,10,28,44,7,{end:false,tone:0}); break;
    case 'stand': cLog(c,6,30,52,8,{end:true,tone:0}); cLog(c,8,12,4,18,{end:false,tone:2}); cLog(c,52,12,4,18,{end:false,tone:2}); cLog(c,8,12,48,3,{end:false,tone:1}); break;
    case 'trail': c.strokeStyle='#6b4f2e'; c.lineWidth=14; c.lineCap='round'; c.beginPath(); c.moveTo(10,52); c.quadraticCurveTo(30,40,54,14); c.stroke(); cStone(c,22,46,4,2.5,{tone:'#8a806c'}); cStone(c,36,32,4,2.5,{tone:'#8a806c'}); cStone(c,48,20,3.5,2.2,{tone:'#8a806c'}); break;
    case 'roof': for(let r=0;r<3;r++) for(let k=0;k<5;k++){ const sg=c.createLinearGradient(0,14+r*13,0,28+r*13); sg.addColorStop(0,r%2?'#7a5530':'#8a6238'); sg.addColorStop(1,'#3a2413'); cRR(c,6+k*11+(r%2?5:0),14+r*13,10,14,2); c.fillStyle=sg; c.fill(); cOutline(c,.5,.8); } break;
    case 'banner': { const bg=c.createLinearGradient(0,8,0,56); bg.addColorStop(0,'#7a2a1e'); bg.addColorStop(1,'#4a1710'); cPoly(c,[[18,8],[46,8],[46,44],[32,56],[18,44]]); c.fillStyle=bg; c.fill(); cOutline(c,.7,1.2); c.strokeStyle='#e0b45c'; c.lineWidth=2; c.lineCap='round'; c.beginPath(); c.moveTo(32,24); c.lineTo(32,40); c.moveTo(26,30); c.quadraticCurveTo(28,20,32,22); c.moveTo(38,30); c.quadraticCurveTo(36,20,32,22); c.stroke(); break; }
    case 'wood': [[16,44],[32,44],[48,44],[24,30],[40,30],[32,16]].forEach(([cx,cy])=>{ const g=c.createRadialGradient(cx-2,cy-2,0,cx,cy,8); g.addColorStop(0,'#d9b27a'); g.addColorStop(.6,'#a97f4c'); g.addColorStop(1,'#4a2e16'); c.fillStyle=g; c.beginPath(); c.arc(cx,cy,7.5,0,7); c.fill(); c.beginPath(); c.arc(cx,cy,7.5,0,7); cOutline(c,.7,1); c.strokeStyle='rgba(70,40,15,.6)'; c.lineWidth=.8; c.beginPath(); c.arc(cx,cy,3.5,0,7); c.stroke(); }); break;
    case 'fire': cGlow(c,32,40,30,'rgba(255,150,60,A)',.7); c.save(); c.globalCompositeOperation='lighter'; campFlame(c,32,50,16,40,'rgba(255,110,30,.9)'); campFlame(c,32,50,10,28,'rgba(255,190,70,.95)'); campFlame(c,32,50,5,16,'rgba(255,245,200,1)'); c.restore(); c.save(); c.translate(32,52); c.rotate(.35); cLog(c,-16,-3,32,6,{end:true,tone:2}); c.rotate(-.7); cLog(c,-16,-3,32,6,{end:true,tone:2}); c.restore(); break;
    default: cStone(c,32,44,20,11,{moss:true}); cStone(c,32,30,14,8,{tone:'#8e8a7a'});
  }
}
function paintCampCanvases(){
  const cv=document.getElementById('campCanvas'); if(cv){ const phase=huntPlan()?.phase||'none'; try{ paintCampScene(cv,phase,campState()); }catch(e){ console.warn('camp paint',e); } }
  document.querySelectorAll('canvas.piece').forEach(p=>{ try{ paintCampPiece(p); }catch(e){} });
}
let campResizeT=null; window.addEventListener('resize',()=>{ clearTimeout(campResizeT); campResizeT=setTimeout(()=>{ if(document.getElementById('campCanvas')) paintCampCanvases(); },150); });
