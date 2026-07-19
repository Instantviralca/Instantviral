/**
 * Sanitize metadata strings — Document 14.07 security.
 * Strips private-looking patterns and HTML.
 */

const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const ORDER_ID_PATTERN = /\b(?:order[_\s-]?id|ord)[:\s#-]?\s*[A-Z0-9-]{6,}\b/gi;
const SCRIPT_PATTERN = /<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi;
const TAG_PATTERN = /<\/?[^>]+>/g;

export function sanitizeMetadataText(input: string): string {
  return input
    .replace(SCRIPT_PATTERN, '')
    .replace(TAG_PATTERN, '')
    .replace(EMAIL_PATTERN, '[redacted]')
    .replace(ORDER_ID_PATTERN, '[redacted]')
    .replace(/\u0000/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const PRIVATE_PATTERNS = [
  EMAIL_PATTERN,
  /\b\d{10,}\b/, // long numeric IDs
  /@[a-z0-9._]{3,}/i, // usernames
];

export function containsPrivateMetadataData(input: string): boolean {
  return PRIVATE_PATTERNS.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(input);
  });
}
