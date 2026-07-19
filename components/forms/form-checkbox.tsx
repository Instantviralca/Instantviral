'use client';

import * as React from 'react';

import { FormField } from '@/components/forms/form-field';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FormCheckboxProps
  extends Omit<React.ComponentProps<typeof Checkbox>, 'id'> {
  id?: string;
  label: string;
  helper?: string;
  error?: string;
}

export function FormCheckbox({
  id,
  label,
  helper,
  error,
  className,
  ...props
}: FormCheckboxProps) {
  const checkboxId = id ?? props.name;

  return (
    <FormField helper={helper} error={error} className="space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox id={checkboxId} className={cn(className)} {...props} />
        <Label htmlFor={checkboxId} className="font-normal">
          {label}
        </Label>
      </div>
    </FormField>
  );
}
