import * as React from 'react';

import { FormField } from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface FormInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  helper?: string;
  error?: string;
}

export function FormInput({
  id,
  label,
  helper,
  error,
  className,
  required,
  ...props
}: FormInputProps) {
  const inputId = id ?? props.name;

  return (
    <FormField label={label} htmlFor={inputId} helper={helper} error={error} required={required}>
      <Input
        id={inputId}
        aria-invalid={!!error}
        required={required}
        className={cn(error && 'border-destructive', className)}
        {...props}
      />
    </FormField>
  );
}
