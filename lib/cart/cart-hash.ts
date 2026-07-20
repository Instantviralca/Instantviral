/**
 * Cross-subdomain cart transfer.
 * Prefer `?ivc=` (survives middleware redirects); hash is a secondary fallback.
 */

import { deserializeCart, serializeCart } from '@/lib/cart/utils';
import type { CartState } from '@/types/cart';

export const CART_QUERY_PARAM = 'ivc';
export const CART_HASH_PREFIX = 'ivcart=';

/** Soft limit under typical browser / CDN URL caps. */
export const CART_TRANSFER_MAX_CHARS = 6000;

/** Survives React Strict Mode remount after the transfer token is cleared. */
let consumedTransferCart: CartState | null = null;

function toBase64Url(json: string): string {
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(encoded: string): string | null {
  try {
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
    const binary = atob(`${padded}${pad}`);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function encodeCartTransfer(state: CartState): string | null {
  if (!state.items.length) return null;
  try {
    const encoded = toBase64Url(serializeCart(state));
    if (encoded.length > CART_TRANSFER_MAX_CHARS) return null;
    return encoded;
  } catch {
    return null;
  }
}

/** @deprecated Use encodeCartTransfer — kept for hash fallback. */
export function encodeCartHash(state: CartState): string | null {
  const encoded = encodeCartTransfer(state);
  if (!encoded) return null;
  return `${CART_HASH_PREFIX}${encoded}`;
}

function parseTransferPayload(raw: string): CartState | null {
  // Prefer base64url payload; fall back to legacy URI-encoded JSON.
  const fromB64 = fromBase64Url(raw);
  if (fromB64) {
    const cart = deserializeCart(fromB64);
    if (cart?.items?.length) return cart;
  }
  try {
    const cart = deserializeCart(decodeURIComponent(raw));
    if (cart?.items?.length) return cart;
  } catch {
    /* ignore */
  }
  return null;
}

export function readCartFromLocationTransfer(): CartState | null {
  if (consumedTransferCart?.items.length) return consumedTransferCart;
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get(CART_QUERY_PARAM);
  if (fromQuery) {
    const cart = parseTransferPayload(fromQuery);
    if (cart) {
      consumedTransferCart = cart;
      return cart;
    }
  }

  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;
  if (hash.startsWith(CART_HASH_PREFIX)) {
    const cart = parseTransferPayload(hash.slice(CART_HASH_PREFIX.length));
    if (cart) {
      consumedTransferCart = cart;
      return cart;
    }
  }

  return null;
}

/** @deprecated Use readCartFromLocationTransfer */
export function readCartFromLocationHash(): CartState | null {
  return readCartFromLocationTransfer();
}

export function clearCartLocationTransfer(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const hadQuery = params.has(CART_QUERY_PARAM);
  if (hadQuery) params.delete(CART_QUERY_PARAM);
  const hadHash = window.location.hash.includes(CART_HASH_PREFIX);
  if (!hadQuery && !hadHash) return;
  const search = params.toString();
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}${search ? `?${search}` : ''}`,
  );
}

/** @deprecated Use clearCartLocationTransfer */
export function clearCartLocationHash(): void {
  clearCartLocationTransfer();
}

export function locationHasCartTransfer(): boolean {
  if (typeof window === 'undefined') return false;
  if (consumedTransferCart?.items.length) return true;
  if (new URLSearchParams(window.location.search).has(CART_QUERY_PARAM)) return true;
  return window.location.hash.includes(CART_HASH_PREFIX);
}

/** @deprecated Use locationHasCartTransfer */
export function locationHasCartHash(): boolean {
  return locationHasCartTransfer();
}
