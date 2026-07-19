/**
 * Analytics data barrel — Document 14.09.
 */

export {
  ANALYTICS_EVENT_REGISTRY,
  LEGACY_EVENT_ALIASES,
  getEventRegistryEntry,
  isApprovedEventName,
  listApprovedEventNames,
  resolveCanonicalEventName,
} from '@/data/analytics/event-registry';

export {
  FORBIDDEN_ANALYTICS_KEYS,
  FORBIDDEN_ANALYTICS_KEY_PATTERNS,
  isForbiddenAnalyticsKey,
} from '@/data/analytics/forbidden-fields';
