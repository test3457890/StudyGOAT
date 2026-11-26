const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
class El {
  constructor(tag='div'){this.tag=tag;this.children=[];this.value='';this.style={};this.disabled=false;}
  appendChild(c){this.children.push(c);return c;}
  replaceChildren(){this.children=[];}
  setAttribute(){}
  set textContent(x){this.text=x;}
  get textContent(){return this.text||'';}
}
const view=new El(),nav=new El(),store={};let saved=0;
const ctx={document:{createElement:tag=>new El(tag)},view,nav,window:{},console,
  save(){saved++;store.value=JSON.stringify(ctx.S.cs315Lab);},
  drawNav(){nav.replaceChildren();},
  CC:'cs315',screen:'home',LS:null,quiz:null,cur:null,activePrep:null,
  S:{}};
vm.createContext(ctx);
vm.runInContext(readFileSync('cs315-exam-lab.js','utf8'),ctx);
assert.equal(typeof ctx.window.cs315Lab.home,'function');
ctx.window.cs315Lab.home();
assert.ok(nav.children.some(x=>x.textContent.includes('exam practice')));
const card=view.children[0];
card.children.find(x=>x.textContent==='Cumulative final review (25)').onclick();
assert.equal(ctx.S.cs315Lab.session.ids.length,25);
const buttons=view.children[0].children.filter(x=>x.tag==='button');
buttons[1].onclick();
assert.equal(Object.keys(ctx.S.cs315Lab.session.selected).length,1);
assert.ok(saved>=2);
const snapshot=JSON.parse(store.value);
ctx.S.cs315Lab=snapshot;
ctx.window.cs315Lab.home();
view.children[0].children.find(x=>x.textContent==='Resume saved questions').onclick();
assert.equal(ctx.S.cs315Lab.session.index,0);
assert.ok(view.children[0].children.some(x=>x.textContent==='Next question'));
ctx.window.cs315Lab.home();
view.children[0].children.find(x=>x.textContent==='Write C code').onclick();
const select=view.children[0].children.find(x=>x.tag==='select');
const area=view.children[0].children.at(-1);
assert.ok(area.children.some(x=>x.tag==='label'),JSON.stringify(view.children[0].children.map(x=>[x.tag,x.textContent,x.children.map(y=>y.tag)])));
const textarea=area.children.find(x=>x.tag==='label').children[0];
textarea.value='int sum() {return 0;}';textarea.oninput();
assert.equal(ctx.S.cs315Lab.drafts.sum,textarea.value);
select.value='search';select.onchange();
assert.ok(area.children.some(x=>x.textContent.includes('Follow next')));
console.log('CPSC 315 quiz, resume, navigation, and draft smoke checks passed');
