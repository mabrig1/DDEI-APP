const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Static HTML contains the client checkout and support workflows. Vercel's
// build checks external .js files, but this test also parses inline scripts.
for (const file of ['index.html', 'admin.html']) {
  test(file + ' inline browser JavaScript parses without syntax errors', () => {
    const html = fs.readFileSync(path.join(__dirname, '../../frontend', file), 'utf8');
    const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((match) => match[1]).filter((source) => source.trim());
    assert.ok(scripts.length > 0, 'Expected at least one inline client script');
    scripts.forEach((source) => assert.doesNotThrow(() => new vm.Script(source, { filename: file })));
  });
}
