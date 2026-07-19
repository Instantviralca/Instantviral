'use client';

/**
 * Root analytics provider — Document 14.09.
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { AnalyticsConsentGuard } from '@/components/analytics/AnalyticsConsentGuard';
import {
  AnalyticsContext,
  type AnalyticsContextValue,
} from '@/components/analytics/AnalyticsContext';
import { AnalyticsDebugPanel } from '@/components/analytics/AnalyticsDebugPanel';
import { AnalyticsErrorBoundary } from '@/components/analytics/AnalyticsErrorBoundary';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import {
  getAnalyticsConsent,
  hydrateAnalyticsConsent,
  setAnalyticsConsent,
} from '@/lib/analytics/core/consent';
import {
  initializeAnalyticsProviders,
  syncProviderConsent,
} from '@/lib/analytics/core/dispatch';
import { trackEvent } from '@/lib/analytics/core/track';
import type { AnalyticsConsentState, AnalyticsEventInput } from '@/types/analytics';

type AnalyticsProviderProps = {
  children: ReactNode;
};

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [consent, setConsentState] = useState<AnalyticsConsentState>(() =>
    getAnalyticsConsent(),
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hydrated = hydrateAnalyticsConsent();
    setConsentState(hydrated);
    initializeAnalyticsProviders();
    syncProviderConsent({
      analytics: hydrated.analytics,
      marketing: hydrated.marketing,
    });
    setReady(true);
  }, []);

  const setConsent = useCallback(
    (next: Partial<Pick<AnalyticsConsentState, 'analytics' | 'marketing'>>) => {
      const updated = setAnalyticsConsent(next);
      setConsentState(updated);
      syncProviderConsent({
        analytics: updated.analytics,
        marketing: updated.marketing,
      });
    },
    [],
  );

  const track = useCallback((input: AnalyticsEventInput) => trackEvent(input), []);

  const value = useMemo<AnalyticsContextValue>(
    () => ({
      consent,
      setConsent,
      track,
      ready,
    }),
    [consent, ready, setConsent, track],
  );

  return (
    <AnalyticsErrorBoundary>
      <AnalyticsContext.Provider value={value}>
        {children}
        <PageViewTracker />
        <AnalyticsErrorBoundary>
          <AnalyticsDebugPanel />
        </AnalyticsErrorBoundary>
        {/* Consent guard kept mounted for future optional script slots */}
        <AnalyticsConsentGuard category="analytics">
          <span data-analytics-consent="analytics" hidden />
        </AnalyticsConsentGuard>
      </AnalyticsContext.Provider>
    </AnalyticsErrorBoundary>
  );
}

export {
  AnalyticsConsentGuard,
  AnalyticsContext,
  AnalyticsDebugPanel,
  AnalyticsErrorBoundary,
  PageViewTracker,
};
