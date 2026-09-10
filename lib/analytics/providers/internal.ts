/**
 * First-party funnel analytics adapter — posts allowlisted events to /api/analytics/collect.
 */

import { analyticsConfig } from '@/config/analytics';
import { captureBrowserAttribution } from '@/lib/analytics/attribution';
import { isFunnelEventName } from '@/lib/analytics/funnel-events';
import {
  getAnalyticsSessionId,
  getAnalyticsVisitorId,
  touchAnalyticsSession,
} from '@/lib/analytics/core/session';
import type {
  AnalyticsEvent,
  AnalyticsProviderAdapter,
} from '@/types/analytics';

type QueuedEvent = {
  eventName: string;
  sessionId: string;
  visitorId: string;
  pagePath: string;
  eventId: string;
  timestamp: string;
  referrer?: string | null;
  landingPath?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  ttclid?: string | null;
  channel?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
};

const queue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let pagehideBound = false;
let attributionSeeded = false;
let cachedAttribution: ReturnType<typeof captureBrowserAttribution> | null = null;

function getAttribution(pagePath: string) {
  if (!attributionSeeded || !cachedAttribution) {
    cachedAttribution = captureBrowserAttribution(pagePath);
    attributionSeeded = true;
  }
  return cachedAttribution;
}

function enqueue(event: AnalyticsEvent): void {
  if (!isFunnelEventName(event.eventName)) return;
  if (!event.sessionId || !event.pagePath) return;

  touchAnalyticsSession();
  const visitorId = getAnalyticsVisitorId();
  const sessionId = event.sessionId || getAnalyticsSessionId();
  const attribution = getAttribution(event.pagePath);

  const metadata: Record<string, string | number | boolean | null> = {
    pageType: event.pageType,
  };
  if (event.serviceSlug) metadata.serviceSlug = event.serviceSlug;
  if (event.packageId) metadata.packageId = event.packageId;
  if (typeof event.quantity === 'number') metadata.quantity = event.quantity;
  if (event.platform) metadata.platform = event.platform;

  queue.push({
    eventName: event.eventName,
    sessionId,
    visitorId,
    pagePath: event.pagePath,
    eventId: event.eventId,
    timestamp: event.timestamp,
    referrer: attribution.referrer,
    landingPath: attribution.landingPath,
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
    gclid: attribution.gclid,
    fbclid: attribution.fbclid,
    ttclid: attribution.ttclid,
    channel: attribution.channel,
    metadata,
  });

  scheduleFlush();
}

function scheduleFlush(): void {
  if (typeof window === 'undefined') return;
  bindPagehide();
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushQueue();
  }, 1500);
}

function bindPagehide(): void {
  if (pagehideBound || typeof window === 'undefined') return;
  pagehideBound = true;
  window.addEventListener('pagehide', () => {
    void flushQueue(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void flushQueue(true);
  });
}

async function flushQueue(useBeacon = false): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!queue.length) return;

  const batch = queue.splice(0, 25);
  const payload = JSON.stringify({ events: batch });

  try {
    if (useBeacon && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      const ok = navigator.sendBeacon('/api/analytics/collect', blob);
      if (!ok) queue.unshift(...batch);
      return;
    }

    await fetch('/api/analytics/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  } catch {
    queue.unshift(...batch);
  }
}

export function createInternalAdapter(): AnalyticsProviderAdapter | null {
  if (!analyticsConfig.enabled) return null;

  return {
    id: 'internal',
    initialize: () => {
      bindPagehide();
      getAnalyticsVisitorId();
      getAnalyticsSessionId();
    },
    trackPageView: (event: AnalyticsEvent) => {
      enqueue(event);
    },
    trackEvent: (event: AnalyticsEvent) => {
      enqueue(event);
    },
    trackConversion: (event: AnalyticsEvent) => {
      enqueue(event);
    },
    setConsent: () => undefined,
    reset: () => {
      queue.length = 0;
      attributionSeeded = false;
      cachedAttribution = null;
      if (flushTimer) {
        clearTimeout(flushTimer);
        flushTimer = null;
      }
    },
  };
}
