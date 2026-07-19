'use client';

import { CouponForm } from '@/components/commerce/cart/coupon-form';

export function CouponSection() {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Coupon</h3>
      <CouponForm />
    </div>
  );
}
