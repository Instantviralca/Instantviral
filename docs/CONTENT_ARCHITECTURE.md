# InstantViral Learn Center — Content Architecture

**Status:** Permanent rulebook  
**Effective:** 2026-07-13  
**Scope:** Learn Center SEO content strategy only  
**Does not modify:** UI, service page templates, checkout, or live article bodies  

This document controls every future Learn article. No article may ship if it violates these rules.

Related runtime docs (do not replace this rulebook):

- `docs/15_Learn_Center/20_Keyword_Cannibalization_Fix.md` — Phase 20 intent ladder
- `docs/16_Content_Production/16.01_SEO_Content_Production_Plan.md` — production pipeline
- `data/content-plan/` — planning seeds (must remain consistent with this architecture)

---

## 1. Search intent (only three content types)

Every public URL is exactly one of the following.

### A. Commercial pages (service pages)

| Rule | Requirement |
|------|-------------|
| Purpose | Sell services |
| Own | All **buy** / transactional keywords for that service |
| URL | `/{buy-platform-metric}` (root, not `/learn`) |
| CTA | Primary conversion |
| Learn role | Receive authority from articles; never compete with Learn titles |

**Examples (live or planned):**

- Buy Instagram Followers → `/buy-instagram-followers`
- Buy TikTok Followers → `/buy-tiktok-followers`
- Buy YouTube Views → `/buy-youtube-views`
- Buy Facebook Likes → `/buy-facebook-page-likes` or `/buy-facebook-post-likes`
- Buy Spotify Plays → `/buy-spotify-plays` *(future service — cluster reserved)*

**Hard rule:** Learn articles must **never** use a primary keyword that starts with `buy` or mirrors a service primary keyword (e.g. `buy instagram followers`).

### B. Informational articles (Learn)

| Rule | Requirement |
|------|-------------|
| Purpose | Teach |
| Own | How-to, guide, tips, algorithm, strategy, checklist keywords |
| URL | `/learn/{slug}` |
| CTA | Optional, soft, after education |
| Must not | Target the same primary keyword as any commercial page |

**Examples:**

- How to Get More Instagram Followers
- Instagram Algorithm Guide
- Instagram Content Strategy
- TikTok Marketing Tips
- YouTube SEO Guide

**Subtype (decision / “worth it”):** Still **informational**. Titles like “Are X Worth Buying?” educate; they do **not** own `buy x` keywords. Soft link to the service page only after trade-offs are explained.

### C. Comparison articles (Learn)

| Rule | Requirement |
|------|-------------|
| Purpose | Help users decide between metrics, formats, or approaches |
| Own | `vs`, `difference between`, `organic vs paid` style keywords |
| URL | `/learn/{slug}` |
| Links | Both related informational articles **and** relevant commercial pages |

**Examples:**

- Instagram Followers vs Likes
- Organic vs Paid Growth
- TikTok Followers vs Views
- Instagram Reels vs Posts

---

## 2. Keyword ownership

| Keyword pattern | Owner | Forbidden on |
|-----------------|-------|--------------|
| `buy {platform} {metric}` | Commercial service page | Learn primary + H1 |
| `{platform} {metric} for sale` / cheap / fast delivery transactional | Commercial | Learn primary |
| `how to get more {platform} {metric}` | Informational Learn | Commercial H1 as primary |
| `{platform} algorithm` / content strategy / tips / checklist | Informational Learn | Commercial |
| `{a} vs {b}` / organic vs paid | Comparison Learn | Commercial primary |
| `are {platform} {metric} worth buying` | Informational (decision) Learn | Commercial primary |

**One primary keyword → one live URL.**  
If two drafts share a primary keyword, one must be killed, merged, or retargeted before publish.

### Live InstantViral ownership (as of 2026-07-13)

| Primary keyword | Owner URL | Type |
|-----------------|-----------|------|
| buy instagram followers | `/buy-instagram-followers` | Commercial |
| how to get more instagram followers | `/learn/how-to-get-more-instagram-followers` | Informational |
| instagram followers vs likes | `/learn/instagram-followers-vs-likes` | Comparison |
| are instagram followers worth buying | `/learn/are-instagram-followers-worth-buying` | Informational |

