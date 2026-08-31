# Destiny Skills Bridge — Backend

Node.js + Express + MongoDB API powering the Destiny Skills Bridge platform: authentication, skill tracks, applications, Work With Us recruitment, interactive skills courses, the AI Advisor, the Portfolio Builder, and Paystack premium subscriptions.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, PAYSTACK_SECRET_KEY
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `PAYSTACK_SECRET_KEY` | Paystack secret key (server-side) |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key (used by the frontend) |
| `CLIENT_ORIGIN` | Allowed CORS origin for the frontend |
| `OPENROUTER_API_KEY` | Optional key for generative Course Coach responses; omit to use the built-in fallback |
| `OPENROUTER_MODEL` | Course Coach model or router (default `openrouter/free`) |
| `APPWRITE_ENDPOINT` | Appwrite backup backend API endpoint (default `https://fra.cloud.appwrite.io/v1`) |
| `APPWRITE_PROJECT_ID` | Appwrite project ID (default `6a686f78003e74fe1826`) |
| `APPWRITE_DATABASE_ID` | Appwrite database ID (default `dsb-backup`) |
| `APPWRITE_API_KEY` | Appwrite server API key — **leave empty to disable the backup backend** |
| `APPWRITE_BACKUP_ENABLED` | Set `false` to pause mirroring while keeping credentials configured |
| `APPWRITE_SYNC_INTERVAL_MINUTES` | Background reconciliation interval (default 15, `0` disables) |

## API Reference

### Auth
- `POST /api/auth/register` — `{ name, email, password, track? }` → `{ token, user }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `POST /api/auth/forgot-password` — `{ email }` → `{ message }`; if the email matches an account, emails a reset link (`FRONTEND_URL` + `?resetToken=...`). Always returns the same response so the endpoint can't be used to discover registered emails.
- `POST /api/auth/reset-password` — `{ token, password }` → `{ token, user }`; the reset token expires after 1 hour and is single-use.
- `GET /api/auth/me` — requires `Authorization: Bearer <token>` → `{ user }`

### Skills & Opportunities
- `GET /api/skills` — list Tier 1 / Tier 2 skill tracks with NGN & USD earning potential
- `GET /api/opportunities?skillId=<id>` — sample global gigs/remote jobs, optionally filtered by skill

### Applications
- `POST /api/applications` — `{ fullName, email, phone, country, track, tier, motivation }` (auth optional)
- `GET /api/applications/me` — requires auth, lists the current user's applications

### Work With Us Recruitment
- `POST /api/recruitment` — submit a validated recruitment application; authentication optional and limited to five submissions per hour
- `GET /api/recruitment/me` — requires auth, lists recruitment applications linked to the current user
- `GET /api/admin/recruitment-applications` — requires admin auth, lists candidates
- `PATCH /api/admin/recruitment-applications/:id` — requires admin auth, updates candidate status or private review notes

### Skills Interactive Courses
- `GET /api/courses` — list course summaries (id, title, description, category, estimatedHours, moduleCount, lessonCount)
- `GET /api/courses/:id` — full course content (modules, lessons, quiz questions — answer keys stripped); requires active access and returns saved progress
- `GET /api/courses/:id/progress` — requires auth, returns the user's saved progress for a course
- `POST /api/courses/:id/lessons/:lessonId/complete` — `{ completed }`; requires active access and persists progress
- `POST /api/courses/:id/lessons/:lessonId/quiz` — `{ answers: number[] }` → `{ score, total, passed, results }`; requires active access and grades server-side
- `POST /api/courses/:id/coach` — `{ lessonId, action, question? }` → lesson-grounded coaching; requires active access and is limited to 30 requests per 15 minutes

### AI Advisor
- `POST /api/advisor/chat` — `{ message, history? }` → `{ reply }` (simulated, keyword/context-aware advisor)

### Portfolio Builder (Premium)
- `POST /api/portfolio/generate` — `{ name, trackId, highlights? }` → `{ portfolio }` (saved to user profile if authenticated)

### Payments (Paystack)
- `POST /api/payments/initialize` — `{ plan: "premium-monthly" | "premium-yearly", email, callbackUrl? }` → `{ authorizationUrl, reference }`
- `GET /api/payments/verify/:reference` — verifies the transaction and activates premium on success

### Health & backup backend
- `GET /api/health` — `{ status, service, backup }`, where `backup` reports the Appwrite mirror's state
  (`configured`, `enabled`, `degraded`, queue depth, write/failure counts, last error, last sync)
- `GET /api/config/backup` — public Appwrite config the frontend failover uses (never includes the API key)

See [../docs/APPWRITE_BACKUP.md](../docs/APPWRITE_BACKUP.md) for setup, the `appwrite:provision` /
`appwrite:sync` / `appwrite:restore` scripts, and the security model.

## Deployment

**Deploying to Vercel as serverless functions?** See
[../docs/DEPLOY_BACKEND_VERCEL.md](../docs/DEPLOY_BACKEND_VERCEL.md) — the steps below
describe a long-running host (a VM or container).

1. Provision a managed MongoDB instance (e.g. MongoDB Atlas) and grab its connection string for `MONGODB_URI`.
2. On your host (Render, Railway, Fly.io, etc.), set the environment variables below — do not reuse the placeholder values from `.env.example`:
   - `NODE_ENV=production`
   - `MONGODB_URI` — your Atlas connection string
   - `JWT_SECRET` — a long random value, e.g. `openssl rand -hex 32`
   - `JWT_EXPIRES_IN=7d`
   - `CLIENT_ORIGIN` — your deployed frontend's origin (locks down CORS instead of the `*` default)
   - `PAYSTACK_SECRET_KEY` — your **live** `sk_live_...` key
   - Leave `PORT` unset on platforms that inject their own port
3. Deploy with `npm install && npm start`.
4. Point the frontend's `window.DSB_API_BASE_URL` (see `frontend/index.html`) at this service's public URL.
5. Optionally enable the Appwrite backup backend: set `APPWRITE_API_KEY` (plus the other `APPWRITE_*`
   variables if you aren't using the defaults), then run `npm run appwrite:provision` and
   `npm run appwrite:sync` once. See [../docs/APPWRITE_BACKUP.md](../docs/APPWRITE_BACKUP.md).
