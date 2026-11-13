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
  view.innerHTML=`<div class="card"><h2>Finite state machine lab</h2><p>CPSC 222: turnstile, row-vector matrices, the ending-01 DFA and a keypad lock.</p><button onclick="home()">Back to class</button><h3>Turnstile</h3><p>State order: Locked, Unlocked. Rows represent current states; columns represent next states.</p><p>M_coin = [[0,1],[0,1]]<br>M_push = [[1,0],[1,0]]</p><button onclick="fsmEvent('coin')">Insert coin</button><button onclick="fsmEvent('push')">Push gate</button><button onclick="fsmReset()">Reset turnstile</button><div id="fsmState" role="status"></div><h3>Binary strings ending in 01</h3><p>Start q0; only q2 accepts. Empty input is allowed and rejected.</p><label>Binary string <input id="fsmWord" inputmode="numeric" placeholder="1101"></label><button onclick="fsmRecognize()">Trace string</button><div id="fsmResult" role="status"></div><h3>Keypad lock: 3, 1, 4, 1</h3><p>State k counts correct digits. A wrong digit resets to 0. State 4 outputs OPEN and stops processing. States 0 through 3 output LOCKED.</p><label>Keypad digits <input id="keypadDigits" inputmode="numeric" placeholder="3193141"></label><button onclick="keypadRecognize()">Trace keypad</button><div id="keypadResult" role="status"></div></div>`;
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
function keypadRecognize(){
  const word=document.getElementById('keypadDigits').value,out=document.getElementById('keypadResult');
  if(!/^[0-9]*$/.test(word)){out.textContent='Use only digits 0 through 9, without spaces.';return;}
  if(word.length>256){out.textContent='Use at most 256 digits for a readable trace.';return;}
  const m=CERT.classModels.keypad;let k=m.initial,used=0;const trace=['0 (LOCKED)'];
  for(const ch of word){if(k===m.open)break;k=Number(ch)===m.code[k]?k+1:0;used++;trace.push(ch+': '+k+' ('+(k===m.open?'OPEN':'LOCKED')+')');}
  out.textContent=(word||'Empty input')+': '+trace.join(' → ')+'. Final state: '+k+'. '+(k===m.open?'OPEN.':'LOCKED.')+(used<word.length?' Stopped after '+used+' digits; remaining digits ignored.':'');
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
// Public-domain pool study is separate from the original lesson banks and short quizzes.
let poolSession=null,poolTimer=null;
function technicianPoolStopTimer(){if(poolTimer)clearInterval(poolTimer);poolTimer=null;}
function technicianPoolProgress(){
  const p=CERT.technicianPool;
  if(!S.technicianPool||S.technicianPool.version!==p.version)S.technicianPool={version:p.version,answers:{}};
  return S.technicianPool.answers;
}
function technicianPoolOpen(){
  if(CC!=='technician')return;
  technicianPoolStopTimer();screen='technicianpool';LS=null;cur=null;quiz=null;activePrep=null;poolSession=null;if(EX?.timer)clearInterval(EX.timer);EX=null;drawNav();
  const p=CERT.technicianPool,s=CERT.sources[p.source];
  const now=new Date().toISOString().slice(0,10),valid=now>=p.validFrom&&now<=p.validThrough;
  const answers=technicianPoolProgress(),known=p.questions.filter(q=>answers[q.id]),missed=known.filter(q=>!answers[q.id].correct);
  view.innerHTML=`<div class="card"><button onclick="home()">Back to Technician lessons</button><h2>NCVEC Technician pool study</h2><p>${esc(p.notice)}</p><p>Pool period: ${esc(p.validFrom)} to ${esc(p.validThrough)}. Source check: ${esc(p.checked)}. ${now>p.reviewBy?'Source review overdue; check official updates before studying.':''}</p>${valid?'':'<p role="alert">This pool is outside its validity period. Study is unavailable until the current pool is verified.</p>'}<p id="poolProgress">${known.length} distinct questions reviewed; ${missed.length} currently missed. Saved in your StudyGOAT progress.</p><label>Official group <select id="poolGroup" style="display:block;width:100%;max-width:100%;box-sizing:border-box" onchange="technicianPoolFilter()"><option value="all">All available groups</option>${p.groups.map(g=>`<option value="${g}">${g}: ${esc(p.groupTitles[g])} (${p.questions.filter(q=>q.group===g).length} available)</option>`).join('')}</select></label><label>Question ID <input id="poolQuery" type="search" placeholder="For example T5A05" oninput="technicianPoolFilter()"></label><label><input id="poolMissed" type="checkbox" onchange="technicianPoolFilter()"> Previously missed only</label><p id="poolMatch" role="status"></p><button id="poolStart" onclick="technicianPoolStart()" ${valid?'':'disabled'}>Start pool study</button><details><summary>Sources and pool completeness (${p.questions.length} questions)</summary><p><a href="${esc(s.url)}" target="_blank" rel="noopener">NCVEC release</a> · <a href="${esc(s.mirrorPage)}" target="_blank" rel="noopener">Revised PDF mirror and diagrams</a> · <a href="${esc(p.releaseUrl)}" target="_blank" rel="noopener">Release and corrections</a> · <a href="${esc(p.withdrawalsUrl)}" target="_blank" rel="noopener">Check withdrawals</a></p><p>Four February 19, 2026 prompt corrections are applied. ARRL lists no Technician withdrawals on the check date. Official answer letters and option order are preserved. The complete revised PDF and all three diagrams were checked through the KP4ARA Laurel VE Team mirror. Practice exams sample one question per group. No official credit is awarded.</p><ul>${p.excluded.map(q=>`<li>${esc(q.id)}: ${esc(q.reason)}</li>`).join('')}</ul></details><hr><h3>35-question practice exam</h3><p>One randomly selected question per official group, regardless of study filters. Answers are revealed after submission. The practice threshold is 26 correct out of 35, per <a href="${esc(p.exam.rulesUrl)}" target="_blank" rel="noopener">47 CFR 97.503(a)</a>.</p><label><input id="poolTimed" type="checkbox"> Optional 45-minute study timer</label><p>${esc(p.exam.timerNotice)}</p><button id="poolExam" onclick="technicianPoolExamStart()" ${valid?'':'disabled'}>Start 35-question practice exam</button></div><div id="poolQuestion"></div>`;
  technicianPoolFilter();
}
function technicianPoolMatches(){
  const group=document.getElementById('poolGroup').value,query=document.getElementById('poolQuery').value.trim().toUpperCase(),onlyMissed=document.getElementById('poolMissed').checked,answers=technicianPoolProgress();
  return CERT.technicianPool.questions.filter(q=>(group==='all'||q.group===group)&&q.id.startsWith(query)&&(!onlyMissed||answers[q.id]?.correct===false));
}
function technicianPoolFilter(){
  technicianPoolStopTimer();poolSession=null;document.getElementById('poolQuestion').textContent='';const matches=technicianPoolMatches(),p=CERT.technicianPool,now=new Date().toISOString().slice(0,10);
  document.getElementById('poolMatch').textContent=matches.length?matches.length+' questions available in this selection.':'No available questions match. Excluded questions cannot be selected.';
  document.getElementById('poolStart').disabled=!matches.length||now<p.validFrom||now>p.validThrough;
}
function technicianPoolStart(){
  const p=CERT.technicianPool,now=new Date().toISOString().slice(0,10);if(now<p.validFrom||now>p.validThrough)return;
  const deck=shuffle(technicianPoolMatches());if(!deck.length)return;
  poolSession={deck,index:0,answered:false,correct:0};technicianPoolDraw();
}
function technicianPoolDraw(){
  const session=poolSession,out=document.getElementById('poolQuestion');if(!session||!out)return;
  if(session.mode!=='exam'&&session.index>=session.deck.length){out.innerHTML=`<div class="card"><h3>Selection complete</h3><p>${session.correct} correct out of ${session.deck.length} in this study selection. This is not an exam result.</p><button onclick="technicianPoolOpen()">Choose another selection</button></div>`;return;}
  if(session.mode==='exam'&&session.index>=session.deck.length){technicianPoolExamFinish();return;}
  const q=session.deck[session.index];session.answered=false;
  out.innerHTML=`<div class="card"><p>Question ${session.index+1} of ${session.deck.length} · ${esc(q.id)} · Group ${esc(q.group)}</p><h3>${esc(q.q)}</h3>${technicianPoolFigure(q)}${session.mode==='exam'?'<p id="poolClock" role="timer"></p>':''}<div class="choices">${q.choices.map((c,i)=>`<button onclick="technicianPoolAnswer(${i})">${'ABCD'[i]}. ${esc(c)}</button>`).join('')}</div><div id="poolFeedback" role="status" aria-live="polite"></div><button id="poolNext" onclick="technicianPoolNext()" disabled>Next question</button><p class="hint">Use 1–4 or A–D to answer. ${session.mode==='exam'?'Answers are revealed after submission.':'Answer feedback stays visible until you choose Next question.'}</p>${session.mode==='exam'?'<button onclick="technicianPoolExamFinish()">Submit practice exam now</button>':''}</div>`;
  if(session.mode==='exam')technicianPoolExamTick();
}
function technicianPoolAnswer(index){
  const session=poolSession;if(!session||session.finished||session.index>=session.deck.length||session.answered||!Number.isInteger(index)||index<0||index>3)return;
  const q=session.deck[session.index];session.answered=true;
  if(session.mode==='exam'){
    session.answers[q.id]=index;
    document.querySelectorAll('#poolQuestion .choices button').forEach((b,i)=>{b.disabled=true;b.setAttribute('aria-pressed',String(i===index));});
    document.getElementById('poolFeedback').textContent='Answer recorded. The answer key will appear after submission.';
    document.getElementById('poolNext').disabled=false;return;
  }
  const correct=index===q.answer;if(correct)session.correct++;
  technicianPoolProgress()[q.id]={choice:index,correct,checked:new Date().toISOString()};save();
  document.querySelectorAll('#poolQuestion .choices button').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('ok');else if(i===index)b.classList.add('bad');});
  document.getElementById('poolFeedback').innerHTML=`<p>${correct?'Correct.':'Incorrect.'} Published NCVEC answer: ${'ABCD'[q.answer]}. ${esc(q.choices[q.answer])}</p>${technicianPoolExplanation(q)}`;
  document.getElementById('poolNext').disabled=false;
  const known=CERT.technicianPool.questions.filter(x=>technicianPoolProgress()[x.id]),missed=known.filter(x=>!technicianPoolProgress()[x.id].correct);
  document.getElementById('poolProgress').textContent=known.length+' distinct questions reviewed; '+missed.length+' currently missed. Saved in your StudyGOAT progress.';
}
function technicianPoolNext(){if(!poolSession?.answered||poolSession.finished)return;poolSession.index++;technicianPoolDraw();}
function technicianPoolExplanation(q){
  const explanation=CERT.technicianExplanations.items[q.id];
  return `<div class="poolExplanation" data-question="${esc(q.id)}"><h4>Why this answer fits</h4><p>${esc(explanation.text)}</p><p class="hint">Original StudyGOAT explanation, checked ${esc(CERT.technicianExplanations.checked)}. ${certRefs(explanation.refs)}</p></div>`;
}
function technicianPoolFigure(q){
  const f=q.figure&&CERT.technicianPool.figures[q.figure];
  return f?`<figure><img src="${f.dataUrl}" alt="${esc(f.alt)}" style="display:block;max-width:100%;height:auto;background:white"><figcaption>${esc(f.title)}. Published NCVEC diagram.</figcaption></figure><details><summary>Diagram text description</summary><p>${esc(f.description)}</p></details>`:'';
}
function technicianPoolExamStart(){
  const p=CERT.technicianPool,now=new Date().toISOString().slice(0,10);
  if(now<p.validFrom||now>p.validThrough||p.status!=='complete')return;
  technicianPoolStopTimer();
  const deck=p.groups.map(group=>shuffle(p.questions.filter(q=>q.group===group))[0]);
  if(deck.some(q=>!q)||deck.length!==p.exam.questionCount)return;
  const timed=document.getElementById('poolTimed').checked;
  poolSession={mode:'exam',deck:shuffle(deck),answers:{},index:0,answered:false,finished:false,end:timed?Date.now()+p.exam.optionalMinutes*60000:null};
  for(const id of ['poolGroup','poolQuery','poolMissed','poolStart','poolTimed','poolExam'])document.getElementById(id).disabled=true;
  if(timed)poolTimer=setInterval(technicianPoolExamTick,1000);
  technicianPoolDraw();
}
function technicianPoolExamTick(){
  const session=poolSession;if(screen!=='technicianpool'||CC!=='technician'||!session||session.finished){technicianPoolStopTimer();return;}
  const clock=document.getElementById('poolClock');
  if(!session.end){if(clock)clock.textContent='Untimed practice';return;}
  const seconds=Math.max(0,Math.ceil((session.end-Date.now())/1000));
  if(clock)clock.textContent='Study timer: '+Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
  if(!seconds)technicianPoolExamFinish(true);
}
function technicianPoolExamFinish(expired=false){
  const session=poolSession;if(!session||session.mode!=='exam'||session.finished||screen!=='technicianpool')return;
  session.finished=true;technicianPoolStopTimer();
  const p=CERT.technicianPool,answers=technicianPoolProgress();let correct=0;
  for(const q of session.deck){const choice=session.answers[q.id],ok=choice===q.answer;if(ok)correct++;answers[q.id]={choice:choice??null,correct:ok,checked:new Date().toISOString()};}
  S.technicianPool.lastExam={correct,total:session.deck.length,passed:correct>=p.exam.passCount,expired,checked:new Date().toISOString()};save();
  const missed=p.questions.filter(q=>answers[q.id]?.correct===false).length;
  document.getElementById('poolProgress').textContent=p.questions.filter(q=>answers[q.id]).length+' distinct questions reviewed; '+missed+' currently missed. Saved in your StudyGOAT progress.';
  document.getElementById('poolQuestion').innerHTML=`<div class="card"><h3>Practice exam complete</h3><p>${expired?'Study timer expired. ':''}${correct} correct out of ${session.deck.length}. ${correct>=p.exam.passCount?'Meets':'Below'} the 26-of-35 practice threshold.</p><p>Unanswered questions count as incorrect. This practice result does not award a license or predict an official examination result.</p><button onclick="technicianPoolOpen()">Choose study or another practice exam</button><h3>Answer review</h3>${session.deck.map(q=>`<details><summary>${esc(q.id)}: ${session.answers[q.id]===q.answer?'Correct':'Review needed'}</summary><p>${esc(q.q)}</p>${technicianPoolFigure(q)}<p>Your answer: ${Number.isInteger(session.answers[q.id])?'ABCD'[session.answers[q.id]]:'Unanswered'}. Published answer: ${'ABCD'[q.answer]}. ${esc(q.choices[q.answer])}</p>${technicianPoolExplanation(q)}</details>`).join('')}</div>`;
}
document.addEventListener('keydown',e=>{
  if(screen!=='technicianpool'||!poolSession||/^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement?.tagName||'')||e.altKey||e.ctrlKey||e.metaKey)return;
  if(/^[1-4]$/.test(e.key)){e.preventDefault();technicianPoolAnswer(Number(e.key)-1);}
  else if(/^[a-d]$/i.test(e.key)){e.preventDefault();technicianPoolAnswer(e.key.toUpperCase().charCodeAt(0)-65);}
});

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
  if(certTrack().readingPlan)view.insertAdjacentHTML('afterbegin','<div class="card"><button onclick="studyRoute()">Open saved study path</button><p>Official reading assignments, linked lessons and a checklist saved with your progress.</p></div>');
  if(CC==='security701')view.insertAdjacentHTML('afterbegin','<div class="card"><button onclick="certSources()">Browse 28 objective areas</button><button onclick="accessReviewLab()">Open access review lab</button><p>Selected foundations in every SY0-701 objective area. Each objective remains partial. The fictional lab practices least privilege and account removal.</p></div>');
  if(CC==='security701')view.insertAdjacentHTML('afterbegin','<div class="card"><h3>Applied security exercises</h3>'+CERT.securityLabs.map(l=>'<button onclick="securityLab(\''+l.id+'\')">'+esc(l.title)+'</button>').join('')+'</div>');
  if(CC==='faa107')view.insertAdjacentHTML('afterbegin','<div class="card"><button onclick="chartLab()">Open synthetic chart lab</button></div>');
  if(CC==='technician')view.insertAdjacentHTML('afterbegin','<div class="card"><button onclick="technicianPoolOpen()">Study all 409 NCVEC questions</button><p>All 35 groups now have guided lessons. Complete public-domain question pool, diagrams and 409 original explanations. Separate 35-question practice exams and saved missed-question review.</p></div>');
  view.insertAdjacentHTML('afterbegin', certNotice()+`<div class="row"><button onclick="certSources()">${certTrack().curriculum?'All 16 chapters & coverage':'Sources & coverage'}</button><button onclick="examSetup()">Practice test</button></div>`);
};
function certNotice() {
  const t=certTrack();
  const used=new Set(t.topics.flatMap(p=>p.refs.map(r=>r.source)));
  const stale=[...used].some(id=>new Date(CERT.sources[id].reviewBy+'T23:59:59Z')<new Date());
  return `<div class="card"><h2>${esc(t.code)}: ${esc(t.status)} coverage</h2><p>${esc(t.notice)}</p><p class="hint">Sources checked ${esc(t.checked)}. ${stale?'Source review is overdue. Recheck official sources before relying on this content.':''} Independent study aid. No affiliation, credit, certification or pass guarantee.</p></div>`;
}
function securityLab(id){
  if(CC!=='security701')return;const lab=CERT.securityLabs.find(l=>l.id===id);if(!lab)return;
  screen='securitylab';LS=null;cur=null;quiz=null;activePrep=null;if(EX?.timer)clearInterval(EX.timer);EX=null;drawNav();
  view.innerHTML=`<div class="card" id="securityCaseLab"><button onclick="home()">Back to Security+</button><h2>${esc(lab.title)}</h2><p>${esc(lab.brief)}</p>${lab.cases.map((c,i)=>`<section><p>${esc(c.facts)}</p><label for="labChoice_${i}">Decision for case ${i+1}</label><select id="labChoice_${i}" style="display:block;width:100%;max-width:100%;box-sizing:border-box"><option value="">Choose a decision</option>${lab.choices.map((choice,j)=>`<option value="${j}">${esc(choice)}</option>`).join('')}</select></section>`).join('')}<button onclick="checkSecurityLab('${lab.id}')">Check decisions</button><button onclick="securityLab('${lab.id}')">Reset this lab</button><p id="securityLabScore" role="status" aria-live="polite"></p><div id="securityLabFeedback"></div><p>Fictional exercise for objectives ${esc(lab.objectives.join(', '))}. ${certRefs(lab.refs)}</p></div>`;
}
function checkSecurityLab(id){
  if(CC!=='security701'||!document.getElementById('securityCaseLab'))return;
  const lab=CERT.securityLabs.find(l=>l.id===id);if(!lab)return;
  let score=0;const feedback=lab.cases.map((c,i)=>{
    const v=document.getElementById('labChoice_'+i).value,selected=v===''?null:lab.choices[Number(v)],ok=selected===c.answer;
    if(ok)score++;return `<p>Case ${i+1}: ${ok?'Correct':selected===null?'Unanswered':'Review'}. ${esc(c.answer)}. ${esc(c.why)}</p>`;
  });
  document.getElementById('securityLabScore').textContent=score+' of '+lab.cases.length+' decisions correct. Practice only.';
  document.getElementById('securityLabFeedback').innerHTML=feedback.join('');
}
function chartLab(){
  if(CC!=='faa107')return;screen='chartlab';LS=null;cur=null;quiz=null;activePrep=null;if(EX?.timer)clearInterval(EX.timer);EX=null;drawNav();
  view.innerHTML=`<div class="card"><button onclick="home()">Back to Part 107</button><h2>Synthetic chart altitude lab</h2><p>Fictional cross-section, not to scale. It teaches altitude references and supplies no operational authorization.</p><svg viewBox="0 0 600 360" style="width:100%;max-width:600px" role="img" aria-labelledby="chartTitle chartDesc"><title id="chartTitle">Class C shelf and obstacle altitude exercise</title><desc id="chartDesc">A Class C shelf labeled 40 over 15 extends from 1,500 feet MSL to 4,000 feet MSL. Terrain is 1,000 feet MSL. An obstacle top is 1,200 feet MSL, with height 200 feet AGL.</desc><rect x="32" y="64" width="536" height="166" fill="#d946ef" fill-opacity="0.12" stroke="#d946ef" stroke-width="3"/><text x="52" y="94" fill="currentColor" font-size="17">Class C shelf</text><text x="470" y="105" fill="#c026d3" font-size="25">40</text><line x1="464" y1="114" x2="512" y2="114" stroke="#c026d3" stroke-width="2"/><text x="470" y="143" fill="#c026d3" font-size="25">15</text><text x="52" y="199" fill="currentColor" font-size="16">Floor: read the lower number</text><line x1="32" y1="302" x2="568" y2="302" stroke="currentColor" stroke-width="3"/><text x="52" y="335" fill="currentColor" font-size="16">Terrain: 1,000 ft MSL</text><path d="M380 302 L400 259 L420 302" fill="none" stroke="currentColor" stroke-width="2"/><text x="340" y="249" fill="currentColor" font-size="16">Obstacle: 1200 (200)</text></svg><p>The 40/15 figures omit two zeros and use MSL. The obstacle's parenthesized figure is AGL.</p>${[['Floor of this Class C shelf',['1,500 ft MSL','150 ft AGL','4,000 ft MSL']],['Floor height above this terrain',['500 ft AGL','1,500 ft AGL','2,500 ft AGL']],['Obstacle height above its base',['200 ft AGL','1,200 ft AGL','1,000 ft AGL']]].map(([q,choices],i)=>`<label for="chartChoice_${i}">${q}</label><select id="chartChoice_${i}" style="display:block;width:100%;max-width:100%;box-sizing:border-box"><option value="">Choose an answer</option>${choices.map((c,j)=>`<option value="${j}">${c}</option>`).join('')}</select>`).join('')}<button onclick="checkChartLab()">Check chart answers</button><button onclick="chartLab()">Reset chart lab</button><p id="chartLabScore" role="status" aria-live="polite"></p><div id="chartLabFeedback"></div><p>${certRefs([{source:'faacharts2026',section:'VFR: airspace'},{source:'faacharts2026',section:'VFR: obstacles'}])}</p></div>`;
}
function checkChartLab(){
  if(CC!=='faa107'||!document.getElementById('chartChoice_0'))return;
  const reasons=['15 x 100 = 1,500 feet MSL.','1,500 - 1,000 = 500 feet AGL above this terrain.','The parenthesized 200 is obstacle height above ground.'];
  let score=0;const feedback=reasons.map((r,i)=>{const ok=document.getElementById('chartChoice_'+i).value==='0';if(ok)score++;return `<p>Question ${i+1}: ${ok?'Correct':'Review'}. ${r}</p>`;});
  document.getElementById('chartLabScore').textContent=score+' of 3 chart answers correct.';
  document.getElementById('chartLabFeedback').innerHTML=feedback.join('')+'<p>Being below a shelf does not establish permission to fly; check all applicable airspace, restrictions and operating requirements.</p>';
}

