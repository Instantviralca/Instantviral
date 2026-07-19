/**
 * Analytics core barrel — Document 14.09.
 */

export { trackEvent, trackPageView, trackConversion } from '@/lib/analytics/core/track';
export { validateEvent } from '@/lib/analytics/core/validate';
export {
  sanitizeEventPayload,
  findForbiddenFieldsInEvent,
} from '@/lib/analytics/core/sanitize';
export {
  canTrackEvent,
  getAnalyticsConsent,
  setAnalyticsConsent,
  hydrateAnalyticsConsent,
  resetAnalyticsConsentForTests,
  consentAllowsCategory,
} from '@/lib/analytics/core/consent';
export { dispatchToProviders, initializeAnalyticsProviders, syncProviderConsent } from '@/lib/analytics/core/dispatch';
export {
  preventDuplicateEvent,
  preventDuplicatePurchase,
  buildEventDedupeKey,
  resetDuplicateGuardsForTests,
} from '@/lib/analytics/core/duplicate';
export { getAnalyticsContext } from '@/lib/analytics/core/context';
export { mapEventToProvider } from '@/lib/analytics/core/map-event';
export {
  getAnalyticsDebugRecords,
  subscribeAnalyticsDebug,
  clearAnalyticsDebugRecordsForTests,
} from '@/lib/analytics/core/debug-store';
export {
  getAnalyticsSessionId,
  resetAnalyticsSessionIdForTests,
} from '@/lib/analytics/core/session';
export { AnalyticsDispatcher } from '@/lib/analytics/core/dispatcher';
export { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
