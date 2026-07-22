# InstantViral — Technical SEO Audit Report

**Project:** InstantViral (Next.js)  
**Domain:** https://instantviral.ca  
**Scope:** Codebase-only audit (no live SERP / cached Google data)  
**Repo commit referenced:** `6cb6f4e` (main)  
**Audit date:** 22 July 2026  
**Mode:** AUDIT ONLY — no code was modified as part of the original audit  

---

## Executive scores

| Pillar | Score |
|--------|------:|
| Metadata | 72 / 100 |
| Schema | 78 / 100 |
| Internal linking | 70 / 100 |
| Content quality | 68 / 100 |
| **Overall SEO** | **71 / 100** |

### Primary finding

Homepage H1 and `hero.primaryKeyword` target **“buy Instagram followers”**, the same commercial query that should be owned by `/buy-instagram-followers`. This is the highest-severity keyword cannibalization in the codebase.

---

## PART 1 — Page inventory (indexable)

Domain base: `https://instantviral.ca`

| URL | Page type | Primary intent |
|-----|-----------|----------------|
| `/` | Home | Commercial (currently Instagram-followers skewed) |
| `/buy-instagram-followers` | Service | Transactional / Commercial |
| `/buy-instagram-likes` | Service | Transactional / Commercial |
| `/buy-instagram-views` | Service | Transactional / Commercial |
| `/buy-instagram-comments` | Service | Transactional / Commercial |
| `/buy-tiktok-followers` | Service | Transactional / Commercial |
| `/buy-tiktok-likes` | Service | Transactional / Commercial |
| `/buy-tiktok-views` | Service | Transactional / Commercial |
| `/buy-youtube-subscribers` | Service | Transactional / Commercial |
| `/buy-youtube-views` | Service | Transactional / Commercial |
| `/buy-facebook-followers` | Service | Transactional / Commercial |
| `/buy-facebook-page-likes` | Service | Transactional / Commercial |
| `/buy-facebook-post-likes` | Service | Transactional / Commercial |
| `/about` | Static / Company | Navigational / Trust |
| `/contact` | Static / Support | Navigational |
| `/faq` | Static / Support | Informational / Navigational |
| `/reviews` | Static / Trust | Commercial / Social proof |
| `/track-order` | Static / Support | Navigational / Utility |
| `/learn` | Learn hub | Informational |
| `/learn/instagram` | Learn category | Informational |
| `/learn/tiktok` | Learn category | Informational |
| `/learn/facebook` | Learn category | Informational |
| `/learn/youtube` | Learn category | Informational |
| `/learn/social-media-marketing` | Learn category | Informational |
| `/learn/guides` | Learn category | Informational |
| `/learn/{article-slug}` × 56 | Learn article | Informational |
| `/learn/tag/{tag}` × active tags | Learn tag | Informational / Navigational |
| `/authors` | Learn / EEAT | Navigational |
| `/authors/instantviral-editorial-team` | Author | EEAT / Navigational |
| `/privacy-policy` | Legal | Navigational |
| `/terms-and-conditions` | Legal | Navigational |
| `/refund-policy` | Legal | Navigational |
| `/cookie-policy` | Legal | Navigational |
| `/disclaimer` | Legal | Navigational |

### Explicitly non-indexable (correct)

| URL / pattern | robots | Sitemap |
|---------------|--------|---------|
| `/services` | noindex, follow | Excluded |
| `/cart` | noindex | Excluded |
| `/checkout` | noindex, nofollow | Excluded |
| `/order-success` | noindex, nofollow | Excluded |
| `/admin/*` | noindex, nofollow | Excluded |
| `/learn/preview/*` | noindex | Disallowed |
| `/track-order/result` | noindex, nofollow | Excluded |
| `/api/*` | — | Disallowed |
| 404 | noindex | Excluded |

**Approx. indexable URL count:** ~85

---

## PART 2 — Keyword map

### Money & core pages

