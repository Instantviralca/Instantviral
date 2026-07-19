/**
 * Search query sanitization — Document 15.05.
 */

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const HTML_CHARS = /[<>`]/g;
const MULTI_SPACE = /\s+/g;
const PUNCT_EDGE = /^[\s.,;:!?'"()\-_/\\]+|[\s.,;:!?'"()\-_/\\]+$/g;

export function sanitizeSearchQuery(raw: string | null | undefined): string {
  if (!raw) return '';
  return raw
    .normalize('NFKC')
    .replace(CONTROL_CHARS, '')
    .replace(HTML_CHARS, '')
    .replace(MULTI_SPACE, ' ')
    .trim()
    .slice(0, 120);
}

export function normalizeSearchToken(value: string): string {
  return sanitizeSearchQuery(value)
    .toLowerCase()
    .replace(PUNCT_EDGE, '')
    .replace(MULTI_SPACE, ' ')
    .trim();
}

export function tokenizeQuery(query: string): string[] {
  const normalized = normalizeSearchToken(query);
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
}
