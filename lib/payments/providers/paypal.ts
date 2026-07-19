import type {
  CancelPaymentInput,
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  VerifyPaymentInput,
  VerifyPaymentResult,
} from '@/types/payment';

/**
 * PayPal provider stub — Document 10.06.
 * No API calls; returns structured placeholders for future integration.
 */
export const paypalProvider: PaymentProvider = {
  id: 'paypal',
  displayName: 'PayPal',
  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    return {
      paymentId: `paypal_pending_${input.orderId}`,
      status: 'pending',
      provider: 'paypal',
      redirectUrl: undefined,
    };
  },
  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    return {
      paymentId: input.paymentId,
      status: 'pending',
      providerReference: input.paymentId,
    };
  },
  async cancelPayment(input: CancelPaymentInput) {
    return { status: 'cancelled' as const, paymentId: input.paymentId };
  },
};
