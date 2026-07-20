/**
 * Instant cross-subdomain cart transfer via URL hash (no API round-trip).
 * Hash is not sent to the server; checkout reads it on the client immediately.
 */

import { deserializeCart, serializeCart } from '@/lib/cart/utils';
import type { CartState } from '@/types/cart';

export const CART_HASH_PREFIX = 'ivcart=';

/** Soft limit under typical browser URL caps. */
export const CART_HASH_MAX_CHARS = 12000;

/** Survives React Strict Mode remount after hash is cleared from the URL. */
let consumedHashCart: CartState | null = null;

export function encodeCartHash(state: CartState): string | null {
  if (!state.items.length) return null;
  const payload = encodeURIComponent(serializeCart(state));
  if (payload.length > CART_HASH_MAX_CHARS) return null;
  return `${CART_HASH_PREFIX}${payload}`;
}

export function readCartFromLocationHash(): CartState | null {
  if (consumedHashCart?.items.length) return consumedHashCart;
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;
  if (!hash.startsWith(CART_HASH_PREFIX)) return null;
  const raw = decodeURIComponent(hash.slice(CART_HASH_PREFIX.length));
  const cart = deserializeCart(raw);
  if (!cart?.items?.length) return null;
  consumedHashCart = cart;
  return cart;
}

export function clearCartLocationHash(): void {
  if (typeof window === 'undefined') return;
  if (!window.location.hash.includes(CART_HASH_PREFIX)) return;
  const { pathname, search } = window.location;
  window.history.replaceState({}, '', `${pathname}${search}`);
}

export function locationHasCartHash(): boolean {
  if (typeof window === 'undefined') return false;
  if (consumedHashCart?.items.length) return true;
  return window.location.hash.includes(CART_HASH_PREFIX);
}
