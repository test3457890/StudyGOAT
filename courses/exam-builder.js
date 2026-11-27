/* Configurable course exam with exact-set grading and answer review. */
function installExamBuilder(){
  const authored={
    cs315:[
      {id:'big-o-multi',topic:'sort',type:'multi',prompt:'Select every operation whose work stays O(1) as n grows.',options:['Read a[2] from an array','Run a loop exactly ten times','Scan every array element','Repeatedly halve n'],correct:[0,1],why:'Fixed work and direct access do not grow with n. A scan is O(n); halving is O(log n).'},
      {id:'bst-multi',topic:'avl',type:'multi',prompt:'Select every statement true for a BST with distinct keys.',diagram:'bst',options:['Every key in a left subtree is smaller than its root','Every key in a right subtree is larger than its root','Only direct children need satisfy ordering','Every BST is balanced'],correct:[0,1],why:'BST ordering applies to whole subtrees. A BST can be unbalanced.'},
      {id:'mst-multi',topic:'graph',type:'multi',prompt:'Select the properties of a spanning tree of a connected undirected graph with V vertices.',options:['It spans all V vertices','It has exactly V−1 edges','It has no cycles','It always gives shortest paths from a chosen source'],correct:[0,1,2],why:'A spanning tree connects all vertices without cycles and has V−1 edges. Shortest paths are a different objective.'},
      {id:'code-trace',topic:'sort',type:'typed',prompt:'Give the tightest Big O bound for this C code. Use O(n log n) notation.',code:'for (int i=0;i<n;i++) {\n    for (int j=1;j<n;j*=2) { work(); }\n}',answer:'O(n log n)',accept:['O(n*log n)','O(nlogn)'],why:'The outer loop runs n times and the inner loop doubles about log₂ n times.'},
      {id:'heap-index',topic:'heap',type:'typed',prompt:'In a zero indexed array heap, what index is the left child of index i?',answer:'2i+1',accept:['2*i+1','2(i)+1'],why:'For zero indexed heaps the children are 2i+1 and 2i+2.'},
      {id:'stack-multi',topic:'stack',type:'multi',prompt:'Select all statements that describe a stack.',options:['Push adds to the top','Pop removes the most recently pushed item','Its default removal order is FIFO','A stack can implement a depth first search'],correct:[0,1,3],why:'A stack is last in, first out. Queues provide FIFO behavior.'},
      {id:'avl-multi',topic:'avl',type:'multi',prompt:'Select all true AVL statements.',options:['It is a binary search tree','Each node has balance factor -1, 0 or 1','It is always a complete binary tree','Worst case search is O(log n)'],correct:[0,1,3],why:'AVL trees keep a bounded height difference; they need not be complete.'},
      {id:'graph-multi',topic:'graph',type:'multi',prompt:'Select algorithms used to find a minimum spanning tree.',options:['Prim','Kruskal','Dijkstra','Breadth first search'],correct:[0,1],why:'Prim and Kruskal build MSTs. Dijkstra solves shortest paths.'},
      {id:'set-multi',topic:'sets',type:'multi',prompt:'Given A={1,2} and B={2,3}, select all true statements.',options:['A ∩ B = {2}','A ∪ B = {1,2,3}','A − B = {1}','A ∩ B = {1,3}'],correct:[0,1,2],why:'Intersection keeps shared members, union all distinct members, difference only members in A.'}
    ],
    cpsc222:[
      {id:'sets-multi',topic:'dm_sets',type:'multi',prompt:'Let A={1,2} and B={2,3}. Select every true statement.',options:['A ∩ B = {2}','A ∪ B = {1,2,3}','A − B = {1}','A ∩ B = {1,3}'],correct:[0,1,2],why:'Intersection is shared values, union combines distinct values, and difference keeps values only in A.'},
      {id:'logic-multi',topic:'dm_logic',type:'multi',prompt:'Select every expression equivalent to NOT (P AND Q).',options:['NOT P OR NOT Q','P implies NOT Q','NOT P AND NOT Q','NOT (Q AND P)'],correct:[0,1,3],why:'De Morgan gives ¬P ∨ ¬Q. P → ¬Q and ¬(Q ∧ P) have the same truth table.'},
      {id:'set-properties',topic:'dm_sets',type:'multi',prompt:'Select all true statements about mathematical sets.',options:['Order of elements does not matter','Duplicate copies of an element do not change the set','Intersection contains members found in both sets','Every set is a sequence'],correct:[0,1,2],why:'Sets contain distinct members and have no intrinsic order.'}
    ]
  };
  const el=(tag,parent,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);parent.appendChild(e);return e;};
  const btn=(parent,text,action)=>{const b=el('button',parent,text);b.type='button';b.onclick=action;return b;};
  const plain=x=>stripH(String(x||'')).replace(/\s+/g,' ').trim();
  const norm=x=>plain(x).toLowerCase().replace(/\s+/g,'').replace(/\*/g,'').replace(/²/g,'^2').replace(/³/g,'^3');
  const shuffleCopy=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  function renderDiagram(q,parent){
    if(q.diagram!=='bst')return;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 380 210');svg.setAttribute('role','img');
    svg.setAttribute('aria-label','Binary search tree: root 10; left 6, right 20; 6 has left 1; 20 has left 15; 15 has right 18.');
    svg.style.cssText='max-width:100%;height:auto;display:block;background:#101827;border-radius:12px;margin:10px 0';
    const make=(tag,attrs,text)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text)n.textContent=text;svg.appendChild(n);};
    make('title',{},'Binary search tree example');make('desc',{},'Root ten has left child six and right child twenty. Six has left child one. Twenty has left child fifteen. Fifteen has right child eighteen.');
    const points={'10':[180,30],'6':[90,90],'20':[280,90],'1':[45,160],'15':[235,160],'18':[310,190]};
    [['10','6'],['10','20'],['6','1'],['20','15'],['15','18']].forEach(([a,b])=>make('line',{x1:points[a][0],y1:points[a][1],x2:points[b][0],y2:points[b][1],stroke:'#82c8ff','stroke-width':3}));
    Object.entries(points).forEach(([id,[x,y]])=>{make('circle',{cx:x,cy:y,r:19,fill:'#244875',stroke:'#a8d9ff','stroke-width':2});make('text',{x,y:y+5,'text-anchor':'middle',fill:'#fff','font-size':15},id);});
    parent.appendChild(svg);
  }
  let session=null;
  function pool(){
    const items=[];
    for(const topic of CT()){
      (BANK[topic]||[]).forEach((b,i)=>{if(!b?.q||!Array.isArray(b.c)||b.c.length<2||!b.c[0])return;
        const options=b.c.map(plain);
        if(new Set(options.map(norm)).size!==options.length)return;
        items.push({id:'bank:'+topic+':'+i,topic,type:'mc',prompt:plain(b.q),options,correct:[0],why:plain(b.why)});
      });
      (GLOSS[topic]||[]).forEach(([term,definition],i)=>{if(!term||!definition||plain(term).length>65||plain(definition).length>170)return;
        items.push({id:'term:'+topic+':'+i,topic,type:'typed',prompt:'Name the term: '+plain(definition),answer:plain(term),why:'Term: '+plain(term)+'. '+plain(definition)});
      });
    }
    return items.concat((authored[CC]||[]).filter(q=>TOPICS[q.topic]));
  }
  function store(){S.examBlueprint=S.examBlueprint||{attempts:[]};return S.examBlueprint;}
  function shell(){screen='blueprint';LS=null;quiz=null;cur=null;activePrep=null;drawNav();view.replaceChildren();}
  function setup(){
    shell();const c=el('div',view);c.className='card';el('h2',c,'📝 Build a practice exam');
    el('p',c,'Choose question types and length. Answers appear when you submit. Existing course bank questions and term cards supply the content. Multi-answer items are curated where available.');
    const available=pool();const counts={mc:available.filter(q=>q.type==='mc').length,multi:available.filter(q=>q.type==='multi').length,typed:available.filter(q=>q.type==='typed').length};
    el('p',c,'Available in '+(COURSES[CC]?.code||'this course')+': '+counts.mc+' multiple choice · '+counts.multi+' select all · '+counts.typed+' written.').className='hint';
    const length=el('select',c);length.setAttribute('aria-label','Question count');
    [5,10,20].forEach(n=>{const o=el('option',length,n+' questions');o.value=String(n);});
    const modes={};[['mc','Multiple choice'],['multi','Select all that apply'],['typed','Written / code tracing']].forEach(([kind,label])=>{
      const l=el('label',c),box=el('input',l);box.type='checkbox';box.checked=counts[kind]>0;box.disabled=counts[kind]===0;modes[kind]=box;el('span',l,' '+label+'  ');
    });
    const msg=el('p',c);msg.setAttribute('role','alert');
    btn(c,'Start practice exam',()=>{const kinds=Object.keys(modes).filter(k=>modes[k].checked);
      const candidates=available.filter(q=>kinds.includes(q.type));if(!candidates.length){msg.textContent='Select at least one available question type.';return;}
      const mixed=[];const byType={};kinds.forEach(k=>{byType[k]=shuffleCopy(candidates.filter(q=>q.type===k));});
      while(mixed.length<Number(length.value)&&kinds.some(k=>byType[k].length)){
        for(const k of kinds)if(byType[k].length&&mixed.length<Number(length.value))mixed.push(byType[k].shift());
      }
      session={course:CC,items:mixed.map(q=>q.id),index:0,answers:{},submitted:false,started:Date.now()};
      store().session=session;save();drawQuestion();
    });
    if(store().session&&!store().session.submitted&&store().session.course===CC)btn(c,'Resume saved exam',()=>{session=store().session;drawQuestion();});
  }
  function current(){const p=pool(),s=session||store().session;return p.find(q=>q.id===s?.items[s?.index]);}
  function drawQuestion(){
    const s=session||store().session;if(!s||s.course!==CC){setup();return;}session=s;
    if(s.index>=s.items.length){results();return;}shell();const c=el('div',view);c.className='card';
    btn(c,'Save and leave',setup);
    const q=current();if(!q){el('p',c,'This question changed since your exam was saved. Start a new practice exam.');btn(c,'New exam',()=>{store().session=null;setup();});return;}
    el('p',c,'Question '+(s.index+1)+' of '+s.items.length+' · '+(TOPICS[q.topic]?.name||q.topic)+' · '+({mc:'Multiple choice',multi:'Select all that apply',typed:'Written answer'}[q.type]||q.type)).className='hint';
    el('h2',c,q.prompt);renderDiagram(q,c);if(q.code){const pre=el('pre',c),code=el('code',pre,q.code);pre.style.cssText='white-space:pre-wrap;overflow:auto';}
    const saved=s.answers[q.id],options=el('div',c);
    let controls=[],input;
    if(q.type==='typed'){input=el('input',options);input.setAttribute('aria-label','Your written answer');input.autocomplete='off';input.style.cssText='display:block;width:100%;max-width:580px;min-height:44px';input.value=typeof saved==='string'?saved:'';}
    else {
      q.options.forEach((choice,i)=>{const label=el('label',options);label.style.cssText='display:block;margin:8px 0;padding:8px;background:#203555;border-radius:8px';
        const pick=el('input',label);pick.type=q.type==='multi'?'checkbox':'radio';if(q.type==='mc')pick.name='blueprintChoice';
        pick.checked=Array.isArray(saved)&&saved.includes(i);
        controls.push(pick);el('span',label,' '+choice);
      });
    }
    const message=el('p',c);message.setAttribute('role','alert');
    const saveAnswer=()=>{const value=q.type==='typed'?input.value.trim():controls.flatMap((box,i)=>box.checked?[i]:[]);
      if(!value.length){message.textContent='Enter or select an answer to continue.';return;}
      s.answers[q.id]=value;s.index++;store().session=s;save();drawQuestion();};
    btn(c,s.index===s.items.length-1?'Finish and review':'Save answer and continue',saveAnswer);
    btn(c,'Skip this question',()=>{s.index++;store().session=s;save();drawQuestion();});
  }
  function isCorrect(q,answer,s){
    if(s?.overrides?.[q.id]?.accepted)return true;
    if(q.type==='typed')return [q.answer,...(q.accept||[])].some(value=>norm(answer)===norm(value));
    return Array.isArray(answer)&&answer.length===q.correct.length&&answer.every(i=>q.correct.includes(i));
  }
  function results(){
    const s=session||store().session;if(!s){setup();return;}s.submitted=true;
    const lookup=new Map(pool().map(q=>[q.id,q]));
    const answered=s.items.map(id=>lookup.get(id)).filter(Boolean);
    const score=answered.filter(q=>isCorrect(q,s.answers[q.id],s)).length;
    if(!s.recorded){const p=store();p.attempts.push({at:Date.now(),course:CC,score,total:answered.length});p.attempts=p.attempts.slice(-30);s.attemptIndex=p.attempts.length-1;s.recorded=true;}
    else if(Number.isInteger(s.attemptIndex)&&store().attempts[s.attemptIndex])store().attempts[s.attemptIndex].score=score;
    store().session=s;save();shell();const c=el('div',view);c.className='card';
    el('h2',c,'Practice exam · '+score+' / '+answered.length);
    el('p',c,'Review every answer, including each option in select-all questions. Exact matching is used for written answers; use the report button if a valid equivalent should be reviewed.');
    btn(c,'Build another exam',setup);
    answered.forEach(q=>{
      const a=s.answers[q.id],ok=isCorrect(q,a,s),details=el('details',c);if(!ok)details.open=true;
      el('summary',details,(ok?'✓ ':'Review · ')+(TOPICS[q.topic]?.name||q.topic)+' · '+q.prompt);
      if(q.type==='typed'){el('p',details,'Your answer: '+(a||'Skipped')+'. Expected: '+q.answer+'.');}
      else q.options.forEach((choice,i)=>el('p',details,(q.correct.includes(i)?'✓ Correct choice: ':'')+(Array.isArray(a)&&a.includes(i)?'You selected: ':'')+choice));
      el('p',details,q.why);
      if(q.type==='typed'&&!ok&&typeof a==='string'&&a.trim()){
        const reason=el('input',details);reason.placeholder='Why is your wording equivalent?';reason.setAttribute('aria-label','Reason for equivalent answer');reason.style.cssText='display:block;width:100%;max-width:520px;margin:8px 0';
        btn(details,'Self-mark equivalent answer',()=>{if(!reason.value.trim())return;s.overrides=s.overrides||{};s.overrides[q.id]={accepted:true,reason:reason.value.slice(0,240),at:Date.now()};save();results();});
      }
      const note=el('textarea',details);note.setAttribute('aria-label','Report issue with '+q.id);note.placeholder='Report an ambiguous or incorrect answer (saved privately in your progress)';note.style.cssText='display:block;width:100%;min-height:58px';
      note.value=S.questionFlags?.[q.id]?.note||'';
      btn(details,'Save question feedback',()=>{S.questionFlags=S.questionFlags||{};S.questionFlags[q.id]={note:note.value.slice(0,500),at:Date.now(),course:CC};save();note.insertAdjacentText('afterend',' Saved privately.');});
    });
  }
  const baseNav=drawNav;
  drawNav=function(){baseNav();if(screen!=='menu')btn(nav,'📝 Build exam',setup);};
  window.examBuilder={setup,start:()=>setup()};
}
installExamBuilder();
