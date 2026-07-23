'use client';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Faq } from '@/components/sections/faq';
import { getServicePageAnalytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/components';

export type ServiceFaqProps = {
  id?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  analyticsServiceSlug?: string;
  className?: string;
  defaultOpenIds?: string[];
  pinnedOpenIds?: string[];
};

export function ServiceFaq({
  id,
  title,
  description,
  items,
  analyticsServiceSlug,
  className,
  defaultOpenIds,
  pinnedOpenIds,
}: ServiceFaqProps) {
  if (items.length === 0) return null;

  const analytics = analyticsServiceSlug
    ? getServicePageAnalytics(analyticsServiceSlug)
    : null;

  return (
    <Section id={id} className={cn(className)} aria-label="Service FAQ">
      <Container>
        <Faq
          title={title}
          description={description}
          items={items}
          defaultOpenIds={defaultOpenIds}
          pinnedOpenIds={pinnedOpenIds}
          onItemOpen={
            analytics
              ? (faqId) => {
                  analytics.faqOpen({
                    faqId,
                    serviceSlug: analyticsServiceSlug,
                  });
                }
              : undefined
          }
        />
      </Container>
    </Section>
  );
}
