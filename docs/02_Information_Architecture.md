# InstantViral v2

# Document 02 — Information Architecture

## Status
- Version: 1.0
- Status: Draft
- Related: 01_Project_Overview.md

## Purpose
Define the complete information architecture, routing, navigation and data strategy for the website.

# Public Routes

## Homepage
/

## Instagram
/buy-instagram-followers
/buy-instagram-likes
/buy-instagram-views
/buy-instagram-comments

## TikTok
/buy-tiktok-followers
/buy-tiktok-likes
/buy-tiktok-views
/buy-tiktok-comments
/buy-tiktok-shares

## YouTube
/buy-youtube-subscribers
/buy-youtube-views

## Facebook
/buy-facebook-followers
/buy-facebook-page-likes
/buy-facebook-post-likes

## Company
/about
/reviews
/contact

## Support
/faq
/privacy-policy
/refund-policy
/terms-and-conditions

## Learn
/learn
/learn/[slug]

# Navigation

Desktop:
- Home
- Instagram (mega menu)
- TikTok (mega menu)
- YouTube (mega menu)
- Facebook (mega menu)
- Learn
- Reviews
- About
- Contact
- CTA: Get Started

Footer Columns:
- Company
- Instagram
- TikTok
- YouTube
- Facebook
- Resources
- Legal

# URL Rules

- lowercase
- hyphen-separated
- no IDs
- no dates
- no /services/
- one keyword intent per page

# Breadcrumb

Home > Platform > Service

# Internal Linking

Homepage -> All primary service pages

Every service page links to:
- Related services
- Reviews
- FAQ
- Contact
- Relevant Learn articles

Learn articles link back to relevant commercial pages.

# Route Groups (internal only)

app/
- (marketing)
- (learn)
- (legal)

Public URLs must remain clean.

# Data Layer

Create:

data/site.ts
data/platforms.ts
data/services.ts
data/navigation.ts
data/footer.ts

## site.ts

Store:
- site name
- domain
- support email (placeholder)
- social links (placeholder)
- default metadata placeholders

## platforms.ts

Instagram
TikTok
YouTube
Facebook

Each platform contains:
- id
- name
- slug
- icon
- color
- description
- services[]

## services.ts

Each service object:

- id
- platform
- platformSlug
- name
- shortName
- slug
- url
- primaryKeyword
- secondaryKeywords
- category
- pageType
- icon
- themeColor
- description
- breadcrumb
- navigationLabel
- showInNavigation
- showInFooter
- featured
- comingSoon

Implement helper functions:

- getAllServices()
- getFeaturedServices()
- getPlatformServices(platform)
- getServiceBySlug(slug)
- getNavigationServices()
- getFooterServices()

Navbar, footer, breadcrumbs, related services, sitemap and metadata should read from this registry.

## navigation.ts

Main navigation items and mega menu configuration.

## footer.ts

Footer columns and links.

# Placeholder Pages

Every route should include:
- H1 placeholder
- Intro placeholder
- Empty section components
- Shared layout

# Learn Hub

Index page
Dynamic article page
Future categories:
- Instagram
- TikTok
- YouTube
- Facebook

# Engineering Rules

- No hardcoded navigation.
- No duplicate service arrays.
- Data-driven architecture.
- Shared layouts.
- Reusable components.

# Acceptance Checklist

- All routes created
- Shared layout applied
- Navigation data-driven
- Footer data-driven
- Service registry implemented
- Breadcrumb component ready
- Learn routes created
- loading.tsx
- error.tsx
- not-found.tsx
- No production copy
- No final UI
- Ready for Design System

# Cursor Prompt

Read this document completely before coding.

Implement the routing, information architecture and data layer exactly as documented.

Create all routes.

Create the data files.

Refactor navigation and footer to consume the data layer.

Implement route groups internally without changing public URLs.

Generate placeholder pages only.

Do not write marketing copy.

Do not design the UI.

Stop after completing this milestone and provide:
1. Updated folder tree
2. Route list
3. Data layer summary
4. Pending tasks before Design System.
