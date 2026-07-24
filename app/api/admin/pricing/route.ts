import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import {
  getAdminPackageEditor,
  getAdminPricingRows,
  getAdminPricingServiceOptions,
  updateAdminPackage,
} from '@/lib/admin/pricing';
import type { PackageBadgeId } from '@/types/pricing';

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

/** Convert major currency units from admin UI to minor units. */
function majorToMinor(value: unknown): number | undefined {
  if (value == null || value === '') return undefined;
  const n = Number(value);
  if (!Number.isFinite(n)) throw new Error('Enter a valid price.');
  return Math.round(n * 100);
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const packageId = searchParams.get('packageId');
  if (packageId) {
    const pkg = await getAdminPackageEditor(packageId);
    if (!pkg) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, package: pkg });
  }

  const [packages, services] = await Promise.all([
    getAdminPricingRows(),
    getAdminPricingServiceOptions(),
  ]);
  return NextResponse.json({ ok: true, packages, services });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const packageId = typeof body.packageId === 'string' ? body.packageId : '';
    if (!packageId) {
      return NextResponse.json({ ok: false, error: 'packageId is required' }, { status: 400 });
    }

    const price = majorToMinor(body.price);
    const compareAtPrice =
      body.compareAtPrice === null || body.compareAtPrice === ''
        ? null
        : majorToMinor(body.compareAtPrice);

    const updated = await updateAdminPackage(packageId, {
      price,
      compareAtPrice,
      quantity:
        body.quantity == null || body.quantity === ''
          ? undefined
          : Math.round(Number(body.quantity)),
      deliveryTime: typeof body.deliveryTime === 'string' ? body.deliveryTime : undefined,
      active: typeof body.active === 'boolean' ? body.active : undefined,
      badge:
        body.badge === null || body.badge === 'none'
          ? null
          : typeof body.badge === 'string'
            ? (body.badge as PackageBadgeId)
            : undefined,
    });

    revalidatePath('/admin/pricing');
    if (updated?.serviceSlug) {
      revalidatePath(`/${updated.serviceSlug}`);
    }
    revalidatePath('/');

    return NextResponse.json({ ok: true, package: updated });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unable to update package.' },
      { status: 400 },
    );
  }
}
