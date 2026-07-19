/**
 * Public Order Tracking — Document 11.05
 * Customer-safe view models only. Never expose admin/internal data.
 */

import type { OrderStatus } from '@/types/order-status';

export type TrackOrderLookupInput = {
  orderId: string;
  email: string;
};

export type TrackOrderLookupErrorCode =
  | 'not_found'
  | 'invalid_input'
  | 'rate_limited'
  | 'server_error';

/**
 * Generic error — do not reveal whether Order ID exists.
 */
export type TrackOrderLookupError = {
  code: TrackOrderLookupErrorCode;
  message: string;
};

export type PublicOrderTimelineStep = {
  id: string;
  label: string;
  status: 'complete' | 'current' | 'upcoming';
  at?: string;
  message?: string;
};

export type PublicTrackedOrder = {
  orderId: string;
  status: OrderStatus;
  statusLabel: string;
  statusMessage: string;
  serviceName: string;
  packageTitle: string;
  quantityLabel: string;
  /** Masked username / URL when appropriate. */
  targetDisplay: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  timeline: PublicOrderTimelineStep[];
};

export type TrackOrderLookupResult =
  | { ok: true; order: PublicTrackedOrder }
  | { ok: false; error: TrackOrderLookupError };
