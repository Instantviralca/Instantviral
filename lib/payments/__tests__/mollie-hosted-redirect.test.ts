/**
 * Hosted Mollie redirect contract — no on-page card capture.
 * Does not call live Mollie APIs.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { FORBIDDEN_ANALYTICS_KEYS, FORBIDDEN_ANALYTICS_KEY_PATTERNS } from '@/data/analytics/forbidden-fields';
import { mollieRemoteProvider } from '@/lib/payments/providers/mollie-remote';

const ROOT = process.cwd();

function readSrc(...parts: string[]): string {
  return readFileSync(path.join(ROOT, ...parts), 'utf8');
}

describe('hosted Mollie checkout — no embedded card UI', () => {
  const checkoutPage = readSrc('components/commerce/checkout/checkout-page.tsx');
  const paymentMethods = readSrc('components/commerce/checkout/payment-methods.tsx');
  const customerForm = readSrc('components/commerce/checkout/customer-information-form.tsx');
  const mollieRemote = readSrc('lib/payments/providers/mollie-remote.ts');
  const executeCheckout = readSrc('lib/checkout/execute.ts');
  const webhook = readSrc('app/api/webhooks/mollie-remote/route.ts');

  it('checkout sources contain no card-number / expiry / CVC inputs', () => {
    const sources = [checkoutPage, paymentMethods, customerForm].join('\n');
    expect(sources).not.toMatch(/name=["']card/i);
    expect(sources).not.toMatch(/autocomplete=["']cc-/i);
    expect(sources).not.toMatch(/\bcardNumber\b/);
    expect(sources).not.toMatch(/\bcardCvc\b/);
    expect(sources).not.toMatch(/type=["']password["'][^>]*card|card[^>]*type=["']password["']/i);
    expect(sources).not.toMatch(/exp_month|exp_year|cc-exp|cc-csc|cc-number/i);
    expect(sources).not.toMatch(/<iframe\b/i);
    expect(sources).not.toMatch(/Mollie\.|createComponent|js\.mollie/i);
    expect(sources).not.toMatch(/window\.open\s*\(/);
  });

  it('payment methods UI shows hosted Mollie explanation without brand chips', () => {
    expect(paymentMethods).not.toContain('Card payments are processed securely');
    expect(paymentMethods).not.toContain('we never store full card numbers');
    expect(paymentMethods).not.toContain('Visa');
    expect(paymentMethods).not.toContain('Mastercard');
    expect(paymentMethods).toContain(
      "You'll be redirected to Mollie's secure payment page to complete your payment. Card payments, Apple Pay and Google Pay are available where supported.",
    );
  });

  it('checkout uses approved payment label and Continue to Payment button', () => {
    const paymentsConfig = readSrc('config/payments.ts');
    expect(paymentsConfig).toContain("displayName: 'Pay securely with Mollie'");
    expect(paymentsConfig).not.toContain('Card payment (Mollie)');
    expect(checkoutPage).toContain('Continue to Payment');
    expect(checkoutPage).not.toContain('Place Order');
  });

  it('place-order uses top-level redirect to hosted Mollie URL after payment_started', () => {
    expect(checkoutPage).toContain("eventName: 'payment_started'");
    expect(checkoutPage).toContain('window.location.assign(data.redirectUrl)');
    expect(checkoutPage).toMatch(/!data\.redirectUrl[\s\S]*payment_failed/);
    expect(checkoutPage).not.toContain('router.push');
  });

  it('mollie-remote createPayment returns absolute redirectUrl from collector', () => {
    expect(mollieRemote).toContain('redirectUrl');
    expect(mollieRemote).toContain('/?ro=1');
    expect(mollieRemote).toMatch(/did not return a valid redirect URL/);
    expect(mollieRemote).toContain("body.set('return_url'");
  });

  it('executeCheckout wires mollie-remote redirectUrl for live payments', () => {
    expect(executeCheckout).toContain("createPayment('mollie-remote'");
    expect(executeCheckout).toContain('redirectUrl: payment.redirectUrl');
    expect(executeCheckout).toContain('successUrl');
    expect(executeCheckout).toContain('cancelUrl');
  });

  it('webhook route remains the authoritative paid callback', () => {
    expect(webhook).toContain('markOrderPaymentStatus');
    expect(webhook).toContain("paymentStatus !== 'paid'");
    expect(webhook).toContain('signature');
  });

  it('analytics denylist still blocks raw card fields', () => {
    expect(FORBIDDEN_ANALYTICS_KEYS).toContain('cardNumber');
    expect(FORBIDDEN_ANALYTICS_KEYS).toContain('cvv');
    expect(FORBIDDEN_ANALYTICS_KEY_PATTERNS.some((p) => p.test('cardCvc'))).toBe(true);
  });
});

describe('mollie-remote createPayment (mocked fetch)', () => {
  it('posts signed form body and returns hosted https redirect URL', async () => {
    const previousFetch = globalThis.fetch;
    const previousUrl = process.env.MOLLIE_REMOTE_SERVER_URL;
    const previousSecret = process.env.MOLLIE_REMOTE_SHARED_SECRET;
    process.env.MOLLIE_REMOTE_SERVER_URL = 'https://carrycubes.com';
    process.env.MOLLIE_REMOTE_SHARED_SECRET = 'test-shared-secret-16';

    globalThis.fetch = async () =>
      new Response('https://www.mollie.com/checkout/test-hosted-session', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });

    try {
      const result = await mollieRemoteProvider.createPayment({
        orderId: 'IV-TEST-1',
        amount: { amount: 1999, currency: 'CAD' },
        customerEmail: 'buyer@example.com',
        description: 'Test',
        successUrl: 'https://instantviral.ca/order-success',
        cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
        metadata: { mollieClientOrderId: '900001' },
      });

      expect(result.redirectUrl).toBe('https://www.mollie.com/checkout/test-hosted-session');
      expect(result.provider).toBe('mollie-remote');
      expect(result.status).toBe('pending');
      expect(result.paymentId).toBe('mollie_900001');
    } finally {
      globalThis.fetch = previousFetch;
      if (previousUrl === undefined) delete process.env.MOLLIE_REMOTE_SERVER_URL;
      else process.env.MOLLIE_REMOTE_SERVER_URL = previousUrl;
      if (previousSecret === undefined) delete process.env.MOLLIE_REMOTE_SHARED_SECRET;
      else process.env.MOLLIE_REMOTE_SHARED_SECRET = previousSecret;
    }
  });

  it('rejects non-URL collector responses (no embed HTML path)', async () => {
    const previousFetch = globalThis.fetch;
    const previousUrl = process.env.MOLLIE_REMOTE_SERVER_URL;
    const previousSecret = process.env.MOLLIE_REMOTE_SHARED_SECRET;
    process.env.MOLLIE_REMOTE_SERVER_URL = 'https://carrycubes.com';
    process.env.MOLLIE_REMOTE_SHARED_SECRET = 'test-shared-secret-16';

    globalThis.fetch = async () =>
      new Response('<iframe src="https://evil.example"></iframe>', {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });

    try {
      await expect(
        mollieRemoteProvider.createPayment({
          orderId: 'IV-TEST-2',
          amount: { amount: 500, currency: 'CAD' },
          customerEmail: 'buyer@example.com',
          successUrl: 'https://instantviral.ca/order-success',
          cancelUrl: 'https://instantviral.ca/checkout?cancelled=1',
          metadata: { mollieClientOrderId: '900002' },
        }),
      ).rejects.toThrow(/valid redirect URL/i);
    } finally {
      globalThis.fetch = previousFetch;
      if (previousUrl === undefined) delete process.env.MOLLIE_REMOTE_SERVER_URL;
      else process.env.MOLLIE_REMOTE_SERVER_URL = previousUrl;
      if (previousSecret === undefined) delete process.env.MOLLIE_REMOTE_SHARED_SECRET;
      else process.env.MOLLIE_REMOTE_SHARED_SECRET = previousSecret;
    }
  });
});
