# Destiny Skills Bridge

**Global Skills. Dollar Opportunities. African Futures.**

Destiny Skills Bridge bridges the gap between African youth and global economic opportunity. The platform teaches in-demand digital skills, builds an AI-powered international portfolio, and matches graduates to freelance gigs and remote jobs that pay in dollars.

## Project Structure

```
ddei-app/
├── frontend/
│   ├── index.html          # Single-file Tailwind (CDN) frontend — landing page, auth, application form,
│   │                        # AI Advisor chat, Premium/Paystack upgrade, Portfolio Builder, Opportunity Matching
│   └── dsb-backup.js       # Read-only failover to the Appwrite backup backend
├── backend/
│   ├── src/
│   │   ├── config/db.js            # MongoDB connection
│   │   ├── config/appwrite*.js     # Appwrite backup backend client & schema
│   │   ├── models/                 # User, Application, Subscription (Mongoose)
│   │   ├── controllers/             # Route handlers (auth, applications, advisor, payments, skills, portfolio)
│   │   ├── routes/                  # Express routers mounted under /api/*
│   │   ├── middleware/              # JWT auth (required/optional), error handling
│   │   ├── data/                    # Static skill tracks & sample opportunities
│   │   ├── utils/advisorEngine.js   # Simulated AI Advisor reply logic
│   │   ├── utils/courseCoachAgent.js # Tool-using, lesson-grounded course coach
│   │   └── server.js                # App entrypoint
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features

- **Authentication** — JWT-based register/login with bcrypt password hashing
- **Skills Selection** — Tier 1 (Fast Start) and Tier 2 (High Growth) tracks with NGN & USD earning potential
- **Application/Onboarding** — apply to a skill track / cohort
- **AI Advisor Chat** — simulated, context-aware career and skills guidance
- **Agentic Learning Lab** — contextual lesson Q&A, simple explanations, practical examples,
  retrieval practice, progress-aware study plans and teach-back feedback. It uses OpenRouter's
  free-model router when configured and keeps a deterministic no-cost fallback.
- **Interactive learning tools** — saved lesson notes, browser read-aloud and spaced-review cards
  with increasing review intervals
- **Work With Us recruitment portal** — “Earn While You Learn” opportunity tracks, secure applicant
  intake, duplicate protection, admin review notes/status pipeline and email notifications
- **Payments** — Paystack integration for Premium subscriptions (monthly/yearly)
- **Premium features** — AI-powered Portfolio Builder, Opportunity Matching (sample global gigs & remote jobs)
- **Appwrite backup backend** — MongoDB is continuously mirrored to Appwrite Cloud, and the public site
  falls back to that mirror (read-only) if the primary API goes down. See [docs/APPWRITE_BACKUP.md](docs/APPWRITE_BACKUP.md)

## Running locally

### Backend

```bash
cd backend
npm install
cp .env.example .env   # set MONGODB_URI, JWT_SECRET, PAYSTACK_SECRET_KEY
npm run dev             # starts on http://localhost:5000
```

To enable generative Course Coach responses, set `OPENROUTER_API_KEY` and optionally
`OPENROUTER_MODEL` (defaults to `openrouter/free`). The course tools continue to work without a key.

Optional — enable the Appwrite backup backend (set `APPWRITE_API_KEY` in `.env` first):

```bash
npm run appwrite:provision   # create the backup database, tables and indexes
npm run appwrite:sync        # seed it from MongoDB
```

### Frontend

`frontend/index.html` is a static file — open it directly in a browser, or serve it with any static file server. It talks to the backend via `API_BASE_URL` (defaults to `http://localhost:5000`; override by setting `window.DSB_API_BASE_URL` before the script runs, e.g. in a `<script>` tag for production deployments).

The build (`node build.js`) also bakes in the Appwrite failover config and copies `dsb-backup.js` into `dist/`,
so a deployed frontend can still serve public content when the backend is unreachable.

See `backend/README.md` for the full API reference,
[docs/DEPLOY_BACKEND_VERCEL.md](docs/DEPLOY_BACKEND_VERCEL.md) for running the API on Vercel,
and [docs/APPWRITE_BACKUP.md](docs/APPWRITE_BACKUP.md) for the backup backend.
