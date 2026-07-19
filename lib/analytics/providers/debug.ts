/**
 * Internal debug analytics adapter — Document 14.09.
 * Development / test only — never ships as a production marketing provider.
 */

import { isAnalyticsDebugEnabled } from '@/config/analytics';
import { pushAnalyticsDebugRecord } from '@/lib/analytics/core/debug-store';
import { mapEventToProvider } from '@/lib/analytics/core/map-event';
import type {
  AnalyticsEvent,
  AnalyticsProviderAdapter,
  AnalyticsProviderConsent,
} from '@/types/analytics';

let lastConsent: AnalyticsProviderConsent = {
  analytics: false,
  marketing: false,
};

export function createDebugAdapter(): AnalyticsProviderAdapter | null {
  if (!isAnalyticsDebugEnabled()) return null;

  return {
    id: 'debug',
    initialize: () => undefined,
    trackPageView: (event: AnalyticsEvent) => {
      void mapEventToProvider(event, 'debug');
    },
    trackEvent: (event: AnalyticsEvent) => {
      void mapEventToProvider(event, 'debug');
    },
    trackConversion: (event: AnalyticsEvent) => {
      void mapEventToProvider(event, 'debug');
    },
    setConsent: (consent: AnalyticsProviderConsent) => {
      lastConsent = consent;
    },
    reset: () => {
      lastConsent = { analytics: false, marketing: false };
    },
  };
}

export function getDebugAdapterConsentForTests(): AnalyticsProviderConsent {
  return lastConsent;
}

/** Helper used by dispatcher to mirror final decisions into the debug panel. */
export function recordDebugDispatch(args: {
  event: AnalyticsEvent | null;
  eventName: string;
  consentAllowed: boolean;
  providers: AnalyticsEvent extends never ? never : string[];
  duplicate: boolean;
  issues: Parameters<typeof pushAnalyticsDebugRecord>[0]['issues'];
}): void {
  if (!isAnalyticsDebugEnabled()) return;
  pushAnalyticsDebugRecord({
    id: args.event?.eventId ?? `dbg_${Date.now()}`,
    at: new Date().toISOString(),
    eventName: args.eventName,
    sanitizedPayload: args.event,
    consentAllowed: args.consentAllowed,
    providers: args.providers as Parameters<typeof pushAnalyticsDebugRecord>[0]['providers'],
    duplicate: args.duplicate,
    issues: args.issues,
  });
}
