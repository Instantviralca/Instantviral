/**
 * Anonymous first-party visitor + session IDs.
 * Visitor persists in localStorage; session rotates after inactivity timeout.
 */

import { getAnalyticsSessionTimeoutMinutes } from '@/lib/analytics/analytics-runtime-config';

const VISITOR_KEY = 'instantviral.analytics.visitor.v1';
const SESSION_KEY = 'instantviral.analytics.session.v2';
const SESSION_META_KEY = 'instantviral.analytics.session.meta.v2';

function createOpaqueId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

let memoryVisitorId: string | null = null;
let memorySessionId: string | null = null;

type SessionMeta = {
  id: string;
  lastActivityAt: number;
};

function readSessionMeta(): SessionMeta | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_META_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionMeta;
    if (!parsed?.id || typeof parsed.lastActivityAt !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSessionMeta(meta: SessionMeta): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SESSION_META_KEY, JSON.stringify(meta));
    window.sessionStorage.setItem(SESSION_KEY, meta.id);
  } catch {
    // ignore
  }
}

/** Durable anonymous visitor ID (localStorage). */
export function getAnalyticsVisitorId(): string {
  if (memoryVisitorId) return memoryVisitorId;
  if (typeof window === 'undefined') {
    memoryVisitorId = createOpaqueId('vis');
    return memoryVisitorId;
  }
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) {
      memoryVisitorId = existing;
      return existing;
    }
    const next = createOpaqueId('vis');
    window.localStorage.setItem(VISITOR_KEY, next);
    memoryVisitorId = next;
    return next;
  } catch {
    memoryVisitorId = createOpaqueId('vis');
    return memoryVisitorId;
  }
}

/** Session ID with inactivity timeout (default 30 minutes). */
export function getAnalyticsSessionId(): string {
  if (memorySessionId) {
    touchAnalyticsSession();
    return memorySessionId;
  }

  if (typeof window === 'undefined') {
    memorySessionId = createOpaqueId('sess');
    return memorySessionId;
  }

  const timeoutMs = getAnalyticsSessionTimeoutMinutes() * 60 * 1000;
  const now = Date.now();
  const meta = readSessionMeta();
  if (meta && now - meta.lastActivityAt <= timeoutMs) {
    memorySessionId = meta.id;
    writeSessionMeta({ id: meta.id, lastActivityAt: now });
    return meta.id;
  }

  const next = createOpaqueId('sess');
  memorySessionId = next;
  writeSessionMeta({ id: next, lastActivityAt: now });
  return next;
}

export function touchAnalyticsSession(): void {
  if (!memorySessionId) return;
  writeSessionMeta({ id: memorySessionId, lastActivityAt: Date.now() });
}

/** Test helper — clear cached IDs. */
export function resetAnalyticsSessionIdForTests(): void {
  memoryVisitorId = null;
  memorySessionId = null;
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(SESSION_META_KEY);
      window.localStorage.removeItem(VISITOR_KEY);
      // Legacy key from v1
      window.sessionStorage.removeItem('instantviral.analytics.session.v1');
    } catch {
      // ignore
    }
  }
}
