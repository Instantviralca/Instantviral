import { afterEach, describe, expect, it } from 'vitest';

import {
  BLOCKED_COUNTRY_CODES,
  buildGeoBlockUnavailableUrl,
  isGeoBlockExemptPath,
  shouldBlockRequest,
} from '@/lib/geo/blocked-countries';
import { getSiteOrigin } from '@/lib/config/hosts';

function headersWithCountry(
  code: string | null,
  extra?: Record<string, string>,
): Headers {
  const headers = new Headers();
  if (code) {
    headers.set('cf-ipcountry', code);
    headers.set('x-vercel-ip-country', code);
  }
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      headers.set(key, value);
    }
  }
  return headers;
}

/**
 * Simulates the broken rewrite destination Next would build when nextUrl is
 * the internal HTTPS-looking proxy URL (Cloudflare → Nginx → Next :3001).
 */
function brokenProxyRewriteDestination(requestLikeOrigin: string): string {
  const url = new URL(requestLikeOrigin);
  url.pathname = '/unavailable';
  url.search = '';
  return url.toString();
}

describe('geo blocked countries', () => {
  const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const previousSiteAlias = process.env.SITE_URL;

  afterEach(() => {
    if (previousSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
    if (previousSiteAlias === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = previousSiteAlias;
  });

  it('keeps PK IN BD NG blocked', () => {
    expect(BLOCKED_COUNTRY_CODES).toEqual(['PK', 'IN', 'BD', 'NG']);
    for (const code of BLOCKED_COUNTRY_CODES) {
      expect(
        shouldBlockRequest({
          pathname: '/',
          headers: headersWithCountry(code),
        }),
      ).toBe(true);
    }
  });

  it('blocks PK on public paths via Cloudflare country header', () => {
    expect(
      shouldBlockRequest({
        pathname: '/checkout',
        headers: headersWithCountry('PK'),
      }),
    ).toBe(true);
    expect(
      shouldBlockRequest({
        pathname: '/buy-instagram-likes',
        headers: headersWithCountry('PK'),
      }),
    ).toBe(true);
  });

  it('allows unknown/local and allowed countries', () => {
    expect(
      shouldBlockRequest({
        pathname: '/',
        headers: headersWithCountry(null),
      }),
    ).toBe(false);
    expect(
      shouldBlockRequest({
        pathname: '/',
        headers: headersWithCountry('CA'),
      }),
    ).toBe(false);
    expect(
      shouldBlockRequest({
        pathname: '/',
        headers: headersWithCountry('XX'),
      }),
    ).toBe(false);
  });

  it('exempts /unavailable so redirect cannot loop', () => {
    expect(isGeoBlockExemptPath('/unavailable')).toBe(true);
    expect(isGeoBlockExemptPath('/unavailable/')).toBe(true);
    expect(
      shouldBlockRequest({
        pathname: '/unavailable',
        headers: headersWithCountry('PK'),
      }),
    ).toBe(false);
  });

  it('builds canonical /unavailable from public site origin, not proxy host', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://instantviral.ca';
    delete process.env.SITE_URL;

    const destination = buildGeoBlockUnavailableUrl(getSiteOrigin());
    expect(destination.toString()).toBe('https://instantviral.ca/unavailable');
    expect(destination.pathname).toBe('/unavailable');
    expect(destination.origin).toBe('https://instantviral.ca');
    expect(destination.toString()).not.toContain('localhost:3001');
    expect(destination.protocol).toBe('https:');
  });

  it('does not use https://localhost:3001 even when request nextUrl would', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://instantviral.ca';

    const proxyNextUrl = 'https://localhost:3001/buy-instagram-followers?x=1';
    const broken = brokenProxyRewriteDestination(proxyNextUrl);
    expect(broken).toBe('https://localhost:3001/unavailable');

    const safe = buildGeoBlockUnavailableUrl(getSiteOrigin());
    expect(safe.toString()).toBe('https://instantviral.ca/unavailable');
    expect(safe.toString()).not.toBe(broken);
    expect(safe.toString()).not.toMatch(/localhost:3001/i);
  });

  it('strips trailing slash on site origin when building destination', () => {
    const destination = buildGeoBlockUnavailableUrl('https://instantviral.ca/');
    expect(destination.toString()).toBe('https://instantviral.ca/unavailable');
  });
});
