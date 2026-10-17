// Read-only inventory: no credentials, mutations, or active attack probes.
const dns=require('node:dns/promises');
(async()=>{
 for(const type of ['NS','A']){try{console.log(JSON.stringify({domain:'ddei.online',type,records:await dns.resolve('ddei.online',type)}));}catch(e){console.log(JSON.stringify({type,error:e.code}));}}
 for(const url of ['https://ddei.online','https://ddei-app-kh6q.vercel.app/api/health','https://ddei-app-git-security-f6bbe2-victoryonline1-gmailcoms-projects.vercel.app','https://ddei-app-backend-git-s-068d6a-victoryonline1-gmailcoms-projects.vercel.app/api/health']){
 try{const start=Date.now();const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(15000)});const headers={};for(const k of ['server','cf-ray','strict-transport-security','x-content-type-options','content-security-policy','x-frame-options','location'])if(r.headers.has(k))headers[k]=r.headers.get(k).split('?')[0];console.log(JSON.stringify({url,status:r.status,ms:Date.now()-start,headers}));await r.body?.cancel();}catch(e){console.log(JSON.stringify({url,error:e.name}));}}
})().catch(e=>{console.error(e.name);process.exitCode=1;});
