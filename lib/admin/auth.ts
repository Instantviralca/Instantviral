/**
 * Admin session auth — hardened cookie sessions (Document 12.01).
 * Secure, HTTP-only, SameSite; signed token; expiry; DB-backed revoke; rate limiting.
 */

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

import { getPersistence } from '@/lib/persistence';
import {
  getAdminPassword,
  getAdminSessionSecret,
  isProductionRuntime,
} from '@/lib/config/env';

export const ADMIN_SESSION_COOKIE = 'iv_admin_session';
export const ADMIN_CSRF_COOKIE = 'iv_admin_csrf';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const LOGIN_WINDOW_MS = 1000 * 60 * 15;
const MAX_FAILURES = 5;

function getPassword(): string | null {
  const value = getAdminPassword();
  return value ? value : null;
}

function getSessionSecret(): string {
  const secret = getAdminSessionSecret();
  if (secret) return secret;
  if (isProductionRuntime()) {
    throw new Error('IV_ADMIN_SESSION_SECRET (or SESSION_SECRET) is required in production.');
  }
  return getAdminPassword() || 'dev-only-insecure-admin-secret';
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getPassword());
}

export type AdminSessionPayload = {
  role: 'admin';
  sid: string;
  exp: number;
};

function sign(value: string): string {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function hashIp(ip: string): string {
  return createHash('sha256').update(`ip:${ip}`).digest('hex').slice(0, 32);
}

export async function createAdminSessionToken(now = Date.now()): Promise<{
  token: string;
  csrfToken: string;
  expiresAt: string;
}> {
  const sid = randomBytes(16).toString('hex');
  const payload: AdminSessionPayload = {
    role: 'admin',
    sid,
    exp: now + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const token = `${body}.${sign(body)}`;
  const csrfToken = randomBytes(24).toString('base64url');
  const expiresAt = new Date(payload.exp).toISOString();

  await getPersistence().createSession({
    id: sid,
    tokenHash: hashToken(token),
    expiresAt,
    createdAt: new Date(now).toISOString(),
  });

  return { token, csrfToken, expiresAt };
}

export function verifyAdminSessionTokenSignature(token: string | undefined | null): AdminSessionPayload | null {
  if (!token || !token.includes('.')) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  const expected = sign(body);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8'),
    ) as AdminSessionPayload;
    if (payload.role !== 'admin') return null;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    if (!payload.sid) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Sync signature/expiry check for Edge middleware and light gates. */
export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  return Boolean(verifyAdminSessionTokenSignature(token));
}

/** Full Node check including revoke list / expiry in persistence. */
export async function verifyAdminSessionTokenAsync(
  token: string | undefined | null,
): Promise<boolean> {
  const payload = verifyAdminSessionTokenSignature(token);
  if (!payload || !token) return false;
  const session = await getPersistence().getSessionByTokenHash(hashToken(token));
  if (!session) {
    // Sessions created before DB wiring may lack a row — allow signed+unexpired in non-prod.
    if (isProductionRuntime()) return false;
    return true;
  }
  if (session.revokedAt) return false;
  if (new Date(session.expiresAt).getTime() < Date.now()) return false;
  return true;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getPassword();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Constant-time-ish length mismatch: still compare padded buffers.
    const max = Math.max(a.length, b.length);
    const aa = Buffer.alloc(max);
    const bb = Buffer.alloc(max);
    a.copy(aa);
    b.copy(bb);
    timingSafeEqual(aa, bb);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function getAdminSessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export function getAdminCsrfCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export async function assertLoginAllowed(ip: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const since = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();
  const failures = await getPersistence().countRecentFailures(hashIp(ip), since);
  if (failures >= MAX_FAILURES) {
    return { ok: false, error: 'Too many login attempts. Try again later.' };
  }
  return { ok: true };
}

export async function recordLoginAttempt(ip: string, success: boolean): Promise<void> {
  await getPersistence().recordLoginAttempt(hashIp(ip), success);
}

export async function revokeAdminSession(token: string | undefined | null): Promise<void> {
  if (!token) return;
  await getPersistence().revokeSession(hashToken(token));
}

export function verifyCsrfToken(
  cookieToken: string | undefined,
  headerToken: string | undefined,
): boolean {
  if (!cookieToken || !headerToken) return false;
  try {
    const a = Buffer.from(cookieToken);
    const b = Buffer.from(headerToken);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function requireAdminFromCookies(cookies: {
  get: (name: string) => { value: string } | undefined;
}): Promise<boolean> {
  const token = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionTokenAsync(token);
}
