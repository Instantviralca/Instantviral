# InstantViral — Production Deployment Guide

**Site:** https://instantviral.ca
**Status:** Codebase is production-ready. Remaining blockers are missing production secrets.

This guide covers environment variables, Contabo/PM2/Nginx/Cloudflare setup, Mollie Remote payments, and post-launch verification.
**Do not commit real secrets.** Never put live keys in git.

**Current production stack:** Contabo VPS · Nginx · PM2 · Cloudflare · PostgreSQL (commonly `127.0.0.1:5433`) · Next.js 15.5.25 · Mollie Remote / CarryCubes.

---

## 1. Required environment variables

These variables are **required** for production. The app fails safely at runtime if critical ones are missing.

| Variable | Required | Used for |
|----------|----------|----------|
| `DATABASE_URL` | Yes | PostgreSQL connection for orders, contacts, sessions, webhooks |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL, Mollie return/cancel URLs, email links |
| `IV_ADMIN_PASSWORD` | Yes | Admin panel login password |
| `IV_ADMIN_SESSION_SECRET` | Yes | Sign admin session cookies (HMAC) |
| `EMAIL_FROM` | Yes | From-address on order/contact emails |
| SMTP (`SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` / …) **or** temporary `RESEND_API_KEY` | Yes | Transactional email transport |

Live checkout uses **Mollie Remote** (CarryCubes). Configure Mollie server URL + shared secret in Admin → Settings (and matching env if used). **Stripe is not used** — do not set Stripe keys.

### Strongly recommended

| Variable | Used for |
|----------|----------|
| `NEXT_PUBLIC_LEGACY_CHECKOUT_HOST` | Optional retired host (`checkout.instantviral.ca`) for 308 redirects onto `/checkout` |
| `EMAIL_ADMIN_TO` | Admin inbox for new paid orders + contact form alerts |
| `EMAIL_SUPPORT` | Support address shown in customer emails |
| `EMAIL_COMPANY_NAME` | Brand name in email templates (defaults to InstantViral) |
| `NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED` | Set `true` so the UI knows admin login is available |

### Optional (analytics / preview)

| Variable | Used for |
|----------|----------|
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable analytics pipeline |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_GTM_CONTAINER_ID` | Google Tag Manager |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity |
| `LEARN_ARTICLE_PREVIEW_SECRET` | Authorized Learn article preview URLs |

### Forbidden in production

| Variable / value | Why |
|------------------|-----|
| `IV_PAYMENTS_MODE=mock` | Mock payments are blocked in production |
| `IV_ALLOW_FILE_STORE=1` | File-based store is not allowed in production |
| Weak admin passwords (`change-me-admin`, etc.) | Rejected by env validation |

### Accepted aliases (optional)

You may use these instead of the canonical names if preferred:

| Alias | Maps to |
|-------|---------|
| `SITE_URL` | `NEXT_PUBLIC_SITE_URL` |
| `ADMIN_PASSWORD` | `IV_ADMIN_PASSWORD` |
| `SESSION_SECRET` | `IV_ADMIN_SESSION_SECRET` |
| `RESEND_FROM_EMAIL` | `EMAIL_FROM` |

---

## 2. What each required variable is used for

### `DATABASE_URL`

- **Purpose:** PostgreSQL connection string for orders, order items, payments, contact messages, notification records, webhook idempotency, admin sessions, and login rate limits.
- **Format (Contabo local):** `postgresql://USER:PASSWORD@127.0.0.1:5433/instantviral`
- **Where to get it:** Credentials for Postgres on the Contabo VPS (production commonly uses port **5433**).
- **After setting:** Run migrations once: `npm run db:migrate:sql`

---

### `NEXT_PUBLIC_SITE_URL`

- **Purpose:** Public site origin used for Mollie return/cancel URLs, order tracking links in emails, canonical/metadata helpers, and absolute redirects.
- **Value:** `https://instantviral.ca` (no trailing slash)
- **Where to get it:** Your production domain (must be HTTPS)
- **Note:** Variables prefixed with `NEXT_PUBLIC_` are embedded in the client bundle. This value is not secret.

---

### Mollie Remote payment (live checkout)

- **Purpose:** Hosted Mollie checkout via CarryCubes remote payment protocol (`mollie-remote`).
- **Configure:** Admin → Settings (server URL + shared secret). Webhook endpoint: `https://instantviral.ca/api/webhooks/mollie-remote`
- **Do not configure Stripe** — the Stripe provider/SDK/webhook route have been removed.

---

### `IV_ADMIN_PASSWORD`

