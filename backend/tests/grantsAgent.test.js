/**
 * Tests for the daily Grants Directory agent.
 *
 * The two rules worth defending here:
 *   1. A model claim with no citation never becomes a proposal.
 *   2. A proposal never reaches learners until a human approves it.
 *
 * Everything else is plumbing. These two are the reason the directory can be
 * trusted, and they are easy to erode by accident.
 */
const http = require('http');
const assert = require('assert');
const path = require('path');

const BACKEND = path.join(__dirname, '..');
const load = (p) => require(path.join(BACKEND, p));

let pass = 0;
const ok = (label) => { pass += 1; console.log(`  ok  ${label}`); };

let script = [];
let received = [];

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    received.push(JSON.parse(body));
    const next = script.shift() || { status: 500, payload: { error: { message: 'no scripted response' } } };
    res.writeHead(next.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(next.payload));
  });
});

/** A completion, optionally carrying url_citation annotations. */
function reply(content, citations = []) {
  return {
    status: 200,
    payload: {
      model: 'stub/researcher',
      choices: [{
        message: {
          role: 'assistant',
          content: typeof content === 'string' ? content : JSON.stringify(content),
          annotations: citations.map((c) => ({
            type: 'url_citation',
            url_citation: { url: c.url, title: c.title || 'Source', content: c.excerpt || 'evidence' },
          })),
        },
      }],
    },
  };
}

