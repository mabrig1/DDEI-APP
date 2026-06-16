# Destiny Skills Bridge — Backend

Node.js + Express + MongoDB API powering the Destiny Skills Bridge platform: authentication, skill tracks, applications, interactive skills courses, the AI Advisor, the Portfolio Builder, and Paystack premium subscriptions.

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

## API Reference

### Auth
- `POST /api/auth/register` — `{ name, email, password, track? }` → `{ token, user }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `GET /api/auth/me` — requires `Authorization: Bearer <token>` → `{ user }`

### Skills & Opportunities
- `GET /api/skills` — list Tier 1 / Tier 2 skill tracks with NGN & USD earning potential
- `GET /api/opportunities?skillId=<id>` — sample global gigs/remote jobs, optionally filtered by skill

### Applications
- `POST /api/applications` — `{ fullName, email, phone, country, track, tier, motivation }` (auth optional)
- `GET /api/applications/me` — requires auth, lists the current user's applications

### Skills Interactive Courses
- `GET /api/courses` — list course summaries (id, title, description, category, estimatedHours, moduleCount, lessonCount)
- `GET /api/courses/:id` — full course content (modules, lessons, quiz questions — answer keys stripped); auth optional, returns saved `progress` if logged in
- `GET /api/courses/:id/progress` — requires auth, returns the user's saved progress for a course
- `POST /api/courses/:id/lessons/:lessonId/complete` — `{ completed }` (auth optional; persisted only if authenticated)
- `POST /api/courses/:id/lessons/:lessonId/quiz` — `{ answers: number[] }` → `{ score, total, passed, results }` (server-side grading; auth optional, attempt persisted only if authenticated)

### AI Advisor
- `POST /api/advisor/chat` — `{ message, history? }` → `{ reply }` (simulated, keyword/context-aware advisor)

### Portfolio Builder (Premium)
- `POST /api/portfolio/generate` — `{ name, trackId, highlights? }` → `{ portfolio }` (saved to user profile if authenticated)

### Payments (Paystack)
- `POST /api/payments/initialize` — `{ plan: "premium-monthly" | "premium-yearly", email, callbackUrl? }` → `{ authorizationUrl, reference }`
- `GET /api/payments/verify/:reference` — verifies the transaction and activates premium on success
