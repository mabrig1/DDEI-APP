# Appwrite backup backend

Destiny Skills Bridge runs on Express + MongoDB. Appwrite Cloud is configured as
a **backup backend** behind it — a second copy of the platform's data, and a
read-only failover that keeps the public site alive when the primary API is
down.

| | |
|---|---|
| Console | https://cloud.appwrite.io/console/project-fra-6a686f78003e74fe1826 |
| Region | Frankfurt (`fra`) |
| Project name | destiny-skills-bridge |
| Project ID | `6a686f78003e74fe1826` (Appwrite-generated — the display name is not a valid ID) |
| API endpoint | `https://fra.cloud.appwrite.io/v1` |
| Database ID | `dsb-backup` (default, override with `APPWRITE_DATABASE_ID`) |

The console path is `project-<region>-<projectId>`, which is where the region
and project ID above come from. Appwrite serves each region on its own host, so
the endpoint is `fra.cloud.appwrite.io`, not the generic `cloud.appwrite.io`.

## What it does

**1. Continuous mirror (write path).** Every write to `User`, `Application`,
`Subscription`, `Content` and `ServiceUpdate` is copied into Appwrite. Mirroring
is wired into the Mongoose schemas (`src/utils/appwriteMirrorHooks.js`), so it
covers every controller — current and future — without any controller knowing
about it.

Mirror writes are **fire-and-forget**: they are queued, bounded, and dropped
rather than allowed to slow down a user request. A circuit breaker pauses them
for 60s after five consecutive failures so an Appwrite outage doesn't cost a
network timeout per write.

**2. Periodic reconciliation.** Every 15 minutes (`APPWRITE_SYNC_INTERVAL_MINUTES`)
the server re-syncs anything with a newer `updatedAt` than the last successful
pass. This is what makes the backup eventually consistent despite the mirror
being best-effort — it catches writes dropped during an outage, and bulk updates
the schema hooks can't see.

**3. Read-only frontend failover.** `frontend/dsb-backup.js` sits behind
`apiRequest()` on the public pages. When the primary API is unreachable or
returns 5xx, supported GETs are served straight from Appwrite and a banner tells
the visitor they're looking at a saved copy:

| Endpoint | Served from |
|---|---|
| `GET /api/skills` | `catalog` table, `kind=skills` |
| `GET /api/opportunities[?skillId=]` | `catalog` table, `kind=opportunities` |
| `GET /api/courses` | `catalog` table, `kind=courses` |
| `GET /api/content[?type=]` | `content` table (published only) |
| `GET /api/content/:slug` | `content` table (published only) |
| `GET /api/service-update` | `service_updates` table |

Everything else — login, signup, applications, payments, the AI advisor, course
progress, certificates, the tools vault — still requires the primary and surfaces
the real error. The failover keeps the site *browsable*; it is not a second copy
of the application.

**4. Disaster recovery.** `npm run appwrite:restore` reads the mirror back into
MongoDB.

## Security model

- **The API key never reaches the browser.** Only the endpoint, project ID and
  database ID are baked into the frontend, and those are public identifiers.
- **Three tables are world-readable** (`catalog`, `content`, `service_updates`)
  because the browser fallback reads them with just the project ID.
  `users`, `applications` and `subscriptions` are created with *no* permissions
  at all — reachable only with a server API key.
- **Password hashes and reset tokens are never mirrored.** They are absent from
  the `users` table schema and stripped again in `stripSecrets()` before any
  write. A restored account that didn't already exist in MongoDB gets a random
  unusable password and must use "Forgot password".
- **Drafts never leave the primary.** Only `status: 'published'` content is
  mirrored, and unpublishing actively deletes the mirrored row — so the publicly
  readable `content` table cannot leak unreleased work.

## Setup

### 1. Register the web platform

Console → **Overview → Connect your platform → Web** (or **Settings → Platforms →
Add platform → Web**). Add a hostname entry for every origin the site is served
from:

```
ddei.online
www.ddei.online
*.vercel.app        # Vercel preview deployments
localhost           # local development
```

**This step is required for the browser failover.** Appwrite checks the request's
`Origin` against the registered platforms and rejects browser calls from anywhere
else — so without it, `dsb-backup.js` gets a CORS/platform error and the site
shows its normal "can't reach the backend" state instead of the mirror.

The server-side mirror does *not* need this: it authenticates with an API key,
not an origin.

### 2. Create an API key

In the Appwrite console → **Overview → Integrations → API keys → Create API key**.
Scopes required:

```
databases.read   databases.write
tables.read      tables.write
collections.read collections.write
documents.read   documents.write
```

### 3. Configure the backend

In `backend/.env`:

```bash
APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=6a686f78003e74fe1826
APPWRITE_DATABASE_ID=dsb-backup
APPWRITE_API_KEY=<the key you just created>
APPWRITE_BACKUP_ENABLED=true
APPWRITE_SYNC_INTERVAL_MINUTES=15
```

Leaving `APPWRITE_API_KEY` empty disables the backup entirely — the app runs
exactly as it did before, with no Appwrite calls and no startup cost.

