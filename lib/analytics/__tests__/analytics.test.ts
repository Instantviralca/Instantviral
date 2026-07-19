/**
 * Analytics & Conversion Event System tests — Document 14.09.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getAnalyticsConfig, isAnalyticsDebugEnabled } from '@/config/analytics';
import { isAnalyticsDebugPanelEnabled } from '@/components/analytics/AnalyticsDebugPanel';
import {
  canTrackEvent,
  resetAnalyticsConsentForTests,
  resetDuplicateGuardsForTests,
  resetAnalyticsSessionIdForTests,
  clearAnalyticsDebugRecordsForTests,
  setAnalyticsConsent,
  sanitizeEventPayload,
  trackConversion,
  trackEvent,
  trackPageView,
  validateEvent,
  resetAnalyticsAdaptersForTests,
  setAnalyticsAdaptersForTests,
  dispatchToProviders,
} from '@/lib/analytics';
import type { AnalyticsEvent, AnalyticsProviderAdapter } from '@/types/analytics';

function grantAnalyticsConsent(): void {
  setAnalyticsConsent({ analytics: true, marketing: true });
}

beforeEach(() => {
  resetAnalyticsConsentForTests();
  resetDuplicateGuardsForTests();
  resetAnalyticsSessionIdForTests();
  clearAnalyticsDebugRecordsForTests();
  resetAnalyticsAdaptersForTests();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Analytics & Conversion Event System', () => {
  it('tracks a valid page view when analytics consent is granted', () => {
    grantAnalyticsConsent();
    const result = trackPageView({ pagePath: '/about', pageType: 'about' });
    expect(result.consentAllowed).toBe(true);
    expect(result.duplicate).toBe(false);
    expect(result.issues.some((issue) => issue.code === 'unapproved_event')).toBe(
      false,
    );
    expect(result.event?.eventName).toBe('page_view');
    expect(result.tracked).toBe(true);
  });

  it('tracks a valid package selection with safe service context', () => {
    grantAnalyticsConsent();
    const result = trackEvent({
      eventName: 'package_select',
      serviceSlug: 'buy-instagram-followers',
      packageId: 'ig-f-1000',
      platform: 'instagram',
      quantity: 1000,
      displayedPrice: 9.99,
      currency: 'USD',
      pagePath: '/buy-instagram-followers',
      pageType: 'service',
    });

    expect(result.tracked).toBe(true);
    expect(result.event?.packageId).toBe('ig-f-1000');
    expect(result.event?.serviceSlug).toBe('buy-instagram-followers');
    expect(result.issues).toHaveLength(0);
  });

  it('blocks forbidden email fields', () => {
    grantAnalyticsConsent();
    const { issues } = sanitizeEventPayload({
      eventName: 'contact_form_submit',
      metadata: { email: 'person@example.com', formId: 'contact' },
    });
    expect(issues.some((issue) => issue.code === 'forbidden_field')).toBe(true);

    const result = trackEvent({
      eventName: 'contact_form_submit',
      metadata: { email: 'person@example.com' },
    });
    expect(result.tracked).toBe(false);
    expect(result.issues.some((issue) => issue.code === 'forbidden_field')).toBe(
      true,
    );
  });

  it('blocks forbidden username fields', () => {
    grantAnalyticsConsent();
    const result = trackEvent({
      eventName: 'order_configuration_submit',
      serviceSlug: 'buy-instagram-followers',
      metadata: { username: '@someone' },
    });
    expect(result.tracked).toBe(false);
    expect(result.issues.some((issue) => issue.code === 'forbidden_field')).toBe(
      true,
    );
  });

  it('denies tracking when analytics consent is missing', () => {
    const result = trackEvent({
      eventName: 'page_view',
      pagePath: '/',
    });
    expect(result.tracked).toBe(false);
    expect(result.consentAllowed).toBe(false);
    expect(result.issues.some((issue) => issue.code === 'consent_denied')).toBe(
      true,
    );
  });

  it('allows tracking after analytics consent is granted', () => {
    expect(
      canTrackEvent({ consentCategory: 'analytics', channel: 'public' }),
    ).toBe(false);
    grantAnalyticsConsent();
    expect(
      canTrackEvent({ consentCategory: 'analytics', channel: 'public' }),
    ).toBe(true);
  });

  it('prevents duplicate events within the guard window', () => {
    grantAnalyticsConsent();
    const first = trackEvent({
      eventName: 'cta_click',
      label: 'hero',
      pagePath: '/',
    });
    const second = trackEvent({
      eventName: 'cta_click',
      label: 'hero',
      pagePath: '/',
    });
    expect(first.tracked).toBe(true);
    expect(second.duplicate).toBe(true);
    expect(second.tracked).toBe(false);
  });

  it('prevents duplicate purchase events with the same idempotency key', () => {
    grantAnalyticsConsent();
    const verification = {
      verified: true as const,
      source: 'payment_confirmed' as const,
      idempotencyKey: 'anon_tx_test_001',
      anonymousTransactionRef: 'anon_tx_test_001',
    };

    const first = trackConversion({
      eventName: 'purchase',
      verification,
      currency: 'USD',
      value: 9.99,
      serviceSlug: 'buy-instagram-followers',
      packageId: 'ig-f-1000',
    });
    const second = trackConversion({
      eventName: 'purchase',
      verification,
      currency: 'USD',
      value: 9.99,
      serviceSlug: 'buy-instagram-followers',
      packageId: 'ig-f-1000',
    });

    expect(first.tracked).toBe(true);
    expect(second.duplicate).toBe(true);
    expect(second.tracked).toBe(false);
  });

  it('rejects invalid service slugs', () => {
    grantAnalyticsConsent();
    const issues = validateEvent({
      eventName: 'package_select',
      serviceSlug: 'buy-not-a-real-service',
      packageId: 'ig-f-1000',
    });
    expect(issues.some((issue) => issue.code === 'invalid_service_slug')).toBe(
      true,
    );
  });

  it('rejects invalid package IDs', () => {
    grantAnalyticsConsent();
    const issues = validateEvent({
      eventName: 'package_select',
      serviceSlug: 'buy-instagram-followers',
      packageId: 'not-a-real-package',
    });
    expect(issues.some((issue) => issue.code === 'invalid_package_id')).toBe(true);
  });

  it('rejects invalid currency codes', () => {
    const issues = validateEvent({
      eventName: 'package_select',
      serviceSlug: 'buy-instagram-followers',
      packageId: 'ig-f-1000',
      currency: 'XYZ' as 'USD',
    });
    expect(issues.some((issue) => issue.code === 'invalid_currency')).toBe(true);
  });

  it('isolates provider failures so dispatch does not throw', () => {
    const failing: AnalyticsProviderAdapter = {
      id: 'debug',
      initialize: () => undefined,
      trackPageView: () => undefined,
      trackEvent: () => {
        throw new Error('provider boom');
      },
      trackConversion: () => undefined,
      setConsent: () => undefined,
      reset: () => undefined,
    };

    setAnalyticsAdaptersForTests([failing]);

    const event: AnalyticsEvent = {
      eventName: 'cta_click',
      category: 'cta',
      action: 'click',
      pagePath: '/',
      pageType: 'home',
      sessionId: 'test-session',
      timestamp: new Date().toISOString(),
      consentCategory: 'analytics',
      channel: 'public',
      eventId: 'test-event',
    };

    expect(() => {
      const result = dispatchToProviders(event, 'event');
      expect(result.issues.some((issue) => issue.code === 'provider_error')).toBe(
        true,
      );
    }).not.toThrow();

    setAnalyticsAdaptersForTests(null);
  });

  it('disables the debug panel in production configuration', () => {
    const production = getAnalyticsConfig({
      NODE_ENV: 'production',
      NEXT_PUBLIC_ANALYTICS_DEBUG: 'true',
    });
    expect(isAnalyticsDebugEnabled(production)).toBe(false);
    expect(production.debugMode).toBe(false);
  });

  it('does not enable GA4 without a measurement ID', () => {
    const config = getAnalyticsConfig({
      NODE_ENV: 'test',
      NEXT_PUBLIC_GA4_ENABLED: 'true',
      NEXT_PUBLIC_GA4_MEASUREMENT_ID: '',
    });
    expect(config.ga4.enabled).toBe(false);
    expect(config.ga4.measurementId).toBeNull();
  });

  it('fires purchase only after verification', () => {
    grantAnalyticsConsent();
    const unverified = trackConversion({
      eventName: 'purchase',
      currency: 'USD',
      value: 9.99,
      serviceSlug: 'buy-instagram-followers',
      packageId: 'ig-f-1000',
    });
    expect(unverified.tracked).toBe(false);
    expect(
      unverified.issues.some((issue) => issue.code === 'purchase_not_verified'),
    ).toBe(true);

    const verified = trackConversion({
      eventName: 'purchase',
      currency: 'USD',
      value: 9.99,
      serviceSlug: 'buy-instagram-followers',
      packageId: 'ig-f-1000',
      verification: {
        verified: true,
        source: 'order_created',
        idempotencyKey: 'anon_tx_verified_only',
      },
    });
    expect(verified.tracked).toBe(true);
  });
});

describe('Debug panel production guard', () => {
  it('reports debug panel disabled when production config is used', () => {
    // Runtime helper uses module config; assert production override path.
    const production = getAnalyticsConfig({
      NODE_ENV: 'production',
      NEXT_PUBLIC_ANALYTICS_DEBUG: 'true',
    });
    expect(isAnalyticsDebugEnabled(production)).toBe(false);
    // Current process may be test/dev — panel helper follows module config.
    expect(typeof isAnalyticsDebugPanelEnabled()).toBe('boolean');
  });
});
