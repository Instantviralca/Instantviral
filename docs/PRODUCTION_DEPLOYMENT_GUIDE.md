# InstantViral — Production Deployment Guide

**Site:** https://instantviral.ca  
**Status:** Codebase is production-ready. Remaining blockers are missing production secrets.

This guide covers environment variables, Vercel setup, Stripe webhooks, and post-launch verification.  
**Do not commit real secrets.** Never put live keys in git.

---

## 1. Required environment variables

These nine variables are **required** for production. The app fails safely at runtime if they are missing.

| Variable | Required | Used for |
|----------|----------|----------|
| `DATABASE_URL` | Yes | PostgreSQL connection for orders, contacts, sessions, webhooks |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL, Stripe success/cancel redirects, email links |
| `STRIPE_SECRET_KEY` | Yes | Server-side Stripe Checkout Sessions |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Client-exposed Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Verify Stripe webhook signatures |
| `IV_ADMIN_PASSWORD` | Yes | Admin panel login password |
| `IV_ADMIN_SESSION_SECRET` | Yes | Sign admin session cookies (HMAC) |
| `RESEND_API_KEY` | Yes | Send transactional email via Resend |
| `EMAIL_FROM` | Yes | From-address on order/contact emails |

### Strongly recommended

| Variable | Used for |
|----------|----------|
| `NEXT_PUBLIC_CHECKOUT_URL` | External checkout origin (`https://checkout.instantviral.ca`) — soft cart hands off here |
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
| `STRIPE_PUBLISHABLE_KEY` | Server-only alias — **still set** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` for the browser |

---

## 2. What each required variable is used for

### `DATABASE_URL`

- **Purpose:** PostgreSQL connection string for orders, order items, payments, contact messages, notification records, webhook idempotency, admin sessions, and login rate limits.
- **Format:** `postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require`
- **Where to get it:**
  - [Neon](https://console.neon.tech) → Project → Connection string  
  - [Supabase](https://supabase.com/dashboard) → Project Settings → Database → Connection string (URI)  
  - Any managed Postgres provider’s connection panel  
- **After setting:** Run migrations once: `npm run db:migrate:sql`

---

### `NEXT_PUBLIC_SITE_URL`

- **Purpose:** Public site origin used for Stripe success/cancel URLs, order tracking links in emails, canonical/metadata helpers, and absolute redirects.
- **Value:** `https://instantviral.ca` (no trailing slash)
- **Where to get it:** Your production domain (must be HTTPS)
- **Note:** Variables prefixed with `NEXT_PUBLIC_` are embedded in the client bundle. This value is not secret.

---

### `STRIPE_SECRET_KEY`

