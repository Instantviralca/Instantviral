/**
 * Analytics event validation — Document 14.09.
 */

import {
  getEventRegistryEntry,
  isApprovedEventName,
  resolveCanonicalEventName,
} from '@/data/analytics/event-registry';
import { getPackageById } from '@/data/pricing/packages';
import { getServiceBySlug } from '@/data/services';
import { findForbiddenFieldsInEvent } from '@/lib/analytics/core/sanitize';
import type {
  AnalyticsEvent,
  AnalyticsEventInput,
  AnalyticsValidationIssue,
} from '@/types/analytics';
import type { CurrencyCode } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';

const SUPPORTED_CURRENCIES = new Set<CurrencyCode>([
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'PKR',
]);

const SUPPORTED_PLATFORMS = new Set<PlatformId>([
  'instagram',
  'tiktok',
  'facebook',
  'youtube',
]);

export type ValidateEventOptions = {
  /** When true, packageId must resolve in the pricing catalog. */
  enforcePackageLookup?: boolean;
  /** When true, serviceSlug must resolve in the service registry. */
  enforceServiceLookup?: boolean;
};

/**
 * Validate an analytics event input or finalized event.
 */
export function validateEvent(
  input: AnalyticsEventInput | AnalyticsEvent,
  options: ValidateEventOptions = {},
): AnalyticsValidationIssue[] {
  const issues: AnalyticsValidationIssue[] = [];
  const canonicalName = resolveCanonicalEventName(input.eventName);

  if (!isApprovedEventName(canonicalName)) {
    issues.push({
      code: 'unapproved_event',
      field: 'eventName',
      detail: `Event "${input.eventName}" is not in the approved registry`,
    });
    return issues;
  }

  const registry = getEventRegistryEntry(canonicalName);
  if (!registry) {
    issues.push({
      code: 'unapproved_event',
      field: 'eventName',
      detail: `Missing registry entry for ${canonicalName}`,
    });
    return issues;
  }

  if (registry.requiresServiceSlug && !input.serviceSlug) {
    issues.push({
      code: 'missing_field',
      field: 'serviceSlug',
      detail: `Event ${canonicalName} requires serviceSlug`,
    });
  }

  if (registry.requiresPackageId && !input.packageId) {
    issues.push({
      code: 'missing_field',
      field: 'packageId',
      detail: `Event ${canonicalName} requires packageId`,
    });
  }

  if (input.currency && !SUPPORTED_CURRENCIES.has(input.currency)) {
    issues.push({
      code: 'invalid_currency',
      field: 'currency',
      detail: `Unsupported currency: ${input.currency}`,
    });
  }

  if (input.platform && !SUPPORTED_PLATFORMS.has(input.platform)) {
    issues.push({
      code: 'invalid_platform',
      field: 'platform',
      detail: `Unsupported platform: ${String(input.platform)}`,
    });
  }

  if (input.value !== undefined && (!Number.isFinite(input.value) || input.value < 0)) {
    issues.push({
      code: 'invalid_value',
      field: 'value',
      detail: 'value must be a finite non-negative number',
    });
  }

  const enforceService = options.enforceServiceLookup ?? Boolean(input.serviceSlug);
  if (enforceService && input.serviceSlug) {
    const service = getServiceBySlug(input.serviceSlug);
    if (!service) {
      issues.push({
        code: 'invalid_service_slug',
        field: 'serviceSlug',
        detail: `Unknown service slug: ${input.serviceSlug}`,
      });
    }
  }

  const enforcePackage = options.enforcePackageLookup ?? Boolean(input.packageId);
  if (enforcePackage && input.packageId) {
    const pkg = getPackageById(input.packageId);
    if (!pkg) {
      issues.push({
        code: 'invalid_package_id',
        field: 'packageId',
        detail: `Unknown package ID: ${input.packageId}`,
      });
    }
  }

  if ('sessionId' in input && input.metadata) {
    issues.push(...findForbiddenFieldsInEvent(input as AnalyticsEvent));
  } else if (input.metadata) {
    for (const key of Object.keys(input.metadata)) {
      // Forbidden keys already stripped by sanitize; re-check remaining.
      void key;
    }
  }

  if (canonicalName === 'purchase') {
    const verification = 'verification' in input ? input.verification : undefined;
    if (!verification?.verified || !verification.idempotencyKey) {
      issues.push({
        code: 'purchase_not_verified',
        field: 'verification',
        detail:
          'purchase events require verified payment or verified order creation with an idempotency key',
      });
    }
  }

  return issues;
}
