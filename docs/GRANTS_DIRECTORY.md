# Digital Skills Grants Directory

A Premium directory of funding open to Nigerians: paid AI fellowships, fully-funded
government training, cloud and AI credits for developers, and seed capital for
founders. Lives at `/grants.html`, served by `GET /api/grants`, and searchable by
the AI Advisor through the `search_grants` tool.

## The rule this feature is built around

**Nothing in the dataset states a fact that was not checked.**

This is money and deadlines. Someone will rearrange their week around what this
page says, and a wrong closing date costs them the opportunity outright. So every
listing in `backend/src/data/grants.js` carries its own provenance:

| Field | Meaning |
|---|---|
| `verified: true` | The headline facts — deadline, value, who can apply — were checked against the programme's own site or reporting on `verifiedOn`. |
| `verified: false` | The programme is real, but at least one detail is unconfirmed. `caveat` says exactly which, and the UI shows it in an amber box. |
| `verifiedOn` | When it was last checked. Shown on every card. |

Two invariants are enforced by `backend/tests/grants.test.js`, not by discipline:

- an unverified entry **must** carry a substantive `caveat`;
- a hard `deadline` may **only** appear on a verified entry. Everything else
  explains its timing in words instead.

Where a figure could not be confirmed, the copy says so rather than guessing. An
invented deadline is worse than no deadline.

## Re-verifying

Grant rounds open and close constantly, so this ages. Every quarter:

1. Open each `url` and re-check the deadline, the value and the eligibility.
2. Update `DIRECTORY_VERIFIED_ON` and each entry's `verifiedOn`.
3. Flip `verified` and rewrite `caveat` wherever the facts changed.
4. Run `npm test` — it will fail if any entry states a deadline it hasn't earned.

The UI shows the check date and tells the learner to confirm on the official page,
so a stale entry degrades into "check this yourself" rather than into a lie.

## What Premium actually buys

Free accounts see: name, provider, category, value, **and the deadline state**.
Premium adds: eligibility rules, what you get, verification caveats, location,
effort, contact, and the application link.

The deadline is deliberately outside the paywall. What is being sold here is
curation and verification, not the existence of a public grant — and a learner
missing a ₦50,000/month fellowship because they hadn't paid ₦2,000 is not a trade
this platform should make. `backend/tests/grants.test.js` asserts that a locked
response still carries every deadline.

The same split applies to the AI Advisor: `search_grants` returns names and
deadlines to any caller, and eligibility plus apply links only when
`context.premium` is true.

## Data model

```js
{
  id, name, provider,
  category,     // stipend | training | credits | capital | institutional
  levels,       // beginner | intermediate | expert | founder
  value,        // headline, in words — never a bare number
  summary, whatYouGet, eligibility,
  deadline,     // ISO yyyy-mm-dd, verified entries only
  deadlineNote, // required when there is no hard deadline
  url,          // official page, https, checked
  verified, verifiedOn, caveat,
  status,       // open (default) | closed | watch
  location, effort, contact, startsOn, tags,
}
```

`deadlineState()` classifies at request time — `closing-soon` (≤7 days), `open`,
`rolling`, `closed` — because a hardcoded "closing soon" is wrong the moment it
is written. `daysUntil()` **floors**: the 29th to the 31st is two days, and
rounding up would hand a learner a day that does not exist.

Results sort by urgency, so whatever closes soonest leads.

## Granting a learner access

`backend/src/scripts/grantAccess.js`, run either locally or — with no terminal —
from **Actions → "Grant access" → Run workflow**.

| Level | Unlocks |
|---|---|
| `full` | Full scholarship + permanent Premium. Everything: Premium features, every course including the paid Special Editions, the Tools Vault, the Grants Directory, no trial expiry. |
| `premium` | Permanent Premium only — Grants Directory, AI Advisor, Portfolio Builder. Not the paid Special Editions or the Vault. |
| `limited` | Limited scholarship — standard courses free, no Premium extras. |
| `none` | Revoke back to a plain trial account. |
| `show` | Report current access, change nothing. |

```bash
cd backend
npm run grant-access -- --email you@example.com --level full
npm run grant-access -- --email you@example.com --show
```

The GitHub workflow needs the `MONGODB_URI` secret (Settings → Secrets and
variables → Actions), and Atlas must allow `0.0.0.0/0` under Network Access since
GitHub runners have no fixed IP.

An unknown email fails loudly rather than silently creating an account — a typo
would otherwise leave an orphan with full access. Pass `--create` (or tick
**create_if_missing**) when the account genuinely doesn't exist yet; it prints a
temporary password to change immediately.

**There is deliberately no HTTP endpoint for this.** Granting permanent access
should require database credentials, not a session cookie.

## Scam guard

The page tells learners plainly: no legitimate grant charges an application fee,
processing fee, or asks for bank details up front. Every listing applies through
the organisation's own site. Grant-adjacent fraud is common and specifically
targets people in exactly this position.
