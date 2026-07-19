/**
 * Order notification hooks — customer + admin emails after verified events.
 */

import { getEmailFrom, getSiteUrl, isEmailConfigured } from '@/lib/config/env';
import { dispatchNotification } from '@/lib/notifications/service';
import { dispatchTransactionalEmail } from '@/lib/notifications/email';
import type { Order } from '@/types/order';
import { ORDER_STATUS_METADATA } from '@/lib/orders/status';

function supportEmail(): string {
  // Never invent a sender/domain — use configured addresses only.
  return process.env.EMAIL_SUPPORT?.trim() || getEmailFrom() || '';
}

function companyName(): string {
  return process.env.EMAIL_COMPANY_NAME?.trim() || 'InstantViral';
}

function trackingUrl(orderId: string, email: string): string {
  const base = getSiteUrl();
  return `${base}/track-order?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`;
}

function baseVariables(order: Order) {
  const item = order.items[0];
  const meta = ORDER_STATUS_METADATA[order.status];
  return {
    companyName: companyName(),
    customerEmail: order.guestEmail,
    customerName: order.guestEmail.split('@')[0],
    orderId: order.id,
    serviceName: item?.serviceName ?? 'Service',
    packageName: item?.packageTitle,
    quantity: item?.quantityLabel,
    statusLabel: meta?.customerLabel ?? order.status,
    statusMessage: meta?.customerMessage ?? '',
    trackingUrl: trackingUrl(order.id, order.guestEmail),
    supportEmail: supportEmail(),
  };
}

export async function notifyOrderPaid(order: Order): Promise<void> {
  const vars = baseVariables(order);

  await dispatchNotification({
    trigger: 'order_created',
    recipient: order.guestEmail,
    orderId: order.id,
    variables: vars,
    idempotencyKey: `order_confirmation:${order.id}`,
  });

  const adminTo = process.env.EMAIL_ADMIN_TO?.trim() || getEmailFrom();
  if (adminTo && isEmailConfigured()) {
    await dispatchTransactionalEmail({
      templateId: 'admin_new_order',
      to: adminTo,
      orderId: order.id,
      idempotencyKey: `admin_new_order:${order.id}`,
      variables: {
        ...vars,
        subjectHint: `New paid order ${order.id}`,
      },
    });
  }
}

export async function notifyOrderStatusChange(
  order: Order,
  trigger:
    | 'processing_started'
    | 'order_completed'
    | 'order_partial'
    | 'order_cancelled'
    | 'order_refunded',
): Promise<void> {
  await dispatchNotification({
    trigger,
    recipient: order.guestEmail,
    orderId: order.id,
    variables: baseVariables(order),
    idempotencyKey: `${trigger}:${order.id}:${order.status}`,
  });
}
