import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

import { getAbandonedCartCronSecret } from '@/config/abandoned-cart';
import { processDueAbandonedCartEmails } from '@/lib/abandoned-cart/process-recovery';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function secretsEqual(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function authorize(request: Request): boolean {
  const expected = getAbandonedCartCronSecret();
  if (!expected) return false;

  const header =
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim() ||
    request.headers.get('x-cron-secret')?.trim() ||
    '';

  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret')?.trim() || '';

  if (header && secretsEqual(header, expected)) return true;
  if (querySecret && secretsEqual(querySecret, expected)) return true;
  return false;
}

/**
 * Hosting-neutral job entrypoint.
 * Temporary Vercel Cron can hit this; Contabo Linux cron can call the same URL or
 * `npx tsx scripts/process-abandoned-carts.ts`.
 */
async function run(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const result = await processDueAbandonedCartEmails({
    triggeredBy: 'api_job',
    runCleanup: true,
  });

  return NextResponse.json(result, { status: result.ok || result.skipped ? 200 : 500 });
}

export async function GET(request: Request) {
  return run(request);
}

export async function POST(request: Request) {
  return run(request);
}
