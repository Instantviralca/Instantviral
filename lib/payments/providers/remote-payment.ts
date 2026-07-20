/**
 * Remote Payment provider — WooCommerce Remote Payment client protocol.
 * POST {payment_website}/?ro=1 with PHP http_build_query-style body.
 * Response body must be the absolute payment redirect URL.
 */

import { getSiteUrlPath } from '@/lib/config/hosts';
import { getPaymentWebsiteUrl } from '@/lib/settings/site-settings';
import type {
  CancelPaymentInput,
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  VerifyPaymentInput,
  VerifyPaymentResult,
} from '@/types/payment';

type RemoteLineItem = {
  product_id: string;
  name: string;
  qty: number;
  price: number;
};

function buildItems(input: CreatePaymentInput): RemoteLineItem[] {
  const payloadItems = input.payload?.items;
  if (payloadItems && payloadItems.length > 0) {
    return payloadItems.map((item) => ({
      product_id: item.packageId || item.serviceId,
      name: item.packageTitle || item.serviceName,
      qty: item.quantity,
      // Woo plugin uses major units (line subtotal / qty), not minor cents.
      price: item.unitPrice / 100,
    }));
  }

  return [
    {
      product_id: input.orderId,
      name: input.description ?? `Order ${input.orderId}`,
      qty: 1,
      price: input.amount.amount / 100,
    },
  ];
}

/** Match PHP http_build_query nested array encoding used by the Woo client. */
function buildRemotePaymentBody(input: {
  callbackUrl: string;
  returnUrl: string;
  orderId: string;
  items: RemoteLineItem[];
}): string {
  const params = new URLSearchParams();
  params.set('callback_url', input.callbackUrl);
  params.set('return_url', input.returnUrl);
  params.set('order_id', input.orderId);
  input.items.forEach((item, index) => {
    params.set(`items[${index}][product_id]`, String(item.product_id));
    params.set(`items[${index}][name]`, item.name);
    params.set(`items[${index}][qty]`, String(item.qty));
    params.set(`items[${index}][price]`, String(item.price));
  });
  return params.toString();
}

export const remotePaymentProvider: PaymentProvider = {
  id: 'remote-payment',
  displayName: 'Card Payment',

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const paymentWebsite = await getPaymentWebsiteUrl();
    if (!paymentWebsite) {
      throw new Error(
        'Remote payment website URL is not configured. Set it in Admin → Settings.',
      );
    }

    const body = buildRemotePaymentBody({
      callbackUrl: getSiteUrlPath('/api/webhooks/remote-payment'),
      returnUrl: input.successUrl,
      orderId: input.orderId,
      items: buildItems(input),
    });

    const response = await fetch(`${paymentWebsite}/?ro=1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain, */*',
      },
      body,
      signal: AbortSignal.timeout(90_000),
    });

    if (!response.ok) {
      throw new Error(`Remote payment site returned HTTP ${response.status}.`);
    }

    const redirectUrl = (await response.text()).trim();
    if (!redirectUrl || !/^https?:\/\//i.test(redirectUrl)) {
      throw new Error('Remote payment site did not return a valid redirect URL.');
    }

    return {
      paymentId: `remote_${input.orderId}`,
      status: 'pending',
      provider: 'remote-payment',
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
