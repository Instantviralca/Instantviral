# InstantViral — Production Deployment Guide

Safe launch runbook for instantviral.ca. Does not change product UI, SEO, pricing, or content.

> **Operator guide (env vars, Contabo/PM2, smoke tests):**
> [`docs/PRODUCTION_DEPLOYMENT_GUIDE.md`](docs/PRODUCTION_DEPLOYMENT_GUIDE.md)
> **Template:** [`.env.production.example`](.env.production.example)

> **Production stack:** Contabo VPS + Nginx + PM2 + Cloudflare + PostgreSQL (typically `127.0.0.1:5433`).
> **App:** Next.js 15.5.25 / React 19.
> **Payments:** Mollie Remote via CarryCubes only (`mollie-remote`).

> **Checkout:** Customer checkout is always on the main domain at `/checkout`
> (`https://instantviral.ca/checkout`). Do not set a separate checkout origin for traffic.
> Optionally keep `checkout.instantviral.ca` pointed at this app so middleware can **308**
> old subdomain URLs onto the equivalent main-domain `/checkout` route (recovery tokens preserved).
> Optional env: `NEXT_PUBLIC_LEGACY_CHECKOUT_HOST=checkout.instantviral.ca`.
> Mollie return/webhook URLs use `NEXT_PUBLIC_SITE_URL` (main domain).

## Required environment variables

Set these in the production host env file used by PM2. Never commit secrets.

| Required | Canonical key | Alias accepted |
|----------|---------------|----------------|
| Database | `DATABASE_URL` | — |
| Site URL (HTTPS) | `NEXT_PUBLIC_SITE_URL` | `SITE_URL` |
| Admin password | `IV_ADMIN_PASSWORD` | `ADMIN_PASSWORD` |
| Session secret | `IV_ADMIN_SESSION_SECRET` | `SESSION_SECRET` |
| Email from | `EMAIL_FROM` | `RESEND_FROM_EMAIL` |
| Email transport | `SMTP_*` (preferred) or temporary `RESEND_API_KEY` | — |

### Mollie Remote (live checkout)

Configure via Admin → Settings and/or env. Checkout uses **mollie-remote** only.

### Strongly recommended

| Key | Purpose |
|-----|---------|
| `EMAIL_ADMIN_TO` | Admin order + contact notifications |
| `EMAIL_SUPPORT` | Shown in customer emails |
| `EMAIL_COMPANY_NAME` | Defaults to InstantViral |
| `NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED=true` | Shows admin login availability |
| `ABANDONED_CART_CRON_SECRET` | Protect `/api/jobs/abandoned-carts` / CLI job |

### Forbidden in production

- `IV_PAYMENTS_MODE=mock`
- `IV_ALLOW_FILE_STORE=1`
- Default admin passwords (`change-me-admin`, etc.)

Production process **fails safely** at runtime if critical variables are missing (`instrumentation.ts`). Builds may skip the throw (`NEXT_PHASE=phase-production-build` or `IV_SKIP_ENV_GUARD=1`).

---

## Deployment commands (Contabo / PM2)

```bash
# 1) Install
npm ci

# 2) Verify env (treat current shell as production)
IV_VERIFY_AS_PRODUCTION=1 npx tsx scripts/verify-production-env.ts

# 3) Apply database schema
npx tsx scripts/apply-migrations.ts

# 4) Build
npm run build

# 5) Restart app process (example)
pm2 restart instantviral
# or: npm run start behind PM2
```

### npm scripts

```bash
npm run env:verify          # validate env (set IV_VERIFY_AS_PRODUCTION=1 for prod rules)
npm run db:migrate:sql      # apply drizzle/*.sql with schema_migrations tracking
npm run build
npm run start
npm test
npm run abandoned-carts:process
```

---

## Manual configuration (outside the codebase)

1. **DNS / Cloudflare / HTTPS** — Point `instantviral.ca` (+ `www` redirect) through Cloudflare to Contabo; terminate TLS at Nginx/Cloudflare as designed.
2. **PostgreSQL** — Local Contabo Postgres (example port **5433**); set `DATABASE_URL`.
3. **Nginx** — Reverse-proxy to the Next.js PM2 listen port.
4. **Mollie Remote / CarryCubes** — Configure remote payment server URL + shared secret (Admin → Settings). Webhook: `https://instantviral.ca/api/webhooks/mollie-remote`.
5. **Email** — Prefer SMTP on Contabo. Verify sending domain; set `EMAIL_FROM`.
6. **Cron / PM2** — Schedule abandoned-cart processing (`npm run abandoned-carts:process` or secured job URL).
7. **Search Console** — Submit `https://instantviral.ca/sitemap.xml` after go-live.

---

## Mollie verification map

| Check | Status in code |
|-------|----------------|
| Hosted checkout create | `lib/payments/providers/mollie-remote.ts` |
| Merchant order number (optional) | Signed `merchant_order_number` when present |
| Success URL | `/order-success?...` |
| Cancel URL | `/checkout?cancelled=1&orderId=` |
| Webhook | `POST /api/webhooks/mollie-remote` |
| Replay protection | `webhook_events` unique (provider, event_id) |
| Order paid binding | Authoritative paid webhook path |
| Cancel UX | Checkout banner when `cancelled=1` |

---

## Launch checklist

- [ ] Build (`npm run build`)
- [ ] Restart PM2 / Nginx healthy
- [ ] Run migrations (`npm run db:migrate:sql`)
- [ ] Verify environment variables (`IV_VERIFY_AS_PRODUCTION=1 npm run env:verify`)
- [ ] Verify Mollie Remote webhook deliveries
- [ ] Verify emails (order received / paid + contact form)
- [ ] Verify admin login (`/admin/login`)
- [ ] Verify homepage
- [ ] Verify service pages (at least IG followers + one URL service)
- [ ] Verify checkout (redirects to Mollie hosted payment)
- [ ] Verify order success (paid)
- [ ] Verify order tracking (`/track-order`)
- [ ] Verify Mollie cancel return
- [ ] Verify reviews + Learn Center
- [ ] Verify `robots.txt` + `sitemap.xml`
- [ ] Verify abandoned-cart cron schedule

---

## Smoke test URLs

| Surface | URL |
|---------|-----|
| Homepage | `/` |
| Service | `/buy-instagram-followers` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Order success | `/order-success` (after paid session) |
| Track order | `/track-order` |
| Contact | `/contact` |
| Reviews | `/reviews` |
| Learn | `/learn` |
| Admin | `/admin/login` |
| robots | `/robots.txt` |
| sitemap | `/sitemap.xml` |
| Mollie webhook | `POST /api/webhooks/mollie-remote` |

---

## Rollback

1. **Host rollback** — Redeploy/restart the previous known-good release under PM2.
2. **Do not reverse migrations** unless a bad migration was applied; prefer forward-fix.
3. **Mollie / CarryCubes** — If webhook misconfigured, pause the remote endpoint, fix secret/URL, re-enable.
4. Prefer host rollback over disabling live payment configuration.

---

## Post-deploy monitoring (first 24h)

- Mollie Remote webhook delivery success rate
- `/api/checkout/place-order` 4xx/5xx
- Admin login failures / lockouts
- Email bounce/complaint
- PM2 / Nginx / Postgres health
- Server error logs (`[env]`, `[payments]`, Mollie webhook logs)
