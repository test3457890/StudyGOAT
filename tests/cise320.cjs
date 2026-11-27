const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const ctx={BANK:{},GLOSS:{},TOPICS:{},LESSONS:{},COURSES:{},S:{course:'cise320'},CC:'cs315',window:{},menu(){ctx.menuCalls=(ctx.menuCalls||0)+1;},BADGE:()=>'',mkLesson:x=>x,bankQ:id=>ctx.BANK[id][0]};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../courses/cise320.js'),'utf8'),ctx);
const ids=Object.keys(ctx.TOPICS);
assert.equal(ids.length,11);
assert.deepEqual(ids,Array.from({length:11},(_,i)=>'cise320ch'+(i+1)));
assert.equal(ctx.CC,'cise320');
assert.equal(ctx.menuCalls,1);
assert.equal(ctx.window.CISE320.questions,44);
for(const id of ids){
  assert.equal(ctx.TOPICS[id].course,'cise320');
  assert.equal(ctx.BANK[id].length,4);
  assert.ok(ctx.GLOSS[id].length>=2);
  assert.ok(ctx.LESSONS[id][0].steps.length>=3);
  for(const q of ctx.BANK[id]){
    assert.equal(q.c.length,4);
    assert.equal(new Set(q.c).size,4);
    assert.ok(q.why.includes('Original StudyGOAT practice'));
  }
}
console.log('CISE 320: 11 chapters, 44 original keyed questions, lessons and progress selection passed');
