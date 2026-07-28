/**
 * Mirrors primary-backend writes into the Appwrite backup backend.
 *
 * Everything in here is best-effort and non-blocking: the primary request path
 * must never slow down or fail because the backup is unreachable. Failures are
 * counted, logged sparingly, and surfaced through `backupStatus()` (exposed on
 * GET /api/health) so an outage of the backup is visible rather than silent.
 */

const crypto = require('crypto');
const {
  isBackupEnabled,
  isAppwriteConfigured,
  getTablesDB,
  databaseId,
  publicConfig,
} = require('../config/appwrite');
const { TABLES, TABLES_BY_MODEL, CATALOG_KINDS } = require('../config/appwriteSchema');

// ── Queue ────────────────────────────────────────────────────────────────────
// Mirror writes are fire-and-forget, so without a bound a burst of traffic
// could open hundreds of concurrent sockets to Appwrite. Cap in-flight work and
// drop the oldest pending jobs if the queue ever runs away — losing a mirror
// write is recoverable (the periodic sync catches it up); exhausting the
// process is not.
const MAX_IN_FLIGHT = Number(process.env.APPWRITE_MIRROR_CONCURRENCY) || 4;
const MAX_QUEUED = Number(process.env.APPWRITE_MIRROR_QUEUE_LIMIT) || 500;

const queue = [];
let inFlight = 0;
let droppedJobs = 0;

function pump() {
  while (inFlight < MAX_IN_FLIGHT && queue.length > 0) {
    const job = queue.shift();
    inFlight += 1;
    job()
      .catch(() => {})
      .finally(() => {
        inFlight -= 1;
        pump();
      });
  }
}

function enqueue(job) {
  if (queue.length >= MAX_QUEUED) {
    queue.shift();
    droppedJobs += 1;
    if (droppedJobs === 1 || droppedJobs % 100 === 0) {
      console.warn(`Appwrite backup: mirror queue full, dropped ${droppedJobs} job(s). The periodic sync will catch these up.`);
    }
  }
  queue.push(job);
  pump();
}

// ── Circuit breaker ──────────────────────────────────────────────────────────
// When Appwrite is down, every mirror attempt costs a full network timeout.
// After a run of consecutive failures, stop trying for a cool-off window.
const FAILURE_THRESHOLD = 5;
const COOLDOWN_MS = 60 * 1000;

const state = {
  consecutiveFailures: 0,
  openUntil: 0,
  writes: 0,
  failures: 0,
  lastSuccessAt: null,
  lastFailureAt: null,
  lastError: null,
  lastSyncAt: null,
  lastSyncSummary: null,
};

function circuitOpen() {
  return Date.now() < state.openUntil;
}

function recordSuccess() {
  state.consecutiveFailures = 0;
  state.openUntil = 0;
  state.writes += 1;
  state.lastSuccessAt = new Date().toISOString();
}

function recordFailure(err, context) {
  state.consecutiveFailures += 1;
  state.failures += 1;
  state.lastFailureAt = new Date().toISOString();
  state.lastError = `${context}: ${err && err.message ? err.message : String(err)}`;

  if (state.consecutiveFailures === FAILURE_THRESHOLD) {
    state.openUntil = Date.now() + COOLDOWN_MS;
    console.warn(
      `Appwrite backup: ${FAILURE_THRESHOLD} consecutive failures — pausing mirror for ${COOLDOWN_MS / 1000}s. Last error: ${state.lastError}`
    );
  } else if (state.consecutiveFailures < FAILURE_THRESHOLD) {
    console.warn(`Appwrite backup: mirror write failed (${state.lastError})`);
  }
}

// ── Serialization ────────────────────────────────────────────────────────────

function toPlain(doc) {
  if (!doc) return null;
  if (typeof doc.toObject === 'function') return doc.toObject({ depopulate: true });
  return doc;
}

function coerce(column, raw) {
  if (raw === undefined || raw === null) return null;

  switch (column.type) {
    case 'boolean':
      return Boolean(raw);
    case 'integer': {
      const n = Number(raw);
      return Number.isFinite(n) ? Math.round(n) : null;
    }
    case 'float': {
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    }
    case 'datetime': {
      const d = raw instanceof Date ? raw : new Date(raw);
      return Number.isNaN(d.getTime()) ? null : d.toISOString();
    }
    case 'string':
    default: {
      const text = typeof raw === 'string' ? raw : JSON.stringify(raw);
      if (text === undefined) return null;
      // Appwrite rejects values longer than the column size. Truncating keeps
      // the rest of the record recoverable instead of losing the whole row.
      return text.length > column.size ? text.slice(0, column.size) : text;
    }
  }
}