- **Purpose:** Password for `/admin/login`. Compared with constant-time checks; login attempts are rate-limited.
- **Value:** A strong unique password (long passphrase). Do **not** use documented defaults.
- **Where to get it:** Generate yourself, e.g.:

```bash
openssl rand -base64 32
```

Store it in a password manager. Share only with trusted operators.

---

### `IV_ADMIN_SESSION_SECRET`

- **Purpose:** HMAC secret used to sign admin session cookies (`iv_admin_session`). If leaked, sessions can be forged.
- **Value:** Random string, **64+ characters** recommended.
- **Where to get it:** Generate yourself:

```bash
openssl rand -hex 64
```

Never reuse the admin password as the session secret in production.

---

### SMTP (preferred) / `RESEND_API_KEY` (optional fallback)

- **Preferred:** Contabo / self-hosted SMTP via `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`.
- **Optional fallback:** `RESEND_API_KEY` when SMTP is unset (SMTP wins when both are set).
- Resend keys start with `re_…` — [Resend Dashboard](https://resend.com/api-keys).

---

### `EMAIL_FROM`

- **Purpose:** The From address on transactional emails (must be allowed by your SMTP provider or verified in Resend).
- **Example:** `orders@instantviral.ca` or `InstantViral <orders@instantviral.ca>`

---

## 3. Production-ready example file

See **[`.env.production.example`](.env.production.example)** in the repo root.

Copy values into the Contabo host env file used by PM2 (or your password manager). Do not commit secrets.

---

## 4. Configure Contabo (Nginx + PM2 + Cloudflare)

### A. Host layout

1. Contabo VPS runs Next.js under **PM2** (`npm run start` after `npm run build`).
2. **Nginx** reverse-proxies HTTPS traffic to the Node listen port.
3. **Cloudflare** sits in front for DNS/CDN/WAF as configured.
4. **PostgreSQL** on localhost (production commonly **5433**).

### B. Environment variables on the VPS

1. Put secrets in the env file / PM2 ecosystem env (never in git).
2. Set all required keys plus recommended email fields.
3. After changing `NEXT_PUBLIC_*`, rebuild (`npm run build`) and restart PM2.

| Topic | Guidance |
|-------|----------|
| Secrets | `IV_ADMIN_*`, SMTP/`RESEND_API_KEY`, Mollie shared secret, `DATABASE_URL` — never expose in client code |
| Domain | Cloudflare → Contabo; apex `instantviral.ca` (+ `www` redirect if desired) |
| Legacy checkout host | Optional: point `checkout.instantviral.ca` at the same app for 308 → `/checkout` (see C1) |
| HTTPS | Cloudflare / Nginx TLS as designed |

### C1. Legacy checkout subdomain redirects (`checkout.instantviral.ca`)

Checkout is served on the **main domain** only: `https://instantviral.ca/checkout`.

If old emails, bookmarks, or campaigns still link to `checkout.instantviral.ca`, keep that hostname pointed at this same Next.js app so middleware can permanently redirect:

| Old path | Redirects to |
|----------|--------------|
| `https://checkout.instantviral.ca/` | `https://instantviral.ca/checkout` |
| `https://checkout.instantviral.ca/checkout/...` | `https://instantviral.ca/checkout/...` |
| Recovery tokens / query string | Preserved |

1. Point `checkout.instantviral.ca` at this app **only** for redirects — do not set it as the customer checkout origin.
2. Optional env: `NEXT_PUBLIC_LEGACY_CHECKOUT_HOST=checkout.instantviral.ca`
   (`NEXT_PUBLIC_CHECKOUT_URL` is deprecated; if still set to a different host, it is treated as a legacy redirect hint only.)
3. Mollie return URL → `https://instantviral.ca/order-success?...`
4. Mollie cancel URL → `https://instantviral.ca/checkout?cancelled=1&orderId=...`
5. Mollie webhook → `https://instantviral.ca/api/webhooks/mollie-remote`
6. Abandoned-cart recovery emails → `https://instantviral.ca/checkout/recover/{token}`

### D. Database migrations

Run after `DATABASE_URL` is set (on the VPS or any shell with production DB access):

```bash
npm run db:migrate:sql
```

### E. Deploy / restart

```bash
npm ci
npm run build
pm2 restart instantviral
```

### F. Preflight check

With production values loaded (never commit them):

```bash
IV_VERIFY_AS_PRODUCTION=1 npm run env:verify
```

Expect: `[env] READY — critical production variables are present.`
---

## 5. Configure Mollie Remote webhooks

### Endpoint URL

```
https://instantviral.ca/api/webhooks/mollie-remote
```

### Steps

1. Confirm CarryCubes / Mollie Remote server URL + shared secret in Admin → Settings
2. Ensure the remote plugin posts callbacks to the InstantViral webhook URL above
3. Place a small live checkout and confirm webhook delivery / order paid in Admin → Orders
4. Confirm return URL reaches `/order-success` and cancel returns to `/checkout?cancelled=1`

### Checkout URLs (already coded)

| Flow | URL pattern |
|------|-------------|
| Success | `https://instantviral.ca/order-success?orderId=…&email=…` |
| Cancel | `https://instantviral.ca/checkout?cancelled=1&orderId=…` |

---

## 6. Resend email setup (quick)

1. Resend → **Domains** → add `instantviral.ca`
2. Add the DNS records Resend shows (SPF/DKIM)
3. Wait until domain status is **Verified**
4. Create API key → `RESEND_API_KEY`
5. Set `EMAIL_FROM` to an address on that domain (e.g. `orders@instantviral.ca`)
6. Set `EMAIL_ADMIN_TO` to the ops inbox that should receive order/contact alerts

---

## 7. Verify deployment after launch

### A. Automated / config checks

```bash
IV_VERIFY_AS_PRODUCTION=1 npm run env:verify
curl -I https://instantviral.ca
curl -s https://instantviral.ca/robots.txt | head
curl -s https://instantviral.ca/sitemap.xml | head
```

### B. Smoke test checklist

| # | Surface | How to verify |
|---|---------|----------------|
| 1 | Homepage | Opens at `https://instantviral.ca` — no error page |
| 2 | Service page | Open `/buy-instagram-followers` — packages load |
| 3 | Cart | Add a package → `/cart` shows line item |
| 4 | Checkout | `/checkout` → Place Order redirects to Mollie hosted payment |
| 5 | Mollie Success | Complete payment → `/order-success` shows confirmed / confirming |
| 6 | Mollie Cancel | Cancel on Mollie → returns to `/checkout?cancelled=1` with cancel message |
| 7 | Webhook | Mollie Remote webhook marks order paid (Admin / track-order) |
| 8 | Email | Customer receives order confirmation; admin gets new-order mail |
| 9 | Track order | `/track-order` with order ID + email shows status |
| 10 | Contact form | Submit `/contact` — success UI; admin email received |
| 11 | Reviews | `/reviews` loads approved reviews |
| 12 | Learn Center | `/learn` and one article load |
| 13 | Admin | `/admin/login` with `IV_ADMIN_PASSWORD` → dashboard / orders |
| 14 | SEO | `/robots.txt` and `/sitemap.xml` return 200 |

### C. Security quick checks

- Site loads over **HTTPS** only
- Admin cookie is set after login (HttpOnly; Secure in production)
- Checkout uses Mollie Remote only (no Stripe SDK/keys required)
- Do not leave `IV_SKIP_ENV_GUARD=1` set in Production

### D. First 24 hours monitoring

- Mollie Remote webhook delivery / paid-order success rate
- Host logs for `[env]`, `[payments]`, Mollie webhook
- Email bounces / failed sends
- Admin login lockouts (rate limit after repeated failures)

---

## 8. Launch command summary

```bash
# 1. Set all Production env vars on the host (see Section 4)

# 2. Apply DB schema (once, with production DATABASE_URL)
npm run db:migrate:sql

# 3. Deploy
# Contabo/VPS: pull + build + restart process manager
# or: push to the production Git branch / host pipeline

# 4. Confirm Mollie Remote webhook URL + Admin Settings secrets

# 5. Smoke test (Section 7)
```

---

## 9. Rollback (if needed)

1. Restart/redeploy the previous known-good release under PM2
2. If Mollie/CarryCubes webhook is failing repeatedly, pause the remote endpoint, fix secret/URL, re-enable
3. Do not reverse additive SQL migrations; prefer forward-fix

---

## Quick reference — obtain each value

| Variable | Obtain from |
|----------|-------------|
| `DATABASE_URL` | Contabo local Postgres (e.g. `127.0.0.1:5433`) |
| `NEXT_PUBLIC_SITE_URL` | `https://instantviral.ca` |
| Mollie Remote server URL + secret | CarryCubes / Admin → Settings |
| `IV_ADMIN_PASSWORD` | Generate a strong unique password (`openssl rand -base64 32`) |
| `IV_ADMIN_SESSION_SECRET` | Generate a long random secret (`openssl rand -hex 64`) |
| `EMAIL_FROM` + SMTP or `RESEND_API_KEY` | Contabo SMTP preferred / Resend as optional fallback |
