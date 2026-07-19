import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { SeoHeaderProps } from '@/types/components';

export type { SeoHeaderProps };

/**
 * Reusable page header for SEO-focused pages.
 * Accepts title/description/breadcrumbs via props — no hardcoded copy.
 */
export function SEOHeader({
  title,
  description,
  breadcrumbs,
  className,
}: SeoHeaderProps & { className?: string }) {
  return (
    <header className={cn('border-b border-border bg-background py-8 md:py-10', className)}>
      <Container>
        <Stack gap="md">
          {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumb items={breadcrumbs} /> : null}
          <Heading as="h1" size="h1">
            {title}
          </Heading>
          {description ? <MutedText className="max-w-2xl text-base">{description}</MutedText> : null}
        </Stack>
      </Container>
    </header>
  );
}
