/**
 * Order line-item quantity / pricing / display tests.
 */

import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import { getAdminOrderById } from '@/lib/admin/orders';
import {
  computeLineTotal,
  formatOrderItemsHtml,
  formatOrderItemsSummary,
  formatOrderItemsText,
  normalizeOrderLineItem,
  resolveCartQuantity,
  resolveLineTotal,
} from '@/lib/orders/line-items';
import { assertClientTotalsMatch, validateCheckoutPricing } from '@/lib/orders/pricing';
import { placeOrder } from '@/lib/orders/create';
import { getOrderById, resetOrderStoreForTests } from '@/lib/orders/store';
import {
  clearPersistenceSingletonForTests,
  useMemoryPersistenceForTests,
} from '@/lib/persistence';
import type { CartItem } from '@/types/cart';

const prevPassword = process.env.IV_ADMIN_PASSWORD;
const prevSecret = process.env.IV_ADMIN_SESSION_SECRET;

beforeEach(() => {
  process.env.IV_PERSISTENCE = 'memory';
  process.env.IV_ADMIN_PASSWORD = 'test-admin-password';
  process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret';
  clearPersistenceSingletonForTests();
  useMemoryPersistenceForTests();
  resetOrderStoreForTests();
});

afterEach(() => {
  if (prevPassword === undefined) delete process.env.IV_ADMIN_PASSWORD;
  else process.env.IV_ADMIN_PASSWORD = prevPassword;
  if (prevSecret === undefined) delete process.env.IV_ADMIN_SESSION_SECRET;
  else process.env.IV_ADMIN_SESSION_SECRET = prevSecret;
  resetOrderStoreForTests();
  clearPersistenceSingletonForTests();
});

function cartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: 'cart_1',
    packageId: 'ig-f-1000',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    platformId: 'instagram',
    packageTitle: '1,000 Followers',
    quantity: 1000,
    quantityLabel: '1,000',
    cartQuantity: 1,
    unitPrice: 1,
    currency: 'USD',
    deliveryTime: 'Gradual',
    configuration: { username: 'demo_user' },
    addedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('line item helpers', () => {
  it('defaults legacy cartQuantity to 1 and lineTotal to unitPrice', () => {
    const legacy = normalizeOrderLineItem({
      id: '1',
      platformId: 'instagram',
      serviceId: 's',
      serviceSlug: 'buy-instagram-followers',
      serviceName: 'Instagram Followers',
      packageId: 'ig-f-1000',
      packageTitle: '1,000 Followers',
      quantity: 1000,
      quantityLabel: '1,000',
      unitPrice: 999,
      currency: 'USD',
      configuration: {},
    });
    expect(resolveCartQuantity(legacy)).toBe(1);
    expect(resolveLineTotal(legacy)).toBe(999);
  });

  it('computes line totals for cartQuantity > 1', () => {
    expect(computeLineTotal(999, 3)).toBe(2997);
    expect(resolveLineTotal({ unitPrice: 999, cartQuantity: 3 })).toBe(2997);
  });
});

