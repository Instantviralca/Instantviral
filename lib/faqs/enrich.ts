/**
 * Configuration-driven FAQ answer enrichment — Document 14.04.
 * Payment methods are listed only from enabled providers in config/payments.ts.
 */

import { getEnabledPaymentProviders } from '@/config/payments';
import type { FaqRecord, PublicFaq } from '@/types/faq';

export const PAYMENT_METHODS_FAQ_ID = 'faq-hub-payment-methods';

export function enrichFaqAnswer(answer: string, faqId: string): string {
  if (faqId !== PAYMENT_METHODS_FAQ_ID) return answer;

  const enabled = getEnabledPaymentProviders();
  const methodsLine =
    enabled.length > 0
      ? ` Currently available: ${enabled.map((provider) => provider.displayName).join(', ')}.`
      : ' No payment methods are currently enabled.';

  return `${answer}${methodsLine}`;
}

export function enrichFaqRecord(faq: FaqRecord): FaqRecord {
  return {
    ...faq,
    answer: enrichFaqAnswer(faq.answer, faq.id),
  };
}

export function enrichPublicFaq(faq: PublicFaq): PublicFaq {
  return {
    ...faq,
    answer: enrichFaqAnswer(faq.answer, faq.id),
  };
}
