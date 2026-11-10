const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data=JSON.parse(fs.readFileSync('courses/catalog.json','utf8'));const ctx={window:{}};vm.runInNewContext(fs.readFileSync('courses/catalog.js','utf8'),ctx);assert.equal(JSON.stringify(ctx.window.STUDYGOAT_CATALOG),JSON.stringify(data));
const ids=new Set(),prompts=new Set();let count=0;
function refs(x){assert(x.refs?.length);assert(x.objectives?.length);for(const r of x.refs){const s=data.sources[r.source];assert(s,`Missing source ${r.source}`);assert.equal(s.status,'verified');assert(s.sections.includes(r.section));assert.match(s.url,/^https:\/\//);for(const k of ['publisher','title','version','effective','checked','reviewBy','rights'])assert(s[k]);assert(new Date(s.reviewBy)>=new Date(data.checked));}}
for(const t of data.tracks){assert(!ids.has(t.id));ids.add(t.id);assert(t.notice&&t.gaps.length);for(const p of t.topics){assert(!ids.has(p.id));ids.add(p.id);refs(p);assert(p.lessons.length&&p.gloss.length>=4);for(const l of p.lessons){refs(l);assert(l.steps.length>=3);}for(const b of p.bank){refs(b);assert(!ids.has(b.id));ids.add(b.id);assert(!prompts.has(b.q));prompts.add(b.q);assert.equal(b.c.length,4);assert.equal(new Set(b.c.map(x=>x.trim().toLowerCase())).size,4);assert(b.c.every(x=>x.trim()));assert(b.why&&b.checked);assert.equal(b.status,'verified');assert(b.objectives.every(o=>t.objectives.includes(o)));count++;}}}
const cap=data.tracks.find(t=>t.id==='capcadet');assert.equal(cap.curriculum.length,16);
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
assert.equal(classTopics.length,4);let classQuestions=0;
for(const p of classTopics){assert.equal(p.course,'cpsc222');assert(p.source&&p.lessons.length===2&&p.gloss.length>=4);for(const b of p.bank){assert.equal(b.c.length,4);assert.equal(new Set(b.c).size,4);assert(b.q&&b.why);classQuestions++;}}
assert.equal(classQuestions,32);
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
console.log('PASS: four discrete FSM topics, eight lessons, 32 questions; exhaustive DFA words through length 8 and matrix/table agreement');

for(const j of data.drivingJurisdictions)assert.equal(j.foundation,"drivingfoundations");
const shared=data.tracks.find(t=>t.id==="drivingfoundations");assert.equal(shared.coverageKind,"shared-foundations");assert.equal(shared.topics.reduce((n,t)=>n+t.bank.length,0),16);
