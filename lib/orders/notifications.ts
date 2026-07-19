import { getCustomerStatusMessage, getAdminStatusLabel } from '@/lib/orders/status';
import { notifyOrderEvent } from '@/lib/notifications';
import { routes } from '@/config/routes';
import { site } from '@/config/site';
import type { Order } from '@/types/order';
import type { OrderStatus } from '@/types/order-status';
import type { NotificationTrigger } from '@/types/notification';

/**
 * Bridge OMS → Notification System — Documents 11.02 / 11.04.
 */

export type OrderNotificationEvent =
  | 'order_created'
  | 'processing_started'
  | 'order_completed'
  | 'order_partial'
  | 'order_cancelled'
  | 'order_refunded';

export type OrderNotificationPayload = {
  event: OrderNotificationEvent;
  orderId: string;
  guestEmail: string;
  status: OrderStatus;
  publicMessage: string;
  occurredAt: string;
};

export type OrderNotificationHooks = {
  notify: (payload: OrderNotificationPayload) => Promise<void>;
};

const EVENT_TO_TRIGGER: Record<OrderNotificationEvent, NotificationTrigger> = {
  order_created: 'order_created',
  processing_started: 'processing_started',
  order_completed: 'order_completed',
  order_partial: 'order_partial',
  order_cancelled: 'order_cancelled',
  order_refunded: 'order_refunded',
};

export function notificationEventForStatus(
  status: OrderStatus,
  isNewOrder = false,
): OrderNotificationEvent | null {
  if (isNewOrder && status === 'pending') return 'order_created';
  switch (status) {
    case 'processing':
      return 'processing_started';
    case 'completed':
      return 'order_completed';
    case 'partial':
      return 'order_partial';
    case 'cancelled':
      return 'order_cancelled';
    case 'refunded':
      return 'order_refunded';
    default:
      return null;
  }
}

export function buildNotificationPayload(
  order: Pick<Order, 'id' | 'guestEmail' | 'status' | 'updatedAt'>,
  event: OrderNotificationEvent,
  publicMessage: string,
): OrderNotificationPayload {
  return {
    event,
    orderId: order.id,
    guestEmail: order.guestEmail,
    status: order.status,
    publicMessage,
    occurredAt: order.updatedAt,
  };
}

export async function dispatchOrderNotification(
  order: Pick<Order, 'id' | 'guestEmail' | 'status' | 'updatedAt' | 'items'>,
  event: OrderNotificationEvent,
  customerName?: string,
): Promise<void> {
  const item = order.items[0];
  await notifyOrderEvent({
    trigger: EVENT_TO_TRIGGER[event],
    orderId: order.id,
    recipient: order.guestEmail,
    idempotencyKey: `${order.id}:${event}`,
    variables: {
      companyName: site.name,
      customerName: customerName || 'there',
      customerEmail: order.guestEmail,
      orderId: order.id,
      serviceName: item?.serviceName ?? 'Service',
      packageName: item?.packageTitle,
      quantity: item?.quantityLabel,
      statusLabel: getAdminStatusLabel(order.status),
      statusMessage: getCustomerStatusMessage(order.status),
      trackingUrl: `${site.domain}${routes.trackOrder}`,
      supportEmail: site.supportEmail,
      footerText: `© ${site.name}`,
    },
  });
}

export const orderNotificationHooks: OrderNotificationHooks = {
  async notify(payload) {
    await notifyOrderEvent({
      trigger: EVENT_TO_TRIGGER[payload.event],
      orderId: payload.orderId,
      recipient: payload.guestEmail,
      idempotencyKey: `${payload.orderId}:${payload.event}`,
      variables: {
        companyName: site.name,
        customerName: 'there',
        customerEmail: payload.guestEmail,
        orderId: payload.orderId,
        serviceName: 'Service',
        statusLabel: getAdminStatusLabel(payload.status),
        statusMessage: payload.publicMessage,
        trackingUrl: `${site.domain}${routes.trackOrder}`,
        supportEmail: site.supportEmail,
        footerText: `© ${site.name}`,
      },
    });
  },
};