/** Build an Appwrite row payload from a Mongo document, per the table schema. */
function buildRow(table, source) {
  const plain = toPlain(source) || {};
  const row = {};
  for (const column of table.columns) {
    if (column.key === 'mirroredAt') {
      row.mirroredAt = new Date().toISOString();
      continue;
    }
    let raw = plain[column.key];
    // ObjectId references (Application.user, Subscription.user) mirror as their
    // hex string so a restore can re-link them.
    if (raw && typeof raw === 'object' && typeof raw.toHexString === 'function') {
      raw = raw.toHexString();
    }
    row[column.key] = coerce(column, raw);
  }
  return row;
}

/**
 * Fields that must never leave the primary database: password hashes and
 * password-reset tokens. They are simply absent from the `users` table schema,
 * and this guard makes that intent explicit and hard to undo by accident.
 */
const NEVER_MIRROR = ['password', 'resetPasswordToken', 'resetPasswordExpires'];

function stripSecrets(plain) {
  const copy = { ...plain };
  for (const field of NEVER_MIRROR) delete copy[field];
  return copy;
}

function rowId(value) {
  if (value === undefined || value === null) return null;
  const id = typeof value === 'string' ? value : String(value);
  // Mongo ObjectId hex strings are already valid Appwrite IDs. Anything else
  // gets sanitised into the allowed character set (a-z A-Z 0-9 . - _, max 36,
  // no leading special char).
  if (/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/.test(id)) return id;
  return `id_${crypto.createHash('sha1').update(id).digest('hex').slice(0, 30)}`;
}

/** Stable, readable, collision-safe row ID for a catalog item. */
function catalogRowId(kind, itemId) {
  const hash = crypto.createHash('sha1').update(`${kind}:${itemId}`).digest('hex').slice(0, 8);
  const slug = String(itemId).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 22);
  return `${kind.slice(0, 4)}_${slug || 'item'}_${hash}`;
}

// ── Core write helpers ───────────────────────────────────────────────────────

async function upsertRow(table, id, data) {
  const tablesDB = getTablesDB();
  if (!tablesDB) return false;
  await tablesDB.upsertRow({ databaseId: databaseId(), tableId: table.id, rowId: id, data });
  return true;
}

async function deleteRow(table, id) {
  const tablesDB = getTablesDB();
  if (!tablesDB) return false;
  try {
    await tablesDB.deleteRow({ databaseId: databaseId(), tableId: table.id, rowId: id });
  } catch (err) {
    // Already gone is the desired end state, not a failure.
    if (err && err.code === 404) return true;
    throw err;
  }
  return true;
}

/**
 * Mirror one document, awaiting the result. Used by the bulk sync scripts,
 * which want to know whether the write landed. Request-path callers should use
 * the fire-and-forget `mirrorDoc` instead.
 */
async function mirrorDocNow(modelName, doc, { force = false } = {}) {
  const table = TABLES_BY_MODEL[modelName];
  if (!table || !doc) return false;
  if (!force && !isBackupEnabled()) return false;
  if (!force && !isAppwriteConfigured()) return false;

  const plain = stripSecrets(toPlain(doc) || {});
  const id = rowId(plain._id);
  if (!id) return false;

  // Drafts are never mirrored — the `content` table is publicly readable so the
  // failover frontend can serve it, and unpublished work must not be in there.
  if (table.id === TABLES.content.id && plain.status !== 'published') {
    return deleteRow(table, id).then(() => false);
  }

  await upsertRow(table, id, buildRow(table, plain));
  return true;
}

/** Fire-and-forget mirror of a single document. Never throws, never blocks. */
function mirrorDoc(modelName, doc) {
  if (!isBackupEnabled() || !doc) return;
  const table = TABLES_BY_MODEL[modelName];
  if (!table) return;
  if (circuitOpen()) return;

  // Snapshot now: the caller may keep mutating the document after we return.
  const snapshot = stripSecrets(toPlain(doc) || {});

  enqueue(async () => {
    if (circuitOpen()) return;
    try {
      await mirrorDocNow(modelName, snapshot);
      recordSuccess();
    } catch (err) {
      recordFailure(err, `${modelName} mirror`);
    }
  });
}

