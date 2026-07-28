/**
 * Periodic reconciliation with the Appwrite backup backend.
 *
 * The per-write mirror hooks are best-effort by design — they drop writes while
 * Appwrite is unreachable rather than holding up user requests. This scheduler
 * is what makes the backup eventually consistent anyway: on boot it refreshes
 * the static catalogs and syncs recent changes, then it re-syncs anything
 * updated since the last successful pass.
 */

const { isBackupEnabled, isAppwriteConfigured } = require('../config/appwrite');
const { runSync } = require('./appwriteSync');

const DEFAULT_INTERVAL_MINUTES = 15;
// First pass after a restart looks a little further back than one interval, so
// writes lost during the downtime are picked up.
const BOOT_LOOKBACK_MS = 60 * 60 * 1000;

let timer = null;
let running = false;
let lastSuccessfulSyncAt = null;

function intervalMs() {
  const raw = process.env.APPWRITE_SYNC_INTERVAL_MINUTES;
  const minutes = raw === undefined || raw === '' ? DEFAULT_INTERVAL_MINUTES : Number(raw);
  if (!Number.isFinite(minutes) || minutes <= 0) return 0;
  return minutes * 60 * 1000;
}

async function syncOnce({ includeCatalog }) {
  if (running) return null;
  running = true;
  const since = lastSuccessfulSyncAt || new Date(Date.now() - BOOT_LOOKBACK_MS);
  try {
    const summary = await runSync({ since, includeCatalog });
    // Rewind slightly so a document written during the sync isn't missed by the
    // next pass's `updatedAt >` filter.
    lastSuccessfulSyncAt = new Date(Date.now() - 60 * 1000);
    const totals = Object.values(summary.models).reduce((sum, s) => sum + s.synced, 0);
    if (totals > 0 || summary.errors.length > 0) {
      console.log(`Appwrite backup: synced ${totals} document(s), ${summary.errors.length} error(s)`);
    }
    return summary;
  } catch (err) {
    console.warn('Appwrite backup: periodic sync failed —', err && err.message ? err.message : err);
    return null;
  } finally {
    running = false;
  }
}

/**
 * Starts the background sync. No-op when Appwrite is unconfigured or disabled,
 * or when APPWRITE_SYNC_INTERVAL_MINUTES is 0.
 */
function startAppwriteSync() {
  if (timer) return;
  if (!isAppwriteConfigured()) {
    console.log('Appwrite backup: not configured (APPWRITE_API_KEY unset) — running without a backup backend.');
    return;
  }
  if (!isBackupEnabled()) {
    console.log('Appwrite backup: disabled via APPWRITE_BACKUP_ENABLED.');
    return;
  }

  const period = intervalMs();
  if (period === 0) {
    console.log('Appwrite backup: live mirroring on, periodic sync disabled (APPWRITE_SYNC_INTERVAL_MINUTES=0).');
    return;
  }

  console.log(`Appwrite backup: live mirroring on, reconciling every ${period / 60000} minute(s).`);

  // Refresh the static catalogs on boot so a freshly deployed backup can serve
  // the public site immediately.
  syncOnce({ includeCatalog: true }).catch(() => {});

  timer = setInterval(() => {
    syncOnce({ includeCatalog: false }).catch(() => {});
  }, period);
  // Never hold the process open just for a backup sync.
  if (typeof timer.unref === 'function') timer.unref();
}

function stopAppwriteSync() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

module.exports = { startAppwriteSync, stopAppwriteSync, syncOnce };