| URL | Primary keyword (as coded) | Secondary keywords | Intent | Conflict | Priority |
|-----|----------------------------|--------------------|--------|----------|----------|
| `/` | buy instagram followers (`hero.primaryKeyword`) | instagram growth services, Instagram Followers Canada | Commercial | YES vs `/buy-instagram-followers` | **P0** |
| `/buy-instagram-followers` | buy instagram followers (registry) / Instagram Followers Packages (page SEO) | instagram followers, ig followers, pricing, plans | Transactional | YES vs home + soft articles | **P0** |
| `/buy-instagram-likes` | buy instagram likes | instagram likes, packages & pricing | Transactional | Soft vs how-to article | P1 |
| `/buy-instagram-views` | buy Instagram views Canada | Reel views, video views, packages | Transactional | Title/H1 mismatch | P1 |
| `/buy-instagram-comments` | buy instagram comments | Instagram comments packages | Transactional | Meta description over-length | P2 |
| `/buy-tiktok-followers` | buy tiktok followers / buy TikTok followers Canada | tiktok followers, packages | Transactional | Soft vs how-to article | P1 |
| `/buy-tiktok-likes` | buy tiktok likes Canada | tiktok likes packages | Transactional | Soft vs how-to article | P2 |
| `/buy-tiktok-views` | buy tiktok views Canada | tiktok views packages | Transactional | Soft vs how-to article | P2 |
| `/buy-youtube-subscribers` | buy youtube subscribers Canada | YouTube subscriber packages | Transactional | Soft vs how-to article | P1 |
| `/buy-youtube-views` | buy youtube views Canada | YouTube views packages | Transactional | Soft vs how-to article | P2 |
| `/buy-facebook-followers` | buy facebook followers Canada | facebook followers packages | Transactional | Soft vs how-to article | P2 |
| `/buy-facebook-page-likes` | buy Facebook likes Canada (hero) — registry: buy facebook page likes | Facebook Page Likes, Real Facebook Likes | Transactional | YES vs post-likes + generic “likes” | **P0** |
| `/buy-facebook-post-likes` | buy facebook post likes Canada | Facebook post likes packages | Transactional | At risk from page-likes generic title | **P0** |
| `/about` | About InstantViral | Canadian growth provider, since 2018 | Navigational | None | P3 |
| `/contact` | Contact InstantViral | support, order enquiries | Navigational | None | P3 |
| `/faq` | InstantViral FAQ | orders, delivery, payments, support | Informational | FAQ copy overlap | P2 |
| `/reviews` | Reviews \| InstantViral (weak) | testimonials, social proof | Commercial / Trust | Weak differentiation | P2 |
| `/track-order` | Track Your Order | order ID, status | Navigational | Utility indexable (OK) | P3 |
| `/learn` | Learn / social media growth strategies | Instagram, TikTok, YouTube, Facebook guides | Informational | None material | P2 |

### Service registry primaries (`data/services.ts`)

| Slug | Registry primaryKeyword |
|------|-------------------------|
| buy-instagram-followers | buy instagram followers |
| buy-instagram-likes | buy instagram likes |
| buy-instagram-views | buy instagram views |
| buy-instagram-comments | buy instagram comments |
| buy-tiktok-followers | buy tiktok followers |
| buy-tiktok-likes | buy tiktok likes |
| buy-tiktok-views | buy tiktok views |
| buy-youtube-subscribers | buy youtube subscribers |
| buy-youtube-views | buy youtube views |
| buy-facebook-followers | buy facebook followers |
| buy-facebook-page-likes | buy facebook page likes |
| buy-facebook-post-likes | buy facebook post likes |

### Learn articles (56) — pattern

Articles use `seo.title` + `keywords[0]` as de-facto primary. Most are correctly **informational** (“How to…”, “Guide”, “Algorithm”, “Organic vs Paid”).

**Highest cluster risk (Instagram followers / organic growth):**

- `/learn/how-to-grow-instagram-followers-organically`
- `/learn/how-to-get-more-instagram-followers-without-ads`
- `/learn/complete-instagram-growth-guide`

**Soft service overlap (how-to vs buy):**

| Service | Competing Learn article |
|---------|-------------------------|
| buy-instagram-followers | how-to-get-more-instagram-followers-without-ads (+ organic/growth guides) |
| buy-instagram-likes | how-to-get-more-instagram-likes |
| buy-tiktok-followers | how-to-get-more-tiktok-followers |
| buy-tiktok-likes | how-to-get-more-tiktok-likes |
| buy-tiktok-views | how-to-get-more-tiktok-views |
| buy-youtube-subscribers | how-to-get-more-youtube-subscribers |
| buy-youtube-views | how-to-get-more-youtube-views |
| buy-facebook-followers | how-to-get-more-facebook-followers |
| buy-facebook-page-likes | how-to-get-more-facebook-page-likes |

### Current service titles & H1s (from content)

