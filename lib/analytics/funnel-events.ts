/**
 * First-party analytics event catalog — Contabo-portable allowlist.
 * Keep historical names for compatibility; add commerce/recovery events.
 */

export const ANALYTICS_EVENT_NAMES = [
  // Navigation / engagement (client)
  'page_view',
  'home_page_view',
  'service_page_view',
  'service_view',
  'package_view',
  'cta_click',
  'cart_item_add',
  // Checkout (client + server)
  'checkout_view',
  'checkout_started',
  'checkout_email_entered',
  'checkout_details_completed',
  'checkout_submit',
  'place_order_clicked',
  'payment_started',
  'payment_failed',
  'payment_completed',
  'purchase',
  'order_completed',
  // Abandoned cart / recovery (mostly server)
  'cart_tracking_started',
  'cart_abandoned',
  'recovery_email_sent',
  'recovery_email_clicked',
  'recovery_checkout_opened',
  'cart_recovered',
  'cart_lost',
  // Existing engagement still useful in admin/internal when emitted
  'contact_page_view',
  'contact_form_submit',
  'track_order_click',
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

const EVENT_SET = new Set<string>(ANALYTICS_EVENT_NAMES);

/** @deprecated Prefer ANALYTICS_EVENT_NAMES — kept for older imports. */
export const FUNNEL_EVENT_NAMES = ANALYTICS_EVENT_NAMES;
export type FunnelEventName = AnalyticsEventName;

export const LANDING_EVENT_NAMES = new Set<string>([
  'page_view',
  'home_page_view',
  'service_page_view',
  'service_view',
]);

export const CART_EVENT_NAMES = new Set<string>(['cart_item_add']);

export const CHECKOUT_EVENT_NAMES = new Set<string>([
  'checkout_view',
  'checkout_started',
  'checkout_submit',
  'place_order_clicked',
  'payment_started',
]);

export const PURCHASE_EVENT_NAMES = new Set<string>([
  'purchase',
  'payment_completed',
  'order_completed',
]);

export function isFunnelEventName(name: string): name is AnalyticsEventName {
  return EVENT_SET.has(name);
}

export function isAnalyticsEventName(name: string): name is AnalyticsEventName {
  return EVENT_SET.has(name);
}

export function isAdminPath(pagePath: string): boolean {
  return pagePath === '/admin' || pagePath.startsWith('/admin/');
}

export function isCheckoutPath(pagePath: string): boolean {
  return pagePath === '/checkout' || pagePath.startsWith('/checkout/');
}

export function isNoisePath(pagePath: string): boolean {
  if (isAdminPath(pagePath)) return true;
  if (pagePath.startsWith('/api/')) return true;
  if (pagePath.startsWith('/_next/')) return true;
  if (pagePath === '/robots.txt' || pagePath === '/sitemap.xml') return true;
  if (pagePath === '/favicon.ico' || pagePath.startsWith('/icons/')) return true;
  return false;
}

/** Resolve ISO-3166-1 alpha-2 country from CDN / edge headers (no paid geo-IP). */
export function resolveCountryFromHeaders(headers: Headers): string {
  const candidates = [
    headers.get('x-vercel-ip-country'),
    headers.get('cf-ipcountry'),
    headers.get('cloudfront-viewer-country'),
    headers.get('x-country-code'),
  ];
  for (const raw of candidates) {
    const code = raw?.trim().toUpperCase();
    if (code && /^[A-Z]{2}$/.test(code) && code !== 'XX' && code !== 'T1') {
      return code;
    }
  }
  return 'XX';
}

const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  CA: 'Canada',
  GB: 'United Kingdom',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  IN: 'India',
  PK: 'Pakistan',
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  NL: 'Netherlands',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  IE: 'Ireland',
  NZ: 'New Zealand',
  BR: 'Brazil',
  MX: 'Mexico',
  ES: 'Spain',
  IT: 'Italy',
  PL: 'Poland',
  TR: 'Turkey',
  SG: 'Singapore',
  MY: 'Malaysia',
  PH: 'Philippines',
  ID: 'Indonesia',
  NG: 'Nigeria',
  ZA: 'South Africa',
  XX: 'Unknown',
};

export function countryDisplayName(code: string): string {
  const normalized = code.trim().toUpperCase() || 'XX';
  return COUNTRY_NAMES[normalized] ?? normalized;
}
