// Documentation counts come from the same catalog as the application.
const fs=require('node:fs');
const summaries={
 security701:'Selected security foundations, assets, governance and incident response',
 faa107:'Selected drone regulations, Remote ID, weather and performance',
 capcadet:'Selected lessons and practice in all 16 Learn to Lead chapters',
 wfa:'Provider-neutral safety and heat awareness',
 technician:'Selected lessons plus 391 separate NCVEC text questions; 18 pool items excluded',
 arizonadriving:'Selected Arizona signs, signals, yielding and crossings',
 newjerseydriving:'Selected NJ intersections, turns and school-bus situations',
 californiadriving:'Selected California turns, merging and lane changes',
 newyorkdriving:'Selected New York signals and intersection conflicts',
 drivingfoundations:'Shared national safety principles; not state-specific permit prep',
 texasdriving:'Selected Texas signals and school-bus roadway exceptions',
 floridadriving:'Selected Florida signals and school-bus median exceptions',
 alabamadriving:'Selected Alabama roundabouts and right-of-way conflicts',
 alaskadriving:'Selected Alaska uncontrolled intersections and lighting',
 arkansasdriving:'Selected Arkansas signals and railroad-crossing decisions',
 coloradodriving:'Colorado DMV mountain and winter safety guidance',
 connecticutdriving:'Selected Connecticut markings and lane-change observation',
 delawaredriving:'Selected Delaware ordinary signals and directional arrows',
 georgiadriving:'Selected Georgia passing and school-bus layouts',
 hawaiidriving:'Hawaii wet-weather and freeway safety principles',
 idahodriving:'Selected Idaho large-vehicle and animal encounters',
 illinoisdriving:'Selected Illinois school-bus, lane and pedestrian signals',
 indianadriving:'Selected Indiana roundabouts and tractor-trailer space',
 iowadriving:'Iowa rural-road, night and deer safety principles',
 kansasdriving:'Kansas rural-road and work-zone safety principles',
 kentuckydriving:'Selected Kentucky railroad crossings and roundabouts',
 louisianadriving:'Louisiana fog, rain and nighttime observation',
 mainedriving:'Maine fatigue and distraction safety guidance',
 marylanddriving:'Selected Maryland railroad and work-zone decisions'
};
const managed={
 'README.md':['TABLE'],
 'docs/wiki/Roadmap.md':['TABLE'],
 'docs/wiki/Coverage-Checklist.md':['TABLE','DIRECTORY'],
 'docs/wiki/For-Certifications.md':['TABLE'],
 'docs/wiki/Home.md':['SUMMARY'],
 'docs/wiki/Study-Tools.md':['SUMMARY'],
 'docs/Publication Status.md':['SUMMARY']
};
function counts(data){return {tracks:data.tracks.length,lessons:data.tracks.reduce((n,t)=>n+t.topics.reduce((s,p)=>s+p.lessons.length,0),0),questions:data.tracks.reduce((n,t)=>n+t.topics.reduce((s,p)=>s+p.bank.length,0),0),states:data.drivingJurisdictions.filter(j=>j.track&&j.code!=='US-DC').length,remaining:data.drivingJurisdictions.filter(j=>!j.track&&j.code!=='US-DC').length,dc:!!data.drivingJurisdictions.find(j=>j.code==='US-DC')?.track};}
function summary(data){const c=counts(data);return `Catalog updated ${data.updated||data.checked}. ${c.tracks} sourced tracks contain ${c.lessons} lessons and ${c.questions} original questions, excluding the university classes. All sourced tracks remain partial. ${c.states} states have partial state-specific courses; ${c.remaining} states${c.dc?'':' and DC'} still have shared national foundations only. The shared national course is counted once, not once per jurisdiction. No complete certification or state permit course is claimed. Technician also offers ${data.technicianPool.availableCount} separate public-domain NCVEC text questions out of ${data.technicianPool.expectedCount}; these are excluded from the original-question counts above.`;}
function block(data,kind){
 let body=summary(data);
 if(kind==='TABLE')body=`${body}\n\n| Track | Lessons | Questions | Coverage |\n| --- | ---: | ---: | --- |\n`+data.tracks.map(t=>`| ${t.code} | ${t.topics.reduce((n,p)=>n+p.lessons.length,0)} | ${t.topics.reduce((n,p)=>n+p.bank.length,0)} | ${summaries[t.id]||'Selected topics; see in-app Sources & coverage'} |`).join('\n');
 if(kind==='DIRECTORY')body='| Jurisdiction | Available material |\n| --- | --- |\n'+data.drivingJurisdictions.map(j=>`| ${j.name} | National foundations${j.track?' and state-specific partial course':' only; state-specific course pending'} |`).join('\n');
 return `<!-- STUDYGOAT ${kind} START -->\n${body}\n<!-- STUDYGOAT ${kind} END -->`;
}
function generate(data){for(const [path,kinds] of Object.entries(managed)){let text=fs.readFileSync(path,'utf8');for(const kind of kinds){const start=`<!-- STUDYGOAT ${kind} START -->`,end=`<!-- STUDYGOAT ${kind} END -->`;const a=text.indexOf(start),b=text.indexOf(end,a);if(a<0||b<a)throw Error(`Missing documentation markers: ${path} ${kind}`);text=text.slice(0,a)+block(data,kind)+text.slice(b+end.length);}fs.writeFileSync(path,text);}}
module.exports={counts,block,generate,managed};
