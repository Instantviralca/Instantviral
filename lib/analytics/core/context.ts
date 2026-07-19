/**
 * Analytics runtime context — Document 14.09.
 */

import { getAnalyticsSessionId } from '@/lib/analytics/core/session';
import type { AnalyticsPageType } from '@/types/analytics';

export type AnalyticsRuntimeContext = {
  pagePath: string;
  pageType: AnalyticsPageType;
  sessionId: string;
  timestamp: string;
};

function inferPageType(pathname: string): AnalyticsPageType {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname.startsWith('/buy-')) return 'service';
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/faq') return 'faq';
  if (pathname.startsWith('/track-order')) return 'track_order';
  if (pathname === '/cart') return 'cart';
  if (pathname === '/checkout') return 'checkout';
  if (pathname === '/order-success') return 'order_success';
  if (
    pathname === '/privacy-policy' ||
    pathname === '/terms-and-conditions' ||
    pathname === '/refund-policy' ||
    pathname === '/cookie-policy' ||
    pathname === '/disclaimer'
  ) {
    return 'legal';
  }
  if (pathname.startsWith('/learn')) return 'learn';
  if (pathname.startsWith('/reviews')) return 'reviews';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'other';
}

/**
 * Build page/session context for an event.
 * Safe for SSR — uses defaults when window is unavailable.
 */
export function getAnalyticsContext(
  overrides?: Partial<Pick<AnalyticsRuntimeContext, 'pagePath' | 'pageType'>>,
): AnalyticsRuntimeContext {
  const pagePath =
    overrides?.pagePath ??
    (typeof window !== 'undefined' ? window.location.pathname || '/' : '/');

  return {
    pagePath,
    pageType: overrides?.pageType ?? inferPageType(pagePath),
    sessionId: getAnalyticsSessionId(),
    timestamp: new Date().toISOString(),
  };
}
