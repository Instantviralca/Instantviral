/**
 * Sanitize strings before JSON-LD embedding — Document 15.07.
 */

const SCRIPT_PATTERN = /<\/?script\b[^>]*>/gi;
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitizeJsonLdText(value: string): string {
  return value
    .replace(SCRIPT_PATTERN, '')
    .replace(CONTROL, '')
    .replace(/[<>]/g, '')
    .trim();
}

export function stripPrivateSeoFields<T extends Record<string, unknown>>(
  input: T,
): Omit<T, 'seoReviewedBy' | 'seoReviewedAt' | 'email' | 'internalNotes'> {
  const {
    seoReviewedBy: _a,
    seoReviewedAt: _b,
    email: _c,
    internalNotes: _d,
    ...rest
  } = input as T & {
    seoReviewedBy?: unknown;
    seoReviewedAt?: unknown;
    email?: unknown;
    internalNotes?: unknown;
  };
  void _a;
  void _b;
  void _c;
  void _d;
  return rest;
}
