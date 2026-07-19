/**
 * Forbidden analytics payload fields — Document 14.09.
 */

/** Exact keys that must never appear in analytics payloads. */
export const FORBIDDEN_ANALYTICS_KEYS = [
  'email',
  'customerEmail',
  'userEmail',
  'fullName',
  'firstName',
  'lastName',
  'name',
  'phone',
  'phoneNumber',
  'username',
  'socialUsername',
  'profileUrl',
  'postUrl',
  'videoUrl',
  'channelUrl',
  'destinationUrl',
  'targetUrl',
  'orderUrl',
  'customComments',
  'customText',
  'orderConfiguration',
  'orderConfigurationText',
  'cardNumber',
  'cardCvc',
  'cvv',
  'paymentToken',
  'authToken',
  'accessToken',
  'password',
  'adminNotes',
  'internalNotes',
  'orderId',
  'orderNumber',
  'transactionId',
  'paymentIntentId',
] as const;

export type ForbiddenAnalyticsKey = (typeof FORBIDDEN_ANALYTICS_KEYS)[number];

const FORBIDDEN_SET = new Set<string>(
  FORBIDDEN_ANALYTICS_KEYS.map((key) => key.toLowerCase()),
);

/** Key patterns that suggest PII even when not exact matches. */
export const FORBIDDEN_ANALYTICS_KEY_PATTERNS = [
  /email/i,
  /phone/i,
  /password/i,
  /username/i,
  /token/i,
  /card/i,
  /cvv/i,
  /ssn/i,
  /order[_-]?id/i,
  /profile[_-]?url/i,
  /post[_-]?url/i,
  /video[_-]?url/i,
  /channel[_-]?url/i,
] as const;

export function isForbiddenAnalyticsKey(key: string): boolean {
  if (FORBIDDEN_SET.has(key.toLowerCase())) return true;
  return FORBIDDEN_ANALYTICS_KEY_PATTERNS.some((pattern) => pattern.test(key));
}
