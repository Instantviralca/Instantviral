/**
 * Order / cart line-item economics.
 *
 * Distinguishes:
 * - package quantity (`quantity` / `quantityLabel`) — e.g. 1,000 followers
 * - cart quantity (`cartQuantity`) — how many of that package were bought
 * - lineTotal = unitPrice × cartQuantity (minor units)
 */

import { formatMoney } from '@/lib/pricing/format';
import type { CartItem } from '@/types/cart';
import type { Order, OrderLineItem } from '@/types/order';
import type { CurrencyCode } from '@/types/pricing';
import type { OrderConfigurationValues } from '@/types/order-fields';

export type LineItemLike = {
  quantity?: number;
  quantityLabel?: string;
  unitPrice: number;
  cartQuantity?: number;
  lineTotal?: number;
  currency?: CurrencyCode;
  serviceName?: string;
  packageTitle?: string;
  platformId?: string;
  configuration?: OrderConfigurationValues;
};

/** Cart / buy count — legacy rows default to 1. */
export function resolveCartQuantity(item: LineItemLike | null | undefined): number {
  const raw = item?.cartQuantity;
  if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) {
    return Math.floor(raw);
  }
  return 1;
}

/** Line total in minor units — never trust client alone at checkout (recompute server-side). */
export function resolveLineTotal(item: LineItemLike | null | undefined): number {
  if (!item) return 0;
  const qty = resolveCartQuantity(item);
  if (typeof item.lineTotal === 'number' && Number.isFinite(item.lineTotal) && item.lineTotal >= 0) {
    return Math.floor(item.lineTotal);
  }
  return Math.floor(item.unitPrice) * qty;
}

export function computeLineTotal(unitPrice: number, cartQuantity: number): number {
  const qty = cartQuantity > 0 ? Math.floor(cartQuantity) : 1;
  return Math.floor(unitPrice) * qty;
}

export function normalizeCartItem(item: CartItem): CartItem {
  const cartQuantity = resolveCartQuantity(item);
  return {
    ...item,
    cartQuantity,
    lineTotal: computeLineTotal(item.unitPrice, cartQuantity),
  };
}

export function normalizeOrderLineItem(item: OrderLineItem): OrderLineItem {
  const cartQuantity = resolveCartQuantity(item);
  return {
    ...item,
    cartQuantity,
    lineTotal: computeLineTotal(item.unitPrice, cartQuantity),
  };
}

export function resolveTargetFromConfig(
  configuration: OrderConfigurationValues | undefined,
): string {
  if (!configuration) return '';
  const value =
    configuration.username ??
    configuration.targetUrl ??
    configuration.url ??
    configuration.profileUrl ??
    configuration.videoUrl ??
    configuration.channelUrl ??
    '';
  return typeof value === 'string' ? value.trim() : String(value ?? '');
}

export function formatOrderItemsSummary(order: Order): string {
  const items = order.items.map(normalizeOrderLineItem);
  if (items.length === 0) return '0 items';
  if (items.length === 1) {
    const item = items[0]!;
    const qty = resolveCartQuantity(item);
    return `${item.serviceName} ×${qty}`;
  }
  const first = items[0]!;
  const firstQty = resolveCartQuantity(first);
  const more = items.length - 1;
  return `${first.serviceName} ×${firstQty} + ${more} more`;
}

export function formatOrderItemsHtml(order: Order): string {
  const items = order.items.map(normalizeOrderLineItem);
  const currency = order.currency;
  const rows = items
    .map((item, index) => {
      const cartQty = resolveCartQuantity(item);
      const lineTotal = resolveLineTotal(item);
      const target = resolveTargetFromConfig(item.configuration);
      const targetHtml = target
        ? `<div style="margin-top:4px;color:#444;"><strong>Profile / URL:</strong> ${escapeHtml(target)}</div>`
        : '';
      return `<div style="margin:0 0 16px;padding-bottom:12px;border-bottom:1px solid #eee;">
  <div style="font-weight:700;">${index + 1}. ${escapeHtml(item.serviceName)}</div>
  <div>Package: ${escapeHtml(item.packageTitle)} (${escapeHtml(item.quantityLabel)})</div>
  <div>Qty: ${cartQty}</div>
  <div>Unit Price: ${formatMoney(item.unitPrice, currency)}</div>
  <div>Line Total: ${formatMoney(lineTotal, currency)}</div>
  ${targetHtml}
</div>`;
    })
    .join('');

  return `<div style="margin:16px 0;">
  <div style="font-weight:700;margin-bottom:8px;">Order items</div>
  ${rows || '<p>No items</p>'}
  <div><strong>Order Total:</strong> ${formatMoney(order.total.amount, currency)}</div>
</div>`;
}

export function formatOrderItemsText(order: Order): string {
  const items = order.items.map(normalizeOrderLineItem);
  const currency = order.currency;
  const lines = items.map((item, index) => {
    const cartQty = resolveCartQuantity(item);
    const lineTotal = resolveLineTotal(item);
    const target = resolveTargetFromConfig(item.configuration);
    return [
      `${index + 1}. ${item.serviceName}`,
      `   Package: ${item.packageTitle} (${item.quantityLabel})`,
      `   Qty: ${cartQty}`,
      `   Unit Price: ${formatMoney(item.unitPrice, currency)}`,
      `   Line Total: ${formatMoney(lineTotal, currency)}`,
      target ? `   Profile / URL: ${target}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  });

  return ['Order items', ...lines, `Order Total: ${formatMoney(order.total.amount, currency)}`].join(
    '\n',
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
