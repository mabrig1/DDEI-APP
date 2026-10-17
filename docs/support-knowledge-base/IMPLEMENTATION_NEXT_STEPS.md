# Support Centre implementation gate

Before writing production code, identify the actual frontend framework, repository root, authentication provider, database, email service and deployment configuration. Do not assume Next.js or create disconnected routes. Verify whether the application is in a subdirectory.

## Stage 1 — Identity
- Confirm the existing auth provider and registered account ownership for victoryonline1@gmail.com.
- Assign the administrator role server-side only after identity verification, with MFA and an audit record.
- Use provider-native password recovery where supported; test one-time token expiry and session revocation.

## Stage 2 — Knowledge base
- Convert draft articles.json into a searchable public Help Centre with category navigation, accessibility, and clear draft/published filtering.
- Never display draft articles or internal notes publicly.
- Provide a restricted article editor and publishing audit trail.

## Stage 3 — Support tickets
- Add authenticated ticket creation, ownership checks, safe status transitions, staff inbox and notifications.
- Add automated tests for cross-user access, admin authorization and data leakage.

## Stage 4 — Release
- Run DevShield and existing tests; stage a preview; verify recovery email and admin access; obtain review before merging.

Current state: documentation and draft content only; no live functionality has been activated.
