/**
 * Customer-facing InstantViral order numbers (#1000+).
 */

import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import { placeOrder } from '@/lib/orders/create';
import {
  allocateOrderNumber,
  formatCustomerOrderRef,
  ORDER_NUMBER_START,
  parseOrderLookupToken,
  resetOrderNumberAllocatorForTests,
} from '@/lib/orders/order-number';
import {
  getOrderById,
  getOrderByOrderNumber,
  resetOrderStoreForTests,
  saveOrder,
} from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import { createMollieClientOrderId } from '@/lib/payments/mollie-client-order-id';
import { lookupTrackedOrder } from '@/lib/tracking/lookup';
import type { Order } from '@/types/order';

const sampleItem = {
  id: 'cart_1',
  packageId: 'ig-f-1000',
  serviceId: 'instagram-followers',
  serviceSlug: 'buy-instagram-followers',
  serviceName: 'Instagram Followers',
  platformId: 'instagram' as const,
  packageTitle: '1,000 Followers',
  quantity: 1000,
  quantityLabel: '1,000',
  unitPrice: 1,
  currency: 'USD' as const,
  deliveryTime: 'Gradual',
  configuration: { username: 'demo_user' },
  addedAt: new Date().toISOString(),
};

beforeEach(() => {
  process.env.IV_PERSISTENCE = 'memory';
  clearPersistenceSingletonForTests();
  useMemoryPersistenceForTests();
  resetOrderStoreForTests();
  resetOrderNumberAllocatorForTests();
});

afterEach(() => {
  resetOrderStoreForTests();
  clearPersistenceSingletonForTests();
});

describe('order number allocation', () => {
  it('starts at 1000 and increments sequentially', async () => {
    expect(await allocateOrderNumber()).toBe(1000);
    expect(await allocateOrderNumber()).toBe(1001);
    expect(await allocateOrderNumber()).toBe(1002);
  });

  it('continues past 9999 without wrapping', async () => {
    resetOrderNumberAllocatorForTests(9999);
    expect(await allocateOrderNumber()).toBe(9999);
    expect(await allocateOrderNumber()).toBe(10000);
  });

  it('assigns unique numbers under concurrent createOrder saves', async () => {
    const drafts = Array.from({ length: 40 }, (_, i) => {
      const id = `IV-CONCURRENT-${i}`;
      return {
        id,
        guestEmail: `buyer${i}@example.com`,
        status: 'pending' as const,
        fulfillmentMode: 'manual' as const,
        currency: 'USD' as const,
        items: [{ ...sampleItem, id: `cart_${i}` }],
        subtotal: { amount: 999, currency: 'USD' as const },
        discount: { amount: 0, currency: 'USD' as const },
        total: { amount: 999, currency: 'USD' as const },
        payment: {
          provider: 'mollie-remote' as const,
          paymentId: `pending_${id}`,
          status: 'pending' as const,
          amount: { amount: 999, currency: 'USD' as const },
        },
        timeline: [],
        internalNotes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        idempotencyKey: `concurrent-${i}`,
      } satisfies Order & { idempotencyKey: string };
    });

    const saved = await Promise.all(drafts.map((d) => saveOrder(d)));
    const numbers = saved.map((o) => o.orderNumber);
    expect(numbers.every((n) => typeof n === 'number')).toBe(true);
    expect(new Set(numbers).size).toBe(40);
    expect(Math.min(...(numbers as number[]))).toBe(ORDER_NUMBER_START);
    expect(Math.max(...(numbers as number[]))).toBe(ORDER_NUMBER_START + 39);
  });

  it('placeOrder assigns orderNumber starting at 1000 and keeps IV-* id', async () => {
    const a = await placeOrder({
      customer: { email: 'a@example.com' },
      paymentMethodId: 'mollie-remote',
      termsAccepted: true,
      coupon: null,
      items: [sampleItem],
      idempotencyKey: 'order-number-a',
    });
    const b = await placeOrder({
      customer: { email: 'b@example.com' },
      paymentMethodId: 'mollie-remote',
      termsAccepted: true,
      coupon: null,
      items: [{ ...sampleItem, id: 'cart_2' }],
      idempotencyKey: 'order-number-b',
    });

    expect(a.id.startsWith('IV-')).toBe(true);
    expect(b.id.startsWith('IV-')).toBe(true);
    expect(a.id).not.toBe(b.id);
    expect(a.orderNumber).toBe(1000);
    expect(b.orderNumber).toBe(1001);
    expect(formatCustomerOrderRef(a)).toBe('#1000');
    expect(await getOrderByOrderNumber(1000)).toMatchObject({ id: a.id });
  });

  it('payment retry keeps the same InstantViral order number', async () => {
    const order = await placeOrder({
      customer: { email: 'retry@example.com' },
      paymentMethodId: 'mollie-remote',
      termsAccepted: true,
      coupon: null,
      items: [sampleItem],
      idempotencyKey: 'retry-same-order',
    });
    expect(order.orderNumber).toBe(1000);

    const attemptA = createMollieClientOrderId();
    const attemptB = createMollieClientOrderId();
    expect(attemptA).not.toBe(attemptB);

    const afterFirst = await saveOrder({
      ...order,
      payment: {
        ...order.payment!,
        paymentId: `mollie_${attemptA}`,
        status: 'pending',
      },
    });
    const afterSecond = await saveOrder({
      ...afterFirst,
      payment: {
        ...afterFirst.payment!,
        paymentId: `mollie_${attemptB}`,
        status: 'pending',
      },
    });

    expect(afterSecond.id).toBe(order.id);
    expect(afterSecond.orderNumber).toBe(1000);
    expect(afterSecond.payment?.paymentId).toBe(`mollie_${attemptB}`);
    expect(afterFirst.payment?.paymentId).not.toBe(afterSecond.payment?.paymentId);
  });

  it('does not change existing internal id when updating payment', async () => {
    const order = await placeOrder({
      customer: { email: 'stable@example.com' },
      paymentMethodId: 'mollie-remote',
      termsAccepted: true,
      coupon: null,
      items: [sampleItem],
      idempotencyKey: 'stable-id',
    });
    const internalId = order.id;
    const updated = await saveOrder({
      ...order,
      payment: {
        ...order.payment!,
        paymentId: 'mollie_999888777',
        status: 'processing',
      },
    });
    expect(updated.id).toBe(internalId);
    expect((await getOrderById(internalId))?.orderNumber).toBe(order.orderNumber);
  });
});

