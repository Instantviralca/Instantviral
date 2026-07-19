import type { OrderStatus } from '@/types/order-status';
import type { PaymentStatus } from '@/types/payment';
import type { PlatformId } from '@/types/platform';
import type { OrderInternalNote, OrderTimelineEvent } from '@/types/order';

/** Admin Order Management row — Document 12.03. */
export type AdminOrderRow = {
  id: string;
  customerEmail: string;
  platformId: PlatformId;
  serviceName: string;
  packageTitle: string;
  quantity: number;
  quantityLabel: string;
  totalDisplay: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  targetDisplay: string;
  createdAt: string;
  updatedAt: string;
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
