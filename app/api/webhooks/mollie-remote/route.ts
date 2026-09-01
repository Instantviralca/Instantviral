import { createHmac } from 'node:crypto';

import { NextResponse } from 'next/server';

import { markOrderPaymentStatus } from '@/lib/payments/mark-paid';
import { getOrderById } from '@/lib/orders/store';
import { getMollieSharedSecret } from '@/lib/settings/site-settings';

export const runtime = 'nodejs';

/**
 * Mollie Remote Payment callback — signed POST from carrycubes.com collector.
 * Mirrors WooCommerce `processmollieremotepayment` handler.
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const orderId = String(form.get('order_id') ?? '').trim();
    const txnId = String(form.get('txn_id') ?? '').trim();
    const priceRaw = form.get('price');
    const price =
      priceRaw != null && String(priceRaw).trim() !== ''
        ? Number(priceRaw).toFixed(2)
        : '';
    if (!price || price === 'NaN') {
      return new NextResponse('', { status: 400 });
    }
    const currency = String(form.get('currency_code') ?? '')
      .trim()
      .toUpperCase();
    const paymentStatus = String(form.get('payment_status') ?? '').trim();
    const callbackTs = Number(form.get('callback_ts') ?? 0);
    const signature = String(form.get('signature') ?? '').trim();
    const secret = await getMollieSharedSecret();

    if (!orderId || !txnId || paymentStatus !== 'paid' || secret.length < 16) {
      return new NextResponse('', { status: 400 });
    }

    const now = Math.floor(Date.now() / 1000);
    if (callbackTs < now - 900 || callbackTs > now + 300) {
      return new NextResponse('', { status: 403 });
    }

    const expected = createHmac('sha256', secret)
      .update([orderId, txnId, price, currency, String(callbackTs)].join('|'))
      .digest('hex');

    if (!signature || signature !== expected) {
      return new NextResponse('', { status: 403 });
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return new NextResponse('', { status: 404 });
    }

    const expectedTotal = (order.total.amount / 100).toFixed(2);
    const expectedCurrency = order.total.currency.toUpperCase();
    if (price !== expectedTotal || currency !== expectedCurrency) {
      return new NextResponse('', { status: 409 });
    }

    if (order.payment?.status === 'paid') {
      return new NextResponse('OK', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const paymentId = order.payment?.paymentId || `mollie_${orderId}`;
    await markOrderPaymentStatus({
      paymentId,
      orderId,
      status: 'paid',
      providerReference: txnId,
      amountMinor: order.total.amount,
    });

    return new NextResponse('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('[mollie-remote] callback failed', {
      message: error instanceof Error ? error.message : 'unknown',
    });
    return new NextResponse('', { status: 400 });
  }
}
