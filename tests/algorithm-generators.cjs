const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../courses/algorithm-generators.js'),'utf8'),ctx);
const gen=ctx.window.STUDYGOAT_ALGORITHMS;
for(let seed=1;seed<=200;seed++){
  const a=gen.tree(seed,'inorder'),b=gen.tree(seed,'preorder'),c=gen.tree(seed,'postorder');
  assert.equal(a.answer,[...a.values].sort((x,y)=>x-y).join(','));
  function traverse(n,mode,out=[]){if(!n)return out;if(mode==='pre')out.push(n.value);traverse(n.left,mode,out);if(mode==='in')out.push(n.value);traverse(n.right,mode,out);if(mode==='post')out.push(n.value);return out;}
  assert.equal(b.answer,traverse(b.root,'pre').join(','));
  assert.equal(c.answer,traverse(c.root,'post').join(','));
  for(const mode of ['bfs','dfs']){
    const q=gen.graph(seed,mode),seen=new Set(['A']),out=[];
    if(mode==='bfs'){let frontier=['A'];while(frontier.length){const v=frontier.shift();out.push(v);for(const x of [...q.adj[v]].sort())if(!seen.has(x)){seen.add(x);frontier.push(x);}}}
    else{function visit(v){out.push(v);for(const x of [...q.adj[v]].sort())if(!seen.has(x)){seen.add(x);visit(x);}}visit('A');}
    assert.equal(q.answer,out.join(','));
    assert.equal(out.length,6);
  }
  const insertion=gen.insertion(seed),start=[...insertion.initial];
  assert.equal(new Set(start).size,5);
  insertion.stages.forEach((step,i)=>{
    assert.equal(step.from.join(','),start.join(','));
    const expected=[...start.slice(0,i+2)].sort((x,y)=>x-y).concat(start.slice(i+2));
    assert.equal(step.correct.join(','),expected.join(','));
    assert.equal(step.options.length,2);
    assert.equal(new Set(step.options.map(x=>x.join(','))).size,2);
    assert.ok(step.options.every(x=>x.join(',')!==step.correct.join(',')));
    start.splice(0,start.length,...expected);
  });
}
console.log('200 seeded tree, graph and sorting variants verified independently');