| URL | Meta title | Chars | H1 |
|-----|------------|------:|----|
| `/buy-instagram-followers` | Instagram Followers Packages & Pricing \| InstantViral | 53 | Instagram Followers Packages |
| `/buy-instagram-likes` | Instagram Likes Packages & Pricing \| InstantViral | 49 | Instagram Likes Packages |
| `/buy-instagram-views` | Buy Instagram Views for Reels & Video Reach \| InstantViral | 58 | Buy Instagram Views Canada |
| `/buy-instagram-comments` | Buy Instagram Comments Packages \| InstantViral Canada | 53 | Buy Instagram Comments Canada |
| `/buy-tiktok-followers` | Buy TikTok Followers Canada \| InstantViral | 42 | Buy TikTok Followers Canada |
| `/buy-tiktok-likes` | Buy TikTok Likes Canada \| InstantViral | 38 | Buy TikTok Likes Canada |
| `/buy-tiktok-views` | Buy TikTok Views Canada \| InstantViral | 38 | Buy TikTok Views Canada |
| `/buy-youtube-subscribers` | Buy YouTube Subscribers Canada \| Packages & Pricing | 51 | Buy YouTube Subscribers Canada |
| `/buy-youtube-views` | Buy YouTube Views Canada \| Packages & Pricing | 45 | Buy YouTube Views Canada |
| `/buy-facebook-followers` | Buy Facebook Followers Canada \| Packages & Pricing | 50 | Buy Facebook Followers Canada |
| `/buy-facebook-page-likes` | Buy Facebook Likes Canada \| Packages & Pricing | 46 | Buy Facebook Likes Canada |
| `/buy-facebook-post-likes` | Buy Facebook Post Likes Canada \| Packages & Pricing | 51 | Buy Facebook Post Likes Canada |
| `/` | InstantViral \| Social Media Growth Services | 48 | Buy Instagram Followers with Confidence |

---

## PART 3 — Keyword cannibalization

| Keyword / theme | Page A | Page B | Conflict | Severity | Who should own | Other page should target |
|-----------------|--------|--------|----------|----------|----------------|--------------------------|
| buy instagram followers | `/` | `/buy-instagram-followers` | Home H1 + primaryKeyword match service money query | **Critical** | `/buy-instagram-followers` | Home: multi-platform brand (e.g. social media growth Canada / InstantViral) |
| buy facebook likes / facebook likes Canada | `/buy-facebook-page-likes` | `/buy-facebook-post-likes` | Page-likes title/H1 omit “Page” | **Critical** | Page-likes → “buy facebook page likes Canada” | Post-likes keeps “post likes”; never use bare “Facebook Likes” |
| Instagram Followers Packages vs buy instagram followers | Title/H1 on service | Registry primaryKeyword on same URL | Split on-page signals | **High** | Align title/H1/meta/schema to one primary | N/A — same URL consistency fix |
| Grow Instagram Followers / organic IG growth | how-to-grow-…-organically | without-ads + complete-instagram-growth-guide | Three near-identical informational themes | **High** | Organically = “grow Instagram followers organically” | Without-ads → unpaid tactics; Complete guide → broad pillar only |
| get more Instagram likes vs buy | `/buy-instagram-likes` | `/learn/how-to-get-more-instagram-likes` | Transactional vs informational SERP overlap | **Medium** | Service owns “buy instagram likes” | Article: organic “increase Instagram likes” |
| get more TikTok / YouTube / Facebook metrics vs buy | Matching `/buy-*` | Matching `/learn/how-to-get-more-*` | Same pattern across platforms | **Medium** | Services own buy-{platform}-{metric} | Articles: organic/how-to modifiers only |
| Instagram growth / guides | `/learn/instagram` | `/learn/complete-instagram-growth-guide` | Hub vs pillar | **Low–Med** | Category = browse hub | Article = long-form pillar |
| Guides vs Social Media Marketing | `/learn/guides` | `/learn/social-media-marketing` | Overlapping taxonomy | **Medium** | SMM = strategy cluster | Guides = how-to/process OR merge/noindex one |
| followers tag archive | `/learn/tag/followers` | Categories + articles + services | Thin tags compete for head terms | **Medium** | Tags as supporting hubs | Do not target “buy followers”; consider noindex if thin |

---

## PART 4 — Meta title audit

### Flags

| Issue | Examples |
|-------|----------|
| Duplicate titles | None found among 12 service money pages |
| Weak titles | `/` brand-only vs H1 buy-intent; `/reviews` = “Reviews \| InstantViral” |
| Over-optimized / wrong entity | FB page-likes titled “Buy Facebook Likes Canada” |
| Keyword stuffing | Not severe; FB likes generic wording is entity error more than stuffing |
| Brand placement | Mostly `| InstantViral` or `| InstantViral Canada` at end — good |
| Primary KW not front-loaded | IG Followers / Likes titles lead with “Packages & Pricing” |

