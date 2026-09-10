import { describe, expect, it } from 'vitest';

import {
  buildAttributionFromSearchParams,
  classifyChannel,
  normalizePath,
} from '@/lib/analytics/attribution';
import { parseUserAgent } from '@/lib/analytics/device';
import {
  getFunnelRangeBounds,
  parseFunnelRange,
} from '@/lib/admin/funnel-analytics';
import { isAnalyticsEventName, isNoisePath } from '@/lib/analytics/funnel-events';

describe('analytics attribution', () => {
  it('classifies paid search from gclid', () => {
    expect(classifyChannel({ gclid: 'abc' })).toBe('Paid Search');
  });

  it('classifies organic search from google referrer', () => {
    expect(classifyChannel({ referrerHost: 'www.google.com' })).toBe('Organic Search');
  });

  it('classifies direct when empty', () => {
    expect(classifyChannel({})).toBe('Direct');
  });

  it('parses UTM params without inventing values', () => {
    const snap = buildAttributionFromSearchParams(
      '/buy-instagram-followers',
      {
        utm_source: 'newsletter',
        utm_medium: 'email',
        utm_campaign: 'spring',
      },
      null,
    );
    expect(snap.utmSource).toBe('newsletter');
    expect(snap.channel).toBe('Email');
    expect(snap.gclid).toBeNull();
  });

  it('normalizes paths without query noise', () => {
    expect(normalizePath('/buy-instagram-followers/?utm_source=x')).toBe(
      '/buy-instagram-followers',
    );
  });
});

describe('analytics device parsing', () => {
  it('detects mobile and desktop', () => {
    expect(
      parseUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
      ).deviceCategory,
    ).toBe('mobile');
    expect(
      parseUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0',
      ).deviceCategory,
    ).toBe('desktop');
  });
});

describe('analytics event allowlist', () => {
  it('accepts catalog events and rejects arbitrary names', () => {
    expect(isAnalyticsEventName('checkout_started')).toBe(true);
    expect(isAnalyticsEventName('payment_completed')).toBe(true);
    expect(isAnalyticsEventName('revenue_hack')).toBe(false);
  });

  it('filters noise paths', () => {
    expect(isNoisePath('/admin/analytics')).toBe(true);
    expect(isNoisePath('/api/jobs/abandoned-carts')).toBe(true);
    expect(isNoisePath('/checkout')).toBe(false);
  });
});

describe('analytics date ranges', () => {
  it('parses known ranges and defaults to 7d', () => {
    expect(parseFunnelRange('30d')).toBe('30d');
    expect(parseFunnelRange('nope')).toBe('7d');
  });

  it('builds previous period of equal length', () => {
    const now = new Date('2026-09-08T12:00:00.000Z');
    const bounds = getFunnelRangeBounds('7d', now);
    const current = Date.parse(bounds.untilIso) - Date.parse(bounds.sinceIso);
    const previous = Date.parse(bounds.previousUntilIso) - Date.parse(bounds.previousSinceIso);
    expect(Math.abs(current - previous)).toBeLessThan(1000);
  });
});

describe('client revenue spoofing guard', () => {
  it('does not treat client metadata amount fields as analytics event names', () => {
    expect(isAnalyticsEventName('payment_completed')).toBe(true);
    // Revenue spoofing is blocked at collect sanitizeMetadata — event catalog has no revenue event.
    expect(isAnalyticsEventName('set_revenue')).toBe(false);
  });
});