---

## 3. Topical clusters

Each cluster must eventually contain: commercial pages (when the service exists), supporting informational articles, comparison articles, and bidirectional internal links.

### Platform clusters

| Cluster ID | Name | Learn category | Commercial pages (live / future) |
|------------|------|----------------|----------------------------------|
| `instagram` | Instagram | Instagram | Followers, Likes, Views, Comments |
| `tiktok` | TikTok | TikTok | Followers, Likes, Views, Comments, Shares |
| `youtube` | YouTube | YouTube | Subscribers, Views |
| `facebook` | Facebook | Facebook | Followers, Page Likes, Post Likes |
| `spotify` | Spotify | General Social Media *(until Spotify category ships)* | Plays, Followers, Monthly Listeners *(future)* |
| `telegram` | Telegram | General Social Media | Members, Post Views *(future)* |
| `discord` | Discord | General Social Media | Members *(future)* |
| `twitter-x` | Twitter / X | General Social Media | Followers, Likes, Retweets, Views *(future)* |
| `linkedin` | LinkedIn | General Social Media | Followers, Connections, Reactions *(future)* |
| `threads` | Threads | General Social Media | Followers, Likes *(future)* |
| `general-social` | General Social Media | General Social Media | Cross-platform strategy (no single `buy` owner) |

### Sub-clusters (Instagram example — replicate pattern per platform)

1. **Growth** — followers, profile, algorithm, organic vs paid  
2. **Engagement** — likes, comments, saves, shares, Reels  
3. **Content** — strategy, calendar, captions, Reels vs posts  
4. **Measurement** — Insights, metrics, audits  

---

## 4. Intent ladder (mandatory linking model)

Authority flows **up** toward commercial pages. Education flows **down** toward broader decision content.

```text
Commercial service page
        ↑
Informational how-to / guide (supports that service)
        ↑
Comparison article (metrics / approaches)
        ↑
Decision / “worth it” informational (optional)
```

**Instagram Followers ladder (live):**

```text
/buy-instagram-followers
        ↑
/learn/how-to-get-more-instagram-followers
        ↑
/learn/instagram-followers-vs-likes
        ↑
/learn/are-instagram-followers-worth-buying
```

Replicate this ladder for every major service metric (likes, views, subscribers, etc.).

---

## 5. Internal linking rules

1. **Commercial pages receive authority** from Learn articles via contextual links and related-service cards.  
2. **Informational articles** link naturally to **one primary** supporting service (after education).  
3. **Comparison articles** link to **both** compared concepts’ educational pages **and** relevant service pages.  
4. **No orphan pages** — every Learn article must have ≥1 inbound Learn link and ≥1 outbound link (Learn or service).  
5. **No reciprocal spam** — do not force identical footer link blocks on every page; prefer in-body contextual links.  
6. **Never** give a Learn article the same H1 / primary keyword as its linked service page.  
7. Soft CTAs only on informational / decision pieces (“if this matches your goals…”). Hard sell CTAs belong on commercial pages.

---

## 6. URL structure

| Type | Pattern | Example |
|------|---------|---------|
| Service | `/buy-{platform}-{metric}` | `/buy-instagram-followers` |
| Informational Learn | `/learn/{descriptive-slug}` | `/learn/how-to-get-more-instagram-followers` |
| Comparison Learn | `/learn/{a}-vs-{b}` | `/learn/instagram-followers-vs-likes` |
| Category hub | `/learn/{category}` | `/learn/instagram` |
| Learn hub | `/learn` | `/learn` |

**Slug rules:**

- Lowercase kebab-case  
- No `buy-` prefix on Learn slugs  
- No geo-modifiers that turn Learn into a fake service page (`…-canada` as commercial intent)  
- Slug must match content package folder name under `content/{platform-or-topic}/{slug}/`

---

## 7. Category structure (Learn)

