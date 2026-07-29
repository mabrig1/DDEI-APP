/**
 * The daily Grants Directory agent.
 *
 * Runs in two passes, and the split between them is the important part.
 *
 * **Pass 1 — deterministic.** Date arithmetic and HTTP status codes. Has a
 * listing's deadline passed? Does its official URL still resolve? No model is
 * involved, so these findings are facts and are marked `source: 'deterministic'`.
 * This pass always runs, including when OpenRouter is switched off entirely.
 *
 * **Pass 2 — research.** OpenRouter with the web plugin, asked to check whether
 * a specific listing's facts have moved and to look for opportunities the
 * directory is missing. Every claim must arrive with a citation or it is
 * dropped on the floor here — an uncited deadline is a rumour, and this
 * directory's whole value is that it does not publish rumours.
 *
 * Neither pass publishes anything. Both produce proposals for a human to
 * approve. See models/GrantUpdate.js for why that boundary is absolute.
 */

const axios = require('axios');
const { GRANTS, deadlineState, daysUntil } = require('../data/grants');
const { runAgent, AiUnavailableError } = require('./aiClient');
const { isAiEnabled, openRouterConfig } = require('../config/openrouter');

// A listing older than this wants re-checking even if nothing looks wrong.
const STALE_AFTER_DAYS = 90;

// Re-check anything closing inside this window daily — these are the listings
// where being wrong costs someone the opportunity.
const URGENT_WITHIN_DAYS = 21;

const LINK_TIMEOUT_MS = 12000;

function daysSince(isoDate, now) {
  if (!isoDate) return Infinity;
  const then = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(then.getTime())) return Infinity;
  return Math.floor((now.getTime() - then.getTime()) / 86400000);
}

/**
 * Is the official page still there?
 *
 * Only a definitive 404/410 counts as dead. A timeout, a TLS error, a 403 from
 * a bot-blocker or a blocked egress proxy says something about our network, not
 * about the grant — reporting those as "dead link" would generate a false alarm
 * every morning and train whoever reviews these to ignore them.
 */
async function checkLink(url) {
  try {
    const response = await axios.get(url, {
      timeout: LINK_TIMEOUT_MS,
      maxRedirects: 5,
      validateStatus: () => true,
      headers: { 'User-Agent': 'DestinySkillsBridge-GrantsBot/1.0 (+https://ddei.online)' },
    });
    if (response.status === 404 || response.status === 410) {
      return { state: 'dead', status: response.status };
    }
    return { state: 'alive', status: response.status };
  } catch (err) {
    return { state: 'unchecked', reason: err.code || err.message };
  }
}

/**
 * Pass 1. Pure arithmetic and HTTP — no model, no cost, always runs.
 */
async function deterministicPass({ now = new Date(), checkLinks = true } = {}) {
  const findings = [];

  for (const grant of GRANTS) {
    const { state } = deadlineState(grant, now);

    // A listing carrying a hard deadline that has passed is stating something
    // false. The served API already renders it as closed, but the underlying
    // entry needs a human to either find the next round or retire it.
    if (grant.deadline && state === 'closed' && grant.status !== 'closed') {
      findings.push({
        kind: 'expired',
        grantId: grant.id,
        grantName: grant.name,
        source: 'deterministic',
        confidence: 'high',
        summary:
          `The deadline (${grant.deadline}) has passed. Either find the next round's dates or mark this listing closed.`,
        patch: { status: 'closed' },
        citations: [],
      });
    }

    if (checkLinks) {
      const link = await checkLink(grant.url);
      if (link.state === 'dead') {
        findings.push({
          kind: 'dead-link',
          grantId: grant.id,
          grantName: grant.name,
          source: 'deterministic',
          confidence: 'high',
          summary: `The official page returned HTTP ${link.status}. The listing needs a new URL, or retiring.`,
          patch: {},
          citations: [{ url: grant.url, title: null, excerpt: `HTTP ${link.status}` }],
        });
      }
    }
  }

  return findings;
}

/**
 * Which listings are worth spending a model call on today.
 *
 * Deliberately not "all of them, every day": that is 13 web-search calls a day
 * for a directory that mostly does not change, on a platform whose owner has
 * been burned twice by surprise bills. Urgent deadlines and stale entries only.
 */
function needsResearch(grant, now) {
  const { state, daysLeft } = deadlineState(grant, now);
  if (state === 'closing-soon') return 'closing within days';
  if (state === 'open' && daysLeft !== null && daysLeft <= URGENT_WITHIN_DAYS) return 'closing within three weeks';
  if (state === 'closed' || grant.status === 'closed') return 'closed — look for the next round';
  if (grant.status === 'watch') return 'watch-listed — look for an open round';
  if (daysSince(grant.verifiedOn, now) >= STALE_AFTER_DAYS) return 'not checked in 90 days';
  if (!grant.verified) return 'carries unconfirmed details';
  return null;
}

