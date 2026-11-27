const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    const page=await browser.newPage({acceptDownloads:true});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto('file://'+path.resolve('StudyGOAT.html'));
    await page.waitForFunction(()=>window.studyWellness&&window.progressTools&&window.examBuilder&&window.STUDYGOAT_ALGORITHMS);
    await page.evaluate(()=>{enterCourse('cs315');S.suiteGames={played:7,correct:6};save();});
    await page.reload();
    await page.waitForFunction(()=>window.studyWellness&&window.progressTools);
    assert.equal(await page.evaluate(()=>S.suiteGames.played),7);
    await page.evaluate(()=>settings());
    assert.match(await page.locator('#view').innerText(),/Browser save check passed/);
    const [download]=await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button',{name:'Download my progress (.json)'}).click()
    ]);
    const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
    assert.equal(backup.schema,'studygoat-progress-v1');
    assert.equal(backup.progress.suiteGames.played,7);
    await page.evaluate(()=>{S.suiteGames.played=9;save();});
    await page.locator('input[type="file"]').setInputFiles({name:'StudyGOAT Progress Backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
    await page.getByRole('button',{name:'Restore backup and replace current progress'}).click();
    assert.equal(await page.evaluate(()=>S.suiteGames.played),7);
    await page.evaluate(()=>window.studyWellness.open());
    await page.getByRole('button',{name:'Start focus'}).click();
    await page.evaluate(()=>{S.wellness.endsAt=Date.now()-1;window.studyWellness.check();});
    assert.equal(await page.evaluate(()=>S.wellness.phase),'break');
    await page.evaluate(()=>window.studySuite.startTraversal('tree'));
    assert.equal(await page.locator('svg[role="img"]').count(),1);
    assert.ok((await page.locator('svg[role="img"]').getAttribute('aria-label')).includes('Root'));
    const answers=await page.evaluate(()=>[
      window.examBuilder.grade({type:'typed',answer:'2i+1',accept:['2*i+1']},'2*i+1'),
      window.examBuilder.grade({type:'multi',correct:[0,2]},[0,2]),
      window.examBuilder.grade({type:'multi',correct:[0,2]},[0])
    ]);
    assert.deepEqual(answers,[true,true,false]);
    assert.deepEqual(errors,[]);
    console.log('Browser: persisted progress, backup restore, break, SVG and exam grading passed');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
