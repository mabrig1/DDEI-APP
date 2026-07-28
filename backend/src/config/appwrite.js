/**
 * Appwrite Cloud client — the backup backend.
 *
 * Project: "destiny-skills-bridge" (Frankfurt / `fra` region)
 * Console: https://cloud.appwrite.io/console/project-fra-6a686f78003e74fe1826
 *
 * The console path is `project-<region>-<projectId>`, so the region is `fra`
 * and the project ID is `6a686f78003e74fe1826` — Appwrite generated that ID;
 * "destiny-skills-bridge" is only the display name and is not accepted by the
 * API. Appwrite serves each region on its own host, hence the
 * `fra.cloud.appwrite.io` default endpoint.
 *
 * Everything here degrades to a no-op when APPWRITE_API_KEY is unset, so the
 * primary backend runs exactly as before on a machine with no Appwrite
 * credentials configured.
 */

const { Client, TablesDB, Query, Permission, Role, ID } = require('node-appwrite');

const DEFAULT_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const DEFAULT_PROJECT_ID = '6a686f78003e74fe1826';
const DEFAULT_DATABASE_ID = 'dsb-backup';

function readConfig() {
  return {
    endpoint: process.env.APPWRITE_ENDPOINT || DEFAULT_ENDPOINT,
    projectId: process.env.APPWRITE_PROJECT_ID || DEFAULT_PROJECT_ID,
    databaseId: process.env.APPWRITE_DATABASE_ID || DEFAULT_DATABASE_ID,
    apiKey: process.env.APPWRITE_API_KEY || '',
  };
}

/**
 * True when the backup backend has credentials. Without an API key there is no
 * way to write to Appwrite, so the mirror stays off rather than failing loudly
 * on every request.
 */
function isAppwriteConfigured() {
  return Boolean(readConfig().apiKey);
}

/**
 * Whether mirroring is switched on. Set APPWRITE_BACKUP_ENABLED=false to keep
 * the credentials in place (so scripts still run) while pausing live mirroring.
 */
function isBackupEnabled() {
  if (!isAppwriteConfigured()) return false;
  const flag = (process.env.APPWRITE_BACKUP_ENABLED || '').trim().toLowerCase();
  if (flag === 'false' || flag === '0' || flag === 'off') return false;
  return true;
}

let cached = null;

/** Lazily built TablesDB client. Returns null when Appwrite is not configured. */
function getTablesDB() {
  const config = readConfig();
  if (!config.apiKey) return null;

  const signature = `${config.endpoint}|${config.projectId}|${config.apiKey}`;
  if (cached && cached.signature === signature) return cached.tablesDB;

  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);

  cached = { signature, tablesDB: new TablesDB(client) };
  return cached.tablesDB;
}

/** The database ID every table lives in. */
function databaseId() {
  return readConfig().databaseId;
}

/**
 * Config safe to hand to a browser: no API key. The frontend fallback reads
 * public tables with only the project ID, which is a public identifier.
 */
function publicConfig() {
  const { endpoint, projectId, databaseId: dbId } = readConfig();
  return { endpoint, projectId, databaseId: dbId };
}

module.exports = {
  DEFAULT_ENDPOINT,
  DEFAULT_PROJECT_ID,
  DEFAULT_DATABASE_ID,
  readConfig,
  publicConfig,
  isAppwriteConfigured,
  isBackupEnabled,
  getTablesDB,
  databaseId,
  Query,
  Permission,
  Role,
  ID,
};
