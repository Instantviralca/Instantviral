'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApplyCouponCode, useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

type CouponFormProps = {
  className?: string;
};

export function CouponForm({ className }: CouponFormProps) {
  const cart = useCart();
  const applyCode = useApplyCouponCode();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | undefined>();

  if (cart.coupon) {
    return (
      <div className={cn('space-y-2', className)}>
        <p className="text-sm">
          Coupon <span className="font-medium">{cart.coupon.code}</span> applied.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            cart.removeCoupon();
            setMessage(undefined);
          }}
        >
          Remove coupon
        </Button>
      </div>
    );
  }

  return (
    <form
      className={cn('space-y-2', className)}
      onSubmit={(e) => {
        e.preventDefault();
        const result = applyCode(code);
        setMessage(result.ok ? 'Coupon applied.' : result.message);
      }}
    >
      <Label htmlFor="coupon-code" className="text-xs font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
        Coupon code
      </Label>
      <div className="flex gap-2">
        <Input
          id="coupon-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          autoComplete="off"
          className="h-10 rounded-xl border-[var(--border-subtle)]"
        />
        <Button type="submit" variant="outline" className="h-10 rounded-xl px-4">
          Apply
        </Button>
      </div>
      {message ? (
        <p className="text-xs text-muted-foreground" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
