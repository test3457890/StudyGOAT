const {chromium}=require('playwright');
const path=require('node:path');
const fs=require('node:fs');
const assert=require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('file://'+path.resolve('StudyGOAT.html'));
  await page.waitForFunction(()=>window.studySuite&&window.examBuilder&&window.studyUpgrades&&window.studyWellness&&window.progressTools&&window.STUDYGOAT_ALGORITHMS);
  fs.mkdirSync('docs/screenshots',{recursive:true});
  async function capture(name,open){
    await page.evaluate(open);
    await page.locator('#view .card').first().waitFor();
    await page.screenshot({path:'docs/screenshots/'+name+'.png',fullPage:true,animations:'disabled'});
  }
  await capture('guide-course-library',()=>menu());
  await page.evaluate(()=>enterCourse('cs315'));
  await capture('guide-today',()=>window.studySuite.dashboard());
  await capture('guide-study-breaks',()=>window.studyWellness.open());
  await capture('guide-progress-backup',()=>settings());
  await capture('guide-games',()=>playHub());
  await capture('guide-generated-tree',()=>window.studySuite.startTraversal('tree'));
  await capture('daily-review',()=>window.studySuite.dashboard());
  await capture('tree-traversal-game',()=>window.studySuite.startTraversal('tree'));
  await capture('sorting-steps-game',()=>window.studySuite.startSorting());
  await capture('audio-recall-playlist',()=>window.studySuite.startPlaylist(CT()));
  await capture('exam-builder',()=>window.examBuilder.setup());
  await capture('feedback-form',()=>window.studySuite.feedback());
  await capture('recall-sprint',()=>window.studyUpgrades.startRecall(CT()));
  await capture('guided-lesson-updated',()=>{enterCourse('cpsc222');learn('dm_sets',0);});
  await page.evaluate(()=>{S.suiteGames={played:3,correct:2};save();});
  await page.reload();
  await page.waitForFunction(()=>window.studySuite&&window.progressTools);
  assert.equal(await page.evaluate(()=>S.suiteGames?.played),3,'Progress survives a page reload');
  try{
    const repo=await browser.newPage({viewport:{width:1280,height:900}});
    await repo.goto('https://github.com/test3457890/StudyGOAT',{waitUntil:'domcontentloaded',timeout:20000});
    await repo.screenshot({path:'docs/screenshots/guide-github-repository.png',fullPage:false,animations:'disabled'});
    await repo.close();
  }catch(e){console.log('Public GitHub page image unavailable: '+e.message);}
  if(errors.length)throw Error('Page errors: '+errors.join(' | '));
  await browser.close();
  console.log('Captured StudyGOAT screenshots; verified progress after reload.');
})().catch(e=>{console.error(e);process.exitCode=1;});
