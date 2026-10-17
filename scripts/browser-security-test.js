const { chromium } = require('playwright');
const http=require('node:http'), fs=require('node:fs'), path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve('frontend/dist');
const server=http.createServer((req,res)=>{
 const name=req.url.split('?')[0]==='/'?'index.html':req.url.split('?')[0].slice(1);
 const file=path.resolve(root,name);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);res.end();return;}
 res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':'text/html');
 res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({headless:true});
 try{
 const page=await browser.newPage();await page.route('**/*',route=>{
  const u=new URL(route.request().url());
  if(u.origin===origin)return route.continue();
  if(u.pathname.startsWith('/api/'))return route.fulfill({contentType:'application/json',body:JSON.stringify({skills:[],opportunities:[],courses:[],content:[],summary:{}})});
  return route.abort();
 });
 await page.addInitScript(()=>{localStorage.setItem('dsb_token','old');localStorage.setItem('dsb_admin_token','old');});
 await page.goto(origin,{waitUntil:'load'});
 assert.equal(await page.evaluate(()=>localStorage.getItem('dsb_token')),null);
 const result=await page.evaluate(()=>{
  const target=document.createElement('div');document.body.appendChild(target);
  window.DSB_SECURITY.renderContent(target,'<p>Safe <strong>format</strong></p><img src=x onerror="window.compromised=1"><script>window.compromised=1</script><a href="javascript:window.compromised=1" onclick="window.compromised=1">bad</a><svg onload="window.compromised=1"></svg><iframe srcdoc="evil"></iframe><a href="https://example.com">safe link</a>');
  appendChatMessage('user','<img src=x onerror="window.compromised=1">');
  return {compromised:window.compromised||false,html:target.innerHTML,chat:document.getElementById('chatMessages').lastChild.textContent,chatImages:document.getElementById('chatMessages').lastChild.querySelectorAll('img').length,escaped:escapeHtml('\"\'<>&')};
 });
 assert.equal(result.compromised,false);assert(!/onerror|onclick|javascript:|<script|<svg|<iframe/.test(result.html));assert(result.html.includes('<strong>format</strong>'));assert(result.html.includes('https://example.com/'));assert.equal(result.chatImages,0);assert(result.chat.includes('<img'));assert.equal(result.escaped,'&quot;&#39;&lt;&gt;&amp;');
 // Malformed/mutation-XSS shapes are reconstructed into new allowlisted nodes.
 const unsafe=await page.evaluate(()=>{
 const t=document.createElement('div');DSB_SECURITY.renderContent(t,'<math><mtext><table><mglyph><style><!--</style><img title="--><img src=x onerror=alert(1)>">');return [...t.querySelectorAll('*')].some(n=>n.namespaceURI!=='http://www.w3.org/1999/xhtml'||[...n.attributes].some(a=>a.name.startsWith('on')));});assert.equal(unsafe,false);
 console.log('Browser security passed: legacy token cleanup, chat escaping, quote escaping, rich-text sanitization, allowed links/formatting, mutation-XSS payload.');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
