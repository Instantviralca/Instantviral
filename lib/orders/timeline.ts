import type { OrderActor, OrderStatus, OrderTimelineEvent, OrderTimelineEventType } from '@/types/order-status';
import { getCustomerStatusMessage } from '@/lib/orders/status';

export type CreateStatusChangeEventInput = {
  orderId: string;
  previousStatus: OrderStatus;
  newStatus: OrderStatus;
  updatedBy: OrderActor;
  internalNote?: string;
  publicMessage?: string;
  meta?: OrderTimelineEvent['meta'];
};

export type CreateTimelineEventInput = {
  orderId?: string;
  type: OrderTimelineEventType;
  message: string;
  updatedBy: OrderActor;
  previousStatus?: OrderStatus;
  newStatus?: OrderStatus;
  publicMessage?: string;
  internalNote?: string;
  meta?: OrderTimelineEvent['meta'];
};

function eventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Create a generic immutable timeline entry. */
export function createTimelineEvent(input: CreateTimelineEventInput): OrderTimelineEvent {
  return {
    id: eventId(),
    orderId: input.orderId,
    type: input.type,
    previousStatus: input.previousStatus,
    newStatus: input.newStatus,
    status: input.newStatus,
    message: input.message,
    publicMessage: input.publicMessage,
    internalNote: input.internalNote,
    updatedBy: input.updatedBy,
    at: new Date().toISOString(),
    meta: input.meta,
  };
}

/** Create a status-change timeline entry with customer-safe public message. */
export function createStatusChangeEvent(
  input: CreateStatusChangeEventInput,
): OrderTimelineEvent {
  return createTimelineEvent({
    orderId: input.orderId,
    type: 'status_changed',
    message: `Status changed from ${input.previousStatus} to ${input.newStatus}`,
    previousStatus: input.previousStatus,
    newStatus: input.newStatus,
    updatedBy: input.updatedBy,
    internalNote: input.internalNote,
    publicMessage:
      input.publicMessage ?? getCustomerStatusMessage(input.newStatus),
    meta: input.meta,
  });
}

/** Strip internal fields before returning timeline to customers / tracking. */
export function toPublicTimelineEvent(
  event: OrderTimelineEvent,
): Omit<OrderTimelineEvent, 'internalNote' | 'updatedBy'> & {
  updatedBy: Pick<OrderActor, 'type'>;
} {
  return {
    id: event.id,
    orderId: event.orderId,
    type: event.type,
    previousStatus: event.previousStatus,
    newStatus: event.newStatus,
    status: event.newStatus ?? event.status,
    message: event.publicMessage ?? event.message,
    publicMessage: event.publicMessage,
    at: event.at,
    meta: event.meta,
    updatedBy: { type: event.updatedBy.type === 'admin' ? 'system' : event.updatedBy.type },
  };
}

export const SYSTEM_ACTOR: OrderActor = {
  id: 'system',
  type: 'system',
  displayName: 'System',
};