function studyRoute(){
  const t=certTrack();if(!t?.readingPlan)return;
  technicianPoolStopTimer();screen='readingplan';LS=null;cur=null;quiz=null;activePrep=null;
  if(EX?.timer)clearInterval(EX.timer);EX=null;drawNav();
  const progress=S.readingPlans?.[t.id]||{};
  view.innerHTML=`<div class="card"><button onclick="home()">Back to course</button><h2>${esc(t.code)} study path</h2><p>${esc(t.readingPlanNotice)}</p><p id="routeProgress" role="status" aria-live="polite"></p><p>Checks record your own reading and preparation. They do not grade your work or award a credential.</p></div><div id="readingAssignments">${t.readingPlan.map((r,i)=>`<section class="card"><label><input id="routeCheck_${i}" type="checkbox" ${progress[r.id]?'checked':''} onchange="toggleRoute(${i},this.checked)"> Reviewed: ${esc(r.title)}</label><details><summary>Open assignment and study tools</summary><p>${esc(r.assignment)}</p><p>${esc(r.kind)}</p><p><a href="${esc(r.url)}" target="_blank" rel="noopener">Open official reading for ${esc(r.title)}</a></p>${r.topics.map(id=>{const p=certTopic(id);return p?`<h3>${esc(p.name)}</h3>${p.lessons.map((l,j)=>`<button onclick="learn('${id}',${j})">${esc(l.t)}</button>`).join('')}`:'';}).join('')}${r.topics.some(id=>certTopic(id)?.bank.length)?`<button onclick="startRoutePractice(${i})">Practice selected lessons for ${esc(r.title)}</button>`:''}${r.poolGroup?`<button onclick="startPoolGroup('${r.poolGroup}')">Practice every ${esc(r.poolGroup)} pool item</button>`:''}</details></section>`).join('')}</div>`;
  routeProgress();
}
function routeProgress(){
  const t=certTrack(),node=document.getElementById('routeProgress');if(!t?.readingPlan||!node)return;
  const progress=S.readingPlans?.[t.id]||{},count=t.readingPlan.filter(r=>progress[r.id]).length;
  node.textContent=count+' of '+t.readingPlan.length+' assignments marked reviewed. Saved in this browser and included in Settings backups.';
}
function toggleRoute(index,checked){
  const t=certTrack(),r=t?.readingPlan?.[index];if(!r||typeof checked!=='boolean')return;
  S.readingPlans=S.readingPlans||{};S.readingPlans[t.id]=S.readingPlans[t.id]||{};
  if(checked)S.readingPlans[t.id][r.id]=true;else delete S.readingPlans[t.id][r.id];
  save();routeProgress();
}
function startRoutePractice(index){
  const t=certTrack(),r=t?.readingPlan?.[index];if(!r)return;
  const entries=t.topics.filter(p=>r.topics.includes(p.id)).flatMap(p=>p.bank.map(b=>({p,b})));
  if(!entries.length)return;
  runCertEntries(shuffle(entries).slice(0,10),0);
  view.insertAdjacentHTML('afterbegin',`<p id="routePracticeScope">${esc(r.title)}: selected lesson practice. This does not test every official reading objective.</p>`);
}
function startPoolGroup(group){
  if(CC!=='technician'||!CERT.technicianPool.groups.includes(group))return;
  technicianPoolOpen();document.getElementById('poolGroup').value=group;technicianPoolFilter();technicianPoolStart();
}

