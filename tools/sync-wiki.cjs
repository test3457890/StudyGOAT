// Run after the separate Wiki has been enabled and initialized, with authenticated Git.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'studygoat-wiki-'));
const git=(args,cwd=tmp)=>execFileSync('git',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
try{
 git(['clone','https://github.com/test3457890/StudyGOAT.wiki.git','.']);
 const branch=git(['branch','--show-current']);
 for(const name of fs.readdirSync(path.join(root,'docs/wiki'))){if(name.endsWith('.md')&&name!=='README.md')fs.copyFileSync(path.join(root,'docs/wiki',name),path.join(tmp,name));}
 git(['add','--','*.md']);
 if(git(['status','--porcelain']))git(['-c','user.name=StudyGOAT documentation','-c','user.email=docs@users.noreply.github.com','commit','-m','Sync StudyGOAT sourced study program documentation']);
 git(['push','origin',branch]);const head=git(['rev-parse','HEAD']);
 if(git(['ls-remote','origin','refs/heads/'+branch]).split(/\s/)[0]!==head)throw Error('Remote Wiki head does not match local commit');
 console.log('Verified Wiki publication:',head);
} catch(e){console.error('Wiki sync failed. Enable and initialize the Wiki and configure authenticated Git access. No publication is claimed.');console.error(e.stderr?.toString()||e.message);process.exitCode=1;}
finally{fs.rmSync(tmp,{recursive:true,force:true});}
