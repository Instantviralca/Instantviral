import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { cn } from '@/lib/utils';

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price: string;
  description?: string;
  features?: string[];
  action?: React.ReactNode;
  highlighted?: boolean;
}

export function PricingCard({
  title,
  price,
  description,
  features = [],
  action,
  highlighted,
  className,
  ...props
}: PricingCardProps) {
  return (
    <Card
      className={cn(highlighted && 'border-primary shadow-md', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        <p className="pt-2 text-3xl font-semibold tracking-tight text-foreground">{price}</p>
      </CardHeader>
      {features.length > 0 ? (
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </CardContent>
      ) : null}
      {action ? <CardFooter>{action}</CardFooter> : null}
    </Card>
  );
}
