/**
 * Site / checkout URL helpers.
 *
 * Checkout is always on the main InstantViral origin at `/checkout`.
 * A separate checkout subdomain is deprecated; legacy hosts are redirected
 * to the main domain (see middleware).
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
 * @deprecated Checkout no longer uses a separate origin.
 * Always returns the main site origin. Kept for call-site compatibility.
 */
export function getCheckoutOrigin(): string {
  return getSiteOrigin();
}

/**
 * Relative checkout path on the main app (prefer for in-browser navigation).
 * `/` maps to `/checkout`. Recovery paths stay `/checkout/recover/...`.
 */
export function getCheckoutPath(path = '/'): string {
  if (path === '/' || path === '') return '/checkout';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/checkout' || normalized.startsWith('/checkout/')) {
    return normalized;
  }
  return normalized;
}

/**
 * Absolute URL for the checkout experience on the main domain.
 * Prefer `getCheckoutPath` for same-origin client navigation.
 */
export function getCheckoutUrl(path = '/'): string {
  return `${getSiteOrigin()}${getCheckoutPath(path)}`;
}

export function getSiteUrlPath(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/** Parent cookie domain (e.g. .instantviral.ca). Null on localhost. */
export function getCartCookieDomain(): string | null {
  try {
    // Prefer the live browser host so cookies work even if SITE_URL env is wrong.
    const host =
      typeof window !== 'undefined'
        ? window.location.hostname.toLowerCase()
        : new URL(getSiteOrigin()).hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')) {
      return null;
    }
    // Reject public-suffix style hosts where Domain= would be ignored (e.g. vercel.app).
    if (host === 'vercel.app' || host.endsWith('.vercel.app')) {
      return null;
    }
    const parts = host.split('.');
    if (parts.length >= 2) {
      return `.${parts.slice(-2).join('.')}`;
    }
    return null;
  } catch {
    return null;
  }
}

/** Server-only cookie Domain from configured site origin. */
export function getCartCookieDomainFromSiteOrigin(): string | null {
  try {
    const host = new URL(getSiteOrigin()).hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')) {
      return null;
    }
    if (host === 'vercel.app' || host.endsWith('.vercel.app')) {
      return null;
    }
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

export function getSiteHostname(): string {
  try {
    return normalizeHost(new URL(getSiteOrigin()).hostname);
  } catch {
    return '';
  }
}

/**
 * Hostname of a retired checkout subdomain, if still configured for redirects.
 * Prefer `NEXT_PUBLIC_LEGACY_CHECKOUT_HOST` or leftover `NEXT_PUBLIC_CHECKOUT_URL`.
 * Falls back to `checkout.{apex}` when the site host is a normal apex domain.
 */
export function getLegacyCheckoutHostname(): string {
  const explicit = process.env.NEXT_PUBLIC_LEGACY_CHECKOUT_HOST?.trim().toLowerCase();
  if (explicit) return normalizeHost(explicit);

  const legacyUrl = trimOrigin(process.env.NEXT_PUBLIC_CHECKOUT_URL);
  if (legacyUrl) {
    try {
      const host = normalizeHost(new URL(legacyUrl).hostname);
      const siteHost = getSiteHostname();
      if (host && siteHost && host !== siteHost) return host;
    } catch {
      // ignore invalid legacy URL
    }
  }

  const siteHost = getSiteHostname();
  if (!siteHost || siteHost === 'localhost' || siteHost.endsWith('.localhost')) {
    return '';
  }
  if (siteHost === 'vercel.app' || siteHost.endsWith('.vercel.app')) {
    return '';
  }
  // Default legacy host for InstantViral-style apex domains.
  const parts = siteHost.split('.');
  if (parts.length === 2) {
    return `checkout.${siteHost}`;
  }
  return '';
}

/**
 * @deprecated Always false — checkout is served on the main domain only.
 * Kept so older call sites compile without dedicated-host branches.
 */
export function isDedicatedCheckoutConfigured(): boolean {
  return false;
}

/**
 * True when this request Host is a retired checkout subdomain that should
 * permanently redirect onto the main-domain `/checkout` routes.
 */
export function isLegacyCheckoutHostname(host: string | null | undefined): boolean {
  const requestHost = normalizeHost(host);
  const legacyHost = getLegacyCheckoutHostname();
  if (!requestHost || !legacyHost) return false;
  if (requestHost === getSiteHostname()) return false;
  return requestHost === legacyHost;
}

/**
 * @deprecated Prefer isLegacyCheckoutHostname for redirects.
 * No longer means "serve checkout-only chrome" — always false for app logic.
 */
export function isCheckoutHostname(host: string | null | undefined): boolean {
  return isLegacyCheckoutHostname(host);
}

/** @deprecated Dev force flag removed with dedicated checkout host. */
export function isCheckoutHostForced(_searchParams: URLSearchParams | string): boolean {
  return false;
}

/**
 * Map a legacy checkout-subdomain pathname onto the main-site checkout path.
 * Preserves recovery tokens and query strings via the caller.
 */
export function mapLegacyCheckoutPathToMain(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/checkout';
  if (pathname === '/cart') return '/checkout';
  if (pathname === '/checkout' || pathname.startsWith('/checkout/')) return pathname;
  // Non-checkout paths on the old host go to the same path on the main site.
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}
