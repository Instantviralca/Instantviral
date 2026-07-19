import { NextResponse } from 'next/server';

import {
  ADMIN_CSRF_COOKIE,
  ADMIN_SESSION_COOKIE,
  assertLoginAllowed,
  createAdminSessionToken,
  getAdminCsrfCookieOptions,
  getAdminSessionCookieOptions,
  isAdminAuthConfigured,
  recordLoginAttempt,
  verifyAdminPassword,
} from '@/lib/admin/auth';

export const runtime = 'nodejs';

function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Admin authentication is unavailable.' },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const rate = await assertLoginAllowed(ip);
  if (!rate.ok) {
    return NextResponse.json({ ok: false, error: rate.error }, { status: 429 });
  }

  let password = '';
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? '';
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid credentials.' }, { status: 401 });
  }

  if (!verifyAdminPassword(password)) {
    await recordLoginAttempt(ip, false);
    return NextResponse.json({ ok: false, error: 'Invalid credentials.' }, { status: 401 });
  }

  await recordLoginAttempt(ip, true);
  const session = await createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    session.token,
    getAdminSessionCookieOptions(),
  );
  response.cookies.set(ADMIN_CSRF_COOKIE, session.csrfToken, getAdminCsrfCookieOptions());
  return response;
}
