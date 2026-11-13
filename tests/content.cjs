const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data=JSON.parse(fs.readFileSync('courses/catalog.json','utf8'));const ctx={window:{}};vm.runInNewContext(fs.readFileSync('courses/catalog.js','utf8'),ctx);assert.equal(JSON.stringify(ctx.window.STUDYGOAT_CATALOG),JSON.stringify(data));
const ids=new Set(),prompts=new Set();let count=0;
function refs(x){assert(x.refs?.length);assert(x.objectives?.length);for(const r of x.refs){const s=data.sources[r.source];assert(s,`Missing source ${r.source}`);assert.equal(s.status,'verified');assert(s.sections.includes(r.section));assert.match(s.url,/^https:\/\//);for(const k of ['publisher','title','version','effective','checked','reviewBy','rights'])assert(s[k]);assert(new Date(s.reviewBy)>=new Date(data.checked));}}
for(const t of data.tracks){assert(!ids.has(t.id));ids.add(t.id);assert(t.notice&&t.gaps.length);for(const p of t.topics){assert(!ids.has(p.id));ids.add(p.id);refs(p);assert(p.lessons.length&&p.gloss.length>=4);for(const l of p.lessons){refs(l);assert(l.steps.length>=3);}for(const b of p.bank){refs(b);assert(!ids.has(b.id));ids.add(b.id);assert(!prompts.has(b.q));prompts.add(b.q);assert.equal(b.c.length,4);assert.equal(new Set(b.c.map(x=>x.trim().toLowerCase())).size,4);assert(b.c.every(x=>x.trim()));assert(b.why&&b.checked);assert.equal(b.status,'verified');assert(b.objectives.every(o=>t.objectives.includes(o)));count++;}}}
const cap=data.tracks.find(t=>t.id==='capcadet');assert.equal(cap.curriculum.length,16);
const security=data.tracks.find(t=>t.id==='security701');
assert.equal(security.objectiveMap.length,28);
assert.deepEqual(security.objectiveMap.map(o=>o.id),security.objectives);
for(const o of security.objectiveMap){
 assert.equal(o.status,'partial');assert.equal(o.domain,Number(o.id[0]));assert(o.gaps.length&&o.topics.length);
 assert.deepEqual(o.topics,security.topics.filter(p=>p.objectives.includes(o.id)).map(p=>p.id));
 assert(security.topics.flatMap(p=>p.bank).filter(b=>b.objectives.includes(o.id)).length>=6);
}
assert.equal(security.topics.reduce((n,p)=>n+p.lessons.length,0),53);
assert.equal(security.topics.reduce((n,p)=>n+p.bank.length,0),172);
assert.deepEqual(cap.curriculum.map(c=>c.chapter),Array.from({length:16},(_,i)=>i+1));
for(const c of cap.curriculum){assert.equal(c.status,'partial');assert(c.topics.length);const topics=cap.topics.filter(t=>c.topics.includes(t.id));assert(topics.reduce((n,t)=>n+t.lessons.length,0)>=2);assert(topics.reduce((n,t)=>n+t.bank.length,0)>=8);}
for(const c of cap.curriculum){assert(c.volume>=1&&c.volume<=4);assert.match(c.url,/^https:\/\/www\.gocivilairpatrol\.com\/media\/cms\/.+\.pdf$/);assert.equal(c.status,c.topics.length?'partial':'reading only');for(const id of c.topics)assert(cap.topics.some(t=>t.id===id));}
assert.equal(data.drivingJurisdictions.length,51);assert.equal(new Set(data.drivingJurisdictions.map(j=>j.code)).size,51);
for(const j of data.drivingJurisdictions){if(j.track)assert(data.tracks.some(t=>t.id===j.track&&t.jurisdiction===j.code));}
console.log(`PASS: ${data.tracks.length} tracks, ${count} questions; IDs, choices, citations, dates, objectives, 16 CAP chapters, 51 jurisdictions and generated data parity`);

assert.equal(cap.achievements.length,21);assert.equal(new Set(cap.achievements.map(a=>a.id)).size,21);
assert.deepEqual(cap.achievements.filter(a=>a.number).map(a=>a.number),Array.from({length:16},(_,i)=>i+1));
for(const a of cap.achievements){assert(a.title&&a.leadership&&a.aerospace&&a.actions.length);assert.match(a.url,/^https:\/\/www\.gocivilairpatrol\.com\/programs\/cadets\/stripes-to-diamonds\//);for(const n of a.chapters)assert(cap.curriculum.some(c=>c.chapter===n));}
assert.deepEqual(cap.achievements.find(a=>a.number===16).chapters,[]);assert.equal(cap.achievements.find(a=>a.number===16).status,'needs verification');
// Lecture FSM tables: independently check their language and matrix convention.
const models=data.classModels, classTopics=data.classTopics;
assert.equal(classTopics.length,8);let classQuestions=0;
for(const p of classTopics){assert.equal(p.course,'cpsc222');assert(p.source&&p.lessons.length===2&&p.gloss.length>=4);for(const b of p.bank){assert.equal(b.c.length,4);assert.equal(new Set(b.c).size,4);assert(b.q&&b.why);classQuestions++;}}
assert.equal(classQuestions,64);
for(let length=0;length<=8;length++)for(let n=0;n<2**length;n++){
 const word=length?n.toString(2).padStart(length,'0'):'';let state=models.suffix01.initial;
 for(const ch of word)state=models.suffix01.delta[state][ch];
 assert.equal(models.suffix01.accepting.includes(state),word.endsWith('01'),word);
}
for(const [i,state] of models.turnstile.states.entries())for(const event of models.turnstile.inputs){
 const row=models.turnstile.matrices[event][i];assert.equal(row.reduce((a,b)=>a+b),1);
 assert.equal(models.turnstile.states[row.indexOf(1)],models.turnstile.delta[state][event]);
 assert.equal(models.turnstile.delta[state][event],event==='coin'?'Unlocked':'Locked');
}
console.log('PASS: eight discrete FSM topics, 16 lessons, 64 questions; exhaustive DFA words through length 8 and matrix/table agreement');

for(const j of data.drivingJurisdictions)assert.equal(j.foundation,"drivingfoundations");
const shared=data.tracks.find(t=>t.id==="drivingfoundations");assert.equal(shared.coverageKind,"shared-foundations");assert.equal(shared.topics.reduce((n,t)=>n+t.bank.length,0),16);

// Current coverage claims are generated, including the once-only national bank and pending states.
const status=require('../courses/status.cjs');
for(const [file,kinds] of Object.entries(status.managed)){
 const text=fs.readFileSync(file,'utf8');
 for(const kind of kinds)assert(text.includes(status.block(data,kind)),`Stale generated status: ${file} ${kind}`);
}
for(const file of Object.keys(status.managed).filter(f=>status.managed[f].includes('TABLE'))){
 const text=fs.readFileSync(file,'utf8');
 for(const t of data.tracks){const row=text.split('\n').filter(l=>l.startsWith(`| ${t.code} |`));assert.equal(row.length,1,`${file} ${t.id} duplicated or absent`);const cells=row[0].split('|').map(s=>s.trim());assert.equal(Number(cells[2]),t.topics.reduce((n,p)=>n+p.lessons.length,0));assert.equal(Number(cells[3]),t.topics.reduce((n,p)=>n+p.bank.length,0));}
}
console.log('PASS: generated documentation matches catalog; per-track counts occur once');

// Public-domain pool subset is independently counted, with an explicit exclusion inventory.
const pool=data.technicianPool;assert.equal(pool.status,'complete');assert.equal(pool.expectedCount,409);assert.equal(pool.questions.length,409);assert.equal(pool.availableCount,409);
assert.equal(pool.excluded.length,0);assert.equal(new Set([...pool.questions,...pool.excluded].map(q=>q.id)).size,409);
assert.equal(pool.groups.length,35);assert.deepEqual([...new Set(pool.questions.map(q=>q.group))].sort(),pool.groups);
for(const q of pool.questions){assert.match(q.id,/^T\d[A-Z]\d\d$/);assert.equal(q.group,q.id.slice(0,3));assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=3);if(/figure T-/i.test(q.q))assert(pool.figures[q.figure]);assert.equal(q.source,pool.source);assert(data.sources[pool.source].sections.includes(q.group));}
for(let i=3;i<=8;i++)assert(pool.questions.some(q=>q.id===`T5B0${i}`));
assert.equal(pool.questions.filter(q=>q.figure).length,12);assert.equal(Object.keys(pool.figures).length,3);
const corrections={T1C01:'For which classes of amateur radio licenses does the FCC currently issue new licenses?',T5A05:'A difference in which of the following causes electron flow?',T7A09:'What is the function of the switch which selects either SSB or CW-FM on some VHF power amplifiers?',T0A10:'What hazard exists when rapidly charging or discharging an unprotected battery?'};
for(const [id,text] of Object.entries(corrections)){assert.equal(pool.questions.find(q=>q.id===id).q,text);assert.equal(pool.corrections[id],text);}
assert.deepEqual(pool.withdrawals,[]);assert.equal(pool.provenance.crossCheckedQuestions,409);assert.equal(pool.provenance.answerKeyMismatches,0);
const crypto=require('node:crypto');assert.equal(crypto.createHash('sha256').update(JSON.stringify(pool.questions)).digest('hex'),pool.provenance.importedQuestionsSha256,'Pool text changed after source comparison; revalidate before updating fingerprint');
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(pool.provenance.sourcePdfPath)).digest('hex'),pool.provenance.sourcePdfSha256);
for(const f of Object.values(pool.figures)){assert.match(f.dataUrl,/^data:image\/png;base64,/);assert.equal(crypto.createHash('sha256').update(Buffer.from(f.dataUrl.split(',')[1],'base64')).digest('hex'),f.sha256);assert(f.alt&&f.pdfPage);}
assert.equal(pool.exam.questionCount,pool.groups.length);assert.equal(pool.exam.passCount,26);
console.log('PASS: all 409 NCVEC items, four errata, 35 groups, three diagrams, PDF and import fingerprints');
const explanations=data.technicianExplanations;
assert.equal(explanations.status,'complete');assert.equal(explanations.questionCount,409);
assert.equal(explanations.poolFingerprint,pool.provenance.importedQuestionsSha256);
assert.deepEqual(Object.keys(explanations.items).sort(),pool.questions.map(q=>q.id).sort());
assert.deepEqual(Object.keys(pool.groupTitles).sort(),pool.groups);
const explanationTexts=new Set();
for(const q of pool.questions){const e=explanations.items[q.id];assert(e.text.trim(),q.id);assert(!explanationTexts.has(e.text),q.id);explanationTexts.add(e.text);assert.notEqual(e.text,q.choices[q.answer]);assert(e.refs.some(r=>r.source===pool.source&&r.section===q.group));for(const r of e.refs)assert(data.sources[r.source].sections.includes(r.section));}
// Check worked arithmetic against independently calculated results and units.
for(const [id,result,unit] of [['T5D04',90/3,'ohms'],['T5D05',12/1.5,'ohms'],['T5D06',12/4,'ohms'],['T5D07',120/80,'A'],['T5D08',200/100,'A'],['T5D09',240/24,'A'],['T5D10',0.5*2,'V'],['T5D11',1*10,'V'],['T5D12',2*10,'V'],['T5C09',13.8*10,'W'],['T5C10',12*2.5,'W'],['T5C11',120/12,'A']])assert(explanations.items[id].text.includes(`${result} ${unit}`),id);
console.log('PASS: all 409 original explanations are linked to unchanged pool items; worked arithmetic and 35 group labels checked');

// Every jurisdiction must expose its own sourced introductory material, not only the national bank.
assert.equal(data.drivingJurisdictions.filter(j=>j.code!=='US-DC'&&j.track).length,50);
assert(data.drivingJurisdictions.find(j=>j.code==='US-DC').track);
assert.equal(new Set(data.drivingJurisdictions.map(j=>j.track)).size,51);
for(const j of data.drivingJurisdictions){const t=data.tracks.find(t=>t.id===j.track);assert.equal(t.status,'partial');assert(t.topics.reduce((n,p)=>n+p.lessons.length,0)>=4);assert(t.topics.reduce((n,p)=>n+p.bank.length,0)>=8);assert(t.notice&&t.gaps.length);}
console.log('PASS: all 50 states and DC have distinct partial courses, sourced lessons and original questions');

// Guided radio instruction covers every published group and every pool ID exactly once.
const technician=data.tracks.find(t=>t.id==='technician');
const taught=technician.topics.filter(t=>t.poolGroup);
assert.equal(taught.length,35);assert.equal(taught.reduce((n,t)=>n+t.lessons.length,0),70);
assert.deepEqual(taught.map(t=>t.poolGroup).sort(),pool.groups);
const lessonPoolIds=taught.flatMap(t=>t.lessons.flatMap(l=>l.poolIds));
assert.equal(lessonPoolIds.length,409);assert.equal(new Set(lessonPoolIds).size,409);
assert.deepEqual([...lessonPoolIds].sort(),pool.questions.map(q=>q.id).sort());
for(const t of taught){
 for(const l of t.lessons)for(const id of l.poolIds){
  const q=pool.questions.find(q=>q.id===id);assert.equal(q.group,t.poolGroup);
  assert(l.steps.some(s=>s.text.includes(id)&&s.text.includes(explanations.items[id].text)));
 }
}
// Printed ACS inventory includes subordinate elements without asserting complete instruction.
const faa=data.tracks.find(t=>t.id==='faa107'),acs=faa.acsInventory;
assert.equal(acs.tasks.length,17);assert.equal(acs.codes.length,176);
const taskCounts={'I.A':8,'I.B':36,'I.C':4,'I.D':1,'I.E':21,'I.F':7,'II.A':9,'II.B':17,'III.A':5,'III.B':12,'IV.A':4,'V.A':8,'V.B':10,'V.C':11,'V.D':7,'V.E':9,'V.F':7};
assert.equal(new Set(acs.codes.map(c=>c.id)).size,176);
for(const task of acs.tasks){assert.equal(task.codes.length,taskCounts[task.id]);assert.equal(task.status,'partial');for(const id of task.topics)assert(faa.topics.some(t=>t.id===id));}
for(const c of acs.codes){assert.match(c.id,/^UA\.[IVX]+\.[A-Z]\.K\d+[a-z]?$/);assert(acs.tasks.find(t=>t.id===c.task).codes.includes(c.id));assert(c.pdfPage>=8&&c.pdfPage<=26);}
// Official-reading tasks are kept outside lesson/question coverage counts.
assert.equal(data.tracks.filter(t=>t.readingPlan).length,56);
for(const t of data.tracks.filter(t=>t.readingPlan)){
 assert(t.readingPlanNotice);assert.equal(new Set(t.readingPlan.map(r=>r.id)).size,t.readingPlan.length);
 for(const r of t.readingPlan){assert(r.assignment&&r.title&&r.kind);assert.match(r.url,/^https:\/\//);for(const id of r.topics)assert(t.topics.some(p=>p.id===id),t.id+' '+id);}
 if(t.jurisdiction){assert.equal(t.readingPlan.length,13);assert(t.manualReading&&t.manualReading.status.includes('pending'));}
}
assert.equal(data.securityLabs.length,3);
for(const l of data.securityLabs){assert(l.brief&&l.refs.length&&l.cases.length>=4);for(const c of l.cases){assert(c.facts&&c.why&&l.choices.includes(c.answer));}}
console.log('PASS: 35 radio teaching groups / 409 item walkthroughs, 17 ACS tasks / 176 codes, 56 saved study paths, 51 manual checklists and three new security labs');

// Release regressions: jurisdiction-specific data and reachable aerospace study banks.
assert.equal(data.drivingLighting.states.length,50);
assert.deepEqual(data.drivingLighting.states.map(s=>s.code).sort(),data.drivingJurisdictions.filter(j=>j.code!=='US-DC').map(j=>j.code).sort());
assert.equal(data.drivingLighting.states.filter(s=>s.frontFeet!==null&&s.rearFeet!==null).length,40);
for(const s of data.drivingLighting.states){const t=data.tracks.find(t=>t.jurisdiction===s.code),p=t.topics.find(p=>p.id===s.topic);assert.equal(p.lessons.length,2);assert.equal(p.bank.length,4);assert(data.sources[s.source]);assert(t.readingPlan.some(r=>r.topics?.includes(p.id)));}
for(const [code,front,rear] of [['US-OK',1000,600],['US-OR',500,350],['US-NH',150,150]]){const s=data.drivingLighting.states.find(s=>s.code===code);assert.equal(s.frontFeet,front);assert.equal(s.rearFeet,rear);}
assert.equal(data.drivingLighting.states.find(s=>s.code==='US-OH').frontFeet,null);
for(const id of ['security701','faa107']){const t=data.tracks.find(t=>t.id===id),bp=t.practiceBlueprint,bank=t.topics.flatMap(p=>p.bank);assert.equal(bp.count,id==='security701'?90:60);assert.equal(bp.groups.reduce((n,g)=>n+g.count,0),bp.count);assert.deepEqual(Object.keys(bp.assignments).sort(),bank.map(b=>b.id).sort());for(const g of bp.groups){assert(bank.filter(b=>bp.assignments[b.id]===g.id).length>=g.count);if(g.publishedRange){const percent=100*g.count/bp.count;assert(percent>=g.publishedRange[0]&&percent<=g.publishedRange[1]);}}}
assert.equal(cap.aerospaceModules.length,7);
for(const [i,m] of cap.aerospaceModules.entries()){assert.equal(m.module,i+1);const topics=cap.topics.filter(t=>m.topics.includes(t.id));assert.equal(topics.flatMap(t=>t.lessons).length,2);assert.equal(topics.flatMap(t=>t.bank).length,8);assert(cap.readingPlan.some(r=>r.topics?.some(id=>m.topics.includes(id))));}
console.log('PASS: 50 selected lighting units, state exceptions, weighted 90/60 allocations and seven aerospace banks');
