# Security deployment checklist

## Required before production

1. Deploy all three migrations in `supabase/migrations` (including `202608160003_data_retention.sql`).
2. Deploy `admin-api`, `contact-submit`, and the disabled `bootstrap-admin` function.
3. Set Edge Function secrets:
   - `ADMIN_USER_ID`: immutable Supabase Auth UUID of the administrator.
   - `ALLOWED_ORIGINS`: comma-separated origins, for example `https://phucthanhholding.com,https://www.phucthanhholding.com`.
   - `CONTACT_RATE_SALT`: at least 32 random bytes; do not expose it to Vite.
4. Remove the legacy `ADMIN_EMAIL` secret after `ADMIN_USER_ID` is verified.
5. Reset the administrator password, revoke all existing sessions, and enable MFA in Supabase Auth.
6. Disable public user sign-ups in Supabase Auth unless another product explicitly needs them.
7. Confirm the hosting provider applies `public/_headers`. Configure the equivalent headers at the proxy/CDN if it does not.
8. Configure retention and deletion for `contact_submissions` and `admin_audit_log`.

## Verification

- An anonymous client can select published content but cannot write it.
- Anonymous and normal authenticated clients cannot read orders, contact submissions, or audit logs.
- Only the configured `ADMIN_USER_ID` can invoke admin list/stats/write actions.
- `bootstrap-admin` always returns HTTP 410.
- Requests from an origin outside `ALLOWED_ORIGINS` receive HTTP 403.
- Six contact submissions from one IP within an hour result in HTTP 429 on the sixth request.

Never commit `.env`, service-role keys, `CONTACT_RATE_SALT`, or admin credentials.