Active / required categories for planning:

| Category | Use for |
|----------|---------|
| Instagram | All Instagram Learn articles |
| TikTok | All TikTok Learn articles |
| YouTube | All YouTube Learn articles |
| Facebook | All Facebook Learn articles |
| Spotify | Spotify-specific Learn *(activate when cluster launches)* |
| General Social Media | Cross-platform, Telegram, Discord, X, LinkedIn, Threads until dedicated categories exist |

Author for InstantViral editorial Learn articles: **InstantViral Editorial Team** (no invented individual bylines).

---

## 8. Content standards (every future article)

Before an article can be marked publish-ready it **must** include:

| Requirement | Notes |
|-------------|-------|
| SEO Title | Unique; matches intent; does not clone a service title |
| Meta Description | Unique; ~150–160 chars; no false guarantees |
| Slug | Unique; matches package folder |
| Primary Keyword | Unique across all live URLs |
| Secondary Keywords | 3–6; must not be another page’s primary |
| Internal Links | Ladder-compliant (up + down where applicable) |
| FAQ | ≥3 questions; schema-eligible answers where accurate |
| Article Schema | Via Learn SEO system |
| Reading Time | Computed from body |
| Table of Contents | From H2/H3 structure |
| Image Production Instructions | Original InstantViral illustrations; WebP; no stock |
| Conclusion | Educational close; soft CTA only if appropriate |

**Also required in editorial package:** key takeaways, related articles, related services (approved slugs only), changelog entry.

**Forbidden:**

- Primary keyword cannibalization  
- Guaranteed ranking / monetization / “instant fame” claims  
- Password-required ordering instructions  
- Hotlinked copyrighted screenshots without rights  
- Targeting skipped / unapproved service slugs as CTAs  

---

## 9. Content map

Columns: Topic · Primary Keyword · Intent · Supporting Page · Cluster · Priority · Difficulty · Status  

**Intent values:** `commercial` | `informational` | `comparison`  
**Priority:** High / Medium / Low  
**Difficulty:** Low / Medium / High (competitive SERP estimate)  
**Status:** Published | Planned | Reserved (no service yet)

### 9.1 Live commercial pages (keyword owners)

| Topic | Primary Keyword | Intent | Supporting Page | Cluster | Priority | Difficulty | Status |
|-------|-----------------|--------|-----------------|---------|----------|------------|--------|
| Buy Instagram Followers | buy instagram followers | commercial | — | instagram | High | High | Published |
| Buy Instagram Likes | buy instagram likes | commercial | — | instagram | High | High | Published |
| Buy Instagram Views | buy instagram views | commercial | — | instagram | Medium | Medium | Published |
| Buy Instagram Comments | buy instagram comments | commercial | — | instagram | Medium | Medium | Published |
| Buy TikTok Followers | buy tiktok followers | commercial | — | tiktok | High | High | Published |
| Buy TikTok Likes | buy tiktok likes | commercial | — | tiktok | High | Medium | Published |
| Buy TikTok Views | buy tiktok views | commercial | — | tiktok | High | High | Published |
| Buy YouTube Subscribers | buy youtube subscribers | commercial | — | youtube | High | High | Published |
| Buy YouTube Views | buy youtube views | commercial | — | youtube | High | High | Published |
| Buy Facebook Followers | buy facebook followers | commercial | — | facebook | High | Medium | Published |
| Buy Facebook Page Likes | buy facebook page likes | commercial | — | facebook | High | Medium | Published |
| Buy Facebook Post Likes | buy facebook post likes | commercial | — | facebook | Medium | Medium | Published |

### 9.2 Registered Learn articles (draft — not public)

All Instagram Learn records currently in `data/learn/articles/` are **editorial drafts**.

| Gate | Rule |
|------|------|
| Public visibility | `status` is `published` or `updated` **and** `editorialApproved: true` |
| Indexing | Drafts use `seo.noindex: true` → `noindex, nofollow` |
| Sitemap / Learn listings / search | Driven by `isPublicLiveArticle()` — drafts excluded |

