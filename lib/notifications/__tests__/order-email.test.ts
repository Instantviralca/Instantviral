/**
 * Branded InstantViral order emails — Order #1000, escaping, no provider IDs.
 */

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import {
  buildAdminOrderEmail,
  buildCustomerOrderEmail,
  formatOrderLabel,
} from '@/lib/notifications/order-email';
import { escapeHtml, safeHttpUrl } from '@/lib/notifications/transactional-layout';
import { renderTemplate } from '@/lib/notifications/service';
import type { Order } from '@/types/order';

function sampleOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: 'IV-SECRET-INTERNAL-ID',
    orderNumber: 1000,
    guestEmail: 'buyer@example.com',
    status: 'pending',
    fulfillmentMode: 'manual',
    currency: 'CAD',
    items: [
      {
        id: 'oli_1',
        packageId: 'ig-f-1000',
        serviceId: 'instagram-followers',
        serviceSlug: 'buy-instagram-followers',
        serviceName: 'Instagram Followers',
        platformId: 'instagram',
        packageTitle: '1,000 Followers',
        quantity: 1000,
        quantityLabel: '1,000',
        cartQuantity: 1,
        unitPrice: 999,
        lineTotal: 999,
        currency: 'CAD',
        deliveryTime: 'Gradual',
        configuration: { username: 'demo_user', targetUrl: 'https://instagram.com/demo_user' },
      },
    ],
    subtotal: { amount: 999, currency: 'CAD' },
    discount: { amount: 0, currency: 'CAD' },
    total: { amount: 999, currency: 'CAD' },
    payment: {
      provider: 'mollie-remote',
      paymentId: 'mollie_1757123456789001',
      status: 'pending',
      amount: { amount: 999, currency: 'CAD' },
    },
    timeline: [],
    internalNotes: [],
    createdAt: '2026-03-11T12:00:00.000Z',
    updatedAt: '2026-03-11T12:00:00.000Z',
    ...overrides,
  };
}

describe('order email — Order #1000', () => {
  it('customer received email renders Order #1000 and does not claim paid', () => {
    const email = buildCustomerOrderEmail(sampleOrder(), 'order_received');
    expect(email.subject).toBe('Order #1000 Received | InstantViral');
    expect(email.html).toContain('Order #1000');
    expect(email.html).toContain('Order received');
    expect(email.html).toContain('waiting for payment confirmation');
    expect(email.html).not.toMatch(/Payment confirmed/i);
    expect(email.text).toContain('Order #1000');
  });

  it('customer payment-confirmed email uses Confirmed subject after paid semantics', () => {
    const order = sampleOrder({
      payment: {
        provider: 'mollie-remote',
        paymentId: 'mollie_1757123456789001',
        status: 'paid',
        amount: { amount: 999, currency: 'CAD' },
      },
    });
    const email = buildCustomerOrderEmail(order, 'payment_confirmed');
    expect(email.subject).toBe('Order #1000 Confirmed | InstantViral');
    expect(email.html).toContain('Payment confirmed');
    expect(email.html).toContain('Order #1000');
  });

  it('admin new-order subject and body use #1000', () => {
    const email = buildAdminOrderEmail(sampleOrder(), 'admin_new_order');
    expect(email.subject).toBe('New Order #1000 | InstantViral');
    expect(email.html).toContain('NEW ORDER');
    expect(email.html).toContain('Order #1000');
    expect(email.html).toContain('buyer@example.com');
  });

  it('customer does not expose internal orders.id when order_number exists', () => {
    const email = buildCustomerOrderEmail(sampleOrder(), 'order_received');
    expect(email.html).not.toContain('IV-SECRET-INTERNAL-ID');
    expect(email.text).not.toContain('IV-SECRET-INTERNAL-ID');
    expect(email.subject).not.toContain('IV-SECRET-INTERNAL-ID');
  });

  it('customer does not expose Mollie / CarryCubes payment IDs', () => {
    const email = buildCustomerOrderEmail(sampleOrder(), 'payment_confirmed');
    expect(email.html).not.toContain('mollie_');
    expect(email.html).not.toContain('1757123456789001');
    expect(email.text).not.toContain('mollie_');
  });

  it('admin keeps internal reference secondary at the bottom', () => {
    const email = buildAdminOrderEmail(sampleOrder(), 'admin_new_order');
    expect(email.html).toContain('Internal Reference');
    expect(email.html).toContain('IV-SECRET-INTERNAL-ID');
    expect(email.html.indexOf('Order #1000')).toBeLessThan(
      email.html.indexOf('Internal Reference'),
    );
  });

  it('legacy order without orderNumber falls back to IV-* customer ref', () => {
    const legacy = sampleOrder({ orderNumber: undefined, id: 'IV-LEGACY-42' });
    expect(formatOrderLabel(legacy)).toBe('Order IV-LEGACY-42');
    const email = buildCustomerOrderEmail(legacy, 'order_received');
    expect(email.subject).toContain('Order IV-LEGACY-42');
    expect(email.html).toContain('Order IV-LEGACY-42');
  });

  it('renders multiple order items', () => {
    const order = sampleOrder({
      items: [
        sampleOrder().items[0]!,
        {
          ...sampleOrder().items[0]!,
          id: 'oli_2',
          serviceName: 'Instagram Likes',
          packageTitle: '500 Likes',
          quantityLabel: '500',
          configuration: { targetUrl: 'https://instagram.com/p/abc' },
        },
      ],
    });
    const email = buildCustomerOrderEmail(order, 'order_received');
    expect(email.html).toContain('Instagram Followers');
    expect(email.html).toContain('Instagram Likes');
    expect(email.html).toContain('https://instagram.com/p/abc');
  });

  it('escapes malicious HTML in customer-influenced fields', () => {
    const order = sampleOrder({
      guestEmail: 'evil<script>@example.com',
      items: [
        {
          ...sampleOrder().items[0]!,
          serviceName: 'Followers<img src=x onerror=alert(1)>',
          packageTitle: 'Pkg</title><script>alert(1)</script>',
          configuration: {
            username: '<b>hack</b>',
          },
        },
      ],
    });
    const email = buildCustomerOrderEmail(order, 'order_received');
    expect(email.html).not.toContain('<script>');
    expect(email.html).not.toContain('<img src=x');
    expect(email.html).toContain('&lt;script&gt;');
    expect(email.html).toContain('&lt;b&gt;hack&lt;/b&gt;');
    expect(email.html).toContain('Followers&lt;img');
  });

  it('social URL is safely rendered as http(s) link only', () => {
    expect(safeHttpUrl('https://instagram.com/demo_user')).toBe(
      'https://instagram.com/demo_user',
    );
    expect(safeHttpUrl('javascript:alert(1)')).toBeNull();
    const email = buildCustomerOrderEmail(sampleOrder(), 'order_received');
    expect(email.html).toContain('href="https://instagram.com/demo_user"');
  });
});

