import { NextResponse, type NextRequest } from 'next/server';

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionTokenEdge,
} from '@/lib/admin/auth-edge';
import {
  getSiteOrigin,
  isLegacyCheckoutHostname,
  mapLegacyCheckoutPathToMain,
} from '@/lib/config/hosts';
import { shouldBlockRequest } from '@/lib/geo/blocked-countries';
import {
  LEGACY_GONE_HTML,
  buildLegacyRedirectLocation,
  resolveLegacySeoPath,
} from '@/lib/seo/legacy-urls';

/**
 * Middleware:
 * - Legacy SEO redirects / 410 Gone (before trailing-slash normalization)
 * - Trailing-slash normalization (replaces default Next strip when skipTrailingSlashRedirect)
 * - Geo block for unsupported countries (public storefront)
 * - Permanent redirect from retired checkout subdomain → main /checkout
 * - Admin session gate
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host');

  // ── Legacy SEO (before geo / trailing-slash normalization) ─────────
  const legacy = resolveLegacySeoPath(pathname);
  if (legacy.kind === 'gone') {
    return new NextResponse(LEGACY_GONE_HTML, {
      status: 410,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'noindex',
      },
    });
  }
  if (legacy.kind === 'redirect') {
    // Explicit Location path so slash variants never chain through slash-normalization.
    const location = buildLegacyRedirectLocation(
      request.nextUrl.origin,
      legacy.destination,
      request.nextUrl.search,
    );
    return NextResponse.redirect(new URL(location, request.nextUrl.origin), 308);
  }

  // Restore default Next behavior: /about/ → /about (query preserved).
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, '') || '/';
    return NextResponse.redirect(url, 308);
  }

  // ── Geo availability (public site only) ───────────────────────────
  if (shouldBlockRequest({ pathname, headers: request.headers })) {
    const url = request.nextUrl.clone();
    url.pathname = '/unavailable';
    url.search = '';
    const response = NextResponse.rewrite(url);
    response.headers.set('x-robots-tag', 'noindex, nofollow');
    response.headers.set('cache-control', 'private, no-store');
    return response;
  }

  // ── Retired checkout subdomain → main InstantViral checkout ───────
  // Preserves recovery tokens and query params for in-flight emails/bookmarks.
  if (isLegacyCheckoutHostname(host)) {
    const site = getSiteOrigin();
    const mappedPath = mapLegacyCheckoutPathToMain(pathname);
    const url = new URL(mappedPath + request.nextUrl.search, site);
    return NextResponse.redirect(url, 308);
  }

  // Checkout utility routes stay noindex (also set in page metadata).
  if (pathname === '/checkout' || pathname.startsWith('/checkout/')) {
    const response = NextResponse.next();
    response.headers.set('x-robots-tag', 'noindex, nofollow');
    return response;
  }

  // ── Admin gate (main site) ────────────────────────────────────────
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifyAdminSessionTokenEdge(token);
  if (valid) return NextResponse.next();

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Run on all paths except static assets / image optimization.
     */
    '/((?!_next/static|_next/image|favicon.ico|assets/|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