describe('order number display + lookup', () => {
  it('parseOrderLookupToken accepts #1000, 1000, and IV ids', () => {
    expect(parseOrderLookupToken('#1000')).toEqual({
      kind: 'order_number',
      orderNumber: 1000,
    });
    expect(parseOrderLookupToken('1001')).toEqual({
      kind: 'order_number',
      orderNumber: 1001,
    });
    expect(parseOrderLookupToken('IV-ABC-1')).toEqual({
      kind: 'order_id',
      orderId: 'IV-ABC-1',
    });
  });

  it('tracking accepts short order number and shows #NNNN', async () => {
    const order = await placeOrder({
      customer: { email: 'track@example.com' },
      paymentMethodId: 'mollie-remote',
      termsAccepted: true,
      coupon: null,
      items: [sampleItem],
      idempotencyKey: 'track-by-number',
    });

    const byNumber = await lookupTrackedOrder({
      orderId: String(order.orderNumber),
      email: 'track@example.com',
    });
    expect(byNumber.ok).toBe(true);
    if (byNumber.ok) {
      expect(byNumber.order.orderId).toBe('#1000');
    }

    const byHash = await lookupTrackedOrder({
      orderId: '#1000',
      email: 'track@example.com',
    });
    expect(byHash.ok).toBe(true);

    const byLegacy = await lookupTrackedOrder({
      orderId: order.id,
      email: 'track@example.com',
    });
    expect(byLegacy.ok).toBe(true);
    if (byLegacy.ok) {
      expect(byLegacy.order.orderId).toBe('#1000');
    }
  });

  it('falls back to internal id when orderNumber is missing (legacy)', () => {
    expect(
      formatCustomerOrderRef({ id: 'IV-LEGACY-1' }),
    ).toBe('IV-LEGACY-1');
  });
});
