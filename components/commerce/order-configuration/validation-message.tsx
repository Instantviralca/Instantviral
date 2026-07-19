'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type ValidationMessageProps = {
  message?: string;
  className?: string;
};

export function ValidationMessage({ message, className }: ValidationMessageProps) {
  if (!message) return null;
  return (
    <Alert variant="destructive" className={cn('py-2', className)} role="alert">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
