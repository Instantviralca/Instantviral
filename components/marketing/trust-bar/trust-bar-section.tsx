import { TrustGrid } from '@/components/marketing/trust-bar/trust-grid';
import type { TrustBarSectionProps } from '@/components/marketing/trust-bar/types';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { getHomepageContent } from '@/data/content/homepage';
import { cn } from '@/lib/utils';

/**
 * Homepage Trust Bar section (Document 08.03).
 * No H2 — lightweight support section. Content from data layer.
 */
export function TrustBarSection({ className, id }: TrustBarSectionProps) {
  const { trustBar } = getHomepageContent();
  const sectionId = id ?? trustBar.id;

  const items = trustBar.items.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.description,
    iconKey: item.iconKey,
  }));

  return (
    <Section
      id={sectionId}
      spacing="sm"
      className={cn('border-y border-border bg-muted/40', className)}
      aria-label={trustBar.title || 'Trust signals'}
    >
      <Container size="xl">
        <TrustGrid items={items} />
      </Container>
    </Section>
  );
}
