const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('file://'+path.resolve('StudyGOAT.html'));await page.waitForFunction(()=>typeof installStudyPrograms==='function');
const tracks=await page.evaluate(()=>window.STUDYGOAT_CATALOG.tracks.map(t=>t.id));
assert.equal(await page.locator('#courseCategories button').count(),3);
await page.locator('#courseCategories button').filter({hasText:'Classes'}).click();assert.equal(await page.locator('.course').count(),2);
await page.locator('#courseSearch').fill('CPSC 222');assert.equal(await page.locator('.course').count(),1);
await page.locator('#courseSearch').fill('missing course');assert.equal(await page.locator('.course').count(),0);assert.match(await page.locator('#courseSearchStatus').innerText(),/No courses/);
await page.locator('#courseSearch').fill('');assert.equal(await page.locator('.course').count(),2);
assert(!/Heather Marriott|Rizi Aznita/.test(await page.locator('body').innerText()));
await page.evaluate(()=>openCourseCategory('certifications'));assert.equal(await page.locator('.course').count(),5);
await page.locator('#courseSearch').fill('FAA');assert.equal(await page.locator('.course').count(),1);
await page.locator('.course').click();assert.equal(await page.evaluate(()=>CC),'faa107');
// The state directory must not inherit a university course's title or course-only tools.
await page.evaluate(()=>{enterCourse('cpsc222');drivingDirectory();});
assert.equal((await page.locator('#ttl').innerText()).trim(),'🐐 StudyGOAT');
assert.match(await page.locator('#sub').innerText(),/Driving Tests/);
assert.equal(await page.locator('#nav button').filter({hasText:'Topics'}).count(),0);
assert.equal(await page.evaluate(()=>CC),'cpsc222','Directory preserves selected course and progress');
await page.locator('#stateSearch').fill('NJ');assert.equal(await page.locator('#drivingState option').count(),1);assert.match(await page.locator('#drivingAvailability').innerText(),/New Jersey: partial/);
// Exact state names and abbreviations win over substring matches (Kansas/Arkansas).
for(const [query,code] of [['Kansas','US-KS'],['AR','US-AR'],['  kAnSaS  ','US-KS'],['Washington','US-WA']]){
 await page.locator('#stateSearch').fill(query);assert.equal(await page.locator('#drivingState').inputValue(),code,query);
}
await page.locator('#stateSearch').fill('Kansas');assert.equal(await page.locator('#drivingState option').count(),2,'Substring alternatives remain available');
await page.locator('#stateSearch').fill('no such state');assert.equal(await page.locator('#drivingState option').count(),0);assert.match(await page.locator('#stateSearchStatus').innerText(),/No states/);
await page.locator('#stateSearch').fill('');assert.equal(await page.locator('#drivingState option').count(),51);

