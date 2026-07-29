#!/usr/bin/env node
/**
 * The daily Grants Directory check.
 *
 *   node src/scripts/refreshGrants.js                 # report only, writes nothing
 *   node src/scripts/refreshGrants.js --save          # queue findings for review
 *   node src/scripts/refreshGrants.js --save --report out.md
 *   node src/scripts/refreshGrants.js --no-links --no-discover
 *
 * Run by .github/workflows/grants-agent.yml every morning.
 *
 * `--save` queues proposals for an admin to approve. It does not change what
 * learners see: approving is a human action, by design. See
 * models/GrantUpdate.js for why that boundary is not negotiable.
 */

require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { runDailyCheck } = require('../utils/grantsAgent');
const { openRouterConfig, isAiEnabled } = require('../config/openrouter');

function parseArgs(argv) {
  const args = { save: false, links: true, discover: true, report: null, maxResearch: null };
  for (let i = 0; i < argv.length; i += 1) {
    const [flag, inline] = argv[i].split('=');
    const value = () => (inline !== undefined ? inline : argv[++i]);
    if (flag === '--save') args.save = true;
    else if (flag === '--no-links') args.links = false;
    else if (flag === '--no-discover') args.discover = false;
    else if (flag === '--report') args.report = value();
    else if (flag === '--max-research') args.maxResearch = Number(value());
  }
  return args;
}

const KIND_LABEL = {
  expired: '⛔ Deadline passed',
  'dead-link': '🔗 Dead link',
  change: '✏️ Details changed',
  new: '✨ New opportunity',
};

function toMarkdown(result, saved) {
  const lines = [
    '# Grants Directory — daily check',
    '',
    `- Run: \`${result.runId}\``,
    `- Checked: ${result.checkedAt}`,
    `- Listings in directory: ${result.grantsInDirectory}`,
    `- Deterministic findings: ${result.deterministicFindings}`,
    `- Listings researched by the model: ${result.grantsResearched}`,
    `- Took: ${(result.durationMs / 1000).toFixed(1)}s`,
  ];

  if (result.aiSkipped) lines.push(`- ⚠️ ${result.aiSkipped}`);
  if (result.errors.length) {
    lines.push('', '## Errors', ...result.errors.map((e) => `- ${e}`));
  }

  lines.push('', `## Findings (${result.findings.length})`, '');

  if (!result.findings.length) {
    lines.push('Nothing to review. Every listing still looks correct.');
  }

  for (const f of result.findings) {
    lines.push(`### ${KIND_LABEL[f.kind] || f.kind} — ${f.grantName}`);
    lines.push('');
    lines.push(`${f.summary}`);
    lines.push('');
    lines.push(`- Confidence: **${f.confidence}** · Source: ${f.source}${f.model ? ` (${f.model})` : ''}`);
    if (Object.keys(f.patch || {}).length) {
      lines.push(`- Proposed change: \`${JSON.stringify(f.patch)}\``);
    }
    if (f.citations && f.citations.length) {
      lines.push('- Evidence:');
      for (const c of f.citations.slice(0, 4)) {
        lines.push(`  - [${c.title || c.url}](${c.url})`);
      }
    } else {
      lines.push('- Evidence: none (deterministic check)');
    }
    lines.push('');
  }

  lines.push('---', '');
  lines.push(
    saved === null
      ? '_Report only — nothing was queued. Re-run with `--save` to queue these for review._'
      : `_${saved} proposal(s) queued. Review them in the admin dashboard; **nothing reaches learners until a human approves it.**_`
  );

  return lines.join('\n');
}

async function save(findings) {
  const GrantUpdate = require('../models/GrantUpdate');
  let queued = 0;

  for (const finding of findings) {
    try {
      if (finding.grantId) {
        // The unique partial index allows one pending proposal per grant+kind.
        // Refresh the existing one rather than colliding with it every morning.
        const existing = await GrantUpdate.findOne({
          grantId: finding.grantId,
          kind: finding.kind,
          status: 'pending',
        });
        if (existing) {
          existing.set({
            summary: finding.summary,
            patch: finding.patch,
            citations: finding.citations,
            confidence: finding.confidence,
            model: finding.model || null,
            runId: finding.runId,
          });
          await existing.save();
          continue;
        }
      } else {
        // `new` proposals have no grantId, so the index cannot dedupe them.
        // Match on name so a rediscovered opportunity doesn't stack up.
        const duplicate = await GrantUpdate.findOne({
          kind: 'new',
          grantName: finding.grantName,
          status: { $in: ['pending', 'rejected'] },
        });
        if (duplicate) continue;
      }

      await GrantUpdate.create(finding);
      queued += 1;
    } catch (err) {
      console.warn(`Could not queue "${finding.grantName}": ${err.message}`);
    }
  }

  return queued;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cfg = openRouterConfig();

  console.log('Grants Directory — daily check');
  console.log(`  AI research: ${isAiEnabled() ? `on (${cfg.model}, web plugin ${cfg.webResults} results)` : 'off — deterministic checks only'}`);
  console.log(`  Link checks: ${args.links ? 'on' : 'off'} · Discovery: ${args.discover ? 'on' : 'off'}`);
  console.log('');

  const result = await runDailyCheck({
    checkLinks: args.links,
    discover: args.discover,
    maxResearch: args.maxResearch || cfg.grantsMaxResearch,
  });

  let saved = null;
  if (args.save) {
    if (!process.env.MONGODB_URI) {
      console.error('--save needs MONGODB_URI. Reporting only.');
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
      try {
        saved = await save(result.findings);
      } finally {
        await mongoose.disconnect();
      }
    }
  }

  const markdown = toMarkdown(result, saved);
  console.log(markdown);

  if (args.report) {
    fs.writeFileSync(args.report, markdown);
    console.log(`\nWrote ${args.report}`);
  }

  // Let CI branch on whether a human needs to look at anything today.
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `findings=${result.findings.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `queued=${saved === null ? 0 : saved}\n`);
  }
}

main().catch((err) => {
  console.error('Daily check failed:', err.message);
  process.exit(1);
});