Do **not** treat registered drafts as live production content. Preserve source files for future rewriting; do not expand or auto-rewrite them.

| Topic | Primary Keyword | Intent | Cluster | Status |
|-------|-----------------|--------|---------|--------|
| How to Get More Instagram Followers | how to get more instagram followers | informational | instagram | Draft |
| Instagram Followers vs Likes | instagram followers vs likes | comparison | instagram | Draft |
| Are Instagram Followers Worth Buying? | are instagram followers worth buying | informational | instagram | Draft |
| Instagram Algorithm Explained | instagram algorithm explained | informational | instagram | Draft |
| How to Increase Instagram Engagement | how to increase instagram engagement | informational | instagram | Draft |
| (+ 15 additional Instagram drafts) | — | informational | instagram | Draft |

### 9.3 Instagram backlog (~25)

| Topic | Primary Keyword | Intent | Supporting Page | Cluster | Priority | Difficulty | Status |
|-------|-----------------|--------|-----------------|---------|----------|------------|--------|
| How the Instagram Algorithm Works | how the instagram algorithm works | informational | /buy-instagram-followers | instagram | High | High | Planned |
| Instagram Profile Optimization Guide | instagram profile optimization | informational | /buy-instagram-followers | instagram | High | Medium | Planned |
| How to Increase Instagram Engagement | how to increase instagram engagement | informational | /buy-instagram-likes | instagram | High | High | Planned |
| How to Get More Likes on Instagram | how to get more likes on instagram | informational | /buy-instagram-likes | instagram | High | Medium | Planned |
| How to Get More Views on Instagram Videos | how to get more views on instagram videos | informational | /buy-instagram-views | instagram | High | Medium | Planned |
| How to Get More Comments on Instagram | how to get more comments on instagram | informational | /buy-instagram-comments | instagram | Medium | Medium | Planned |
| Instagram Content Strategy for Small Businesses | instagram content strategy for small businesses | informational | /buy-instagram-followers | instagram | High | Medium | Planned |
| Best Time to Post on Instagram | best time to post on instagram | informational | /buy-instagram-followers | instagram | Medium | High | Planned |
| Instagram Reels vs Posts | instagram reels vs posts | comparison | /buy-instagram-views | instagram | High | Medium | Planned |
| Organic vs Paid Instagram Growth | organic vs paid instagram growth | comparison | /buy-instagram-followers | instagram | High | Medium | Planned |
| Instagram Growth Mistakes to Avoid | instagram growth mistakes to avoid | informational | /buy-instagram-followers | instagram | Medium | Low | Planned |
| How to Measure Instagram Growth | how to measure instagram growth | informational | /buy-instagram-followers | instagram | Medium | Low | Planned |
| Instagram Hashtag Strategy Guide | instagram hashtag strategy | informational | /buy-instagram-followers | instagram | Medium | Medium | Planned |
| How to Grow Instagram with Reels | how to grow instagram with reels | informational | /buy-instagram-views | instagram | High | Medium | Planned |
| Instagram Stories Strategy | instagram stories strategy | informational | /buy-instagram-views | instagram | Medium | Low | Planned |
| How to Get More Instagram Saves | how to get more instagram saves | informational | /buy-instagram-likes | instagram | Medium | Low | Planned |
| Instagram Carousel Content Guide | instagram carousel content ideas | informational | /buy-instagram-followers | instagram | Medium | Low | Planned |
| Instagram Bio Examples That Convert | instagram bio examples | informational | /buy-instagram-followers | instagram | Medium | Medium | Planned |
| Instagram Followers vs Engagement Rate | instagram followers vs engagement rate | comparison | /buy-instagram-followers | instagram | Medium | Medium | Planned |
| Are Instagram Likes Worth Buying? | are instagram likes worth buying | informational | /buy-instagram-likes | instagram | Medium | Medium | Planned |
| Instagram Shadowban Myths Explained | instagram shadowban myths | informational | /buy-instagram-followers | instagram | Low | Medium | Planned |
| How to Use Instagram Insights | how to use instagram insights | informational | /buy-instagram-followers | instagram | Medium | Low | Planned |
| Instagram for Local Businesses | instagram for local businesses | informational | /buy-instagram-followers | instagram | Medium | Medium | Planned |
| Instagram vs TikTok for Brands | instagram vs tiktok for brands | comparison | /learn (cross) | instagram | Medium | Medium | Planned |
| How to Build an Instagram Content Calendar | instagram content calendar | informational | /buy-instagram-followers | instagram | Medium | Low | Planned |

