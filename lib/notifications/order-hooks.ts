/**
 * Order notification hooks — customer + admin emails after verified events.
 * Triggers and idempotency keys are unchanged; bodies use branded order emails.
 */

import { getEmailFrom, isEmailConfigured } from '@/lib/config/env';
import {
  buildAdminOrderEmail,
  buildCustomerOrderEmail,
  buildTrackingUrl,
  customerEmailKindForTrigger,
} from '@/lib/notifications/order-email';
import { dispatchNotification } from '@/lib/notifications/service';
import { dispatchTransactionalEmail } from '@/lib/notifications/email';
import {
  formatOrderItemsHtml,
  formatOrderItemsSummary,
  formatOrderItemsText,
  resolveCartQuantity,
} from '@/lib/orders/line-items';
import { formatCustomerOrderRef } from '@/lib/orders/order-number';
import { formatMoney } from '@/lib/pricing/format';
import { getAdminNotificationEmail } from '@/lib/settings/site-settings';
import type { Order } from '@/types/order';
import type { NotificationTemplateVariableMap } from '@/types/notification';
import { ORDER_STATUS_METADATA } from '@/lib/orders/status';

function supportEmail(): string {
  return process.env.EMAIL_SUPPORT?.trim() || getEmailFrom() || '';
}

function companyName(): string {
  return process.env.EMAIL_COMPANY_NAME?.trim() || 'InstantViral';
}

function baseVariables(
  order: Order,
  emailContent?: { subject: string; html: string; text: string },
): NotificationTemplateVariableMap {
  const item = order.items[0];
  const meta = ORDER_STATUS_METADATA[order.status];
  const year = new Date().getFullYear();
  const cartQty = resolveCartQuantity(item);
  const customerRef = formatCustomerOrderRef(order);
  return {
    companyName: companyName(),
    customerEmail: order.guestEmail,
    customerName: order.guestEmail.split('@')[0] || 'there',
    orderId: customerRef,
    emailSubject: emailContent?.subject,
    emailHtml: emailContent?.html,
    emailText: emailContent?.text,
    serviceName: item?.serviceName ?? 'Service',
    packageName: item?.packageTitle ?? '',
    quantity: item?.quantityLabel ?? '',
    cartQuantity: String(cartQty),
    orderTotal: formatMoney(order.total.amount, order.total.currency),
    itemCount: String(order.items.reduce((sum, line) => sum + resolveCartQuantity(line), 0)),
    itemsSummary: formatOrderItemsSummary(order),
    orderItemsHtml: formatOrderItemsHtml(order),
    orderItemsText: formatOrderItemsText(order),
    statusLabel: meta?.customerLabel ?? order.status,
    statusMessage: meta?.customerMessage ?? '',
    trackingUrl: buildTrackingUrl(order),
    supportEmail: supportEmail(),
    footerText: `© ${year} ${companyName()}. All rights reserved.`,
  };
}

/** Fire when checkout creates the order (before / as payment starts). */
export async function notifyOrderPlaced(order: Order): Promise<void> {
  const customerEmail = buildCustomerOrderEmail(order, 'order_received');
  const vars = baseVariables(order, customerEmail);

  await dispatchNotification({
    trigger: 'order_created',
    recipient: order.guestEmail,
    orderId: order.id,
    variables: vars,
    idempotencyKey: `order_confirmation:${order.id}`,
  });

  const adminTo = await getAdminNotificationEmail();
  if (adminTo && isEmailConfigured()) {
    const adminEmail = buildAdminOrderEmail(order, 'admin_new_order');
    await dispatchTransactionalEmail({
      templateId: 'admin_new_order',
      to: adminTo,
      orderId: order.id,
      idempotencyKey: `admin_new_order:${order.id}`,
      variables: {
        ...vars,
        emailSubject: adminEmail.subject,
        emailHtml: adminEmail.html,
        emailText: adminEmail.text,
        subjectHint: `New Order ${formatCustomerOrderRef(order)}`,
      },
    });
  }
}

/** Fire when payment is verified paid (remote callback / webhook). */
export async function notifyOrderPaid(order: Order): Promise<void> {
  const customerEmail = buildCustomerOrderEmail(order, 'payment_confirmed');
  const vars = baseVariables(order, customerEmail);

  // Customer: payment confirmed (distinct from place-order confirmation).
  if (isEmailConfigured()) {
    await dispatchTransactionalEmail({
      templateId: 'payment_confirmed',
      to: order.guestEmail,
      orderId: order.id,
      idempotencyKey: `payment_confirmed:${order.id}`,
      variables: vars,
    });
  }

  const adminTo = await getAdminNotificationEmail();
  if (adminTo && isEmailConfigured()) {
    const adminEmail = buildAdminOrderEmail(order, 'admin_order_paid');
    await dispatchTransactionalEmail({
      templateId: 'admin_order_paid',
      to: adminTo,
      orderId: order.id,
      idempotencyKey: `admin_order_paid:${order.id}`,
      variables: {
        ...vars,
        emailSubject: adminEmail.subject,
        emailHtml: adminEmail.html,
        emailText: adminEmail.text,
        subjectHint: `Order Paid ${formatCustomerOrderRef(order)}`,
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
  const kind = customerEmailKindForTrigger(trigger);
  const customerEmail = buildCustomerOrderEmail(order, kind);
  await dispatchNotification({
    trigger,
    recipient: order.guestEmail,
    orderId: order.id,
    variables: baseVariables(order, customerEmail),
    idempotencyKey: `${trigger}:${order.id}:${order.status}`,
  });
}
