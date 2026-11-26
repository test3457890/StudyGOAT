const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
class El {
  constructor(tag){this.tag=tag;this.children=[];this.style={};this.className='';this.hidden=false;}
  appendChild(x){this.children.push(x);return x;}
  replaceChildren(){this.children=[];}
  setAttribute(){}
  querySelector(){return null;}
  set textContent(x){this.text=x;}
  get textContent(){return this.text||'';}
}
const view=new El('main'),nav=new El('nav'),head=new El('head');
const ctx={document:{head,createElement:tag=>new El(tag)},window:{},view,nav,console,
  S:{set:{}},CC:'cs315',screen:'home',LS:null,TOPICS:{a:{name:'Big O'}},LESSONS:{},
  drawNav(){},drawStep(){},show(){},fcDraw(){},lrnShow(){},playHub(){},
  stopGames(){},save(){ctx.saved=(ctx.saved||0)+1;},hud(){},bumpDay(){},
  gIds:ids=>ids||['a'],cardsFor:()=>[{id:'c1',topic:'a',front:'What is O(1)?',back:'Constant time'}],
  stripH:x=>x,plIds:()=>['a']};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../courses/study-upgrades.js'),'utf8'),ctx);
assert.equal(typeof ctx.window.studyUpgrades.startRecall,'function');
ctx.window.studyUpgrades.startRecall(['a']);
assert.ok(view.children[0].children.some(x=>x.textContent==='What is O(1)?'));
const reveal=view.children[0].children.find(x=>x.textContent==='Reveal answer');
const answer=view.children[0].children.find(x=>x.className==='study-recall-answer');
assert.equal(answer.hidden,true);
reveal.onclick();
assert.equal(answer.hidden,false);
view.children[0].children.at(-1).children.find(x=>x.textContent==='I remembered it').onclick();
assert.equal(ctx.S.recall.c1.level,1);
assert.ok(ctx.S.recall.c1.due>Date.now());
assert.ok(ctx.saved>0);
ctx.window.studyUpgrades.startRecall(['a']);
view.children[0].children.find(x=>x.textContent==='Reveal answer').onclick();
view.children[0].children.at(-1).children.find(x=>x.textContent==='Try again').onclick();
assert.equal(ctx.S.recall.c1.level,0);
console.log('Recall reveal, grading, and due-date checks passed');
