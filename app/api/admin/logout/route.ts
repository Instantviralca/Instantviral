import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  ADMIN_SESSION_COOKIE,
  getAdminCsrfCookieOptions,
  getAdminSessionCookieOptions,
  revokeAdminSession,
} from '@/lib/admin/auth';

export const runtime = 'nodejs';

export async function POST() {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  await revokeAdminSession(token);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    ...getAdminSessionCookieOptions(0),
    maxAge: 0,
  });
  response.cookies.set(ADMIN_CSRF_COOKIE, '', {
    ...getAdminCsrfCookieOptions(0),
    maxAge: 0,
  });
  return response;
}
