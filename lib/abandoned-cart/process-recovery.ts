/**
 * Hosting-independent abandoned cart recovery processor.
 *
 * Call `processDueAbandonedCartEmails()` from:
 * - Protected API `/api/jobs/abandoned-carts`
 * - Linux cron / `npm run abandoned-carts:process`
 * - PM2 / systemd worker
 *
 * All due-state lives in PostgreSQL — safe across restarts and providers.
 */

import {
  getAbandonedCartInactivityMinutes,
  getAbandonedCartRetentionDays,
  getRecoveryEmailSequence,
} from '@/config/abandoned-cart';
import { recordServerAnalyticsEvent } from '@/lib/analytics/server-track';
import {
  completeRecoveryEmail,
  deleteExpiredAbandonedCarts,
  isAbandonedCartDbAvailable,
  listAbandonedCartsDueForSequence,
  markInactiveCartsAbandoned,
  reserveRecoveryEmail,
  buildCartRecoveryToken,
} from '@/lib/abandoned-cart/repository';
import { sendRecoveryEmail } from '@/lib/abandoned-cart/emails';

export type ProcessAbandonedCartResult = {
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  markedAbandoned: number;
  emailsAttempted: number;
  emailsSent: number;
  emailsFailed: number;
  emailsSkippedDuplicate: number;
  cleanedUp: number;
};

/**
 * Mark inactive active checkouts as abandoned, then send due recovery emails.
 * Idempotent under concurrent workers thanks to unique (cart_id, sequence_number).
 */
export async function processDueAbandonedCartEmails(options?: {
  now?: Date;
  triggeredBy?: string;
  runCleanup?: boolean;
}): Promise<ProcessAbandonedCartResult> {
  if (!isAbandonedCartDbAvailable()) {
    return {
      ok: false,
      skipped: true,
      reason: 'DATABASE_URL is not configured.',
      markedAbandoned: 0,
      emailsAttempted: 0,
      emailsSent: 0,
      emailsFailed: 0,
      emailsSkippedDuplicate: 0,
      cleanedUp: 0,
    };
  }

  const now = options?.now ?? new Date();
  const triggeredBy = options?.triggeredBy ?? 'scheduler';
  const inactivityMinutes = getAbandonedCartInactivityMinutes();

  const markedAbandoned = await markInactiveCartsAbandoned(inactivityMinutes, now);
  if (markedAbandoned > 0) {
    await recordServerAnalyticsEvent({
      eventName: 'cart_abandoned',
      eventId: `cart_abandoned_batch_${now.toISOString().slice(0, 13)}`,
      pagePath: '/checkout',
      metadata: { count: markedAbandoned },
    });
  }

  let emailsAttempted = 0;
  let emailsSent = 0;
  let emailsFailed = 0;
  let emailsSkippedDuplicate = 0;

  const sequence = getRecoveryEmailSequence();

  for (const step of sequence) {
    const dueCarts = await listAbandonedCartsDueForSequence({
      sequenceNumber: step.step,
      delayMinutes: step.delayMinutes,
      now,
    });

    for (const cart of dueCarts) {
      emailsAttempted += 1;
      const scheduledAt = new Date(
        (cart.abandonedAt ?? now).getTime() + step.delayMinutes * 60 * 1000,
      );

      const reservation = await reserveRecoveryEmail({
        cartId: cart.id,
        sequenceNumber: step.step,
        scheduledAt,
        triggeredBy,
      });

      if (!reservation.reserved) {
        emailsSkippedDuplicate += 1;
        continue;
      }

      const log = reservation.log!;
      const rawToken = buildCartRecoveryToken(cart);
      const sendResult = await sendRecoveryEmail({
        cart,
        sequenceNumber: step.step,
        rawToken,
      });

      if (sendResult.ok) {
        await completeRecoveryEmail({
          logId: log.id,
          cartId: cart.id,
          sequenceNumber: step.step,
          status: 'sent',
          providerMessageId: sendResult.messageId ?? null,
        });
        emailsSent += 1;
        await recordServerAnalyticsEvent({
          eventName: 'recovery_email_sent',
          eventId: `recovery_email_sent_${cart.id}_${step.step}`,
          pagePath: '/checkout',
          metadata: {
            cartId: cart.id,
            sequenceNumber: step.step,
          },
        });
      } else if (sendResult.skipped) {
        await completeRecoveryEmail({
          logId: log.id,
          cartId: cart.id,
          sequenceNumber: step.step,
          status: 'skipped',
          error: sendResult.error ?? 'skipped',
        });
        emailsFailed += 1;
      } else {
        await completeRecoveryEmail({
          logId: log.id,
          cartId: cart.id,
          sequenceNumber: step.step,
          status: 'failed',
          error: sendResult.error ?? 'send failed',
        });
        emailsFailed += 1;
      }
    }
  }

  let cleanedUp = 0;
  if (options?.runCleanup !== false) {
    cleanedUp = await deleteExpiredAbandonedCarts(getAbandonedCartRetentionDays());
  }

  return {
    ok: true,
    markedAbandoned,
    emailsAttempted,
    emailsSent,
    emailsFailed,
    emailsSkippedDuplicate,
    cleanedUp,
  };
}

/** Alias used by cron / worker entrypoints. */
export const processAbandonedCartRecoveryJob = processDueAbandonedCartEmails;
