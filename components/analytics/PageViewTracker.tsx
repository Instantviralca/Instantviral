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

    const track = () => {
      // Soft-404s still keep the requested pathname; skip once not-found UI is present.
      if (document.querySelector('[data-iv-not-found]')) {
        lastPath.current = pathname;
        return;
      }
      if (lastPath.current === pathname) return;
      lastPath.current = pathname;

      const context = getAnalyticsContext({ pagePath: pathname });
      const serviceSlug = pathname.startsWith('/buy-')
        ? pathname.slice(1).split('/')[0]
        : undefined;

      analytics.track({
        eventName:
          pathname === '/'
            ? 'home_page_view'
            : serviceSlug
              ? 'service_page_view'
              : 'page_view',
        pagePath: context.pagePath,
        pageType: context.pageType,
        ...(serviceSlug ? { serviceSlug } : {}),
      });
    };

    // Allow not-found to mount before deciding whether this path is real.
    const timer = window.setTimeout(track, 0);
    return () => window.clearTimeout(timer);
  }, [analytics, pathname]);

  return null;
}
