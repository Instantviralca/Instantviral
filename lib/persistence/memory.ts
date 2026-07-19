/**
 * In-memory persistence — tests and local mock mode only.
 */

import type {
  AdminAuditRecord,
  AdminAuthStore,
  AdminSessionRecord,
  AppPersistence,
  ContactMessageRecord,
  ContactStore,
  NotificationStore,
  OrderStore,
  WebhookEventRecord,
  WebhookStore,
} from '@/lib/persistence/types';
import type { ContactFormValues } from '@/lib/contact/validation';
import type { Order } from '@/types/order';
import type { NotificationRecord } from '@/types/notification';

function createMemoryState() {
  return {
    orders: [] as Order[],
    contacts: [] as ContactMessageRecord[],
    notifications: [] as Array<NotificationRecord & { idempotencyKey?: string }>,
    webhooks: [] as WebhookEventRecord[],
    loginAttempts: [] as Array<{ ipHash: string; success: boolean; createdAt: string }>,
    sessions: [] as AdminSessionRecord[],
    audits: [] as AdminAuditRecord[],
  };
}

let state = createMemoryState();

export function createMemoryPersistence(): AppPersistence {
  const ordersApi: OrderStore = {
    async listOrders() {
      return [...state.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async getOrderById(orderId) {
      return state.orders.find((o) => o.id === orderId) ?? null;
    },
    async getOrderByIdempotencyKey(key) {
      return (
        state.orders.find((o) => (o as Order & { idempotencyKey?: string }).idempotencyKey === key) ??
        null
      );
    },
    async getOrderByPaymentId(paymentId) {
      return state.orders.find((o) => o.payment?.paymentId === paymentId) ?? null;
    },
    async saveOrder(order) {
      const withKey = order as Order & { idempotencyKey?: string };
      const index = state.orders.findIndex((o) => o.id === order.id);
      if (index >= 0) state.orders[index] = withKey;
      else state.orders.unshift(withKey);
      return withKey;
    },
    async addInternalNote(orderId, note) {
      const order = await this.getOrderById(orderId);
      if (!order) throw new Error('Order not found');
      const updated = {
        ...order,
        internalNotes: [...order.internalNotes, note],
        updatedAt: new Date().toISOString(),
      };
      await this.saveOrder(updated);
      return note;
    },
  };

  const contactsApi: ContactStore = {
    async saveContactMessage(values: ContactFormValues, meta) {
      const record: ContactMessageRecord = {
        ...values,
        id: `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        userAgent: meta?.userAgent,
      };
      state.contacts.unshift(record);
      return record;
    },
    async listContactMessages() {
      return [...state.contacts];
    },
  };

  const notificationsApi: NotificationStore = {
    async saveNotification(record) {
      state.notifications.unshift(record);
      return record;
    },
    async findByIdempotencyKey(key) {
      return state.notifications.find((n) => n.idempotencyKey === key) ?? null;
    },
    async listByOrderId(orderId) {
      return state.notifications.filter((n) => n.orderId === orderId);
    },
  };

  const webhooksApi: WebhookStore = {
    async hasProcessed(provider, eventId) {
      return state.webhooks.some((w) => w.provider === provider && w.eventId === eventId);
    },
    async markProcessed(event) {
      state.webhooks.push(event);
    },
  };

  const adminApi: AdminAuthStore = {
    async recordLoginAttempt(ipHash, success) {
      state.loginAttempts.push({
        ipHash,
        success,
        createdAt: new Date().toISOString(),
      });
    },
    async countRecentFailures(ipHash, sinceIso) {
      return state.loginAttempts.filter(
        (a) => a.ipHash === ipHash && !a.success && a.createdAt >= sinceIso,
      ).length;
    },
    async createSession(session) {
      state.sessions.push(session);
    },
    async getSessionByTokenHash(tokenHash) {
      return state.sessions.find((s) => s.tokenHash === tokenHash) ?? null;
    },
    async revokeSession(tokenHash) {
      const session = state.sessions.find((s) => s.tokenHash === tokenHash);
      if (session) session.revokedAt = new Date().toISOString();
    },
    async writeAudit(event) {
      state.audits.push(event);
    },
  };

  return {
    driver: 'memory',
    ...ordersApi,
    ...contactsApi,
    ...notificationsApi,
    ...webhooksApi,
    ...adminApi,
    resetForTests() {
      state = createMemoryState();
    },
  };
}
