/**
 * Drizzle schema — PostgreSQL (Neon/Supabase compatible via DATABASE_URL).
 */

import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

export const orders = pgTable(
  'orders',
  {
    id: text('id').primaryKey(),
    guestEmail: text('guest_email').notNull(),
    status: text('status').notNull(),
    fulfillmentMode: text('fulfillment_mode').notNull().default('manual'),
    currency: text('currency').notNull(),
    subtotalAmount: integer('subtotal_amount').notNull(),
    discountAmount: integer('discount_amount').notNull().default(0),
    totalAmount: integer('total_amount').notNull(),
    couponCode: text('coupon_code'),
    customerNotes: text('customer_notes'),
    idempotencyKey: text('idempotency_key'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    emailIdx: index('orders_guest_email_idx').on(t.guestEmail),
    idempotencyIdx: uniqueIndex('orders_idempotency_key_uidx').on(t.idempotencyKey),
  }),
);

export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  platformId: text('platform_id').notNull(),
  serviceId: text('service_id').notNull(),
  serviceSlug: text('service_slug').notNull(),
  serviceName: text('service_name').notNull(),
  packageId: text('package_id').notNull(),
  packageTitle: text('package_title').notNull(),
  quantity: integer('quantity').notNull(),
  quantityLabel: text('quantity_label').notNull(),
  unitPrice: integer('unit_price').notNull(),
  currency: text('currency').notNull(),
  configuration: jsonb('configuration').notNull().$type<Record<string, string | number | boolean>>(),
  deliveryTime: text('delivery_time'),
  publicDestination: text('public_destination'),
});

export const orderPayments = pgTable(
  'order_payments',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    provider: text('provider').notNull(),
    paymentId: text('payment_id').notNull(),
    status: text('status').notNull(),
    amount: integer('amount').notNull(),
    currency: text('currency').notNull(),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    providerReference: text('provider_reference'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    paymentIdIdx: uniqueIndex('order_payments_payment_id_uidx').on(t.paymentId),
  }),
);

export const orderTimelineEvents = pgTable('order_timeline_events', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  previousStatus: text('previous_status'),
  newStatus: text('new_status'),
  message: text('message').notNull(),
  publicMessage: text('public_message'),
  internalNote: text('internal_note'),
  actorType: text('actor_type').notNull(),
  actorId: text('actor_id').notNull(),
  at: timestamp('at', { withTimezone: true }).notNull(),
  meta: jsonb('meta').$type<Record<string, string | number | boolean>>(),
});

export const orderInternalNotes = pgTable('order_internal_notes', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  body: text('body').notNull(),
  createdByType: text('created_by_type').notNull(),
  createdById: text('created_by_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const contactMessages = pgTable('contact_messages', {
  id: text('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  orderId: text('order_id'),
  message: text('message').notNull(),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const notificationRecords = pgTable(
  'notification_records',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id'),
    channel: text('channel').notNull(),
    templateId: text('template_id').notNull(),
    trigger: text('trigger').notNull(),
    recipient: text('recipient').notNull(),
    status: text('status').notNull(),
    subject: text('subject').notNull(),
    bodyPreview: text('body_preview'),
    errorMessage: text('error_message'),
    providerId: text('provider_id'),
    providerMessageId: text('provider_message_id'),
    idempotencyKey: text('idempotency_key'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    sentAt: timestamp('sent_at', { withTimezone: true }),
  },
  (t) => ({
    idempotencyIdx: uniqueIndex('notification_idempotency_uidx').on(t.idempotencyKey),
  }),
);

export const webhookEvents = pgTable(
  'webhook_events',
  {
    id: text('id').primaryKey(),
    provider: text('provider').notNull(),
    eventId: text('event_id').notNull(),
    eventType: text('event_type').notNull(),
    paymentId: text('payment_id'),
    processedAt: timestamp('processed_at', { withTimezone: true }).notNull(),
    rawSummary: text('raw_summary'),
  },
  (t) => ({
    providerEventIdx: uniqueIndex('webhook_provider_event_uidx').on(t.provider, t.eventId),
  }),
);

export const adminAuditEvents = pgTable('admin_audit_events', {
  id: text('id').primaryKey(),
  actorId: text('actor_id').notNull(),
  action: text('action').notNull(),
  targetType: text('target_type'),
  targetId: text('target_id'),
  reason: text('reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  meta: jsonb('meta').$type<Record<string, string | number | boolean>>(),
});

export const adminSessions = pgTable('admin_sessions', {
  id: text('id').primaryKey(),
  tokenHash: text('token_hash').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const adminLoginAttempts = pgTable('admin_login_attempts', {
  id: text('id').primaryKey(),
  ipHash: text('ip_hash').notNull(),
  success: boolean('success').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const couponRedemptions = pgTable('coupon_redemptions', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  discountAmount: integer('discount_amount').notNull(),
  currency: text('currency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

/** Admin-editable site settings (e.g. remote payment website URL). */
export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
});
