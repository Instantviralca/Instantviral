/**
 * Site / checkout host helpers for multi-domain checkout (checkout.instantviral.ca).
 * Client-safe: only reads NEXT_PUBLIC_* values.
 */

function trimOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/$/, '');
  return trimmed || undefined;
}

/** Marketing / main site origin (e.g. https://instantviral.ca). */
export function getSiteOrigin(): string {
  return (
    trimOrigin(process.env.NEXT_PUBLIC_SITE_URL) ||
    trimOrigin(process.env.SITE_URL) ||
    'http://localhost:3000'
  );
}

/**
 * External checkout origin (e.g. https://checkout.instantviral.ca).
 * Falls back to main site `/checkout` path origin when unset (local/dev).
 */
export function getCheckoutOrigin(): string {
  const configured = trimOrigin(process.env.NEXT_PUBLIC_CHECKOUT_URL);
  if (configured) return configured;
  return getSiteOrigin();
}

/** Absolute URL for the checkout experience. */
export function getCheckoutUrl(path = '/'): string {
  const origin = getCheckoutOrigin();
  const site = getSiteOrigin();
  // Same-origin fallback: use /checkout on the main site.
  if (origin === site) {
    const normalized = path === '/' ? '/checkout' : path.startsWith('/') ? path : `/${path}`;
    return `${site}${normalized === '/checkout' ? '/checkout' : normalized}`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized === '/' ? '/' : normalized}`;
}

export function getSiteUrlPath(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/** Parent cookie domain (e.g. .instantviral.ca). Null on localhost. */
export function getCartCookieDomain(): string | null {
  try {
    const host = new URL(getSiteOrigin()).hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')) {
      return null;
    }
    // checkout.instantviral.ca + instantviral.ca → .instantviral.ca
    const parts = host.split('.');
    if (parts.length >= 2) {
      return `.${parts.slice(-2).join('.')}`;
    }
    return null;
  } catch {
    return null;
  }
}

export function normalizeHost(host: string | null | undefined): string {
  return (host ?? '').split(':')[0]?.toLowerCase() ?? '';
}

export function getCheckoutHostname(): string {
  try {
    return normalizeHost(new URL(getCheckoutOrigin()).hostname);
  } catch {
    return '';
  }
}

export function getSiteHostname(): string {
  try {
    return normalizeHost(new URL(getSiteOrigin()).hostname);
  } catch {
    return '';
  }
}

/** True when this request Host is the dedicated checkout host. */
export function isCheckoutHostname(host: string | null | undefined): boolean {
  const requestHost = normalizeHost(host);
  const checkoutHost = getCheckoutHostname();
  const siteHost = getSiteHostname();
  if (!requestHost || !checkoutHost) return false;
  // Same-origin fallback (no dedicated subdomain configured).
  if (checkoutHost === siteHost) return false;
  return requestHost === checkoutHost;
}

/** Dev-only: ?checkoutHost=1 forces checkout-host behaviour on any host. */
export function isCheckoutHostForced(searchParams: URLSearchParams | string): boolean {
  if (process.env.NODE_ENV === 'production') return false;
  const params =
    typeof searchParams === 'string'
      ? new URLSearchParams(searchParams.startsWith('?') ? searchParams.slice(1) : searchParams)
      : searchParams;
  return params.get('checkoutHost') === '1';
}
