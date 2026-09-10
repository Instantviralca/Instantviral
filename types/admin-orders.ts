import type { OrderStatus } from '@/types/order-status';
import type { PaymentStatus } from '@/types/payment';
import type { PlatformId } from '@/types/platform';
import type { OrderInternalNote, OrderTimelineEvent } from '@/types/order';
import type { OrderConfigurationValues } from '@/types/order-fields';

/** One fulfilment line for admin detail (supports multi-product orders). */
export type AdminOrderLineItem = {
  id: string;
  platformId: PlatformId;
  serviceName: string;
  packageTitle: string;
  /** Package size label (e.g. 1,000 Followers). */
  packageQuantityLabel: string;
  /** Cart buy count. */
  cartQuantity: number;
  unitPriceDisplay: string;
  lineTotalDisplay: string;
  unitPrice: number;
  lineTotal: number;
  currency: string;
  targetDisplay: string;
  fulfillmentFields: AdminOrderFulfillmentField[];
  deliveryTime?: string;
};

/** Admin Order Management row — Document 12.03. */
export type AdminOrderRow = {
  id: string;
  customerEmail: string;
  platformId: PlatformId;
  serviceName: string;
  packageTitle: string;
  quantity: number;
  quantityLabel: string;
  /** Compact multi-item summary for the table (e.g. "Followers ×2 + 1 more"). */
  itemsSummary: string;
  itemCount: number;
  totalDisplay: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  /** Unmasked delivery target for fulfillment (username or URL). */
  targetDisplay: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminOrderFulfillmentField = {
  key: string;
  label: string;
  value: string;
};

export type AdminOrderFilters = {
  status?: OrderStatus | 'all';
  platform?: PlatformId | 'all';
  serviceSlug?: string | 'all';
  paymentStatus?: PaymentStatus | 'all';
  dateFrom?: string;
  dateTo?: string;
};

export type AdminOrderSort =
  | 'newest'
  | 'oldest'
  | 'status'
  | 'total'
  | 'updated';

export type AdminOrderDetails = AdminOrderRow & {
  timeline: OrderTimelineEvent[];
  internalNotes: OrderInternalNote[];
  paymentMethod?: string;
  customerNotes?: string;
  /** Full client-submitted order configuration for delivery (first item — legacy). */
  configuration: OrderConfigurationValues;
  /** Labeled fulfillment fields for admin UI (first item — legacy). */
  fulfillmentFields: AdminOrderFulfillmentField[];
  /** All order lines with per-item qty / prices / targets. */
  lineItems: AdminOrderLineItem[];
  subtotalDisplay: string;
  discountDisplay: string;
};

export type AdminOrdersListState = {
  query: string;
  filters: AdminOrderFilters;
  sort: AdminOrderSort;
  page: number;
  pageSize: number;
  selectedOrderId: string | null;
  selectedIds: string[];
};
