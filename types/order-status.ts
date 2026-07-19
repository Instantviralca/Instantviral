/**
 * Official Order Status System — Documents 11.02 / 11.03
 * Single source of truth for Admin, Tracking, Notifications, Analytics.
 */

/** Production order statuses (v1 manual fulfillment). */
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'partial'
  | 'cancelled'
  | 'refunded';

/** Design-system color token keys — never hardcode hex in consumers. */
export type OrderStatusColorToken =
  | 'status.pending'
  | 'status.processing'
  | 'status.completed'
  | 'status.partial'
  | 'status.cancelled'
  | 'status.refunded';

export type OrderStatusIconPlaceholder =
  | 'clock'
  | 'loader'
  | 'check-circle'
  | 'alert-circle'
  | 'x-circle'
  | 'undo';

export type AdminOrderActionId =
  | 'view'
  | 'start_processing'
  | 'complete'
  | 'mark_partial'
  | 'cancel'
  | 'refund'
  | 'add_internal_note';

export type OrderStatusMetadata = {
  id: OrderStatus;
  /** Admin-facing label */
  adminLabel: string;
  /** Short customer-facing label */
  customerLabel: string;
  /** Full customer-facing message */
  customerMessage: string;
  description: string;
  colorToken: OrderStatusColorToken;
  icon: OrderStatusIconPlaceholder;
  terminal: boolean;
  /** Refunded is defined now but marked future-ready. */
  future?: boolean;
  allowedAdminActions: AdminOrderActionId[];
};

export type OrderStatusTransitionMap = Record<OrderStatus, readonly OrderStatus[]>;

export type OrderActorType = 'admin' | 'system' | 'customer';

export type OrderActor = {
  id: string;
  type: OrderActorType;
  displayName?: string;
};

/**
 * Immutable timeline / status-change event — Documents 11.02 / 11.03.
 * Timeline history must never be deleted.
 */
export type OrderTimelineEvent = {
  id: string;
  orderId?: string;
  type: OrderTimelineEventType;
  previousStatus?: OrderStatus;
  newStatus?: OrderStatus;
  /** @deprecated Prefer newStatus — kept for compatibility with early 11.01 stubs. */
  status?: OrderStatus;
  message: string;
  /** Public-safe message for tracking / notifications. Never include internal notes. */
  publicMessage?: string;
  /** Internal-only note — never expose to customers. */
  internalNote?: string;
  updatedBy: OrderActor;
  at: string;
  meta?: Record<string, string | number | boolean>;
};

export type OrderTimelineEventType =
  | 'order_created'
  | 'payment_confirmed'
  | 'status_changed'
  | 'processing_started'
  | 'completed'
  | 'partial'
  | 'cancelled'
  | 'refunded'
  | 'note_added'
  | 'manual_review'
  | 'fulfillment_updated'
  /** Reserved for future automated provider flow — not used in v1 manual path. */
  | 'submitted_to_provider'
  | 'provider_accepted'
  | 'retry_attempted'
  | 'failed';
