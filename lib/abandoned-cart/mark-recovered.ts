/**
 * Mark abandoned carts recovered after successful payment.
 * Idempotent — safe for Stripe/Mollie webhook retries.
 */

import {
  isAbandonedCartDbAvailable,
  markCartRecovered,
} from '@/lib/abandoned-cart/repository';
import type { AbandonedCartRecord } from '@/lib/abandoned-cart/types';

export async function markAbandonedCartRecoveredFromOrder(input: {
  orderId: string;
  email?: string;
  checkoutSessionId?: string;
}): Promise<AbandonedCartRecord | null> {
  if (!isAbandonedCartDbAvailable()) return null;

  try {
    return await markCartRecovered({
      orderId: input.orderId,
      email: input.email,
      checkoutSessionId: input.checkoutSessionId,
    });
  } catch (error) {
    console.error('[abandoned-cart] mark recovered failed', {
      orderId: input.orderId,
      message: error instanceof Error ? error.message : 'unknown',
    });
    return null;
  }
}
