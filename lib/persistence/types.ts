/**
 * Persistence contracts — Document 11 / launch blockers.
 */

import type { Order, OrderInternalNote } from '@/types/order';
import type { NotificationRecord } from '@/types/notification';
import type { ContactFormValues } from '@/lib/contact/validation';

export type ContactMessageRecord = ContactFormValues & {
  id: string;
  createdAt: string;
  userAgent?: string;
};

export type WebhookEventRecord = {
  id: string;
  provider: string;
  eventId: string;
  eventType: string;
  paymentId?: string;
  processedAt: string;
  rawSummary?: string;
};

export type AdminAuditRecord = {
  id: string;
  actorId: string;
  action: string;
  targetType?: string;
  targetId?: string;
  reason?: string;
  createdAt: string;
  meta?: Record<string, string | number | boolean>;
};

export type AdminSessionRecord = {
  id: string;
  tokenHash: string;
  expiresAt: string;
  revokedAt?: string | null;
  createdAt: string;
};

export type PersistenceDriver = 'postgres' | 'memory' | 'file';

export type OrderStore = {
  listOrders(): Promise<Order[]>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrderByIdempotencyKey(key: string): Promise<Order | null>;
  getOrderByPaymentId(paymentId: string): Promise<Order | null>;
  saveOrder(order: Order): Promise<Order>;
  addInternalNote(orderId: string, note: OrderInternalNote): Promise<OrderInternalNote>;
};

export type ContactStore = {
  saveContactMessage(
    values: ContactFormValues,
    meta?: { userAgent?: string },
  ): Promise<ContactMessageRecord>;
  listContactMessages(): Promise<ContactMessageRecord[]>;
};

export type NotificationStore = {
  saveNotification(record: NotificationRecord & { idempotencyKey?: string }): Promise<NotificationRecord>;
  findByIdempotencyKey(key: string): Promise<NotificationRecord | null>;
  listByOrderId(orderId: string): Promise<NotificationRecord[]>;
};

export type WebhookStore = {
  hasProcessed(provider: string, eventId: string): Promise<boolean>;
  markProcessed(event: WebhookEventRecord): Promise<void>;
};

export type AdminAuthStore = {
  recordLoginAttempt(ipHash: string, success: boolean): Promise<void>;
  countRecentFailures(ipHash: string, sinceIso: string): Promise<number>;
  createSession(session: AdminSessionRecord): Promise<void>;
  getSessionByTokenHash(tokenHash: string): Promise<AdminSessionRecord | null>;
  revokeSession(tokenHash: string): Promise<void>;
  writeAudit(event: AdminAuditRecord): Promise<void>;
};

export type AppPersistence = OrderStore &
  ContactStore &
  NotificationStore &
  WebhookStore &
  AdminAuthStore & {
    driver: PersistenceDriver;
    resetForTests?: () => void;
  };
