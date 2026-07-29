/**
 * Tests for the Grants Directory.
 *
 * Two things here are worth more than the rest: that no listing states a fact
 * it did not verify, and that the paywall never hides a closing date. Both are
 * promises made to someone deciding what to do with their week.
 */
const assert = require('assert');
const path = require('path');

const BACKEND = path.join(__dirname, '..');
const load = (p) => require(path.join(BACKEND, p));

let pass = 0;
const ok = (label) => { pass += 1; console.log(`  ok  ${label}`); };

const { GRANTS, GRANT_COUNT, CATEGORIES, LEVELS, deadlineState, daysUntil } = load('src/data/grants');
const { runTool } = load('src/utils/aiTools');

console.log('\n── dataset integrity ──');
{
  const ids = GRANTS.map((g) => g.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'grant ids must be unique');
  assert.strictEqual(GRANT_COUNT, GRANTS.length);
  ok(`${GRANT_COUNT} grants, all ids unique`);

  const categoryIds = new Set(CATEGORIES.map((c) => c.id));
  const levelIds = new Set(LEVELS.map((l) => l.id));
  for (const g of GRANTS) {
    assert.ok(categoryIds.has(g.category), `${g.id}: unknown category ${g.category}`);
    assert.ok(g.levels.length && g.levels.every((l) => levelIds.has(l)), `${g.id}: bad levels`);
    assert.ok(g.name && g.provider && g.value && g.summary, `${g.id}: missing required copy`);
    assert.ok(Array.isArray(g.whatYouGet) && g.whatYouGet.length, `${g.id}: whatYouGet empty`);
    assert.ok(g.eligibility, `${g.id}: no eligibility`);
    assert.ok(Array.isArray(g.tags) && g.tags.length, `${g.id}: no tags`);
  }
  ok('every grant has a valid category, level set, and complete copy');

  for (const g of GRANTS) {
    assert.ok(/^https:\/\//.test(g.url), `${g.id}: url must be https — got ${g.url}`);
  }
  ok('every grant links to an https official page');

  // The core honesty rule: an unverified entry must say what is unverified.
  for (const g of GRANTS) {
    assert.ok(typeof g.verified === 'boolean', `${g.id}: missing verified flag`);
    assert.ok(g.verifiedOn, `${g.id}: missing verifiedOn`);
    if (!g.verified) {
      assert.ok(g.caveat && g.caveat.length > 30, `${g.id}: unverified entries must carry a real caveat`);
    }
  }
  const unverified = GRANTS.filter((g) => !g.verified);
  ok(`${GRANTS.length - unverified.length} verified, ${unverified.length} flagged — every flagged one carries a caveat`);

  // A deadline is a promise. Only state one where the facts were checked.
  for (const g of GRANTS) {
    if (g.deadline) {
      assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(g.deadline), `${g.id}: deadline must be ISO yyyy-mm-dd`);
      assert.ok(g.verified, `${g.id}: states a hard deadline but is not verified`);
    } else {
      assert.ok(g.deadlineNote, `${g.id}: no deadline and no explanation of timing`);
    }
  }
  ok('hard deadlines appear only on verified entries; the rest explain their timing');
}

console.log('\n── deadline maths ──');
{
  const now = new Date('2026-07-29T12:00:00Z');
  // Counted the way a person counts: the 29th to the 31st is two days.
  // Never round up — that hands the learner a day that does not exist.
  assert.strictEqual(daysUntil('2026-07-31', now), 2);
  assert.strictEqual(daysUntil('2026-07-30', now), 1, 'tomorrow');
  assert.strictEqual(daysUntil('2026-07-29', now), 0, 'closes today');
  assert.ok(daysUntil('2026-07-28', now) < 0, 'yesterday is past');
  assert.strictEqual(daysUntil(null, now), null);
  ok('daysUntil never overstates the time remaining');

  const soon = deadlineState({ deadline: '2026-07-31' }, now);
  assert.strictEqual(soon.state, 'closing-soon');
  const open = deadlineState({ deadline: '2026-10-31' }, now);
  assert.strictEqual(open.state, 'open');
  const past = deadlineState({ deadline: '2026-01-01' }, now);
  assert.strictEqual(past.state, 'closed');
  const rolling = deadlineState({ deadline: null }, now);
  assert.strictEqual(rolling.state, 'rolling');
  assert.strictEqual(deadlineState({ deadline: null, status: 'closed' }, now).state, 'closed');
  ok('closing-soon / open / closed / rolling all classify correctly');
}