### CTR notes (qualitative)

- Home title CTR potential ~6/10 (clean brand, weak alignment to H1).
- IG Followers packages title ~7/10 (clear offer, misses “Buy” / Canada consistency).
- TikTok/YouTube “Buy … Canada” titles ~8/10 (strong commercial CTR pattern).

---

## PART 5 — Meta description audit

| Finding | Detail |
|---------|--------|
| Length target | Helper clamps ~140–160 chars |
| Over-length overrides | IG Comments ~183 chars; TikTok followers ~174 |
| Duplicates | No exact duplicates among 12 services |
| Missing | Core pages have descriptions via registry |
| CTR quality | Service copy generally strong (packages, password, checkout) |
| Keyword usage | Present on services; home description is multi-platform (good) but conflicts with H1 |
| Learn risk | Fallback template can create near-duplicate patterns if `article.seo.description` missing |

---

## PART 6 — Headings

| URL | H1 | Issues |
|-----|----|--------|
| `/` | Buy Instagram Followers with Confidence | Single H1 — **cannibalizes** service |
| `/buy-instagram-followers` | Instagram Followers Packages | Missing “Buy” vs registry KW |
| `/buy-facebook-page-likes` | Buy Facebook Likes Canada | Missing “Page” — entity ambiguity |
| `/buy-instagram-views` | Buy Instagram Views Canada | OK H1; title differs (Reels vs Canada) |
| Learn articles | `article.title` | Single H1 pattern OK |
| Legal / About / Contact / FAQ | Page title as H1 | OK — one H1 each |
| Authors index | Authors | OK but thin |

**Multiple H1:** Not observed on main marketing templates (hero uses `as="h1"` once). FAQ items use h3/h4 — correct.

---

## PART 7 — Canonicals

| Check | Result |
|-------|--------|
| Canonical exists | Yes — via `buildCanonicalUrl()` / metadata registry |
| Self-canonical | Yes for registered routes |
| Wrong canonical | None found for approved services / learn articles |
| Duplicate canonical | Not observed |
| Query stripping | Yes — no query/fragment in canonical |
| Trailing slash | Normalized (except `/`) |
| Host | `https://instantviral.ca` |

Legacy permanent redirects in `next.config.ts` correctly consolidate old product/combo URLs into parent service pages.

---

## PART 8 — Schema

### Present

| Surface | Types |
|---------|-------|
| Global (root layout) | Organization, WebSite (+ SearchAction → `/learn?q=`) |
| Home | WebPage, FAQPage |
| Services | WebPage, Service (+ AggregateRating if eligible), Product (+ AggregateOffer when packages exist), BreadcrumbList, FAQPage, Review nodes |
| Learn articles | Article / BlogPosting + Breadcrumb |
| Categories / tags / authors | CollectionPage (+ Person on author) |
| Contact | ContactPage |

### Issues

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| Dual **Service + Product** on same URL | Medium | Pick one primary commercial type for rich-result clarity |
| `minimumAggregateCount = 1` | Medium | Raise threshold for credible AggregateRating |
| HowTo builder stubbed (`null`) | Low–Med | Emit HowTo only on eligible how-to articles, or leave intentionally off |
| `serviceType` = primaryKeyword string | Low | Acceptable; not a formal schema.org enum |
| Only organizational author | Medium (EEAT) | Named experts would strengthen Learn EEAT |

---

## PART 9 — Internal linking

### Strengths

- Navbar mega-menus + footer cover all 12 services and learn hubs.
- Homepage chrome effectively links all `SITEMAP_PRODUCTION_ROUTES`.
- Related services (same platform) wired via link registry.
- Footer Resources column includes Learn categories.

### Issues

| Finding | Detail | Severity |
|---------|--------|----------|
| Excessive outbound | Home `relatedArticles` = every learn article | Medium |
| Phantom platform hubs | Registry slugs `instagram` / `tiktok` / … vs public `/learn/{platform}` | Medium |
| Orphans | Core sitemap set unlikely orphaned; tag pages depend on `/learn` discovery | Low |
| Anchor text | Footer/nav use full “Buy …” labels — OK for services; watch over-optimization | Low |
| `/services` | Active in link registry but noindex — OK if UI does not push it hard | Info |

