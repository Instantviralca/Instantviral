import * as React from 'react';

import { FormField } from '@/components/forms/form-field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
  label?: string;
  helper?: string;
  error?: string;
}

export function FormTextarea({
  id,
  label,
  helper,
  error,
  className,
  required,
  ...props
}: FormTextareaProps) {
  const inputId = id ?? props.name;

  return (
    <FormField label={label} htmlFor={inputId} helper={helper} error={error} required={required}>
      <Textarea
        id={inputId}
        aria-invalid={!!error}
        required={required}
        className={cn(error && 'border-destructive', className)}
        {...props}
      />
    </FormField>
  );
}
