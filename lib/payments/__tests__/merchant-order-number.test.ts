/**
 * Merchant order number + signed Mollie remote payment contract.
 */

import { createHash, createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  buildMollieHostedOrderDescription,
  buildMollieRemoteSignaturePayload,
  normalizeMerchantOrderNumber,
  signMollieRemoteRequest,
  verifyMollieRemoteRequestSignature,
  type MollieRemoteSignatureFields,
} from '@/lib/payments/merchant-order-number';
import { mollieRemoteProvider } from '@/lib/payments/providers/mollie-remote';

const ROOT = process.cwd();
const carryCubesServer = readFileSync(
  path.join(ROOT, '_mollie_server_temp', 'mollieremotepayment-server', 'index.php'),
  'utf8',
);

const SECRET = 'test-shared-secret-16';

function baseFields(
  overrides: Partial<MollieRemoteSignatureFields> = {},
): MollieRemoteSignatureFields {
  return {
    orderId: '1757999999999001',
    requestTs: '1700000000',
    requestNonce: 'abc123nonce0',
    callbackUrl: 'https://instantviral.ca/api/webhooks/mollie-remote',
    returnUrl: 'https://instantviral.ca/order-success',
    cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
    amount: '19.99',
    currency: 'CAD',
    productName: 'Cubes',
    itemsJson: '[{"product_id":"x","name":"y","qty":1,"line_total":"19.99"}]',
    ...overrides,
  };
}

describe('normalizeMerchantOrderNumber', () => {
  it('accepts InstantViral sequential numbers', () => {
    expect(normalizeMerchantOrderNumber(1000)).toBe('1000');
    expect(normalizeMerchantOrderNumber('1001')).toBe('1001');
  });

  it('rejects invalid / arbitrary description text', () => {
    expect(normalizeMerchantOrderNumber('Cubes - Order #1000')).toBeNull();
    expect(normalizeMerchantOrderNumber('01000')).toBeNull();
    expect(normalizeMerchantOrderNumber('')).toBeNull();
  });
});

describe('HMAC signature — legacy vs merchant_order_number', () => {
  it('legacy signed request (no merchant) still verifies', () => {
    const fields = baseFields({ merchantOrderNumber: undefined });
    const signature = signMollieRemoteRequest(fields, SECRET);
    expect(verifyMollieRemoteRequestSignature({ fields, signature, secret: SECRET })).toEqual({
      ok: true,
    });

    const payload = buildMollieRemoteSignaturePayload(fields);
    expect(payload).not.toContain('|1000|');
    expect(payload.endsWith(createHash('sha256').update(fields.itemsJson).digest('hex'))).toBe(
      true,
    );
  });

  it('new request signs merchant_order_number=1000 in the payload', () => {
    const fields = baseFields({ merchantOrderNumber: '1000' });
    const payload = buildMollieRemoteSignaturePayload(fields);
    expect(payload).toContain('|Cubes|1000|');
    const signature = signMollieRemoteRequest(fields, SECRET);
    expect(
      verifyMollieRemoteRequestSignature({ fields, signature, secret: SECRET }),
    ).toEqual({ ok: true });
  });

  it('valid #1000 is accepted for Mollie description after verify', () => {
    const fields = baseFields({ merchantOrderNumber: '1000' });
    const signature = signMollieRemoteRequest(fields, SECRET);
    expect(
      verifyMollieRemoteRequestSignature({ fields, signature, secret: SECRET }).ok,
    ).toBe(true);
    expect(
      buildMollieHostedOrderDescription({
        productName: 'Cubes',
        clientOrderId: fields.orderId,
        merchantOrderNumber: '1000',
      }),
    ).toBe('Cubes - Order #1000');
  });

  it('changing 1000 to 1001 after signing causes signature verification failure', () => {
    const fields = baseFields({ merchantOrderNumber: '1000' });
    const signature = signMollieRemoteRequest(fields, SECRET);
    const tampered = { ...fields, merchantOrderNumber: '1001' };
    expect(
      verifyMollieRemoteRequestSignature({
        fields: tampered,
        signature,
        secret: SECRET,
      }),
    ).toEqual({ ok: false, reason: 'bad_signature' });
  });

  it('merchant present with only a legacy signature is rejected', () => {
    const legacyFields = baseFields({ merchantOrderNumber: undefined });
    const legacySignature = signMollieRemoteRequest(legacyFields, SECRET);
    const withMerchant = baseFields({ merchantOrderNumber: '1000' });
    expect(
      verifyMollieRemoteRequestSignature({
        fields: withMerchant,
        signature: legacySignature,
        secret: SECRET,
      }),
    ).toEqual({ ok: false, reason: 'bad_signature' });
  });

  it('missing merchant_order_number uses legacy behavior / long client id description', () => {
    const fields = baseFields({ merchantOrderNumber: null });
    const signature = signMollieRemoteRequest(fields, SECRET);
    expect(
      verifyMollieRemoteRequestSignature({ fields, signature, secret: SECRET }).ok,
    ).toBe(true);
    expect(
      buildMollieHostedOrderDescription({
        productName: 'Cubes',
        clientOrderId: fields.orderId,
      }),
    ).toBe(`Cubes - Order #${fields.orderId}`);
  });

  it('invalid merchant_order_number cannot affect Mollie description / fails verify', () => {
    expect(
      verifyMollieRemoteRequestSignature({
        fields: baseFields({ merchantOrderNumber: 'Cubes - Order #1000' }),
        signature: 'deadbeef',
        secret: SECRET,
      }),
    ).toEqual({ ok: false, reason: 'invalid_merchant' });

    expect(
      buildMollieHostedOrderDescription({
        productName: 'Cubes',
        clientOrderId: '1757123456789123',
        merchantOrderNumber: 'not-valid',
      }),
    ).toBe('Cubes - Order #1757123456789123');
  });
});