const RESEARCH_SYSTEM = `You verify funding opportunities for a Nigerian digital
skills platform. Learners plan their week around what you report, so being
uncertain out loud is always better than being confidently wrong.

Use the web results you are given. Prefer the programme's own website over blogs
and aggregator sites, which routinely republish last year's dates.

Reply with ONLY a JSON object, no prose and no code fences:

{
  "changed": boolean,        // true only if a fact below differs from what I gave you
  "status": "open" | "closed" | "watch" | "unknown",
  "deadline": "YYYY-MM-DD" | null,   // null unless you found an explicit date
  "value": string | null,    // corrected headline value, else null
  "summary": string,         // one or two sentences for a human reviewer
  "confidence": "low" | "medium" | "high"
}

Rules:
- "changed": false when the current record still looks right. That is a good and
  common answer. Do not invent a change to seem useful.
- Never guess a deadline. If the pages you saw do not state one explicitly,
  "deadline" is null and "confidence" is at most "low".
- A date on a blog with no confirmation from the official site is "low".
- If the search results do not actually cover this programme, say so in
  "summary", set "changed" to false and "confidence" to "low".`;

const DISCOVERY_SYSTEM = `You find funding opportunities for a Nigerian digital
skills platform: grants, paid fellowships, fully-funded training, cloud/AI
credits and seed capital that Nigerians can apply to, for learners, web
developers, AI engineers and technical founders.

Reply with ONLY a JSON object, no prose and no code fences:

{ "found": [ { "name": string, "provider": string, "value": string,
              "deadline": "YYYY-MM-DD" | null, "url": string,
              "audience": string, "summary": string,
              "confidence": "low" | "medium" | "high" } ] }

Rules:
- Only opportunities that are currently open or opening soon. No closed rounds.
- "url" must be the organisation's own page for the programme, taken from the
  search results. Never construct or guess a URL.
- Never guess a deadline. No explicit date in the results means null.
- Exclude anything already in the list of programmes I give you.
- An empty "found" array is a perfectly good answer. Do not pad it.`;

function parseJsonReply(reply) {
  const cleaned = reply.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('no JSON object in reply');
  return JSON.parse(cleaned.slice(start, end + 1));
}

/** Ask the model to re-check one listing. Returns a finding, or null. */
async function researchGrant(grant, reason, now) {
  const cfg = openRouterConfig();
  const brief = [
    `Programme: ${grant.name}`,
    `Run by: ${grant.provider}`,
    `Official page: ${grant.url}`,
    `Our recorded value: ${grant.value}`,
    `Our recorded deadline: ${grant.deadline || 'none — ' + (grant.deadlineNote || 'rolling')}`,
    `Our recorded status: ${grant.status || 'open'}`,
    `Last checked: ${grant.verifiedOn}`,
    `Today: ${now.toISOString().slice(0, 10)}`,
    '',
    `Why I am asking: ${reason}.`,
    'Is our record still correct? Check the official page above.',
  ].join('\n');

  const result = await runAgent({
    system: RESEARCH_SYSTEM,
    message: brief,
    maxTokens: 600,
    temperature: 0,
    web: cfg.webResults,
    json: true,
  });

  const parsed = parseJsonReply(result.reply);
  if (!parsed.changed) return null;

  // The hard gate. A change with nothing to read behind it is not reviewable,
  // and an unreviewable proposal is just noise that erodes trust in the queue.
  if (!result.citations.length) return null;

  const patch = {};
  if (parsed.deadline && /^\d{4}-\d{2}-\d{2}$/.test(parsed.deadline) && parsed.deadline !== grant.deadline) {
    patch.deadline = parsed.deadline;
  }
  if (parsed.status && ['open', 'closed', 'watch'].includes(parsed.status) && parsed.status !== (grant.status || 'open')) {
    patch.status = parsed.status;
  }
  if (parsed.value && parsed.value !== grant.value) patch.value = parsed.value;

  if (!Object.keys(patch).length) return null;

  return {
    kind: 'change',
    grantId: grant.id,
    grantName: grant.name,
    source: 'agent',
    model: result.model,
    confidence: ['low', 'medium', 'high'].includes(parsed.confidence) ? parsed.confidence : 'low',
    summary: String(parsed.summary || '').slice(0, 1000) || 'The agent reported a change.',
    patch,
    citations: result.citations,
  };
}

