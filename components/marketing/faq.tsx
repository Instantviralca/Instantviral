import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Faq } from '@/components/sections/faq';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/components';

export type MarketingFaqProps = {
  title?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
};

/** Homepage FAQ section wrapper around shared Faq. */
export function MarketingFaq({ title, description, items, className }: MarketingFaqProps) {
  if (!items.length) return null;

  return (
    <Section
      spacing="lg"
      className={cn(className)}
      aria-labelledby={title ? 'home-faq-heading' : undefined}
      aria-label={title ? undefined : 'FAQ'}
    >
      <Container size="xl">
        <Faq title={title} description={description} items={items} titleId="home-faq-heading" />
      </Container>
    </Section>
  );
}
