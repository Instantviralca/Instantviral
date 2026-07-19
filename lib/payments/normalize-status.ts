import type { PaymentStatus } from '@/types/payment';

/** Normalize provider-specific statuses into the shared enum. */
export function normalizePaymentStatus(raw: string): PaymentStatus {
  const value = raw.toLowerCase();
  if (['paid', 'succeeded', 'completed', 'captured'].includes(value)) return 'paid';
  if (['processing', 'authorized', 'requires_action'].includes(value)) return 'processing';
  if (['failed', 'declined'].includes(value)) return 'failed';
  if (['cancelled', 'canceled', 'void'].includes(value)) return 'cancelled';
  if (['refunded', 'partially_refunded'].includes(value)) return 'refunded';
  return 'pending';
}