console.log('\n── AI tool gating ──');
{
  const locked = runTool('search_grants', {}, { premium: false });
  assert.strictEqual(locked.locked, true);
  assert.ok(locked.grants.length > 0);

  // The paywall covers eligibility and the apply link — never the deadline.
  for (const g of locked.grants) {
    assert.strictEqual(g.applyAt, undefined, `${g.name}: apply link leaked to a free caller`);
    assert.strictEqual(g.eligibility, undefined, `${g.name}: eligibility leaked to a free caller`);
    assert.ok('deadline' in g && 'deadlineState' in g, `${g.name}: deadline must stay visible when locked`);
  }
  ok('locked results withhold eligibility and apply links but keep every deadline');

  const unlocked = runTool('search_grants', {}, { premium: true });
  assert.strictEqual(unlocked.locked, false);
  assert.ok(unlocked.grants.every((g) => g.applyAt && g.eligibility));
  ok('premium results carry eligibility and apply links');

  const stipends = runTool('search_grants', { category: 'stipend' }, { premium: true });
  assert.ok(stipends.grants.length > 0 && stipends.grants.every((g) => g.category === 'stipend'));
  ok('category filter works');

  const founders = runTool('search_grants', { level: 'founder' }, { premium: true });
  assert.ok(founders.grants.length > 0);
  ok('level filter works');

  const query = runTool('search_grants', { query: 'cloud credits' }, { premium: true });
  assert.ok(query.grants.length > 0);
  ok('keyword search works');

  // Sorted by urgency so the model leads with what is about to close.
  const all = runTool('search_grants', {}, { premium: true }).grants;
  const days = all.map((g) => (g.daysLeft === null ? 9999 : g.daysLeft));
  assert.deepStrictEqual(days, [...days].sort((a, b) => a - b));
  ok('results are ordered by what closes soonest');

  assert.ok(locked.guidance.includes('Do not invent'));
  assert.ok(unlocked.guidance.includes('verified:false') || unlocked.guidance.includes('caveat'));
  ok('tool guidance tells the model how to handle locked and unverified records');
}

console.log('\n── controller shape ──');
{
  const { listGrants } = load('src/controllers/grantsController');

  function call(req) {
    return new Promise((resolve) => {
      listGrants(req, { json: resolve });
    });
  }

  // Admin token: entitled without a database lookup.
  return call({ query: {}, isAdmin: true }).then(async (adminBody) => {
    assert.strictEqual(adminBody.unlocked, true);
    assert.strictEqual(adminBody.upgradeMessage, null);
    assert.ok(adminBody.grants.every((g) => g.url && g.eligibility));
    ok('admin sees the full directory');

    const anon = await call({ query: {} });
    assert.strictEqual(anon.unlocked, false);
    assert.ok(anon.upgradeMessage.includes('₦2,000'));
    assert.ok(anon.grants.every((g) => g.url === undefined && g.eligibility === undefined));
    assert.ok(anon.grants.every((g) => 'deadlineState' in g && 'daysLeft' in g));
    ok('anonymous sees names, values and deadlines — but no links or eligibility');

    const filtered = await call({ query: { category: 'credits' }, isAdmin: true });
    assert.ok(filtered.matched > 0 && filtered.matched < filtered.total);
    assert.ok(filtered.grants.every((g) => g.category === 'credits'));
    ok('query filters narrow the response and report matched vs total');

    const searched = await call({ query: { q: 'fellowship' }, isAdmin: true });
    assert.ok(searched.matched >= 1);
    ok('free-text search works through the controller');

    console.log(`\n${pass} checks passed.\n`);
  });
}
