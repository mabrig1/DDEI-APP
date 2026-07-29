# Deploying the backend to Vercel

The API runs as a Vercel serverless function, alongside the frontend that
already lives there. This replaces Railway.

Nothing about the code changed for this — `npm start` still runs the same
long-running server locally or on any VM host. The app was simply split so both
can share it:

| File | Role |
|---|---|
| `backend/src/app.js` | The Express app: routes and middleware, no server |
| `backend/src/server.js` | Long-running entrypoint — connects, then listens |
| `backend/api/index.js` | Vercel entrypoint — connects, then hands off to the app |
| `backend/vercel.json` | Routes every path to that function |

## Create the project

The frontend and backend are **two separate Vercel projects** from the same
repository. Keeping them apart means a backend deploy can't break the working
site.

1. Vercel dashboard → **Add New → Project** → import `mabrig1/DDEI-APP`.
2. **Root Directory: `backend`.** This is the setting that matters — click Edit
   next to Root Directory and select the `backend` folder.
3. Framework Preset: **Other**. Leave the build and output settings empty;
   `vercel.json` handles routing and Vercel installs dependencies itself.
4. Add the environment variables below *before* the first deploy, so it comes up
   configured.
5. Deploy. You'll get a URL like `ddei-app-backend.vercel.app` — that's the API
   base URL the frontend needs.

Check it with `https://<your-backend-url>/api/health`. A JSON response with
`"status":"ok"` means the function and the database connection are both fine.

## Environment variables

Project → **Settings → Environment Variables**. Apply each to Production,
Preview and Development unless noted.

| Variable | Value |
|---|---|
| `MONGODB_URI` | Your Atlas connection string |
| `JWT_SECRET` | Long random value — `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | `7d` |
| `CLIENT_ORIGIN` | `https://ddei.online,https://www.ddei.online` |
| `PAYSTACK_SECRET_KEY` | Your live `sk_live_...` key |
| `ADMIN_USERNAME` | Admin dashboard login |
| `ADMIN_PASSWORD_HASH` | bcrypt hash — never the plaintext password |
| `APPWRITE_API_KEY` | Appwrite server API key (optional; enables the mirror) |
| `OPENROUTER_API_KEY` | Optional; powers the AI Advisor, Help Assistant and Portfolio Builder — see [OPENROUTER_AI.md](OPENROUTER_AI.md) |
| `OPENROUTER_MODEL` | Optional; `openrouter/free` for zero cost |
| `RESEND_API_KEY`, `ADMIN_NOTIFY_EMAIL` | Optional, for email notifications |

Do **not** set `PORT` — Vercel doesn't use it.

`CLIENT_ORIGIN` takes a comma-separated list. Include every hostname the site
answers on: leaving out `www` is the usual cause of "works on one URL, CORS
error on the other". Leaving it unset allows all origins, which is fine for a
first deploy but should be tightened once the URLs are settled.

**Atlas network access:** Vercel functions have no fixed IP, so Atlas must allow
`0.0.0.0/0` under Network Access. The connection is still protected by the
credentials in `MONGODB_URI`.

## Point the frontend at it

In the **frontend** Vercel project → Settings → Environment Variables:

```
API_BASE_URL = https://<your-backend-url>
```

Then redeploy the frontend. `build.js` bakes that value into each page at build
time, so it only takes effect on a new deployment.

## What changes on serverless

**Cold starts.** An idle function takes a second or two on the first request
while it boots and connects. Subsequent requests reuse the warm instance.

**Connection pooling matters.** `src/config/db.js` caches the connection promise
on `globalThis`, so concurrent invocations share one connection instead of each
opening its own — without that, Atlas's connection limit is reached quickly. The
pool is also capped smaller on Vercel, since many instances each hold one.

**The Appwrite mirror gets less reliable, by design.** Two things that a
long-running server provides simply don't exist here:

- the 15-minute reconciler needs a persistent process, so it never starts;
- fire-and-forget mirror writes may not finish, because the function can freeze
  as soon as it responds.

This is covered: the **GitHub Actions workflow syncs every 6 hours**
(`.github/workflows/appwrite-backup.yml`), which is what actually keeps the
backup current now. See [APPWRITE_BACKUP.md](APPWRITE_BACKUP.md).

**Request timeout.** `vercel.json` sets `maxDuration: 30`; the app's own
"took too long" guard fires at 20s on Vercel so it returns a readable JSON error
before the platform cuts the invocation off. If your plan rejects a 30s
duration, lower it — and lower `RESPONSE_TIMEOUT_MS` to stay under it.

## A note on the Hobby plan

Vercel's free Hobby plan is documented as being for non-commercial use, and this
site takes Paystack payments. That's a real risk of a third shutdown after
Railway and Render, not a hypothetical one. If the site is earning, a paid plan
removes the exposure. The failover in `frontend/dsb-backup.js` keeps the public
site readable if the API does go down, but sign-in and payments need the API.
