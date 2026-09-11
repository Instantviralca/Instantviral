import type { PaymentProviderConfig } from '@/types/payment';

/**
 * Public payment method configuration — Document 10.06.
 * Remote Payment (Woo-style collector URL) is the live checkout path.
 * Secret keys never appear here.
 */
export const paymentProviders: PaymentProviderConfig[] = [
  {
    id: 'mollie-remote',
    enabled: true,
    displayName: 'Pay securely with Mollie',
  },
  {
    id: 'remote-payment',
    enabled: false,
    displayName: 'Remote Payment (legacy)',
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