(async () => {
  await new Promise((r) => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}`;

  process.env.OPENROUTER_API_KEY = 'sk-test-key';
  process.env.OPENROUTER_BASE_URL = base;
  process.env.OPENROUTER_MODEL = 'stub/researcher';
  process.env.OPENROUTER_ENABLED = 'true';

  const { citationsOf, runAgent } = load('src/utils/aiClient');
  const agent = load('src/utils/grantsAgent');
  const { applyOverlay } = load('src/utils/grantsOverlay');
  const { GRANTS } = load('src/data/grants');

  const NOW = new Date('2026-07-29T09:00:00Z');
  const bosun = GRANTS.find((g) => g.id === 'bosun-tijani-gen-ai-fellowship');

  console.log('\n── web search plumbing ──');
  {
    script = [reply('hi', [{ url: 'https://example.org/a', title: 'A' }])];
    received = [];
    const r = await runAgent({ system: 's', message: 'x', web: 7, json: true });
    assert.deepStrictEqual(received[0].plugins, [{ id: 'web', max_results: 7 }]);
    assert.deepStrictEqual(received[0].response_format, { type: 'json_object' });
    assert.strictEqual(r.citations.length, 1);
    assert.strictEqual(r.citations[0].url, 'https://example.org/a');
    ok('web:N sends the web plugin, json:true sends response_format');

    script = [reply('hi')];
    const plain = await runAgent({ system: 's', message: 'x' });
    assert.deepStrictEqual(plain.citations, []);
    assert.strictEqual(received[1].plugins, undefined);
    ok('no plugin and no citations unless asked');

    assert.deepStrictEqual(citationsOf({}), []);
    assert.deepStrictEqual(citationsOf({ annotations: [{ type: 'other' }, { type: 'url_citation' }] }), []);
    ok('citationsOf tolerates missing and malformed annotations');
  }

  console.log('\n── the citation gate ──');
  {
    // A confident, plausible, well-formed change — with nothing to read behind it.
    script = [reply({ changed: true, status: 'open', deadline: '2027-01-15', value: 'Now ₦80,000/month', summary: 'Dates moved.', confidence: 'high' })];
    const uncited = await agent.researchGrant(bosun, 'test', NOW);
    assert.strictEqual(uncited, null, 'an uncited change must be dropped');
    ok('an uncited claim never becomes a proposal, however confident');

    script = [reply(
      { changed: true, status: 'open', deadline: '2027-01-15', summary: 'Cohort 3 opens January.', confidence: 'medium' },
      [{ url: 'https://www.bosuntijanifoundation.org/', title: 'Foundation' }]
    )];
    const cited = await agent.researchGrant(bosun, 'test', NOW);
    assert.ok(cited, 'a cited change should propose');
    assert.strictEqual(cited.kind, 'change');
    assert.strictEqual(cited.patch.deadline, '2027-01-15');
    assert.strictEqual(cited.citations.length, 1);
    assert.strictEqual(cited.source, 'agent');
    ok('a cited change becomes a proposal carrying its evidence');

    script = [reply({ changed: false, summary: 'Still correct.', confidence: 'high' }, [{ url: 'https://x.test/' }])];
    assert.strictEqual(await agent.researchGrant(bosun, 'test', NOW), null);
    ok('"nothing changed" produces no proposal');

    // A malformed date is a guess wearing a costume.
    script = [reply({ changed: true, deadline: 'sometime in January', summary: 'soon', confidence: 'high' }, [{ url: 'https://x.test/' }])];
    assert.strictEqual(await agent.researchGrant(bosun, 'test', NOW), null);
    ok('a non-ISO deadline is discarded rather than stored');

    script = [reply('I could not find anything useful, sorry.')];
    await assert.rejects(() => agent.researchGrant(bosun, 'test', NOW), /no JSON object/);
    ok('a prose reply fails loudly instead of being half-parsed');
  }

  console.log('\n── discovery ──');
  {
    // A URL whose host appears in no citation was assembled, not read.
    script = [reply(
      { found: [{ name: 'Invented Fund', provider: 'Nobody', value: '$1m', deadline: null, url: 'https://invented-fund.example/apply', confidence: 'high', summary: 'x' }] },
      [{ url: 'https://some-other-site.test/article' }]
    )];
    assert.deepStrictEqual(await agent.discoverGrants(NOW), []);
    ok('a proposed grant whose host is in no citation is rejected');

    script = [reply(
      { found: [{ name: 'Real Fund', provider: 'Real Org', value: '$10,000', deadline: '2026-12-01', url: 'https://realfund.test/apply', confidence: 'medium', summary: 'Open to Nigerians.' }] },
      [{ url: 'https://realfund.test/apply', title: 'Real Fund' }]
    )];
    const found = await agent.discoverGrants(NOW);
    assert.strictEqual(found.length, 1);
    assert.strictEqual(found[0].kind, 'new');
    assert.strictEqual(found[0].patch.url, 'https://realfund.test/apply');
    assert.ok(found[0].citations.length);
    ok('a grant corroborated by a citation on the same host is proposed');

    script = [reply(
      { found: [{ name: '3MTT DeepTech_Ready Upskilling Programme', url: 'https://3mtt.nitda.gov.ng/deeptech/', confidence: 'high', summary: 'x' }] },
      [{ url: 'https://3mtt.nitda.gov.ng/deeptech/' }]
    )];
    assert.deepStrictEqual(await agent.discoverGrants(NOW), []);
    ok('grants already in the directory are not re-proposed');

    script = [reply({ found: [] }, [])];
    assert.deepStrictEqual(await agent.discoverGrants(NOW), []);
    ok('an empty result set is handled as a normal answer');
  }

  console.log('\n── deterministic pass ──');
  {
    // Well past every deadline in the file.
    const future = new Date('2027-06-01T00:00:00Z');
    const findings = await agent.deterministicPass({ now: future, checkLinks: false });
    assert.ok(findings.length > 0);
    assert.ok(findings.every((f) => f.source === 'deterministic' && f.confidence === 'high'));
    assert.ok(findings.some((f) => f.kind === 'expired' && f.grantId === 'bosun-tijani-gen-ai-fellowship'));
    ok('expired deadlines are found by arithmetic, with no model involved');

    const today = await agent.deterministicPass({ now: NOW, checkLinks: false });
    assert.strictEqual(today.filter((f) => f.kind === 'expired').length, 0);
    ok('nothing is expired today');
  }

  console.log('\n── research queue selection ──');
  {
    assert.ok(agent.needsResearch(bosun, NOW), 'a listing closing in 2 days must be re-checked');
    const unverified = GRANTS.find((g) => !g.verified);
    assert.ok(agent.needsResearch(unverified, NOW), 'unconfirmed listings must be re-checked');

    const fresh = { ...GRANTS[0], deadline: null, status: 'open', verified: true, verifiedOn: NOW.toISOString().slice(0, 10) };
    assert.strictEqual(agent.needsResearch(fresh, NOW), null);
    ok('fresh, verified, non-urgent listings are skipped — the queue is the cost control');

    const stale = { ...fresh, verifiedOn: '2025-01-01' };
    assert.ok(agent.needsResearch(stale, NOW));
    ok('a listing unchecked for 90 days is re-queued');
  }

  console.log('\n── a full run degrades safely ──');
  {
    delete process.env.OPENROUTER_API_KEY;
    const offline = await agent.runDailyCheck({ now: NOW, checkLinks: false, discover: false });
    assert.ok(offline.aiSkipped && offline.aiSkipped.includes('not configured'));
    assert.strictEqual(offline.grantsResearched, 0);
    assert.ok(Array.isArray(offline.findings));
    ok('with no API key the deterministic half still runs and says why');

    process.env.OPENROUTER_API_KEY = 'sk-test-key';
    // Provider down: stop early rather than burn the budget re-learning that.
    script = Array.from({ length: 10 }, () => ({ status: 402, payload: { error: { message: 'out of credit' } } }));
    const broke = await agent.runDailyCheck({ now: NOW, checkLinks: false, discover: false, maxResearch: 5 });
    assert.ok(broke.aiSkipped && broke.aiSkipped.includes('credit'));
    assert.strictEqual(broke.errors.length, 1, 'should stop after the first hard failure');
    ok('an out-of-credit account stops the research pass after one failure');
  }

  console.log('\n── approval boundary ──');
  {
    const now = new Date('2026-08-05T10:00:00Z');

    // Nothing approved: learners see exactly the committed baseline.
    assert.strictEqual(applyOverlay([]), GRANTS);
    ok('with no approvals the served directory is the committed baseline');

    const approved = [{
      _id: 'a1',
      kind: 'change',
      grantId: 'bosun-tijani-gen-ai-fellowship',
      patch: { deadline: '2027-01-15', status: 'open' },
      reviewedAt: now,
    }];
    const overlaid = applyOverlay(approved);
    const updated = overlaid.find((g) => g.id === 'bosun-tijani-gen-ai-fellowship');
    assert.strictEqual(updated.deadline, '2027-01-15');
    assert.strictEqual(updated.verified, true);
    assert.strictEqual(updated.verifiedOn, '2026-08-05', 'verifiedOn is the approval date — a person looked then');
    assert.strictEqual(updated.caveat, null, 'a corrected deadline clears the stale caveat');
    // The baseline must not have been mutated underneath.
    assert.strictEqual(bosun.deadline, '2026-07-31');
    ok('an approved patch applies, stamps the review date, and leaves the baseline untouched');

    // Editorial fields are not the agent's to rewrite.
    const overreach = applyOverlay([{
      _id: 'a2', kind: 'change', grantId: '3mtt',
      patch: { eligibility: 'Anyone at all!', summary: 'hacked', name: 'Nonsense', deadline: '2026-12-01' },
      reviewedAt: now,
    }]);
    const mtt = overreach.find((g) => g.id === '3mtt');
    assert.strictEqual(mtt.deadline, '2026-12-01', 'allowed field applies');
    assert.notStrictEqual(mtt.eligibility, 'Anyone at all!');
    assert.notStrictEqual(mtt.summary, 'hacked');
    assert.notStrictEqual(mtt.name, 'Nonsense');
    ok('a patch cannot rewrite eligibility, summary or name — only the allowlisted fields');

    const withNew = applyOverlay([{
      _id: 'n1', kind: 'new', summary: 'A newly found fund.',
      patch: { name: 'Found Fund', url: 'https://found.test/', value: '$5,000', deadline: '2026-11-30' },
      reviewedAt: now,
    }]);
    const added = withNew.find((g) => g.name === 'Found Fund');
    assert.ok(added && added.addedByAgent && added.verified === true);
    assert.strictEqual(withNew.length, GRANTS.length + 1);
    ok('an approved discovery joins the directory, flagged as agent-added');

    // A `new` proposal missing the essentials is skipped, not half-added.
    assert.strictEqual(applyOverlay([{ _id: 'n2', kind: 'new', patch: { name: 'No URL' }, reviewedAt: now }]).length, GRANTS.length);
    ok('an incomplete discovery is skipped rather than published half-formed');
  }

  server.close();
  console.log(`\n${pass} checks passed.\n`);
})().catch((err) => { server.close(); console.error('\nFAILED:', err); process.exit(1); });
