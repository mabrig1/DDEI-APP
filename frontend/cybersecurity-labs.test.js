// Lightweight offline contract tests. Run with: node --test frontend/cybersecurity-labs.test.js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const hub = fs.readFileSync(path.join(root, 'cybersecurity-labs.html'),'utf8');
const pilot = fs.readFileSync(path.join(root, 'cybersecurity-future.html'),'utf8');
const arena = fs.readFileSync(path.join(root, 'cybersecurity-challenges.html'),'utf8');
const arenaMatch=arena.match(/const CASES=(\[[^\n]+\]);/);
assert.ok(arenaMatch,'advanced challenge data must be a JSON fixture');
const cases=JSON.parse(arenaMatch[1]);
const build = fs.readFileSync(path.join(root,'build.js'),'utf8');
const match=hub.match(/const LABS = (\[[^\n]+\]);/);
assert.ok(match,'expected data-only JSON lab bundle');
const labs=JSON.parse(match[1]);
test('16 safe simulated labs and correct curriculum structure',()=>{
 assert.equal(labs.length,16);
 assert.equal(labs.filter(x=>x.level==='Start here').length,3);
 assert.equal(labs.filter(x=>['Foundation','Practitioner'].includes(x.level)).length,9);
 assert.equal(labs.filter(x=>x.level==='Specialist').length,4);
 assert.equal(new Set(labs.map(x=>x.id)).size,16);
});
test('every lab is actionable and has grounded feedback',()=>{
 for(const x of labs){
  assert.ok(x.title&&x.scenario&&x.question&&x.artifact);
  assert.ok(x.steps.length>=3);
  assert.equal(x.choices.length,3);
  assert.ok(Number.isInteger(x.correct)&&x.correct>=0&&x.correct<x.choices.length);
  assert.ok(x.why.length>=20);
 }
});
test('static build includes two browser labs and starter cross-link',()=>{
 assert.ok(build.includes("'cybersecurity-future.html'"));
 assert.ok(build.includes("'cybersecurity-labs.html'"));
 assert.ok(pilot.includes('href="/cybersecurity-labs"'));
});
test('no required analytics or external API calls in the hub',()=>{
 assert.ok(!/\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|WebSocket/.test(hub));
 assert.ok(hub.includes('createObjectURL(blob)'));
 assert.ok(hub.includes('textContent'));
});


test('six advanced challenges have grounded, synthetic evidence and clear decision rules',()=>{
 assert.equal(cases.length,6);
 assert.equal(new Set(cases.map(x=>x.id)).size,6);
 for(const c of cases){
  assert.ok(c.story.length>40 && c.why.length>40);
  assert.ok(c.events.length>=4 && c.events.every(e=>e.length===4));
  assert.equal(c.answers.length,3);
  assert.ok(c.correct>=0 && c.correct<=2);
  assert.ok(c.essential.length>=2);
  assert.ok(c.essential.every(id=>c.events.some(e=>e[0]===id)));
 }
 assert.ok(build.includes("'cybersecurity-challenges.html'"));
 assert.ok(hub.includes('href="/cybersecurity-challenges"'));
 assert.ok(!/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/.test(arena));
});
