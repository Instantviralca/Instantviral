/**
 * Legacy commercial URL handling — one-hop redirects + retired Gone paths.
 * Used by middleware before trailing-slash normalization.
 */

/** Permanent 308 targets (slash + non-slash keys). Query string is preserved by caller. */
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
};

/** Retired paths with no replacement service — HTTP 410 Gone (not a redirect). */
export const LEGACY_GONE_PATHS = new Set<string>([
  '/buy-twitter-followers',
  '/buy-twitter-followers/',
]);

export type LegacySeoResolution =
  | { kind: 'redirect'; destination: string }
  | { kind: 'gone' }
  | { kind: 'none' };

export function resolveLegacySeoPath(pathname: string): LegacySeoResolution {
  if (LEGACY_GONE_PATHS.has(pathname)) {
    return { kind: 'gone' };
  }
  const destination = LEGACY_SEO_REDIRECTS[pathname];
  if (destination) {
    return { kind: 'redirect', destination };
  }
  return { kind: 'none' };
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
