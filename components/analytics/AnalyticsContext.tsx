'use client';

/**
 * Analytics React context — Document 14.09.
 */

import { createContext, useContext } from 'react';

import type { AnalyticsConsentState, AnalyticsTrackResult } from '@/types/analytics';
import type { AnalyticsEventInput } from '@/types/analytics';

export type AnalyticsContextValue = {
  consent: AnalyticsConsentState;
  setConsent: (
    next: Partial<Pick<AnalyticsConsentState, 'analytics' | 'marketing'>>,
  ) => void;
  track: (input: AnalyticsEventInput) => AnalyticsTrackResult;
  ready: boolean;
};

export const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function useAnalytics(): AnalyticsContextValue {
  const value = useContext(AnalyticsContext);
  if (!value) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return value;
}

/** Safe hook when analytics may be outside the provider (never throws). */
export function useAnalyticsOptional(): AnalyticsContextValue | null {
  return useContext(AnalyticsContext);
}
