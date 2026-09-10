import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ABANDONED_CART_COOKIE,
  ABANDONED_CART_COOKIE_MAX_AGE_SECONDS,
} from '@/config/abandoned-cart';
import { resolveRecoveryToken } from '@/lib/abandoned-cart/restore';
import { getCartCookieDomainFromSiteOrigin } from '@/lib/config/hosts';

export const runtime = 'nodejs';

type Params = { params: Promise<{ token: string }> };

export async function POST(request: Request, { params }: Params) {
  const { token } = await params;
  const url = new URL(request.url);
  const stepRaw = url.searchParams.get('step');
  const sequenceHint = stepRaw ? Number.parseInt(stepRaw, 10) : null;

  const result = await resolveRecoveryToken({
    token,
    sequenceHint: Number.isFinite(sequenceHint) ? sequenceHint : null,
    recordClick: true,
  });

  if (!result.ok) {
    const status =
      result.error === 'expired' ? 410 : result.error === 'unavailable' ? 503 : 400;
    return NextResponse.json(
      { ok: false, error: result.error, message: result.message },
      { status },
    );
  }

  const jar = await cookies();
  const response = NextResponse.json({
    ok: true,
    snapshot: result.snapshot,
    checkoutSessionId: result.cart.checkoutSessionId,
    customer: result.snapshot.customer,
  });

  const domain = getCartCookieDomainFromSiteOrigin();
  response.cookies.set(ABANDONED_CART_COOKIE, result.cart.checkoutSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ABANDONED_CART_COOKIE_MAX_AGE_SECONDS,
    ...(domain ? { domain } : {}),
  });

  // Touch cookie jar reference so Next doesn't warn in some versions.
  void jar;

  return response;
}

export async function GET(request: Request, ctx: Params) {
  return POST(request, ctx);
}
