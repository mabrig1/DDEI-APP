#!/usr/bin/env node
/**
 * Provisions the Appwrite backup backend: database, tables, columns, indexes.
 *
 *   npm run appwrite:provision
 *
 * Idempotent — safe to re-run after adding a field to the schema. Existing
 * resources are left alone; only what's missing gets created.
 *
 * Requires APPWRITE_API_KEY with these scopes:
 *   databases.read, databases.write, tables.read, tables.write,
 *   collections.read, collections.write, documents.read, documents.write
 */

require('dotenv').config();

const {
  getTablesDB,
  databaseId,
  readConfig,
  isAppwriteConfigured,
  Permission,
  Role,
} = require('../config/appwrite');
const { TABLES } = require('../config/appwriteSchema');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isNotFound(err) {
  return err && (err.code === 404 || err.type === 'database_not_found' || err.type === 'table_not_found' || err.type === 'collection_not_found');
}

async function ensureDatabase(tablesDB, dbId) {
  try {
    await tablesDB.get({ databaseId: dbId });
    console.log(`✓ database "${dbId}" already exists`);
  } catch (err) {
    if (!isNotFound(err)) throw err;
    await tablesDB.create({ databaseId: dbId, name: 'Destiny Skills Bridge Backup' });
    console.log(`+ created database "${dbId}"`);
  }
}

async function ensureTable(tablesDB, dbId, table) {
  // Public tables are world-readable so the browser fallback can serve them
  // with only the (public) project ID. Everything else gets no permissions at
  // all, which means server API key access only.
  const permissions = table.publicRead ? [Permission.read(Role.any())] : [];

  try {
    await tablesDB.getTable({ databaseId: dbId, tableId: table.id });
    console.log(`✓ table "${table.id}" already exists`);
  } catch (err) {
    if (!isNotFound(err)) throw err;
    await tablesDB.createTable({
      databaseId: dbId,
      tableId: table.id,
      name: table.name,
      permissions,
      rowSecurity: false,
    });
    console.log(`+ created table "${table.id}"${table.publicRead ? ' (public read)' : ' (private)'}`);
  }
}

async function ensureColumns(tablesDB, dbId, table) {
  const existing = await tablesDB.listColumns({ databaseId: dbId, tableId: table.id });
  const present = new Set((existing.columns || []).map((c) => c.key));

  for (const column of table.columns) {
    if (present.has(column.key)) continue;

    const base = { databaseId: dbId, tableId: table.id, key: column.key, required: false };
    switch (column.type) {
      case 'boolean':
        await tablesDB.createBooleanColumn(base);
        break;
      case 'integer':
        await tablesDB.createIntegerColumn(base);
        break;
      case 'float':
        await tablesDB.createFloatColumn(base);
        break;
      case 'datetime':
        await tablesDB.createDatetimeColumn(base);
        break;
      case 'string':
      default:
        await tablesDB.createStringColumn({ ...base, size: column.size });
        break;
    }
    console.log(`  + ${table.id}.${column.key} (${column.type})`);
    // Appwrite processes column creation asynchronously and rate-limits the
    // console API; a short pause keeps large schemas from tripping either.
    await sleep(250);
  }
}

/**
 * Indexes can only be built on columns that finished processing. Poll until
 * every indexed column reports "available".
 */
async function waitForColumns(tablesDB, dbId, table, keys, timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { columns = [] } = await tablesDB.listColumns({ databaseId: dbId, tableId: table.id });
    const byKey = new Map(columns.map((c) => [c.key, c]));
    const pending = keys.filter((key) => {
      const col = byKey.get(key);
      return !col || col.status !== 'available';
    });
    if (pending.length === 0) return true;
    await sleep(1000);
  }
  return false;
}

async function ensureIndexes(tablesDB, dbId, table) {
  if (!table.indexes || table.indexes.length === 0) return;

  const existing = await tablesDB.listIndexes({ databaseId: dbId, tableId: table.id });
  const present = new Set((existing.indexes || []).map((i) => i.key));
  const wanted = table.indexes.filter((index) => !present.has(index.key));
  if (wanted.length === 0) return;

  const needed = [...new Set(wanted.flatMap((index) => index.columns))];
  const ready = await waitForColumns(tablesDB, dbId, table, needed);
  if (!ready) {
    console.warn(`  ! columns on "${table.id}" still processing — skipping indexes; re-run this script to finish them`);
    return;
  }

  for (const index of wanted) {
    await tablesDB.createIndex({
      databaseId: dbId,
      tableId: table.id,
      key: index.key,
      type: index.type,
      columns: index.columns,
      orders: index.orders,
    });
    console.log(`  + index ${table.id}.${index.key} (${index.columns.join(', ')})`);
    await sleep(250);
  }
}

async function main() {
  if (!isAppwriteConfigured()) {
    console.error('APPWRITE_API_KEY is not set — nothing to provision. See docs/APPWRITE_BACKUP.md.');
    process.exit(1);
  }

  const { endpoint, projectId } = readConfig();
  const dbId = databaseId();
  const tablesDB = getTablesDB();

  console.log(`Provisioning Appwrite backup backend`);
  console.log(`  endpoint: ${endpoint}`);
  console.log(`  project:  ${projectId}`);
  console.log(`  database: ${dbId}\n`);

  await ensureDatabase(tablesDB, dbId);

  for (const table of Object.values(TABLES)) {
    await ensureTable(tablesDB, dbId, table);
    await ensureColumns(tablesDB, dbId, table);
  }

  // Indexes last, so every column has had time to finish processing.
  for (const table of Object.values(TABLES)) {
    await ensureIndexes(tablesDB, dbId, table);
  }

  console.log('\nDone. Next: npm run appwrite:sync');
}

main().catch((err) => {
  console.error('\nProvisioning failed:', err && err.message ? err.message : err);
  if (err && err.response) console.error(err.response);
  process.exit(1);
});
