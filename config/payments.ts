import type { PaymentProviderConfig } from '@/types/payment';

/**
 * Public payment method configuration — Document 10.06.
 * Only Stripe is enabled for v1. Secret keys never appear here.
 */
export const paymentProviders: PaymentProviderConfig[] = [
  {
    id: 'stripe',
    enabled: true,
    publicKeyEnv: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    displayName: 'Stripe',
  },
  {
    id: 'paypal',
    enabled: false,
    publicKeyEnv: 'NEXT_PUBLIC_PAYPAL_CLIENT_ID',
    displayName: 'PayPal',
  },
  {
    id: 'crypto',
    enabled: false,
    displayName: 'Cryptocurrency',
  },
  {
    id: 'jazzcash',
    enabled: false,
    displayName: 'JazzCash',
  },
  {
    id: 'easypaisa',
    enabled: false,
    displayName: 'EasyPaisa',
  },
];

export function getEnabledPaymentProviders(): PaymentProviderConfig[] {
  return paymentProviders.filter((p) => p.enabled);
}
