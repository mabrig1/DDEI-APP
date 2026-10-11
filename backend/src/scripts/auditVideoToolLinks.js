'use strict';

// Read-only reachability triage; an HTTP 200 does NOT verify free credits,
// generation access, commercial licensing, or output quality.
const { VAULT_CATEGORIES } = require('../data/videoToolsVault');
const items = VAULT_CATEGORIES.flatMap((category) => category.tools);
const limitFlag = process.argv.find((value) => /^--limit=\d+$/.test(value));
const limit = limitFlag ? Number(limitFlag.slice(8)) : 20;
if (!Number.isInteger(limit) || limit < 1 || limit > items.length) {
  console.error('Use --limit=N where N is between 1 and ' + items.length);
  process.exit(2);
}
async function probe(tool) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    let response = await fetch(tool.url, {
      method: 'HEAD', signal: controller.signal, redirect: 'follow',
      headers: { 'User-Agent': 'DDEI-Tools-LinkReview/1.0 (+https://ddei.online)' },
    });
    if ([405, 501].includes(response.status)) {
      response = await fetch(tool.url, {
        method: 'GET', signal: controller.signal, redirect: 'follow',
        headers: { 'User-Agent': 'DDEI-Tools-LinkReview/1.0 (+https://ddei.online)' },
      });
      await response.body?.cancel();
    }
    return {
      name: tool.name, url: tool.url,
      httpStatus: response.status,
      availability: response.status >= 200 && response.status < 400 ? 'reachable'
        : [401, 403, 429].includes(response.status) ? 'restricted-or-blocked' : 'investigate',
      // This is NOT evidence of a free tier or license.
    };
  } catch (error) {
    return { name: tool.name, url: tool.url, availability: 'unknown', error: String(error.message) };
  } finally {
    clearTimeout(timer);
  }
}
async function main() {
  const chosen = items.slice(0, limit);
  const results = [];
  // Gentle concurrency: at most three outbound requests simultaneously.
  for (let index = 0; index < chosen.length; index += 3) {
    results.push(...await Promise.all(chosen.slice(index, index + 3).map(probe)));
  }
  console.log(JSON.stringify({
    auditedAt: new Date().toISOString(),
    note: 'Link status only; free claims and licenses NOT verified',
    checked: results.length,
    results,
  }, null, 2));
}
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