### 9.4 TikTok backlog (~20)

| Topic | Primary Keyword | Intent | Supporting Page | Cluster | Priority | Difficulty | Status |
|-------|-----------------|--------|-----------------|---------|----------|------------|--------|
| How to Get More TikTok Followers | how to get more tiktok followers | informational | /buy-tiktok-followers | tiktok | High | High | Planned |
| How to Get More Views on TikTok | how to get more views on tiktok | informational | /buy-tiktok-views | tiktok | High | High | Planned |
| How to Get More Likes on TikTok | how to get more likes on tiktok | informational | /buy-tiktok-likes | tiktok | High | Medium | Planned |
| How the TikTok Algorithm Works | how the tiktok algorithm works | informational | /buy-tiktok-followers | tiktok | High | High | Planned |
| TikTok SEO Guide | tiktok seo guide | informational | /buy-tiktok-views | tiktok | High | Medium | Planned |
| TikTok Content Strategy for Beginners | tiktok content strategy for beginners | informational | /buy-tiktok-followers | tiktok | High | Medium | Planned |
| Best Time to Post on TikTok | best time to post on tiktok | informational | /buy-tiktok-views | tiktok | Medium | High | Planned |
| TikTok Followers vs Views | tiktok followers vs views | comparison | /buy-tiktok-followers + /buy-tiktok-views | tiktok | High | Medium | Planned |
| TikTok Likes vs Comments | tiktok likes vs comments | comparison | /buy-tiktok-likes | tiktok | Medium | Low | Planned |
| Organic vs Paid TikTok Growth | organic vs paid tiktok growth | comparison | /buy-tiktok-followers | tiktok | High | Medium | Planned |
| Are TikTok Followers Worth Buying? | are tiktok followers worth buying | informational | /buy-tiktok-followers | tiktok | High | Medium | Planned |
| How to Go Viral on TikTok (Realistically) | how to go viral on tiktok | informational | /buy-tiktok-views | tiktok | Medium | High | Planned |
| TikTok Hooks That Keep Viewers Watching | tiktok video hooks | informational | /buy-tiktok-views | tiktok | Medium | Medium | Planned |
| TikTok Hashtag Strategy | tiktok hashtag strategy | informational | /buy-tiktok-views | tiktok | Medium | Medium | Planned |
| How to Increase TikTok Engagement | how to increase tiktok engagement | informational | /buy-tiktok-likes | tiktok | High | Medium | Planned |
| TikTok for Small Business | tiktok for small business | informational | /buy-tiktok-followers | tiktok | Medium | Medium | Planned |
| TikTok Analytics Guide | tiktok analytics guide | informational | /buy-tiktok-views | tiktok | Medium | Low | Planned |
| TikTok Duets and Collabs Strategy | tiktok collab strategy | informational | /buy-tiktok-followers | tiktok | Low | Low | Planned |
| Why Your TikTok Is Not Getting Views | why tiktok videos get no views | informational | /buy-tiktok-views | tiktok | Medium | Medium | Planned |
| TikTok Sounds and Trends Guide | tiktok trends strategy | informational | /buy-tiktok-views | tiktok | Low | Medium | Planned |

### 9.5 YouTube backlog (~15)

