/* Optional focus breaks and reminders. No background push or external data transfer. */
function installStudyWellness(){
  const css=document.createElement('style');
  css.textContent='.wellness-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0}.wellness-row label{display:flex;gap:8px;align-items:center}.wellness-row input{max-width:100px}.wellness-clock{font-size:clamp(2rem,5vw,3.5rem);font-variant-numeric:tabular-nums;color:var(--gold);font-weight:800}.wellness-banner{padding:12px 16px;border:2px solid var(--gold);background:#203555;border-radius:12px;margin:12px 0}.wellness-banner button{margin-left:12px}.wellness-help{max-width:72ch}';
  document.head.appendChild(css);
  const el=(tag,parent,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);parent.appendChild(e);return e;};
  const button=(parent,label,fn)=>{const b=el('button',parent,label);b.type='button';b.onclick=fn;return b;};
  const state=()=>{if(!S.wellness||typeof S.wellness!=='object')S.wellness={focus:25,rest:5,phase:'idle',endsAt:0,remaining:0,daily:'',notify:false,completedFocus:0};return S.wellness;};
  const today=()=>new Date().toLocaleDateString('en-CA');
  const canNotify=()=>typeof Notification!=='undefined'&&window.isSecureContext&&Notification.permission==='granted';
  function announce(message){
    let banner=document.getElementById('wellnessBanner');
    if(!banner){banner=el('div',nav);banner.id='wellnessBanner';banner.className='wellness-banner';banner.setAttribute('role','status');}
    banner.replaceChildren();el('span',banner,message);button(banner,'Dismiss',()=>banner.remove());
    if(state().notify&&canNotify())try{new Notification('StudyGOAT',{body:message,tag:'studygoat-wellness'});}catch(e){}
  }
  function check(){
    const s=state(),now=Date.now();
    if(s.phase==='focus'&&s.endsAt>0&&s.endsAt<=now){
      s.completedFocus=(s.completedFocus||0)+1;s.phase='break';s.endsAt=now+s.rest*60000;s.remaining=0;save();
      announce('Focus session complete. Take a '+s.rest+' minute break.');
    }else if(s.phase==='break'&&s.endsAt>0&&s.endsAt<=now){
      s.phase='idle';s.endsAt=0;s.remaining=0;save();
      announce('Break complete. Start another focus session whenever you are ready.');
    }
    if(s.daily&&s.reminderSeen!==today()){
      const d=new Date(),parts=s.daily.split(':').map(Number),due=d.getHours()>parts[0]||d.getHours()===parts[0]&&d.getMinutes()>=parts[1];
      if(Number.isInteger(parts[0])&&Number.isInteger(parts[1])&&due){s.reminderSeen=today();save();announce('Your study time is here. Open Today to review a few cards.');}
    }
    const clock=document.getElementById('wellnessClock');
    if(clock){const left=s.phase==='paused'?s.remaining:Math.max(0,s.endsAt-now);
      clock.textContent=s.phase==='idle'?'Ready':Math.ceil(left/60000)+' min '+(Math.floor((left%60000)/1000)).toString().padStart(2,'0')+' sec';
      const phase=document.getElementById('wellnessPhase');if(phase)phase.textContent=({idle:'Ready to study',focus:'Focus time',break:'Take a break',paused:'Paused'})[s.phase]||'Ready';
    }
  }
  function openWellness(){
    screen='wellness';LS=null;quiz=null;cur=null;activePrep=null;drawNav();view.replaceChildren();
    const s=state(),c=el('div',view);c.className='card';
    el('h2',c,'⏱ Study breaks and reminders');
    el('p',c,'Try a short focus block, then take a real break. You choose the lengths and whether to enable notifications. Progress and settings save with your other StudyGOAT data.').className='wellness-help';
    const phase=el('p',c);phase.id='wellnessPhase';const clock=el('div',c);clock.id='wellnessClock';clock.className='wellness-clock';
    const times=el('div',c);times.className='wellness-row';
    function number(label,key,min,max){const wrap=el('label',times,label);const input=el('input',wrap);input.type='number';input.min=String(min);input.max=String(max);input.value=String(s[key]);input.setAttribute('aria-label',label);input.onchange=()=>{const n=Math.min(max,Math.max(min,Number(input.value)||min));s[key]=n;input.value=String(n);save();};return input;}
    number('Focus minutes','focus',5,120);number('Break minutes','rest',1,30);
    const actions=el('div',c);actions.className='wellness-row';
    button(actions,'Start focus',()=>{s.phase='focus';s.endsAt=Date.now()+s.focus*60000;s.remaining=0;save();check();});
    button(actions,'Pause / resume',()=>{if(s.phase==='focus'||s.phase==='break'){s.previousPhase=s.phase;s.remaining=Math.max(0,s.endsAt-Date.now());s.phase='paused';s.endsAt=0;}
      else if(s.phase==='paused'){s.phase=s.previousPhase==='break'?'break':'focus';s.endsAt=Date.now()+s.remaining;s.remaining=0;}save();check();});
    button(actions,'Stop timer',()=>{s.phase='idle';s.endsAt=0;s.remaining=0;save();check();});
    el('p',c,'Focus blocks completed: '+(s.completedFocus||0)+'. If you close the tab, your timer state is saved; elapsed time is checked when you reopen StudyGOAT.').className='hint';
    const reminder=el('div',c);reminder.className='wellness-row';
    const label=el('label',reminder,'Daily study time');const input=el('input',label);input.type='time';input.value=s.daily||'';input.setAttribute('aria-label','Daily study reminder time');
    input.onchange=()=>{s.daily=input.value;const [h,m]=s.daily.split(':').map(Number),d=new Date();
      s.reminderSeen=d.getHours()>h||d.getHours()===h&&d.getMinutes()>=m?today():'';save();};
    button(reminder,'Clear daily time',()=>{s.daily='';input.value='';save();});
    const status=el('p',c);status.setAttribute('role','status');
    button(c,'Enable browser notifications while StudyGOAT is open',async()=>{
      if(typeof Notification==='undefined'||!window.isSecureContext){status.textContent='Browser notifications need a supported secure page (HTTPS). In-page alerts still work.';return;}
      try{const permission=await Notification.requestPermission();s.notify=permission==='granted';save();status.textContent=s.notify?'Enabled while this page is open.':'Permission not granted; in-page reminders still work.';}
      catch(e){status.textContent='This browser could not enable notifications. In-page reminders still work.';}
    });
    button(c,'Download a daily calendar reminder',()=>{
      if(!s.daily){status.textContent='Choose a daily study time first.';return;}
      const [hour,minute]=s.daily.split(':').map(Number);const d=new Date();d.setHours(hour,minute,0,0);
      const date=d.getFullYear().toString()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');
      const start=date+'T'+String(hour).padStart(2,'0')+String(minute).padStart(2,'0')+'00';
      const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//StudyGOAT//Study Reminder//EN','BEGIN:VEVENT','UID:studygoat-daily-'+date+'@local','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'').replace('Z','Z'),'DTSTART:'+start,'DURATION:PT'+s.focus+'M','RRULE:FREQ=DAILY','SUMMARY:StudyGOAT daily review','DESCRIPTION:Open StudyGOAT and complete a short review.','BEGIN:VALARM','TRIGGER:-PT5M','ACTION:DISPLAY','DESCRIPTION:Time for a short StudyGOAT review','END:VALARM','END:VEVENT','END:VCALENDAR',''].join('\r\n');
      const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar'})),a=document.createElement('a');
      a.href=url;a.download='StudyGOAT Daily Reminder.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
      status.textContent='Calendar reminder downloaded. Import it into your calendar and confirm its notification settings there.';
    });
    el('p',c,'Browser notifications work only while this page stays open. The optional calendar file can remind you after closing the app once you import it into a calendar that supports alerts. Do not rely on a private browsing window to retain progress.').className='hint';
    check();
  }
  const priorNav=drawNav;
  drawNav=function(){priorNav();if(screen!=='menu')button(nav,'⏱ Breaks',openWellness);};
  setInterval(check,1000);check();
  window.studyWellness={open:openWellness,check};
}
installStudyWellness();
