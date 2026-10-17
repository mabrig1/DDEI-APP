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
