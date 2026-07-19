'use client';

import {
  CheckoutOrderSummary,
} from '@/components/commerce/checkout/order-summary';
import type { ComponentProps } from 'react';

export type CheckoutSummaryProps = ComponentProps<typeof CheckoutOrderSummary>;

/**
 * Phase 18 VDS — CheckoutSummary.
 * Sticky order summary alias for checklist naming.
 */
export function CheckoutSummary(props: CheckoutSummaryProps) {
  return <CheckoutOrderSummary {...props} />;
}
