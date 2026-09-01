import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import { getEmailFrom, isEmailConfigured } from '@/lib/config/env';
import { sendAdminTestEmail } from '@/lib/notifications/test-email';
import {
  getAdminNotificationEmail,
  getMollieProductName,
  getMollieRemoteServerUrl,
  getMollieSharedSecret,
  getPaymentWebsiteUrl,
  isMollieRemoteConfigured,
  setAdminNotificationEmail,
  setMollieProductName,
  setMollieSharedSecret,
  setPaymentWebsiteUrl,
} from '@/lib/settings/site-settings';

export const runtime = 'nodejs';

function maskFrom(from: string | undefined): string | null {
  if (!from) return null;
  const address = from.replace(/^.*<([^>]+)>.*$/, '$1').trim();
  return address.replace(/^(.{2}).*(@.*)$/, '$1***$2');
}

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

  const [paymentWebsite, adminEmail, mollieServerUrl, mollieProductName, mollieConfigured] =
    await Promise.all([
      getPaymentWebsiteUrl(),
      getAdminNotificationEmail(),
      getMollieRemoteServerUrl(),
      getMollieProductName(),
      isMollieRemoteConfigured(),
    ]);
  const mollieSecret = await getMollieSharedSecret();
  return NextResponse.json({
    ok: true,
    settings: {
      paymentWebsite,
      adminEmail,
      mollieServerUrl,
      mollieProductName,
      mollieSharedSecretSet: mollieSecret.length >= 16,
      mollieConfigured,
      emailConfigured: isEmailConfigured(),
      emailFrom: maskFrom(getEmailFrom()),
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
      mollieSharedSecret?: string;
      mollieProductName?: string;
      action?: string;
      testTo?: string;
    };

    if (body.action === 'test-email') {
      const to =
        (typeof body.testTo === 'string' && body.testTo.trim()) ||
        (typeof body.adminEmail === 'string' && body.adminEmail.trim()) ||
        (await getAdminNotificationEmail());
      const result = await sendAdminTestEmail(to);
      return NextResponse.json(
        {
          ok: result.ok,
          error: result.error,
          hint: result.hint,
          messageId: result.messageId,
          from: result.from,
        },
        { status: result.ok ? 200 : 400 },
      );
    }

    const paymentWebsite = body.paymentWebsite?.trim()
      ? await setPaymentWebsiteUrl(body.paymentWebsite)
      : (await getPaymentWebsiteUrl()) || (await getMollieRemoteServerUrl());
    if (typeof body.mollieSharedSecret === 'string' && body.mollieSharedSecret.trim()) {
      await setMollieSharedSecret(body.mollieSharedSecret);
    }
    if (typeof body.mollieProductName === 'string' && body.mollieProductName.trim()) {
      await setMollieProductName(body.mollieProductName);
    }
    const adminEmail =
      typeof body.adminEmail === 'string'
        ? await setAdminNotificationEmail(body.adminEmail)
        : await getAdminNotificationEmail();
    const [mollieServerUrl, mollieProductName, mollieConfigured] = await Promise.all([
      getMollieRemoteServerUrl(),
      getMollieProductName(),
      isMollieRemoteConfigured(),
    ]);
    const mollieSecret = await getMollieSharedSecret();
    return NextResponse.json({
      ok: true,
      settings: {
        paymentWebsite,
        adminEmail,
        mollieServerUrl,
        mollieProductName,
        mollieSharedSecretSet: mollieSecret.length >= 16,
        mollieConfigured,
        emailConfigured: isEmailConfigured(),
        emailFrom: maskFrom(getEmailFrom()),
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
