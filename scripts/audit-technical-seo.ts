/**
 * Technical SEO route audit (Step 4).
 * Hard failures exit non-zero; soft notes print only.
 *
 * Usage: npx tsx scripts/audit-technical-seo.ts
 */

import {
  findDuplicateCanonicals,
  findDuplicateDescriptions,
  findDuplicateTitles,
  getIndexableMetadataEntries,
  getMetadataRegistry,
} from '@/lib/seo/metadata';
import {
  buildSitemapEntries,
  findDuplicateSitemapUrls,
  findIndexableRoutesNotInSitemapAllowlist,
  findNoindexSitemapEntries,
  findOrphanSitemapPages,
  findSkippedRoutesInSitemap,
  findUnsafeInternalLinks,
  getRobotsRules,
  getSitemapUrl,
  validateLastModified,
  validateRobotsRules,
  validateSitemapCanonicals,
} from '@/lib/seo/sitemap';
import { getFooterColumns } from '@/data/footer';
import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { seoSiteConfig } from '@/config/seo';

const bannedInSitemap = [
  '/contact-us',
  '/buy-twitter-followers',
  '/buy-tiktok-followers-likes',
  '/buy-facebook-likes-followers',
  '/buy-youtube-subscribers-views',
  '/checkout',
  '/cart',
  '/order-success',
  '/services',
  '/admin',
  '/track-order/result',
] as const;

const hard: string[] = [];
const soft: string[] = [];

const indexable = getIndexableMetadataEntries();
const registry = getMetadataRegistry();
const sitemap = buildSitemapEntries();
const sitemapPaths = new Set(
  sitemap.map((entry) => {
    try {
      return new URL(entry.url).pathname.replace(/\/$/, '') || '/';
    } catch {
      return String(entry.url);
    }
  }),
);

console.log(`Canonical host: ${seoSiteConfig.productionDomain}`);
console.log(`Indexable metadata: ${indexable.length}`);
console.log(`Sitemap URLs: ${sitemap.length}`);
console.log(`Noindex registry entries: ${registry.filter((e) => e.active && !e.indexable).length}`);

if (indexable.length !== sitemap.length) {
  hard.push(
    `Indexable metadata (${indexable.length}) != sitemap (${sitemap.length})`,
  );
}

if (findDuplicateCanonicals().length) hard.push('Duplicate canonicals in metadata registry');
if (findDuplicateTitles().length) hard.push('Duplicate titles in metadata registry');
if (findDuplicateDescriptions().length) hard.push('Duplicate descriptions in metadata registry');
if (findDuplicateSitemapUrls(sitemap).length) hard.push('Duplicate URLs in sitemap');

for (const issue of validateSitemapCanonicals(sitemap)) {
  hard.push(issue.detail);
}
for (const issue of findNoindexSitemapEntries(sitemap)) {
  hard.push(issue.detail);
}
for (const issue of findSkippedRoutesInSitemap(sitemap)) {
  hard.push(issue.detail);
}
for (const route of findIndexableRoutesNotInSitemapAllowlist(sitemap)) {
  hard.push(`Indexable route missing from sitemap: ${route}`);
}
for (const issue of validateLastModified(sitemap)) {
  soft.push(issue.detail);
}
for (const issue of findOrphanSitemapPages(sitemap)) {
  soft.push(issue.detail);
}
for (const issue of findUnsafeInternalLinks()) {
  hard.push(issue.detail);
}

for (const path of bannedInSitemap) {
  if (sitemapPaths.has(path)) hard.push(`Banned path in sitemap: ${path}`);
}

for (const entry of sitemap) {
  if (!entry.url.startsWith('https://instantviral.ca')) {
    hard.push(`Non-production sitemap host: ${entry.url}`);
  }
  if (entry.url.includes('?') || entry.url.includes('#')) {
    hard.push(`Query/fragment in sitemap URL: ${entry.url}`);
  }
  if (entry.url.includes('checkout.instantviral.ca')) {
    hard.push(`Legacy checkout host in sitemap: ${entry.url}`);
  }
}

const robots = validateRobotsRules();
if (!robots.valid) {
  for (const issue of robots.issues) hard.push(issue.detail);
}
if (getSitemapUrl() !== 'https://instantviral.ca/sitemap.xml') {
  hard.push(`Unexpected sitemap URL in robots: ${getSitemapUrl()}`);
}

const disallow = getRobotsRules()[0]?.disallow ?? [];
for (const assetHint of ['/_next/', '/assets/', '.css', '.js']) {
  if (disallow.some((rule) => rule.includes(assetHint))) {
    hard.push(`Robots appears to block rendering asset pattern: ${assetHint}`);
  }
}

for (const path of ['/cart', '/checkout', '/order-success', '/search', '/track-order/result']) {
  if (disallow.includes(path)) {
    hard.push(`Public noindex utility should not be robots-disallowed: ${path}`);
  }
}
if (!disallow.includes('/checkout/recover/')) {
  hard.push('Missing robots Disallow for tokenized /checkout/recover/');
}
if (!disallow.includes('/admin') || !disallow.includes('/api')) {
  hard.push('Admin/API must remain robots-disallowed');
}

const withLastmod = sitemap.filter((entry) => entry.lastModified);
const withoutLastmod = sitemap.filter((entry) => !entry.lastModified);
if (withoutLastmod.length < 1) {
  soft.push('Expected some sitemap URLs to omit lastmod when dates are unknown');
}
if (withLastmod.length < 1) {
  hard.push('Expected Learn/content URLs to retain genuine lastmod values');
}
const now = Date.now();
for (const entry of withLastmod) {
  const stamp = new Date(entry.lastModified as Date).getTime();
  if (Math.abs(stamp - now) < 60_000) {
    hard.push(`Sitemap lastmod looks like build-time freshness: ${entry.url}`);
  }
}

const footerServiceHrefs = new Set(
  getFooterColumns()
    .find((column) => column.id === 'services')
    ?.links.map((link) => link.href) ?? [],
);
for (const slug of APPROVED_SERVICE_SLUGS) {
  if (!footerServiceHrefs.has(`/${slug}`)) {
    soft.push(`Approved service missing from footer Popular Services: /${slug}`);
  }
}

console.log('\nRobots disallow:', disallow.join(', '));
console.log(`Hard issues: ${hard.length}`);
console.log(`Soft notes: ${soft.length}`);

if (hard.length) {
  console.log('\nHard issues:');
  for (const item of hard.slice(0, 40)) console.log(`- ${item}`);
}
if (soft.length) {
  console.log('\nSoft notes:');
  for (const item of soft.slice(0, 40)) console.log(`- ${item}`);
}

if (hard.length) process.exitCode = 1;
