import * as React from 'react';

import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-12 text-center',
        className,
      )}
      {...props}
    >
      <Heading as="h3" size="h4">
        {title}
      </Heading>
      {description ? <MutedText className="mt-2 max-w-sm">{description}</MutedText> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
