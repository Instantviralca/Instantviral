/**
 * Branded InstantViral order email content (customer + admin).
 * Does not send mail — used by order-hooks / templates.
 */

import { site } from '@/config/site';
import { getEmailFrom, getSiteUrl } from '@/lib/config/env';
import {
  escapeHtml,
  formatEmailDate,
  renderCtaButton,
  renderSafeLink,
  safeHttpUrl,
  wrapTransactionalEmail,
  EMAIL_BRAND,
} from '@/lib/notifications/transactional-layout';
import {
  normalizeOrderLineItem,
  resolveCartQuantity,
  resolveLineTotal,
  resolveTargetFromConfig,
} from '@/lib/orders/line-items';
import { formatCustomerOrderRef } from '@/lib/orders/order-number';
import { formatMoney } from '@/lib/pricing/format';
import { ORDER_STATUS_METADATA } from '@/lib/orders/status';
import type { Order, OrderLineItem } from '@/types/order';

export type CustomerOrderEmailKind =
  | 'order_received'
  | 'payment_confirmed'
  | 'processing'
  | 'completed'
  | 'partial'
  | 'cancelled'
  | 'refunded';

export type AdminOrderEmailKind = 'admin_new_order' | 'admin_order_paid';

function companyName(): string {
  return process.env.EMAIL_COMPANY_NAME?.trim() || site.name || 'InstantViral';
}

function supportEmail(): string {
  return process.env.EMAIL_SUPPORT?.trim() || getEmailFrom() || site.supportEmail;
}

/** Human label: "Order #1000" or "Order IV-…" for legacy. */
export function formatOrderLabel(order: Pick<Order, 'id' | 'orderNumber'>): string {
  const ref = formatCustomerOrderRef(order);
  return ref.startsWith('Order ') ? ref : `Order ${ref}`;
}

/** Tracking token without leading #. */
export function trackingOrderToken(order: Pick<Order, 'id' | 'orderNumber'>): string {
  const ref = formatCustomerOrderRef(order);
  return ref.startsWith('#') ? ref.slice(1) : ref;
}

export function buildTrackingUrl(order: Pick<Order, 'id' | 'orderNumber' | 'guestEmail'>): string {
  const base = getSiteUrl().replace(/\/$/, '');
  const token = trackingOrderToken(order);
  return `${base}/track-order?orderId=${encodeURIComponent(token)}&email=${encodeURIComponent(order.guestEmail)}`;
}

function customerDisplayName(order: Order): string {
  const local = order.guestEmail.split('@')[0]?.trim();
  return local || 'there';
}

function paymentStatusLabel(order: Order): string {
  const status = order.payment?.status ?? 'pending';
  switch (status) {
    case 'paid':
      return 'Paid';
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
    case 'failed':
      return 'Failed';
    case 'cancelled':
      return 'Cancelled';
    case 'refunded':
      return 'Refunded';
    default:
      return status;
  }
}

function orderStatusLabel(order: Order): string {
  return ORDER_STATUS_METADATA[order.status]?.customerLabel ?? order.status;
}

function resolveEmailTarget(item: OrderLineItem): { display: string; href: string | null } {
  const config = item.configuration ?? {};
  const urlCandidate = [
    config.targetUrl,
    config.url,
    config.profileUrl,
    config.videoUrl,
    config.channelUrl,
  ].find((v) => typeof v === 'string' && v.trim());
  if (typeof urlCandidate === 'string' && urlCandidate.trim()) {
    const display = urlCandidate.trim();
    return { display, href: safeHttpUrl(display) };
  }
  const username = typeof config.username === 'string' ? config.username.trim() : '';
  if (username) return { display: username, href: null };
  const fallback = resolveTargetFromConfig(config);
  return { display: fallback, href: safeHttpUrl(fallback) };
}

function renderTargetCell(target: { display: string; href: string | null }): {
  html: string;
  text: string;
} {
  if (!target.display) return { html: '—', text: '—' };
  if (target.href) {
    return {
      html: renderSafeLink(target.display, target.href),
      text: target.display,
    };
  }
  return { html: escapeHtml(target.display), text: target.display };
}

