import * as React from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { cn } from '@/lib/utils';

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function FeatureCard({ title, description, icon, className, ...props }: FeatureCardProps) {
  return (
    <Card className={cn('flex h-full flex-col', className)} {...props}>
      <CardHeader className="flex flex-1 flex-col space-y-3.5 p-6 sm:p-7">
        {icon ? <div className="flex items-start text-primary [&_svg]:size-5">{icon}</div> : null}
        <CardTitle className="text-base leading-snug">{title}</CardTitle>
        <CardDescription className="flex-1 text-[0.9375rem] leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
