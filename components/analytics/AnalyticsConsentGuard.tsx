'use client';

/**
 * Analytics consent guard helpers — Document 14.09.
 */

import type { ReactNode } from 'react';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { canTrackEvent } from '@/lib/analytics/core/consent';
import type { AnalyticsConsentCategory } from '@/types/analytics';

type AnalyticsConsentGuardProps = {
  category: AnalyticsConsentCategory;
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Renders children only when consent allows the given category.
 * Useful for lazy-loading optional marketing scripts in the future.
 */
export function AnalyticsConsentGuard({
  category,
  children,
  fallback = null,
}: AnalyticsConsentGuardProps) {
  const analytics = useAnalyticsOptional();
  const consent = analytics?.consent ?? {
    essential: true as const,
    analytics: false,
    marketing: false,
    updatedAt: null,
  };

  const allowed = canTrackEvent(
    { consentCategory: category, channel: 'public' },
    consent,
  );

  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}
