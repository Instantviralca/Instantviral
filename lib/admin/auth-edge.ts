/**
 * Edge-compatible admin session verification for middleware.
 * Mirrors lib/admin/auth signing without Node crypto APIs.
 */

export const ADMIN_SESSION_COOKIE = 'iv_admin_session';

function getSessionSecret(): string | null {
  const secret =
    process.env.IV_ADMIN_SESSION_SECRET?.trim() ||
    process.env.SESSION_SECRET?.trim() ||
    process.env.IV_SHARED_SECRET?.trim();
  if (secret) return secret;

  // Never use password / hardcoded fallbacks on the Edge in production.
  if (process.env.NODE_ENV === 'production' && process.env.IV_ENV !== 'test') {
    return null;
  }

  return (
    process.env.IV_ADMIN_PASSWORD?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    'dev-only-insecure-admin-secret'
  );
}

async function hmacSign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(value),
  );
  const bytes = new Uint8Array(signature);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function verifyAdminSessionTokenEdge(
  token: string | undefined | null,
): Promise<boolean> {
  const secret = getSessionSecret();
  if (!secret) return false;
  if (!token || !token.includes('.')) return false;
  const [body, signature] = token.split('.');
  if (!body || !signature) return false;
  const expected = await hmacSign(body, secret);
  if (!timingSafeEqualString(signature, expected)) return false;
  try {
    const json = atob(body.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(json) as { role?: string; exp?: number };
    if (payload.role !== 'admin') return false;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
