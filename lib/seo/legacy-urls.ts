/**
 * Legacy commercial URL handling — one-hop redirects + retired Gone paths.
 * Used by middleware before trailing-slash normalization.
 */

function withSlashVariants(map: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [source, dest] of Object.entries(map)) {
    const base = source.replace(/\/+$/, '') || '/';
    out[base] = dest;
    out[`${base}/`] = dest;
  }
  return out;
}

/**
 * Permanent 308 targets (slash + non-slash keys). Query string is preserved by caller.
 * Includes next.config product redirects so Location uses the public origin, not the
 * internal listen address Next would put on those 308s.
 */
export const LEGACY_SEO_REDIRECTS: Readonly<Record<string, string>> = {
  '/contact-us': '/contact',
  '/contact-us/': '/contact',
  // Instagram Followers consolidated onto homepage.
  '/buy-instagram-followers': '/',
  '/buy-instagram-followers/': '/',
  // Combined legacy commercial URLs → current single-service pages.
  '/buy-tiktok-followers-likes': '/buy-tiktok-followers',
  '/buy-tiktok-followers-likes/': '/buy-tiktok-followers',
  '/buy-facebook-likes-followers': '/buy-facebook-followers',
  '/buy-facebook-likes-followers/': '/buy-facebook-followers',
  '/buy-youtube-subscribers-views': '/buy-youtube-subscribers',
  '/buy-youtube-subscribers-views/': '/buy-youtube-subscribers',
  ...withSlashVariants({
    '/shop': '/',
    '/terms-conditions': '/terms-and-conditions',
    '/authors/instantviral-editorial-team': '/authors/tayyab',
    '/learn/buy-instagram-followers-canada': '/learn',
    '/instagram-services-prices': '/',
    '/product/buy-100-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-250-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-500-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-1000-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-3000-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-5000-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-10000-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-15000-tiktok-followers': '/buy-tiktok-followers',
    '/product/buy-100-instagram-followers': '/',
    '/product/buy-250-instagram-followers': '/',
    '/product/buy-500-instagram-followers': '/',
    '/product/buy-1000-instagram-followers': '/',
    '/product/buy-2500-instagram-followers': '/',
    '/product/buy-5000-instagram-followers': '/',
    '/product/buy-10000-instagram-followers': '/',
    '/product/buy-25000-instagram-followers': '/',
    '/product/buy-100-youtube-subscribers': '/buy-youtube-subscribers',
    '/product/buy-200-youtube-subscribers': '/buy-youtube-subscribers',
    '/product/buy-500-youtube-subscribers': '/buy-youtube-subscribers',
    '/product/buy-1000-youtube-subscribers': '/buy-youtube-subscribers',
    '/product/buy-2000-youtube-subscribers': '/buy-youtube-subscribers',
    '/product/buy-3000-youtube-subscribers': '/buy-youtube-subscribers',
    '/product/buy-5000-youtube-subscribers': '/buy-youtube-subscribers',
  }),
};

/** Retired paths with no replacement service — HTTP 410 Gone (not a redirect). */
export const LEGACY_GONE_PATHS = new Set<string>([
  '/buy-twitter-followers',
  '/buy-twitter-followers/',
  '/buy-twitter-likes',
  '/buy-twitter-likes/',
  '/buy-twitter-retweets',
  '/buy-twitter-retweets/',
  '/buy-twitter-views',
  '/buy-twitter-views/',
]);

function stripTrailingSlashes(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.replace(/\/+$/, '') || '/';
  }
  return pathname;
}

/**
 * Retired Twitter / X inventory — 410 with or without a trailing slash.
 * Exact-set lookup missed /product/buy-10000-twitter-followers/ because that
 * path was never listed; match by prefix / substring instead.
 */
export function isRetiredTwitterOrXPath(pathname: string): boolean {
  const normalized = stripTrailingSlashes(pathname).toLowerCase();
  if (normalized.startsWith('/product/') && normalized.includes('twitter')) {
    return true;
  }
  if (normalized.startsWith('/buy-twitter-') || normalized.startsWith('/buy-x-')) {
    return true;
  }
  return LEGACY_GONE_PATHS.has(pathname) || LEGACY_GONE_PATHS.has(normalized);
}

