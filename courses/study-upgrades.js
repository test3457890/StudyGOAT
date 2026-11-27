/* Optional speech, clear walkthrough controls, and spaced free recall. */
function installStudyUpgrades() {
  const style=document.createElement('style');
  style.textContent='.split:has(#lc){grid-template-columns:minmax(240px,32%) minmax(0,1fr)}#lc{min-width:0}#lc .row{gap:9px}#lc .stepbox{min-height:0;margin:16px 0}.study-step-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px}.study-step-head h3{font-size:20px;margin:0}.study-audio{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:14px 0}.study-audio select{width:auto;max-width:180px}.study-audio button,.study-audio select{min-height:42px}.study-step-content{max-width:70ch}.study-recall-answer{font-size:1.2rem;padding:14px;border-left:4px solid var(--green);background:#203555;border-radius:8px;margin:14px 0}.study-recall-prompt{font-size:1.3rem;line-height:1.55;max-width:70ch}.study-due{color:var(--muted);font-size:14px}.study-audio-status{font-size:13px;color:var(--muted)}@media(max-width:820px){.split:has(#lc){grid-template-columns:1fr}}@media(max-width:600px){#lc .row button{flex:1 1 44%}.study-audio button{flex:1 1 auto}}';
  document.head.appendChild(style);
  let utterance=null,scope='',recall=null;
  const speechAvailable=()=>typeof speechSynthesis!=='undefined'&&typeof SpeechSynthesisUtterance!=='undefined';
  const stop=()=>{if(speechAvailable())speechSynthesis.cancel();utterance=null;scope='';};
  const clean=(s)=>String(s||'').replace(/\s+/g,' ').trim();
  const plain=(s)=>clean(stripH(String(s||'')));
  function talk(text,where) {
    if(!speechAvailable())return;
    text=clean(text);if(!text)return;
    stop();scope=where;utterance=new SpeechSynthesisUtterance(text.slice(0,5000));
    utterance.lang='en-US';
    utterance.rate=Number(S.set?.speechRate)||1;
    const choice=S.set?.speechVoice;
    const voices=speechSynthesis.getVoices();
    if(choice){const voice=voices.find(v=>v.voiceURI===choice);if(voice)utterance.voice=voice;}
    const status=document.getElementById('studyAudioStatus');
    if(status)status.textContent='Reading. Use Pause or Stop.';
    utterance.onend=utterance.onerror=()=>{const current=document.getElementById('studyAudioStatus');if(current)current.textContent='Audio stopped.';utterance=null;scope='';};
    speechSynthesis.speak(utterance);
  }
  function control(parent,readText,label) {
    const bar=document.createElement('div');bar.className='study-audio';parent.appendChild(bar);
    if(!speechAvailable()) {const msg=document.createElement('span');msg.className='hint';msg.textContent='Read aloud is unavailable in this browser.';bar.appendChild(msg);return;}
    const add=(name,action)=>{const b=document.createElement('button');b.type='button';b.textContent=name;b.addEventListener('click',action);bar.appendChild(b);return b;};
    add('🔊 '+label,()=>talk(readText(),label));
    add('Pause / Resume',()=>{if(speechSynthesis.paused)speechSynthesis.resume();else if(speechSynthesis.speaking)speechSynthesis.pause();});
    add('Stop',stop);
    const speed=document.createElement('select');speed.setAttribute('aria-label','Reading speed');
    [0.75,1,1.25,1.5].forEach(v=>{const o=document.createElement('option');o.value=String(v);o.textContent=v+'× speed';speed.appendChild(o);});
    speed.value=String(S.set?.speechRate||1);
    speed.addEventListener('change',()=>{S.set=S.set||{};S.set.speechRate=Number(speed.value);save();if(speechSynthesis.speaking||speechSynthesis.paused)talk(readText(),label);});
    bar.appendChild(speed);
    const voices=speechSynthesis.getVoices().filter(v=>v.lang&&v.lang.toLowerCase().startsWith('en'));
    if(voices.length>1){const select=document.createElement('select');select.setAttribute('aria-label','Reading voice');
      const def=document.createElement('option');def.value='';def.textContent='Default voice';select.appendChild(def);
      voices.forEach(v=>{const o=document.createElement('option');o.value=v.voiceURI;o.textContent=v.name;select.appendChild(o);});
      select.value=S.set?.speechVoice||'';
      select.addEventListener('change',()=>{S.set=S.set||{};S.set.speechVoice=select.value;save();if(speechSynthesis.speaking||speechSynthesis.paused)talk(readText(),label);});
      bar.appendChild(select);
    }
    const status=document.createElement('span');status.id='studyAudioStatus';status.className='study-audio-status';status.setAttribute('role','status');status.textContent='Audio is optional and starts when you press Read.';bar.appendChild(status);
  }
  const baseNav=drawNav;
  drawNav=function(){stop();baseNav();};
  const baseStep=drawStep;
  drawStep=function(){
    stop();baseStep();const lc=document.getElementById('lc');if(!lc||!LS)return;
    const title=LESSONS[LS.id]?.[LS.li]?.t||TOPICS[LS.id]?.name||'Lesson';
    const head=document.createElement('div');head.className='study-step-head';
    const h=document.createElement('h3');h.textContent=title;head.appendChild(h);
    const count=document.createElement('span');count.className='hint';count.textContent='Step '+(LS.i+1)+' / '+LS.steps.length;head.appendChild(count);
    lc.prepend(head);
    const goal=document.createElement('p');goal.className='hint';
    goal.textContent='Goal: '+plain(LESSONS[LS.id]?.[LS.li]?.idea?.[0]||title);
    head.insertAdjacentElement('afterend',goal);
    const box=lc.querySelector('.stepbox');if(box)box.classList.add('study-step-content');
    const progress=lc.querySelector('.prog');if(progress){progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Walkthrough progress');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax',String(LS.steps.length));progress.setAttribute('aria-valuenow',String(LS.i+1));}
    const bar=document.createElement('div');
    const target=lc.querySelector('.stepbox')||lc.querySelector('.askbox')||lc;
    target.insertAdjacentElement('afterend',bar);
    control(bar,()=>{const visible=lc.querySelector('.stepbox')||lc.querySelector('.askbox');return title+'. '+(visible?.textContent||'');},'Read this step');
  };
  const baseShow=show;
  show=function(){stop();baseShow.apply(this,arguments);const qc=document.getElementById('qc');if(qc)control(qc,()=>qc.querySelector('.prompt')?.textContent||'','Read question');};
  const baseFlash=fcDraw;
  fcDraw=function(){stop();baseFlash();const card=view.querySelector('.fcwrap');if(card)control(card,()=>card.querySelector(card.querySelector('.fc.flipped')?'.fc-back .fc-text':'.fc-front .fc-text')?.textContent||'','Read card');};
  const baseLearnShow=lrnShow;
  lrnShow=function(){stop();baseLearnShow();const card=view.querySelector('.card');if(card)control(card,()=>card.querySelector('.prompt')?.textContent||'','Read prompt');};
  const day=86400000;
  function selectedCards(ids){return cardsFor(ids).filter(c=>plain(c.front).length<=180&&plain(c.back).length<=260);}
  function startRecall(ids) {
    stopGames();stop();ids=gIds(ids);const now=Date.now(),seen=S.recall||{};
    const deck=selectedCards(ids).sort((a,b)=>(seen[a.id]?.due||0)-(seen[b.id]?.due||0));
    const due=deck.filter(c=>!seen[c.id]||(seen[c.id].due||0)<=now);
    recall={ids,deck:(due.length?due:deck).slice(0,10),i:0,good:0,revealed:false};
    screen='play';drawNav();drawRecall();
  }
  function drawRecall(){
    stop();view.replaceChildren();const card=document.createElement('div');card.className='card';view.appendChild(card);
    const exit=document.createElement('button');exit.textContent='← Back to games';exit.onclick=()=>playHub();card.appendChild(exit);
    const title=document.createElement('h2');title.textContent='🧠 Recall Sprint';card.appendChild(title);
    if(!recall?.deck.length){const p=document.createElement('p');p.textContent='Add a few flashcards in these topics to play.';card.appendChild(p);return;}
    if(recall.i>=recall.deck.length){const p=document.createElement('p');p.textContent='Round complete: '+recall.good+' remembered out of '+recall.deck.length+'. Cards will return on their due dates.';card.appendChild(p);const again=document.createElement('button');again.textContent='Another round';again.onclick=()=>startRecall(recall.ids);card.appendChild(again);return;}
    const c=recall.deck[recall.i];recall.cardShownAt=Date.now();const status=document.createElement('p');status.className='study-due';status.textContent='Card '+(recall.i+1)+' / '+recall.deck.length+' · '+(TOPICS[c.topic]?.name||'Study card')+' · '+(S.recall?.[c.id]?'Review':'New');card.appendChild(status);
    const prompt=document.createElement('p');prompt.className='study-recall-prompt';prompt.textContent=plain(c.front);card.appendChild(prompt);
    const instruction=document.createElement('p');instruction.textContent='Say or type an answer from memory before revealing it. Self-grade honestly.';card.appendChild(instruction);
    const draft=document.createElement('textarea');draft.setAttribute('aria-label','Your recall answer');draft.placeholder='Optional: type your answer here';draft.style.cssText='width:100%;min-height:88px';card.appendChild(draft);
    control(card,()=>prompt.textContent,'Read prompt');
    const reveal=document.createElement('button');reveal.className='primary';reveal.textContent='Reveal answer';card.appendChild(reveal);
    const answer=document.createElement('div');answer.className='study-recall-answer';answer.hidden=true;answer.textContent=plain(c.back);card.appendChild(answer);
    const result=document.createElement('div');result.className='row';card.appendChild(result);
    reveal.onclick=()=>{recall.revealed=true;reveal.disabled=true;answer.hidden=false;
      [['Try again',false],['I remembered it',true]].forEach(([label,ok])=>{const b=document.createElement('button');b.textContent=label;result.appendChild(b);b.onclick=()=>rate(c,ok);});
    };
  }
  function rate(c,ok){
    if(!recall?.revealed)return;recall.revealed=false;S.recall=S.recall||{};
    const now=Date.now(),prior=S.recall[c.id]||{},previous=prior.level||0,level=ok?Math.min(previous+1,4):0;
    const elapsedMs=Math.min(300000,Math.max(1000,now-(recall.cardShownAt||now)));
    const history=Array.isArray(prior.history)?prior.history.slice(-39):[];
    history.push({at:now,correct:!!ok,delayed:!!prior.seen&&now-prior.seen>=20*60*60*1000,elapsedMs});
    S.recall[c.id]={level,due:now+(ok?[0,1,3,7,14][level]*day:0),seen:now,history};
    S.reviewPace=S.reviewPace||{};const course=TOPICS[c.topic]?.course||CC;
    const pace=S.reviewPace[course]||{count:0,totalMs:0};
    pace.count++;pace.totalMs+=elapsedMs;S.reviewPace[course]=pace;
    if(ok)recall.good++;
    recall.i++;bumpDay();save();hud();drawRecall();
  }
  const basePlayHub=playHub;
  playHub=function(){basePlayHub.apply(this,arguments);const games=view.querySelector('.games');if(!games)return;
    const tile=document.createElement('div');tile.className='card game';games.appendChild(tile);
    const btn=document.createElement('button');btn.style.cssText='display:block;width:100%;text-align:left;background:transparent;padding:0';btn.innerHTML='<span class="gicon">🧠</span><h3>Recall Sprint</h3><p>Answer from memory, reveal, and review missed cards again. Correct cards return on later days.</p>';btn.onclick=()=>startRecall(plIds());tile.appendChild(btn);
  };
  window.studyUpgrades={startRecall,stop};
}
installStudyUpgrades();
