/**
 * Analytics payload sanitization — Document 14.09.
 */

import { isForbiddenAnalyticsKey } from '@/data/analytics/forbidden-fields';
import type {
  AnalyticsEvent,
  AnalyticsEventInput,
  AnalyticsEventMetadata,
  AnalyticsValidationIssue,
} from '@/types/analytics';

const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const URL_PATTERN = /https?:\/\/[^\s]+/i;

function scrubString(value: string): string | null {
  if (EMAIL_PATTERN.test(value)) return null;
  if (URL_PATTERN.test(value)) return null;
  return value;
}

function sanitizeMetadata(
  metadata: AnalyticsEventMetadata | undefined,
  issues: AnalyticsValidationIssue[],
): AnalyticsEventMetadata | undefined {
  if (!metadata) return undefined;

  const next: AnalyticsEventMetadata = {};

  for (const [key, value] of Object.entries(metadata)) {
    if (isForbiddenAnalyticsKey(key)) {
      issues.push({
        code: 'forbidden_field',
        field: key,
        detail: `Forbidden analytics field removed: ${key}`,
      });
      continue;
    }

    if (typeof value === 'string') {
      const scrubbed = scrubString(value);
      if (scrubbed === null) {
        issues.push({
          code: 'forbidden_field',
          field: key,
          detail: `Metadata value for ${key} looked like PII or a URL and was removed`,
        });
        continue;
      }
      next[key] = scrubbed;
      continue;
    }

    next[key] = value;
  }

  return Object.keys(next).length > 0 ? next : undefined;
}

/**
 * Strip forbidden keys from an input payload and scrub suspicious string values.
 */
export function sanitizeEventPayload(
  input: AnalyticsEventInput,
): { sanitized: AnalyticsEventInput; issues: AnalyticsValidationIssue[] } {
  const issues: AnalyticsValidationIssue[] = [];
  const sanitized: AnalyticsEventInput = { ...input };

  const maybeForbiddenTopLevel: Array<keyof AnalyticsEventInput> = [
    'label',
    'serviceSlug',
    'packageId',
  ];

  for (const key of Object.keys(input) as Array<keyof AnalyticsEventInput>) {
    if (isForbiddenAnalyticsKey(String(key))) {
      issues.push({
        code: 'forbidden_field',
        field: String(key),
        detail: `Forbidden top-level field blocked: ${String(key)}`,
      });
      delete sanitized[key];
    }
  }

  // Explicit PII bags sometimes passed via spread — scan unknown extras via metadata only.
  sanitized.metadata = sanitizeMetadata(input.metadata, issues);

  if (typeof sanitized.label === 'string') {
    const scrubbed = scrubString(sanitized.label);
    if (scrubbed === null) {
      issues.push({
        code: 'forbidden_field',
        field: 'label',
        detail: 'Label contained email or URL and was removed',
      });
      delete sanitized.label;
    } else {
      sanitized.label = scrubbed;
    }
  }

  void maybeForbiddenTopLevel;
  return { sanitized, issues };
}

/** Deep-scan a finalized event for forbidden keys (defense in depth). */
export function findForbiddenFieldsInEvent(
  event: AnalyticsEvent,
): AnalyticsValidationIssue[] {
  const issues: AnalyticsValidationIssue[] = [];
  const walk = (value: unknown, path: string) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }
    if (typeof value === 'object') {
      for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
        const nextPath = path ? `${path}.${key}` : key;
        if (isForbiddenAnalyticsKey(key)) {
          issues.push({
            code: 'forbidden_field',
            field: nextPath,
            detail: `Forbidden field present: ${nextPath}`,
          });
        }
        walk(nested, nextPath);
      }
    }
  };

  walk(event, '');
  return issues;
}
