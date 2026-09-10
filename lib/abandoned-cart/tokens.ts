/**
 * Cryptographically secure recovery tokens.
 *
 * Link tokens are HMAC-signed payloads (cart id + expiry) so the same URL can be
 * regenerated for every email without invalidating prior messages.
 * A hash is still stored for indexing / admin diagnostics.
 */

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

import { getAbandonedCartTokenTtlDays } from '@/config/abandoned-cart';
import { getAdminSessionSecret } from '@/lib/config/env';

function getRecoverySigningSecret(): string {
  return (
    process.env.ABANDONED_CART_TOKEN_SECRET?.trim() ||
    getAdminSessionSecret() ||
    process.env.IV_SHARED_SECRET?.trim() ||
    'dev-only-abandoned-cart-secret'
  );
}

export function generateCheckoutSessionId(): string {
  return `acs_${randomBytes(18).toString('hex')}`;
}

export function generateAbandonedCartId(): string {
  return `ac_${Date.now().toString(36)}_${randomBytes(6).toString('hex')}`;
}

export function generateRecoveryEmailLogId(): string {
  return `acre_${Date.now().toString(36)}_${randomBytes(4).toString('hex')}`;
}

export function getTokenExpiryDate(from: Date = new Date()): Date {
  const days = getAbandonedCartTokenTtlDays();
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
}

export function hashRecoveryToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function safeEqualText(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Stable hash stored on the cart row (not the email link itself). */
export function cartRecoveryLookupHash(cartId: string): string {
  return createHash('sha256').update(`iv-ac:${cartId}`).digest('hex');
}

/**
 * Create a signed recovery link token.
 * Format: base64url(cartId.expiryMs).hmac
 */
export function createRecoveryLinkToken(cartId: string, expiresAt: Date): string {
  const payload = Buffer.from(`${cartId}.${expiresAt.getTime()}`, 'utf8').toString('base64url');
  const sig = createHmac('sha256', getRecoverySigningSecret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function parseRecoveryLinkToken(
  token: string,
): { cartId: string; expiresAtMs: number } | null {
  const trimmed = token.trim();
  const parts = trimmed.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  if (!payload || !sig) return null;

  const expected = createHmac('sha256', getRecoverySigningSecret())
    .update(payload)
    .digest('base64url');
  if (!safeEqualText(sig, expected)) return null;

  try {
    const decoded = Buffer.from(payload, 'base64url').toString('utf8');
    const sep = decoded.lastIndexOf('.');
    if (sep <= 0) return null;
    const cartId = decoded.slice(0, sep);
    const expiresAtMs = Number.parseInt(decoded.slice(sep + 1), 10);
    if (!cartId.startsWith('ac_') || !Number.isFinite(expiresAtMs)) return null;
    return { cartId, expiresAtMs };
  } catch {
    return null;
  }
}

/** @deprecated kept for tests/helpers that mint opaque values */
export function generateRecoveryToken(): string {
  return randomBytes(32).toString('base64url');
}