function certSources() {
  screen='sources';LS=null;cur=null;quiz=null;activePrep=null;drawNav();const t=certTrack();
  view.innerHTML=certNotice()+`<div class="card"><h3>Coverage checklist</h3><p>Listed objectives have introductory coverage only. A topic is not a complete objective.</p>${t.topics.map(p=>`<p>${esc(p.name)}: ${esc(p.objectives.join(', '))} · ${p.bank.length} checked questions<br>${certRefs(p.refs)}</p>`).join('')}<h3>Remaining work</h3><ul>${t.gaps.map(g=>`<li>${esc(g)}</li>`).join('')}</ul><h3>Source register</h3>${[...new Set(t.topics.flatMap(p=>p.refs.map(r=>r.source)))].map(id=>{const s=CERT.sources[id];return `<p>${certRefs([{source:id,section:s.sections.join(', ')}])}<br>${esc(s.version)} · Effective: ${esc(s.effective)}<br>Checked ${esc(s.checked)} · Review by ${esc(s.reviewBy)}<br>${esc(s.rights)}</p>`}).join('')}</div>`;
  if(t.readingPlan)view.insertAdjacentHTML('afterbegin','<div class="card"><button onclick="studyRoute()">Open saved study path</button></div>');
  if(t.acsInventory)view.insertAdjacentHTML('afterbegin',certACS(t));
  if(t.curriculum)view.insertAdjacentHTML('afterbegin',certAchievements(t)+certCurriculum(t));
  if(t.objectiveMap)view.insertAdjacentHTML('afterbegin',certObjectiveMap(t));
}
function certACS(t){
  const a=t.acsInventory;
  return `<div class="card" id="acsCoverage"><h2>Remote Pilot ACS inventory</h2><p>${esc(a.version)}: ${a.tasks.length} tasks and ${a.codes.length} printed knowledge codes, including subordinate elements. Inventory completeness does not mean complete lesson coverage.</p>${a.tasks.map(task=>`<details><summary>${esc(task.id)}: ${esc(task.title)} (selected instruction)</summary><p>${task.codes.map(esc).join(', ')}</p>${task.topics.map(id=>`<button onclick="learn('${id}',0)">Study ${esc(certTopic(id).name)}</button>`).join('')}</details>`).join('')}<p><a href="${esc(a.url)}" target="_blank" rel="noopener">Read the full official ACS</a> · Checked ${esc(a.checked)}</p></div>`;
}
function certObjectiveMap(t){
  return `<div class="card" id="objectiveCoverage"><h2>SY0-701 objective map</h2><p>All 28 objective areas have selected introductory material. Every area is partial. These links use the verified version 6.0 baseline, not a claim that the latest exam revision has been confirmed.</p>${[1,2,3,4,5].map(domain=>`<h3>Domain ${domain}</h3>${t.objectiveMap.filter(o=>o.domain===domain).map(o=>`<details data-objective="${esc(o.id)}"><summary>${esc(o.id)}: ${esc(o.title)} (partial)</summary><p>Still to study: ${o.gaps.map(esc).join('; ')}.</p>${o.topics.map(id=>`<button onclick="learn('${id}',0)">Study ${esc(certTopic(id).name)}</button>`).join('')}<button onclick="startObjectivePractice('${o.id}')">Practice objective ${esc(o.id)}</button></details>`).join('')}`).join('')}</div>`;
}
function startObjectivePractice(id){
  const t=certTrack(),objective=t?.objectiveMap?.find(o=>o.id===id);if(!objective)return;
  const entries=shuffle(t.topics.flatMap(p=>p.bank.filter(b=>b.objectives.includes(id)).map(b=>({p,b})))).slice(0,10);
  if(!entries.length)return;
  runCertEntries(entries,0);
  view.insertAdjacentHTML('afterbegin',`<p id="objectivePracticeScope">Objective ${esc(id)}: ${esc(objective.title)}. Selected practice only, not complete objective coverage.</p>`);
}
function accessReviewLab(){
  if(CC!=='security701')return;
  if(EX?.timer)clearInterval(EX.timer);EX=null;
  screen='accesslab';LS=null;quiz=null;cur=null;rev=null;activePrep=null;drawNav();
  const people=['Analyst','Payroll approver','Backup operator','Former contractor'];
  const permissions=['Active account','Read reports','Approve payroll','Run backups'];
  const initial=[[true,true,true,false],[true,true,true,true],[true,true,false,true],[true,true,false,false]];
  view.innerHTML=certNotice()+`<div class="card" id="accessReviewLab"><h2>Fictional access review</h2><p>Set each account to the minimum permissions required below. This exercise changes only this fictional table. It does not change real accounts. Original StudyGOAT exercise, not an official CompTIA performance-based question.</p><ul><li>Analyst: active account and read reports only.</li><li>Payroll approver: active account, read reports and approve payroll only.</li><li>Backup operator: active account and run backups only.</li><li>Former contractor: inactive account with no permissions.</li></ul><div style="overflow-x:auto"><table><caption>Required access review</caption><thead><tr><th scope="col">Role</th>${permissions.map(p=>`<th scope="col">${p}</th>`).join('')}</tr></thead><tbody>${people.map((person,i)=>`<tr><th scope="row">${person}</th>${permissions.map((p,j)=>`<td><label><input type="checkbox" id="access_${i}_${j}" aria-label="${person}: ${p}" ${initial[i][j]?'checked':''}></label></td>`).join('')}</tr>`).join('')}</tbody></table></div><button onclick="checkAccessReview()">Check access review</button><button onclick="accessReviewLab()">Reset access review</button><p id="accessReviewResult" role="status" aria-live="polite"></p><div id="accessReviewFeedback"></div><p>Objective 4.6: selected least-privilege and account-removal practice. ${certRefs([{source:'sec701',section:'4.6'},{source:'nistcsf2',section:'Appendix A: PR.AA'}])}</p></div>`;
}
function checkAccessReview(){
  if(CC!=='security701'||!document.getElementById('accessReviewLab'))return;
  const expected=[[true,true,false,false],[true,true,true,false],[true,false,false,true],[false,false,false,false]];
  const people=['Analyst','Payroll approver','Backup operator','Former contractor'];
  const permissions=['Active account','Read reports','Approve payroll','Run backups'];
  let correct=0;const feedback=[];
  expected.forEach((row,i)=>row.forEach((value,j)=>{
    const field=document.getElementById(`access_${i}_${j}`);
    if(field.checked===value)correct++;
    else feedback.push(`${people[i]}: ${value?'enable':'remove'} ${permissions[j].toLowerCase()}.`);
  }));
  document.getElementById('accessReviewResult').textContent=correct===16?'16 of 16 settings match. Each active role has only its assigned access, and the former contractor has no active account or permissions. Practice result only.':`${correct} of 16 settings match. Review the role requirements and adjust the settings.`;
  document.getElementById('accessReviewFeedback').innerHTML=feedback.length?`<ul>${feedback.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p>Real access reviews also require authorization, identity verification, evidence, revocation of applicable sessions and tokens, and validation across connected systems. This table covers only the stated fictional permissions.</p>';
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
  view.innerHTML=`<div class="card"><button onclick="menu()">Back to categories</button><h2>Driving Tests: all 50 states and DC</h2><label>Search states <input id="stateSearch" type="search" placeholder="State name or abbreviation" oninput="filterDrivingStates()"></label><p id="stateSearchStatus" role="status"></p><p>Choose your jurisdiction. National safety foundations are shared across all 50 states and DC. ${CERT.drivingJurisdictions.filter(j=>j.track).length} jurisdictions have selected local lessons. National foundations do not verify your state manual, traffic laws or permit-test requirements.</p><label>State or district <select id="drivingState" style="display:block;width:100%;max-width:100%;box-sizing:border-box">${CERT.drivingJurisdictions.map(j=>`<option value="${j.code}">${esc(j.name)}: ${j.track?'state-specific partial course':'national foundations only'}</option>`).join('')}</select></label><button onclick="openDrivingState()">View availability</button><div id="drivingAvailability" aria-live="polite"></div><button onclick="menu()">Back to courses</button></div>`;
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
  const track=CERT.tracks.find(t=>t.id===j.track),source=track&&CERT.sources[track.topics[0].refs[0].source];
  document.getElementById('drivingAvailability').innerHTML=`<h3>${esc(j.name)}: ${j.track?'partial course':'national foundations only'}</h3>${j.track?`<p>Use the complete current official manual alongside this selected practice.</p>${source?`<p><a href="${esc(source.url)}" target="_blank" rel="noopener">Official source for these selected topics</a></p>`:''}<button onclick="enterCourse('${j.track}')">Open ${esc(j.name)} driving prep</button>`:'<p>State-specific permit lessons and questions are not built yet. The shared national course below covers safety principles only.</p>'}<p>Shared national material: attention, distraction, speed and seat-belt safety. This is the same four lessons and 16 questions for every jurisdiction.</p><button onclick="enterCourse('drivingfoundations')">Study national driving foundations</button><p><a href="https://www.usa.gov/state-motor-vehicle-services" target="_blank" rel="noopener">Find state motor vehicle services through USAGov</a>. Locate the current official driver manual and permit requirements for ${esc(j.name)}.</p>`;
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
  view.innerHTML=`<div class="card"><h2>What are you studying?</h2><p>Choose a category, then search for your course or state.</p></div><div class="menu" id="courseCategories"><button class="card" onclick="openCourseCategory('classes')"><h2>Classes</h2><p>${classCount} classes · University and custom courses</p></button><button class="card" onclick="openCourseCategory('certifications')"><h2>Certifications</h2><p>${certCount} study programs · Includes FAA Part 107 drone prep and CAP</p></button><button class="card" onclick="openCourseCategory('driving')"><h2>Driving Tests</h2><p>All 50 states and DC · National foundations available everywhere · ${CERT.drivingJurisdictions.filter(j=>j.track).length} jurisdiction-specific partial courses</p></button></div>`;
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
function weightedPracticeEntries(t){
  const bp=t.practiceBlueprint;if(!bp)return null;
  const all=t.topics.flatMap(p=>p.bank.map(b=>({p,b}))),selected=[];
  for(const group of bp.groups){
    const pool=all.filter(e=>bp.assignments[e.b.id]===group.id);
    if(pool.length<group.count)throw new Error('Not enough distinct questions for '+group.title+'.');
    selected.push(...shuffle(pool).slice(0,group.count));
  }
  if(selected.length!==bp.count||new Set(selected.map(e=>e.b.id)).size!==bp.count)throw new Error('Practice allocation could not be built without duplicates.');
  return shuffle(selected);
}
function practiceBlueprintSummary(t){
  const bp=t.practiceBlueprint;if(!bp)return '';
  return `<details><summary>Weighted practice allocation and source</summary><p>${esc(bp.scope)}</p><p>Suggested pacing: ${bp.suggestedMinutes} minutes. Timer selection is optional.</p><ul>${bp.groups.map(g=>`<li>${esc(g.title)}: ${g.count} questions (${g.publishedPercent!==undefined?g.publishedPercent+'% published weight':g.publishedRange.join('-')+'% published range'}).</li>`).join('')}</ul><p>${certRefs(bp.refs)}</p></details>`;
}
function practiceDomainResults(ex,t){
  const bp=ex.studyBlueprint;if(!bp)return '';
  const rows=bp.groups.map(g=>{
    const entries=ex.items.map((it,i)=>({it,i})).filter(({it})=>bp.assignments[it.q.sourceId]===g.id);
    const correct=entries.filter(({it,i})=>ex.ans[i]===it.q.choices.indexOf(it.q.answer)).length;
    const unanswered=entries.filter(({i})=>ex.ans[i]===undefined||ex.ans[i]===null).length;
    return `<tr><td>${esc(g.title)}</td><td>${correct} / ${entries.length}</td><td>${Math.round(100*correct/entries.length)}%</td><td>${unanswered}</td></tr>`;
  }).join('');
  return `<div class="card" id="practiceDomainResults"><h2>Review by study area</h2><p>${esc(bp.title)}. Raw study results only. Full curriculum coverage and provider scoring are not reproduced.</p><div style="overflow-x:auto"><table><thead><tr><th>Area</th><th>Correct</th><th>Raw percent</th><th>Unanswered</th></tr></thead><tbody>${rows}</tbody></table></div><p>Use the source/objective links to review weak areas. A strong result in this selected question bank does not establish full exam readiness.</p></div>`;
}
const legacyExamSetup=examSetup;
examSetup=function(){
  const t=certTrack();if(!t)return legacyExamSetup();
  screen='exam';LS=null;quiz=null;cur=null;rev=null;activePrep=null;if(EX?.timer)clearInterval(EX.timer);EX=null;drawNav();
  view.innerHTML=certNotice()+`<div class="card"><h2>Practice test</h2><p>The short quiz samples selected curriculum without duplicate questions.</p>${t.practiceBlueprint?`<label>Practice format <select id="certMode" style="display:block;width:100%;max-width:100%;box-sizing:border-box"><option value="short">Short foundation quiz (${t.exam.count} questions)</option><option value="weighted">${esc(t.practiceBlueprint.title)}</option></select></label>${practiceBlueprintSummary(t)}`:''}<label>Practice timer (optional) <select id="certMinutes"><option value="0">Untimed</option><option value="10">10 minutes</option><option value="30">30 minutes</option>${t.practiceBlueprint?`<option value="${t.practiceBlueprint.suggestedMinutes}">${t.practiceBlueprint.suggestedMinutes} minutes</option>`:''}</select></label><p id="certPracticeError" role="alert"></p><div class="row"><button class="primary" onclick="startCertExam()">Start practice</button></div></div>`;
};
function startCertExam(){
  const t=certTrack();if(!t)return;
  const m=Number(document.getElementById('certMinutes').value),weighted=document.getElementById('certMode')?.value==='weighted';
  let entries;
  try{
    if(weighted)entries=weightedPracticeEntries(t);
    else{
      entries=t.topics.flatMap(p=>p.bank.map(b=>({p,b})));
      if(t.exam.mode==='official-pool')entries=[...new Set(entries.map(e=>e.b.group))].sort().map(g=>pick(entries.filter(e=>e.b.group===g)));
      else entries=shuffle(entries).slice(0,t.exam.count);
    }
  }catch(e){document.getElementById('certPracticeError').textContent=e.message;return;}
  runCertEntries(entries,m);
  if(weighted)EX.studyBlueprint=t.practiceBlueprint;
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
  const domainResults=t?practiceDomainResults(EX,t):'';
  legacySubmit(timeUp);
  if(domainResults)view.insertAdjacentHTML('beforeend',domainResults);
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
Object.assign(window,{technicianPoolOpen,technicianPoolExamStart,technicianPoolExamFinish,technicianPoolFilter,technicianPoolStart,technicianPoolAnswer,technicianPoolNext,securityLab,checkSecurityLab,chartLab,checkChartLab,studyRoute,toggleRoute,startRoutePractice,startPoolGroup,fsmLab,fsmEvent,fsmReset,fsmRecognize,keypadRecognize,certSources,startCertExam,startChapterPractice,startObjectivePractice,accessReviewLab,checkAccessReview,drivingDirectory,openDrivingState,openCourseCategory,filterDrivingStates});
menu();
}
installStudyPrograms();
