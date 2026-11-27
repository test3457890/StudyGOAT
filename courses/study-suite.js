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
  drawNav=function(){stopAudio();baseNav();if(screen!=='menu'){const b=button(nav,'📆 Today',dashboard);b.className=screen==='dashboard'?'on':'';button(nav,'💬 Feedback',feedback);}};
  function prepare(kind){screen=kind;LS=null;quiz=null;cur=null;activePrep=null;drawNav();view.replaceChildren();}
  function dashboard(){
    prepare('dashboard');const c=card(),now=Date.now(),ids=CT(),deck=cardsFor(ids);
    const enrolled=new Set(deck.map(x=>x.id)),records=Object.entries(S.recall||{}).filter(([id])=>enrolled.has(id));
    const due=records.filter(([,r])=>Number(r?.due)<=now).length;
    const delayed=records.flatMap(([,r])=>Array.isArray(r.history)?r.history:[]).filter(h=>h.delayed);
    const retained=delayed.filter(h=>h.correct).length;
    const pace=S.reviewPace?.[CC],seconds=pace?.count?Math.max(15,Math.min(180,pace.totalMs/pace.count/1000)):45;
    const minutes=due?Math.max(1,Math.ceil(due*seconds/60)):0;
    const next=records.filter(([,r])=>Number(r?.due)>now).sort((a,b)=>a[1].due-b[1].due)[0];
    const missed=(S.missed||[]).filter(m=>inCourse(m.topic));
    one('h2',c,'📆 Today · '+(COURSES[CC]?.code||'StudyGOAT'));
    one('p',c,'Answer from memory, check the explanation, and return to missed concepts. You can study ahead whenever you want.');
    const grid=one('div',c);grid.className='suite-grid';
    [['Due reviews',due],['Estimated due time',minutes+' min'],['Delayed recall',delayed.length?Math.round(retained/delayed.length*100)+'%':'Not measured'],['Saved mistakes',missed.length],['New cards',Math.max(0,deck.length-records.length)]].forEach(([label,value])=>{const t=one('div',grid);t.className='suite-stat';one('strong',t,value);one('span',t,label);});
    one('p',c,'Delayed recall: '+retained+' remembered out of '+delayed.length+' self-graded reviews at least 20 hours after the prior attempt. Due-time estimate uses your '+(pace?.count||0)+' recorded card timings (45 seconds per card until measured).').className='hint';
    one('p',c,next?'Next scheduled review: '+new Date(next[1].due).toLocaleDateString()+'.':'No future reviews scheduled yet.');
    const actions=one('div',c);actions.className='suite-actions';
    button(actions,'Review due and new cards',()=>window.studyUpgrades.startRecall(ids));
    button(actions,'Review mistakes',reviewMistakes);
    button(actions,'Audio recall playlist',()=>startPlaylist(ids));
    if(S.audioPlaylist?.course===CC)button(actions,'Resume audio at card '+(S.audioPlaylist.index+1),()=>startPlaylist(S.audioPlaylist.ids,true));
    button(actions,'Exam practice',examSetup);
    if(S.studyGameSession?.course===CC)button(actions,'Resume '+(S.studyGameSession.kind||'game')+' game',resumeGame);
    const recent=(S.suiteGameResults||[]).filter(r=>r.course===CC).slice(-3);
    if(recent.length)one('p',c,'Recent games: '+recent.map(r=>r.kind+' '+r.score+'/'+r.total).join(' · ')+'. Results save with your progress.').className='hint';
    if(missed.length){
      one('h3',c,'Mistakes to revisit');
      missed.slice(0,5).forEach(m=>{const p=one('p',c);p.className='suite-note';p.textContent=(TOPICS[m.topic]?.name||m.topic)+': '+plain(m.prompt);});
    }
    const topics=ids.filter(id=>S.stats[id]?.t).map(id=>({id,p:S.stats[id].r/S.stats[id].t})).sort((a,b)=>a.p-b.p);
    if(topics.length){one('h3',c,'Topics to work on');topics.slice(0,3).forEach(t=>{const p=one('p',c);p.textContent=(TOPICS[t.id]?.name||t.id)+' · '+Math.round(t.p*100)+'% practice accuracy';button(p,'Practice',()=>practice(t.id));});}
    one('p',c,'Reviews are estimates based on self grading. A single successful round is not proof of long term mastery.').className='hint';
  }
  function feedback(){
    prepare('feedback');const c=card();one('h2',c,'💬 Make StudyGOAT better');
    one('p',c,'Save a feature idea, confusing question, accessibility problem, or bug. Your notes stay in this browser until you choose to download a feedback file and share it.');
    const type=one('select',c);type.setAttribute('aria-label','Feedback type');
    ['Feature idea','Question or explanation','Bug','Accessibility','Other'].forEach(x=>{const o=one('option',type,x);o.value=x;});
    const title=one('input',c);title.setAttribute('aria-label','Feedback title');title.placeholder='Short description';title.style.cssText='display:block;width:100%;margin:10px 0';
    const detail=one('textarea',c);detail.setAttribute('aria-label','Feedback details');detail.placeholder='What happened? What would help?';detail.style.cssText='display:block;width:100%;min-height:100px';
    const status=one('p',c);status.setAttribute('role','status');
    button(c,'Save feedback',()=>{if(!title.value.trim()||!detail.value.trim()){status.textContent='Add a title and details first.';return;}
      S.studyFeedback=S.studyFeedback||[];S.studyFeedback.push({type:type.value,title:title.value.trim().slice(0,120),detail:detail.value.trim().slice(0,1500),course:CC,at:new Date().toISOString()});S.studyFeedback=S.studyFeedback.slice(-100);save();feedback();
    });
    const records=S.studyFeedback||[];
    one('h3',c,'Saved feedback ('+records.length+')');
    records.slice(-10).reverse().forEach(item=>{const p=one('p',c);p.textContent=item.type+' · '+item.title+' · '+new Date(item.at).toLocaleDateString();});
    if(records.length||Object.keys(S.questionFlags||{}).length){
      button(c,'Download feedback JSON',()=>{const data={schema:'studygoat-feedback-v1',exported:new Date().toISOString(),feedback:records,questionFlags:S.questionFlags||{}};
        const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
        a.href=url;a.download='StudyGOAT Feedback.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
        status.textContent='Feedback file downloaded. Share it only with someone you want to review these notes.';
      });
    }
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
  function renderChallenge(q,c){
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),ns='http://www.w3.org/2000/svg';
    svg.setAttribute('role','img');svg.setAttribute('aria-label',q.description);svg.setAttribute('viewBox','0 0 440 430');
    svg.style.cssText='max-width:100%;height:auto;max-height:390px;background:#101827;border-radius:12px;margin:12px 0';
    const add=(tag,attrs,text)=>{const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(text!==undefined)e.textContent=String(text);svg.appendChild(e);};
    add('title',{},q.title);add('desc',{},q.description);
    const points={};
    if(q.kind==='tree'){
      const values=[];
      function inorder(node){if(node){inorder(node.left);values.push(node.value);inorder(node.right);}}
      inorder(q.root);function position(node,depth){if(!node)return;points[node.value]=[45+values.indexOf(node.value)*68,42+depth*65];position(node.left,depth+1);position(node.right,depth+1);}
      position(q.root,0);
      function edges(node){if(!node)return;for(const child of [node.left,node.right])if(child){add('line',{x1:points[node.value][0],y1:points[node.value][1],x2:points[child.value][0],y2:points[child.value][1],stroke:'#88c9ff','stroke-width':3});edges(child);}}
      edges(q.root);
    }else{
      q.labels.forEach((label,i)=>{const angle=2*Math.PI*i/q.labels.length-Math.PI/2;points[label]=[220+145*Math.cos(angle),200+145*Math.sin(angle)];});
      q.edges.forEach(([a,b])=>add('line',{x1:points[a][0],y1:points[a][1],x2:points[b][0],y2:points[b][1],stroke:'#88c9ff','stroke-width':3}));
    }
    Object.entries(points).forEach(([label,[x,y]])=>{add('circle',{cx:x,cy:y,r:20,fill:'#244875',stroke:'#b6ddff','stroke-width':2});add('text',{x,y:y+5,'text-anchor':'middle',fill:'#fff','font-size':15},label);});
    c.appendChild(svg);
  }
  function rememberGame(){S.studyGameSession=active;save();}
  function completedGame(){
    if(active.finished)return;active.finished=true;S.suiteGameResults=S.suiteGameResults||[];
    S.suiteGameResults.push({kind:active.kind,score:active.correct,total:active.kind==='sorting'?4:5,at:Date.now(),course:CC});
    S.suiteGameResults=S.suiteGameResults.slice(-30);S.studyGameSession=null;save();
  }
  function normalized(s){return String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');}
  function startTraversal(kind){active={kind,number:0,correct:0,seed:Date.now()>>>0,course:CC};rememberGame();nextTraversal();}
  function resumeGame(){const saved=S.studyGameSession;if(!saved||saved.course!==CC)return;active=saved;if(active.kind==='sorting')drawSorting();else nextTraversal();}
  function nextTraversal(){
    prepare('algorithmgame');const c=card();button(c,'← Back to games',playHub);
    if(active.number>=5){completedGame();one('h2',c,'Round complete · '+active.correct+' / 5');button(c,'Play again',()=>startTraversal(active.kind));return;}
    const gen=window.STUDYGOAT_ALGORITHMS,seed=(active.seed+active.number*7919)>>>0;
    const q=active.kind==='tree'?gen.tree(seed,['inorder','preorder','postorder'][active.number%3]):gen.graph(seed,active.number%2?'dfs':'bfs');
    one('h2',c,active.kind==='tree'?'🌳 Tree Traversal':'🕸️ Graph Explorer');
    one('p',c,'Challenge '+(active.number+1)+' of 5 · '+q.title).className='hint';
    one('p',c,q.prompt).className='suite-challenge';
    renderChallenge(q,c);
    const input=one('input',c);input.className='suite-input';input.placeholder='Example: A, B, C';input.setAttribute('aria-label','Visit order');
    const feedback=one('p',c);feedback.className='suite-feedback';feedback.hidden=true;feedback.setAttribute('role','status');
    const check=button(c,'Check my order',()=>{if(!input.value.trim())return;const ok=normalized(input.value)===normalized(q.answer);
      record(ok);if(ok)active.correct++;active.number++;rememberGame();input.disabled=true;check.disabled=true;
      feedback.hidden=false;feedback.textContent=(ok?'Correct. ':'Review: '+q.answer+'. ')+q.why;
      button(c,'Next challenge',nextTraversal);
    });input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check.click();}};
  }
  function startSorting(){active={kind:'sorting',number:0,correct:0,seed:Date.now()>>>0,course:CC};rememberGame();drawSorting();}
  function drawSorting(){
    prepare('algorithmgame');const c=card();button(c,'← Back to games',playHub);
    const sorting=window.STUDYGOAT_ALGORITHMS.insertion(active.seed).stages;
    if(active.number>=sorting.length){completedGame();one('h2',c,'Sorting complete · '+active.correct+' / '+sorting.length);button(c,'Try again',startSorting);return;}
    const step=sorting[active.number],format=a=>'['+a.join(', ')+']';
    one('h2',c,'🔢 Sorting Steps');one('p',c,'Insertion sort · Step '+(active.number+1)+' of '+sorting.length).className='hint';
    one('p',c,'Current array: '+format(step.from)).className='suite-challenge';
    one('p',c,'Which complete state follows after inserting '+step.inserted+' into the sorted prefix?');
    const choiceBox=one('div',c);choiceBox.className='suite-choices';
    const options=shuffle([step.correct,...step.options]);
    const fb=one('p',c);fb.className='suite-feedback';fb.hidden=true;fb.setAttribute('role','status');
    options.forEach(value=>button(choiceBox,format(value),()=>{if(!fb.hidden)return;const ok=value.join(',')===step.correct.join(',');record(ok);if(ok)active.correct++;active.number++;rememberGame();fb.hidden=false;fb.textContent=(ok?'Correct. ':'Next: '+format(step.correct)+'. ')+step.why;choiceBox.querySelectorAll('button').forEach(b=>b.disabled=true);
      button(c,'Next step',drawSorting);
    }));
  }
  let playlist=null;
  function startPlaylist(ids,resume=false){
    ids=gIds(ids);const deck=cardsFor(ids).filter(c=>plain(c.front).length<=140&&plain(c.back).length<=180).slice(0,30);
    const index=resume?Math.min(Math.max(0,Number(S.audioPlaylist?.index)||0),Math.max(0,deck.length-1)):0;
    playlist={ids,deck,i:index};S.audioPlaylist={course:CC,index,ids};save();drawPlaylist();
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
    const reveal=button(controls,'Reveal answer',()=>{answer.hidden=false;reveal.disabled=true;button(controls,'🔊 Read answer',()=>{status.textContent=say(item.back)?'Reading answer.':'Speech is unavailable here.';});});
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
  window.studySuite={dashboard,feedback,startTraversal,startSorting,startPlaylist,stopAudio};
}
installStudySuite();
