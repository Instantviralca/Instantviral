'use client';

/**
 * Verified conversion / purchase tracker — Document 14.09.
 * Only fires after explicit verification + idempotency key.
 */

import { useEffect, useRef } from 'react';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { trackConversion } from '@/lib/analytics/core/track';
import type {
  AnalyticsEventInput,
  AnalyticsTrackResult,
  PurchaseVerification,
} from '@/types/analytics';

type ConversionTrackerProps = {
  /** When false/undefined, nothing is tracked. */
  enabled?: boolean;
  eventName?: string;
  verification: PurchaseVerification;
  payload?: Omit<AnalyticsEventInput, 'eventName' | 'verification'>;
  onTracked?: (result: AnalyticsTrackResult) => void;
};

/**
 * Mount on a verified order-success surface only.
 * Refresh-safe via purchase idempotency keys.
 */
export function ConversionTracker({
  enabled = true,
  eventName = 'purchase',
  verification,
  payload,
  onTracked,
}: ConversionTrackerProps) {
  const analytics = useAnalyticsOptional();
  const fired = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (!verification.verified || !verification.idempotencyKey) return;
    if (fired.current) return;
    fired.current = true;

    const result = analytics
      ? analytics.track({
          ...payload,
          eventName,
          verification,
          consentCategory: 'marketing',
          category: 'purchase',
        })
      : trackConversion({
          ...payload,
          eventName,
          verification,
        });

    onTracked?.(result);
  }, [analytics, enabled, eventName, onTracked, payload, verification]);

  return null;
}
