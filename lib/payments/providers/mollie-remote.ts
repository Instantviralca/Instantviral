/**
 * Mollie Remote Payment provider — carrycubes.com collector protocol.
 * Matches the WooCommerce Mollie Remote Payment client (v2.1.2).
 */

import { createHash, createHmac, randomBytes } from 'node:crypto';

import {
  createMollieClientOrderId,
  isValidMollieClientOrderId,
} from '@/lib/payments/mollie-client-order-id';

import { getSiteUrlPath } from '@/lib/config/hosts';
import {
  getMollieProductName,
  getMollieRemoteServerUrl,
  getMollieSharedSecret,
} from '@/lib/settings/site-settings';
import type {
  CancelPaymentInput,
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  VerifyPaymentInput,
  VerifyPaymentResult,
} from '@/types/payment';

type MollieLineItem = {
  product_id: string;
  name: string;
  qty: number;
  line_total: string;
};

function buildItems(input: CreatePaymentInput): MollieLineItem[] {
  const payloadItems = input.payload?.items;
  if (payloadItems && payloadItems.length > 0) {
    return payloadItems.map((item) => {
      const qty =
        typeof item.cartQuantity === 'number' && item.cartQuantity > 0
          ? Math.floor(item.cartQuantity)
          : 1;
      const lineTotalMinor =
        typeof item.lineTotal === 'number' && item.lineTotal >= 0
          ? item.lineTotal
          : item.unitPrice * qty;
      return {
        product_id: item.packageId || item.serviceId,
        name: item.packageTitle || item.serviceName,
        qty,
        line_total: (lineTotalMinor / 100).toFixed(2),
      };
    });
  }

  return [
    {
      product_id: input.orderId,
      name: input.description ?? `Order ${input.orderId}`,
      qty: 1,
      line_total: (input.amount.amount / 100).toFixed(2),
    },
  ];
}

function serverEndpoint(serverUrl: string): string {
  const base = serverUrl.replace(/\/$/, '');
  return `${base}/?ro=1`;
}

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export const mollieRemoteProvider: PaymentProvider = {
  id: 'mollie-remote',
  displayName: 'Card Payment',

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const serverUrl = await getMollieRemoteServerUrl();
    const secret = await getMollieSharedSecret();

    if (!serverUrl) {
      throw new Error(
        'Mollie payment server URL is not configured. Set it in Admin → Settings.',
      );
    }
    if (secret.length < 16) {
      throw new Error(
        'Mollie shared secret is not configured (minimum 16 characters). Set it in Admin → Settings.',
      );
    }

    const clientOrderId =
      input.metadata?.mollieClientOrderId?.trim() || createMollieClientOrderId();
    if (!isValidMollieClientOrderId(clientOrderId)) {
      throw new Error('Mollie client order ID must be a positive integer.');
    }

    const items = buildItems(input);
    const itemsJson = JSON.stringify(items);
    const amount = (input.amount.amount / 100).toFixed(2);
    const currency = input.amount.currency.toUpperCase();
    const productName = await getMollieProductName();
    const callbackUrl = getSiteUrlPath('/api/webhooks/mollie-remote');
    const returnUrl = input.successUrl;
    const cancelUrl = input.cancelUrl;
    const requestTs = Math.floor(Date.now() / 1000);
    const requestNonce = randomBytes(10).toString('hex');

    const signaturePayload = [
      clientOrderId,
      String(requestTs),
      requestNonce,
      callbackUrl,
      returnUrl,
      cancelUrl,
      amount,
      currency,
      productName,
      createHash('sha256').update(itemsJson).digest('hex'),
    ].join('|');

    const body = new URLSearchParams();
    body.set('callback_url', callbackUrl);
    body.set('return_url', returnUrl);
    body.set('cancel_url', cancelUrl);
    body.set('order_id', clientOrderId);
    body.set('amount', amount);
    body.set('currency', currency);
    body.set('product_name', productName);
    body.set('items_json', itemsJson);
    body.set('request_ts', String(requestTs));
    body.set('request_nonce', requestNonce);
    body.set('signature', signPayload(signaturePayload, secret));

    const response = await fetch(serverEndpoint(serverUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain, */*',
      },
      body: body.toString(),
      signal: AbortSignal.timeout(90_000),
    });

    if (!response.ok) {
      const detail = (await response.text()).trim().slice(0, 300);
      throw new Error(
        `Mollie payment server returned HTTP ${response.status}${detail ? `: ${detail}` : ''}.`,
      );
    }

    const redirectUrl = (await response.text()).trim();
    if (!redirectUrl || !/^https?:\/\//i.test(redirectUrl)) {
      throw new Error('Mollie payment server did not return a valid redirect URL.');
    }

    return {
      paymentId: `mollie_${clientOrderId}`,
      status: 'pending',
      provider: 'mollie-remote',
      redirectUrl,
    };
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    return {
      paymentId: input.paymentId,
      status: 'pending',
      providerReference: input.paymentId,
    };
  },

  async cancelPayment(_input: CancelPaymentInput) {
    return { status: 'cancelled' as const };
  },
};
