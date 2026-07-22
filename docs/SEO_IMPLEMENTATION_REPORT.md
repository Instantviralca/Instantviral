# InstantViral — SEO Implementation Report

**Date:** 22 July 2026  
**Scope:** Approved SEO fixes only (no redesign, layout, branding, pricing, CRO, or checkout changes)  
**Domain:** https://instantviral.ca  

---

## Summary

Approved audit recommendations were implemented so each page has a clearer SEO purpose:

| Area | Result |
|------|--------|
| Homepage | Brand hub — no longer targets “buy Instagram followers” |
| `/buy-instagram-followers` | Sole owner of “Buy Instagram Followers” |
| `/buy-facebook-page-likes` | Always uses “Page”; no bare “Facebook Likes” |
| Learn vs Buy | Commercial keywords on services; informational on Learn |
| Instagram Learn cluster | Unique primary keywords |
| FAQs | Homepage = general; services = service-specific |
| Metadata / schema | Aligned; Service + Product kept |
| Validation | TypeScript, ESLint, tests, production build passed |

---

## What changed (by priority)

### 1. Homepage positioning
**Files:** `data/content/homepage.ts`, `seo/titles.ts`, `seo/descriptions.ts`, `data/seo/metadata-registry.ts`

| Before | After |
|--------|--------|
| H1: Buy Instagram Followers with Confidence | H1: Social Media Growth Services Canada |
| primaryKeyword: buy instagram followers | social media growth services Canada |
| CTA: Buy Instagram Followers → service page | Explore Growth Services → platform selector |
| Meta keywords included “buy followers” | Brand / multi-platform keywords only |

Homepage still naturally mentions Instagram, TikTok, YouTube, and Facebook without ranking for individual “buy …” queries.

### 2. Buy Instagram Followers ownership
**Files:** `data/content/instagram.ts`, `seo/titles.ts`, `seo/descriptions.ts`

Aligned on one phrase — **Buy Instagram Followers**:

- Meta title  
- Meta description  
- H1  
- Hero `primaryKeyword` (normalized to `buy instagram followers`)  
- Schema Service / Product name (from service registry)  
- Breadcrumb / navigation name (registry)  
- Open Graph / Twitter titles (via content SEO override)

### 3. Facebook Page Likes vs Post Likes
**Files:** `data/content/facebook.ts`, `components/sections/ServicePageView.tsx`, `data/content/facebook-followers-educational-guide.ts`

On `/buy-facebook-page-likes`:

- Title / H1 / description / keywords now include **Page**
- Removed bare “Facebook Likes” / “Real Facebook Likes” / “Facebook Likes Packages”
- Related links updated to “Buy Facebook Page Likes Canada”

Post Likes page wording left for `/buy-facebook-post-likes` only.

### 4. Buy vs Learn firewall
**Files:** Learn articles (SEO fields already informational); CTA blocks unchanged

- [Learn keyword audit](fe9f217a-cbc0-4c72-b435-e36da784d3fd) confirmed all 56 articles’ SEO title / H1 / keywords / descriptions do **not** target buy / purchase / packages / pricing  
- Service links remain in CTA / related-service cards only (correct)

### 5. Instagram article cluster
**File:** `data/learn/articles/complete-instagram-growth-guide.ts`

| Article | Primary keyword (`keywords[0]`) |
|---------|----------------------------------|
| How to Grow Instagram Followers Organically | How to Grow Instagram Followers Organically |
| How to Get More Instagram Followers Without Ads | How to Get More Instagram Followers Without Ads |
| Complete Instagram Growth Guide | **Complete Instagram Growth Guide** (updated; removed overlapping “Grow Instagram Followers”) |

### 6. FAQ optimization
**Files:** `data/content/homepage.ts`, `data/content/faq.ts`

**Homepage FAQ (general only):**

- How InstantViral works  
- Password / public account  
- Multiple services  
- Track order  
- Platforms supported  
- Need help  

**Removed from homepage render** (kept in catalogue for hub / service use where needed): choose package, order start, gradual delivery, refill, money-back.

**Service FAQ questions differentiated**, e.g.:

- How do I choose the right **Facebook Followers** package?  
- Is gradual delivery available for **Facebook Page Likes**?  
- Is there a money-back guarantee on **Facebook Page Likes**?  
- How do I choose the right **YouTube Views** package?  

### 7. Schema
- Kept Organization, WebSite, WebPage, Breadcrumb, FAQ, Review, AggregateRating, **Service**, **Product**
- No architecture removal  
- Entity names aligned with service registry (`Buy Instagram Followers`, `Buy Facebook Page Likes`, etc.)

### 8. Metadata consistency (other services)
**Also updated for alignment:**

- Instagram Likes → Buy Instagram Likes (title / H1 / primaryKeyword / descriptions)  
- Instagram Views / Comments titles & descriptions aligned with “Buy …”  
- YouTube Subscribers description now includes “Buy YouTube subscribers …”  
- Instagram Comments hero primaryKeyword includes Canada to match H1  

### 9. Tests / tooling
**Files:** `lib/seo/__tests__/keyword-ownership.test.ts` (new), `lib/config/__tests__/hosts.test.ts` (pre-existing TS await fix)

Ownership tests cover homepage hub positioning, IG followers ownership, FB Page Likes “Page” rule, service signal alignment, Learn commercial firewall, Instagram cluster uniqueness, and homepage FAQ set.

---

## Validation results

| Check | Result |
|-------|--------|
| `tsc --noEmit` | Pass |
| `npm run lint` | Pass (pre-existing unused `_input` warning in `remote-payment.ts`) |
| SEO / metadata / sitemap / linking / FAQ / article-seo tests | Pass |
| Full `npm test` | **293 passed**, 7 skipped |
| `npm run build` | Pass — 134 routes generated |

---

## Files modified

1. `data/content/homepage.ts`  
2. `data/content/instagram.ts`  
3. `data/content/facebook.ts`  
4. `data/content/youtube.ts`  
5. `data/content/faq.ts`  
6. `data/content/facebook-followers-educational-guide.ts`  
7. `data/seo/metadata-registry.ts`  
8. `seo/titles.ts`  
9. `seo/descriptions.ts`  
10. `components/sections/ServicePageView.tsx`  
11. `data/learn/articles/complete-instagram-growth-guide.ts`  
12. `lib/config/__tests__/hosts.test.ts`  
13. `lib/seo/__tests__/keyword-ownership.test.ts` *(new)*  

**Related docs (not code fixes):**

- `docs/SEO_AUDIT_REPORT.md` — prior audit  
- `docs/SEO_IMPLEMENTATION_REPORT.md` — this report  

---

## Explicitly not changed

- Layout / design system  
- Branding / visuals  
- Pricing / packages  
- Checkout / cart / payments  
- CRO experiments  
- Broad internal linking structure (only required FB Page Likes link labels)  

---

## Regression check

- Canonical / robots / sitemap behavior unchanged  
- Service + Product schema retained  
- No commercial Learn meta targeting introduced  
- Homepage no longer cannibalizes IG Followers money keyword  
- Build and full test suite green  

---

*End of implementation report.*
