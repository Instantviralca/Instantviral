'use client';

/**
 * Automatic page view tracker — Document 14.09.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { getAnalyticsContext } from '@/lib/analytics/core/context';

export function PageViewTracker() {
  const analytics = useAnalyticsOptional();
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!analytics?.ready) return;
    if (!pathname) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const context = getAnalyticsContext({ pagePath: pathname });
    analytics.track({
      eventName: pathname === '/' ? 'home_page_view' : 'page_view',
      pagePath: context.pagePath,
      pageType: context.pageType,
    });
  }, [analytics, pathname]);

  return null;
}
