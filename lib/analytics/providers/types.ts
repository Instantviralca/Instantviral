/**
 * Analytics provider adapter interface helpers — Document 14.09.
 */

import type {
  AnalyticsProviderAdapter,
  AnalyticsProviderId,
} from '@/types/analytics';

export type { AnalyticsProviderAdapter };

export function createNoopAdapter(id: AnalyticsProviderId): AnalyticsProviderAdapter {
  return {
    id,
    initialize: () => undefined,
    trackPageView: () => undefined,
    trackEvent: () => undefined,
    trackConversion: () => undefined,
    setConsent: () => undefined,
    reset: () => undefined,
  };
}
