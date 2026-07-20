import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import { isEmailConfigured } from '@/lib/config/env';
import {
  getAdminNotificationEmail,
  getPaymentWebsiteUrl,
  setAdminNotificationEmail,
  setPaymentWebsiteUrl,
} from '@/lib/settings/site-settings';

export const runtime = 'nodejs';

async function requireAdmin(request: Request) {
  const jar = await cookies();
  const ok = await requireAdminFromCookies(jar);
  if (!ok) return false;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const csrfCookie = jar.get(ADMIN_CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get('x-csrf-token') ?? undefined;
    if (!verifyCsrfToken(csrfCookie, csrfHeader)) return false;
  }
  return true;
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const [paymentWebsite, adminEmail] = await Promise.all([
    getPaymentWebsiteUrl(),
    getAdminNotificationEmail(),
  ]);
  return NextResponse.json({
    ok: true,
    settings: {
      paymentWebsite,
      adminEmail,
      emailConfigured: isEmailConfigured(),
    },
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      paymentWebsite?: string;
      adminEmail?: string;
    };
    const paymentWebsite = await setPaymentWebsiteUrl(body.paymentWebsite ?? '');
    const adminEmail =
      typeof body.adminEmail === 'string'
        ? await setAdminNotificationEmail(body.adminEmail)
        : await getAdminNotificationEmail();
    return NextResponse.json({
      ok: true,
      settings: {
        paymentWebsite,
        adminEmail,
        emailConfigured: isEmailConfigured(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to save settings.',
      },
      { status: 400 },
    );
  }
}
