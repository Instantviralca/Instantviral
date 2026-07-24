import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import {
  createAdminCoupon,
  getAdminCouponEditor,
  getAdminCouponRows,
  updateAdminCoupon,
} from '@/lib/admin/coupons';
import type { CurrencyCode } from '@/types/pricing';

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

  const { searchParams } = new URL(request.url);
  const couponId = searchParams.get('couponId');
  if (couponId) {
    const coupon = await getAdminCouponEditor(couponId);
    if (!coupon) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, coupon });
  }

  const coupons = await getAdminCouponRows();
  return NextResponse.json({ ok: true, coupons });
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const discountType = body.discountType === 'fixed' ? 'fixed' : 'percentage';
    const value = Number(body.value);
    const coupon = await createAdminCoupon({
      code: String(body.code ?? ''),
      campaignName: typeof body.campaignName === 'string' ? body.campaignName : undefined,
      description: typeof body.description === 'string' ? body.description : undefined,
      discountType,
      value: discountType === 'fixed' ? Math.round(value) : value,
      currency: typeof body.currency === 'string' ? (body.currency as CurrencyCode) : 'USD',
      minSubtotal:
        body.minSubtotal == null || body.minSubtotal === ''
          ? undefined
          : Math.round(Number(body.minSubtotal)),
      maxRedemptions:
        body.maxRedemptions == null || body.maxRedemptions === ''
          ? undefined
          : Math.round(Number(body.maxRedemptions)),
      active: body.active !== false,
      startAt: typeof body.startAt === 'string' && body.startAt ? body.startAt : undefined,
      expiresAt: typeof body.expiresAt === 'string' && body.expiresAt ? body.expiresAt : undefined,
    });
    revalidatePath('/admin/coupons');
    const editor = await getAdminCouponEditor(coupon.id);
    return NextResponse.json({ ok: true, coupon: editor });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unable to create coupon.' },
      { status: 400 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const couponId = typeof body.couponId === 'string' ? body.couponId : '';
    if (!couponId) {
      return NextResponse.json({ ok: false, error: 'couponId is required' }, { status: 400 });
    }

    const patch: Parameters<typeof updateAdminCoupon>[1] = {};
    if (typeof body.code === 'string') patch.code = body.code;
    if (typeof body.campaignName === 'string') patch.campaignName = body.campaignName;
    if (typeof body.description === 'string') patch.description = body.description;
    if (body.discountType === 'fixed' || body.discountType === 'percentage') {
      patch.discountType = body.discountType;
    }
    if (body.value != null && body.value !== '') patch.value = Number(body.value);
    if (typeof body.currency === 'string') patch.currency = body.currency as CurrencyCode;
    if (body.minSubtotal !== undefined) {
      patch.minSubtotal =
        body.minSubtotal === '' || body.minSubtotal == null
          ? undefined
          : Math.round(Number(body.minSubtotal));
    }
    if (body.maxRedemptions !== undefined) {
      patch.maxRedemptions =
        body.maxRedemptions === '' || body.maxRedemptions == null
          ? undefined
          : Math.round(Number(body.maxRedemptions));
    }
    if (typeof body.active === 'boolean') patch.active = body.active;
    if (typeof body.startAt === 'string') patch.startAt = body.startAt || undefined;
    if (typeof body.expiresAt === 'string') patch.expiresAt = body.expiresAt || undefined;

    await updateAdminCoupon(couponId, patch);
    revalidatePath('/admin/coupons');
    const editor = await getAdminCouponEditor(couponId);
    return NextResponse.json({ ok: true, coupon: editor });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unable to update coupon.' },
      { status: 400 },
    );
  }
}
