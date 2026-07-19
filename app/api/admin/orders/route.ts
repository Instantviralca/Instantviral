import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import {
  getAdminOrderById,
  getAdminOrderRows,
  getAdminOrderServiceOptions,
} from '@/lib/admin/orders';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import { listOrders } from '@/lib/orders/store';

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

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  if (orderId) {
    const details = await getAdminOrderById(orderId);
    if (!details) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, order: details });
  }

  const all = await listOrders();
  const fulfilment = all.filter(isEligibleForFulfilmentQueue);
  const rows = await getAdminOrderRows({ paidOnly: true });

  return NextResponse.json({
    ok: true,
    orders: rows,
    fulfilmentQueueCount: fulfilment.length,
    services: getAdminOrderServiceOptions(),
  });
}
