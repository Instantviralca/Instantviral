import type { Order, OrderInternalNote } from '@/types/order';
import type { OrderActor, OrderStatus, OrderTimelineEvent } from '@/types/order-status';
import { canTransition } from '@/lib/orders/status';
import { createStatusChangeEvent, SYSTEM_ACTOR } from '@/lib/orders/timeline';
import {
  manualOrderWorkflow,
  type ManualOrderWorkflow,
} from '@/lib/orders/manual-workflow';

/**
 * Order Manager — Documents 11.01–11.03.
 * v1 delegates fulfillment to ManualOrderWorkflow (no SMM APIs).
 */

export type OrderManager = {
  /** Prefer manualOrderWorkflow.createOrderFromPayment for v1. */
  createFromPayment: ManualOrderWorkflow['createOrderFromPayment'];
  /**
   * Validate + apply a status transition.
   * Does not persist yet — architecture contract only.
   */
  assertTransition: (from: OrderStatus, to: OrderStatus) => void;
  transition: (
    orderId: string,
    next: OrderStatus,
    actor: OrderActor,
    internalNote?: string,
  ) => Promise<Order>;
  appendTimeline: (orderId: string, event: OrderTimelineEvent) => Promise<Order>;
  addInternalNote: (
    orderId: string,
    body: string,
    actor: OrderActor,
  ) => Promise<OrderInternalNote>;
  /**
   * Future automation only. Throws in v1 — manual fulfillment is required.
   */
  assignProvider: (orderId: string, providerId: string) => Promise<Order>;
};

export const orderManager: OrderManager = {
  createFromPayment: (...args) => manualOrderWorkflow.createOrderFromPayment(...args),

  assertTransition(from, to) {
    if (!canTransition(from, to)) {
      throw new Error(`[OMS] Invalid status transition: ${from} → ${to}`);
    }
  },

  async transition() {
    throw new Error('[OMS] transition persistence is not implemented yet.');
  },

  async appendTimeline() {
    throw new Error('[OMS] appendTimeline persistence is not implemented yet.');
  },

  async addInternalNote() {
    throw new Error('[OMS] addInternalNote persistence is not implemented yet.');
  },

  async assignProvider() {
    throw new Error(
      '[OMS] Provider assignment is disabled in v1. Use manual fulfillment (Document 11.02).',
    );
  },
};

/** Helper for building a local (non-persisted) transition event. */
export function buildTransitionEvent(
  orderId: string,
  from: OrderStatus,
  to: OrderStatus,
  actor: OrderActor = SYSTEM_ACTOR,
  internalNote?: string,
): OrderTimelineEvent {
  orderManager.assertTransition(from, to);
  return createStatusChangeEvent({
    orderId,
    previousStatus: from,
    newStatus: to,
    updatedBy: actor,
    internalNote,
  });
}
