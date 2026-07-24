import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import { sendMarketingCampaign } from '@/lib/email/campaigns';
import { getPersistence } from '@/lib/persistence';
import { isEmailConfigured } from '@/lib/config/env';

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

  const persistence = getPersistence();
  let optedInCount = 0;
  let setupNotice: string | undefined;
  try {
    optedInCount = await persistence.countOptedInSubscribers();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setupNotice =
      /email_subscribers|does not exist|relation/i.test(message)
        ? 'Subscriber table is missing. Run drizzle/0004_email_subscribers.sql on the production database.'
        : 'Unable to load subscriber count.';
  }

  const campaigns = await persistence.listEmailCampaigns(10).catch(() => []);

  return NextResponse.json({
    ok: true,
    optedInCount,
    emailConfigured: isEmailConfigured(),
    campaigns,
    setupNotice,
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      subject?: string;
      message?: string;
      couponCode?: string;
    };
    const result = await sendMarketingCampaign({
      subject: String(body.subject ?? ''),
      message: String(body.message ?? ''),
      couponCode: typeof body.couponCode === 'string' ? body.couponCode : undefined,
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error ?? 'Campaign failed.',
          sentCount: result.sentCount,
          failedCount: result.failedCount,
          setupNotice: result.setupNotice,
        },
        { status: result.setupNotice ? 503 : 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      sentCount: result.sentCount,
      failedCount: result.failedCount,
      skippedCount: result.skippedCount,
      campaignId: result.campaignId,
    });
  } catch (error) {
    console.error('[admin/email]', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to send campaign.',
      },
      { status: 500 },
    );
  }
}
