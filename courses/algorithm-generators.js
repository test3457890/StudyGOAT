/* Deterministic, testable practice generators. Same seed gives same question. */
function installStudyAlgorithms(){
  function random(seed){
    let state=seed>>>0;
    return ()=>{state=(state+0x6D2B79F5)>>>0;let x=state;x=Math.imul(x^(x>>>15),x|1);x^=x+Math.imul(x^(x>>>7),x|61);return ((x^(x>>>14))>>>0)/4294967296;};
  }
  function unique(seed,count=6,limit=90){const r=random(seed),values=[];while(values.length<count){const n=1+Math.floor(r()*limit);if(!values.includes(n))values.push(n);}return values;}
  function tree(seed,order='inorder'){
    const values=unique(seed,6),root={value:values[0],left:null,right:null};
    for(const value of values.slice(1)){let p=root;while(true){const side=value<p.value?'left':'right';if(!p[side]){p[side]={value,left:null,right:null};break;}p=p[side];}}
    const visited=[];
    function walk(node){if(!node)return;if(order==='preorder')visited.push(node.value);walk(node.left);if(order==='inorder')visited.push(node.value);walk(node.right);if(order==='postorder')visited.push(node.value);}
    walk(root);
    const relations=[];
    function describe(node){if(!node)return;if(node.left){relations.push(node.value+' has left child '+node.left.value);describe(node.left);}if(node.right){relations.push(node.value+' has right child '+node.right.value);describe(node.right);}}
    describe(root);
    return {kind:'tree',title:'BST '+order+' traversal',prompt:'Insert '+values.join(', ')+' into an empty binary search tree. Enter its '+order+' visit order.',answer:visited.join(','),why:order==='inorder'?'Inorder visits left, node, right.':order==='preorder'?'Preorder visits node, left, right.':'Postorder visits left, right, node.',root,values,description:'Root '+root.value+'. '+relations.join('. ')+'.'};
  }
  function graph(seed,mode='bfs'){
    const r=random(seed),labels='ABCDEF'.split(''),edges=[];
    for(let i=1;i<labels.length;i++){const parent=Math.floor(r()*i);edges.push([labels[parent],labels[i]]);}
    for(let extra=0;extra<2;extra++){
      const a=Math.floor(r()*labels.length),b=Math.floor(r()*labels.length);
      if(a===b||edges.some(([x,y])=>x===labels[a]&&y===labels[b]||y===labels[a]&&x===labels[b]))continue;
      edges.push([labels[a],labels[b]]);
    }
    const adj=Object.fromEntries(labels.map(x=>[x,[]]));
    edges.forEach(([a,b])=>{adj[a].push(b);adj[b].push(a);});
    Object.values(adj).forEach(neighbors=>neighbors.sort());
    const seen=new Set(['A']),order=[];
    if(mode==='bfs'){const queue=['A'];while(queue.length){const v=queue.shift();order.push(v);for(const n of adj[v])if(!seen.has(n)){seen.add(n);queue.push(n);}}}
    else{function visit(v){order.push(v);for(const n of adj[v])if(!seen.has(n)){seen.add(n);visit(n);}}visit('A');}
    return {kind:'graph',title:mode==='bfs'?'Breadth first search':'Depth first search',prompt:'Start at A. Visit neighbors alphabetically. Enter '+mode.toUpperCase()+' visit order for the undirected graph.',answer:order.join(','),why:mode==='bfs'?'BFS uses a queue and visits the closest level before going deeper.':'DFS visits one branch before backtracking.',labels,edges,adj,description:'Undirected edges: '+edges.map(e=>e.join(' to ')).join(', ')+'.'};
  }
  function insertion(seed){
    const initial=unique(seed,5,40),a=[...initial],stages=[];
    for(let i=1;i<a.length;i++){
      const from=[...a],value=a[i];let j=i;
      while(j>0&&a[j-1]>value){a[j]=a[j-1];j--;}a[j]=value;
      const correct=[...a],wrong=[];
      for(let x=0;x<a.length&&wrong.length<2;x++)for(let y=x+1;y<a.length&&wrong.length<2;y++){
        const copy=[...a];[copy[x],copy[y]]=[copy[y],copy[x]];
        if(copy.join(',')!==correct.join(',')&&copy.join(',')!==from.join(',')&&!wrong.some(z=>z.join(',')===copy.join(',')))wrong.push(copy);
      }
      stages.push({from,correct,options:wrong,inserted:value,why:'Take '+value+' and insert it into the sorted prefix; shift larger values right.'});
    }
    return {initial,stages,answer:a.join(',')};
  }
  window.STUDYGOAT_ALGORITHMS={tree,graph,insertion};
}
installStudyAlgorithms();