| Topic | Primary Keyword | Intent | Supporting Page | Cluster | Priority | Difficulty | Status |
|-------|-----------------|--------|-----------------|---------|----------|------------|--------|
| How to Get More YouTube Subscribers | how to get more youtube subscribers | informational | /buy-youtube-subscribers | youtube | High | High | Planned |
| How to Get More Views on YouTube | how to get more views on youtube | informational | /buy-youtube-views | youtube | High | High | Planned |
| YouTube SEO Guide | youtube seo guide | informational | /buy-youtube-views | youtube | High | High | Planned |
| How the YouTube Algorithm Works | how the youtube algorithm works | informational | /buy-youtube-views | youtube | High | High | Planned |
| YouTube Subscribers vs Views | youtube subscribers vs views | comparison | /buy-youtube-subscribers + /buy-youtube-views | youtube | High | Medium | Planned |
| Organic vs Paid YouTube Growth | organic vs paid youtube growth | comparison | /buy-youtube-subscribers | youtube | High | Medium | Planned |
| Are YouTube Subscribers Worth Buying? | are youtube subscribers worth buying | informational | /buy-youtube-subscribers | youtube | High | Medium | Planned |
| How to Write Better YouTube Titles | youtube title best practices | informational | /buy-youtube-views | youtube | Medium | Medium | Planned |
| YouTube Thumbnail Strategy | youtube thumbnail strategy | informational | /buy-youtube-views | youtube | Medium | Medium | Planned |
| How to Increase YouTube Watch Time | how to increase youtube watch time | informational | /buy-youtube-views | youtube | Medium | Medium | Planned |
| YouTube Channel Optimization Checklist | youtube channel optimization | informational | /buy-youtube-subscribers | youtube | Medium | Low | Planned |
| Best Upload Schedule for YouTube | best time to upload on youtube | informational | /buy-youtube-views | youtube | Medium | Medium | Planned |
| YouTube for Small Business | youtube for small business | informational | /buy-youtube-subscribers | youtube | Medium | Low | Planned |
| How to Get More YouTube Likes | how to get more youtube likes | informational | /buy-youtube-views | youtube | Low | Low | Planned |
| YouTube Analytics for Beginners | youtube analytics for beginners | informational | /buy-youtube-views | youtube | Medium | Low | Planned |

### 9.6 Facebook backlog (~10)

| Topic | Primary Keyword | Intent | Supporting Page | Cluster | Priority | Difficulty | Status |
|-------|-----------------|--------|-----------------|---------|----------|------------|--------|
| How to Get More Facebook Followers | how to get more facebook followers | informational | /buy-facebook-followers | facebook | High | Medium | Planned |
| Facebook Page Optimization Guide | facebook page optimization | informational | /buy-facebook-page-likes | facebook | High | Medium | Planned |
| How to Get More Facebook Page Likes | how to get more facebook page likes | informational | /buy-facebook-page-likes | facebook | High | Medium | Planned |
| Facebook Followers vs Page Likes | facebook followers vs page likes | comparison | /buy-facebook-followers + /buy-facebook-page-likes | facebook | High | Low | Planned |
| Organic vs Paid Facebook Growth | organic vs paid facebook growth | comparison | /buy-facebook-followers | facebook | High | Medium | Planned |
| Are Facebook Followers Worth Buying? | are facebook followers worth buying | informational | /buy-facebook-followers | facebook | Medium | Medium | Planned |
| Facebook Content Strategy for Businesses | facebook content strategy for businesses | informational | /buy-facebook-followers | facebook | Medium | Medium | Planned |
| Best Time to Post on Facebook | best time to post on facebook | informational | /buy-facebook-post-likes | facebook | Medium | Medium | Planned |
| How to Increase Facebook Post Engagement | how to increase facebook post engagement | informational | /buy-facebook-post-likes | facebook | Medium | Medium | Planned |
| Facebook Post Engagement Strategy | facebook post engagement strategy | informational | /buy-facebook-post-likes | facebook | Low | Low | Planned |

### 9.7 Spotify backlog (~10) — Reserved until commercial pages exist

