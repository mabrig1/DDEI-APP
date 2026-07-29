/**
 * Tests for the OpenRouter agentic AI integration.
 *
 * Run with `npm test`. No API key, no network and no database: a local stub
 * server stands in for OpenRouter, so the whole agent loop — tool rounds,
 * entitlement gating, failure handling and the fallback to the rule-based
 * engines — is exercised without spending anything or depending on a provider
 * being up.
 *
 * The point of most of these is the fallback path. The AI features are an
 * upgrade to code that already worked; the thing that must never regress is
 * that a broken or unfunded OpenRouter account degrades an answer rather than
 * breaking a page.
 */
const http = require('http');
const assert = require('assert');
const path = require('path');

const BACKEND = path.join(__dirname, '..');
const load = (p) => require(path.join(BACKEND, p));

let pass = 0;
const ok = (label) => { pass += 1; console.log(`  ok  ${label}`); };

// ── stub OpenRouter ──────────────────────────────────────────────────────────
let script = [];       // queued responses
let received = [];     // request bodies seen

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    received.push({ body: JSON.parse(body), headers: req.headers });
    const next = script.shift() || { status: 500, payload: { error: { message: 'no scripted response' } } };
    res.writeHead(next.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(next.payload));
  });
});

function completion(content, extra = {}) {
  return { status: 200, payload: { model: 'stub/model-a', choices: [{ message: { role: 'assistant', content } }], usage: { total_tokens: 42 }, ...extra } };
}
function toolCall(name, args) {
  return {
    status: 200,
    payload: {
      model: 'stub/model-a',
      choices: [{ message: { role: 'assistant', content: null, tool_calls: [{ id: 'call_1', type: 'function', function: { name, arguments: JSON.stringify(args) } }] } }],
    },
  };
}

