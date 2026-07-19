import { NextResponse, type NextRequest } from 'next/server';

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionTokenEdge,
} from '@/lib/admin/auth-edge';
import {
  getSiteOrigin,
  isCheckoutHostForced,
  isCheckoutHostname,
} from '@/lib/config/hosts';

/**
 * Middleware:
 * - Admin session gate
 * - Checkout host routing (checkout.instantviral.ca → checkout shell)
 */
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const host = request.headers.get('host');
  const checkoutHost =
    isCheckoutHostname(host) || isCheckoutHostForced(searchParams);

  // ── Checkout subdomain ────────────────────────────────────────────
  if (checkoutHost) {
    // Never serve admin from checkout host.
    if (pathname.startsWith('/admin')) {
      const site = getSiteOrigin();
      return NextResponse.redirect(new URL(pathname, site));
    }

    // Allow APIs needed for place-order (and Stripe webhook if pointed here).
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Success page lives on main site for brand/analytics consistency.
    if (pathname.startsWith('/order-success')) {
      const site = getSiteOrigin();
      const url = new URL('/order-success', site);
      request.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      return NextResponse.redirect(url);
    }

    // Checkout experience at / and /checkout
    if (pathname === '/' || pathname === '/checkout') {
      const url = request.nextUrl.clone();
      url.pathname = '/checkout';
      const response = NextResponse.rewrite(url);
      response.headers.set('x-iv-checkout-host', '1');
      return response;
    }

    // Cart on checkout host → checkout
    if (pathname === '/cart') {
      const url = request.nextUrl.clone();
      url.pathname = '/checkout';
      const response = NextResponse.redirect(url);
      response.headers.set('x-iv-checkout-host', '1');
      return response;
    }

    // Everything else → main marketing site
    const site = getSiteOrigin();
    return NextResponse.redirect(new URL(pathname + request.nextUrl.search, site));
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
     * Checkout host routing needs broad coverage.
     */
    '/((?!_next/static|_next/image|favicon.ico|assets/|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
