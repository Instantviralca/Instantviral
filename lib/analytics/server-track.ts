/**
 * Server-side first-party analytics recording.
 * Used for trusted commerce/recovery events — never trusts client revenue.
 */

import { randomBytes } from 'node:crypto';

import { isFirstPartyAnalyticsEnabled } from '@/lib/analytics/analytics-runtime-config';
import { isAnalyticsEventName } from '@/lib/analytics/funnel-events';
import { getPersistence } from '@/lib/persistence';
import type { AnalyticsEventRecord } from '@/lib/persistence/types';

export type ServerAnalyticsEventInput = {
  eventName: string;
  /** Stable idempotency key — used as event id when provided. */
  eventId?: string;
  sessionId?: string | null;
  visitorId?: string | null;
  pagePath?: string;
  country?: string;
  channel?: string | null;
  deviceCategory?: string | null;
  referrerHost?: string | null;
  source?: 'server' | 'client';
  metadata?: Record<string, string | number | boolean | null>;
};

function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${randomBytes(4).toString('hex')}`;
}

/**
 * Record a trusted server-side analytics event.
 * Duplicate eventId inserts are ignored by the store when possible.
 */
export async function recordServerAnalyticsEvent(
  input: ServerAnalyticsEventInput,
): Promise<void> {
  if (!isFirstPartyAnalyticsEnabled()) return;
  if (!isAnalyticsEventName(input.eventName)) return;

  const record: AnalyticsEventRecord = {
    id: input.eventId?.trim() || makeId('sae'),
    eventName: input.eventName,
    sessionId: (input.sessionId?.trim() || `server_${input.eventName}`).slice(0, 80),
    pagePath: (input.pagePath?.trim() || '/').slice(0, 200),
    country: input.country?.trim().toUpperCase() || 'XX',
    metadata: input.metadata,
    createdAt: new Date().toISOString(),
    visitorId: input.visitorId?.trim() || null,
    deviceCategory: input.deviceCategory ?? null,
    channel: input.channel ?? null,
    referrerHost: input.referrerHost ?? null,
    source: input.source ?? 'server',
  };

  try {
    await getPersistence().insertAnalyticsEvents([record]);
  } catch (error) {
    console.error('[analytics] server event failed', {
      eventName: input.eventName,
      message: error instanceof Error ? error.message : 'unknown',
    });
  }
}
