/**
 * Sitemap & Robots Finalization tests — Document 14.08.
 */

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import {
  SKIPPED_SERVICE_ROUTE_EXAMPLES,
  SITEMAP_PRODUCTION_ROUTES,
} from '@/data/seo/sitemap-routes';
import { ROBOTS_DISALLOW_PATHS } from '@/data/seo/sitemap-policy';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { getMetadataByRoute, buildPageMetadataForRoute } from '@/lib/seo/metadata';
import {
  buildSitemapEntries,
  findDuplicateSitemapUrls,
  findMissingSitemapEntries,
  findNoindexSitemapEntries,
  findOrphanSitemapPages,
  findSkippedRoutesInSitemap,
  getIndexableRoutes,
  getSitemapUrl,
  validateLastModified,
  validateRobotsRules,
  validateSitemapCanonicals,
  validateSitemapUrl,
  ROBOTS_DISALLOW,
} from '@/lib/seo/sitemap';
import {
  adminMetadata,
  cartMetadata,
  checkoutMetadata,
  privateTrackOrderResultMetadata,
} from '@/seo/metadata';
import { getRobotsRules } from '@/seo/robots';
import { routes } from '@/config/routes';

describe('Sitemap & Robots Finalization', () => {
  const entries = buildSitemapEntries();
  const urls = entries.map((entry) => entry.url);

  it('uses the production hostname only', () => {
    expect(urls.every((url) => url.startsWith('https://instantviral.ca'))).toBe(
      true,
    );
    expect(validateSitemapUrl('http://instantviral.ca/').valid).toBe(false);
    expect(validateSitemapUrl('https://localhost/').valid).toBe(false);
    expect(
      validateSitemapUrl('https://instantviral-next.vercel.app/').valid,
    ).toBe(false);
    expect(validateSitemapUrl('https://preview.instantviral.ca/').valid).toBe(
      false,
    );
  });

  it('includes the homepage and 11 dedicated service pages (followers consolidated)', () => {
    expect(urls).toContain('https://instantviral.ca');
    expect(urls).not.toContain('https://instantviral.ca/buy-instagram-followers');
    for (const slug of APPROVED_SERVICE_SLUGS) {
      if (slug === 'buy-instagram-followers') continue;
      expect(urls).toContain(`https://instantviral.ca/${slug}`);
    }
    expect(
      urls.filter((url) => {
        try {
          const path = new URL(url).pathname;
          return path.startsWith('/buy-') && !path.startsWith('/learn/');
        } catch {
          return false;
        }
      }).length,
    ).toBe(11);
  });

  it('includes company, support, and legal routes', () => {
    for (const route of [
      '/about',
      '/contact',
      '/faq',
      '/track-order',
      '/privacy-policy',
      '/terms-and-conditions',
      '/refund-policy',
      '/cookie-policy',
      '/disclaimer',
    ]) {
      expect(urls).toContain(
        route === '/' ? 'https://instantviral.ca' : `https://instantviral.ca${route}`,
      );
    }
  });

  it('excludes skipped services and private/transactional routes from sitemap', () => {
    for (const route of SKIPPED_SERVICE_ROUTE_EXAMPLES) {
      expect(urls.some((url) => url.endsWith(route))).toBe(false);
    }
    for (const route of [
      '/cart',
      '/checkout',
      '/order-success',
      '/admin',
      '/api/orders',
      '/search',
      '/preview/test',
      '/draft/test',
      '/track-order/result',
      '/checkout/recover/',
      '/services',
      '/buy-twitter-followers',
      '/buy-tiktok-followers-likes',
      '/buy-facebook-likes-followers',
      '/buy-youtube-subscribers-views',
    ]) {
      expect(urls.some((url) => url.includes(route))).toBe(false);
    }
    expect(urls).toContain('https://instantviral.ca/learn');
    expect(urls).toContain('https://instantviral.ca/reviews');
    expect(findSkippedRoutesInSitemap(entries)).toHaveLength(0);
    expect(findNoindexSitemapEntries(entries)).toHaveLength(0);
  });

  it('includes published Learn articles when Learn sitemap is enabled', () => {
    expect(urls).toContain(
      'https://instantviral.ca/learn/how-to-grow-instagram-followers-organically',
    );
    expect(urls).toContain('https://instantviral.ca/learn/instagram-algorithm-explained');
    expect(urls).toContain(
      'https://instantviral.ca/learn/how-to-get-more-instagram-followers-without-ads',
    );
    expect(urls.some((url) => url.includes('/learn/buy-instagram-followers-canada'))).toBe(false);
  });

  it('has no duplicate sitemap URLs', () => {
    expect(findDuplicateSitemapUrls(entries)).toHaveLength(0);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('matches canonical URLs exactly', () => {
    expect(validateSitemapCanonicals(entries)).toHaveLength(0);
  });

  it('rejects invalid trailing-slash variants', () => {
    expect(validateSitemapUrl('https://instantviral.ca/faq/').valid).toBe(false);
    expect(validateSitemapUrl('https://instantviral.ca/').valid).toBe(true);
  });

  it('omits lastModified when no trustworthy modification date exists', () => {
    expect(validateLastModified(entries)).toHaveLength(0);
    const home = entries.find((entry) => entry.url === 'https://instantviral.ca');
    expect(home).toBeDefined();
    expect(home?.lastModified).toBeDefined();
    expect(new Date(home!.lastModified as Date).toISOString().startsWith('2026-09-09')).toBe(
      true,
    );

    const retiredFollowers = entries.find(
      (entry) => entry.url === 'https://instantviral.ca/buy-instagram-followers',
    );
    expect(retiredFollowers).toBeUndefined();
  });

  it('preserves genuine Learn article lastModified and never invents build-date freshness', () => {
    const article = LEARN_ARTICLES.find(
      (item) => item.slug === 'how-to-grow-instagram-followers-organically',
    );
    expect(article).toBeDefined();
    const expected = new Date(
      article!.showModifiedDate ? article!.updatedAt : article!.publishedAt,
    ).getTime();

    const sitemapArticle = entries.find((entry) =>
      String(entry.url).includes('/learn/how-to-grow-instagram-followers-organically'),
    );
    expect(sitemapArticle?.lastModified).toBeDefined();
    expect(new Date(sitemapArticle!.lastModified as Date).getTime()).toBe(expected);

    const now = Date.now();
    const withDates = entries.filter((entry) => entry.lastModified);
    expect(withDates.length).toBeGreaterThan(0);
    expect(
      withDates.every((entry) => {
        const stamp = new Date(entry.lastModified as Date).getTime();
        return Math.abs(stamp - now) > 60_000;
      }),
    ).toBe(true);
  });

  it('keeps about 97 indexable sitemap URLs after followers consolidation', () => {
    expect(findMissingSitemapEntries(entries)).toHaveLength(0);
    const indexable = getIndexableRoutes();
    expect(indexable.length).toBeGreaterThanOrEqual(SITEMAP_PRODUCTION_ROUTES.length);
    expect(entries.length).toBe(indexable.length);
    expect(entries.length).toBe(97);
  });

  it('uses a single canonical robots disallow source', () => {
    expect(ROBOTS_DISALLOW_PATHS).toBe(ROBOTS_DISALLOW);
    expect([...ROBOTS_DISALLOW]).toEqual([
      '/admin',
      '/api',
      '/preview/',
      '/draft/',
      '/learn/preview/',
      '/checkout/recover/',
    ]);

    const policySource = readFileSync(
      join(process.cwd(), 'data/seo/sitemap-policy.ts'),
      'utf8',
    );
    expect(policySource).toContain('export const ROBOTS_DISALLOW_PATHS = ROBOTS_DISALLOW');
    expect(policySource).not.toMatch(/ROBOTS_DISALLOW_PATHS\s*=\s*\[/);
  });

  it('configures robots for admin/api/preview while keeping public utilities crawlable', () => {
    const report = validateRobotsRules();
    expect(report.valid).toBe(true);
    expect(getSitemapUrl()).toBe('https://instantviral.ca/sitemap.xml');

    const rules = getRobotsRules()[0]!;
    for (const path of ROBOTS_DISALLOW) {
      expect(rules.disallow).toContain(path);
    }
    expect(rules.allow).toContain('/');
    expect(rules.disallow).not.toContain('/cart');
    expect(rules.disallow).not.toContain('/checkout');
    expect(rules.disallow).not.toContain('/order-success');
    expect(rules.disallow).not.toContain('/search');
    expect(rules.disallow).not.toContain('/track-order/result');
    expect(rules.disallow).toContain('/checkout/recover/');
    expect(rules.disallow.some((rule) => rule.includes('/_next'))).toBe(false);
    expect(rules.disallow.some((rule) => rule.includes('/assets'))).toBe(false);
  });

  it('keeps public utility pages noindex and out of the sitemap', () => {
    expect(cartMetadata().robots).toMatchObject({ index: false });
    expect(checkoutMetadata().robots).toMatchObject({ index: false, follow: false });
    expect(buildPageMetadataForRoute(routes.orderSuccess).robots).toMatchObject({
      index: false,
    });
    expect(privateTrackOrderResultMetadata().robots).toMatchObject({ index: false });
    expect(adminMetadata().robots).toMatchObject({ index: false, follow: false });

    expect(getMetadataByRoute('/cart')?.indexable).toBe(false);
    expect(getMetadataByRoute('/checkout')?.indexable).toBe(false);
    expect(getMetadataByRoute('/order-success')?.indexable).toBe(false);
    expect(getMetadataByRoute('/track-order/result')?.indexable).toBe(false);

    expect(urls.some((url) => url.includes('/cart'))).toBe(false);
    expect(urls.some((url) => url.includes('/checkout'))).toBe(false);
    expect(urls.some((url) => url.includes('/order-success'))).toBe(false);
    expect(urls.some((url) => url.includes('/track-order/result'))).toBe(false);
  });

  it('reports orphan sitemap pages without failing the allowlist', () => {
    const orphans = findOrphanSitemapPages(entries);
    expect(Array.isArray(orphans)).toBe(true);
    expect(orphans).toHaveLength(0);
  });
});
