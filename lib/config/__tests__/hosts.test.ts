import { afterEach, describe, expect, it } from 'vitest';

import {
  getCartCookieDomain,
  getCartCookieDomainFromSiteOrigin,
  getCheckoutOrigin,
  getCheckoutUrl,
  getSiteOrigin,
  isCheckoutHostname,
  isDedicatedCheckoutConfigured,
} from '@/lib/config/hosts';

const prev = { ...process.env };

afterEach(() => {
  Object.assign(process.env, prev);
  for (const key of Object.keys(process.env)) {
    if (!(key in prev)) delete process.env[key];
  }
});

describe('Checkout host helpers', () => {
  it('falls back checkout to main site when CHECKOUT_URL unset', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://instantviral.ca';
    delete process.env.NEXT_PUBLIC_CHECKOUT_URL;
    expect(getSiteOrigin()).toBe('https://instantviral.ca');
    expect(getCheckoutOrigin()).toBe('https://instantviral.ca');
    expect(getCheckoutUrl('/')).toBe('https://instantviral.ca/checkout');
    expect(isDedicatedCheckoutConfigured()).toBe(false);
    expect(isCheckoutHostname('instantviral.ca')).toBe(false);
  });

  it('uses dedicated checkout origin when configured', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://instantviral.ca';
    process.env.NEXT_PUBLIC_CHECKOUT_URL = 'https://checkout.instantviral.ca';
    expect(getCheckoutOrigin()).toBe('https://checkout.instantviral.ca');
    expect(getCheckoutUrl('/')).toBe('https://checkout.instantviral.ca/');
    expect(isDedicatedCheckoutConfigured()).toBe(true);
    expect(isCheckoutHostname('checkout.instantviral.ca')).toBe(true);
    expect(isCheckoutHostname('instantviral.ca')).toBe(false);
    expect(getCartCookieDomain()).toBe('.instantviral.ca');
    expect(getCartCookieDomainFromSiteOrigin()).toBe('.instantviral.ca');
  });
});
