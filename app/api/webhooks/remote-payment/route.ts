import { NextResponse } from 'next/server';

import { markOrderPaymentStatus } from '@/lib/payments/mark-paid';
import { getOrderById } from '@/lib/orders/store';

export const runtime = 'nodejs';

/**
 * Remote payment collector callback (Woo client compatible).
 * Expects order_id (form POST or JSON). Marks order paid like Woo → processing.
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let orderId = '';

    if (contentType.includes('application/json')) {
      const body = (await request.json()) as { order_id?: string; orderId?: string };
      orderId = String(body.order_id ?? body.orderId ?? '').trim();
    } else {
      const form = await request.formData();
      orderId = String(form.get('order_id') ?? form.get('orderId') ?? '').trim();
    }

    if (!orderId) {
      return NextResponse.json({ ok: false, error: 'order_id is required.' }, { status: 400 });
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
    }

    const paymentId = order.payment?.paymentId || `remote_${orderId}`;
    await markOrderPaymentStatus({
      paymentId,
      orderId,
      status: 'paid',
    });

    // Woo plugin expects a plain die() — keep body minimal for collectors.
    return new NextResponse('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to process callback.',
      },
      { status: 400 },
    );
  }
}
