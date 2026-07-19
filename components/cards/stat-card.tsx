'use client';

import type { HTMLAttributes } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/cards/card';
import { AnimatedStatValue } from '@/components/motion/animated-stat-value';
import { cn } from '@/lib/utils';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  description?: string;
}

export function StatCard({ label, value, description, className, ...props }: StatCardProps) {
  return (
    <Card
      className={cn(
        'group flex h-full flex-col border-[var(--border-subtle)] bg-white transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_25%,var(--border-subtle))] hover:shadow-[0_16px_36px_-28px_rgba(28,25,23,0.28)]',
        className,
      )}
      {...props}
    >
      <CardHeader className="flex flex-1 flex-col gap-4 space-y-0 p-6 sm:p-7">
        <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:text-sm sm:tracking-normal sm:normal-case sm:font-medium">
          {label}
        </p>
        <CardTitle className="mt-auto text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
          <AnimatedStatValue value={value} />
        </CardTitle>
      </CardHeader>
      {description ? (
        <p className="px-6 pb-6 text-sm text-muted-foreground sm:px-7">{description}</p>
      ) : null}
    </Card>
  );
}
