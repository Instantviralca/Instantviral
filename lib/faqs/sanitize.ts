/**
 * Sanitize FAQ text for safe public rendering — Document 14.04.
 */

const SCRIPT_PATTERN = /<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi;
const TAG_PATTERN = /<\/?[^>]+>/g;
const EVENT_HANDLER_PATTERN = /\bon\w+\s*=\s*(['"]).*?\1/gi;
const JAVASCRIPT_URL_PATTERN = /javascript\s*:/gi;

export function sanitizeFaqText(input: string): string {
  return input
    .replace(SCRIPT_PATTERN, '')
    .replace(EVENT_HANDLER_PATTERN, '')
    .replace(JAVASCRIPT_URL_PATTERN, '')
    .replace(TAG_PATTERN, '')
    .replace(/\u0000/g, '')
    .trim();
}
