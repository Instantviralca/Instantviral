import { NextResponse } from 'next/server';

import { CART_COOKIE_MAX_CHARS, CART_COOKIE_NAME } from '@/lib/cart/cookie-store';
import { createCartHandoff } from '@/lib/cart/handoff-store';
import { serializeCart, deserializeCart } from '@/lib/cart/utils';
import {
  getCartCookieDomainFromSiteOrigin,
  getCheckoutUrl,
  isDedicatedCheckoutConfigured,
} from '@/lib/config/hosts';
import type { CartState } from '@/types/cart';

export const runtime = 'nodejs';

/**
 * Prepare checkout navigation.
 * Dedicated checkout subdomain: always use one-time cartHandoff query (reliable).
 * Same-origin checkout: shared cookie is enough.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { cart?: CartState };
    const cart = body.cart ? deserializeCart(JSON.stringify(body.cart)) : null;
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ ok: false, error: 'Cart is empty.' }, { status: 400 });
    }

    const payload = serializeCart(cart);
    const checkoutBase = getCheckoutUrl('/');
    const dedicated = isDedicatedCheckoutConfigured();

    // Cross-subdomain: never rely on cookies alone (Domain / serverless issues).
    if (dedicated) {
      const handoffId = await createCartHandoff(payload);
      const url = new URL(checkoutBase);
      url.searchParams.set('cartHandoff', handoffId);

      const response = NextResponse.json({ ok: true, checkoutUrl: url.toString() });
      // Best-effort cookie as well (parent domain, no leading dot).
      if (payload.length <= CART_COOKIE_MAX_CHARS) {
        const domain = getCartCookieDomainFromSiteOrigin()?.replace(/^\./, '');
        response.cookies.set({
          name: CART_COOKIE_NAME,
          value: encodeURIComponent(payload),
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'lax',
          secure: true,
          ...(domain ? { domain } : {}),
        });
      }
      return response;
    }

    const response = NextResponse.json({ ok: true, checkoutUrl: checkoutBase });
    if (payload.length <= CART_COOKIE_MAX_CHARS) {
      response.cookies.set({
        name: CART_COOKIE_NAME,
        value: encodeURIComponent(payload),
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to prepare checkout.',
      },
      { status: 500 },
    );
  }
}
