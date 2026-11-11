import { afterEach, describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';

import { middleware } from '@/middleware';
import {
  getConfiguredSiteOrigin,
  getPublicOrigin,
} from '@/lib/seo/public-origin';

const SITE = 'https://instantviral.ca';
const INTERNAL_ORIGIN = 'http://localhost:3001';

const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const previousSiteAlias = process.env.SITE_URL;

afterEach(() => {
  if (previousSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
  if (previousSiteAlias === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = previousSiteAlias;
});

function requestAt(path: string): NextRequest {
  return new NextRequest(`${INTERNAL_ORIGIN}${path}`, {
    headers: { host: 'localhost:3001' },
  });
}

describe('getPublicOrigin', () => {
  it('prefers the configured site URL over Host: localhost:3001', () => {
    process.env.NEXT_PUBLIC_SITE_URL = SITE;
    delete process.env.SITE_URL;

    const request = requestAt('/shop/');
    expect(getConfiguredSiteOrigin()).toBe(SITE);
    expect(getPublicOrigin(request)).toBe(SITE);
    expect(request.nextUrl.origin).toBe(INTERNAL_ORIGIN);
  });

  it('falls back to x-forwarded-proto + x-forwarded-host when no site URL is set', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.SITE_URL;

    const request = new NextRequest('http://localhost:3000/about/', {
      headers: {
        host: 'localhost:3000',
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'instantviral.ca',
      },
    });
    expect(getConfiguredSiteOrigin()).toBeUndefined();
    expect(getPublicOrigin(request)).toBe(SITE);
  });
});

describe('middleware redirects use the public origin', () => {
  it('sends a legacy SEO 308 to the public host, not localhost:3001', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = SITE;
    delete process.env.SITE_URL;

    const response = await middleware(
      requestAt('/buy-tiktok-followers-likes/?utm_source=test'),
    );
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(
      `${SITE}/buy-tiktok-followers?utm_source=test`,
    );
    expect(response.headers.get('location')).not.toMatch(/localhost|:3001/);
  });

  it('sends a trailing-slash 308 to the public host, not localhost:3001', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = SITE;
    delete process.env.SITE_URL;

    const response = await middleware(requestAt('/about/'));
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(`${SITE}/about`);
    expect(response.headers.get('location')).not.toMatch(/localhost|:3001/);
  });

  it('sends the admin login redirect to the public host, not localhost:3001', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = SITE;
    delete process.env.SITE_URL;

    const response = await middleware(requestAt('/admin/dashboard'));
    expect(response.status).toBeGreaterThanOrEqual(300);
    expect(response.status).toBeLessThan(400);
    const location = response.headers.get('location') ?? '';
    expect(location.startsWith(`${SITE}/admin/login`)).toBe(true);
    expect(location).toContain('next=');
    expect(location).not.toMatch(/localhost|:3001/);
  });
});
