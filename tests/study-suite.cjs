const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
class El{
  constructor(tag){this.tag=tag;this.children=[];this.style={};this.hidden=false;this.value='';this.className='';this.disabled=false;}
  appendChild(e){this.children.push(e);return e;}
  replaceChildren(){this.children=[];}
  setAttribute(){}
  querySelector(selector){if(selector==='.games')return this.children.find(e=>e.className==='games')||null;return null;}
  querySelectorAll(selector){if(selector==='button')return this.children.filter(e=>e.tag==='button');return [];}
  set textContent(x){this.text=x;}
  get textContent(){return this.text||'';}
}
const view=new El('main'),nav=new El('nav'),head=new El('head');
const ctx={document:{head,createElement:t=>new El(t),getElementById:()=>null},
  window:{studyUpgrades:{startRecall:()=>{ctx.recallStarted=true;}}},view,nav,console,
  S:{stats:{a:{r:1,t:2}},recall:{c1:{due:Date.now()-1000,level:1}},missed:[{topic:'a',prompt:'Review this'}]},
  CC:'cs315',COURSES:{cs315:{code:'CS 315'}},TOPICS:{a:{name:'Big O'}},
  CT:()=>['a'],inCourse:x=>x==='a',cardsFor:()=>[{id:'c1',front:'What?',back:'Answer',topic:'a'}],
  drawNav(){},finish(){},playHub(){},stopGames(){},reviewMistakes(){},examSetup(){},
  practice(){},save(){ctx.saved=(ctx.saved||0)+1;},hud(){},bumpDay(){},qid:()=>42,
  stripH:x=>x,shuffle:x=>x,gIds:x=>x,plIds:()=>['a']};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../courses/study-suite.js'),'utf8'),ctx);
ctx.window.studySuite.dashboard();
assert.ok(view.children[0].children.some(e=>e.textContent.includes('Today')));
assert.ok(view.children[0].children.some(e=>e.className==='suite-grid'));
ctx.window.studySuite.startSorting();
assert.ok(view.children[0].children.some(e=>e.textContent==='[5, 1, 4, 2]'||e.textContent.includes('Current array')));
const choices=view.children[0].children.find(e=>e.className==='suite-choices');
choices.children.find(e=>e.textContent==='[1, 5, 4, 2]').onclick();
assert.equal(ctx.S.suiteGames.correct,1);
assert.equal(ctx.S.suiteGames.played,1);
assert.ok(ctx.saved>0);
console.log('Dashboard and sorting challenge checks passed');
