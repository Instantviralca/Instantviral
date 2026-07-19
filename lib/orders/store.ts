/**
 * Order store facade — Postgres primary; memory/file only via persistence resolver.
 */

import { getPersistence, resetPersistenceForTests } from '@/lib/persistence';
import type { Order } from '@/types/order';

export async function listOrders(): Promise<Order[]> {
  return getPersistence().listOrders();
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  return getPersistence().getOrderById(orderId);
}

export async function getOrderByIdempotencyKey(key: string): Promise<Order | null> {
  return getPersistence().getOrderByIdempotencyKey(key);
}

export async function getOrderByPaymentId(paymentId: string): Promise<Order | null> {
  return getPersistence().getOrderByPaymentId(paymentId);
}

export async function saveOrder(order: Order): Promise<Order> {
  return getPersistence().saveOrder(order);
}

export function createOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IV-${stamp}-${rand}`;
}

/** Test helper — wipe in-memory / test persistence. */
export function resetOrderStoreForTests(): void {
  resetPersistenceForTests();
}
