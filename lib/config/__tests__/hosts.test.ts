import { afterEach, describe, expect, it } from 'vitest';

import {
  getCartCookieDomain,
  getCartCookieDomainFromSiteOrigin,
  getCheckoutOrigin,
  getCheckoutPath,
  getCheckoutUrl,
  getLegacyCheckoutHostname,
  getSiteOrigin,
  isCheckoutHostname,
  isDedicatedCheckoutConfigured,
  isLegacyCheckoutHostname,
  mapLegacyCheckoutPathToMain,
} from '@/lib/config/hosts';

const prev = { ...process.env };

afterEach(() => {
  Object.assign(process.env, prev);
  for (const key of Object.keys(process.env)) {
    if (!(key in prev)) delete process.env[key];
  }
});

describe('Checkout host helpers (main-domain checkout)', () => {
  it('always resolves checkout on the main site origin', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://instantviral.ca';
    delete process.env.NEXT_PUBLIC_CHECKOUT_URL;
    delete process.env.NEXT_PUBLIC_LEGACY_CHECKOUT_HOST;
    expect(getSiteOrigin()).toBe('https://instantviral.ca');
    expect(getCheckoutOrigin()).toBe('https://instantviral.ca');
    expect(getCheckoutPath('/')).toBe('/checkout');
    expect(getCheckoutUrl('/')).toBe('https://instantviral.ca/checkout');
    expect(getCheckoutUrl('/checkout/recover/abc')).toBe(
      'https://instantviral.ca/checkout/recover/abc',
    );
    expect(isDedicatedCheckoutConfigured()).toBe(false);
    expect(isCheckoutHostname('instantviral.ca')).toBe(false);
  });

  it('ignores NEXT_PUBLIC_CHECKOUT_URL for customer checkout URLs', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://instantviral.ca';
    process.env.NEXT_PUBLIC_CHECKOUT_URL = 'https://checkout.instantviral.ca';
    expect(getCheckoutOrigin()).toBe('https://instantviral.ca');
    expect(getCheckoutPath('/')).toBe('/checkout');
    expect(getCheckoutUrl('/')).toBe('https://instantviral.ca/checkout');
    expect(isDedicatedCheckoutConfigured()).toBe(false);
    expect(isLegacyCheckoutHostname('checkout.instantviral.ca')).toBe(true);
    expect(isLegacyCheckoutHostname('instantviral.ca')).toBe(false);
    expect(getLegacyCheckoutHostname()).toBe('checkout.instantviral.ca');
    expect(getCartCookieDomain()).toBe('.instantviral.ca');
    expect(getCartCookieDomainFromSiteOrigin()).toBe('.instantviral.ca');
  });

  it('maps legacy checkout-subdomain paths onto main checkout routes', () => {
    expect(mapLegacyCheckoutPathToMain('/')).toBe('/checkout');
    expect(mapLegacyCheckoutPathToMain('/cart')).toBe('/checkout');
    expect(mapLegacyCheckoutPathToMain('/checkout')).toBe('/checkout');
    expect(mapLegacyCheckoutPathToMain('/checkout/recover/tok')).toBe(
      '/checkout/recover/tok',
    );
    expect(mapLegacyCheckoutPathToMain('/about')).toBe('/about');
  });
});
