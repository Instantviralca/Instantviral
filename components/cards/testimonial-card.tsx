import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { cn } from '@/lib/utils';

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  role?: string;
  avatar?: React.ReactNode;
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardDescription className="text-base text-foreground">&ldquo;{quote}&rdquo;</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        {avatar}
        <div>
          <CardTitle className="text-sm">{author}</CardTitle>
          {role ? <p className="text-xs text-muted-foreground">{role}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
