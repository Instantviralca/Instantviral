/**
 * Abandoned cart domain types.
 */

import type { AbandonedCartStatus } from '@/config/abandoned-cart';
import type { CartItem, AppliedCoupon } from '@/types/cart';
import type { CurrencyCode } from '@/types/pricing';
import type { CustomerInformation } from '@/types/checkout';

export type AbandonedCartCheckoutSnapshot = {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  customer: CustomerInformation;
  currency: CurrencyCode;
};

export type AbandonedCartRecord = {
  id: string;
  checkoutSessionId: string;
  email: string;
  customerName: string | null;
  status: AbandonedCartStatus;
  currency: string;
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  platformId: string | null;
  serviceId: string | null;
  serviceSlug: string | null;
  serviceName: string | null;
  packageId: string | null;
  packageTitle: string | null;
  quantity: number | null;
  quantityLabel: string | null;
  publicDestination: string | null;
  checkoutData: AbandonedCartCheckoutSnapshot;
  recoveryTokenHash: string;
  tokenExpiresAt: Date;
  recoveryEmailsStopped: boolean;
  lastRecoverySequence: number;
  recoveryClickedAt: Date | null;
  recoveryClickSequence: number | null;
  abandonedAt: Date | null;
  recoveredAt: Date | null;
  recoveredOrderId: string | null;
  linkedOrderId: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
};

export type RecoveryEmailLogRecord = {
  id: string;
  cartId: string;
  sequenceNumber: number;
  scheduledAt: Date;
  processingStartedAt: Date | null;
  sentAt: Date | null;
  status: 'pending' | 'processing' | 'sent' | 'failed' | 'skipped';
  providerMessageId: string | null;
  error: string | null;
  triggeredBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AbandonedCartCaptureInput = {
  checkoutSessionId: string;
  email: string;
  customerName?: string | null;
  currency: CurrencyCode;
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  snapshot: AbandonedCartCheckoutSnapshot;
};

export type AbandonedCartMetrics = {
  activeCheckouts: number;
  abandonedCarts: number;
  recoveredCarts: number;
  lostCarts: number;
  abandonedCartValue: number;
  recoveredRevenue: number;
  recoveryRate: number;
  currency: string;
};

export type AbandonedCartListFilters = {
  status?: AbandonedCartStatus | 'all';
  query?: string;
  page?: number;
  pageSize?: number;
};

export type AbandonedCartListRow = {
  id: string;
  email: string;
  customerName: string | null;
  serviceName: string | null;
  packageTitle: string | null;
  totalAmount: number;
  currency: string;
  status: AbandonedCartStatus;
  createdAt: string;
  abandonedAt: string | null;
  lastRecoverySequence: number;
  recoveredOrderId: string | null;
  lastActivityAt: string;
};
