# DDEI administrator email recovery

## Production entry points

- Login: https://ddei.online/admin
- Email recovery: https://ddei.online/admin-recovery
- Backend: https://api.ddei.online

The administrator account is separate from learner authentication. Enter the
owner-configured recovery email, open the newest email, and choose a unique
password of at least 12 characters (maximum 72 UTF-8 bytes). On successful
recovery the configured recovery email becomes the administrator username.
Ownership is recorded as verified only after a valid emailed token is consumed.
Normal login is required afterward; recovery does not automatically sign in.

## Backend configuration

Required existing settings: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_PASSWORD_HASH`
(for an environment-only account), `RESEND_API_KEY`, and `ADMIN_RECOVERY_EMAIL`.
`ADMIN_USERNAME` remains supported until recovery migrates the username.

Optional settings:
- `RESEND_FROM_EMAIL`: a sender on a domain verified in Resend. Default is
  `Destiny Skills Bridge <onboarding@resend.dev>`. Resend's sandbox sender can
  only deliver to addresses permitted by that Resend account; API acceptance
  alone is not proof of inbox delivery.
- `ADMIN_RECOVERY_ORIGIN`: trusted HTTPS frontend origin; defaults to
  `https://ddei.online`. Never comes from a request header or user input.

No `ADMIN_RECOVERY_TOKEN_HASH` is needed for email recovery. The legacy `/recover`
endpoint is for bootstrap only and refuses to overwrite existing credentials.
After email recovery, the database password overrides `ADMIN_PASSWORD_HASH`.
Do not delete the administrator record to restore an old environment password.

## Security behavior

256-bit random tokens are stored only as SHA-256 hashes. Links expire after
30 minutes. An atomic conditional MongoDB update verifies expiry and consumes
one token, preventing replay and concurrent double-use. Requesting another link
replaces the previous link, subject to a 60-second account cooldown. Persistent
MongoDB per-IP rate limits apply to login, email requests, reset, and bootstrap
independently. Database failures deny access. Credential changes require the
current password and rotate the session version. All pre-reset admin JWTs are
rejected following recovery; learner JWTs cannot authenticate to admin routes.

The recovery page uses no external scripts or referral tracking. Tokens travel
in the URL fragment and are removed from browser history on arrival. Responses
are not cached and referrers are disabled. Passwords and tokens are never logged
by the recovery code or returned in public responses. Provider failures produce
an actionable error and invalidate that issuance. A failed change-notification
email does not undo a completed reset.

## Verification and release

Run `npm ci`, `npm test`, and `npm audit` from `backend`, then
`node frontend/build.js` from the repository root. Integration tests launch a
throwaway MongoDB with `mongodb-memory-server`; they mock only Resend, never
production credentials or production MongoDB. GitHub Actions must pass before
merge. Deploy both Vercel projects from the verified commit and confirm aliases:
`ddei-app` -> `ddei.online`, `ddei-app-backend` -> `api.ddei.online`.

After release request one recovery email for the owner. The owner completes the
private emailed link and password selection. Do not retrieve the owner's token
from their inbox or choose their permanent password. Confirm mailbox receipt
and a successful owner login before calling end-to-end production recovery
complete. Check Resend delivery events for delivery/bounce details if needed.

See OWASP Forgot Password Cheat Sheet:
https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
