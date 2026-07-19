'use client';

import * as React from 'react';

import { FormField } from '@/components/forms/form-field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type FormRadioOption = {
  label: string;
  value: string;
};

export interface FormRadioGroupProps
  extends Omit<React.ComponentProps<typeof RadioGroup>, 'children'> {
  label?: string;
  helper?: string;
  error?: string;
  options: FormRadioOption[];
  required?: boolean;
}

export function FormRadioGroup({
  label,
  helper,
  error,
  options,
  required,
  className,
  ...props
}: FormRadioGroupProps) {
  return (
    <FormField label={label} helper={helper} error={error} required={required}>
      <RadioGroup className={className} {...props}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem value={option.value} id={`${props.name ?? 'radio'}-${option.value}`} />
            <Label
              htmlFor={`${props.name ?? 'radio'}-${option.value}`}
              className="font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  );
}
