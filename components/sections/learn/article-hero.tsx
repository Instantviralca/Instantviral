import type { ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types/shared';

export type ArticleHeroProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  meta?: ReactNode;
  className?: string;
};

export function ArticleHero({
  title,
  description,
  breadcrumbs,
  meta,
  className,
}: ArticleHeroProps) {
  return (
    <Section spacing="md" className={cn(className)} aria-label="Article hero">
      <Container>
        <Stack gap="md" className="max-w-3xl">
          {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumb items={breadcrumbs} /> : null}
          <Heading as="h1" size="h1">
            {title}
          </Heading>
          {description ? <MutedText className="text-base">{description}</MutedText> : null}
          {meta}
        </Stack>
      </Container>
    </Section>
  );
}
