const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('file://'+path.resolve('StudyGOAT.html'));await page.waitForFunction(()=>typeof installStudyPrograms==='function');
const tracks=await page.evaluate(()=>window.STUDYGOAT_CATALOG.tracks.map(t=>t.id));
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
// Chapter navigation reaches the real lessons; unimplemented chapters stay explicit.
await page.evaluate(()=>enterCourse('capcadet'));await page.getByRole('button',{name:'All 16 chapters & coverage',exact:true}).click();
assert.equal(await page.locator('#chapterCoverage section').count(),16);
assert.equal(await page.locator('#chapterCoverage a').count(),16);
assert.match(await page.locator('#chapterCoverage').innerText(),/reading only/);
await page.locator('#chapterCoverage button').first().click();assert(await page.locator('#lc').isVisible());
await page.evaluate(()=>menu());await page.getByRole('button',{name:'Choose a state',exact:true}).click();
assert.equal(await page.locator('#drivingState option').count(),51);
await page.locator('#drivingState').selectOption('US-AK');await page.getByRole('button',{name:'View availability',exact:true}).click();
assert.match(await page.locator('#drivingAvailability').innerText(),/Alaska: planned/);assert.equal(await page.locator('#drivingAvailability button').count(),0);
await page.locator('#drivingState').selectOption('US-AZ');await page.getByRole('button',{name:'View availability',exact:true}).click();
await page.getByRole('button',{name:'Open Arizona driving prep',exact:true}).click();assert.equal(await page.evaluate(()=>CC),'arizonadriving');
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
const stats=await page.evaluate(()=>JSON.stringify(S.stats));await page.reload();assert.equal(await page.evaluate(()=>JSON.stringify(S.stats)),stats);
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>enterCourse(window.STUDYGOAT_CATALOG.tracks[0].id));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Mobile overflow');await page.screenshot({path:'/tmp/studygoat-mobile.png',fullPage:true});
await page.evaluate(()=>menu());await page.locator('.course[role=button]').first().focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>screen),'home');
const fs=require('node:fs'),os=require('node:os');
const exportDir=fs.mkdtempSync(path.join(os.tmpdir(),'studygoat-export-'));
const exportPath=path.join(exportDir,'StudyGOAT.html');
fs.writeFileSync(exportPath,await page.evaluate(()=>getPristine()));
const exported=await browser.newPage();await exported.goto('file://'+exportPath);
assert.equal(await exported.locator('.course[role=button]').count(),tracks.length+4,'Export preserves original courses, sourced tracks and tools');
await exported.close();fs.rmSync(exportDir,{recursive:true,force:true});
assert.deepEqual(errors,[]);console.log('PASS: original and new courses, correct scoring, lessons, games hub, sources, distinct exam questions, timeout, mistakes, persistence, mobile width and keyboard entry');await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
