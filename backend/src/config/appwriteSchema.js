/**
 * Declarative schema for the Appwrite backup backend.
 *
 * One source of truth shared by:
 *   - scripts/provisionAppwrite.js  (creates the database, tables, columns, indexes)
 *   - utils/appwriteBackup.js       (mirrors Mongo writes into those tables)
 *   - scripts/syncToAppwrite.js     (bulk mirror) and restoreFromAppwrite.js (restore)
 *
 * Design notes
 * ------------
 * • Every column is optional (`required: false`). A backup store must accept a
 *   partial or slightly-stale record — it should never reject a mirror write
 *   because a field the primary considers optional happens to be missing.
 * • Nested/mixed Mongo fields (portfolio, courseProgress, paystackData…) are
 *   stored as JSON strings rather than modelled as relationships. The backup's
 *   job is faithful restore, not querying.
 * • Rows carry explicit `createdAt`/`updatedAt` copied from Mongo. Appwrite's
 *   own `$createdAt`/`$updatedAt` record when the *mirror* ran, which is a
 *   different (and also useful) thing.
 * • `publicRead` tables are readable by anonymous clients — that is what makes
 *   the read-only frontend failover work. Anything holding personal data is
 *   left with no permissions at all, so only a server API key can touch it.
 */

const TABLES = {
  // ── Public catalogue + published content (readable by the frontend fallback) ──
  catalog: {
    id: 'catalog',
    name: 'Catalog',
    publicRead: true,
    // Static catalogues (skills, opportunities, course summaries, tools vault)
    // that normally come from backend/src/data/*.js. Mirrored so the site still
    // renders its core content while the primary API is unreachable.
    columns: [
      { key: 'kind', type: 'string', size: 32 },
      { key: 'itemId', type: 'string', size: 191 },
      { key: 'position', type: 'integer' },
      { key: 'payload', type: 'string', size: 1000000 },
      { key: 'mirroredAt', type: 'datetime' },
    ],
    indexes: [
      { key: 'kind_position', type: 'key', columns: ['kind', 'position'], orders: ['ASC', 'ASC'] },
    ],
  },

  content: {
    id: 'content',
    name: 'Content',
    publicRead: true,
    // NOTE: only *published* content is mirrored. Drafts never leave the
    // primary, so anonymous read access on this table cannot leak them.
    model: 'Content',
    columns: [
      { key: 'title', type: 'string', size: 512 },
      { key: 'slug', type: 'string', size: 255 },
      { key: 'type', type: 'string', size: 16 },
      { key: 'status', type: 'string', size: 16 },
      { key: 'excerpt', type: 'string', size: 4000 },
      { key: 'body', type: 'string', size: 1000000 },
      { key: 'featuredImageUrl', type: 'string', size: 2000 },
      { key: 'publishedAt', type: 'datetime' },
      { key: 'createdAt', type: 'datetime' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'mirroredAt', type: 'datetime' },
    ],
    indexes: [
      { key: 'slug', type: 'key', columns: ['slug'] },
      { key: 'type_published', type: 'key', columns: ['type', 'publishedAt'], orders: ['ASC', 'DESC'] },
    ],
  },

  serviceUpdates: {
    id: 'service_updates',
    name: 'Service Updates',
    publicRead: true,
    model: 'ServiceUpdate',
    columns: [
      { key: 'message', type: 'string', size: 5000 },
      { key: 'createdAt', type: 'datetime' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'mirroredAt', type: 'datetime' },
    ],
    indexes: [
      { key: 'updatedAt', type: 'key', columns: ['updatedAt'], orders: ['DESC'] },
    ],
  },

  // ── Private tables: server API key only, never exposed to the browser ──
  users: {
    id: 'users',
    name: 'Users',
    publicRead: false,
    model: 'User',
    columns: [
      { key: 'name', type: 'string', size: 255 },
      { key: 'email', type: 'string', size: 320 },
      { key: 'phone', type: 'string', size: 64 },
      { key: 'track', type: 'string', size: 128 },
      { key: 'activeCourseId', type: 'string', size: 191 },
      { key: 'isPremium', type: 'boolean' },
      { key: 'premiumExpiresAt', type: 'datetime' },
      { key: 'trialExpiresAt', type: 'datetime' },
      { key: 'scholarship', type: 'string', size: 32 },
      { key: 'portfolio', type: 'string', size: 100000 },
      { key: 'courseProgress', type: 'string', size: 1000000 },
      { key: 'purchasedCourses', type: 'string', size: 200000 },
      { key: 'visitCount', type: 'integer' },
      { key: 'totalMinutes', type: 'integer' },
      { key: 'lastSeenAt', type: 'datetime' },
      { key: 'createdAt', type: 'datetime' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'mirroredAt', type: 'datetime' },
    ],
    indexes: [
      { key: 'email', type: 'key', columns: ['email'] },
      { key: 'updatedAt', type: 'key', columns: ['updatedAt'], orders: ['DESC'] },
    ],
  },

  applications: {
    id: 'applications',
    name: 'Applications',
    publicRead: false,
    model: 'Application',
    columns: [
      { key: 'user', type: 'string', size: 64 },
      { key: 'fullName', type: 'string', size: 255 },
      { key: 'email', type: 'string', size: 320 },
      { key: 'phone', type: 'string', size: 64 },
      { key: 'country', type: 'string', size: 128 },
      { key: 'track', type: 'string', size: 128 },
      { key: 'tier', type: 'string', size: 16 },
      { key: 'motivation', type: 'string', size: 20000 },
      { key: 'status', type: 'string', size: 32 },
      { key: 'scholarship', type: 'string', size: 32 },
      { key: 'createdAt', type: 'datetime' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'mirroredAt', type: 'datetime' },
    ],
    indexes: [
      { key: 'email', type: 'key', columns: ['email'] },
      { key: 'updatedAt', type: 'key', columns: ['updatedAt'], orders: ['DESC'] },
    ],
  },

  recruitmentApplications: {
    id: 'recruitment_applications',
    name: 'Recruitment Applications',
    publicRead: false,
    model: 'RecruitmentApplication',
    columns: [
      { key: 'applicant', type: 'string', size: 64 },
      { key: 'fullName', type: 'string', size: 255 },
      { key: 'email', type: 'string', size: 320 },
      { key: 'phone', type: 'string', size: 64 },
      { key: 'location', type: 'string', size: 255 },
      { key: 'educationLevel', type: 'string', size: 32 },
      { key: 'institution', type: 'string', size: 255 },
      { key: 'role', type: 'string', size: 64 },
      { key: 'skills', type: 'string', size: 10000 },
      { key: 'availability', type: 'string', size: 32 },
      { key: 'workPreference', type: 'string', size: 32 },
      { key: 'portfolioUrl', type: 'string', size: 2000 },
      { key: 'motivation', type: 'string', size: 20000 },
      { key: 'status', type: 'string', size: 32 },
      { key: 'adminNotes', type: 'string', size: 20000 },
      { key: 'consentAt', type: 'datetime' },
      { key: 'createdAt', type: 'datetime' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'mirroredAt', type: 'datetime' },
    ],
    indexes: [
      { key: 'email', type: 'key', columns: ['email'] },
      { key: 'status_updated', type: 'key', columns: ['status', 'updatedAt'], orders: ['ASC', 'DESC'] },
    ],
  },

  subscriptions: {
    id: 'subscriptions',
    name: 'Subscriptions',
    publicRead: false,
    model: 'Subscription',
    columns: [
      { key: 'user', type: 'string', size: 64 },
      { key: 'plan', type: 'string', size: 128 },
      { key: 'reference', type: 'string', size: 191 },
      { key: 'amount', type: 'float' },
      { key: 'currency', type: 'string', size: 8 },
      { key: 'status', type: 'string', size: 32 },
      { key: 'paystackData', type: 'string', size: 200000 },
      { key: 'createdAt', type: 'datetime' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'mirroredAt', type: 'datetime' },
    ],
    indexes: [
      { key: 'reference', type: 'key', columns: ['reference'] },
      { key: 'updatedAt', type: 'key', columns: ['updatedAt'], orders: ['DESC'] },
    ],
  },
};

// Catalog `kind` values, mirrored from backend/src/data/*.js.
const CATALOG_KINDS = {
  skills: 'skills',
  opportunities: 'opportunities',
  courses: 'courses',
  vault: 'vault',
};

/** Tables backed by a Mongoose model, keyed by model name. */
const TABLES_BY_MODEL = Object.values(TABLES).reduce((acc, table) => {
  if (table.model) acc[table.model] = table;
  return acc;
}, {});

module.exports = { TABLES, TABLES_BY_MODEL, CATALOG_KINDS };