### Homepage authority flow

Home → featured services + all production sitemap routes (via chrome) → strong commercial equity distribution. Learn articles receive equity from footer categories and per-service related-article lists.

---

## PART 10 — Search intent

| URL | Keyword intent | Page intent | Match? |
|-----|----------------|-------------|--------|
| `/` | Transactional (buy IG followers) | Should be commercial brand hub | **Mismatch** |
| `/buy-*` | Transactional | Package / order pages | Match |
| `/learn/how-to-get-more-*` | Informational | Guides + service CTAs | Mostly match — watch buy-bleed in titles |
| `/faq` | Informational | Support FAQ | Match |
| `/reviews` | Commercial investigation | Social proof | Match (title weak) |
| `/track-order` | Navigational | Utility | Match |

---

## PART 11 — Content uniqueness

| Issue | Evidence |
|-------|----------|
| Repeated FAQs | `data/content/faq.ts` — password, gradual delivery, refill, money-back, tracking repeated across home / service / hub sets |
| Repeated trust / CTAs | “No password”, “Public URL only”, “Order tracking”, “Secure checkout” across home + all services |
| Learn bodies | Long-form, largely unique — risk is topical overlap, not verbatim clone |
| Thin pages | `/authors` (single org author), tag archives (list-heavy), `/learn/guides` vs SMM overlap |

---

## PART 12 — Indexability

| Control | Status | Notes |
|---------|--------|-------|
| `robots.ts` | OK | Disallows cart, checkout, admin, api, preview, draft, search, track-order/result, learn/preview |
| `sitemap.ts` | OK | Allowlist + learn/authors/tags when enabled; excludes `/services` |
| noindex `/services` | OK | Explicit metadata |
| Canonicals | OK | Self-canonical absolute URLs |
| Redirects | OK | Legacy → parent services (permanent) |
| 404 | OK | `noIndexMetadata` |
| Track-order indexable | Watch | Utility in sitemap — usually fine for branded queries |

---

## PART 13 — EEAT

### Present

- About page (since 2018 narrative; avoids invented awards)
- Contact form + support paths
- Reviews page
- Full legal set (privacy, terms, refund, cookies, disclaimer)
- Trust labels on home/services
- Organizational Learn author (InstantViral Editorial Team)
- Order tracking

### Gaps

- No named individual expert authors
- Limited public business-identity depth beyond config-driven contact fields
- Review schema can fire with very low review count
- Social proof claims (e.g. “Trusted by Thousands”) need evidence alignment

---

## PART 14 — Final report summary

### Scores (repeat)

- Metadata: **72/100**
- Schema: **78/100**
- Internal linking: **70/100**
- Content quality: **68/100**
- Overall: **71/100**

### Engineer handoff — recommended fix order (not implemented)

1. **Retarget homepage** — change H1, `hero.primaryKeyword`, and primary CTA away from “buy Instagram followers”; keep meta as multi-platform brand.
2. **Rename FB page-likes** title/H1/primaryKeyword to include **“Page”**; never use bare “Facebook Likes” for either FB likes service.
3. **Unify `/buy-instagram-followers`** signals (title, H1, registry primaryKeyword, schema name) to one chosen primary.
4. **Differentiate** the three Instagram organic-growth Learn URLs (unique primary KW each; cross-link as cluster).
5. **Enforce buy vs how-to firewall** — services own “buy X”; articles own “how to get more / grow organically X”.
6. **Deduplicate FAQ corpus**; trim home link-registry `relatedArticles` blast; resolve platform hub slug vs `/learn/{platform}`.
7. **Schema** — choose Service or Product as primary; raise aggregate review minimum; evaluate HowTo / tag indexation.

---

## Sources inspected (codebase)

- `data/seo/metadata-registry.ts`
- `seo/titles.ts`, `seo/descriptions.ts`
- `data/services.ts`
- `data/content/homepage.ts`, `instagram.ts`, `tiktok.ts`, `youtube.ts`, `facebook.ts`, `company.ts`, `faq.ts`
- `data/learn/articles/*`, `data/learn/categories.ts`, `data/learn/tags.ts`
- `data/linking/registry.ts`, `data/footer.ts`
- `app/robots.ts`, `app/sitemap.ts`, `data/seo/sitemap-routes.ts`
- `schemas/*`, `config/review-schema.ts`
- `next.config.ts` redirects, `middleware.ts` host rules

**Not used:** cached Google results, live rendered HTML outside the repository.

---

*End of audit report.*
