const fs=require('node:fs');
const data=JSON.parse(fs.readFileSync('courses/catalog.json','utf8'));
fs.writeFileSync('courses/catalog.js','/* Generated from catalog.json. */\nwindow.STUDYGOAT_CATALOG = '+JSON.stringify(data,null,2)+';\n');
require('./status.cjs').generate(data);
