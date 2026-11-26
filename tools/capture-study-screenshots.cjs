const {chromium}=require('playwright');
const path=require('node:path');
const fs=require('node:fs');

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('file://'+path.resolve('StudyGOAT.html'));
  await page.waitForFunction(()=>window.studySuite&&window.examBuilder&&window.studyUpgrades);
  await page.evaluate(()=>enterCourse('cs315'));
  fs.mkdirSync('docs/screenshots',{recursive:true});
  async function capture(name,open){
    await page.evaluate(open);
    await page.locator('#view .card').first().waitFor();
    await page.screenshot({path:'docs/screenshots/'+name+'.png',fullPage:true,animations:'disabled'});
  }
  await capture('daily-review',()=>window.studySuite.dashboard());
  await capture('tree-traversal-game',()=>window.studySuite.startTraversal('tree'));
  await capture('sorting-steps-game',()=>window.studySuite.startSorting());
  await capture('audio-recall-playlist',()=>window.studySuite.startPlaylist(CT()));
  await capture('exam-builder',()=>window.examBuilder.setup());
  await capture('feedback-form',()=>window.studySuite.feedback());
  await capture('recall-sprint',()=>window.studyUpgrades.startRecall(CT()));
  await capture('guided-lesson-updated',()=>{enterCourse('cpsc222');learn('dm_sets',0);});
  if(errors.length)throw Error('Page errors: '+errors.join(' | '));
  await browser.close();
  console.log('Captured eight StudyGOAT screenshots from the running app.');
})().catch(e=>{console.error(e);process.exitCode=1;});
