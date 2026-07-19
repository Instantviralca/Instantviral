'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CustomerInformation } from '@/types/checkout';

type CustomerInformationFormProps = {
  value: CustomerInformation;
  errors?: Partial<Record<keyof CustomerInformation, string>>;
  onChange: (next: CustomerInformation) => void;
  hideLegend?: boolean;
};

export function CustomerInformationForm({
  value,
  errors,
  onChange,
  hideLegend = false,
}: CustomerInformationFormProps) {
  return (
    <fieldset className="space-y-4">
      {hideLegend ? (
        <legend className="sr-only">Customer information</legend>
      ) : (
        <legend className="text-lg font-semibold">Customer information</legend>
      )}
      <div className="space-y-2">
        <Label htmlFor="checkout-email">
          Email address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="checkout-email"
          type="email"
          autoComplete="email"
          required
          value={value.email}
          aria-invalid={Boolean(errors?.email)}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
        />
        {errors?.email ? (
          <p className="text-xs text-destructive" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="checkout-first-name">First name</Label>
          <Input
            id="checkout-first-name"
            autoComplete="given-name"
            value={value.firstName ?? ''}
            onChange={(e) => onChange({ ...value, firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkout-last-name">Last name</Label>
          <Input
            id="checkout-last-name"
            autoComplete="family-name"
            value={value.lastName ?? ''}
            onChange={(e) => onChange({ ...value, lastName: e.target.value })}
          />
        </div>
      </div>
    </fieldset>
  );
}
