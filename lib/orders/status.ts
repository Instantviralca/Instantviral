import type {
  AdminOrderActionId,
  OrderStatus,
  OrderStatusMetadata,
  OrderStatusTransitionMap,
} from '@/types/order-status';

/**
 * Official status registry — Document 11.03.
 * Do not add production statuses without updating the doc + this file.
 */

export const ORDER_STATUSES: readonly OrderStatus[] = [
  'pending',
  'processing',
  'completed',
  'partial',
  'cancelled',
  'refunded',
] as const;

/** Happy-path manual flow: Pending → Processing → Completed */
export const MANUAL_ORDER_STATUS_FLOW: readonly OrderStatus[] = [
  'pending',
  'processing',
  'completed',
] as const;

export const TERMINAL_ORDER_STATUSES: readonly OrderStatus[] = [
  'cancelled',
  'refunded',
] as const;

/**
 * Allowed transitions — Document 11.03.
 * Pending → Completed is intentionally invalid (must review / start processing).
 */
export const ORDER_STATUS_TRANSITIONS: OrderStatusTransitionMap = {
  pending: ['processing', 'cancelled'],
  processing: ['completed', 'partial', 'cancelled'],
  completed: ['refunded'],
  partial: ['refunded'],
  cancelled: [],
  refunded: [],
};

export const ORDER_STATUS_METADATA: Record<OrderStatus, OrderStatusMetadata> = {
  pending: {
    id: 'pending',
    adminLabel: 'Pending',
    customerLabel: 'Pending',
    customerMessage:
      'Your order has been received and is waiting to be processed.',
    description: 'Payment verified. Waiting for manual review.',
    colorToken: 'status.pending',
    icon: 'clock',
    terminal: false,
    allowedAdminActions: ['view', 'start_processing', 'cancel', 'add_internal_note'],
  },
  processing: {
    id: 'processing',
    adminLabel: 'Processing',
    customerLabel: 'Processing',
    customerMessage: 'Your order is currently being processed.',
    description: 'Admin has started fulfilling the order.',
    colorToken: 'status.processing',
    icon: 'loader',
    terminal: false,
    allowedAdminActions: [
      'view',
      'complete',
      'mark_partial',
      'cancel',
      'add_internal_note',
    ],
  },
  completed: {
    id: 'completed',
    adminLabel: 'Completed',
    customerLabel: 'Completed',
    customerMessage: 'Your order has been completed successfully.',
    description: 'Order has been fully completed.',
    colorToken: 'status.completed',
    icon: 'check-circle',
    terminal: false,
    allowedAdminActions: ['view', 'refund', 'add_internal_note'],
  },
  partial: {
    id: 'partial',
    adminLabel: 'Partial',
    customerLabel: 'Partial',
    customerMessage:
      'Your order was partially completed. Please contact support if you have questions.',
    description: 'Only part of the order could be completed.',
    colorToken: 'status.partial',
    icon: 'alert-circle',
    terminal: false,
    allowedAdminActions: ['view', 'refund', 'add_internal_note'],
  },
  cancelled: {
    id: 'cancelled',
    adminLabel: 'Cancelled',
    customerLabel: 'Cancelled',
    customerMessage: 'Your order has been cancelled.',
    description: 'Order will not be fulfilled.',
    colorToken: 'status.cancelled',
    icon: 'x-circle',
    terminal: true,
    allowedAdminActions: ['view'],
  },
  refunded: {
    id: 'refunded',
    adminLabel: 'Refunded',
    customerLabel: 'Refunded',
    customerMessage: 'Your order has been refunded.',
    description: 'Payment has been refunded.',
    colorToken: 'status.refunded',
    icon: 'undo',
    terminal: true,
    future: true,
    allowedAdminActions: ['view'],
  },
};

export function getOrderStatusMetadata(status: OrderStatus): OrderStatusMetadata {
  return ORDER_STATUS_METADATA[status];
}

export function getCustomerStatusMessage(status: OrderStatus): string {
  return ORDER_STATUS_METADATA[status].customerMessage;
}

export function getAdminStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_METADATA[status].adminLabel;
}

export function getAllowedTransitions(from: OrderStatus): readonly OrderStatus[] {
  return ORDER_STATUS_TRANSITIONS[from];
}

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[from].includes(to);
}

export function isTerminalStatus(status: OrderStatus): boolean {
  return ORDER_STATUS_METADATA[status].terminal;
}

export function getAllowedAdminActions(status: OrderStatus): readonly AdminOrderActionId[] {
  return ORDER_STATUS_METADATA[status].allowedAdminActions;
}

/** Map admin action → target status (architecture helper). */
export function statusForAdminAction(
  action: AdminOrderActionId,
): OrderStatus | undefined {
  switch (action) {
    case 'start_processing':
      return 'processing';
    case 'complete':
      return 'completed';
    case 'mark_partial':
      return 'partial';
    case 'cancel':
      return 'cancelled';
    case 'refund':
      return 'refunded';
    default:
      return undefined;
  }
}

/**
 * Explicit invalid transitions called out in Document 11.03.
 * Useful for docs/tests; `canTransition` remains the runtime source of truth.
 */
export const INVALID_ORDER_STATUS_TRANSITIONS: ReadonlyArray<
  readonly [OrderStatus, OrderStatus]
> = [
  ['completed', 'processing'],
  ['completed', 'pending'],
  ['cancelled', 'processing'],
  ['cancelled', 'completed'],
  ['refunded', 'processing'],
  ['refunded', 'completed'],
  ['pending', 'completed'],
];
