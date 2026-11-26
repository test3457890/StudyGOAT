/* Study dashboard, misconception review, algorithm games and audio recall. */
function installStudySuite() {
  const css=document.createElement('style');
  css.textContent='.suite-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin:14px 0}.suite-stat{padding:18px;background:#203555;border:1px solid var(--line);border-radius:14px}.suite-stat strong{display:block;font-size:2rem;color:var(--gold)}.suite-actions{display:flex;gap:10px;flex-wrap:wrap;margin:15px 0}.suite-challenge{font-size:1.15rem;line-height:1.6}.suite-input{display:block;width:100%;max-width:520px;min-height:44px;margin:12px 0}.suite-feedback{padding:12px;border-radius:10px;background:#203555;margin:14px 0}.suite-note{max-width:70ch}.suite-choices{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px}.suite-choices button{text-align:left}.suite-audio{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}@media(max-width:650px){.suite-actions button,.suite-audio button{flex:1 1 43%}}';
  document.head.appendChild(css);
  const one=(tag,parent,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);parent.appendChild(e);return e;};
  const button=(parent,label,fn)=>{const b=one('button',parent,label);b.type='button';b.onclick=fn;return b;};
  const card=()=>{const c=one('div',view);c.className='card';return c;};
  const plain=s=>stripH(String(s||'')).replace(/\s+/g,' ').trim();
  const gameStats=()=>S.suiteGames||(S.suiteGames={played:0,correct:0});
  let active=null,audio=null,timer=null;
  function stopAudio(){if(timer)clearTimeout(timer);timer=null;if(typeof speechSynthesis!=='undefined')speechSynthesis.cancel();audio=null;}
  const baseNav=drawNav;
  drawNav=function(){stopAudio();baseNav();if(screen!=='menu'){const b=button(nav,'📆 Today',dashboard);b.className=screen==='dashboard'?'on':'';}};
  function prepare(kind){screen=kind;LS=null;quiz=null;cur=null;activePrep=null;drawNav();view.replaceChildren();}
  function dashboard(){
    prepare('dashboard');const c=card(),now=Date.now(),ids=CT(),deck=cardsFor(ids);
    const enrolled=new Set(deck.map(x=>x.id)),records=Object.entries(S.recall||{}).filter(([id])=>enrolled.has(id));
    const due=records.filter(([,r])=>Number(r?.due)<=now).length;
    const next=records.filter(([,r])=>Number(r?.due)>now).sort((a,b)=>a[1].due-b[1].due)[0];
    const missed=(S.missed||[]).filter(m=>inCourse(m.topic));
    one('h2',c,'📆 Today · '+(COURSES[CC]?.code||'StudyGOAT'));
    one('p',c,'Answer from memory, check the explanation, and return to missed concepts. You can study ahead whenever you want.');
    const grid=one('div',c);grid.className='suite-grid';
    [['Due reviews',due],['Studied cards',records.length],['Saved mistakes',missed.length],['New cards',Math.max(0,deck.length-records.length)]].forEach(([label,value])=>{const t=one('div',grid);t.className='suite-stat';one('strong',t,value);one('span',t,label);});
    one('p',c,next?'Next scheduled review: '+new Date(next[1].due).toLocaleDateString()+'.':'No future reviews scheduled yet.');
    const actions=one('div',c);actions.className='suite-actions';
    button(actions,'Review due and new cards',()=>window.studyUpgrades.startRecall(ids));
    button(actions,'Review mistakes',reviewMistakes);
    button(actions,'Audio recall playlist',()=>startPlaylist(ids));
    button(actions,'Exam practice',examSetup);
    if(missed.length){
      one('h3',c,'Mistakes to revisit');
      missed.slice(0,5).forEach(m=>{const p=one('p',c);p.className='suite-note';p.textContent=(TOPICS[m.topic]?.name||m.topic)+': '+plain(m.prompt);});
    }
    const topics=ids.filter(id=>S.stats[id]?.t).map(id=>({id,p:S.stats[id].r/S.stats[id].t})).sort((a,b)=>a.p-b.p);
    if(topics.length){one('h3',c,'Topics to work on');topics.slice(0,3).forEach(t=>{const p=one('p',c);p.textContent=(TOPICS[t.id]?.name||t.id)+' · '+Math.round(t.p*100)+'% practice accuracy';button(p,'Practice',()=>practice(t.id));});}
    one('p',c,'Reviews are estimates based on self grading. A single successful round is not proof of long term mastery.').className='hint';
  }
  const baseFinish=finish;
  finish=function(ok,pick){
    baseFinish.apply(this,arguments);
    if(ok||!cur||!document.getElementById('fb'))return;
    const fb=document.getElementById('fb'),qidValue=qid(cur),box=one('div',fb);box.className='suite-feedback';
    const label=one('label',box,'What caused this miss? ');
    const select=one('select',label);
    [['','Choose a reason'],['rule','I did not know the rule'],['misread','I misread the question'],['process','I made a calculation or order error'],['mixup','I confused two concepts'],['guess','I guessed'],['flag','The question or answer seems wrong']].forEach(([v,t])=>{const o=one('option',select,t);o.value=v;});
    select.value=S.diagnoses?.[qidValue]?.reason||'';
    const notes=one('textarea',box);notes.placeholder='Optional private note for next time';notes.setAttribute('aria-label','Private mistake note');notes.style.cssText='display:block;width:100%;min-height:62px;margin:9px 0';notes.value=S.diagnoses?.[qidValue]?.note||'';
    const status=one('span',box,'Saved with your progress.');status.setAttribute('role','status');status.className='hint';
    const persist=()=>{S.diagnoses=S.diagnoses||{};S.diagnoses[qidValue]={reason:select.value,note:notes.value.slice(0,500),at:Date.now(),topic:cur.topic};save();status.textContent='Mistake note saved.';};
    select.onchange=persist;notes.onchange=persist;
    button(box,'Practice this concept',()=>practice(cur.topic));
  };
  function record(correct){const s=gameStats();s.played++;if(correct)s.correct++;bumpDay();save();hud();}
  const challenges=[
    {kind:'tree',title:'BST inorder traversal',prompt:'Root 10; left child 6 with left child 1; right child 20 with left child 15; 15 has right child 18. Enter inorder values.',answer:'1,6,10,15,18,20',why:'Inorder means left subtree, node, right subtree.'},
    {kind:'tree',title:'BST preorder traversal',prompt:'Root 10; left child 6 with left child 1; right child 20 with left child 15; 15 has right child 18. Enter preorder values.',answer:'10,6,1,20,15,18',why:'Preorder means node, left subtree, right subtree.'},
    {kind:'tree',title:'BST postorder traversal',prompt:'Root 10; left child 6 with left child 1; right child 20 with left child 15; 15 has right child 18. Enter postorder values.',answer:'1,6,18,15,20,10',why:'Postorder means left subtree, right subtree, node.'},
    {kind:'graph',title:'Breadth first search',prompt:'Start at A. Adjacency: A→B,C; B→D,E; C→F. Visit neighbors alphabetically. Enter visit order.',answer:'A,B,C,D,E,F',why:'BFS uses a queue and completes one distance level before the next.'},
    {kind:'graph',title:'Depth first search',prompt:'Start at A. Adjacency: A→B,C; B→D,E; C→F. Explore neighbors alphabetically. Enter visit order.',answer:'A,B,D,E,C,F',why:'DFS explores one branch fully before returning.'}
  ];
  function normalized(s){return String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');}
  function startTraversal(kind){active={kind,number:0,correct:0};prepare('algorithmgame');nextTraversal();}
  function nextTraversal(){
    prepare('algorithmgame');const c=card();button(c,'← Back to games',playHub);
    if(active.number>=5){one('h2',c,'Round complete · '+active.correct+' / 5');button(c,'Play again',()=>startTraversal(active.kind));return;}
    const list=challenges.filter(x=>x.kind===active.kind),q=list[active.number%list.length];
    one('h2',c,active.kind==='tree'?'🌳 Tree Traversal':'🕸️ Graph Explorer');
    one('p',c,'Challenge '+(active.number+1)+' of 5 · '+q.title).className='hint';
    one('p',c,q.prompt).className='suite-challenge';
    const input=one('input',c);input.className='suite-input';input.placeholder='Example: A, B, C';input.setAttribute('aria-label','Visit order');
    const feedback=one('p',c);feedback.className='suite-feedback';feedback.hidden=true;feedback.setAttribute('role','status');
    const check=button(c,'Check my order',()=>{if(!input.value.trim())return;const ok=normalized(input.value)===normalized(q.answer);
      record(ok);if(ok)active.correct++;input.disabled=true;check.disabled=true;
      feedback.hidden=false;feedback.textContent=(ok?'Correct. ':'Review: '+q.answer+'. ')+q.why;
      button(c,'Next challenge',()=>{active.number++;nextTraversal();});
    });input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check.click();}};
  }
  const sorting=[
    {from:'[5, 1, 4, 2]',correct:'[1, 5, 4, 2]',options:['[5, 4, 1, 2]','[1, 4, 5, 2]'],why:'Insertion sort takes 1 and inserts it before 5.'},
    {from:'[1, 5, 4, 2]',correct:'[1, 4, 5, 2]',options:['[1, 5, 2, 4]','[4, 1, 5, 2]'],why:'The sorted prefix [1, 5] gains 4 between 1 and 5.'},
    {from:'[1, 4, 5, 2]',correct:'[1, 2, 4, 5]',options:['[1, 4, 2, 5]','[2, 1, 4, 5]'],why:'Insert 2 between 1 and 4 to finish the sorted prefix.'}
  ];
  function startSorting(){active={number:0,correct:0};drawSorting();}
  function drawSorting(){
    prepare('algorithmgame');const c=card();button(c,'← Back to games',playHub);
    if(active.number>=sorting.length){one('h2',c,'Sorting complete · '+active.correct+' / '+sorting.length);button(c,'Try again',startSorting);return;}
    const step=sorting[active.number];
    one('h2',c,'🔢 Sorting Steps');one('p',c,'Insertion sort · Step '+(active.number+1)+' of '+sorting.length).className='hint';
    one('p',c,'Current array: '+step.from).className='suite-challenge';
    one('p',c,'Which complete array state follows after inserting the next item?');
    const choiceBox=one('div',c);choiceBox.className='suite-choices';
    const options=[step.correct,...step.options].sort(()=>Math.random()-.5);
    const fb=one('p',c);fb.className='suite-feedback';fb.hidden=true;fb.setAttribute('role','status');
    options.forEach(value=>button(choiceBox,value,()=>{if(!fb.hidden)return;const ok=value===step.correct;record(ok);if(ok)active.correct++;fb.hidden=false;fb.textContent=(ok?'Correct. ':'Next: '+step.correct+'. ')+step.why;choiceBox.querySelectorAll('button').forEach(b=>b.disabled=true);
      button(c,'Next step',()=>{active.number++;drawSorting();});
    }));
  }
  let playlist=null;
  function startPlaylist(ids){
    ids=gIds(ids);const deck=cardsFor(ids).filter(c=>plain(c.front).length<=140&&plain(c.back).length<=180).slice(0,30);
    playlist={ids,deck,i:0};S.audioPlaylist={course:CC,index:0,ids};save();drawPlaylist();
  }
  function say(text,onDone){
    if(typeof speechSynthesis==='undefined'||typeof SpeechSynthesisUtterance==='undefined')return false;
    speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(plain(text).slice(0,1000));
    u.rate=Number(S.set?.speechRate)||1;
    const voice=speechSynthesis.getVoices().find(v=>v.voiceURI===S.set?.speechVoice);
    if(voice)u.voice=voice;
    u.onend=()=>{if(onDone)onDone();};speechSynthesis.speak(u);audio=u;return true;
  }
  function drawPlaylist(){
    prepare('audioplaylist');const c=card();button(c,'← Back to Today',dashboard);
    one('h2',c,'🎧 Audio recall playlist');
    one('p',c,'Listen to a prompt, pause to recall it, then reveal and read the answer. Nothing plays until you press a button.');
    if(!playlist.deck.length){one('p',c,'Choose a course with short study cards to use this playlist.');return;}
    const item=playlist.deck[playlist.i],counter=one('p',c,'Card '+(playlist.i+1)+' of '+playlist.deck.length);counter.className='hint';
    one('p',c,plain(item.front)).className='suite-challenge';
    const controls=one('div',c);controls.className='suite-audio';
    const status=one('p',c);status.setAttribute('role','status');status.className='hint';
    button(controls,'🔊 Read prompt',()=>{status.textContent=say(item.front)?'Reading prompt. Recall the answer before revealing.':'Speech is unavailable here; read the prompt on screen.';});
    button(controls,'Pause / Resume',()=>{if(typeof speechSynthesis==='undefined')return;if(speechSynthesis.paused)speechSynthesis.resume();else speechSynthesis.pause();});
    button(controls,'Stop',()=>{stopAudio();status.textContent='Stopped.';});
    const answer=one('div',c);answer.hidden=true;answer.className='suite-feedback';answer.textContent=plain(item.back);
    button(controls,'Reveal answer',()=>{answer.hidden=false;button(controls,'🔊 Read answer',()=>{status.textContent=say(item.back)?'Reading answer.':'Speech is unavailable here.';});});
    button(controls,'Next card',()=>{playlist.i=(playlist.i+1)%playlist.deck.length;S.audioPlaylist.index=playlist.i;save();drawPlaylist();});
  }
  const basePlay=playHub;
  playHub=function(){basePlay.apply(this,arguments);const box=view.querySelector('.games');if(!box)return;
    [['🌳 Tree Traversal','Type preorder, inorder, or postorder from a described tree.',()=>startTraversal('tree')],
     ['🕸️ Graph Explorer','Practice BFS and DFS visit order.',()=>startTraversal('graph')],
     ['🔢 Sorting Steps','Select each state of insertion sort.',startSorting],
     ['🎧 Audio Recall','Listen, pause, answer, and reveal.',()=>startPlaylist(plIds())]].forEach(([title,desc,action])=>{
       const tile=one('div',box);tile.className='card game';const b=button(tile,title,action);b.style.cssText='width:100%;text-align:left';one('p',tile,desc);
     });
  };
  window.studySuite={dashboard,startTraversal,startSorting,startPlaylist,stopAudio};
}
installStudySuite();
