/**
 * AnalyticsDispatcher — Document 14.09 named architecture component.
 */

import {
  dispatchToProviders,
  initializeAnalyticsProviders,
  syncProviderConsent,
} from '@/lib/analytics/core/dispatch';
import type { AnalyticsEvent } from '@/types/analytics';

export const AnalyticsDispatcher = {
  initialize: initializeAnalyticsProviders,
  dispatch: dispatchToProviders,
  syncConsent: syncProviderConsent,
  dispatchEvent: (event: AnalyticsEvent) => dispatchToProviders(event, 'event'),
  dispatchPageView: (event: AnalyticsEvent) => dispatchToProviders(event, 'page_view'),
  dispatchConversion: (event: AnalyticsEvent) =>
    dispatchToProviders(event, 'conversion'),
} as const;
