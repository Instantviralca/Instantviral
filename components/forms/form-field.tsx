import * as React from 'react';

import { Label } from '@/components/ui/label';
import { HelperText } from '@/components/forms/helper-text';
import { ValidationMessage } from '@/components/forms/validation-message';
import { cn } from '@/lib/utils';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  helper?: string;
  error?: string;
  required?: boolean;
}

export function FormField({
  label,
  htmlFor,
  helper,
  error,
  required,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label ? (
        <Label htmlFor={htmlFor}>
          {label}
          {required ? <span className="text-destructive"> *</span> : null}
        </Label>
      ) : null}
      {children}
      {error ? <ValidationMessage>{error}</ValidationMessage> : null}
      {!error && helper ? <HelperText>{helper}</HelperText> : null}
    </div>
  );
}
