/**
 * Bulk / incremental sync from the primary MongoDB into the Appwrite backup.
 *
 * The per-write mirror hooks handle the common case. This module is the safety
 * net that keeps the backup honest:
 *   • the initial seed, before any mirroring has happened
 *   • catching up after an Appwrite outage (the mirror's circuit breaker drops
 *     writes on purpose while Appwrite is down)
 *   • writes the hooks cannot see, such as bulk `updateMany` or direct driver
 *     access
 *
 * Used both by `npm run appwrite:sync` and by the periodic sync in server.js.
 */

const mongoose = require('mongoose');
const { TABLES_BY_MODEL } = require('../config/appwriteSchema');
const { mirrorDocNow, mirrorCatalog, recordSync } = require('./appwriteBackup');

const MODEL_NAMES = Object.keys(TABLES_BY_MODEL);

/**
 * @param {object}  [options]
 * @param {string[]}[options.models]         Model names to sync. Defaults to all mirrored models.
 * @param {Date}    [options.since]          Only sync documents updated after this instant.
 * @param {boolean} [options.includeCatalog] Also refresh the static catalog tables. Default true.
 * @param {number}  [options.batchSize]      Documents read per batch. Default 200.
 * @param {function}[options.onProgress]     Called as (modelName, done, total).
 */
async function runSync(options = {}) {
  const {
    models = MODEL_NAMES,
    since = null,
    includeCatalog = true,
    batchSize = 200,
    onProgress = null,
  } = options;

  const startedAt = Date.now();
  const summary = { models: {}, catalog: null, errors: [] };

  for (const modelName of models) {
    if (!TABLES_BY_MODEL[modelName]) {
      summary.errors.push(`unknown model "${modelName}"`);
      continue;
    }

    // Look the model up rather than calling mongoose.model(), which throws a
    // MissingSchemaError if the model file was never required. A background
    // sync should record that and carry on with the models it does have.
    const Model = mongoose.models[modelName];
    if (!Model) {
      summary.errors.push(`model "${modelName}" is not registered with Mongoose — skipped`);
      continue;
    }
    const filter = since ? { updatedAt: { $gt: since } } : {};
    const total = await Model.countDocuments(filter);
    let synced = 0;
    let skipped = 0;
    let failed = 0;

    // Sort by _id so paging stays stable even as documents are updated mid-run.
    let cursor = null;
    for (;;) {
      const pageFilter = cursor ? { ...filter, _id: { $gt: cursor } } : filter;
      const batch = await Model.find(pageFilter).sort({ _id: 1 }).limit(batchSize);
      if (batch.length === 0) break;

      for (const doc of batch) {
        try {
          const written = await mirrorDocNow(modelName, doc, { force: true });
          if (written) synced += 1;
          else skipped += 1;
        } catch (err) {
          failed += 1;
          summary.errors.push(`${modelName}/${doc._id}: ${err && err.message ? err.message : err}`);
        }
      }

      cursor = batch[batch.length - 1]._id;
      if (onProgress) onProgress(modelName, synced + skipped + failed, total);
      if (batch.length < batchSize) break;
    }

    summary.models[modelName] = { total, synced, skipped, failed };
  }

  if (includeCatalog) {
    summary.catalog = await mirrorCatalog({ force: true });
  }

  summary.durationMs = Date.now() - startedAt;
  summary.since = since ? since.toISOString() : null;
  recordSync(summary);
  return summary;
}

module.exports = { runSync, MODEL_NAMES };
