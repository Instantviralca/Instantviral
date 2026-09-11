/**
 * Customer-facing InstantViral order numbers (#1000, #1001, …).
 * Allocated atomically via PostgreSQL sequence (or in-memory for tests).
 * Does not replace orders.id or Mollie/CarryCubes payment identifiers.
 */

import { sql } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import type { Order } from '@/types/order';

/** First assigned InstantViral order number. */
export const ORDER_NUMBER_START = 1000;

/** PostgreSQL sequence backing orders.order_number. */
export const ORDER_NUMBER_SEQUENCE = 'orders_order_number_seq';

let memoryNext = ORDER_NUMBER_START;

/** Test helper — reset in-memory allocator. */
export function resetOrderNumberAllocatorForTests(start: number = ORDER_NUMBER_START): void {
  memoryNext = start;
}

/**
 * Allocate the next unique order number (concurrency-safe in Postgres).
 */
export async function allocateOrderNumber(): Promise<number> {
  if (isDatabaseConfigured()) {
    const db = getDb();
    const result = await db.execute(
      sql`select nextval('orders_order_number_seq')::int as n`,
    );
    const rows = result as unknown as Array<{ n: number | string }> | {
      rows?: Array<{ n: number | string }>;
    };
    const list = Array.isArray(rows) ? rows : (rows.rows ?? []);
    const raw = list[0]?.n;
    const n = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isInteger(n) || n < ORDER_NUMBER_START) {
      throw new Error('Failed to allocate InstantViral order number.');
    }
    return n;
  }

  const n = memoryNext;
  memoryNext += 1;
  return n;
}

/** Human-facing label, e.g. "#1000". Falls back to internal id for legacy rows. */
export function formatCustomerOrderRef(
  order: Pick<Order, 'id' | 'orderNumber'>,
): string {
  if (typeof order.orderNumber === 'number' && Number.isInteger(order.orderNumber)) {
    return `#${order.orderNumber}`;
  }
  return order.id;
}

/** Parse a track-order input that may be "#1000", "1000", or an IV-* id. */
export function parseOrderLookupToken(raw: string): {
  kind: 'order_number' | 'order_id';
  orderNumber?: number;
  orderId?: string;
} {
  const trimmed = raw.trim();
  const asNumber = trimmed.startsWith('#') ? trimmed.slice(1).trim() : trimmed;
  if (/^\d+$/.test(asNumber)) {
    const n = Number(asNumber);
    if (Number.isInteger(n) && n >= ORDER_NUMBER_START) {
      return { kind: 'order_number', orderNumber: n };
    }
  }
  return { kind: 'order_id', orderId: trimmed };
}
