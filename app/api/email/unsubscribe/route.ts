import { NextResponse } from 'next/server';

import { getPersistence } from '@/lib/persistence';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    let token = '';
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = (await request.json()) as { token?: string };
      token = typeof body.token === 'string' ? body.token.trim() : '';
    } else {
      const form = await request.formData();
      token = String(form.get('token') ?? '').trim();
    }

    if (!token || token.length > 200) {
      return NextResponse.json({ ok: false, error: 'Invalid unsubscribe link.' }, { status: 400 });
    }

    const updated = await getPersistence().unsubscribeByToken(token);
    if (!updated) {
      return NextResponse.json(
        { ok: false, error: 'This unsubscribe link is invalid or already used.' },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[email/unsubscribe]', error);
    return NextResponse.json({ ok: false, error: 'Unable to unsubscribe.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')?.trim() || '';
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing token.' }, { status: 400 });
  }
  const subscriber = await getPersistence().getSubscriberByUnsubscribeToken(token);
  if (!subscriber) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }
  return NextResponse.json({
    ok: true,
    email: subscriber.email.replace(/(^.).*(@.*$)/, '$1***$2'),
    alreadyUnsubscribed: Boolean(subscriber.unsubscribedAt) || !subscriber.marketingOptIn,
  });
}
