/**
 * Public origin for outbound redirects.
 * Behind Cloudflare → nginx → Next on localhost:3001, request.nextUrl.origin
 * is the internal listen address. Googlebot must never be sent there.
 */

import { getSiteOrigin } from '@/lib/config/hosts';

export type PublicOriginRequest = {
  headers: Headers;
};

function trimOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/$/, '');
  return trimmed || undefined;
}

function isInternalOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host.endsWith('.localhost')
    ) {
      return true;
    }
    if (url.port === '3001') return true;
    return false;
  } catch {
    return true;
  }
}

/** Configured public site URL, or undefined when only a loopback fallback exists. */
export function getConfiguredSiteOrigin(): string | undefined {
  const configured =
    trimOrigin(process.env.NEXT_PUBLIC_SITE_URL) || trimOrigin(process.env.SITE_URL);
  if (configured && !isInternalOrigin(configured)) return configured;

  const origin = getSiteOrigin();
  if (origin && !isInternalOrigin(origin)) return origin;
  return undefined;
}

function originFromHeaders(headers: Headers): string | undefined {
  const proto =
    headers.get('x-forwarded-proto')?.split(',')[0]?.trim() || 'http';
  const host =
    headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    headers.get('host')?.split(',')[0]?.trim();
  if (!host) return undefined;
  return `${proto}://${host}`.replace(/\/$/, '');
}

/**
 * Origin for Location headers.
 * Prefers the configured site URL (getSiteOrigin / NEXT_PUBLIC_SITE_URL / SITE_URL).
 * In development with no public site URL, falls back to
 * x-forwarded-proto + x-forwarded-host / host.
 */
export function getPublicOrigin(request: PublicOriginRequest): string {
  const configured = getConfiguredSiteOrigin();
  if (configured) return configured;

  const forwarded = originFromHeaders(request.headers);
  if (forwarded) return forwarded;

  return getSiteOrigin();
}

/** Absolute public URL for a path + query, never based on request.nextUrl.origin. */
export function buildPublicRedirectUrl(
  request: PublicOriginRequest,
  pathname: string,
  search = '',
): URL {
  const origin = getPublicOrigin(request);
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const url = new URL(path, `${origin}/`);
  url.search = search.startsWith('?') || search === '' ? search : `?${search}`;
  return url;
}
