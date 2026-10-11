'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { VAULT_CATEGORIES, VAULT_TOOL_COUNT } = require('../src/data/videoToolsVault');

const tools = VAULT_CATEGORIES.flatMap((category) => category.tools);
const read = (file) => fs.readFileSync(path.resolve(__dirname, file), 'utf8');

test('catalogue entries and categories are complete', () => {
  assert.equal(VAULT_CATEGORIES.length, 9);
  assert.equal(VAULT_TOOL_COUNT, 125);
  assert.equal(tools.length, VAULT_TOOL_COUNT);
  assert.equal(new Set(tools.map((tool) => tool.name.toLowerCase())).size, tools.length);
  for (const category of VAULT_CATEGORIES) {
    assert.ok(category.id);
    assert.ok(category.title);
    assert.ok(category.tools.length);
  }
});

test('each tool has a functioning data schema without invented verification', () => {
  const types = new Set(['open-source', 'open-weights', 'trial', 'reported-free', 'unverified', 'paid']);
  for (const tool of tools) {
    assert.ok(tool.name && tool.url && tool.how && tool.prompt);
    assert.equal(new URL(tool.url).protocol, 'https:');
    assert.ok(types.has(tool.accessType), tool.name);
    assert.equal(tool.verificationStatus, 'unverified', tool.name);
    assert.equal(tool.lastVerified, null, tool.name);
    assert.equal(tool.sourceUrl, null, tool.name);
    assert.equal(tool.freeLimit, null, tool.name);
    assert.ok(['unknown', 'yes-on-free-plan'].includes(tool.watermark));
    assert.ok(['unknown', 'not-permitted-on-free-plan'].includes(tool.commercialUse));
    assert.equal(tool.regionRestrictions, 'unknown');
    assert.ok(Array.isArray(tool.tasks) && tool.tasks.length > 0, tool.name);
  }
});

test('explicit no-free-tier entries do not get a free badge', () => {
  const veo = tools.find((tool) => tool.name === 'Google Veo 3.1 (AI Studio)');
  assert.ok(veo);
  assert.equal(veo.accessType, 'paid');
  assert.ok(!tools.some((tool) => /no (standing )?free tier/i.test(tool.free) && tool.accessType === 'reported-free'));
});

test('retired tool removed; film-production tools present', () => {
  const names = new Set(tools.map((tool) => tool.name));
  assert.equal(names.has('Unscreen'), false);
  for (const name of ['MuseTalk (open source)', 'RIFE (frame interpolation)', 'FFmpeg (open source)']) {
    assert.ok(names.has(name), name);
  }
  assert.ok(tools.find((tool) => tool.name === 'MuseTalk (open source)').tasks.includes('lip-sync'));
  assert.ok(tools.find((tool) => tool.name === 'RIFE (frame interpolation)').tasks.includes('frame-interpolation'));
});

test('marketing prices match the configured course price and payment plan', () => {
  const course = read('../src/data/courses.js');
  const payment = read('../src/controllers/paymentController.js');
  const vault = read('../../frontend/tools-vault.html');
  const links = read('../../frontend/links.html');
  const locked = read('../src/controllers/vaultController.js');
  assert.match(course, /id: 'ai-cinematic-special-edition'[\s\S]*?price: 10000/);
  assert.match(payment, /'cinematic-special-edition': \{[\s\S]*?amountNGN: 10000/);
  for (const [name, body] of [['vault', vault], ['links', links], ['locked', locked]]) {
    assert.ok(body.includes('₦10,000'), name + ' missing checkout-aligned price');
    assert.ok(!body.includes('₦4,000'), name + ' contains stale price');
  }
});

test('vault avoids universal free/verified claims and filters by task and access', () => {
  const html = read('../../frontend/tools-vault.html');
  assert.ok(!html.includes('verified free tools'));
  assert.ok(!html.includes('FREE</span>'));
  assert.ok(html.includes('id="accessFilter"'));
  assert.ok(html.includes('id="taskFilter"'));
  assert.ok(html.includes('data-access='));
  assert.ok(html.includes('data-tasks='));
  assert.ok(html.includes('escapeAttr'));
});
