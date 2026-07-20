import { getEnabledPaymentProviders } from '@/config/payments';
import {
  paypalProvider,
  remotePaymentProvider,
  stripeProvider,
} from '@/lib/payments/providers';
import type {
  CancelPaymentInput,
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  PaymentProviderId,
  VerifyPaymentInput,
  VerifyPaymentResult,
} from '@/types/payment';

const registry: Partial<Record<PaymentProviderId, PaymentProvider>> = {
  'remote-payment': remotePaymentProvider,
  stripe: stripeProvider,
  paypal: paypalProvider,
};

/**
 * Payment Gateway Manager — Document 10.06.
 * Checkout talks only to this manager, never to provider SDKs directly.
 */
export class PaymentGatewayManager {
  listAvailable(): PaymentProvider[] {
    return getEnabledPaymentProviders()
      .map((config) => registry[config.id])
      .filter((provider): provider is PaymentProvider => Boolean(provider));
  }

  getProvider(id: PaymentProviderId): PaymentProvider | undefined {
    const config = getEnabledPaymentProviders().find((p) => p.id === id);
    if (!config) return undefined;
    return registry[id];
  }

  async createPayment(
    providerId: PaymentProviderId,
    input: CreatePaymentInput,
  ): Promise<CreatePaymentResult> {
    const provider = this.getProvider(providerId);
    if (!provider) {
      throw new Error(`Payment provider "${providerId}" is not available.`);
    }
    return provider.createPayment(input);
  }

  async verifyPayment(
    providerId: PaymentProviderId,
    input: VerifyPaymentInput,
  ): Promise<VerifyPaymentResult> {
    const provider = this.getProvider(providerId);
    if (!provider) {
      throw new Error(`Payment provider "${providerId}" is not available.`);
    }
    return provider.verifyPayment(input);
  }

  async cancelPayment(providerId: PaymentProviderId, input: CancelPaymentInput) {
    const provider = this.getProvider(providerId);
    if (!provider) {
      throw new Error(`Payment provider "${providerId}" is not available.`);
    }
    return provider.cancelPayment(input);
  }
}

export const paymentGatewayManager = new PaymentGatewayManager();

export { normalizePaymentStatus } from '@/lib/payments/normalize-status';
