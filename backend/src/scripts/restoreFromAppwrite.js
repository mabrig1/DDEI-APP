#!/usr/bin/env node
/**
 * Restores data from the Appwrite backup backend into MongoDB.
 *
 *   npm run appwrite:restore                          # dry run — reports, writes nothing
 *   npm run appwrite:restore -- --confirm              # actually write to MongoDB
 *   npm run appwrite:restore -- --models=Content --confirm
 *
 * This is the disaster-recovery half of the backup. It is a dry run by default
 * because it overwrites primary data; nothing is written without --confirm.
 *
 * A note on passwords: password hashes and reset tokens are deliberately never
 * mirrored, so a restored user that does not already exist in MongoDB gets a
 * random unusable password. Those accounts must go through "Forgot password"
 * to regain access — the script prints how many are in that state.
 */

require('dotenv').config();

const crypto = require('crypto');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const {
  getTablesDB,
  databaseId,
  readConfig,
  isAppwriteConfigured,
  Query,
} = require('../config/appwrite');
const { TABLES_BY_MODEL } = require('../config/appwriteSchema');

require('../models/User');
require('../models/Application');
require('../models/RecruitmentApplication');
require('../models/Subscription');
require('../models/Content');
require('../models/ServiceUpdate');

const MODEL_NAMES = Object.keys(TABLES_BY_MODEL);

// Row fields that describe the mirror itself rather than the source document.
const MIRROR_META = new Set(['mirroredAt']);
const JSON_FIELDS = new Set(['portfolio', 'courseProgress', 'purchasedCourses', 'paystackData']);

function parseArgs(argv) {
  const args = { confirm: false, models: MODEL_NAMES };
  for (const arg of argv) {
    if (arg === '--confirm') args.confirm = true;
    else if (arg.startsWith('--models=')) args.models = arg.slice('--models='.length).split(',').map((s) => s.trim()).filter(Boolean);
  }
  return args;
}

async function* readRows(tablesDB, tableId) {
  let cursor = null;
  for (;;) {
    const queries = [Query.limit(100)];
    if (cursor) queries.push(Query.cursorAfter(cursor));
    const page = await tablesDB.listRows({ databaseId: databaseId(), tableId, queries });
    const rows = page.rows || [];
    if (rows.length === 0) return;
    for (const row of rows) yield row;
    if (rows.length < 100) return;
    cursor = rows[rows.length - 1].$id;
  }
}

/** Convert an Appwrite row back into a Mongo-shaped update payload. */
function rowToDoc(table, row) {
  const doc = {};
  for (const column of table.columns) {
    if (MIRROR_META.has(column.key)) continue;
    const value = row[column.key];
    if (value === undefined || value === null) continue;

    if (JSON_FIELDS.has(column.key)) {
      try {
        doc[column.key] = JSON.parse(value);
      } catch (err) {
        // A truncated or malformed blob should not sink the whole record.
        console.warn(`  ! ${table.id}/${row.$id}: could not parse ${column.key}, skipping that field`);
      }
      continue;
    }
    if (column.type === 'datetime') {
      doc[column.key] = new Date(value);
      continue;
    }
    doc[column.key] = value;
  }
  return doc;
}

async function restoreModel(tablesDB, modelName, { confirm }) {
  const table = TABLES_BY_MODEL[modelName];
  const Model = mongoose.model(modelName);
  const stats = { rows: 0, created: 0, updated: 0, unchanged: 0, failed: 0, passwordless: 0 };

  for await (const row of readRows(tablesDB, table.id)) {
    stats.rows += 1;
    const doc = rowToDoc(table, row);

    let _id;
    try {
      _id = new mongoose.Types.ObjectId(row.$id);
    } catch (err) {
      console.warn(`  ! ${table.id}/${row.$id}: row ID is not a MongoDB ObjectId, skipping`);
      stats.failed += 1;
      continue;
    }

    const existing = await Model.findById(_id).lean();
    if (existing) {
      if (!confirm) { stats.updated += 1; continue; }
      try {
        // updateOne keeps fields the backup does not carry (password hashes on
        // User, for instance) exactly as they are.
        await Model.updateOne({ _id }, { $set: doc }, { timestamps: false });
        stats.updated += 1;
      } catch (err) {
        stats.failed += 1;
        console.warn(`  ! ${table.id}/${row.$id}: ${err.message}`);
      }
      continue;
    }

    if (modelName === 'User') {
      stats.passwordless += 1;
      // Random, unknown to anyone — the account can only be recovered through
      // the password-reset flow. Never leave a restored account with a
      // guessable or shared credential.
      doc.password = crypto.randomBytes(24).toString('hex');
    }

    if (!confirm) { stats.created += 1; continue; }
    try {
      await Model.create({ _id, ...doc });
      // Mongoose's timestamps plugin stamps createdAt/updatedAt with "now" on
      // create, which would silently reset every restored record's age — and
      // User.trialEndsAt() is derived from createdAt. Put the mirrored values
      // back.
      if (doc.createdAt || doc.updatedAt) {
        const timestamps = {};
        if (doc.createdAt) timestamps.createdAt = doc.createdAt;
        if (doc.updatedAt) timestamps.updatedAt = doc.updatedAt;
        await Model.updateOne({ _id }, { $set: timestamps }, { timestamps: false });
      }
      stats.created += 1;
    } catch (err) {
      stats.failed += 1;
      console.warn(`  ! ${table.id}/${row.$id}: ${err.message}`);
    }
  }

  return stats;
}

async function main() {
  if (!isAppwriteConfigured()) {
    console.error('APPWRITE_API_KEY is not set — nothing to restore from. See docs/APPWRITE_BACKUP.md.');
    process.exit(1);
  }

  const args = parseArgs(process.argv.slice(2));
  const unknown = args.models.filter((m) => !TABLES_BY_MODEL[m]);
  if (unknown.length > 0) {
    console.error(`Unknown model(s): ${unknown.join(', ')}. Known: ${MODEL_NAMES.join(', ')}`);
    process.exit(1);
  }

  const { projectId } = readConfig();
  console.log(`Restoring from Appwrite  project=${projectId}  database=${databaseId()}`);
  console.log(args.confirm
    ? '*** --confirm given: MongoDB WILL be written to ***\n'
    : 'Dry run — no writes. Re-run with --confirm to apply.\n');

  await connectDB();
  const tablesDB = getTablesDB();

  let totalPasswordless = 0;
  for (const modelName of args.models) {
    process.stdout.write(`  ${modelName}… `);
    const stats = await restoreModel(tablesDB, modelName, { confirm: args.confirm });
    totalPasswordless += stats.passwordless;
    console.log(
      `${stats.rows} row(s): ${stats.created} ${args.confirm ? 'created' : 'would create'}, ` +
      `${stats.updated} ${args.confirm ? 'updated' : 'would update'}, ${stats.failed} failed`
    );
  }

  if (totalPasswordless > 0) {
    console.log(
      `\n${totalPasswordless} user account(s) ${args.confirm ? 'were' : 'would be'} restored without a password hash ` +
      '(hashes are never mirrored). Those users must use "Forgot password" to sign in again.'
    );
  }
}

main()
  .catch((err) => {
    console.error('\nRestore failed:', err && err.message ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  });
