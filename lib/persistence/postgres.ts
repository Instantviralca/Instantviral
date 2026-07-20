/**
 * PostgreSQL persistence via Drizzle — primary production store.
 */

import { and, desc, eq, gte } from 'drizzle-orm';

import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';
import type { ContactFormValues } from '@/lib/contact/validation';
import type {
  AdminAuditRecord,
  AdminSessionRecord,
  AppPersistence,
  ContactMessageRecord,
  WebhookEventRecord,
} from '@/lib/persistence/types';
import type { Order, OrderInternalNote, OrderLineItem, OrderPaymentDetails } from '@/types/order';
import type { OrderActor, OrderTimelineEvent } from '@/types/order-status';
import type { NotificationRecord } from '@/types/notification';
import type { CurrencyCode } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';
import type { PaymentProviderId, PaymentStatus } from '@/types/payment';
import type { OrderStatus } from '@/types/order-status';
import type { NotificationChannel, NotificationTemplateId, NotificationTrigger } from '@/types/notification';

function money(amount: number, currency: string) {
  return { amount, currency: currency as CurrencyCode };
}

function publicDestinationFromConfig(
  configuration: Record<string, string | number | boolean>,
): string | undefined {
  const candidates = ['username', 'profileUrl', 'url', 'videoUrl', 'channelUrl', 'target'];
  for (const key of candidates) {
    const value = configuration[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

async function hydrateOrder(orderId: string): Promise<Order | null> {
  const db = getDb();
  const [row] = await db.select().from(tables.orders).where(eq(tables.orders.id, orderId)).limit(1);
  if (!row) return null;

  const [items, payments, timeline, notes] = await Promise.all([
    db.select().from(tables.orderItems).where(eq(tables.orderItems.orderId, orderId)),
    db.select().from(tables.orderPayments).where(eq(tables.orderPayments.orderId, orderId)),
    db
      .select()
      .from(tables.orderTimelineEvents)
      .where(eq(tables.orderTimelineEvents.orderId, orderId)),
    db
      .select()
      .from(tables.orderInternalNotes)
      .where(eq(tables.orderInternalNotes.orderId, orderId)),
  ]);

  const paymentRow = payments[0];
  const payment: OrderPaymentDetails | undefined = paymentRow
    ? {
        provider: paymentRow.provider as PaymentProviderId,
        paymentId: paymentRow.paymentId,
        status: paymentRow.status as PaymentStatus,
        amount: money(paymentRow.amount, paymentRow.currency),
        paidAt: paymentRow.paidAt?.toISOString(),
      }
    : undefined;

  const lineItems: OrderLineItem[] = items.map((item) => ({
    id: item.id,
    platformId: item.platformId as PlatformId,
    serviceId: item.serviceId,
    serviceSlug: item.serviceSlug,
    serviceName: item.serviceName,
    packageId: item.packageId,
    packageTitle: item.packageTitle,
    quantity: item.quantity,
    quantityLabel: item.quantityLabel,
    unitPrice: item.unitPrice,
    currency: item.currency as CurrencyCode,
    configuration: item.configuration,
    deliveryTime: item.deliveryTime ?? undefined,
  }));

  const timelineEvents: OrderTimelineEvent[] = timeline
    .map((event) => ({
      id: event.id,
      orderId: event.orderId,
      type: event.type as OrderTimelineEvent['type'],
      previousStatus: (event.previousStatus as OrderStatus | null) ?? undefined,
      newStatus: (event.newStatus as OrderStatus | null) ?? undefined,
      status: (event.newStatus as OrderStatus | null) ?? undefined,
      message: event.message,
      publicMessage: event.publicMessage ?? undefined,
      internalNote: event.internalNote ?? undefined,
      updatedBy: {
        type: event.actorType as 'admin' | 'system' | 'customer',
        id: event.actorId,
      },
      at: event.at.toISOString(),
      meta: event.meta ?? undefined,
    }))
    .sort((a, b) => a.at.localeCompare(b.at));

  const internalNotes: OrderInternalNote[] = notes.map((note) => ({
    id: note.id,
    body: note.body,
    createdBy: {
      type: (note.createdByType === 'admin' || note.createdByType === 'system'
        ? note.createdByType
        : 'system') as OrderActor['type'],
      id: note.createdById,
    },
    createdAt: note.createdAt.toISOString(),
  }));

  return {
    id: row.id,
    guestEmail: row.guestEmail,
    status: row.status as OrderStatus,
    fulfillmentMode: row.fulfillmentMode as Order['fulfillmentMode'],
    currency: row.currency as CurrencyCode,
    items: lineItems,
    subtotal: money(row.subtotalAmount, row.currency),
    discount: money(row.discountAmount, row.currency),
    total: money(row.totalAmount, row.currency),
    couponCode: row.couponCode ?? undefined,
    customerNotes: row.customerNotes ?? undefined,
    payment,
    timeline: timelineEvents,
    internalNotes,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    ...(row.idempotencyKey ? { idempotencyKey: row.idempotencyKey } : {}),
  } as Order & { idempotencyKey?: string };
}

export function createPostgresPersistence(): AppPersistence {
  return {
    driver: 'postgres',
    async listOrders() {
      const db = getDb();
      const rows = await db.select({ id: tables.orders.id }).from(tables.orders).orderBy(desc(tables.orders.createdAt));
      const orders: Order[] = [];
      for (const row of rows) {
        const order = await hydrateOrder(row.id);
        if (order) orders.push(order);
      }
      return orders;
    },
    async getOrderById(orderId) {
      return hydrateOrder(orderId);
    },
    async getOrderByIdempotencyKey(key) {
      const db = getDb();
      const [row] = await db
        .select({ id: tables.orders.id })
        .from(tables.orders)
        .where(eq(tables.orders.idempotencyKey, key))
        .limit(1);
      return row ? hydrateOrder(row.id) : null;
    },
    async getOrderByPaymentId(paymentId) {
      const db = getDb();
      const [row] = await db
        .select({ orderId: tables.orderPayments.orderId })
        .from(tables.orderPayments)
        .where(eq(tables.orderPayments.paymentId, paymentId))
        .limit(1);
      return row ? hydrateOrder(row.orderId) : null;
    },
    async saveOrder(order) {
      const db = getDb();
      const withKey = order as Order & { idempotencyKey?: string };
      const existing = await hydrateOrder(order.id);

      await db
        .insert(tables.orders)
        .values({
          id: order.id,
          guestEmail: order.guestEmail,
          status: order.status,
          fulfillmentMode: order.fulfillmentMode,
          currency: order.currency,
          subtotalAmount: order.subtotal.amount,
          discountAmount: order.discount.amount,
          totalAmount: order.total.amount,
          couponCode: order.couponCode ?? null,
          customerNotes: order.customerNotes ?? null,
          idempotencyKey: withKey.idempotencyKey ?? null,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        })
        .onConflictDoUpdate({
          target: tables.orders.id,
          set: {
            guestEmail: order.guestEmail,
            status: order.status,
            fulfillmentMode: order.fulfillmentMode,
            currency: order.currency,
            subtotalAmount: order.subtotal.amount,
            discountAmount: order.discount.amount,
            totalAmount: order.total.amount,
            couponCode: order.couponCode ?? null,
            customerNotes: order.customerNotes ?? null,
            idempotencyKey: withKey.idempotencyKey ?? null,
            updatedAt: new Date(order.updatedAt),
          },
        });

      const itemRows = order.items.map((item, index) => ({
        // Never reuse cart line ids as PK — retries would collide across orders.
        id: `oli_${order.id}_${index}`,
        orderId: order.id,
        platformId: item.platformId,
        serviceId: item.serviceId,
        serviceSlug: item.serviceSlug,
        serviceName: item.serviceName,
        packageId: item.packageId,
        packageTitle: item.packageTitle,
        quantity: item.quantity,
        quantityLabel: item.quantityLabel,
        unitPrice: item.unitPrice,
        currency: item.currency,
        configuration: item.configuration ?? {},
        deliveryTime: item.deliveryTime?.trim() ? item.deliveryTime : null,
        publicDestination: publicDestinationFromConfig(item.configuration ?? {}) ?? null,
      }));

      if (!existing) {
        if (itemRows.length) {
          await db.insert(tables.orderItems).values(itemRows);
        }
      } else {
        // Replace items on update to keep sync simple for v1.
        await db.delete(tables.orderItems).where(eq(tables.orderItems.orderId, order.id));
        if (itemRows.length) {
          await db.insert(tables.orderItems).values(itemRows);
        }
      }

      if (order.payment) {
        const paymentId = order.payment.paymentId ?? `pending_${order.id}`;
        const paymentRowId = `pay_${order.id}`;
        await db
          .insert(tables.orderPayments)
          .values({
            id: paymentRowId,
            orderId: order.id,
            provider: order.payment.provider,
            paymentId,
            status: order.payment.status,
            amount: order.payment.amount.amount,
            currency: order.payment.amount.currency,
            paidAt: order.payment.paidAt ? new Date(order.payment.paidAt) : null,
            providerReference: paymentId,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt),
          })
          .onConflictDoUpdate({
            target: tables.orderPayments.id,
            set: {
              paymentId,
              status: order.payment.status,
              amount: order.payment.amount.amount,
              currency: order.payment.amount.currency,
              paidAt: order.payment.paidAt ? new Date(order.payment.paidAt) : null,
              providerReference: paymentId,
              updatedAt: new Date(order.updatedAt),
            },
          });
      }

      const existingTimelineIds = new Set(
        (existing?.timeline ?? []).map((event) => event.id),
      );
      const newTimeline = order.timeline.filter((event) => !existingTimelineIds.has(event.id));
      if (newTimeline.length) {
        await db.insert(tables.orderTimelineEvents).values(
          newTimeline.map((event) => ({
            id: event.id,
            orderId: order.id,
            type: event.type,
            previousStatus: event.previousStatus ?? null,
            newStatus: event.newStatus ?? event.status ?? null,
            message: event.message,
            publicMessage: event.publicMessage ?? null,
            internalNote: event.internalNote ?? null,
            actorType: event.updatedBy.type,
            actorId: event.updatedBy.id,
            at: new Date(event.at),
            meta: event.meta ?? null,
          })),
        );
      }

      if (order.couponCode && order.discount.amount > 0 && !existing?.couponCode) {
        await db.insert(tables.couponRedemptions).values({
          id: `cpn_${order.id}`,
          orderId: order.id,
          code: order.couponCode,
          discountAmount: order.discount.amount,
          currency: order.currency,
          createdAt: new Date(order.createdAt),
        });
      }

      return withKey;
    },
    async addInternalNote(orderId, note) {
      const db = getDb();
      await db.insert(tables.orderInternalNotes).values({
        id: note.id,
        orderId,
        body: note.body,
        createdByType: note.createdBy.type,
        createdById: note.createdBy.id,
        createdAt: new Date(note.createdAt),
      });
      return note;
    },
    async saveContactMessage(values: ContactFormValues, meta) {
      const db = getDb();
      const record: ContactMessageRecord = {
        ...values,
        id: `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        userAgent: meta?.userAgent,
      };
      await db.insert(tables.contactMessages).values({
        id: record.id,
        fullName: record.fullName,
        email: record.email,
        subject: record.subject,
        orderId: record.orderId || null,
        message: record.message,
        userAgent: record.userAgent ?? null,
        createdAt: new Date(record.createdAt),
      });
      return record;
    },
    async listContactMessages() {
      const db = getDb();
      const rows = await db
        .select()
        .from(tables.contactMessages)
        .orderBy(desc(tables.contactMessages.createdAt));
      return rows.map((row) => ({
        id: row.id,
        fullName: row.fullName,
        email: row.email,
        subject: row.subject,
        orderId: row.orderId ?? '',
        message: row.message,
        createdAt: row.createdAt.toISOString(),
        userAgent: row.userAgent ?? undefined,
      }));
    },
    async saveNotification(record) {
      const db = getDb();
      const withKey = record as NotificationRecord & { idempotencyKey?: string };
      await db.insert(tables.notificationRecords).values({
        id: record.id,
        orderId: record.orderId,
        channel: record.channel,
        templateId: record.templateId,
        trigger: record.trigger,
        recipient: record.recipient,
        status: record.status,
        subject: record.subject,
        bodyPreview: record.bodyPreview ?? null,
        errorMessage: record.errorMessage ?? null,
        providerId: record.providerId ?? null,
        providerMessageId: record.providerMessageId ?? null,
        idempotencyKey: withKey.idempotencyKey ?? null,
        createdAt: new Date(record.createdAt),
        sentAt: record.sentAt ? new Date(record.sentAt) : null,
      });
      return withKey;
    },
    async findByIdempotencyKey(key) {
      const db = getDb();
      const [row] = await db
        .select()
        .from(tables.notificationRecords)
        .where(eq(tables.notificationRecords.idempotencyKey, key))
        .limit(1);
      if (!row) return null;
      return {
        id: row.id,
        orderId: row.orderId ?? '',
        channel: row.channel as NotificationChannel,
        templateId: row.templateId as NotificationTemplateId,
        trigger: row.trigger as NotificationTrigger,
        recipient: row.recipient,
        status: row.status as NotificationRecord['status'],
        subject: row.subject,
        bodyPreview: row.bodyPreview ?? undefined,
        errorMessage: row.errorMessage ?? undefined,
        providerId: row.providerId ?? undefined,
        providerMessageId: row.providerMessageId ?? undefined,
        createdAt: row.createdAt.toISOString(),
        sentAt: row.sentAt?.toISOString(),
        immutable: true as const,
        idempotencyKey: row.idempotencyKey ?? undefined,
      };
    },
    async listByOrderId(orderId) {
      const db = getDb();
      const rows = await db
        .select()
        .from(tables.notificationRecords)
        .where(eq(tables.notificationRecords.orderId, orderId));
      return rows.map((row) => ({
        id: row.id,
        orderId: row.orderId ?? '',
        channel: row.channel as NotificationChannel,
        templateId: row.templateId as NotificationTemplateId,
        trigger: row.trigger as NotificationTrigger,
        recipient: row.recipient,
        status: row.status as NotificationRecord['status'],
        subject: row.subject,
        bodyPreview: row.bodyPreview ?? undefined,
        errorMessage: row.errorMessage ?? undefined,
        providerId: row.providerId ?? undefined,
        providerMessageId: row.providerMessageId ?? undefined,
        createdAt: row.createdAt.toISOString(),
        sentAt: row.sentAt?.toISOString(),
        immutable: true as const,
      }));
    },
    async hasProcessed(provider, eventId) {
      const db = getDb();
      const [row] = await db
        .select({ id: tables.webhookEvents.id })
        .from(tables.webhookEvents)
        .where(
          and(
            eq(tables.webhookEvents.provider, provider),
            eq(tables.webhookEvents.eventId, eventId),
          ),
        )
        .limit(1);
      return Boolean(row);
    },
    async markProcessed(event: WebhookEventRecord) {
      const db = getDb();
      await db.insert(tables.webhookEvents).values({
        id: event.id,
        provider: event.provider,
        eventId: event.eventId,
        eventType: event.eventType,
        paymentId: event.paymentId ?? null,
        processedAt: new Date(event.processedAt),
        rawSummary: event.rawSummary ?? null,
      });
    },
    async recordLoginAttempt(ipHash, success) {
      const db = getDb();
      await db.insert(tables.adminLoginAttempts).values({
        id: `la_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        ipHash,
        success,
        createdAt: new Date(),
      });
    },
    async countRecentFailures(ipHash, sinceIso) {
      const db = getDb();
      const rows = await db
        .select()
        .from(tables.adminLoginAttempts)
        .where(
          and(
            eq(tables.adminLoginAttempts.ipHash, ipHash),
            eq(tables.adminLoginAttempts.success, false),
            gte(tables.adminLoginAttempts.createdAt, new Date(sinceIso)),
          ),
        );
      return rows.length;
    },
    async createSession(session: AdminSessionRecord) {
      const db = getDb();
      await db.insert(tables.adminSessions).values({
        id: session.id,
        tokenHash: session.tokenHash,
        expiresAt: new Date(session.expiresAt),
        revokedAt: session.revokedAt ? new Date(session.revokedAt) : null,
        createdAt: new Date(session.createdAt),
      });
    },
    async getSessionByTokenHash(tokenHash) {
      const db = getDb();
      const [row] = await db
        .select()
        .from(tables.adminSessions)
        .where(eq(tables.adminSessions.tokenHash, tokenHash))
        .limit(1);
      if (!row) return null;
      return {
        id: row.id,
        tokenHash: row.tokenHash,
        expiresAt: row.expiresAt.toISOString(),
        revokedAt: row.revokedAt?.toISOString() ?? null,
        createdAt: row.createdAt.toISOString(),
      };
    },
    async revokeSession(tokenHash) {
      const db = getDb();
      await db
        .update(tables.adminSessions)
        .set({ revokedAt: new Date() })
        .where(eq(tables.adminSessions.tokenHash, tokenHash));
    },
    async writeAudit(event: AdminAuditRecord) {
      const db = getDb();
      await db.insert(tables.adminAuditEvents).values({
        id: event.id,
        actorId: event.actorId,
        action: event.action,
        targetType: event.targetType ?? null,
        targetId: event.targetId ?? null,
        reason: event.reason ?? null,
        createdAt: new Date(event.createdAt),
        meta: event.meta ?? null,
      });
    },
  };
}
