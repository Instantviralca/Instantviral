import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import { buildRecoveryUrl, sendRecoveryEmail } from '@/lib/abandoned-cart/emails';
import {
  findCartById,
  getAbandonedCartMetrics,
  isAbandonedCartDbAvailable,
  listAbandonedCartRows,
  listRecoveryEmailsForCart,
  markCartLost,
  reserveRecoveryEmail,
  completeRecoveryEmail,
  buildCartRecoveryToken,
  extendRecoveryTokenExpiry,
  stopRecoveryEmails,
} from '@/lib/abandoned-cart/repository';
import { getRecoveryEmailSequence } from '@/config/abandoned-cart';
import type { AbandonedCartStatus } from '@/config/abandoned-cart';

export const runtime = 'nodejs';

async function requireAdmin(request: Request) {
  const jar = await cookies();
  const ok = await requireAdminFromCookies(jar);
  if (!ok) return false;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const csrfCookie = jar.get(ADMIN_CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get('x-csrf-token') ?? undefined;
    if (!verifyCsrfToken(csrfCookie, csrfHeader)) return false;
  }
  return true;
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAbandonedCartDbAvailable()) {
    return NextResponse.json({
      ok: true,
      unavailable: true,
      metrics: null,
      rows: [],
      total: 0,
      page: 1,
      pageSize: 20,
    });
  }

  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get('cartId');

  if (cartId) {
    const cart = await findCartById(cartId);
    if (!cart) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    const emails = await listRecoveryEmailsForCart(cartId);
    return NextResponse.json({
      ok: true,
      cart: {
        ...cart,
        createdAt: cart.createdAt.toISOString(),
        updatedAt: cart.updatedAt.toISOString(),
        lastActivityAt: cart.lastActivityAt.toISOString(),
        abandonedAt: cart.abandonedAt?.toISOString() ?? null,
        recoveredAt: cart.recoveredAt?.toISOString() ?? null,
        recoveryClickedAt: cart.recoveryClickedAt?.toISOString() ?? null,
        tokenExpiresAt: cart.tokenExpiresAt.toISOString(),
        // Never expose token hash to clients beyond admin need — keep hash out of UI payload.
        recoveryTokenHash: undefined,
      },
      emails: emails.map((e) => ({
        ...e,
        scheduledAt: e.scheduledAt.toISOString(),
        processingStartedAt: e.processingStartedAt?.toISOString() ?? null,
        sentAt: e.sentAt?.toISOString() ?? null,
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
      })),
    });
  }

  const status = (searchParams.get('status') as AbandonedCartStatus | 'all' | null) ?? 'all';
  const query = searchParams.get('q') ?? undefined;
  const page = Number.parseInt(searchParams.get('page') ?? '1', 10) || 1;
  const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '20', 10) || 20;

  const [metrics, list] = await Promise.all([
    getAbandonedCartMetrics(),
    listAbandonedCartRows({ status, query, page, pageSize }),
  ]);

  return NextResponse.json({
    ok: true,
    metrics,
    ...list,
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAbandonedCartDbAvailable()) {
    return NextResponse.json({ ok: false, error: 'Database unavailable' }, { status: 503 });
  }

  let body: {
    cartId?: string;
    action?: 'send_email' | 'stop_recovery' | 'mark_lost' | 'copy_recovery_url';
    sequenceNumber?: number;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const cartId = body.cartId?.trim();
  if (!cartId || !body.action) {
    return NextResponse.json({ ok: false, error: 'cartId and action required' }, { status: 400 });
  }

  const cart = await findCartById(cartId);
  if (!cart) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  if (body.action === 'stop_recovery') {
    const updated = await stopRecoveryEmails(cartId);
    return NextResponse.json({ ok: true, cart: updated });
  }

  if (body.action === 'mark_lost') {
    const updated = await markCartLost(cartId);
    return NextResponse.json({ ok: true, cart: updated });
  }

  if (body.action === 'copy_recovery_url') {
    if (cart.status === 'recovered' || cart.status === 'lost') {
      return NextResponse.json({ ok: false, error: 'Cart is not recoverable' }, { status: 400 });
    }
    const refreshed = (await extendRecoveryTokenExpiry(cartId)) ?? cart;
    const rawToken = buildCartRecoveryToken(refreshed);
    return NextResponse.json({
      ok: true,
      recoveryUrl: buildRecoveryUrl(rawToken),
    });
  }

  if (body.action === 'send_email') {
    if (cart.status === 'recovered' || cart.status === 'lost' || cart.recoveryEmailsStopped) {
      return NextResponse.json(
        { ok: false, error: 'Recovery emails are stopped for this cart' },
        { status: 400 },
      );
    }

    const sequence =
      body.sequenceNumber ??
      Math.min(
        cart.lastRecoverySequence + 1,
        getRecoveryEmailSequence()[getRecoveryEmailSequence().length - 1]?.step ?? 3,
      );

    const reservation = await reserveRecoveryEmail({
      cartId,
      sequenceNumber: sequence,
      scheduledAt: new Date(),
      triggeredBy: 'admin_manual',
    });

    if (!reservation.reserved) {
      return NextResponse.json(
        {
          ok: false,
          error: 'This recovery step was already sent or is processing',
          existing: reservation.log,
        },
        { status: 409 },
      );
    }

    const refreshed = (await extendRecoveryTokenExpiry(cartId)) ?? cart;
    const rawToken = buildCartRecoveryToken(refreshed);
    const sendResult = await sendRecoveryEmail({
      cart: refreshed,
      sequenceNumber: sequence,
      rawToken,
    });

    if (sendResult.ok) {
      await completeRecoveryEmail({
        logId: reservation.log!.id,
        cartId,
        sequenceNumber: sequence,
        status: 'sent',
        providerMessageId: sendResult.messageId ?? null,
      });
      return NextResponse.json({ ok: true, sent: true, sequenceNumber: sequence });
    }

    await completeRecoveryEmail({
      logId: reservation.log!.id,
      cartId,
      sequenceNumber: sequence,
      status: sendResult.skipped ? 'skipped' : 'failed',
      error: sendResult.error ?? 'send failed',
    });

    return NextResponse.json(
      { ok: false, error: sendResult.error ?? 'Send failed' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
}
