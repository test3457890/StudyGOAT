/* Adapter for the existing standalone study engine. No progress migration. */
'use strict';
function installStudyPrograms() {
const CERT = window.STUDYGOAT_CATALOG;
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
  const p = certTopic(id);
  return p ? `<details class="res" ${open?'open':''}><summary>Sources and coverage</summary><p>Partial coverage: ${esc(p.objectives.join(', '))}</p>${certRefs(p.refs)}</details>` : legacyRes(id,open);
};
const legacyNav = drawNav;
drawNav = function() {
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
  if (!certTrack()) return legacyHome();
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
  if(t.curriculum)view.insertAdjacentHTML('afterbegin',certCurriculum(t));
}
function certCurriculum(t) {
  return `<div class="card" id="chapterCoverage"><h2>Learn to Lead: all 16 chapters</h2><p>Partial means selected lessons and questions. Reading only means the official chapter is linked, with no StudyGOAT lessons yet. Neither status means full test preparation.</p>${[1,2,3,4].map(v=>`<h3>Volume ${v}</h3>${t.curriculum.filter(c=>c.volume===v).map(c=>`<section><h4>Chapter ${c.chapter}: ${esc(c.title)}</h4><p>${esc(c.status)} · <a href="${esc(c.url)}" target="_blank" rel="noopener">Read official chapter ${c.chapter}</a></p>${c.topics.map(id=>`<button onclick="learn('${id}',0)">Study ${esc(certTopic(id).name)}</button>`).join('')}</section>`).join('')}`).join('')}</div>`;
}
function drivingDirectory() {
  screen='driving';LS=null;quiz=null;cur=null;activePrep=null;drawNav();
  view.innerHTML=`<div class="card"><h2>State driving prep</h2><p>Choose your jurisdiction. Partial courses cover selected topics only. Planned states have no lessons or practice questions yet. Rules from one state must not be used as another state's study guide.</p><label>State or district <select id="drivingState">${CERT.drivingJurisdictions.map(j=>`<option value="${j.code}">${esc(j.name)}: ${j.track?'partial course':'planned'}</option>`).join('')}</select></label><button onclick="openDrivingState()">View availability</button><div id="drivingAvailability" aria-live="polite"></div><button onclick="menu()">Back to courses</button></div>`;
  document.getElementById('drivingState').value='US-AZ';openDrivingState();
}
function openDrivingState() {
  const j=CERT.drivingJurisdictions.find(j=>j.code===document.getElementById('drivingState').value);
  document.getElementById('drivingAvailability').innerHTML=j.track?`<h3>${esc(j.name)}: partial course</h3><p>Use the complete current official manual alongside this selected practice.</p><button onclick="enterCourse('${j.track}')">Open ${esc(j.name)} driving prep</button>`:`<h3>${esc(j.name)}: planned</h3><p>No study content is available for this jurisdiction yet. Official manual verification, lessons, questions and review are still required.</p>`;
}
const legacyMenu=menu;
menu=function(){legacyMenu();view.insertAdjacentHTML('afterbegin','<div class="card"><h2>Find driving prep by state</h2><p>Availability for all 50 states and the District of Columbia.</p><button onclick="drivingDirectory()">Choose a state</button></div>');};
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
  const items=entries.map(({p,b})=>({type:'mc',topic:p.id,q:certQuestion(p,b),pts:1}));
  const m=Number(document.getElementById('certMinutes').value);
  EX={v2:true,items,i:0,ans:{},flag:{},ids:t.topics.map(p=>p.id),types:['mc'],n:items.length,m,end:m?Date.now()+m*60000:null,start:Date.now(),timer:null};
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
Object.assign(window,{certSources,startCertExam,drivingDirectory,openDrivingState});
menu();
}
installStudyPrograms();
