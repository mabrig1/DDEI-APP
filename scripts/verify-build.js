const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    ['node_modules', 'dist'].includes(e.name) ? [] : e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
for (const file of [...walk('backend'), ...walk('frontend')]) {
  if (file.endsWith('.js')) execFileSync(process.execPath, ['--check',file]);
  if (file.endsWith('.html')) {
    const html = fs.readFileSync(file,'utf8');
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/src=|type=["'](?:module|application\/ld\+json)/i.test(match[1])) continue;
      new vm.Script(match[2], { filename: file });
    }
  }
}
execFileSync(process.execPath, ['frontend/build.js'], { stdio: 'inherit' });
assert(fs.existsSync('frontend/dist/security.js'));
for (const file of fs.readdirSync('frontend/dist').filter(f => f.endsWith('.html'))) {
  const html = fs.readFileSync('frontend/dist/'+file,'utf8');
  assert(html.includes('/security.js'), file + ' missing browser defenses');
}
console.log('Backend/frontend syntax, inline scripts and frontend build passed.');
// Verify public build configuration cannot terminate an inline script element.
const hostile = 'https://example.test/</script><script>globalThis.injected=true</script>';
execFileSync(process.execPath, ['frontend/build.js'], { env: { ...process.env, API_BASE_URL: hostile }, stdio: 'pipe' });
const built = fs.readFileSync('frontend/dist/index.html','utf8');
assert(!built.includes(hostile));
const configScript = [...built.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).find(s=>s.includes('window.DSB_API_BASE_URL =') && s.includes('window.DSB_APPWRITE ='));
const context={window:{}};vm.runInNewContext(configScript,context);
assert.equal(context.window.DSB_API_BASE_URL,hostile);assert.equal(context.injected,undefined);
execFileSync(process.execPath, ['frontend/build.js'], { stdio: 'pipe' });
console.log('Deployment configuration script-breakout regression passed.');