for(const id of ['cs315','cpsc222',...tracks]){
 await page.evaluate(id=>enterCourse(id),id);assert(await page.locator('.topic').count()>0,id);
 await page.evaluate(()=>practice(CT()[0]));await page.evaluate(()=>{if(cur._typed){document.getElementById('tin').value=cur.answer;answerTyped();}else answer(cur.choices.indexOf(cur.answer));});assert.match(await page.locator('#fb').innerText(),/Correct/);
 await page.evaluate(()=>learn(CT()[0],0));assert(await page.locator('#lc').isVisible());
 await page.evaluate(()=>{while(LS.i<LS.steps.length-1)stepGo(1)});
 await page.evaluate(()=>playHub());assert(await page.locator('#view').innerText());
}
for(const id of tracks){await page.evaluate(id=>enterCourse(id),id);
 for(const topic of await page.evaluate(()=>CT())){
  await page.evaluate(topic=>practice(topic),topic);await page.evaluate(()=>answer(cur.choices.indexOf(cur.answer)));assert.match(await page.locator('#fb').innerText(),/Correct/);
  const lessons=await page.evaluate(topic=>LESSONS[topic].length,topic);
  for(let li=0;li<lessons;li++){await page.evaluate(({topic,li})=>learn(topic,li),{topic,li});await page.evaluate(()=>{while(LS.i<LS.steps.length-1)stepGo(1)});}
 }
await page.evaluate(()=>certSources());assert.match(await page.locator('#view').innerText(),/Source register/);
 await page.evaluate(()=>{examSetup();startCertExam();});const n=await page.evaluate(()=>EX.n);assert(n>0);assert.equal(await page.evaluate(()=>new Set(EX.items.map(x=>x.q.sourceId)).size),n);
 await page.evaluate(()=>{EX.items.forEach((it,i)=>EX.ans[i]=it.q.choices.indexOf(it.q.answer));exSubmit(false)});assert.match(await page.locator('.score').innerText(),/100%/);
 await page.evaluate(()=>{examSetup();startCertExam();EX.end=Date.now()-1;exTick()});assert.match(await page.locator('.score').innerText(),/Time ran out/);
 await page.evaluate(()=>reviewMistakes());assert.match(await page.locator('#view').innerText(),/./);
}
// Objective navigation scopes practice by question objectives, including shared topics.
await page.evaluate(()=>enterCourse('security701'));
await page.getByRole('button',{name:'Browse 28 objective areas',exact:true}).click();
assert.equal(await page.locator('#objectiveCoverage details').count(),28);
for(const id of await page.evaluate(()=>window.STUDYGOAT_CATALOG.tracks.find(t=>t.id==='security701').objectives)){
 await page.evaluate(()=>certSources());
 await page.locator(`[data-objective="${id}"] summary`).click();
 await page.getByRole('button',{name:`Practice objective ${id}`,exact:true}).click();
 assert.match(await page.locator('#objectivePracticeScope').innerText(),new RegExp(`Objective ${id.replace('.','\\.')}:`));
 assert(await page.evaluate(id=>EX.items.every(it=>it.q.objectives.includes(id)),id));
 assert.equal(await page.evaluate(()=>new Set(EX.items.map(it=>it.q.sourceId)).size),await page.evaluate(()=>EX.n));
}
await page.evaluate(()=>home());await page.getByRole('button',{name:'Open access review lab',exact:true}).click();
await page.getByRole('button',{name:'Check access review',exact:true}).click();assert.match(await page.locator('#accessReviewResult').innerText(),/11 of 16/);
const accessExpected=[[true,true,false,false],[true,true,true,false],[true,false,false,true],[false,false,false,false]];
for(let i=0;i<4;i++)for(let j=0;j<4;j++)await page.locator(`#access_${i}_${j}`).setChecked(accessExpected[i][j]);
await page.getByRole('button',{name:'Check access review',exact:true}).click();assert.match(await page.locator('#accessReviewResult').innerText(),/16 of 16/);
await page.locator('#access_3_0').check();await page.getByRole('button',{name:'Check access review',exact:true}).click();assert.match(await page.locator('#accessReviewFeedback').innerText(),/Former contractor: remove active account/);
await page.getByRole('button',{name:'Reset access review',exact:true}).click();assert.equal(await page.locator('#accessReviewResult').innerText(),'');
await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Access lab mobile overflow');
await page.evaluate(()=>certSources());assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Objective map mobile overflow');
await page.setViewportSize({width:1280,height:800});
// Uploaded lecture content is part of the existing discrete class.
await page.evaluate(()=>enterCourse('cpsc222'));
for(const topic of ['dmfsm','dmturnstile','dmsuffixdfa','dmfsmpython']){
 await page.evaluate(topic=>practice(topic),topic);await page.evaluate(()=>answer(cur.choices.indexOf(cur.answer)));assert.match(await page.locator('#fb').innerText(),/Correct/);
 for(let i=0;i<2;i++){await page.evaluate(({topic,i})=>learn(topic,i),{topic,i});await page.evaluate(()=>{while(LS.i<LS.steps.length-1)stepGo(1)});assert(await page.locator('#lc').isVisible());}
}
await page.evaluate(()=>home());await page.getByRole('button',{name:'Open finite state machine lab',exact:true}).click();
await page.getByRole('button',{name:'Reset turnstile',exact:true}).click();
for(const label of ['Push gate','Insert coin','Insert coin','Push gate','Insert coin'])await page.getByRole('button',{name:label,exact:true}).click();
assert.match(await page.locator('#fsmState').innerText(),/Current state: Unlocked; vector \[0,1\]/);
await page.getByRole('button',{name:'Reset turnstile',exact:true}).click();assert.match(await page.locator('#fsmState').innerText(),/Locked; vector \[1,0\]. No events/);
for(const [word,result] of [['1101','Accepted.'],['011','Rejected.'],['','Rejected.'],['10x','Use only 0 and 1.']]){
 await page.locator('#fsmWord').fill(word);await page.getByRole('button',{name:'Trace string',exact:true}).click();assert((await page.locator('#fsmResult').innerText()).includes(result));
}
await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'FSM lab mobile overflow');
await page.setViewportSize({width:1280,height:800});
// All chapters reach real lessons and scope practice to their mapped topics.
await page.evaluate(()=>enterCourse('capcadet'));await page.getByRole('button',{name:'All 16 chapters & coverage',exact:true}).click();
assert.equal(await page.locator('#achievementMap details').count(),21);
await page.locator('#achievementMap summary').filter({hasText:'Achievement 5'}).click();
assert.match(await page.locator('#achievementMap').innerText(),/Aerospace Dimensions module 4/);
await page.locator('#achievementMap').getByRole('button',{name:'Review chapter 5',exact:true}).first().click();
assert(await page.evaluate(()=>EX.items.every(x=>x.topic==='capcadet_chapter5')));
await page.evaluate(()=>certSources());
assert.equal(await page.locator('#chapterCoverage section').count(),16);
assert.equal(await page.locator('#chapterCoverage a').count(),16);
assert.equal(await page.locator('#chapterCoverage button').filter({hasText:/^Practice chapter /}).count(),16);
await page.locator('#chapterCoverage button').first().click();assert(await page.locator('#lc').isVisible());
for(let chapter=1;chapter<=16;chapter++){
 await page.evaluate(()=>certSources());await page.getByRole('button',{name:`Practice chapter ${chapter}`,exact:true}).click();
 const scoped=await page.evaluate(chapter=>{const c=window.STUDYGOAT_CATALOG.tracks.find(t=>t.id==='capcadet').curriculum.find(c=>c.chapter===chapter);return EX.items.every(x=>c.topics.includes(x.topic))&&new Set(EX.items.map(x=>x.q.sourceId)).size===EX.n&&EX.n>=8;},chapter);assert(scoped,`Chapter ${chapter} practice scope`);
 await page.evaluate(()=>{EX.items.forEach((it,i)=>EX.ans[i]=it.q.choices.indexOf(it.q.answer));exSubmit(false)});assert.match(await page.locator('.score').innerText(),/100%/);
}
await page.evaluate(()=>menu());await page.locator('#courseCategories button').filter({hasText:'Driving Tests'}).click();
assert.equal(await page.locator('#drivingState option').count(),51);
// Every state and DC now reaches its own course and exposes the matching official source.
for(const j of await page.evaluate(()=>window.STUDYGOAT_CATALOG.drivingJurisdictions)){
 await page.evaluate(()=>drivingDirectory());await page.locator('#drivingState').selectOption(j.code);await page.getByRole('button',{name:'View availability',exact:true}).click();
 const availability=await page.locator('#drivingAvailability').innerText();
 assert(availability.includes(j.name+': '+(j.track?'partial course':'national foundations only')));
 assert.equal(await page.locator('#drivingAvailability button').count(),j.track?2:1);
 if(j.track){const source=await page.evaluate(id=>{const d=window.STUDYGOAT_CATALOG,t=d.tracks.find(t=>t.id===id);return d.sources[t.topics[0].refs[0].source].url;},j.track);assert.equal(await page.getByRole('link',{name:'Official source for these selected topics',exact:true}).getAttribute('href'),source);await page.getByRole('button',{name:`Open ${j.name} driving prep`,exact:true}).click();assert.equal(await page.evaluate(()=>CC),j.track);}
}
// All 50 states and DC expose real shared study without claiming state-specific completion.
await page.evaluate(()=>drivingDirectory());
for(const code of await page.locator('#drivingState option').evaluateAll(els=>els.map(e=>e.value))){
 await page.locator('#drivingState').selectOption(code);await page.getByRole('button',{name:'View availability',exact:true}).click();
 assert(await page.getByRole('button',{name:'Study national driving foundations',exact:true}).isVisible());
}
await page.getByRole('button',{name:'Study national driving foundations',exact:true}).click();assert.equal(await page.evaluate(()=>CC),'drivingfoundations');
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{enterCourse('capcadet');certSources();});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'CAP mobile overflow');
await page.evaluate(()=>drivingDirectory());assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Directory mobile overflow');
// Exercise every new sign illustration through the real question generator.
await page.evaluate(()=>enterCourse('arizonadriving'));
const visualCases=await page.evaluate(()=>window.STUDYGOAT_CATALOG.tracks.find(t=>t.id==='arizonadriving').topics.flatMap(t=>t.bank.map((b,i)=>b.diagram?{topic:t.id,index:i,length:t.bank.length}:null).filter(Boolean)));
assert.equal(visualCases.length,3);
for(const v of visualCases){
 await page.evaluate(v=>{practice(v.topic);const old=Math.random;try{Math.random=()=>(v.index+0.1)/v.length;show(genQ(v.topic),()=>practice(v.topic));}finally{Math.random=old;}},v);
 assert(await page.locator('#qc img').isVisible());
 await page.waitForFunction(()=>{const im=document.querySelector('#qc img');return im&&im.complete&&im.naturalWidth>0});
 assert(await page.locator('#qc img').getAttribute('alt'));
}
// Separate NCVEC study preserves answer letters, diagrams, feedback and saved review state.
await page.evaluate(()=>enterCourse('technician'));await page.getByRole('button',{name:'Study all 409 NCVEC questions',exact:true}).click();
assert.match(await page.locator('#view').innerText(),/All 409/);
for(const id of ['T5B03','T5B04','T5B05','T5B06','T5B07','T5B08','T6A09','T6C02','T6C03','T6C04','T6C05','T6C06','T6C07','T6C08','T6C09','T6C10','T6C11','T6D10']){
 await page.locator('#poolQuery').fill(id);assert(!(await page.locator('#poolStart').isDisabled()));await page.locator('#poolStart').click();
 const hasFigure=await page.evaluate(id=>!!window.STUDYGOAT_CATALOG.technicianPool.questions.find(q=>q.id===id).figure,id);
 if(hasFigure){assert(await page.locator('#poolQuestion img').evaluate(img=>img.complete&&img.naturalWidth>0));assert(await page.locator('#poolQuestion details').filter({hasText:'Diagram text description'}).count());}
 await page.evaluate(()=>technicianPoolOpen());
}
await page.locator('#poolQuery').fill('T1A01');await page.locator('#poolStart').click();assert.match(await page.locator('#poolQuestion').innerText(),/T1A01/);
await page.locator('#poolQuestion .choices button').nth(0).click();assert.match(await page.locator('#poolFeedback').innerText(),/Incorrect.*Published NCVEC answer: C/);
await page.evaluate(()=>technicianPoolAnswer(2));assert.equal(await page.evaluate(()=>S.technicianPool.answers.T1A01.correct),false,'Repeated answers are locked');
assert.equal(await page.locator('#poolQuestion .choices button:disabled').count(),4);assert(await page.locator('#poolFeedback a').first().isVisible());
await page.reload();await page.evaluate(()=>{enterCourse('technician');technicianPoolOpen()});await page.locator('#poolMissed').check();await page.locator('#poolQuery').fill('T1A01');assert.match(await page.locator('#poolMatch').innerText(),/^1 questions/);
await page.locator('#poolStart').click();await page.keyboard.press('3');assert.match(await page.locator('#poolFeedback').innerText(),/Correct/);await page.locator('#poolNext').click();assert.match(await page.locator('#poolQuestion').innerText(),/Selection complete/);
await page.evaluate(()=>technicianPoolOpen());await page.locator('#poolMissed').check();await page.locator('#poolQuery').fill('T1A01');assert(await page.locator('#poolStart').isDisabled(),'Corrected question leaves missed-only selection');
await page.locator('#poolMissed').uncheck();await page.locator('#poolQuery').fill('');await page.locator('#poolGroup').selectOption('T6C');assert.match(await page.locator('#poolMatch').innerText(),/^12 questions/);
await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'NCVEC setup mobile overflow');
await page.locator('#poolStart').click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'NCVEC question mobile overflow');
await page.evaluate(()=>{window.realPoolDate=Date;window.Date=class extends Date{constructor(...args){super(...(args.length?args:['2031-01-01T12:00:00Z']))}};technicianPoolOpen()});assert(await page.locator('#poolStart').isDisabled(),'Expired pool cannot be started');await page.evaluate(()=>{Date=window.realPoolDate;delete window.realPoolDate;technicianPoolOpen()});
// Complete exams draw one from every group, with no answer leakage before submission.
for(let run=0;run<20;run++){
 await page.evaluate(()=>{technicianPoolOpen();document.getElementById('poolQuery').value='T1A01';technicianPoolExamStart()});
 const selected=await page.evaluate(()=>{const selected=[];for(let i=0;i<35;i++){const id=document.querySelector('#poolQuestion .card>p').textContent.match(/T\d[A-Z]\d\d/)[0];const q=window.STUDYGOAT_CATALOG.technicianPool.questions.find(q=>q.id===id);selected.push({id,group:q.group});technicianPoolAnswer(q.answer);technicianPoolNext();}return selected;});
 assert.equal(selected.length,35);assert.equal(new Set(selected.map(q=>q.id)).size,35);assert.equal(new Set(selected.map(q=>q.group)).size,35);
}
await page.evaluate(()=>{technicianPoolOpen();technicianPoolExamStart();technicianPoolAnswer(window.STUDYGOAT_CATALOG.technicianPool.questions.find(q=>document.querySelector('#poolQuestion .card>p').textContent.includes(q.id)).answer)});
assert.equal(await page.locator('#poolQuestion .ok,#poolQuestion .bad').count(),0,'Exam does not reveal correctness');
assert(!/Published NCVEC answer/.test(await page.locator('#poolFeedback').innerText()));
assert.equal(await page.locator('#poolQuestion .poolExplanation').count(),0,'Exam explanations stay hidden before submission');
await page.evaluate(()=>{technicianPoolNext();for(let i=1;i<35;i++){const q=window.STUDYGOAT_CATALOG.technicianPool.questions.find(q=>document.querySelector('#poolQuestion .card>p').textContent.includes(q.id));technicianPoolAnswer(i<26?q.answer:(q.answer+1)%4);technicianPoolNext();}});
assert.match(await page.locator('#poolQuestion').innerText(),/26 correct out of 35. Meets/);
assert.equal(await page.locator('#poolQuestion .poolExplanation').count(),35,'Submitted exam reveals all explanations');
assert.equal(await page.evaluate(()=>S.technicianPool.lastExam.passed),true);
const lastExam=await page.evaluate(()=>JSON.stringify(S.technicianPool.lastExam));await page.reload();await page.evaluate(()=>{enterCourse('technician');technicianPoolOpen()});assert.equal(await page.evaluate(()=>JSON.stringify(S.technicianPool.lastExam)),lastExam);
await page.evaluate(()=>{technicianPoolExamStart();for(let i=0;i<35;i++){const q=window.STUDYGOAT_CATALOG.technicianPool.questions.find(q=>document.querySelector('#poolQuestion .card>p').textContent.includes(q.id));technicianPoolAnswer(i<25?q.answer:(q.answer+1)%4);technicianPoolNext();}});
assert.match(await page.locator('#poolQuestion').innerText(),/25 correct out of 35. Below/);
await page.evaluate(()=>{technicianPoolOpen();document.getElementById('poolTimed').checked=true;technicianPoolExamStart();technicianPoolAnswer(window.STUDYGOAT_CATALOG.technicianPool.questions.find(q=>document.querySelector('#poolQuestion .card>p').textContent.includes(q.id)).answer);window.realExamNow=Date.now;Date.now=()=>window.realExamNow()+46*60000;});
await page.waitForFunction(()=>document.getElementById('poolQuestion').textContent.includes('Study timer expired.'));assert.match(await page.locator('#poolQuestion').innerText(),/Study timer expired. 1 correct out of 35/);
await page.evaluate(()=>{Date.now=window.realExamNow;delete window.realExamNow;});assert.equal(await page.evaluate(()=>S.technicianPool.lastExam.expired),true);
const before=await page.evaluate(()=>JSON.stringify(S.technicianPool.lastExam));await page.evaluate(()=>technicianPoolExamFinish());assert.equal(await page.evaluate(()=>JSON.stringify(S.technicianPool.lastExam)),before,'Repeated submission is locked');
await page.evaluate(()=>{technicianPoolOpen();document.getElementById('poolTimed').checked=true;technicianPoolExamStart();home();});await page.waitForTimeout(1100);assert(!/Practice exam complete/.test(await page.locator('#view').innerText()),'Leaving exam does not submit a background result');
await page.evaluate(()=>{window.realPoolDate=Date;window.Date=class extends Date{constructor(...args){super(...(args.length?args:['2031-01-01T12:00:00Z']))}};technicianPoolOpen();technicianPoolExamStart()});assert(await page.locator('#poolExam').isDisabled());assert.equal(await page.locator('#poolQuestion').innerText(),'');await page.evaluate(()=>{Date=window.realPoolDate;delete window.realPoolDate;});
const stats=await page.evaluate(()=>JSON.stringify(S.stats));await page.reload();assert.equal(await page.evaluate(()=>JSON.stringify(S.stats)),stats);
// Every official item reaches its own original explanation through real study flow.
const explanationFailures=await page.evaluate(()=>{
 enterCourse('technician');technicianPoolOpen();const data=window.STUDYGOAT_CATALOG,failed=[];
 for(const q of data.technicianPool.questions){
  document.getElementById('poolQuery').value=q.id;technicianPoolFilter();technicianPoolStart();
  if(document.querySelector('#poolQuestion .poolExplanation'))failed.push(q.id+': early explanation');
  technicianPoolAnswer(q.answer);
  const explanation=document.querySelector('#poolFeedback .poolExplanation');
  if(!explanation||explanation.dataset.question!==q.id||explanation.querySelector('p').textContent!==data.technicianExplanations.items[q.id].text)failed.push(q.id+': explanation mismatch');
 }
 return failed;
});assert.deepEqual(explanationFailures,[]);
await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Explanation mobile overflow');
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>enterCourse(window.STUDYGOAT_CATALOG.tracks[0].id));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Mobile overflow');await page.screenshot({path:'/tmp/studygoat-mobile.png',fullPage:true});
await page.evaluate(()=>{menu();openCourseCategory('classes')});await page.locator('.course[role=button]').first().focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>screen),'home');
const fs=require('node:fs'),os=require('node:os');
const exportDir=fs.mkdtempSync(path.join(os.tmpdir(),'studygoat-export-'));
const exportPath=path.join(exportDir,'StudyGOAT.html');
fs.writeFileSync(exportPath,await page.evaluate(()=>getPristine()));
const exported=await browser.newPage();await exported.goto('file://'+exportPath);
assert.equal(await exported.locator('#courseCategories button').count(),3);await exported.evaluate(()=>openCourseCategory('classes'));assert.equal(await exported.locator('.course[role=button]').count(),2);await exported.evaluate(()=>openCourseCategory('certifications'));assert.equal(await exported.locator('.course[role=button]').count(),5,'Export preserves categorized study tracks');
await exported.evaluate(()=>{enterCourse('technician');technicianPoolOpen()});assert.match(await exported.locator('#view').innerText(),/All 409/);assert.match(await exported.locator('#poolProgress').innerText(),/^0 distinct/);
await exported.locator('#poolQuery').fill('T6C02');await exported.locator('#poolStart').click();assert(await exported.locator('#poolQuestion img').evaluate(img=>img.complete&&img.naturalWidth>0),'Export embeds offline diagrams');
await exported.evaluate(()=>technicianPoolAnswer(window.STUDYGOAT_CATALOG.technicianPool.questions.find(q=>q.id==='T6C02').answer));assert.match(await exported.locator('.poolExplanation').innerText(),/resistor symbol/,'Export embeds original explanations');
await exported.evaluate(()=>{technicianPoolOpen();technicianPoolExamStart()});assert.match(await exported.locator('#poolQuestion').innerText(),/Question 1 of 35/);
await exported.close();fs.rmSync(exportDir,{recursive:true,force:true});
assert.deepEqual(errors,[]);console.log('PASS: original and new courses, correct scoring, lessons, games hub, sources, distinct exam questions, timeout, mistakes, persistence, mobile width and keyboard entry');await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
