/* CPSC 315 cumulative practice, local progress, and C drafting. */
'use strict';
function installCs315ExamLab() {
  const rows = [
    ['Big O','Direct access to array element a[2] is…','O(1)','O(n)','Indexing is constant time.'],
    ['Big O','A single loop from 0 to n-1 is…','O(n)','O(1)','The loop visits n items.'],
    ['Big O','Three nested loops, each running n times, are…','O(n³)','O(n²)','Multiply n × n × n.'],
    ['Big O','Which grows more slowly for large n?','O(log n)','O(n)','A logarithm grows more slowly than n.'],
    ['Sorting','Is bubble sort the fastest asymptotic sorting algorithm?','No','Yes','Its worst case is O(n²); merge sort is O(n log n).'],
    ['Linked lists','The tail points back to the head in a…','circular list','stack','That is a circular linked list.'],
    ['Big O','The loop do { n--; } while(n>0) runs in…','O(n)','O(n²)','It decrements n once per iteration.'],
    ['Big O','An index doubled each iteration runs in…','O(log n)','O(n)','It doubles about log₂ n times.'],
    ['Linked lists','A deque supports removal from…','both ends','front only','A deque is a double ended queue.'],
    ['Recursion','Must recursion have a terminating base case?','Yes','No','The base case stops the recursion.'],
    ['Trees','Can a binary tree be stored in an array?','Yes','No','Array indices can represent children.'],
    ['Trees','The first inserted key in an empty BST becomes the…','root','leaf','The first node is the root.'],
    ['Trees','A parent-child hierarchy of nodes is a…','tree','hash table','Trees represent hierarchical relationships.'],
    ['Trees','With root A, left B, right C, inorder is…','B A C','A B C','Inorder visits left, root, right.'],
    ['Trees','Can a key larger than 10 be in the left subtree of BST root 10?','No','Yes','All left subtree keys must be smaller than 10.'],
    ['Huffman','A leaf reached by edges 0, 0, 0 has code…','000','001','Concatenate labels from root to leaf.'],
    ['Sets','A={1,2}, B={2,3}. Their intersection is…','{2}','{1,2,3}','Intersection keeps common values.'],
    ['Sets','A set contains…','distinct elements','duplicates as separate members','Repeated values do not create new elements.'],
    ['Huffman','Huffman coding is used for…','data compression','finding a minimum spanning tree','Shorter codes are assigned to frequent symbols.'],
    ['Graphs','A spanning tree with 8 vertices has…','7 edges','8 edges','A spanning tree has V-1 edges.'],
    ['Graphs','A weighted cycle has edges 4,2,5,6,3. MST weight?','14','15','Discard the largest edge 6; sum the other four.'],
    ['Graphs','Shortest paths from a source with nonnegative edge weights:','Dijkstra','Prim','Dijkstra solves shortest paths; Prim solves MST.'],
    ['Graphs','A connected undirected graph has a path between…','every pair of vertices','only adjacent vertices','Connectivity requires a path between every pair.'],
    ['AVL trees','At every AVL node subtree heights differ by at most…','1','2','AVL balance factor is -1, 0, or 1.'],
    ['AVL trees','Worst case AVL insertion time is…','O(log n)','O(n)','AVL height is logarithmic.'],
    ['AVL trees','An AVL tree must also satisfy BST ordering.','True','False','AVL trees are balanced BSTs.'],
    ['Skip lists','A skip list typically promotes levels…','randomly','alphabetically','Level promotion is probabilistic.'],
    ['B-trees','Can a B-tree node have multiple keys?','Yes','No','B-tree nodes can contain multiple ordered keys.'],
    ['B-trees','Maximum children of order 100 B-tree under the quiz convention:','100','99','Order m denotes maximum m children in this course.'],
    ['Big O','An n loop around a doubling loop is…','O(n log n)','O(n²)','Multiply n by log n.'],
    ['Stacks and queues','push(U), push(F), pop() returns…','F','U','Stacks are last in, first out.'],
    ['Hash tables','Linear probing checks after index h…','(h+1)%size','h again','Check the next slot modulo table size.'],
    ['Heaps','Left child at zero-based heap index i is…','2*i+1','2*i+2','Left and right child indices are 2i+1 and 2i+2.'],
    ['Sorting','Merge sort worst case is…','O(n log n)','O(n²)','Each of log n levels merges n elements.']
  ];
  const snippets = [
    ['sum','Sum an array','Write int sum(int a[], int n) using one pass. Test an empty array and negative values.','One loop over n entries: O(n).','int sum(int a[], int n) {\n    int total=0;\n    for(int i=0;i<n;i++) total+=a[i];\n    return total;\n}'],
    ['search','Search a linked list','Write a function returning 1 when target is in a singly linked list, otherwise 0. Test empty, first, last, and missing.','Follow next until a match or NULL: O(n) worst case.','int contains(const Node *p, int target) {\n    while(p!=NULL) {\n        if(p->value==target) return 1;\n        p=p->next;\n    }\n    return 0;\n}'],
    ['factorial','Recursive factorial','Write factorial for n >= 0 with a base case. Test n=0,1,4; int can overflow.','A base case stops recursion.','int factorial(int n) {\n    if(n<=1) return 1;\n    return n*factorial(n-1);\n}'],
    ['bst','Search a BST','Write a function that returns the matching node or NULL. Test empty, root, leaf, and absent key.','Compare one branch per node: O(height).','const Node *find(const Node *p, int key) {\n    while(p && p->key!=key)\n        p=key<p->key?p->left:p->right;\n    return p;\n}']
  ];
  function state() {
    if(!S.cs315Lab || typeof S.cs315Lab!=='object') S.cs315Lab={answers:{},drafts:{},attempts:[],session:null};
    return S.cs315Lab;
  }
  function element(tag, parent, value) { const e=document.createElement(tag);if(value!==undefined)e.textContent=value;parent.appendChild(e);return e; }
  function button(parent, label, action) {const b=element('button',parent,label);b.onclick=action;return b;}
  function shell() {screen='cs315lab';LS=null;quiz=null;cur=null;activePrep=null;drawNav();view.replaceChildren();}
  function homeLab() {
    shell();const p=state(),card=element('div',view);card.className='card';
    element('h2',card,'CPSC 315 · Fall 2026 exam practice');
    element('p',card,'Practice based on your past quiz formats. Cumulative review draws from all covered topics. These are original study prompts.');
    element('p',card,Object.keys(p.answers).length+' distinct questions tried · '+p.attempts.length+' completed sessions. Answers and code drafts save in this browser and are included in Settings → Show my progress code.');
    button(card,'Cumulative final review (25)',()=>start('exam'));
    button(card,'Mixed five questions',()=>start('quiz'));
    button(card,'Write C code',codingHome);
    if(p.session&&!p.session.finished)button(card,'Resume saved questions',drawQuestion);
    element('p',card,'Focus on a topic:');
    const select=element('select',card);element('option',select,'Choose a topic').value='';
    [...new Set(rows.map(r=>r[0]))].forEach(t=>{element('option',select,t).value=t;});
    button(card,'Practice this topic',()=>{if(select.value)start('quiz',select.value);});
    element('p',card,'Rule → worked example → explain the answer. Use C coding practice to write functions in the style of your allowed cheat sheet.');
  }
  function start(mode,topic) {
    const pool=rows.map((r,i)=>i).filter(i=>!topic||rows[i][0]===topic);
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    const ids=pool.slice(0,mode==='exam'?25:5),options={};
    ids.forEach(id=>{options[id]=[0,1];if(rows[id][0]==='Big O'){
      const bounds=['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','O(n³)'];
      const extra=bounds.filter(v=>v!==rows[id][2]&&v!==rows[id][3]).slice(0,2);
      rows[id][5]=extra;options[id].push(2,3);
    }
    for(let i=options[id].length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[id][i],options[id][j]]=[options[id][j],options[id][i]];}
    });
    state().session={mode,ids,options,index:0,selected:{},finished:false};save();drawQuestion();
  }
  function drawQuestion() {
    const s=state().session;if(!s||s.finished){homeLab();return;}if(s.index>=s.ids.length){finish();return;}
    shell();const card=element('div',view);card.className='card';button(card,'Back to practice',homeLab);
    const id=s.ids[s.index],r=rows[id],choice=s.selected[id];
    element('p',card,'Question '+(s.index+1)+' / '+s.ids.length+' · '+r[0]);
    element('h2',card,r[1]);const order=s.options[id];
    order.forEach((option,i)=>{const b=button(card,option<2?r[2+option]:r[5][option-2],()=>choose(i));b.disabled=choice!==undefined;});
    const correct=choice!==undefined&&order[choice]===0;
    const status=element('p',card,choice===undefined?'':s.mode==='exam'?'Answer recorded. Review the explanations at the end.':(correct?'Correct. ':'Review: '+r[2]+'. ')+r[4]);status.setAttribute('role','status');
    const next=button(card,s.index===s.ids.length-1?'See results':'Next question',()=>{s.index++;save();drawQuestion();});next.disabled=choice===undefined;
  }
  function choose(i) {
    const p=state(),s=p.session,id=s.ids[s.index];if(s.selected[id]!==undefined)return;
    if(i<0||i>=s.options[id].length)return;
    s.selected[id]=i;p.answers[id]={correct:s.options[id][i]===0,attempts:(p.answers[id]?.attempts||0)+1,at:Date.now()};save();drawQuestion();
  }
  function finish() {
    const p=state(),s=p.session,score=s.ids.filter(id=>s.selected[id]!==undefined&&s.options[id][s.selected[id]]===0).length;s.finished=true;
    p.attempts.push({at:Date.now(),mode:s.mode,score,total:s.ids.length});p.attempts=p.attempts.slice(-30);save();shell();
    const card=element('div',view);card.className='card';element('h2',card,score+' / '+s.ids.length);
    button(card,'Back to practice',homeLab);
    s.ids.forEach(id=>{const r=rows[id],d=element('details',card),option=s.selected[id]===undefined?-1:s.options[id][s.selected[id]],correct=option===0;if(!correct)d.open=true;
      element('summary',d,(correct?'Correct: ':'Review: ')+r[0]+' · '+r[1]);
      element('p',d,'Your answer: '+(option<0?'Skipped':option<2?r[2+option]:r[5][option-2])+'. Correct: '+r[2]+'.');
      element('p',d,r[4]);});
  }
  function codingHome() {
    shell();const card=element('div',view);card.className='card';button(card,'Back to practice',homeLab);
    element('h2',card,'Write C code');
    element('p',card,'Read the rule, write a small C function, then compare with the reference and check edge cases. Drafts save as you type. This page does not compile or grade C.');
    const select=element('select',card);snippets.forEach(x=>{element('option',select,x[1]).value=x[0];});select.value=snippets[0][0];
    const area=element('div',card);select.onchange=()=>renderCode(select.value,area);renderCode(select.value,area);
  }
  function renderCode(id,area) {
    const x=snippets.find(a=>a[0]===id);if(!x)return;area.replaceChildren();
    element('h3',area,x[1]);element('p',area,x[3]);element('p',area,x[2]);
    const label=element('label',area,'Your C code');const input=element('textarea',label);
    input.style.cssText='display:block;width:100%;min-height:210px;font-family:monospace';
    input.value=state().drafts[id]||'';input.oninput=()=>{state().drafts[id]=input.value;save();};
    const detail=element('details',area);element('summary',detail,'Show reference solution (self review)');
    const pre=element('pre',detail);pre.style.cssText='white-space:pre-wrap;overflow:auto';element('code',pre,x[4]);
    element('p',detail,'Reference assumes the Node struct has the named fields. Check the listed edge cases yourself.');
  }
  window.cs315Lab={home:homeLab};
  const originalNav=drawNav;
  drawNav=function(){originalNav();if(CC==='cs315'&&screen!=='menu')button(nav,'🧪 CPSC 315 exam practice',homeLab);};
  if(CC==='cs315')drawNav();
}
installCs315ExamLab();