describe('escapeHtml / template injection', () => {
  it('escapeHtml neutralizes markup', () => {
    expect(escapeHtml(`<img src="x" onerror="alert('x')">`)).not.toContain('<img');
  });

  it('renderTemplate injects prebuilt emailHtml without re-interpreting order fields as markup', () => {
    const built = buildCustomerOrderEmail(sampleOrder(), 'order_received');
    const html = renderTemplate('{{emailHtml}}', {
      companyName: 'InstantViral',
      customerEmail: 'buyer@example.com',
      orderId: '#1000',
      serviceName: 'Service',
      statusLabel: 'Pending',
      statusMessage: '',
      trackingUrl: 'https://instantviral.ca/track-order',
      supportEmail: 'support@instantviral.ca',
      emailHtml: built.html,
      emailText: built.text,
      emailSubject: built.subject,
    });
    expect(html).toContain('Order #1000');
    expect(html).not.toContain('IV-SECRET-INTERNAL-ID');
  });
});

describe('trigger semantics preserved in source', () => {
  it('order-hooks still fire received on place and confirmed only on paid', () => {
    const hooks = readFileSync(
      path.join(process.cwd(), 'lib', 'notifications', 'order-hooks.ts'),
      'utf8',
    );
    expect(hooks).toContain("buildCustomerOrderEmail(order, 'order_received')");
    expect(hooks).toContain("buildCustomerOrderEmail(order, 'payment_confirmed')");
    expect(hooks).toContain("trigger: 'order_created'");
    expect(hooks).toContain("templateId: 'payment_confirmed'");
    expect(hooks).toContain('idempotencyKey: `order_confirmation:${order.id}`');
    expect(hooks).toContain('idempotencyKey: `payment_confirmed:${order.id}`');
  });

  it('SMTP transport module is unchanged in responsibility', () => {
    const send = readFileSync(
      path.join(process.cwd(), 'lib', 'notifications', 'send-email.ts'),
      'utf8',
    );
    expect(send).toContain('SMTP_*');
    expect(send).toContain('getEmailTransportKind');
  });
});
