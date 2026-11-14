# DDEI — instant paid access and customer support architecture

## What changed

DDEI remains a static HTML frontend + Express API on Vercel + MongoDB system,
with Paystack as the payment authority, Resend as an optional email provider,
and a **read-only** public Appwrite failover for catalog content. This change
modularizes entitlement decisions and introduces a private MongoDB support inbox.
It does not migrate the platform or modify production services.

### Secure payment and fulfillment

1. The learner signs in before purchasing Premium, a course or a certificate.
   Sponsorship/donation checkout can remain anonymous.
2. `POST /api/payments/initialize` validates the **server-side** price/plan,
   binds the payment to the JWT user ID and canonical account email, then
   obtains Paystack checkout URL. Client-supplied price/access flags are ignored.
3. Paystack posts `charge.success` to `POST /api/payments/webhook`; the API
   validates the HMAC over the raw body. Alternatively, the learner returns to
   the site with a reference and the server calls Paystack verify.
4. Settlement checks the reference, amount in kobo, currency, provider status
   and, if present, payer email against the stored payment.
5. Once confirmed, the server atomically grants a course in `purchasedCourses`
   or a Premium entitlement. `benefitsAppliedAt` is a durable marker distinct
   from payment `status=success`: a webhook redelivery or user-initiated
   verification can retry a failed delivery **without administrator approval**.
   Premium expiry uses gateway payment time, so repeating the same event cannot
   repeatedly extend the plan. Benefits are never decided in the browser.
6. If Resend is configured, a receipt/access notification is attempted after
   fulfillment. Email failure does **not** roll back access.
7. The learner returns to the dashboard and sees refreshed entitlements.

**Important:** This does not promise fully automated recurring subscription
renewal or refunds; each successful Paystack transaction represented here grants
its purchased plan. Existing anonymous/legacy paid transactions cannot safely
be attached to accounts based on an unverified email match; they require
protected account ownership reconciliation through support. Never grant access
from a screenshot, email claim or arbitrary Paystack reference alone.

### Customer support architecture

- Public chatbot: deterministic FAQ and troubleshooting, not a payment authority.
- Learner self-service: `GET /api/payments/mine` and owner-gated
  `GET /api/payments/verify/:reference` (rechecks Paystack).
- Private learner tickets: `POST/GET /api/help/tickets`, with
  `POST /api/help/tickets/:id/reply`.
- Admin inbox: `GET /api/admin/support/tickets`, reply and status endpoints,
  all gated with `requireAdmin`. Only owning learners may reply to their tickets.
- Optional Resend notifications: new ticket alert to `ADMIN_NOTIFY_EMAIL`
  and learner email for admin replies. Full ticket details never enter the public
  Appwrite mirror. Never include passwords, OTPs, or card details.

### Configuration and production release

Required existing: `MONGODB_URI`, `JWT_SECRET`, `PAYSTACK_SECRET_KEY`,
Paystack webhook URL pointing to the backend
`https://<backend-host>/api/payments/webhook`.
Optional: `RESEND_API_KEY`, a verified `RESEND_FROM_EMAIL`,
`ADMIN_NOTIFY_EMAIL`. Set production `CLIENT_ORIGIN`, `FRONTEND_URL`,
and `API_BASE_URL` correctly.

Do **not** merge/deploy just because these files exist. Release checklist:

- [ ] Install backend dependencies and run `npm test`.
- [ ] Run frontend build `node build.js`; test browser JavaScript and mobile support form.
- [ ] In Paystack **test mode**, simulate paid course, Premium, certificate and
      sponsor flows; verify webhook signature rejection for invalid requests.
- [ ] Verify exact purchased course or Premium is accessible immediately on
      Paystack callback, even while application status remains `pending`.
- [ ] Replay the same webhook and verify no duplicate course access or extra
      Premium extension; simulate access delivery failure and retry.
- [ ] Attempt to verify another learner's reference; expect 403.
- [ ] Test successful legacy anonymous payment: do not auto-assign by email.
- [ ] Confirm tickets cannot be read or replied to by another learner.
- [ ] Confirm an unprivileged user cannot load the support admin inbox.
- [ ] Test ticket notification delivery using a **verified** Resend sender,
      or verify support still works with Resend disabled.
- [ ] Run staging browser checks and confirm Vercel preview / API host readiness;
      no changes to live payment keys or production webhook until approved.

Rollback: revert this PR, leaving MongoDB subscription history and existing
course entitlements intact. Extra `benefitsAppliedAt` and ticket documents can
remain without affecting older binaries. Do not force-remove successful paid
entitlements during rollback.
