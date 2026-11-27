/* Visible browser-save check and downloadable progress backup. */
function installProgressTools(){
  const make=(tag,parent,label)=>{const e=document.createElement(tag);if(label!==undefined)e.textContent=label;parent.appendChild(e);return e;};
  const button=(parent,label,fn)=>{const b=make('button',parent,label);b.type='button';b.onclick=fn;return b;};
  const testStorage=()=>{
    try{const key='studygoat-storage-check',value=String(Date.now());localStorage.setItem(key,value);
      const ok=localStorage.getItem(key)===value;localStorage.removeItem(key);return ok;}
    catch(e){return false;}
  };
  const baseSettings=settings;
  settings=function(){
    baseSettings();const c=view.querySelector('.card');if(!c)return;
    const h=make('h3',c,'💾 Progress backup and restore');
    const text=make('p',c,'StudyGOAT saves results in this browser as you answer. Closing and reopening the same hosted page in the same browser keeps that progress. Download a backup before switching devices, moving a local file, or clearing browser data.');
    text.className='hint';
    const status=make('p',c);status.setAttribute('role','status');
    status.textContent=testStorage()?'Browser save check passed on this page.':'Browser saving is unavailable here. Keep a backup and use a regular browser window.';
    button(c,'Check browser saving',()=>{status.textContent=testStorage()?'Browser save check passed on this page.':'Browser saving is unavailable here. Keep a backup and use a regular browser window.';});
    button(c,'Download my progress (.json)',()=>{
      const payload={schema:'studygoat-progress-v1',created:new Date().toISOString(),progress:S};
      const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download='StudyGOAT Progress Backup.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
      status.textContent='Backup downloaded. Keep it private: it contains your study results and notes.';
    });
    const label=make('label',c,'Choose a StudyGOAT backup JSON file to restore: ');
    const file=make('input',label);file.type='file';file.accept='.json,application/json';
    const restore=button(c,'Restore backup and replace current progress',async()=>{
      if(!file.files?.[0]){status.textContent='Choose a backup first.';return;}
      if(file.files[0].size>5_000_000){status.textContent='This backup is too large. Use a file under 5 MB.';return;}
      try{
        const data=JSON.parse(await file.files[0].text()),p=data?.progress;
        if(data?.schema!=='studygoat-progress-v1'||!p||typeof p!=='object'||Array.isArray(p)||!Number.isFinite(p.xp)||!p.stats||typeof p.stats!=='object'||Array.isArray(p.stats))throw Error('Invalid backup');
        if(!testStorage())throw Error('Saving unavailable');
        const original=S;S=p;save();
        try{const persisted=JSON.parse(localStorage.getItem('cs315trainer')||'null');
          if(!persisted||persisted.xp!==S.xp||!persisted.stats)throw Error('Could not verify restored progress');}
        catch(e){S=original;save();throw e;}
        applySet();hud();settings();
        const result=view.querySelector('#progressRestoreResult');if(result)result.textContent='Backup restored. Your previous browser progress was replaced.';
      }catch(e){status.textContent='Could not restore this backup. Your current progress was kept. Check the file and browser storage.';}
    });
    restore.className='primary';
    const result=make('p',c);result.id='progressRestoreResult';result.setAttribute('role','status');
    make('p',c,'The restore button replaces current progress. Export a backup of what you have before restoring another file. The backup stays on your device until you share it.').className='hint';
  };
  window.progressTools={testStorage};
}
installProgressTools();