(async () => {
  await new Promise((r) => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}`;

  process.env.OPENROUTER_API_KEY = 'sk-test-key';
  process.env.OPENROUTER_BASE_URL = base;
  process.env.OPENROUTER_MODEL = 'stub/model-a';
  process.env.OPENROUTER_ENABLED = 'true';
  process.env.OPENROUTER_RATE_LIMIT_PER_MINUTE = '100';

  const { runAgent, AiUnavailableError } = load('src/utils/aiClient');
  const { runTool } = load('src/utils/aiTools');
  const { answerWithAgent } = load('src/utils/aiAssist');
  const { aiStatus, isAiEnabled } = load('src/config/openrouter');
  const { VAULT_TOOL_COUNT } = load('src/data/videoToolsVault');

  console.log('\n── tools (no network) ──');
  {
    const r = runTool('list_skill_tracks', { tier: 'tier1' });
    assert.strictEqual(r.count, 3);
    assert.ok(r.tracks.every((t) => t.earningPotential && t.earningPotential.ngnMonthly));
    ok('list_skill_tracks filters by tier and carries earnings');

    const p = runTool('get_pricing_and_access', {});
    assert.strictEqual(p.premium.monthlyNaira, 2000);
    assert.ok(p.specialEdition && p.specialEdition.priceNaira);
    ok('get_pricing_and_access returns real pricing');

    const c = runTool('list_courses', { query: 'ai video' });
    assert.ok(c.count > 0 && c.courses[0].link.startsWith('https://ddei.online/course/'));
    ok('list_courses returns openable links');

    const outline = runTool('get_course_outline', { courseId: 'ai-cinematic-special-edition' });
    assert.ok(outline.found && outline.modules.length > 0);
    ok('get_course_outline returns modules');

    const cats = runTool('list_ai_video_tool_categories', {});
    assert.strictEqual(cats.totalTools, VAULT_TOOL_COUNT);
    assert.strictEqual(cats.categories.length, 9);
    ok(`vault categories: 9, ${VAULT_TOOL_COUNT} tools`);

    const locked = runTool('search_ai_video_tools', { query: 'avatar' }, { vaultAccess: false });
    assert.strictEqual(locked.locked, true);
    assert.ok(!JSON.stringify(locked).includes('http'), 'locked result must contain no links');
    ok('search_ai_video_tools withholds every link without entitlement');

    const open = runTool('search_ai_video_tools', { query: 'avatar', limit: 5 }, { vaultAccess: true });
    assert.strictEqual(open.locked, false);
    assert.ok(open.tools.length > 0 && open.tools.length <= 5);
    assert.ok(open.tools.every((t) => /^https?:\/\//.test(t.link)));
    ok(`search_ai_video_tools returns ${open.tools.length} entitled tools, all with URLs`);

    assert.ok(runTool('does_not_exist', {}).error);
    assert.ok(runTool('get_course_outline', { courseId: 'nope' }).found === false);
    ok('unknown tool and unknown course return errors, not throws');
  }

  console.log('\n── agent loop ──');
  {
    script = [completion('Straight answer.')];
    received = [];
    const r = await runAgent({ system: 'sys', message: 'hi', tools: ['list_skill_tracks'] });
    assert.strictEqual(r.reply, 'Straight answer.');
    assert.strictEqual(r.rounds, 0);
    assert.strictEqual(r.model, 'stub/model-a');
    assert.strictEqual(received[0].headers.authorization, 'Bearer sk-test-key');
    assert.ok(received[0].headers['x-title']);
    assert.ok(received[0].body.tools.length === 1);
    ok('single-shot reply, auth + attribution headers, tools advertised');

    script = [toolCall('list_skill_tracks', { tier: 'tier2' }), completion('Tier 2 takes 10-12 weeks.')];
    received = [];
    const r2 = await runAgent({ system: 'sys', message: 'which track?', tools: ['list_skill_tracks'] });
    assert.strictEqual(r2.reply, 'Tier 2 takes 10-12 weeks.');
    assert.deepStrictEqual(r2.toolsUsed, ['list_skill_tracks']);
    assert.strictEqual(r2.rounds, 1);
    const second = received[1].body.messages;
    assert.strictEqual(second[second.length - 1].role, 'tool');
    assert.strictEqual(second[second.length - 1].tool_call_id, 'call_1');
    assert.strictEqual(second[second.length - 2].role, 'assistant');
    ok('tool round-trip: assistant turn echoed, tool result matched by call id');

    // entitlement must flow from controller -> tool
    script = [toolCall('search_ai_video_tools', { query: 'avatar' }), completion('Here you go.')];
    received = [];
    await runAgent({ system: 'sys', message: 'avatars?', tools: ['search_ai_video_tools'], toolContext: { vaultAccess: false } });
    const toolMsg = received[1].body.messages.find((m) => m.role === 'tool');
    assert.ok(JSON.parse(toolMsg.content).locked === true);
    ok('toolContext entitlement reaches the tool through the loop');

    // History mapping against the exact payloads index.html sends: the advisor
    // widget uses role:'advisor', the help widget uses role:'bot'.
    for (const [botRole, label] of [['advisor', 'advisor widget'], ['bot', 'help widget']]) {
      script = [completion('ack')];
      received = [];
      await runAgent({
        system: 'sys',
        message: 'x',
        history: [{ role: 'user', message: 'a' }, { role: botRole, message: 'b' }],
      });
      const msgs = received[0].body.messages;
      assert.deepStrictEqual(msgs.map((m) => m.role), ['system', 'user', 'assistant', 'user'], label);
      assert.strictEqual(msgs[2].content, 'b');
      ok(`history: role:'${botRole}' maps to assistant (${label})`);
    }

    script = [completion('ack')];
    received = [];
    await runAgent({ system: 'sys', message: 'x', history: [{ from: 'bot', text: 'b' }] });
    assert.strictEqual(received[0].body.messages[1].role, 'assistant');
    ok('history also accepts {from,text}');

    // fallback model list
    process.env.OPENROUTER_FALLBACK_MODELS = 'stub/model-b, stub/model-c';
    script = [completion('ok')];
    received = [];
    await runAgent({ system: 'sys', message: 'x' });
    assert.deepStrictEqual(received[0].body.models, ['stub/model-a', 'stub/model-b', 'stub/model-c']);
    delete process.env.OPENROUTER_FALLBACK_MODELS;
    ok('OPENROUTER_FALLBACK_MODELS becomes the models array');

    // tools dropped on the last round so the model must answer
    process.env.OPENROUTER_MAX_TOOL_ROUNDS = '1';
    script = [toolCall('list_skill_tracks', {}), completion('final')];
    received = [];
    const r3 = await runAgent({ system: 'sys', message: 'x', tools: ['list_skill_tracks'] });
    assert.strictEqual(r3.reply, 'final');
    assert.ok(received[0].body.tools, 'first round advertises tools');
    assert.ok(!received[1].body.tools, 'last round must not advertise tools');
    process.env.OPENROUTER_MAX_TOOL_ROUNDS = '4';
    ok('final round drops tools so the turn always ends in prose');
  }

  console.log('\n── failure handling ──');
  {
    for (const [status, label] of [[401, 'bad key'], [402, 'out of credit'], [404, 'unknown model'], [429, 'rate limited']]) {
      script = [{ status, payload: { error: { message: label } } }];
      await assert.rejects(() => runAgent({ system: 's', message: 'x' }), AiUnavailableError);
    }
    ok('401 / 402 / 404 / 429 all raise AiUnavailableError');

    script = [{ status: 200, payload: { error: { message: 'soft error' } } }];
    await assert.rejects(() => runAgent({ system: 's', message: 'x' }), AiUnavailableError);
    ok('a 200 carrying an error body is still a failure');

    script = [completion('   ')];
    await assert.rejects(() => runAgent({ system: 's', message: 'x' }), AiUnavailableError);
    ok('empty completion is a failure, not an empty reply');
  }

  console.log('\n── controller fallback ──');
  {
    const req = { userId: 'u1', ip: '1.2.3.4' };
    script = [completion('AI answer.')];
    const good = await answerWithAgent({ agentName: 'help', req, message: 'hi', fallback: () => 'RULE' });
    assert.deepStrictEqual([good.reply, good.source], ['AI answer.', 'ai']);
    ok('healthy call is served by the model');

    script = [{ status: 402, payload: { error: { message: 'out of credit' } } }];
    const bad = await answerWithAgent({ agentName: 'help', req, message: 'hi', fallback: () => 'RULE' });
    assert.deepStrictEqual([bad.reply, bad.source], ['RULE', 'fallback']);
    ok('402 falls back to the rule-based reply, no throw');

    process.env.OPENROUTER_RATE_LIMIT_PER_MINUTE = '1';
    const limitReq = { userId: 'ratelimited', ip: '9.9.9.9' };
    script = [completion('first')];
    const a = await answerWithAgent({ agentName: 'help', req: limitReq, message: 'hi', fallback: () => 'RULE' });
    const b = await answerWithAgent({ agentName: 'help', req: limitReq, message: 'hi', fallback: () => 'RULE' });
    assert.strictEqual(a.source, 'ai');
    assert.strictEqual(b.source, 'fallback');
    process.env.OPENROUTER_RATE_LIMIT_PER_MINUTE = '100';
    ok('rate limit degrades to the fallback instead of erroring');

    delete process.env.OPENROUTER_API_KEY;
    assert.strictEqual(isAiEnabled(), false);
    const off = await answerWithAgent({ agentName: 'advisor', req, message: 'hi', fallback: () => 'RULE' });
    assert.deepStrictEqual([off.reply, off.source], ['RULE', 'fallback']);
    assert.deepStrictEqual([aiStatus().configured, aiStatus().enabled], [false, false]);
    ok('no API key: every feature runs rule-based, status reports it honestly');

    process.env.OPENROUTER_API_KEY = 'sk-test-key';
    process.env.OPENROUTER_ENABLED = 'false';
    assert.strictEqual(isAiEnabled(), false);
    process.env.OPENROUTER_ENABLED = 'true';
    ok('OPENROUTER_ENABLED=false pauses spend with the key still in place');
  }

  console.log('\n── rule-based engines still correct ──');
  {
    const { buildReply } = load('src/utils/advisorEngine');
    const r = buildReply('tell me about Web Development');
    assert.ok(!r.includes('undefined'), r);
    assert.ok(r.includes('₦350,000'));
    ok('advisorEngine no longer emits "undefined" for earnings');

    const { buildHelpReply } = load('src/utils/helpBotEngine');
    assert.ok(buildHelpReply('how much does it cost?').includes('₦2,000'));
    ok('helpBotEngine unchanged');
  }

  server.close();
  console.log(`\n${pass} checks passed.\n`);
})().catch((err) => { server.close(); console.error('\nFAILED:', err); process.exit(1); });
