import { describe, expect, it } from 'vitest';

import {
  isBlockedCountryCode,
  isGeoBlockExemptPath,
  shouldBlockRequest,
} from '@/lib/geo/blocked-countries';

function headersWithCountry(code: string | null): Headers {
  const headers = new Headers();
  if (code) headers.set('x-vercel-ip-country', code);
  return headers;
}

describe('geo blocked countries', () => {
  it('blocks PK IN BD NG', () => {
    expect(isBlockedCountryCode('PK')).toBe(true);
    expect(isBlockedCountryCode('in')).toBe(true);
    expect(isBlockedCountryCode('BD')).toBe(true);
    expect(isBlockedCountryCode('NG')).toBe(true);
    expect(isBlockedCountryCode('CA')).toBe(false);
  });

  it('exempts admin api and unavailable', () => {
    expect(isGeoBlockExemptPath('/admin/login')).toBe(true);
    expect(isGeoBlockExemptPath('/api/analytics/collect')).toBe(true);
    expect(isGeoBlockExemptPath('/unavailable')).toBe(true);
    expect(isGeoBlockExemptPath('/')).toBe(false);
  });

  it('blocks public paths for blocked countries', () => {
    expect(
      shouldBlockRequest({
        pathname: '/',
        headers: headersWithCountry('PK'),
      }),
    ).toBe(true);
    expect(
      shouldBlockRequest({
        pathname: '/buy-instagram-followers',
        headers: headersWithCountry('IN'),
      }),
    ).toBe(true);
  });

  it('allows unknown/local country and admin', () => {
    expect(
      shouldBlockRequest({
        pathname: '/',
        headers: headersWithCountry(null),
      }),
    ).toBe(false);
    expect(
      shouldBlockRequest({
        pathname: '/admin/dashboard',
        headers: headersWithCountry('PK'),
      }),
    ).toBe(false);
  });

  it('respects IV_GEO_BLOCK_DISABLED', () => {
    expect(
      shouldBlockRequest({
        pathname: '/',
        headers: headersWithCountry('PK'),
        env: { IV_GEO_BLOCK_DISABLED: '1' } as NodeJS.ProcessEnv,
      }),
    ).toBe(false);
  });
});