| Topic | Primary Keyword | Intent | Supporting Page | Cluster | Priority | Difficulty | Status |
|-------|-----------------|--------|-----------------|---------|----------|------------|--------|
| How to Get More Spotify Plays | how to get more spotify plays | informational | /buy-spotify-plays *(future)* | spotify | High | High | Reserved |
| How to Grow Spotify Followers | how to grow spotify followers | informational | /buy-spotify-followers *(future)* | spotify | High | Medium | Reserved |
| Spotify Algorithm Explained | how the spotify algorithm works | informational | /buy-spotify-plays *(future)* | spotify | High | High | Reserved |
| Spotify Plays vs Monthly Listeners | spotify plays vs monthly listeners | comparison | future Spotify services | spotify | High | Medium | Reserved |
| Are Spotify Plays Worth Buying? | are spotify plays worth buying | informational | /buy-spotify-plays *(future)* | spotify | Medium | Medium | Reserved |
| Organic vs Paid Spotify Promotion | organic vs paid spotify promotion | comparison | /buy-spotify-plays *(future)* | spotify | Medium | Medium | Reserved |
| Spotify for Independent Artists | spotify marketing for independent artists | informational | /buy-spotify-plays *(future)* | spotify | Medium | Medium | Reserved |
| How to Pitch Playlists Ethically | how to get on spotify playlists | informational | /buy-spotify-plays *(future)* | spotify | Medium | High | Reserved |
| Spotify Release Strategy Checklist | spotify release strategy | informational | /buy-spotify-plays *(future)* | spotify | Medium | Low | Reserved |
| Spotify Analytics Guide for Artists | spotify for artists analytics | informational | /buy-spotify-plays *(future)* | spotify | Low | Low | Reserved |

### 9.8 General Social Media backlog (~10)

| Topic | Primary Keyword | Intent | Supporting Page | Cluster | Priority | Difficulty | Status |
|-------|-----------------|--------|-----------------|---------|----------|------------|--------|
| Social Media Growth Strategy for Beginners | social media growth strategy for beginners | informational | /learn + primary services | general-social | High | Medium | Planned |
| How to Build a Social Media Content Plan | how to build a social media content plan | informational | /learn | general-social | High | Medium | Planned |
| Social Media Metrics That Matter | social media metrics that matter | informational | /learn | general-social | High | Medium | Planned |
| Organic vs Paid Social Media Growth | organic vs paid social media growth | comparison | platform how-tos | general-social | High | Medium | Planned |
| How to Choose the Right Social Platform | how to choose a social media platform | informational | /learn | general-social | Medium | Low | Planned |
| Social Media Content Pillars Explained | social media content pillars | informational | /learn | general-social | Medium | Low | Planned |
| How to Measure Social Media ROI | how to measure social media roi | informational | /learn | general-social | Medium | Medium | Planned |
| Common Social Media Growth Mistakes | social media growth mistakes | informational | /learn | general-social | Medium | Low | Planned |
| Cross-Platform Content Repurposing Guide | repurpose content across social media | informational | /learn | general-social | Medium | Medium | Planned |
| Social Proof on Social Media Explained | social proof on social media | informational | /buy-instagram-followers | general-social | Low | Low | Planned |

### 9.9 Future platform seeds (Telegram, Discord, X, LinkedIn, Threads)

Plan **after** commercial pages exist. Until then: cluster reserved; no Learn primary keywords that invent fake `buy` ownership.

| Cluster | First informational | First comparison | First decision |
|---------|---------------------|------------------|----------------|
| telegram | how to grow a telegram channel | telegram members vs post views | are telegram members worth buying |
| discord | how to grow a discord server | discord members vs engagement | are discord members worth buying |
| twitter-x | how to get more twitter followers | twitter followers vs impressions | are twitter followers worth buying |
| linkedin | how to grow linkedin followers | linkedin followers vs engagement | are linkedin followers worth buying |
| threads | how to get more threads followers | threads vs instagram for creators | are threads followers worth buying |

---

## 10. Article backlog summary

