/* Adapter for the existing standalone study engine. No progress migration. */
'use strict';
function installStudyPrograms() {
const CERT = window.STUDYGOAT_CATALOG;
for(const p of CERT.classTopics||[]){
  BANK[p.id]=p.bank;GLOSS[p.id]=p.gloss;
  TOPICS[p.id]={name:p.name,short:p.name,icon:'',course:p.course,lec:p.source,notes:p.notes.map(esc),gens:[()=>bankQ(p.id)]};
  LESSONS[p.id]=p.lessons.map(mkLesson);
}
let fsmState=CERT.classModels?.turnstile.initial, fsmTrace=[];
function fsmLab(){
  screen='fsm';LS=null;quiz=null;cur=null;activePrep=null;if(EX?.timer)clearInterval(EX.timer);drawNav();
  const m=CERT.classModels.turnstile;
  view.innerHTML=`<div class="card"><h2>Finite state machine lab</h2><p>CPSC 222: turnstile, row-vector matrices and the ending-01 DFA.</p><button onclick="home()">Back to class</button><h3>Turnstile</h3><p>State order: Locked, Unlocked. Rows represent current states; columns represent next states.</p><p>M_coin = [[0,1],[0,1]]<br>M_push = [[1,0],[1,0]]</p><button onclick="fsmEvent('coin')">Insert coin</button><button onclick="fsmEvent('push')">Push gate</button><button onclick="fsmReset()">Reset turnstile</button><div id="fsmState" role="status"></div><h3>Binary strings ending in 01</h3><p>Start q0; only q2 accepts. Empty input is allowed and rejected.</p><label>Binary string <input id="fsmWord" inputmode="numeric" placeholder="1101"></label><button onclick="fsmRecognize()">Trace string</button><div id="fsmResult" role="status"></div></div>`;
  fsmRender();
}
function fsmRender(){document.getElementById('fsmState').textContent='Current state: '+fsmState+'; vector '+(fsmState==='Locked'?'[1,0]':'[0,1]')+'. '+(fsmTrace.length?'Trace: '+fsmTrace.join(' → '):'No events yet.');}
function fsmEvent(event){const m=CERT.classModels.turnstile;if(!m.inputs.includes(event))return;if(!fsmTrace.length)fsmTrace.push(fsmState);fsmState=m.delta[fsmState][event];fsmTrace.push(event+': '+fsmState);fsmRender();}
function fsmReset(){fsmState=CERT.classModels.turnstile.initial;fsmTrace=[];fsmRender();}
function fsmRecognize(){
  const word=document.getElementById('fsmWord').value, out=document.getElementById('fsmResult');
  if(!/^[01]*$/.test(word)){out.textContent='Use only 0 and 1. Spaces and other symbols are not valid inputs.';return;}
  if(word.length>256){out.textContent='Use at most 256 symbols for a readable trace.';return;}
  const m=CERT.classModels.suffix01;let state=m.initial;const trace=[state];
  for(const ch of word){state=m.delta[state][ch];trace.push(ch+': '+state);}
  out.textContent=(word||'Empty string')+': '+trace.join(' → ')+'. Final state: '+state+'. '+(m.accepting.includes(state)?'Accepted.':'Rejected.');
}
const certTrack = () => CERT.tracks.find(t => t.id === CC);
const certTopic = id => CERT.tracks.flatMap(t => t.topics).find(t => t.id === id);
function certRefs(refs) {
  return refs.map(r => {
    const s = CERT.sources[r.source];
    return `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.publisher)}: ${esc(s.title)}, ${esc(r.section)}</a>`;
  }).join(' · ');
}
function certQuestion(topic, b) {
  const q = Q(esc(b.q), b.diagram ? `<img src="${esc(b.diagram)}" alt="${esc(b.diagramAlt)}" style="max-width:100%">` : '', esc(b.c[0]), b.c.slice(1).map(esc), `${esc(b.why)}<p class="hint">${esc(b.id)} · Objective ${esc(b.objectives.join(', '))}<br>${certRefs(b.refs)}</p>`);
  return Object.assign(q, {topic:topic.id, sourceId:b.id, objectives:b.objectives, refs:b.refs});
}
function registerCertificationCourses() {
  for (const t of CERT.tracks) {
    COURSES[t.id] = {code:t.code,name:t.name,icon:BADGE('Learn','#77d8c0'),prof:`${t.version} · ${t.status}`,color:'#77d8c0',kind:'certification',foot:t.notice};
    for (const p of t.topics) {
      BANK[p.id] = p.bank.map(b => ({...b, why:certQuestion(p,b).why}));
      GLOSS[p.id] = p.gloss;
      TOPICS[p.id] = {name:p.name,short:p.name,icon:'',course:t.id,lec:'Objectives '+p.objectives.join(', '),notes:p.notes.map(esc),gens:[()=>certQuestion(p,pick(p.bank))]};
      LESSONS[p.id] = p.lessons.map(l => ({...mkLesson(l),gen:()=>certQuestion(p,pick(p.bank))}));
    }
  }
}
registerCertificationCourses();
// Optional AI additions cannot silently enter the source-checked built-in banks.
const registerUserCourses = registerCustom;
registerCustom = function() { registerUserCourses(); registerCertificationCourses(); };
const legacyRes = resHTML;
resHTML = function(id, open) {
  const classTopic=(CERT.classTopics||[]).find(p=>p.id===id);if(classTopic)return `<details class="res" ${open?'open':''}><summary>Lesson source</summary><p>${esc(classTopic.source)}</p></details>`;
  const p = certTopic(id);
  return p ? `<details class="res" ${open?'open':''}><summary>Sources and coverage</summary><p>Partial coverage: ${esc(p.objectives.join(', '))}</p>${certRefs(p.refs)}</details>` : legacyRes(id,open);
};
const legacyNav = drawNav;
drawNav = function() {
  if(screen==='driving'){
    // Directory navigation is global, while the selected course and its progress stay intact.
    screen='menu';
    try{legacyNav();}finally{screen='driving';}
    document.getElementById('sub').textContent='Driving Tests · All 50 states and DC';
    return;
  }
  legacyNav();
  if (!certTrack() || screen === 'menu') return;
  // Keep existing tools available for university courses. Verified tracks use sourced study modes.
  [...nav.querySelectorAll('button')].forEach(b=>{
    const action=b.getAttribute('onclick')||'';
    if (/^(tutor|agent|builder|testReview)\(/.test(action)) b.remove();
    if (action==='resources()') { b.textContent='Sources & coverage'; b.setAttribute('onclick','certSources()'); }
  });
};
const legacyHome = home;
home = function() {
  if (!certTrack()) {legacyHome();if(CC==='cpsc222')view.insertAdjacentHTML('afterbegin','<div class="card"><button onclick="fsmLab()">Open finite state machine lab</button></div>');return;}
  _home();
  view.insertAdjacentHTML('afterbegin', certNotice()+`<div class="row"><button onclick="certSources()">${certTrack().curriculum?'All 16 chapters & coverage':'Sources & coverage'}</button><button onclick="examSetup()">Practice test</button></div>`);
};
function certNotice() {
  const t=certTrack();
  const used=new Set(t.topics.flatMap(p=>p.refs.map(r=>r.source)));
  const stale=[...used].some(id=>new Date(CERT.sources[id].reviewBy+'T23:59:59Z')<new Date());
  return `<div class="card"><h2>${esc(t.code)}: ${esc(t.status)} coverage</h2><p>${esc(t.notice)}</p><p class="hint">Sources checked ${esc(t.checked)}. ${stale?'Source review is overdue. Recheck official sources before relying on this content.':''} Independent study aid. No affiliation, credit, certification or pass guarantee.</p></div>`;
}
function certSources() {
  screen='sources';LS=null;cur=null;quiz=null;activePrep=null;drawNav();const t=certTrack();
  view.innerHTML=certNotice()+`<div class="card"><h3>Coverage checklist</h3><p>Listed objectives have introductory coverage only. A topic is not a complete objective.</p>${t.topics.map(p=>`<p>${esc(p.name)}: ${esc(p.objectives.join(', '))} · ${p.bank.length} checked questions<br>${certRefs(p.refs)}</p>`).join('')}<h3>Remaining work</h3><ul>${t.gaps.map(g=>`<li>${esc(g)}</li>`).join('')}</ul><h3>Source register</h3>${[...new Set(t.topics.flatMap(p=>p.refs.map(r=>r.source)))].map(id=>{const s=CERT.sources[id];return `<p>${certRefs([{source:id,section:s.sections.join(', ')}])}<br>${esc(s.version)} · Effective: ${esc(s.effective)}<br>Checked ${esc(s.checked)} · Review by ${esc(s.reviewBy)}<br>${esc(s.rights)}</p>`}).join('')}</div>`;
  if(t.curriculum)view.insertAdjacentHTML('afterbegin',certAchievements(t)+certCurriculum(t));
}
function certAchievements(t) {
  if(!t.achievements)return '';
  return `<div class="card" id="achievementMap"><h2>CAP achievement study map</h2><p>Select your next achievement or milestone. These are study summaries, not complete promotion checklists. Official assessments and squadron approval are required. Aerospace assignments are listed for planning; aerospace lessons are still pending.</p>${t.achievements.map(a=>`<details><summary>${esc(a.title)}${a.status==='needs verification'?' (needs verification)':''}</summary><p>${esc(a.leadership)}</p><p>Aerospace: ${esc(a.aerospace)}</p><ul>${a.actions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p><a href="${esc(a.url)}" target="_blank" rel="noopener">Official requirements: ${esc(a.title)}</a> · Checked ${esc(a.checked)}</p>${a.chapters.map(n=>`<button onclick="startChapterPractice(${n})">Review chapter ${n}</button>`).join('')}</details>`).join('')}</div>`;
}
function certCurriculum(t) {
  return `<div class="card" id="chapterCoverage"><h2>Learn to Lead: all 16 chapters</h2><p>Every chapter has selected lessons and original practice. Partial means the chapter still has uncovered objectives. Study the complete official reading as well. Chapter practice uses only that chapter's available topics.</p>${[1,2,3,4].map(v=>`<h3>Volume ${v}</h3>${t.curriculum.filter(c=>c.volume===v).map(c=>`<section><h4>Chapter ${c.chapter}: ${esc(c.title)}</h4><p>${esc(c.status)} · <a href="${esc(c.url)}" target="_blank" rel="noopener">Read official chapter ${c.chapter}</a></p>${c.topics.map(id=>`<button onclick="learn('${id}',0)">Study ${esc(certTopic(id).name)}</button>`).join('')}<button onclick="startChapterPractice(${c.chapter})">Practice chapter ${c.chapter}</button></section>`).join('')}`).join('')}</div>`;
}
function drivingDirectory() {
  screen='driving';LS=null;quiz=null;cur=null;activePrep=null;drawNav();
  view.innerHTML=`<div class="card"><button onclick="menu()">Back to categories</button><h2>Driving Tests: all 50 states and DC</h2><label>Search states <input id="stateSearch" type="search" placeholder="State name or abbreviation" oninput="filterDrivingStates()"></label><p id="stateSearchStatus" role="status"></p><p>Choose your jurisdiction. National safety foundations are shared across all 50 states and DC. ${CERT.drivingJurisdictions.filter(j=>j.track).length} states also have selected state-specific lessons. National foundations do not verify your state manual, traffic laws or permit-test requirements.</p><label>State or district <select id="drivingState" style="display:block;width:100%;max-width:100%;box-sizing:border-box">${CERT.drivingJurisdictions.map(j=>`<option value="${j.code}">${esc(j.name)}: ${j.track?'state-specific partial course':'national foundations only'}</option>`).join('')}</select></label><button onclick="openDrivingState()">View availability</button><div id="drivingAvailability" aria-live="polite"></div><button onclick="menu()">Back to courses</button></div>`;
  document.getElementById('drivingState').value='US-AZ';openDrivingState();
}
function filterDrivingStates(){
  const query=document.getElementById('stateSearch').value.trim().toLocaleLowerCase();
  const matches=CERT.drivingJurisdictions.filter(j=>(j.name+' '+j.code.replace('US-','')).toLocaleLowerCase().includes(query));
  const select=document.getElementById('drivingState');select.innerHTML=matches.map(j=>`<option value="${esc(j.code)}">${esc(j.name)}: ${j.track?'state-specific partial course':'national foundations only'}</option>`).join('');
  const exact=matches.find(j=>j.name.toLocaleLowerCase()===query||j.code.replace('US-','').toLocaleLowerCase()===query);
  if(exact)select.value=exact.code;
  document.getElementById('stateSearchStatus').textContent=matches.length?matches.length+' jurisdictions found':'No states match your search.';
  if(matches.length)openDrivingState();else document.getElementById('drivingAvailability').textContent='Try another state name or abbreviation.';
}
function openDrivingState() {
  const j=CERT.drivingJurisdictions.find(j=>j.code===document.getElementById('drivingState').value);if(!j)return;
  document.getElementById('drivingAvailability').innerHTML=`<h3>${esc(j.name)}: ${j.track?'partial course':'national foundations only'}</h3>${j.track?`<p>Use the complete current official manual alongside this selected practice.</p><button onclick="enterCourse('${j.track}')">Open ${esc(j.name)} driving prep</button>`:'<p>State-specific permit lessons and questions are not built yet. The shared national course below covers safety principles only.</p>'}<p>Shared national material: attention, distraction, speed and seat-belt safety. This is the same four lessons and 16 questions for every jurisdiction.</p><button onclick="enterCourse('drivingfoundations')">Study national driving foundations</button><p><a href="https://www.usa.gov/state-motor-vehicle-services" target="_blank" rel="noopener">Find state motor vehicle services through USAGov</a>. Locate the current official driver manual and permit requirements for ${esc(j.name)}.</p>`;
}
const legacyMenu=menu;
let courseCategory='classes';
function openCourseCategory(category){
  if(category==='driving')return drivingDirectory();
  courseCategory=category==='certifications'?'certifications':'classes';
  legacyMenu();
  const cards=[...view.querySelectorAll('.course')];
  const ids=Object.keys(COURSES);
  const kept=cards.slice(0,ids.length).filter((card,i)=>{
    const t=CERT.tracks.find(t=>t.id===ids[i]);
    const match=courseCategory==='classes'?!t:!!t&&!t.jurisdiction;
    if(match&&courseCategory==='classes'){
      const line=card.querySelector('.muted');
      if(line){const st=courseStats(ids[i]);line.textContent=st.ids.length+' topics · '+st.lt+' lessons';}
    }
    return match;
  });
  const title=courseCategory==='classes'?'Classes':'Certifications';
  view.innerHTML=`<div class="card"><button onclick="menu()">Back to categories</button><h2>${title}</h2><label>Search ${title.toLowerCase()} <input id="courseSearch" type="search" placeholder="Search by name or course code"></label><p id="courseSearchStatus" role="status"></p></div><div class="menu" id="categoryCourses"></div>`;
  const grid=document.getElementById('categoryCourses'),input=document.getElementById('courseSearch');
  const update=()=>{const query=input.value.trim().toLocaleLowerCase();const matches=kept.filter(c=>c.textContent.toLocaleLowerCase().includes(query));grid.replaceChildren(...matches);document.getElementById('courseSearchStatus').textContent=matches.length?matches.length+' '+(matches.length===1?'course':'courses')+' found':'No courses match your search.';};
  input.addEventListener('input',update);update();
  if(courseCategory==='classes')view.insertAdjacentHTML('beforeend','<div class="card"><h3>Class tools</h3><button onclick="builder()">Upload & build a class</button><button onclick="testReview(true)">Review a graded test</button></div>');
}
menu=function(){
  screen='menu';LS=null;quiz=null;cur=null;activePrep=null;if(EX?.timer)clearInterval(EX.timer);drawNav();
  const classCount=Object.keys(COURSES).filter(id=>!CERT.tracks.some(t=>t.id===id)).length;
  const certCount=CERT.tracks.filter(t=>!t.jurisdiction).length;
  view.innerHTML=`<div class="card"><h2>What are you studying?</h2><p>Choose a category, then search for your course or state.</p></div><div class="menu" id="courseCategories"><button class="card" onclick="openCourseCategory('classes')"><h2>Classes</h2><p>${classCount} classes · University and custom courses</p></button><button class="card" onclick="openCourseCategory('certifications')"><h2>Certifications</h2><p>${certCount} study programs · Includes FAA Part 107 drone prep and CAP</p></button><button class="card" onclick="openCourseCategory('driving')"><h2>Driving Tests</h2><p>All 50 states and DC · National foundations available everywhere · ${CERT.drivingJurisdictions.filter(j=>j.track).length} state-specific partial courses</p></button></div>`;
};
const legacyLearnHome=learnHome;
learnHome=function(){legacyLearnHome();if(certTrack()){
  const b=view.querySelector('[onclick="resources()"]');if(b)b.textContent='Sources & coverage';
  view.querySelectorAll('.path .chip').forEach(el=>{el.setAttribute('role','button');el.tabIndex=0;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}};});
}};
const legacyResources=resources;
resources=function(){if(certTrack())return certSources();return legacyResources();};
const legacyShow=show;
show=function(...args){legacyShow(...args);if(certTrack())document.querySelector('[onclick="askTutorQ()"]')?.remove();};
const legacyExamSetup=examSetup;
examSetup=function(){
  const t=certTrack();if(!t)return legacyExamSetup();
  screen='exam';LS=null;quiz=null;cur=null;rev=null;activePrep=null;if(EX?.timer)clearInterval(EX.timer);EX=null;drawNav();
  view.innerHTML=certNotice()+`<div class="card"><h2>${t.exam.mode==='official-pool'?'Element 2 exam-style practice':'Foundation practice test'}</h2><p>${t.exam.mode==='official-pool'?'35 questions, one from each official group. The timer is optional practice pacing, not an FCC time requirement.':'A short quiz from the available slice, without duplicate questions. This is not a full exam simulation.'}</p><label>Practice timer <select id="certMinutes"><option value="0">Untimed</option><option value="10">10 minutes</option><option value="30">30 minutes</option></select></label><div class="row"><button class="primary" onclick="startCertExam()">Start practice</button></div></div>`;
};
function startCertExam(){
  const t=certTrack();let entries=t.topics.flatMap(p=>p.bank.map(b=>({p,b})));
  if(t.exam.mode==='official-pool')entries=[...new Set(entries.map(e=>e.b.group))].sort().map(g=>pick(entries.filter(e=>e.b.group===g)));
  else entries=shuffle(entries).slice(0,t.exam.count);
  const m=Number(document.getElementById('certMinutes').value);
  runCertEntries(entries,m);
}
function startChapterPractice(number){
  const t=certTrack(),chapter=t?.curriculum?.find(c=>c.chapter===number);if(!chapter)return;
  const entries=shuffle(t.topics.filter(p=>chapter.topics.includes(p.id)).flatMap(p=>p.bank.map(b=>({p,b})))).slice(0,10);
  runCertEntries(entries,0);
  view.insertAdjacentHTML('afterbegin',`<p>Chapter ${chapter.chapter}: ${esc(chapter.title)}. Selected practice only, not a complete chapter examination.</p>`);
}
function runCertEntries(entries,m){
  if(EX?.timer)clearInterval(EX.timer);
  screen='exam';LS=null;quiz=null;cur=null;rev=null;activePrep=null;drawNav();
  const items=entries.map(({p,b})=>({type:'mc',topic:p.id,q:certQuestion(p,b),pts:1}));
  EX={v2:true,items,i:0,ans:{},flag:{},ids:[...new Set(entries.map(e=>e.p.id))],types:['mc'],n:items.length,m,end:m?Date.now()+m*60000:null,start:Date.now(),timer:null};
  view.innerHTML='<div class="card" id="qc"></div>';if(EX.end)EX.timer=setInterval(exTick,1000);exDraw();
}
const legacySubmit=exSubmit;
exSubmit=function(timeUp){
  const t=certTrack();if(!EX)return;
  legacySubmit(timeUp);
  if(t){
    const msg=view.querySelector('.score p');if(msg)msg.textContent=(timeUp?'Time ran out. ':'')+'Practice result only. This does not establish official exam readiness or certification.';
    view.querySelectorAll('button').forEach(b=>{if(/^(tutor|tutorAbout)\(/.test(b.getAttribute('onclick')||''))b.remove();});
  }
};
const legacyEndQuiz=endQuiz;
endQuiz=function(){legacyEndQuiz();if(certTrack()){const p=view.querySelector('.card > p');if(p)p.textContent='Practice result only. Review missed questions and the coverage gaps.';}};
// Existing answer-key formats remain unchanged; stable IDs prevent same-length prompt collisions.
const legacyQid=qid;
qid=function(q){return q.sourceId ? q.topic+'|'+q.sourceId : legacyQid(q);};
const legacyRecordMiss=recordMiss;
recordMiss=function(q){legacyRecordMiss(q);const m=(S.missed||[]).find(m=>m.id===qid(q));if(m&&q.sourceId)Object.assign(m,{sourceId:q.sourceId,objectives:q.objectives,refs:q.refs});};
// Export a self-contained app without saved progress, uploaded documents or API keys.
const basePristine=getPristine;
getPristine=function(){
  const d=new DOMParser().parseFromString(basePristine(),'text/html');
  const catalog=d.createElement('script');
  catalog.textContent='window.STUDYGOAT_CATALOG = '+JSON.stringify(CERT).replace(/</g,'\\u003c')+';';
  d.body.append(catalog);
  const adapter=d.createElement('script');
  adapter.textContent=installStudyPrograms.toString()+';installStudyPrograms();';
  d.body.append(adapter);
  return '<!DOCTYPE html>\n'+d.documentElement.outerHTML;
};
Object.assign(window,{fsmLab,fsmEvent,fsmReset,fsmRecognize,certSources,startCertExam,startChapterPractice,drivingDirectory,openDrivingState,openCourseCategory,filterDrivingStates});
menu();
}
installStudyPrograms();
