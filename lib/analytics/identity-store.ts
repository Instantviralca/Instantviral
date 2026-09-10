/**
 * Upsert first-party analytics visitors/sessions in PostgreSQL.
 */

import { eq } from 'drizzle-orm';

import { getAnalyticsSessionTimeoutMinutes } from '@/lib/analytics/analytics-runtime-config';
import type { AttributionSnapshot } from '@/lib/analytics/attribution';
import type { DeviceInfo } from '@/lib/analytics/device';
import { getDb, isDbReady } from '@/lib/db/client';
import { analyticsSessions, analyticsVisitors } from '@/lib/db/schema';

export async function upsertAnalyticsIdentity(input: {
  visitorId: string;
  sessionId: string;
  pagePath: string;
  country: string;
  attribution: AttributionSnapshot;
  device: DeviceInfo;
  at?: Date;
}): Promise<void> {
  if (!isDbReady()) return;
  if (!input.visitorId || !input.sessionId) return;

  const db = getDb();
  const now = input.at ?? new Date();
  const timeoutMs = getAnalyticsSessionTimeoutMinutes() * 60 * 1000;

  try {
    const [visitor] = await db
      .select()
      .from(analyticsVisitors)
      .where(eq(analyticsVisitors.id, input.visitorId))
      .limit(1);

    if (!visitor) {
      await db.insert(analyticsVisitors).values({
        id: input.visitorId,
        firstSeenAt: now,
        lastSeenAt: now,
        firstLandingPath: input.attribution.landingPath,
        firstReferrer: input.attribution.referrer,
        firstUtmSource: input.attribution.utmSource,
        firstUtmMedium: input.attribution.utmMedium,
        firstUtmCampaign: input.attribution.utmCampaign,
        firstChannel: input.attribution.channel,
      });
    } else {
      await db
        .update(analyticsVisitors)
        .set({ lastSeenAt: now })
        .where(eq(analyticsVisitors.id, input.visitorId));
    }

    const [session] = await db
      .select()
      .from(analyticsSessions)
      .where(eq(analyticsSessions.id, input.sessionId))
      .limit(1);

    if (!session) {
      await db.insert(analyticsSessions).values({
        id: input.sessionId,
        visitorId: input.visitorId,
        startedAt: now,
        lastActivityAt: now,
        landingPath: input.attribution.landingPath || input.pagePath,
        exitPath: input.pagePath,
        referrer: input.attribution.referrer,
        referrerHost: input.attribution.referrerHost,
        utmSource: input.attribution.utmSource,
        utmMedium: input.attribution.utmMedium,
        utmCampaign: input.attribution.utmCampaign,
        utmContent: input.attribution.utmContent,
        utmTerm: input.attribution.utmTerm,
        gclid: input.attribution.gclid,
        fbclid: input.attribution.fbclid,
        ttclid: input.attribution.ttclid,
        channel: input.attribution.channel,
        deviceCategory: input.device.deviceCategory,
        browser: input.device.browser,
        os: input.device.os,
        country: input.country || 'XX',
      });
      return;
    }

    // If the stored session is stale beyond timeout, still update activity —
    // client already minted a new session id when needed.
    const stale = now.getTime() - session.lastActivityAt.getTime() > timeoutMs;
    await db
      .update(analyticsSessions)
      .set({
        lastActivityAt: now,
        exitPath: input.pagePath,
        country: input.country || session.country || 'XX',
        ...(stale
          ? {}
          : {
              // Keep first-touch session attribution; only fill blanks.
              utmSource: session.utmSource ?? input.attribution.utmSource,
              utmMedium: session.utmMedium ?? input.attribution.utmMedium,
              utmCampaign: session.utmCampaign ?? input.attribution.utmCampaign,
              channel: session.channel ?? input.attribution.channel,
            }),
      })
      .where(eq(analyticsSessions.id, input.sessionId));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/relation|does not exist|analytics_sessions|analytics_visitors/i.test(message)) {
      // Migration 0006 not applied yet — events still persist.
      return;
    }
    console.error('[analytics] identity upsert failed', message);
  }
}
