# DDEI Dual Support Centre — Implementation Specification

## Goal
Provide learner-facing assistance and a private administrator support operations console for Destiny Skills Bridge.

## Learner experience
- Add accessible "Help & Support" navigation and contextual Help buttons on login, applications, courses, payments, portfolio and recruitment.
- Searchable FAQ and self-service guides, grouped by account, learning, payments, applications, opportunities, accessibility and privacy.
- Authenticated support tickets with category, subject, description, priority suggestion and optional sanitized attachment.
- Ticket timeline with status (open, awaiting_staff, awaiting_user, resolved, closed), staff replies, email alerts and satisfaction feedback.
- Guest contact intake with verification and anti-spam controls; no public ticket enumeration.
- Clear escalation route to a human. AI answers must identify themselves as automated, avoid guarantees about employment or income, and never claim a ticket was submitted unless persistence succeeds.

## Administrator experience
- Private /admin/support route with server-enforced admin role; never authorize by client-side email checks.
- Queue with filters, assignment, tags, internal notes, SLA indicators, response templates, saved searches and bulk triage.
- Ticket detail: full conversation, linked user/course/payment/application metadata only as needed, audit trail, escalation and resolution.
- Knowledge-base CRUD with draft/published states; dashboard showing volume, first-response time, resolution time, backlog and satisfaction.
- Export with explicit authorization, pagination and redaction; prevent CSV formula injection.

## Suggested MongoDB models
SupportTicket: ticketNumber, requesterId?, verifiedGuestEmail?, category, subject, description, status, priority, assigneeId?, tags[], createdAt, updatedAt, resolvedAt?, lastRequesterReplyAt?, lastStaffReplyAt?.
SupportMessage: ticketId, authorId?, authorRole, body, isInternal, createdAt, attachments[].
SupportArticle: slug, title, category, content, status, revision, updatedBy, updatedAt.
SupportAudit: actorId, ticketId, action, changedFields, timestamp, requestId.

## API contract
GET /api/support/articles (public published only)
POST /api/support/tickets (authenticated or verified guest)
GET /api/support/tickets (requester-owned only)
GET /api/support/tickets/:id (owner or support staff)
POST /api/support/tickets/:id/messages (owner or authorized staff)
GET /api/admin/support/tickets (staff/admin only)
PATCH /api/admin/support/tickets/:id (staff/admin only)
POST /api/admin/support/articles (admin only)
GET /api/admin/support/metrics (admin only)

## Security and privacy requirements
- JWT verification and object-level authorization on every ticket/message; distinguish staff and owner permissions.
- Validate and limit all inputs, enforce per-user and per-IP rate limits, escape output, sanitize rich text, scan and limit attachments, and prevent stored XSS.
- No payment card details, passwords, API secrets or identity documents in ticket bodies; redact logs and notification emails.
- Restrict CORS, use secure headers, CSRF protection where cookie auth is used, and integrate existing DevShield CI security gates.
- Make retention and deletion rules explicit; document Nigeria Data Protection Act obligations and user rights.
- Audit all admin reads of sensitive tickets and all changes. Keep internal notes invisible to requesters.
- Send notifications asynchronously with retries and idempotency; do not leak account existence.
- Fail closed if MongoDB is unavailable; do not silently use the public read-only Appwrite backup for ticket writes.

## Delivery plan
1. Inspect current auth, API routes, frontend navigation and admin permissions; write tests first.
2. Implement schema, validators, ownership middleware, service and API integration tests.
3. Implement accessible mobile-first user help centre and ticket timeline.
4. Implement protected admin console, notification worker and knowledge-base editor.
5. Run unit/integration/accessibility/security tests and DevShield; stage deployment, verify production environment variables and perform rollback rehearsal.
6. Open a PR, request review, and deploy only after required checks pass.

## Acceptance tests
- User A cannot list/read/reply to User B's tickets.
- A non-admin cannot access admin endpoints even by calling them directly.
- Internal notes never appear in requester responses or email.
- Rate limiting and attachment validation reject abuse.
- Ticket creation produces exactly one persisted ticket and a traceable ID.
- Notification failure does not lose a ticket.
- Staff actions create audit records.
- Mobile keyboard navigation and screen-reader labels work.
- Existing login, learning, Paystack, recruitment and DevShield workflows still pass.

This file is a design specification, not a claim that the support feature is already deployed.


## Password recovery (required for users and administrators)
- Add "Forgot password?" to sign-in and a clear recovery entry in Help & Support.
- POST /api/auth/password/forgot accepts an email and always returns the same generic response, whether or not the account exists. Rate-limit by IP and normalized account identifier.
- Generate a cryptographically random, single-use, short-lived reset token; store only a keyed hash of the token with expiry and redemption state. Email a HTTPS recovery link; never email a password or token to support staff.
- GET /reset-password validates the link without disclosing account details. POST /api/auth/password/reset validates the token, enforces a strong password policy, hashes the new password using the project's approved password hashing library, atomically consumes the token and invalidates other outstanding tokens and active sessions.
- Require reauthentication after reset. Send a security notification after successful reset without including secrets.
- Provide a safe path for expired links, unavailable email and account takeover concerns. Support agents may guide users but must never see, choose or manually send passwords.
- Admin password recovery follows the same secure flow plus MFA verification/re-enrollment safeguards; require step-up verification for privileged accounts and audit recovery-related actions.
- Ensure no reset token, password or personal data appears in logs, analytics, URL referrers or third-party scripts on the reset page.
- Test valid, invalid, reused and expired tokens; email enumeration resistance; rate limits; concurrent redemption; session revocation; CSRF protection where applicable; and admin recovery.
- Before implementing, inspect existing auth provider and reuse its native reset-password flow where supported rather than building a competing mechanism.
