/**
 * Robots.txt rules — Document 14.08.
 *
 * Single canonical disallow list for production.
 * Public utility pages (cart, checkout, order-success, track-order result)
 * rely on page-level / X-Robots-Tag noindex so crawlers can still fetch them.
 * Tokenized recovery URLs remain Disallow'd specifically under /checkout/recover/.
 */

import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';
import type { RobotsValidationReport, SitemapIssue } from '@/types/sitemap';

export type RobotsRuleSet = {
  userAgent: string;
  allow: string[];
  disallow: string[];
};

/**
 * Canonical robots.txt Disallow paths.
 * Import this constant everywhere — do not duplicate path arrays.
 */
export const ROBOTS_DISALLOW = [
  '/admin',
  '/api',
  '/preview/',
  '/draft/',
  '/learn/preview/',
  /** Tokenized abandoned-cart recovery — private utility, not a public SEO page. */
  '/checkout/recover/',
] as const;

/**
 * Central robots directives — Document 14.08.
 * Does not block public CSS, JS, images, fonts, or rendering assets.
 */
export function getRobotsRules(): RobotsRuleSet[] {
  return [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: [...ROBOTS_DISALLOW],
    },
  ];
}

export function getSitemapUrl(): string {
  return `${SEO_PRODUCTION_DOMAIN}/sitemap.xml`;
}

export function validateRobotsRules(
  rules: RobotsRuleSet[] = getRobotsRules(),
  sitemapUrl: string = getSitemapUrl(),
): RobotsValidationReport {
  const issues: SitemapIssue[] = [];
  const primary = rules[0];

  if (!primary) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: 'No robots rules defined',
    });
    return {
      valid: false,
      issues,
      sitemapUrl,
      disallow: [],
    };
  }

  if (sitemapUrl !== `${SEO_PRODUCTION_DOMAIN}/sitemap.xml`) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: `Robots sitemap URL must be ${SEO_PRODUCTION_DOMAIN}/sitemap.xml`,
    });
  }

  for (const required of ROBOTS_DISALLOW) {
    if (!primary.disallow.includes(required)) {
      issues.push({
        kind: 'robots_misconfigured',
        detail: `Missing required disallow rule: ${required}`,
      });
    }
  }

  // Public noindex utilities must remain crawlable (so noindex can be read).
  const mustRemainCrawlable = [
    '/cart',
    '/checkout',
    '/order-success',
    '/search',
    '/track-order/result',
  ] as const;
  for (const path of mustRemainCrawlable) {
    if (primary.disallow.includes(path)) {
      issues.push({
        kind: 'robots_misconfigured',
        detail: `Public noindex utility ${path} must not be robots-disallowed (prefer page/header noindex)`,
      });
    }
  }

  // Broad /checkout block would hide the main checkout noindex meta from crawlers.
  if (primary.disallow.includes('/checkout')) {
    issues.push({
      kind: 'robots_misconfigured',
      detail:
        'Disallow /checkout is too broad; use /checkout/recover/ for tokenized recovery only',
    });
  }

  const blockedAssets = primary.disallow.filter((rule) =>
    ['/_next/', '/assets/', '/fonts/', '.css', '.js', '.png', '.jpg', '.webp'].some(
      (asset) => rule.includes(asset),
    ),
  );
  if (blockedAssets.length > 0) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: `Public rendering assets appear blocked: ${blockedAssets.join(', ')}`,
    });
  }

  if (!primary.allow.includes('/')) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: 'Public root allow rule "/" is required',
    });
  }

  return {
    valid: issues.length === 0,
    issues,
    sitemapUrl,
    disallow: [...primary.disallow],
  };
}