### 4. Provision the database

```bash
cd backend
npm install
npm run appwrite:provision
```

Creates the database, six tables, their columns, indexes and permissions. It's
idempotent: re-run it after adding a field to `src/config/appwriteSchema.js` and
only the missing pieces get created.

### 5. Seed the mirror

```bash
npm run appwrite:sync
```

Copies all existing MongoDB data plus the static catalogs into Appwrite. From
then on the live mirror and the periodic sync keep it current.

### 6. Build the frontend with failover on

`frontend/build.js` bakes the public Appwrite config into each page:

```bash
cd frontend
API_BASE_URL=https://api.yourdomain.com node build.js
```

The Appwrite values default to the project above; override with
`APPWRITE_ENDPOINT` / `APPWRITE_PROJECT_ID` / `APPWRITE_DATABASE_ID`, or set
`APPWRITE_BACKUP_ENABLED=false` at build time to ship with failover switched
off. On Vercel these are project environment variables — the build command is
already `node build.js`.

## Running it from GitHub (no local machine needed)

`.github/workflows/appwrite-backup.yml` runs every one of the scripts below on a
GitHub runner, so none of this requires a development environment.

1. **Repo → Settings → Secrets and variables → Actions → Secrets**, add:
   - `MONGODB_URI`
   - `APPWRITE_API_KEY`

   Optionally add `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID` or
   `APPWRITE_DATABASE_ID` under **Variables** to override the built-in defaults.

2. **If MongoDB is on Atlas**, set Network Access to allow `0.0.0.0/0`. GitHub's
   runners have no fixed IP to allowlist, so a restricted list blocks them.

3. **Actions → "Appwrite backup" → Run workflow.** Pick `provision` the first
   time, then `sync`.

> The **Run workflow** button only appears once the workflow file exists on the
> repository's **default branch** — that's a GitHub rule, not a config option.
> Merge the branch carrying this file before expecting to see it.

Available actions: `provision`, `sync` (with an optional `since` like `24h`),
`sync-catalog-only`, `restore-dry-run`, and `restore-apply` — which overwrites
MongoDB and refuses to run unless you type `RESTORE` in the confirm field.

A daily `sync` also runs at 02:00 UTC. That matters most when the primary API is
offline: the server's own 15-minute reconciler stops with it, and this becomes
the only thing keeping the mirror current. Delete the `schedule:` block to
disable it.

## Operations

```bash
# Full mirror of MongoDB + catalogs
npm run appwrite:sync

# Only the static catalogs (no MongoDB connection needed)
npm run appwrite:sync -- --catalog-only

# Catch up after an outage
npm run appwrite:sync -- --since=24h

# One model only
npm run appwrite:sync -- --models=Content

# Restore Appwrite -> MongoDB. Dry run by default.
npm run appwrite:restore
npm run appwrite:restore -- --confirm
npm run appwrite:restore -- --models=Content --confirm
```

### Health

`GET /api/health` reports backup state:

```json
{
  "status": "ok",
  "backup": {
    "configured": true, "enabled": true, "degraded": false,
    "endpoint": "https://fra.cloud.appwrite.io/v1",
    "projectId": "6a686f78003e74fe1826", "databaseId": "dsb-backup",
    "queued": 0, "writes": 1284, "failures": 0,
    "lastSuccessAt": "2026-07-28T09:11:04.220Z",
    "lastError": null, "lastSyncAt": "2026-07-28T09:05:00.001Z"
  }
}
```

`degraded: true` means the circuit breaker is open — Appwrite is failing and
mirror writes are being skipped. `failures` climbing with `lastError` set is the
signal to check the Appwrite console. Recovery is automatic; the next periodic
sync backfills what was dropped.

`GET /api/config/backup` returns the same public config the frontend uses.

### Testing the failover

Point a built frontend at a dead API and load the site:

```bash
cd frontend
API_BASE_URL=http://127.0.0.1:9 node build.js
npx serve dist
```

Skills, courses, opportunities, blog posts and footer pages should still render,
with the amber banner at the bottom of the page. Logging in should still fail
with a normal error.

## Schema

`backend/src/config/appwriteSchema.js` is the single source of truth, shared by
the provisioner, the mirror and the restore path.

| Table | Public read | Contents |
|---|---|---|
| `catalog` | yes | skills, opportunities, course summaries, tools-vault categories |
| `content` | yes | published pages & posts |
| `service_updates` | yes | the site-wide notice banner |
| `users` | no | accounts, minus password hashes and reset tokens |
| `applications` | no | cohort applications |
| `subscriptions` | no | Paystack subscription records |

Every column is optional by design — a backup must accept a partial record
rather than reject it. Nested Mongo fields (`portfolio`, `courseProgress`,
`purchasedCourses`, `paystackData`) are stored as JSON strings; values longer
than their column are truncated so one oversized field can't lose a whole row.

To add a field: add the column to the schema, run `npm run appwrite:provision`,
then `npm run appwrite:sync` to backfill it.