describe('validateCheckoutPricing multi-item', () => {
  it('single item qty 1 uses catalog unit price as line total', () => {
    const priced = validateCheckoutPricing({ items: [cartItem()] });
    expect(priced.items).toHaveLength(1);
    expect(priced.items[0]?.cartQuantity).toBe(1);
    expect(priced.items[0]?.unitPrice).toBe(999);
    expect(priced.items[0]?.lineTotal).toBe(999);
    expect(priced.total.amount).toBe(999);
  });

  it('single item cartQuantity > 1 multiplies line total', () => {
    const priced = validateCheckoutPricing({
      items: [cartItem({ cartQuantity: 3, unitPrice: 1 })],
    });
    expect(priced.items[0]?.cartQuantity).toBe(3);
    expect(priced.items[0]?.lineTotal).toBe(2997);
    expect(priced.subtotal.amount).toBe(2997);
    expect(priced.total.amount).toBe(2997);
  });

  it('multiple different items keep per-item configuration and totals', () => {
    const priced = validateCheckoutPricing({
      items: [
        cartItem({ id: 'a', cartQuantity: 2 }),
        cartItem({
          id: 'b',
          packageId: 'ig-l-500',
          serviceId: 'instagram-likes',
          serviceSlug: 'buy-instagram-likes',
          serviceName: 'Instagram Likes',
          packageTitle: '500 Likes',
          quantity: 500,
          quantityLabel: '500',
          cartQuantity: 1,
          configuration: { targetUrl: 'https://www.instagram.com/p/CxYzDemo123/' },
        }),
      ],
    });
    expect(priced.items).toHaveLength(2);
    expect(priced.items[0]?.serviceName).toContain('Followers');
    expect(priced.items[0]?.cartQuantity).toBe(2);
    expect(priced.items[0]?.configuration.username).toBe('demo_user');
    expect(priced.items[1]?.serviceName).toContain('Likes');
    expect(priced.items[1]?.configuration.targetUrl).toContain('instagram.com');
    expect(priced.subtotal.amount).toBe(
      (priced.items[0]?.lineTotal ?? 0) + (priced.items[1]?.lineTotal ?? 0),
    );
  });

  it('rejects manipulated client totals', () => {
    const server = validateCheckoutPricing({ items: [cartItem()] });
    expect(() =>
      assertClientTotalsMatch(server, {
        total: { amount: 1, currency: 'USD' },
      }),
    ).toThrow(/Price validation failed/);
  });
});

describe('placeOrder itemization', () => {
  it('persists all items with explicit cartQuantity', async () => {
    const order = await placeOrder({
      customer: { email: 'buyer@example.com' },
      paymentMethodId: 'mollie-remote',
      termsAccepted: true,
      coupon: null,
      items: [
        cartItem({ id: 'c1', cartQuantity: 2 }),
        cartItem({
          id: 'c2',
          packageId: 'ig-l-500',
          serviceId: 'instagram-likes',
          serviceSlug: 'buy-instagram-likes',
          serviceName: 'Instagram Likes',
          packageTitle: '500 Likes',
          quantity: 500,
          quantityLabel: '500',
          cartQuantity: 1,
          configuration: { targetUrl: 'https://www.instagram.com/p/CxYzDemo456/' },
        }),
      ],
    });

    expect(order.items).toHaveLength(2);
    expect(order.items[0]?.cartQuantity).toBe(2);
    expect(order.items[0]?.lineTotal).toBe(order.items[0]!.unitPrice * 2);
    expect(order.items[1]?.cartQuantity).toBe(1);
    expect(order.total.amount).toBe(
      (order.items[0]?.lineTotal ?? 0) + (order.items[1]?.lineTotal ?? 0),
    );

    const details = await getAdminOrderById(order.id);
    expect(details?.lineItems).toHaveLength(2);
    expect(details?.lineItems[0]?.cartQuantity).toBe(2);
    expect(details?.itemsSummary).toContain('×2');

    const html = formatOrderItemsHtml(order);
    const text = formatOrderItemsText(order);
    expect(html).toContain('Qty: 2');
    expect(html).toContain('Instagram Likes');
    expect(text).toContain('Qty: 1');
    expect(formatOrderItemsSummary(order)).toMatch(/more/i);
  });
});

describe('analytics revenue allocation safety', () => {
  it('does not invent double overall revenue from multi-item orders', async () => {
    const order = await placeOrder({
      customer: { email: 'buyer2@example.com' },
      paymentMethodId: 'mollie-remote',
      termsAccepted: true,
      coupon: null,
      items: [
        cartItem({ id: 'x1', cartQuantity: 1 }),
        cartItem({
          id: 'x2',
          packageId: 'ig-l-500',
          serviceId: 'instagram-likes',
          serviceSlug: 'buy-instagram-likes',
          serviceName: 'Instagram Likes',
          packageTitle: '500 Likes',
          quantity: 500,
          quantityLabel: '500',
          cartQuantity: 1,
          configuration: { targetUrl: 'https://www.instagram.com/p/CxYzDemo789/' },
        }),
      ],
    });
    const stored = await getOrderById(order.id);
    expect(stored?.total.amount).toBe(order.total.amount);
    // Overall GMV remains one order total, not sum of misattributed copies.
    expect(stored?.items.length).toBeGreaterThan(1);
    expect(stored?.total.amount).toBe(
      stored!.items.reduce((sum, item) => sum + resolveLineTotal(item), 0),
    );
  });
});