- **Purpose:** Server-only key to create Checkout Sessions and retrieve session status.
- **Format:** Live mode starts with `sk_live_…` (use `sk_test_…` only for staging)
- **Where to get it:**  
  [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **API keys** → Secret key  
  Ensure the toggle is set to **Live** for production.

---

### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

- **Purpose:** Public Stripe key available to the browser (safe to expose).
- **Format:** Live mode starts with `pk_live_…`
- **Where to get it:**  
  Stripe Dashboard → **Developers** → **API keys** → Publishable key  
- **Important:** Must be the `NEXT_PUBLIC_` variant so Next.js exposes it to the client.

---

### `STRIPE_WEBHOOK_SECRET`

- **Purpose:** Verifies that webhook requests to `/api/webhooks/stripe` were signed by Stripe (`constructEvent`). Prevents forged payment events.
- **Format:** Starts with `whsec_…`
- **Where to get it:**  
  Stripe Dashboard → **Developers** → **Webhooks** → select (or create) the endpoint → **Signing secret** → Reveal  
  See [Section 6](#6-configure-stripe-webhooks) below.

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

### `RESEND_API_KEY`

- **Purpose:** Authenticates API calls to Resend for order confirmation, contact acknowledgements, and admin notifications.
- **Format:** Starts with `re_…`
- **Where to get it:**  
  [Resend Dashboard](https://resend.com/api-keys) → **API Keys** → Create API key  

---

### `EMAIL_FROM`

- **Purpose:** The From address on transactional emails (must be on a domain verified in Resend).
- **Example:** `orders@instantviral.ca` or `InstantViral <orders@instantviral.ca>`
- **Where to get it:**  
  Resend Dashboard → **Domains** → add & verify `instantviral.ca` (DNS records) → use an address on that domain  

---

## 3. Production-ready example file

See **[`.env.production.example`](.env.production.example)** in the repo root.

Copy it into your password manager / Vercel env UI. Fill real values. Do not rename it to `.env.production` and commit it with secrets.

---

## 4. Configure variables on Vercel

### A. Create / open the project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Open the InstantViral project (or **Add New** → import the Git repository)
3. Framework: **Next.js** (auto-detected)

### B. Add environment variables

1. Project → **Settings** → **Environment Variables**
2. For each required key:
   - **Key:** exact name (e.g. `DATABASE_URL`)
   - **Value:** production secret
   - **Environments:** enable **Production** (and Preview only if you intentionally want staging secrets)
3. Add all nine required variables plus recommended email fields
4. Click **Save**

### C. Important Vercel notes

| Topic | Guidance |
|-------|----------|
| `NEXT_PUBLIC_*` vars | Must be set **before** a production build/deploy. Changing them requires a **redeploy**. |
| Secrets | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `IV_ADMIN_*`, `RESEND_API_KEY`, `DATABASE_URL` — Production only; never expose in client code. |
| Domain | Project → **Settings** → **Domains** → add `instantviral.ca` (+ redirect `www` → apex if desired) |
| Checkout subdomain | Also add `checkout.instantviral.ca` (same project) — see section 4.C1 below |
| HTTPS | Automatic on Vercel once DNS is pointed correctly |

### C1. External checkout subdomain (`checkout.instantviral.ca`)

Buzzoid-style handoff: cart on the main site → checkout UI on a dedicated host → Stripe hosted payment.

1. Vercel → **Settings** → **Domains** → **Add** → `checkout.instantviral.ca`
2. DNS: create a **CNAME** for `checkout` pointing to the value Vercel shows (usually `cname.vercel-dns.com`)
3. Set env (Production + redeploy):
   - `NEXT_PUBLIC_SITE_URL=https://instantviral.ca`
   - `NEXT_PUBLIC_CHECKOUT_URL=https://checkout.instantviral.ca`
4. Cart cookie uses `Domain=.instantviral.ca` so the checkout host can read the cart
5. Stripe cancel returns to `https://checkout.instantviral.ca/?cancelled=1`
6. Stripe success returns to `https://instantviral.ca/order-success?...`
7. Keep webhook endpoint on the main site: `https://instantviral.ca/api/webhooks/stripe`

**Host split (when both env URLs differ):**
- `checkout.instantviral.ca` → only checkout (`/` / `/checkout` + APIs). Marketing/Learn/admin redirect to the main site.
- Main site (`instantviral.ca` or Vercel preview URL) → full site. `/checkout` redirects to the checkout subdomain. Soft cart `/cart` stays on main.

**Local without subdomain:** omit `NEXT_PUBLIC_CHECKOUT_URL` — checkout stays on `/checkout` of the main origin. Dev force: `?checkoutHost=1`.

**Vercel test before custom main domain:** set `NEXT_PUBLIC_SITE_URL` to your `*.vercel.app` URL and `NEXT_PUBLIC_CHECKOUT_URL=https://checkout.instantviral.ca`, then add only the checkout domain in Vercel Domains.

### D. Database migrations on Vercel

Vercel does not automatically run SQL migrations. After `DATABASE_URL` is set:

**Option 1 — Local one-time (recommended for first launch):**

```bash
# With production DATABASE_URL in your shell or .env.local (do not commit)
npm run db:migrate:sql
```

**Option 2 — Vercel CLI / one-off job:** run the same command in an environment that has production `DATABASE_URL`.

### E. Deploy

```bash
# From connected Git: push to main (or your production branch)
git push origin main

# Or Vercel CLI
vercel --prod
```

After first deploy with new `NEXT_PUBLIC_*` values, confirm a fresh Production deployment completed.

### F. Preflight check (optional, from your machine)

With production values loaded locally (never commit them):

```bash
IV_VERIFY_AS_PRODUCTION=1 npm run env:verify
```

Expect: `[env] READY — critical production variables are present.`

---

## 5. Configure Stripe Webhooks

### Endpoint URL

```
https://instantviral.ca/api/webhooks/stripe
```

### Steps

1. Open [Stripe Dashboard](https://dashboard.stripe.com) → switch to **Live** mode  
2. **Developers** → **Webhooks** → **Add endpoint**  
3. **Endpoint URL:** `https://instantviral.ca/api/webhooks/stripe`  
4. **Events to send** — select at least:
   - `checkout.session.completed` — mark order paid / fulfilment gate  
   - `checkout.session.expired` — cancelled session  
   - `payment_intent.payment_failed` — failed payment signal  
5. Create the endpoint  
6. Open the endpoint → **Signing secret** → **Reveal** → copy `whsec_…`  
7. Paste into Vercel as `STRIPE_WEBHOOK_SECRET`  
8. **Redeploy** Production so the secret is live  

### Checkout URLs (already coded)

| Flow | URL pattern |
|------|-------------|
| Success | `https://instantviral.ca/order-success?orderId=…&email=…&session_id={CHECKOUT_SESSION_ID}` |
| Cancel | `https://instantviral.ca/checkout?cancelled=1&orderId=…` |

Sessions also set `client_reference_id` and `metadata.orderId` for order binding.

### Verify webhooks

1. Place a small live (or test-mode staging) checkout  
2. Stripe → Webhooks → endpoint → **Recent deliveries**  
3. Expect **HTTP 2xx** for `checkout.session.completed`  
4. Confirm order shows paid in Admin → Orders and/or Track Order  

If deliveries show `400`, the signing secret is wrong. If `503`, Stripe env vars are incomplete.

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
| 4 | Checkout | `/checkout` → Place Order redirects to Stripe Checkout |
| 5 | Stripe Success | Complete payment → `/order-success` shows confirmed / confirming |
| 6 | Stripe Cancel | Cancel on Stripe → returns to `/checkout?cancelled=1` with cancel message |
| 7 | Webhook | Stripe Dashboard shows 2xx for `checkout.session.completed` |
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
- Checkout refuses to run if Stripe keys are removed (503)  
- Do not leave `IV_SKIP_ENV_GUARD=1` set in Production  

### D. First 24 hours monitoring

- Stripe webhook delivery success rate  
- Vercel → Logs for `[stripe webhook]`, `[env]`, `[payments]`  
- Resend → bounces / failed sends  
- Admin login lockouts (rate limit after repeated failures)  

---

## 8. Launch command summary

```bash
# 1. Set all Production env vars in Vercel (see Section 4)

# 2. Apply DB schema (once, with production DATABASE_URL)
npm run db:migrate:sql

# 3. Deploy
vercel --prod
# or: push to the production Git branch

# 4. Create Stripe webhook + set STRIPE_WEBHOOK_SECRET + redeploy

# 5. Smoke test (Section 7)
```

---

## 9. Rollback (if needed)

1. Vercel → **Deployments** → previous successful Production deployment → **Promote to Production**  
2. Stripe → temporarily disable the webhook endpoint if it is failing repeatedly  
3. Do not reverse additive SQL migrations; prefer forward-fix  

---

## Quick reference — obtain each value

| Variable | Obtain from |
|----------|-------------|
| `DATABASE_URL` | Neon / Supabase / Postgres → connection string (`sslmode=require`) |
| `NEXT_PUBLIC_SITE_URL` | `https://instantviral.ca` |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → Secret key (Live) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys → Publishable key (Live) |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → endpoint signing secret |
| `RESEND_API_KEY` | Resend → API Keys |
| `EMAIL_FROM` | Address on a domain verified in Resend |
| `IV_ADMIN_PASSWORD` | Generate strong password (`openssl rand -base64 32`) |
| `IV_ADMIN_SESSION_SECRET` | Generate random secret (`openssl rand -hex 64`) |
