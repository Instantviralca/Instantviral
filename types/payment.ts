import type { CurrencyCode, MoneyAmount } from '@/types/pricing';
import type { PlaceOrderPayload } from '@/types/checkout';

/**
 * Payment Gateway System — Document 10.06
 * Provider-independent contracts. No secrets. No live API calls yet.
 */

export type PaymentProviderId =
  | 'remote-payment'
  | 'stripe'
  | 'paypal'
  | 'jazzcash'
  | 'easypaisa'
  | 'paddle'
  | 'lemon-squeezy'
  | 'crypto'
  | 'bank-transfer';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type PaymentErrorCode =
  | 'declined'
  | 'network'
  | 'cancelled_by_user'
  | 'invalid_session'
  | 'provider_error'
  | 'unknown';

export type NormalizedPaymentError = {
  code: PaymentErrorCode;
  message: string;
  providerCode?: string;
  retryable: boolean;
};

export type CreatePaymentInput = {
  orderId: string;
  amount: MoneyAmount;
  customerEmail: string;
  description?: string;
  metadata?: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
  payload?: PlaceOrderPayload;
};

export type CreatePaymentResult = {
  paymentId: string;
  status: PaymentStatus;
  redirectUrl?: string;
  clientSecret?: string;
  provider: PaymentProviderId;
};

export type VerifyPaymentInput = {
  paymentId: string;
  provider: PaymentProviderId;
  raw?: unknown;
};

export type VerifyPaymentResult = {
  paymentId: string;
  status: PaymentStatus;
  amount?: MoneyAmount;
  providerReference?: string;
  /** Bound order id from Stripe client_reference_id / metadata (when present). */
  orderId?: string;
};

export type CancelPaymentInput = {
  paymentId: string;
  provider: PaymentProviderId;
  reason?: string;
};

export type RefundPaymentInput = {
  paymentId: string;
  provider: PaymentProviderId;
  amount?: MoneyAmount;
  reason?: string;
};

export type WebhookEvent = {
  provider: PaymentProviderId;
  eventType: string;
  paymentId?: string;
  status?: PaymentStatus;
  raw: unknown;
  receivedAt: string;
};

/**
 * Common contract every payment provider must implement.
 */
export type PaymentProvider = {
  id: PaymentProviderId;
  displayName: string;
  createPayment: (input: CreatePaymentInput) => Promise<CreatePaymentResult>;
  verifyPayment: (input: VerifyPaymentInput) => Promise<VerifyPaymentResult>;
  cancelPayment: (input: CancelPaymentInput) => Promise<{ status: PaymentStatus }>;
  refundPayment?: (input: RefundPaymentInput) => Promise<{ status: PaymentStatus }>;
  webhookHandler?: (rawBody: string, headers: Record<string, string>) => Promise<WebhookEvent>;
};

export type PaymentProviderConfig = {
  id: PaymentProviderId;
  enabled: boolean;
  /** Public / publishable keys only — never secret keys. */
  publicKeyEnv?: string;
  displayName: string;
};
