import Link from 'next/link';
import * as React from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { cn } from '@/lib/utils';

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  href?: string;
  /** Platform accent as border/icon only — e.g. border-l-platform-instagram */
  accentColor?: string;
  icon?: React.ReactNode;
}

export function ServiceCard({
  title,
  description,
  href,
  accentColor,
  icon,
  className,
  onClick,
  ...props
}: ServiceCardProps) {
  const content = (
    <Card
      className={cn(
        'transition-colors hover:border-border/80',
        accentColor && 'border-l-4',
        accentColor,
        className,
      )}
      {...props}
    >
      <CardHeader>
        {icon ? (
          <div className={cn('mb-2 [&_svg]:size-5', accentColor ? 'text-inherit' : 'text-primary')}>
            {icon}
          </div>
        ) : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {content}
      </Link>
    );
  }

  return content;
}
