/**
 * Conditional FAQ wording helpers — Document 14.04 quality rules.
 * Refund/refill answers must remain conditional (eligible / may / subject to).
 */

const CONDITIONAL_MARKERS = [
  'eligible',
  'may include',
  'may be',
  'subject to',
  'where supported',
  'when applicable',
  'can vary',
  'vary by',
];

export function hasConditionalRefundOrRefillWording(answer: string): boolean {
  const lower = answer.toLowerCase();
  return CONDITIONAL_MARKERS.some((marker) => lower.includes(marker));
}

export function answerMentionsPaymentProvider(
  answer: string,
  providerDisplayName: string,
): boolean {
  return answer.toLowerCase().includes(providerDisplayName.toLowerCase());
}