| Cluster | Approx. articles | High | Medium | Low | Notes |
|---------|------------------|------|--------|-----|-------|
| Instagram | 25 (+3 live) | 14 | 12 | 2 | Highest priority; ladder already live |
| TikTok | 20 | 11 | 7 | 2 | Start after IG pillars stabilize |
| YouTube | 15 | 7 | 7 | 1 | Pair SEO + subscribers/views |
| Facebook | 10 | 5 | 4 | 1 | Page vs post metrics clarity |
| Spotify | 10 | 4 | 5 | 1 | Reserved until services ship |
| General Social | 10 | 4 | 5 | 1 | Cross-links all clusters |
| Future platforms | seeds only | — | — | — | No publish without commercial owners |

**Total planned Learn rows in this rulebook:** ~90+ (excluding live commercial pages).

---

## 11. Potential keyword conflicts (watchlist)

| Conflict risk | Why | Resolution |
|---------------|-----|------------|
| Learn title contains “Buy …” | Competes with service SERP | Retitle to how-to / worth-it / vs |
| `buy instagram followers canada` style Learn | Geo + buy = fake service page | Informational only; no buy primary |
| Two how-tos: “get more followers” vs “grow following” | Near-duplicate primary | One primary page; other uses distinct angle |
| Comparison vs decision (“vs likes” vs “worth buying likes”) | Overlap if poorly titled | Comparison = difference; decision = trade-offs |
| General “social media growth” vs platform growth | Hub vs spoke | General stays broad; platforms own platform keywords |
| Spotify / Telegram Learn before services | Orphan commercial intent | Keep **Reserved**; no soft `buy` CTAs to 404s |
| Service secondary keyword used as Learn primary | Soft cannibalization | Secondaries never promoted to another URL’s primary |

---

## 12. Recommended publishing order

### Wave 1 — Instagram authority (now)

1. Keep live ladder healthy (already published).  
2. Instagram Algorithm → Profile Optimization → Increase Engagement.  
3. Organic vs Paid Instagram Growth → Reels vs Posts.  
4. How to Get More Likes / Views / Comments (each supports its service).  

### Wave 2 — TikTok parallel

1. How to Get More TikTok Followers (pillar).  
2. Algorithm + TikTok SEO.  
3. Followers vs Views + Are TikTok Followers Worth Buying?  
4. Views / Likes how-tos.  

### Wave 3 — YouTube + Facebook

1. Subscribers + Views how-tos + YouTube SEO.  
2. Subscribers vs Views + Worth Buying.  
3. Facebook Page Optimization + Followers how-to + Followers vs Page Likes.  

### Wave 4 — General Social Media

1. Beginner growth strategy + content plan + metrics.  
2. Organic vs Paid Social Media Growth (links all platform pillars).  

### Wave 5 — Spotify & other platforms

1. Ship commercial pages first.  
2. Then informational → comparison → decision ladder per metric.  

**Cadence suggestion:** 2–4 Learn articles per week max, always completing a ladder step before opening a new cluster.

---

## 13. Governance

1. Every new article brief must declare: **Type** (informational | comparison), **Cluster**, **Primary keyword**, **Supporting commercial page(s)**.  
2. SEO review must verify primary keyword uniqueness against: live services + live Learn + this backlog.  
3. If a brief fails ownership rules, it is blocked — not “fixed in copy later.”  
4. Updates to this file require an explicit changelog entry below.  
5. `data/content-plan` seeds must be reconciled to this architecture when they conflict.

### Changelog

| Date | Change |
|------|--------|
| 2026-07-13 | Initial permanent Learn content architecture created (Phase 20 follow-up). |

---

## 14. Quick checklist (paste into every brief)

- [ ] Type is informational or comparison (not commercial)  
- [ ] Primary keyword not owned by a service page  
- [ ] Primary keyword unique vs all Learn URLs  
- [ ] Cluster + category assigned  
- [ ] Supporting service slug approved / exists  
- [ ] Up-ladder and down-ladder links planned  
- [ ] FAQ, schema, images, TOC, reading time planned  
- [ ] No `buy` in Learn H1 / primary keyword  
- [ ] Soft CTA only (if any) after education  

**End of rulebook.**
