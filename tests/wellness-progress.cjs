const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
class El{
  constructor(tag){this.tag=tag;this.children=[];this.style={};this.value='';this.className='';}
  appendChild(e){this.children.push(e);return e;}
  replaceChildren(){this.children=[];}
  setAttribute(){}
  remove(){}
  querySelector(s){return s==='.card'?this.children.find(e=>e.className==='card'):null;}
  set textContent(v){this.text=v;}
  get textContent(){return this.text||'';}
}
function find(root,fn){if(fn(root))return root;for(const x of root.children){const y=find(x,fn);if(y)return y;}return null;}
const data=new Map(),view=new El('main'),nav=new El('nav'),head=new El('head');
const ctx={document:{head,createElement:t=>new El(t),getElementById:id=>find(view,e=>e.id===id)||find(nav,e=>e.id===id)},
  window:{isSecureContext:false},view,nav,console,setInterval:()=>0,setTimeout:()=>0,
  localStorage:{setItem:(k,v)=>data.set(k,v),getItem:k=>data.get(k)||null,removeItem:k=>data.delete(k)},
  S:{xp:5,stats:{}},screen:'menu',LS:null,quiz:null,cur:null,activePrep:null,
  drawNav(){},settings(){const c=new El('div');c.className='card';view.replaceChildren();view.appendChild(c);},
  save(){data.set('cs315trainer',JSON.stringify(ctx.S));},applySet(){},hud(){}};
vm.createContext(ctx);
for(const name of ['study-wellness','progress-tools'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../courses/'+name+'.js'),'utf8'),ctx);
ctx.window.studyWellness.open();
find(view,x=>x.textContent==='Start focus').onclick();
assert.equal(ctx.S.wellness.phase,'focus');
ctx.S.wellness.endsAt=Date.now()-10;ctx.window.studyWellness.check();
assert.equal(ctx.S.wellness.phase,'break');
assert.equal(ctx.S.wellness.completedFocus,1);
ctx.S.wellness.endsAt=Date.now()-10;ctx.window.studyWellness.check();
assert.equal(ctx.S.wellness.phase,'idle');
ctx.settings();
assert.equal(ctx.window.progressTools.testStorage(),true);
assert.ok(find(view,e=>e.textContent.includes('Browser save check passed')));
console.log('Saved focus/break transitions and browser storage check passed');
