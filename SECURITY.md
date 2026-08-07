# Security setup

The public API surface is:

- `GET /api/team` for the team page;
- `GET /api/projects` for the project carousel;
- `GET /api/insights` for published insights;
- `POST /api/contact` for contact submissions.

The contact API includes:

- same-origin request checks;
- a hidden honeypot field named `website`;
- D1-backed rate limiting at five requests per IP hash per hour;
- strict input length and email validation;
- optional Cloudflare Turnstile verification;
- no-store responses and no raw IP storage.

## Cloudflare setup

1. Create a D1 database for the Pages project and bind it as `DB`.
2. Apply `migrations/0001_initial.sql` and `migrations/0002_content.sql` to that database in order.
3. Add `RATE_LIMIT_SALT` as a secret in Pages settings.
4. Add `TURNSTILE_SECRET_KEY` as a secret after creating a Turnstile widget for the site.
5. Keep the Turnstile site key in the frontend only when the contact form is wired to display the widget.

Without `TURNSTILE_SECRET_KEY`, the endpoint still uses the honeypot, same-origin check, validation, and rate limiting. Production should configure Turnstile before accepting public submissions.

The frontend no longer stores team or project records. Update those records in D1; the pages read them from the API on every load.
