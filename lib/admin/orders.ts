import { formatMoney } from '@/lib/pricing/format';
import { getAllServices } from '@/data/services';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { listOrders, getOrderById } from '@/lib/orders/store';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import { maskTarget } from '@/lib/tracking/lookup';
import type { AdminOrderDetails, AdminOrderRow } from '@/types/admin-orders';
import type { Order } from '@/types/order';
import type { PlatformId } from '@/types/platform';
import type { CurrencyCode } from '@/types/pricing';

/**
 * Admin orders data layer — Document 12.03.
 * Fulfilment queue includes paid orders only.
 */

function toRow(order: Order): AdminOrderRow {
  const item = order.items[0];
  const target =
    item?.configuration.username ??
    item?.configuration.targetUrl ??
    item?.configuration.url ??
    '';
  return {
    id: order.id,
    customerEmail: order.guestEmail,
    platformId: (item?.platformId ?? 'instagram') as PlatformId,
    serviceName: item?.serviceName ?? 'Service',
    packageTitle: item?.packageTitle ?? 'Package',
    quantity: item?.quantity ?? 0,
    quantityLabel: item?.quantityLabel ?? String(item?.quantity ?? 0),
    totalDisplay: formatMoney(
      order.total.amount,
      order.total.currency as CurrencyCode,
      'en-CA',
    ),
    paymentStatus: order.payment?.status ?? 'pending',
    orderStatus: order.status,
    targetDisplay: maskTarget(String(target)),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

export async function getAdminOrderRows(options?: {
  paidOnly?: boolean;
}): Promise<AdminOrderRow[]> {
  const orders = await listOrders();
  const filtered = options?.paidOnly
    ? orders.filter(isEligibleForFulfilmentQueue)
    : orders;
  return filtered.map(toRow);
}

export async function getAdminOrderById(orderId: string): Promise<AdminOrderDetails | null> {
  const order = await getOrderById(orderId);
  if (!order) return null;
  return {
    ...toRow(order),
    timeline: order.timeline,
    internalNotes: order.internalNotes,
    paymentMethod: order.payment?.provider,
    customerNotes: order.customerNotes,
  };
}

/** Service options for order filters (from registry). */
export function getAdminOrderServiceOptions() {
  return getAllServices().map((s) => ({
    slug: s.slug,
    name: s.name,
    platformId: s.platform,
    packageCount: getActivePackagesByServiceSlug(s.slug).length,
  }));
}
