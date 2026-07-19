'use client';

import * as React from 'react';

import { FormField } from '@/components/forms/form-field';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export interface FormSwitchProps extends Omit<React.ComponentProps<typeof Switch>, 'id'> {
  id?: string;
  label: string;
  helper?: string;
  error?: string;
}

export function FormSwitch({
  id,
  label,
  helper,
  error,
  className,
  ...props
}: FormSwitchProps) {
  const switchId = id ?? props.name;

  return (
    <FormField helper={helper} error={error}>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={switchId} className="font-normal">
          {label}
        </Label>
        <Switch id={switchId} className={cn(className)} {...props} />
      </div>
    </FormField>
  );
}
