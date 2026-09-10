/**
 * Resolve a recovery token and prepare checkout restore payload.
 */

import { parseRecoveryLinkToken } from '@/lib/abandoned-cart/tokens';
import { recordServerAnalyticsEvent } from '@/lib/analytics/server-track';
import {
  findCartById,
  isAbandonedCartDbAvailable,
  markRecoveryClicked,
} from '@/lib/abandoned-cart/repository';
import type { AbandonedCartCheckoutSnapshot, AbandonedCartRecord } from '@/lib/abandoned-cart/types';

export type RecoveryResolveResult =
  | {
      ok: true;
      cart: AbandonedCartRecord;
      snapshot: AbandonedCartCheckoutSnapshot;
    }
  | {
      ok: false;
      error: 'unavailable' | 'invalid' | 'expired' | 'recovered' | 'lost';
      message: string;
    };

export async function resolveRecoveryToken(input: {
  token: string;
  sequenceHint?: number | null;
  recordClick?: boolean;
}): Promise<RecoveryResolveResult> {
  if (!isAbandonedCartDbAvailable()) {
    return {
      ok: false,
      error: 'unavailable',
      message: 'Recovery is temporarily unavailable.',
    };
  }

  const token = input.token?.trim();
  if (!token || token.length < 20) {
    return { ok: false, error: 'invalid', message: 'Invalid recovery link.' };
  }

  const parsed = parseRecoveryLinkToken(token);
  if (!parsed) {
    return { ok: false, error: 'invalid', message: 'Invalid or unknown recovery link.' };
  }

  if (parsed.expiresAtMs < Date.now()) {
    return { ok: false, error: 'expired', message: 'This recovery link has expired.' };
  }

  const cart = await findCartById(parsed.cartId);
  if (!cart) {
    return { ok: false, error: 'invalid', message: 'Invalid or unknown recovery link.' };
  }

  // Also respect DB expiry (admin may shorten lifetime).
  if (cart.tokenExpiresAt.getTime() < Date.now()) {
    return { ok: false, error: 'expired', message: 'This recovery link has expired.' };
  }

  if (cart.status === 'recovered') {
    return {
      ok: false,
      error: 'recovered',
      message: 'This order was already completed.',
    };
  }

  if (cart.status === 'lost') {
    return {
      ok: false,
      error: 'lost',
      message: 'This checkout is no longer available.',
    };
  }

  if (input.recordClick !== false) {
    await markRecoveryClicked({
      cartId: cart.id,
      sequenceHint: input.sequenceHint ?? null,
    });
    await recordServerAnalyticsEvent({
      eventName: 'recovery_email_clicked',
      eventId: `recovery_click_${cart.id}_${input.sequenceHint ?? cart.lastRecoverySequence ?? 0}`,
      pagePath: '/checkout/recover',
      metadata: {
        cartId: cart.id,
        sequenceNumber: input.sequenceHint ?? cart.lastRecoverySequence,
      },
    });
    await recordServerAnalyticsEvent({
      eventName: 'recovery_checkout_opened',
      eventId: `recovery_open_${cart.id}`,
      pagePath: '/checkout/recover',
      metadata: {
        cartId: cart.id,
      },
    });
  }

  const snapshot = cart.checkoutData;
  if (!snapshot?.items?.length) {
    return {
      ok: false,
      error: 'invalid',
      message: 'No checkout data is available to restore.',
    };
  }

  return { ok: true, cart, snapshot };
}
