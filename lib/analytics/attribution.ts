/**
 * Marketing attribution helpers — UTM, click IDs, channel normalization.
 * Stores raw values; never invents fake attribution.
 */

export type AttributionSnapshot = {
  landingPath: string | null;
  referrer: string | null;
  referrerHost: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  gclid: string | null;
  fbclid: string | null;
  ttclid: string | null;
  channel: string;
};

const SEARCH_HOSTS = new Set([
  'google.com',
  'www.google.com',
  'bing.com',
  'www.bing.com',
  'duckduckgo.com',
  'yahoo.com',
  'www.yahoo.com',
  'search.yahoo.com',
]);

const SOCIAL_HOSTS = new Set([
  'facebook.com',
  'www.facebook.com',
  'm.facebook.com',
  'l.facebook.com',
  'instagram.com',
  'www.instagram.com',
  't.co',
  'twitter.com',
  'x.com',
  'www.x.com',
  'linkedin.com',
  'www.linkedin.com',
  'tiktok.com',
  'www.tiktok.com',
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'pinterest.com',
  'www.pinterest.com',
  'reddit.com',
  'www.reddit.com',
]);

function clean(value: string | null | undefined, max = 200): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export function extractReferrerHost(referrer: string | null | undefined): string | null {
  const raw = clean(referrer, 500);
  if (!raw) return null;
  try {
    return new URL(raw).hostname.toLowerCase() || null;
  } catch {
    return null;
  }
}

export function normalizePath(pathname: string | null | undefined): string {
  if (!pathname || !pathname.startsWith('/')) return '/';
  const bare = pathname.split('?')[0]?.split('#')[0] || '/';
  if (bare.length > 1 && bare.endsWith('/')) return bare.slice(0, -1);
  return bare.slice(0, 200);
}

/**
 * Normalize acquisition channel from UTM + referrer.
 * Raw UTM/referrer should still be stored alongside this.
 */
export function classifyChannel(input: {
  utmSource?: string | null;
  utmMedium?: string | null;
  referrerHost?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  ttclid?: string | null;
}): string {
  const medium = (input.utmMedium || '').toLowerCase();
  const source = (input.utmSource || '').toLowerCase();
  const host = (input.referrerHost || '').toLowerCase();

  if (input.gclid || medium.includes('cpc') || medium.includes('ppc') || medium === 'paidsearch') {
    return 'Paid Search';
  }
  if (
    input.fbclid ||
    input.ttclid ||
    medium.includes('paid_social') ||
    medium.includes('paidsocial') ||
    (medium.includes('paid') &&
      (source.includes('facebook') ||
        source.includes('instagram') ||
        source.includes('tiktok') ||
        source.includes('meta')))
  ) {
    return 'Paid Social';
  }
  if (medium === 'email' || source === 'email' || medium.includes('newsletter')) {
    return 'Email';
  }
  if (medium === 'organic' || medium === 'organic_search') {
    return 'Organic Search';
  }
  if (medium === 'social' || medium === 'organic_social') {
    return 'Organic Social';
  }
  if (medium === 'referral') {
    return 'Referral';
  }

  if (host) {
    const bare = host.replace(/^www\./, '');
    if (SEARCH_HOSTS.has(host) || SEARCH_HOSTS.has(bare) || bare.endsWith('.google.com')) {
      return 'Organic Search';
    }
    if (SOCIAL_HOSTS.has(host) || SOCIAL_HOSTS.has(bare)) {
      return 'Organic Social';
    }
    return 'Referral';
  }

  if (source || medium) return 'Other';
  return 'Direct';
}

export function buildAttributionFromSearchParams(
  pagePath: string,
  searchParams: URLSearchParams | Record<string, string>,
  referrer?: string | null,
): AttributionSnapshot {
  const get = (key: string) => {
    if (searchParams instanceof URLSearchParams) return clean(searchParams.get(key));
    return clean(searchParams[key]);
  };

  const referrerClean = clean(referrer, 500);
  const referrerHost = extractReferrerHost(referrerClean);
  const utmSource = get('utm_source');
  const utmMedium = get('utm_medium');
  const utmCampaign = get('utm_campaign');
  const utmContent = get('utm_content');
  const utmTerm = get('utm_term');
  const gclid = get('gclid');
  const fbclid = get('fbclid');
  const ttclid = get('ttclid');

  return {
    landingPath: normalizePath(pagePath),
    referrer: referrerClean,
    referrerHost,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    gclid,
    fbclid,
    ttclid,
    channel: classifyChannel({
      utmSource,
      utmMedium,
      referrerHost,
      gclid,
      fbclid,
      ttclid,
    }),
  };
}

/** Browser helper — capture current document attribution. */
export function captureBrowserAttribution(pagePath: string): AttributionSnapshot {
  if (typeof window === 'undefined') {
    return {
      landingPath: normalizePath(pagePath),
      referrer: null,
      referrerHost: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
      gclid: null,
      fbclid: null,
      ttclid: null,
      channel: 'Direct',
    };
  }
  const params = new URLSearchParams(window.location.search);
  return buildAttributionFromSearchParams(pagePath, params, document.referrer || null);
}
