/**
 * Checkout-start analytics — fires once when /checkout loads with a valid cart.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { resolveCanonicalEventName } from '@/data/analytics/event-registry';
import {
  buildCheckoutStartedInput,
  buildCheckoutStartedSignature,
  canEmitCheckoutStarted,
  emitCheckoutStarted,
} from '@/lib/analytics/checkout-start';
import {
  clearAnalyticsDebugRecordsForTests,
  resetAnalyticsAdaptersForTests,
  resetAnalyticsConsentForTests,
  resetAnalyticsSessionIdForTests,
  resetDuplicateGuardsForTests,
  setAnalyticsAdaptersForTests,
  setAnalyticsConsent,
  trackEvent,
} from '@/lib/analytics';
import { trackIgFollowersEvent } from '@/lib/analytics/ig-followers-events';
import type { AnalyticsEvent, AnalyticsProviderAdapter } from '@/types/analytics';

function grantAnalyticsConsent(): void {
  setAnalyticsConsent({ analytics: true, marketing: true });
}

function noop(): void {
  // test adapter stub
}

function captureAdapter() {
  const events: AnalyticsEvent[] = [];
  const adapter: AnalyticsProviderAdapter = {
    id: 'debug',
    initialize: noop,
    trackPageView: noop,
    trackEvent: (event) => {
      events.push(event);
    },
    trackConversion: noop,
    setConsent: noop,
    reset: noop,
  };
  setAnalyticsAdaptersForTests([adapter]);
  return events;
}

beforeEach(() => {
  resetAnalyticsConsentForTests();
  resetDuplicateGuardsForTests();
  resetAnalyticsSessionIdForTests();
  clearAnalyticsDebugRecordsForTests();
  resetAnalyticsAdaptersForTests();
  grantAnalyticsConsent();
});

afterEach(() => {
  vi.restoreAllMocks();
  resetAnalyticsAdaptersForTests();
});

describe('checkout_started semantics', () => {
  it('maps Instagram Followers legacy checkout_start to checkout_started', () => {
    expect(resolveCanonicalEventName('ig_followers_checkout_start')).toBe(
      'checkout_started',
    );
    expect(resolveCanonicalEventName('service_checkout_start')).toBe(
      'checkout_started',
    );
  });

  it('does not treat empty or hydrating carts as checkout start', () => {
    expect(
      canEmitCheckoutStarted({ isHydrated: false, isBootstrapping: true, items: [] }),
    ).toBe(false);
    expect(
      canEmitCheckoutStarted({
        isHydrated: true,
        isBootstrapping: false,
        items: [],
      }),
    ).toBe(false);
    expect(
      canEmitCheckoutStarted({
        isHydrated: true,
        isBootstrapping: true,
        items: [
          {
            id: '1',
            packageId: 'ig-f-1000',
            serviceSlug: 'buy-instagram-followers',
          },
        ],
      }),
    ).toBe(false);
  });

  it('allows Instagram Followers carts like any other service', () => {
    expect(
      canEmitCheckoutStarted({
        isHydrated: true,
        isBootstrapping: false,
        items: [
          {
            id: '1',
            packageId: 'ig-f-1000',
            serviceSlug: 'buy-instagram-followers',
          },
        ],
      }),
    ).toBe(true);
  });

  it('fires one checkout_started for multi-item carts (not one per item)', () => {
    const events = captureAdapter();
    const result = emitCheckoutStarted({
      isHydrated: true,
      isBootstrapping: false,
      items: [
        {
          id: 'a',
          packageId: 'ig-f-1000',
          serviceSlug: 'buy-instagram-followers',
        },
        {
          id: 'b',
          packageId: 'ig-l-100',
          serviceSlug: 'buy-instagram-likes',
        },
      ],
    });

    expect(result?.tracked).toBe(true);
    expect(events.filter((e) => e.eventName === 'checkout_started')).toHaveLength(1);
    expect(
      buildCheckoutStartedSignature([
        {
          id: 'a',
          packageId: 'ig-f-1000',
          serviceSlug: 'buy-instagram-followers',
        },
        {
          id: 'b',
          packageId: 'ig-l-100',
          serviceSlug: 'buy-instagram-likes',
        },
      ]),
    ).toBe('buy-instagram-followers:ig-f-1000|buy-instagram-likes:ig-l-100');
  });

  it('uses the existing checkout payload and excludes username/configuration', () => {
    const events = captureAdapter();
    const input = buildCheckoutStartedInput([
      {
        id: '1',
        packageId: 'ig-f-1000',
        serviceSlug: 'buy-instagram-followers',
      },
    ]);
    expect(input).toMatchObject({
      eventName: 'checkout_started',
      pageType: 'checkout',
      pagePath: '/checkout',
    });
    expect(JSON.stringify(input)).not.toMatch(/username|configuration|@/i);

    emitCheckoutStarted({
      isHydrated: true,
      isBootstrapping: false,
      items: [
        {
          id: '1',
          packageId: 'ig-f-1000',
          serviceSlug: 'buy-instagram-followers',
        },
      ],
    });

    expect(events[0]).toBeTruthy();
    const payload = JSON.stringify(events[0]);
    expect(payload).not.toContain('secret.user');
    expect(payload).not.toMatch(/username|configuration/i);
  });

  it('dedupes remount-style re-emits for the same cart signature', () => {
    const events = captureAdapter();
    const cart = {
      isHydrated: true,
      isBootstrapping: false,
      items: [
        {
          id: '1',
          packageId: 'ig-f-1000',
          serviceSlug: 'buy-instagram-followers',
        },
      ],
    };

    const first = emitCheckoutStarted(cart);
    const second = emitCheckoutStarted(cart);

    expect(first?.tracked).toBe(true);
    expect(second?.tracked).toBe(false);
    expect(second?.duplicate).toBe(true);
    expect(events.filter((e) => e.eventName === 'checkout_started')).toHaveLength(1);
  });

  it('legacy ig_followers_checkout_start resolves into the same funnel event', () => {
    const events = captureAdapter();
    trackIgFollowersEvent('ig_followers_checkout_start', {
      packageId: 'ig-f-1000',
      serviceSlug: 'buy-instagram-followers',
    });
    expect(events[0]?.eventName).toBe('checkout_started');
  });

  it('leaves payment_started / payment_completed / order_completed unchanged', () => {
    const events = captureAdapter();
    expect(trackEvent({ eventName: 'payment_started', pagePath: '/checkout' }).tracked).toBe(
      true,
    );
    expect(
      trackEvent({
        eventName: 'payment_completed',
        pagePath: '/checkout',
        channel: 'admin',
      }).tracked,
    ).toBe(true);
    expect(
      trackEvent({
        eventName: 'order_completed',
        pagePath: '/checkout',
        channel: 'admin',
      }).tracked,
    ).toBe(true);

    expect(events.map((e) => e.eventName)).toEqual([
      'payment_started',
      'payment_completed',
      'order_completed',
    ]);
  });

  it('does not emit before a genuine checkout transition', () => {
    expect(
      emitCheckoutStarted({
        isHydrated: true,
        isBootstrapping: false,
        items: [],
      }),
    ).toBeNull();
  });
});