function renderItemsCardHtml(order: Order, opts: { admin?: boolean } = {}): string {
  const items = order.items.map(normalizeOrderLineItem);
  const currency = order.currency;
  const rows = items
    .map((item, index) => {
      const cartQty = resolveCartQuantity(item);
      const lineTotal = resolveLineTotal(item);
      const target = resolveEmailTarget(item);
      const targetCell = renderTargetCell(target);
      const targetBlock = target.display
        ? `<tr>
            <td style="padding:6px 0;font-size:13px;color:${EMAIL_BRAND.muted};width:120px;vertical-align:top;">${opts.admin ? 'Target' : 'Profile / URL'}</td>
            <td style="padding:6px 0;font-size:13px;color:${EMAIL_BRAND.text};word-break:break-all;">${targetCell.html}</td>
          </tr>`
        : '';
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;${index < items.length - 1 ? `border-bottom:1px solid ${EMAIL_BRAND.border};padding-bottom:14px;` : ''}">
  <tr>
    <td style="font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:14px;font-weight:700;color:${EMAIL_BRAND.text};margin:0 0 8px;">
        ${items.length > 1 ? `${index + 1}. ` : ''}${escapeHtml(item.serviceName)}
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};width:120px;">Package</td>
          <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(item.packageTitle)} (${escapeHtml(item.quantityLabel)})</td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Quantity</td>
          <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${cartQty}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Line total</td>
          <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(formatMoney(lineTotal, currency))}</td>
        </tr>
        ${targetBlock}
      </table>
    </td>
  </tr>
</table>`;
    })
    .join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;background:${EMAIL_BRAND.soft};border:1px solid ${EMAIL_BRAND.border};border-radius:10px;">
  <tr>
    <td style="padding:16px 16px 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${EMAIL_BRAND.muted};">
      Order summary
    </td>
  </tr>
  <tr>
    <td style="padding:0 16px 16px;font-family:Arial,Helvetica,sans-serif;">
      ${rows || `<p style="margin:0;font-size:13px;color:${EMAIL_BRAND.muted};">No items</p>`}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;border-top:1px solid ${EMAIL_BRAND.border};">
        <tr>
          <td style="padding:12px 0 0;font-size:14px;font-weight:700;color:${EMAIL_BRAND.text};">Total</td>
          <td align="right" style="padding:12px 0 0;font-size:14px;font-weight:700;color:${EMAIL_BRAND.text};">${escapeHtml(formatMoney(order.total.amount, currency))}</td>
        </tr>
        <tr>
          <td style="padding:4px 0 0;font-size:12px;color:${EMAIL_BRAND.muted};">Currency</td>
          <td align="right" style="padding:4px 0 0;font-size:12px;color:${EMAIL_BRAND.muted};">${escapeHtml(currency)}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function renderItemsText(order: Order): string {
  const items = order.items.map(normalizeOrderLineItem);
  const currency = order.currency;
  const lines = items.map((item, index) => {
    const cartQty = resolveCartQuantity(item);
    const lineTotal = resolveLineTotal(item);
    const target = resolveEmailTarget(item);
    return [
      `${items.length > 1 ? `${index + 1}. ` : ''}${item.serviceName}`,
      `Package: ${item.packageTitle} (${item.quantityLabel})`,
      `Quantity: ${cartQty}`,
      `Line total: ${formatMoney(lineTotal, currency)}`,
      target.display ? `Profile / URL: ${target.display}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  });
  return [
    'Order summary',
    ...lines,
    `Total: ${formatMoney(order.total.amount, currency)} (${currency})`,
  ].join('\n');
}

function metaBlockHtml(order: Order): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 4px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};width:140px;">Payment status</td>
    <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(paymentStatusLabel(order))}</td>
  </tr>
  <tr>
    <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Order status</td>
    <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(orderStatusLabel(order))}</td>
  </tr>
  <tr>
    <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Order date</td>
    <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(formatEmailDate(order.createdAt))}</td>
  </tr>