/** Ask the model for opportunities the directory is missing. */
async function discoverGrants(now) {
  const cfg = openRouterConfig();
  const known = GRANTS.map((g) => `- ${g.name} (${g.provider})`).join('\n');

  const result = await runAgent({
    system: DISCOVERY_SYSTEM,
    message: [
      `Today is ${now.toISOString().slice(0, 10)}.`,
      'Find funding open to Nigerians in digital skills, web development, AI, or technology entrepreneurship',
      'that is not already in this list.',
      '',
      'Already listed:',
      known,
    ].join('\n'),
    maxTokens: 1200,
    temperature: 0.2,
    web: Math.max(cfg.webResults, 8),
    json: true,
  });

  const parsed = parseJsonReply(result.reply);
  const found = Array.isArray(parsed.found) ? parsed.found : [];
  const knownNames = new Set(GRANTS.map((g) => g.name.toLowerCase()));
  const knownHosts = new Set(GRANTS.map((g) => {
    try { return new URL(g.url).hostname.replace(/^www\./, ''); } catch (err) { return null; }
  }).filter(Boolean));

  return found
    .filter((item) => item && item.name && item.url)
    .filter((item) => !knownNames.has(String(item.name).toLowerCase()))
    .filter((item) => {
      // A model asked for "the official page" will sometimes return a plausible
      // URL it assembled rather than one it read. Requiring the host to appear
      // in a citation is the cheapest check that it actually saw the page.
      let host;
      try { host = new URL(item.url).hostname.replace(/^www\./, ''); } catch (err) { return false; }
      if (knownHosts.has(host)) return false;
      return result.citations.some((c) => {
        try { return new URL(c.url).hostname.replace(/^www\./, '') === host; } catch (err) { return false; }
      });
    })
    .slice(0, 10)
    .map((item) => ({
      kind: 'new',
      grantId: null,
      grantName: String(item.name).slice(0, 200),
      source: 'agent',
      model: result.model,
      confidence: ['low', 'medium', 'high'].includes(item.confidence) ? item.confidence : 'low',
      summary: [
        String(item.summary || '').slice(0, 800),
        item.provider ? `Run by: ${item.provider}` : null,
        item.audience ? `For: ${item.audience}` : null,
      ].filter(Boolean).join(' — '),
      patch: {
        name: item.name,
        provider: item.provider || null,
        value: item.value || null,
        deadline: /^\d{4}-\d{2}-\d{2}$/.test(item.deadline || '') ? item.deadline : null,
        url: item.url,
      },
      citations: result.citations.filter((c) => {
        try {
          return new URL(c.url).hostname.replace(/^www\./, '')
            === new URL(item.url).hostname.replace(/^www\./, '');
        } catch (err) { return false; }
      }),
    }));
}

/**
 * A full daily run.
 *
 * Never throws for AI reasons: if OpenRouter is unconfigured, out of credit or
 * simply having a bad day, the deterministic findings still come back and the
 * run reports why the research pass was skipped. A directory that stops being
 * checked at all because a billing card expired would be the worst outcome here.
 */
async function runDailyCheck({ now = new Date(), checkLinks = true, discover = true, maxResearch = 6 } = {}) {
  const startedAt = Date.now();
  const runId = `grants-${now.toISOString().slice(0, 19).replace(/[:T]/g, '')}`;
  const errors = [];

  const findings = await deterministicPass({ now, checkLinks });
  const deterministicCount = findings.length;

  let researched = 0;
  let aiSkipped = null;

  if (!isAiEnabled()) {
    aiSkipped = 'OpenRouter is not configured or is disabled — deterministic checks only.';
  } else {
    const queue = GRANTS
      .map((grant) => ({ grant, reason: needsResearch(grant, now) }))
      .filter((entry) => entry.reason)
      .slice(0, maxResearch);

    for (const { grant, reason } of queue) {
      try {
        const finding = await researchGrant(grant, reason, now);
        researched += 1;
        if (finding) findings.push(finding);
      } catch (err) {
        errors.push(`${grant.id}: ${err.message}`);
        // A provider outage will fail every remaining call the same way; stop
        // rather than burn the rest of the budget discovering that repeatedly.
        if (err instanceof AiUnavailableError) {
          aiSkipped = `Research stopped early — ${err.message}`;
          break;
        }
      }
    }

    if (discover && !aiSkipped) {
      try {
        findings.push(...(await discoverGrants(now)));
      } catch (err) {
        errors.push(`discovery: ${err.message}`);
      }
    }
  }

  return {
    runId,
    checkedAt: now.toISOString(),
    durationMs: Date.now() - startedAt,
    grantsInDirectory: GRANTS.length,
    deterministicFindings: deterministicCount,
    grantsResearched: researched,
    aiSkipped,
    errors,
    findings: findings.map((f) => ({ ...f, runId })),
  };
}

module.exports = {
  runDailyCheck,
  deterministicPass,
  researchGrant,
  discoverGrants,
  needsResearch,
  checkLink,
  parseJsonReply,
  daysSince,
  STALE_AFTER_DAYS,
  URGENT_WITHIN_DAYS,
};
