# InstantViral v2

# Document 05 — SEO Architecture

## Purpose
Define the SEO foundation for every page.

## Objectives
- Maximize organic visibility
- Support Google AI Overviews
- Improve Core Web Vitals
- Create scalable metadata

## URL Strategy
- Lowercase
- Hyphen-separated
- Canonical URL for every page
- No query parameter indexing

## Metadata
Each page must define:
- title
- description
- canonical
- robots
- Open Graph
- Twitter Card

Use generateMetadata() in Next.js.

## Title Formula
Homepage:
InstantViral | Social Media Growth Services

Service:
Buy {Platform} {Service} | InstantViral

Learn:
{Article Title} | Learn | InstantViral

## Meta Description
Unique per page.
140–160 characters.
Include primary keyword naturally.

## Canonical
Self-referencing canonical on every indexable page.

## Robots
Index commercial and learn pages.
Noindex:
- cart
- checkout
- search
- error pages

## Sitemap
Include:
- homepage
- services
- learn
- company
Exclude noindex pages.

## Robots.txt
Allow crawling.
Reference sitemap.xml.

## Schema
Implement:
- Organization
- WebSite
- WebPage
- BreadcrumbList
- FAQPage
- Article
- Product/Service
- Review
- AggregateRating
- ImageObject
- VideoObject (future)

Use JSON-LD.

## Images
Descriptive filenames.
Alt text required.
next/image only.

## Internal Linking
Homepage -> Services
Services -> Related Services
Services -> Learn
Learn -> Services
FAQ -> Relevant services

## Breadcrumbs
Home > Platform > Service
Home > Learn > Article

## Core Web Vitals
LCP <2.5s
CLS <0.1
INP <200ms

## AI Search
Write factual content.
Use clear headings.
Answer common questions.
Support FAQ schema.
Cite first-party expertise where applicable.

## Acceptance Checklist
- Metadata implemented
- Canonicals
- Sitemap
- Robots
- JSON-LD helpers
- Breadcrumb strategy
- Internal linking plan
- Ready for content implementation