/** Fire-and-forget removal of a mirrored document. */
function mirrorDelete(modelName, id) {
  if (!isBackupEnabled()) return;
  const table = TABLES_BY_MODEL[modelName];
  if (!table) return;
  const resolved = rowId(id);
  if (!resolved) return;
  if (circuitOpen()) return;

  enqueue(async () => {
    if (circuitOpen()) return;
    try {
      await deleteRow(table, resolved);
      recordSuccess();
    } catch (err) {
      recordFailure(err, `${modelName} delete`);
    }
  });
}

// ── Static catalog mirroring ─────────────────────────────────────────────────

/**
 * Mirror the static catalogues the public site needs to render: skill tracks,
 * sample opportunities, course summaries and the tools-vault categories. These
 * live in backend/src/data/*.js, so without this the failover frontend would
 * have nothing to show even though the data never changes.
 */
async function mirrorCatalog({ force = false } = {}) {
  if (!force && !isBackupEnabled()) return { skipped: true };

  const { SKILLS } = require('../data/skills');
  const { OPPORTUNITIES } = require('../data/opportunities');
  const { COURSES } = require('../data/courses');
  const { VAULT_CATEGORIES, VAULT_TOOL_COUNT } = require('../data/videoToolsVault');

  const courseSummaries = COURSES.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    skillIds: course.skillIds,
    category: course.category,
    estimatedHours: course.estimatedHours,
    moduleCount: course.modules.length,
    lessonCount: course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0),
    isCertified: course.isCertified || false,
    price: course.price || null,
    earlyBirdPrice: course.earlyBirdPrice || null,
    specialCourse: course.specialCourse || false,
    paidOnly: course.paidOnly || false,
    durationDays: course.durationDays || null,
    purchasePlan: course.purchasePlan || null,
  }));

  const groups = [
    [CATALOG_KINDS.skills, SKILLS, (item) => item.id],
    [CATALOG_KINDS.opportunities, OPPORTUNITIES, (item) => item.id],
    [CATALOG_KINDS.courses, courseSummaries, (item) => item.id],
    // The vault is served as one payload (viewer-agnostic parts only); access
    // control stays with the primary — the mirror is for rendering, and the
    // fallback surfaces it only to sessions the primary already authorised.
    [CATALOG_KINDS.vault, [{ id: 'categories', toolCount: VAULT_TOOL_COUNT, categories: VAULT_CATEGORIES }], (item) => item.id],
  ];

  const table = TABLES.catalog;
  const summary = {};
  let written = 0;
  let failed = 0;

  for (const [kind, items, idOf] of groups) {
    let index = 0;
    for (const item of items) {
      const itemId = String(idOf(item) || index);
      const data = buildRow(table, {
        kind,
        itemId,
        position: index,
        payload: JSON.stringify(item),
      });
      try {
        await upsertRow(table, catalogRowId(kind, itemId), data);
        written += 1;
        recordSuccess();
      } catch (err) {
        failed += 1;
        recordFailure(err, `catalog ${kind}/${itemId}`);
      }
      index += 1;
    }
    summary[kind] = items.length;
  }

  return { skipped: false, written, failed, counts: summary };
}

// ── Status ───────────────────────────────────────────────────────────────────

function recordSync(summary) {
  state.lastSyncAt = new Date().toISOString();
  state.lastSyncSummary = summary;
}

/** Snapshot of backup health, safe to expose on a health endpoint. */
function backupStatus() {
  const { endpoint, projectId, databaseId: dbId } = publicConfig();
  return {
    provider: 'appwrite',
    configured: isAppwriteConfigured(),
    enabled: isBackupEnabled(),
    endpoint,
    projectId,
    databaseId: dbId,
    degraded: circuitOpen(),
    queued: queue.length,
    inFlight,
    droppedJobs,
    writes: state.writes,
    failures: state.failures,
    lastSuccessAt: state.lastSuccessAt,
    lastFailureAt: state.lastFailureAt,
    lastError: state.lastError,
    lastSyncAt: state.lastSyncAt,
    lastSyncSummary: state.lastSyncSummary,
  };
}

/** Resolves once the mirror queue has drained — used by scripts before exit. */
async function flushMirrorQueue(timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while ((queue.length > 0 || inFlight > 0) && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return queue.length === 0 && inFlight === 0;
}

module.exports = {
  mirrorDoc,
  mirrorDocNow,
  mirrorDelete,
  mirrorCatalog,
  backupStatus,
  recordSync,
  flushMirrorQueue,
  buildRow,
  rowId,
  catalogRowId,
  stripSecrets,
};
