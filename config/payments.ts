import type { PaymentProviderConfig } from '@/types/payment';

/**
 * Public payment method configuration — Document 10.06.
 * Remote Payment (Woo-style collector URL) is the live checkout path.
 * Secret keys never appear here.
 */
export const paymentProviders: PaymentProviderConfig[] = [
  {
    id: 'remote-payment',
    enabled: true,
    displayName: 'Card Payment',
  },
  {
    id: 'stripe',
    enabled: false,
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