export type LegacySeoResolution =
  | { kind: 'redirect'; destination: string }
  | { kind: 'gone' }
  | { kind: 'none' };

/**
 * Fallback for /product/<slug> not already in LEGACY_SEO_REDIRECTS.
 * Twitter/X is handled earlier as 410. More specific Facebook matches first.
 */
function resolveProductKeywordRedirect(pathname: string): LegacySeoResolution | null {
  const normalized = stripTrailingSlashes(pathname).toLowerCase();
  if (!normalized.startsWith('/product/')) return null;

  const slug = normalized.slice('/product/'.length);
  if (!slug) return { kind: 'gone' };

  if (slug.includes('facebook') && slug.includes('page') && slug.includes('likes')) {
    return { kind: 'redirect', destination: '/buy-facebook-page-likes' };
  }
  if (slug.includes('facebook') && slug.includes('post') && slug.includes('likes')) {
    return { kind: 'redirect', destination: '/buy-facebook-post-likes' };
  }
  if (slug.includes('facebook') && slug.includes('followers')) {
    return { kind: 'redirect', destination: '/buy-facebook-followers' };
  }
  if (slug.includes('instagram') && slug.includes('followers')) {
    return { kind: 'redirect', destination: '/' };
  }
  if (slug.includes('instagram') && slug.includes('likes')) {
    return { kind: 'redirect', destination: '/buy-instagram-likes' };
  }
  if (slug.includes('instagram') && slug.includes('views')) {
    return { kind: 'redirect', destination: '/buy-instagram-views' };
  }
  if (slug.includes('instagram') && slug.includes('comments')) {
    return { kind: 'redirect', destination: '/buy-instagram-comments' };
  }
  if (slug.includes('tiktok') && slug.includes('followers')) {
    return { kind: 'redirect', destination: '/buy-tiktok-followers' };
  }
  if (slug.includes('tiktok') && slug.includes('likes')) {
    return { kind: 'redirect', destination: '/buy-tiktok-likes' };
  }
  if (slug.includes('tiktok') && slug.includes('views')) {
    return { kind: 'redirect', destination: '/buy-tiktok-views' };
  }
  if (slug.includes('youtube') && slug.includes('subscribers')) {
    return { kind: 'redirect', destination: '/buy-youtube-subscribers' };
  }
  if (slug.includes('youtube') && slug.includes('views')) {
    return { kind: 'redirect', destination: '/buy-youtube-views' };
  }

  return { kind: 'gone' };
}

export function resolveLegacySeoPath(pathname: string): LegacySeoResolution {
  if (isRetiredTwitterOrXPath(pathname) || LEGACY_GONE_PATHS.has(pathname)) {
    return { kind: 'gone' };
  }
  const destination = LEGACY_SEO_REDIRECTS[pathname];
  if (destination) {
    return { kind: 'redirect', destination };
  }
  return resolveProductKeywordRedirect(pathname) ?? { kind: 'none' };
}

/**
 * One-hop Location for a legacy 308 — destination path without trailing slash,
 * with the original request query string preserved.
 */
export function buildLegacyRedirectLocation(
  origin: string,
  destination: string,
  search: string,
): string {
  const url = new URL(destination, origin);
  url.search = search.startsWith('?') || search === '' ? search : `?${search}`;
  return `${url.pathname}${url.search}`;
}

/** Minimal Gone body — not an indexable marketing page. */
export const LEGACY_GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="robots" content="noindex"/>
<title>Gone</title>
</head>
<body>
<h1>Gone</h1>
<p>This URL is no longer available.</p>
</body>
</html>`;

/** Public hrefs that must not appear in product UI / content. */
export const FORBIDDEN_LEGACY_PUBLIC_HREFS = [
  '/buy-tiktok-followers-likes',
  '/buy-facebook-likes-followers',
  '/buy-youtube-subscribers-views',
  '/buy-twitter-followers',
] as const;
