#!/usr/bin/env node
/**
 * Mirrors the primary MongoDB into the Appwrite backup backend.
 *
 *   npm run appwrite:sync                       # everything + static catalogs
 *   npm run appwrite:sync -- --catalog-only     # just skills/opportunities/courses/vault
 *   npm run appwrite:sync -- --since=24h        # only what changed in the last 24 hours
 *   npm run appwrite:sync -- --models=User,Content
 *
 * Run `npm run appwrite:provision` first — this script writes rows, it does not
 * create tables.
 */

require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { isAppwriteConfigured, readConfig, databaseId } = require('../config/appwrite');
const { runSync, MODEL_NAMES } = require('../utils/appwriteSync');
const { mirrorCatalog } = require('../utils/appwriteBackup');

// Loading the models registers them with Mongoose so runSync can resolve them
// by name.
require('../models/User');
require('../models/Application');
require('../models/RecruitmentApplication');
require('../models/Subscription');
require('../models/Content');
require('../models/ServiceUpdate');

function parseArgs(argv) {
  const args = { catalogOnly: false, since: null, models: MODEL_NAMES };
  for (const arg of argv) {
    if (arg === '--catalog-only') args.catalogOnly = true;
    else if (arg.startsWith('--since=')) args.since = parseSince(arg.slice('--since='.length));
    else if (arg.startsWith('--models=')) args.models = arg.slice('--models='.length).split(',').map((s) => s.trim()).filter(Boolean);
  }
  return args;
}

/** Accepts an ISO timestamp or a shorthand duration like `30m`, `24h`, `7d`. */
function parseSince(value) {
  const relative = /^(\d+)([mhd])$/.exec(value.trim());
  if (relative) {
    const amount = Number(relative[1]);
    const ms = { m: 60_000, h: 3_600_000, d: 86_400_000 }[relative[2]];
    return new Date(Date.now() - amount * ms);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`--since expects an ISO timestamp or a duration like 24h, got "${value}"`);
  }
  return date;
}

async function main() {
  if (!isAppwriteConfigured()) {
    console.error('APPWRITE_API_KEY is not set — nothing to sync. See docs/APPWRITE_BACKUP.md.');
    process.exit(1);
  }

  const args = parseArgs(process.argv.slice(2));
  const { endpoint, projectId } = readConfig();
  console.log(`Syncing to Appwrite  project=${projectId}  database=${databaseId()}  endpoint=${endpoint}`);

  if (args.catalogOnly) {
    const result = await mirrorCatalog({ force: true });
    console.log(`Catalog: ${result.written} row(s) written, ${result.failed} failed`);
    console.log(JSON.stringify(result.counts, null, 2));
    return;
  }

  await connectDB();

  if (args.since) console.log(`Incremental: documents updated after ${args.since.toISOString()}`);

  const summary = await runSync({
    models: args.models,
    since: args.since,
    includeCatalog: true,
    onProgress: (modelName, done, total) => {
      process.stdout.write(`\r  ${modelName}: ${done}/${total}   `);
    },
  });

  process.stdout.write('\r');
  for (const [modelName, stats] of Object.entries(summary.models)) {
    console.log(`  ${modelName.padEnd(14)} ${stats.synced} synced, ${stats.skipped} skipped, ${stats.failed} failed (of ${stats.total})`);
  }
  if (summary.catalog && !summary.catalog.skipped) {
    console.log(`  ${'catalog'.padEnd(14)} ${summary.catalog.written} written, ${summary.catalog.failed} failed`);
  }
  console.log(`\nFinished in ${(summary.durationMs / 1000).toFixed(1)}s`);

  if (summary.errors.length > 0) {
    console.warn(`\n${summary.errors.length} error(s):`);
    for (const error of summary.errors.slice(0, 20)) console.warn(`  - ${error}`);
    if (summary.errors.length > 20) console.warn(`  … and ${summary.errors.length - 20} more`);
    process.exitCode = 1;
  }
}

main()
  .catch((err) => {
    console.error('\nSync failed:', err && err.message ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  });
