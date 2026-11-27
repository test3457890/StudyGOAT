const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
class El {
  constructor(tag){this.tag=tag;this.children=[];this.style={};this.value='';this.checked=false;this.className='';}
  appendChild(e){this.children.push(e);return e;}
  replaceChildren(){this.children=[];}
  setAttribute(){}
  set textContent(x){this.text=x;}
  get textContent(){return this.text||'';}
}
function find(root,match){if(match(root))return root;for(const child of root.children){const x=find(child,match);if(x)return x;}return null;}
const view=new El('main'),nav=new El('nav');
const ctx={document:{createElement:t=>new El(t),createElementNS:(_,t)=>new El(t)},window:{},view,nav,console,
  S:{},CC:'cs315',COURSES:{cs315:{code:'CS 315'}},TOPICS:{sort:{name:'Sorting'},avl:{name:'AVL'},graph:{name:'Graph'},heap:{name:'Heap'}},
  CT:()=>['sort'],BANK:{sort:Array.from({length:5},(_,i)=>({q:'Question '+i,c:['Right '+i,'Wrong '+i],why:'Reason '+i}))},
  GLOSS:{sort:[['Insertion sort','Inserts a new item in a sorted prefix']]},drawNav(){},
  stripH:x=>x,save(){ctx.saved=(ctx.saved||0)+1;}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../courses/exam-builder.js'),'utf8'),ctx);
ctx.window.examBuilder.setup();
find(view,e=>e.tag==='select').value='5';
find(view,e=>e.textContent==='Start practice exam').onclick();
assert.equal(ctx.S.examBlueprint.session.items.length,5);
for(let i=0;i<5;i++)find(view,e=>e.textContent==='Skip this question').onclick();
assert.equal(ctx.S.examBlueprint.session.submitted,true);
assert.equal(ctx.S.examBlueprint.attempts.length,1);
assert.ok(find(view,e=>e.textContent.includes('Practice exam · 0 / 5')));
assert.ok(ctx.saved>0);
console.log('Exam selection, saved skips, and review checks passed');
