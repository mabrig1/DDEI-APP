# DDEI Support Administrator Identity

Designated administrator login email: `victoryonline1@gmail.com`.

This is a requested username, **not** proof of account ownership or a grant of administrator permissions. Before activation, verify email ownership using the existing authentication provider and assign the admin role only through a trusted server-side owner-controlled process. Do not hardcode an email allowlist in frontend code, do not automatically elevate anyone who registers with this address, and do not commit passwords or recovery tokens. Require MFA for the administrator and audit privileged access. Preserve existing legitimate admin accounts unless the owner explicitly authorizes a migration.

The support dashboard should display the signed-in admin identity and check authorization on every admin API request.