</table>`;
}

const CUSTOMER_COPY: Record<
  CustomerOrderEmailKind,
  { title: string; intro: string; subjectSuffix: string }
> = {
  order_received: {
    title: 'Order received',
    intro:
      'We received your order and are waiting for payment confirmation. You will get another email once payment is confirmed.',
    subjectSuffix: 'Received',
  },
  payment_confirmed: {
    title: 'Payment confirmed',
    intro:
      'Thanks — your payment was confirmed and your order is in the fulfilment queue.',
    subjectSuffix: 'Confirmed',
  },
  processing: {
    title: 'Order processing',
    intro: 'Your order is now being processed.',
    subjectSuffix: 'Processing',
  },
  completed: {
    title: 'Order completed',
    intro: 'Your order has been completed successfully.',
    subjectSuffix: 'Completed',
  },
  partial: {
    title: 'Partial completion',
    intro:
      'Your order was partially completed. Contact support if you have questions.',
    subjectSuffix: 'Partially Completed',
  },
  cancelled: {
    title: 'Order cancelled',
    intro: 'Your order has been cancelled.',
    subjectSuffix: 'Cancelled',
  },
  refunded: {
    title: 'Refund processed',
    intro: 'A refund for your order has been processed.',
    subjectSuffix: 'Refunded',
  },
};

export function buildCustomerOrderEmail(
  order: Order,
  kind: CustomerOrderEmailKind,
): { subject: string; html: string; text: string } {
  const label = formatOrderLabel(order);
  const copy = CUSTOMER_COPY[kind];
  const brand = companyName();
  const name = customerDisplayName(order);
  const trackUrl = buildTrackingUrl(order);
  const showTrack = kind !== 'cancelled';

  const subject = `${label} ${copy.subjectSuffix} | ${brand}`;

  const bodyHtml = `
    <h1 style="margin:0 0 8px;font-size:22px;line-height:1.25;color:${EMAIL_BRAND.text};font-weight:700;">
      ${escapeHtml(copy.title)}
    </h1>
    <p style="margin:0 0 4px;font-size:20px;font-weight:700;color:${EMAIL_BRAND.primary};">
      ${escapeHtml(label)}
    </p>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">
      Hi ${escapeHtml(name)},
    </p>
    <p style="margin:10px 0 0;font-size:15px;line-height:1.55;color:${EMAIL_BRAND.text};">
      ${escapeHtml(copy.intro)}
    </p>
    ${metaBlockHtml(order)}
    ${renderItemsCardHtml(order)}
    ${showTrack ? renderCtaButton('Track order', trackUrl) : ''}
    <p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:${EMAIL_BRAND.muted};">
      Need help? <a href="mailto:${escapeHtml(supportEmail())}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">${escapeHtml(supportEmail())}</a>
    </p>
  `;

  const html = wrapTransactionalEmail({
    title: subject,
    bodyHtml,
    supportEmail: supportEmail(),
    companyName: brand,
  });

  const text = [
    copy.title,
    label,
    '',
    `Hi ${name},`,
    copy.intro,
    '',
    `Payment status: ${paymentStatusLabel(order)}`,
    `Order status: ${orderStatusLabel(order)}`,
    `Order date: ${formatEmailDate(order.createdAt)}`,
    '',
    renderItemsText(order),
    showTrack ? `\nTrack order: ${trackUrl}` : '',
    '',
    `Support: ${supportEmail()}`,
    brand,
    getSiteUrl(),
  ]
    .filter((line) => line !== '')
    .join('\n');

  return { subject, html, text };
}

export function buildAdminOrderEmail(
  order: Order,
  kind: AdminOrderEmailKind,
): { subject: string; html: string; text: string } {
  const label = formatOrderLabel(order);
  const brand = companyName();
  const headline = kind === 'admin_new_order' ? 'NEW ORDER' : 'ORDER PAID';
  const subject =
    kind === 'admin_new_order'
      ? `New Order ${formatCustomerOrderRef(order)} | ${brand}`
      : `Order Paid ${formatCustomerOrderRef(order)} | ${brand}`;

  const name = customerDisplayName(order);
  const items = order.items.map(normalizeOrderLineItem);

  const targetsHtml = items
    .map((item: OrderLineItem) => {
      const target = resolveEmailTarget(item);
      if (!target.display) return '';
      const cell = renderTargetCell(target);
      return `<tr>
        <td style="padding:6px 0;font-size:13px;color:${EMAIL_BRAND.muted};vertical-align:top;">${escapeHtml(item.serviceName)}</td>
        <td style="padding:6px 0;font-size:13px;color:${EMAIL_BRAND.text};word-break:break-all;">${cell.html}</td>
      </tr>`;
    })
    .join('');

  const bodyHtml = `
    <div style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:${EMAIL_BRAND.primary};">
      ${escapeHtml(headline)}
    </div>
    <h1 style="margin:0 0 18px;font-size:24px;line-height:1.2;color:${EMAIL_BRAND.text};">
      ${escapeHtml(label)}
    </h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td colspan="2" style="padding:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.muted};">Customer</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};width:120px;">Name</td>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Email</td>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};"><a href="mailto:${escapeHtml(order.guestEmail)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;">${escapeHtml(order.guestEmail)}</a></td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td colspan="2" style="padding:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.muted};">Order</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};width:120px;">Order #</td>
        <td style="padding:4px 0;font-size:13px;font-weight:700;color:${EMAIL_BRAND.text};">${escapeHtml(label)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Total</td>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(formatMoney(order.total.amount, order.currency))} (${escapeHtml(order.currency)})</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Order status</td>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(orderStatusLabel(order))}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Payment status</td>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(paymentStatusLabel(order))}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.muted};">Created</td>
        <td style="padding:4px 0;font-size:13px;color:${EMAIL_BRAND.text};">${escapeHtml(formatEmailDate(order.createdAt))}</td>
      </tr>
    </table>

    ${
      targetsHtml
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td colspan="2" style="padding:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.muted};">Target</td>
      </tr>
      ${targetsHtml}
    </table>`
        : ''
    }

    ${renderItemsCardHtml(order, { admin: true })}

    <p style="margin:20px 0 0;font-size:13px;color:${EMAIL_BRAND.muted};">
      Open Admin → Orders to review and fulfil.
    </p>

    <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid ${EMAIL_BRAND.border};font-size:11px;line-height:1.5;color:${EMAIL_BRAND.muted};">
      Internal Reference<br />
      <span style="font-family:Consolas,Menlo,monospace;font-size:11px;color:#888;">${escapeHtml(order.id)}</span>
    </p>
  `;

  const html = wrapTransactionalEmail({
    title: subject,
    bodyHtml,
    supportEmail: supportEmail(),
    companyName: brand,
  });

  const targetLines = items
    .map((item) => {
      const target = resolveEmailTarget(item);
      return target.display ? `${item.serviceName}: ${target.display}` : null;
    })
    .filter(Boolean);

  const text = [
    headline,
    label,
    '',
    'CUSTOMER',
    `Name: ${name}`,
    `Email: ${order.guestEmail}`,
    '',
    'ORDER',
    label,
    `Total: ${formatMoney(order.total.amount, order.currency)} (${order.currency})`,
    `Order status: ${orderStatusLabel(order)}`,
    `Payment status: ${paymentStatusLabel(order)}`,
    `Created: ${formatEmailDate(order.createdAt)}`,
    '',
    targetLines.length ? ['TARGET', ...targetLines, ''].join('\n') : '',
    renderItemsText(order),
    '',
    'Open Admin → Orders to review and fulfil.',
    '',
    `Internal Reference: ${order.id}`,
  ]
    .filter((line) => line !== '')
    .join('\n');

  return { subject, html, text };
}

/** Map notification triggers to customer email kinds (preserves existing semantics). */
export function customerEmailKindForTrigger(
  trigger:
    | 'order_created'
    | 'processing_started'
    | 'order_completed'
    | 'order_partial'
    | 'order_cancelled'
    | 'order_refunded',
): CustomerOrderEmailKind {
  switch (trigger) {
    case 'order_created':
      return 'order_received';
    case 'processing_started':
      return 'processing';
    case 'order_completed':
      return 'completed';
    case 'order_partial':
      return 'partial';
    case 'order_cancelled':
      return 'cancelled';
    case 'order_refunded':
      return 'refunded';
  }
}
