import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ABANDONED_CART_COOKIE,
  ABANDONED_CART_COOKIE_MAX_AGE_SECONDS,
} from '@/config/abandoned-cart';
import { captureCheckoutActivity } from '@/lib/abandoned-cart/capture';
import { generateCheckoutSessionId } from '@/lib/abandoned-cart/tokens';
import { getCartCookieDomainFromSiteOrigin } from '@/lib/config/hosts';
import type { CustomerInformation } from '@/types/checkout';
import type { AppliedCoupon, CartItem } from '@/types/cart';
import type { CurrencyCode } from '@/types/pricing';

export const runtime = 'nodejs';

type Body = {
  customer?: CustomerInformation;
  items?: CartItem[];
  coupon?: AppliedCoupon | null;
  currency?: CurrencyCode;
  totals?: {
    subtotal: { amount: number; currency: CurrencyCode };
    discount: { amount: number; currency: CurrencyCode };
    total: { amount: number; currency: CurrencyCode };
  };
  checkoutSessionId?: string;
};

function sessionCookieOptions() {
  const domain = getCartCookieDomainFromSiteOrigin();
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: ABANDONED_CART_COOKIE_MAX_AGE_SECONDS,
    ...(domain ? { domain } : {}),
  };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const jar = await cookies();
  const cookieSession = jar.get(ABANDONED_CART_COOKIE)?.value?.trim();
  const checkoutSessionId =
    (typeof body.checkoutSessionId === 'string' && body.checkoutSessionId.trim()) ||
    cookieSession ||
    generateCheckoutSessionId();

  if (!body.customer || !Array.isArray(body.items)) {
    return NextResponse.json({ ok: false, error: 'Missing customer or items' }, { status: 400 });
  }

  try {
    const result = await captureCheckoutActivity({
      checkoutSessionId,
      customer: body.customer,
      items: body.items,
      coupon: body.coupon ?? null,
      currency: body.currency,
      totals: body.totals,
    });

    const response = NextResponse.json({
      ok: result.ok,
      skipped: result.skipped ?? false,
      reason: result.reason,
      cartId: result.cartId,
      checkoutSessionId,
    });

    response.cookies.set(ABANDONED_CART_COOKIE, checkoutSessionId, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error('[abandoned-cart] track failed', {
      message: error instanceof Error ? error.message : 'unknown',
    });
    return NextResponse.json({ ok: false, error: 'Unable to track checkout' }, { status: 500 });
  }
}