describe('CarryCubes server source — signed merchant_order_number', () => {
  it('includes merchant_order_number in HMAC when present', () => {
    expect(carryCubesServer).toContain('merchant_order_number');
    expect(carryCubesServer).toContain(
      '// When merchant_order_number is present (non-empty), it MUST be in the HMAC.',
    );
    expect(carryCubesServer).toContain("Invalid merchant_order_number.");
    expect(carryCubesServer).toContain('$payload[] = $merchant;');
  });

  it('never uses unsigned merchant number for description path', () => {
    expect(carryCubesServer).toContain('wrp_mollie_build_payment_description');
    expect(carryCubesServer).toContain('_wrp_merchant_order_number');
    expect(carryCubesServer).toContain("update_post_meta($post_id, '_wrp_client_order_id', $order_id)");
  });
});

describe('mollie-remote createPayment posts signed merchant_order_number', () => {
  const previousFetch = globalThis.fetch;
  let postedBody = '';

  beforeEach(() => {
    process.env.MOLLIE_REMOTE_SERVER_URL = 'https://carrycubes.com';
    process.env.MOLLIE_REMOTE_SHARED_SECRET = SECRET;
    postedBody = '';
    globalThis.fetch = async (_url, init) => {
      postedBody = String(init?.body ?? '');
      return new Response('https://www.mollie.com/checkout/test-hosted-session', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    };
  });

  afterEach(() => {
    globalThis.fetch = previousFetch;
    delete process.env.MOLLIE_REMOTE_SERVER_URL;
    delete process.env.MOLLIE_REMOTE_SHARED_SECRET;
  });

  it('posts merchant_order_number=1000 covered by HMAC while keeping long order_id', async () => {
    const result = await mollieRemoteProvider.createPayment({
      orderId: 'IV-TEST-MERCHANT',
      amount: { amount: 1999, currency: 'CAD' },
      customerEmail: 'buyer@example.com',
      successUrl: 'https://instantviral.ca/order-success',
      cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
      metadata: {
        mollieClientOrderId: '1757999999999001',
        merchantOrderNumber: '1000',
      },
    });

    const params = new URLSearchParams(postedBody);
    expect(params.get('order_id')).toBe('1757999999999001');
    expect(params.get('merchant_order_number')).toBe('1000');
    expect(result.paymentId).toBe('mollie_1757999999999001');

    const fields = baseFields({
      orderId: params.get('order_id')!,
      requestTs: params.get('request_ts')!,
      requestNonce: params.get('request_nonce')!,
      callbackUrl: params.get('callback_url')!,
      returnUrl: params.get('return_url')!,
      cancelUrl: params.get('cancel_url')!,
      amount: params.get('amount')!,
      currency: params.get('currency')!,
      productName: params.get('product_name')!,
      merchantOrderNumber: params.get('merchant_order_number'),
      itemsJson: params.get('items_json')!,
    });
    expect(
      verifyMollieRemoteRequestSignature({
        fields,
        signature: params.get('signature')!,
        secret: SECRET,
      }),
    ).toEqual({ ok: true });

    // Tamper merchant after the fact → verify fails (CarryCubes would 403).
    expect(
      verifyMollieRemoteRequestSignature({
        fields: { ...fields, merchantOrderNumber: '1001' },
        signature: params.get('signature')!,
        secret: SECRET,
      }).ok,
    ).toBe(false);
  });

  it('legacy client omits merchant and uses legacy signature format', async () => {
    await mollieRemoteProvider.createPayment({
      orderId: 'IV-TEST-LEGACY',
      amount: { amount: 500, currency: 'CAD' },
      customerEmail: 'buyer@example.com',
      successUrl: 'https://instantviral.ca/order-success',
      cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
      metadata: { mollieClientOrderId: '900004' },
    });

    const params = new URLSearchParams(postedBody);
    expect(params.has('merchant_order_number')).toBe(false);

    const fields = baseFields({
      orderId: params.get('order_id')!,
      requestTs: params.get('request_ts')!,
      requestNonce: params.get('request_nonce')!,
      callbackUrl: params.get('callback_url')!,
      returnUrl: params.get('return_url')!,
      cancelUrl: params.get('cancel_url')!,
      amount: params.get('amount')!,
      currency: params.get('currency')!,
      productName: params.get('product_name')!,
      merchantOrderNumber: undefined,
      itemsJson: params.get('items_json')!,
    });
    expect(
      verifyMollieRemoteRequestSignature({
        fields,
        signature: params.get('signature')!,
        secret: SECRET,
      }),
    ).toEqual({ ok: true });

    // Same signature must not validate if merchant were injected unsigned.
    expect(
      verifyMollieRemoteRequestSignature({
        fields: { ...fields, merchantOrderNumber: '1000' },
        signature: params.get('signature')!,
        secret: SECRET,
      }),
    ).toEqual({ ok: false, reason: 'bad_signature' });
  });

  it('omits invalid merchant_order_number (legacy signature path)', async () => {
    await mollieRemoteProvider.createPayment({
      orderId: 'IV-TEST-BAD',
      amount: { amount: 500, currency: 'CAD' },
      customerEmail: 'buyer@example.com',
      successUrl: 'https://instantviral.ca/order-success',
      cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
      metadata: {
        mollieClientOrderId: '900003',
        merchantOrderNumber: 'Cubes - Order #1000',
      },
    });

    const params = new URLSearchParams(postedBody);
    expect(params.has('merchant_order_number')).toBe(false);
  });

  it('retry keeps same merchant number with a new CarryCubes order_id', async () => {
    await mollieRemoteProvider.createPayment({
      orderId: 'IV-RETRY',
      amount: { amount: 999, currency: 'CAD' },
      customerEmail: 'buyer@example.com',
      successUrl: 'https://instantviral.ca/order-success',
      cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
      metadata: {
        mollieClientOrderId: '1111111111111001',
        merchantOrderNumber: '1000',
      },
    });
    const first = new URLSearchParams(postedBody);

    await mollieRemoteProvider.createPayment({
      orderId: 'IV-RETRY',
      amount: { amount: 999, currency: 'CAD' },
      customerEmail: 'buyer@example.com',
      successUrl: 'https://instantviral.ca/order-success',
      cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
      metadata: {
        mollieClientOrderId: '2222222222222002',
        merchantOrderNumber: '1000',
      },
    });
    const second = new URLSearchParams(postedBody);

    expect(first.get('merchant_order_number')).toBe('1000');
    expect(second.get('merchant_order_number')).toBe('1000');
    expect(first.get('order_id')).not.toBe(second.get('order_id'));
    expect(first.get('signature')).not.toBe(second.get('signature'));
  });
});

describe('executeCheckout + webhook identifiers unchanged', () => {
  it('passes merchantOrderNumber from order.orderNumber', () => {
    const executeCheckout = readFileSync(
      path.join(ROOT, 'lib', 'checkout', 'execute.ts'),
      'utf8',
    );
    expect(executeCheckout).toContain('merchantOrderNumber');
    expect(executeCheckout).toContain('mollieClientOrderId');
  });

  it('webhook still reconciles via mollie_{callbackClientOrderId}', () => {
    const webhook = readFileSync(
      path.join(ROOT, 'app', 'api', 'webhooks', 'mollie-remote', 'route.ts'),
      'utf8',
    );
    expect(webhook).toContain('mollie_${callbackClientOrderId}');
    expect(webhook).not.toContain('merchant_order_number');
  });
});

describe('manual HMAC vector matches helper', () => {
  it('signMollieRemoteRequest equals raw createHmac of payload', () => {
    const fields = baseFields({ merchantOrderNumber: '1000' });
    const payload = buildMollieRemoteSignaturePayload(fields);
    const manual = createHmac('sha256', SECRET).update(payload).digest('hex');
    expect(signMollieRemoteRequest(fields, SECRET)).toBe(manual);
  });
});
