'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import {
  FAQAccordion,
  FAQCategoryNav,
  FAQEmptyState,
  FAQSearch,
  FAQSupportCTA,
} from '@/components/faq';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { Button } from '@/components/ui/button';
import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import {
  faqAnalyticsEvents,
  trackFaqEvent,
} from '@/lib/analytics/faq-events';
import {
  faqPageAnalyticsEvents,
  trackFaqPageEvent,
} from '@/lib/analytics/faq-page-events';
import { searchFaqs } from '@/lib/faqs/search';
import type { FaqPageContent } from '@/types/content';
import type { FAQCategoryId, PublicFaq } from '@/types/faq';

type FaqPageViewProps = {
  content: FaqPageContent;
  items: PublicFaq[];
};

/**
 * Main FAQ hub view — Document 13.03 + 14.04 shared FAQ system.
 */
export function FaqPageView({ content, items }: FaqPageViewProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategoryId | 'all'>('all');

  useEffect(() => {
    trackFaqPageEvent(faqPageAnalyticsEvents.faq_page_view);
    trackFaqEvent(faqAnalyticsEvents.faq_section_view, {
      surface: 'faq_page',
      resultCount: items.length,
    });
  }, [items.length]);

  const filtered = useMemo(() => {
    const searched = searchFaqs(items, query);
    if (activeCategory === 'all') return searched;
    return searched.filter((item) => item.category === activeCategory);
  }, [items, query, activeCategory]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    trackFaqEvent(faqAnalyticsEvents.faq_search, {
      query: trimmed,
      resultCount: filtered.length,
    });
    if (filtered.length === 0) {
      trackFaqEvent(faqAnalyticsEvents.faq_search_no_results, {
        query: trimmed,
        resultCount: 0,
      });
    }
  }, [query, filtered.length]);

  const grouped = useMemo(() => {
    return FAQ_CATEGORIES.map((category) => ({
      ...category,
      items: filtered
        .filter((item) => item.category === category.id)
        .sort((a, b) => a.order - b.order),
    })).filter((group) => group.items.length > 0);
  }, [filtered]);

  const categoryIdsWithContent = useMemo(() => {
    const ids = new Set(items.map((item) => item.category));
    return FAQ_CATEGORIES.map((category) => category.id).filter((id) => ids.has(id));
  }, [items]);

  return (
    <>
      <Section spacing="lg" className="bg-hero-wash" aria-label="FAQ hero">
        <Container size="xl">
          <Stack gap="lg" className="mx-auto max-w-3xl">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'FAQ' },
              ]}
              variant="subtle"
            />
            {content.hero.eyebrow ? (
              <Eyebrow className="text-[var(--brand-primary)]">{content.hero.eyebrow}</Eyebrow>
            ) : null}
            <Heading as="h1" size="h1">
              {content.hero.title}
            </Heading>
            <Lead className="text-pretty text-[var(--text-secondary)]">{content.hero.description}</Lead>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              {content.hero.primaryCta ? (
                <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
                  <Link href={content.hero.primaryCta.href}>
                    {content.hero.primaryCta.label}
                  </Link>
                </Button>
              ) : null}
              {content.hero.secondaryCta ? (
                <Button asChild size="lg" variant="outline" className="min-h-11 w-full sm:w-auto">
                  <Link href={content.hero.secondaryCta.href}>
                    {content.hero.secondaryCta.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          </Stack>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20" aria-label="FAQ content">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <FAQSearch
                value={query}
                onChange={setQuery}
                resultCount={filtered.length}
                label={content.search.label}
                placeholder={content.search.placeholder}
              />
              {query ? (
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11 w-full"
                  onClick={() => setQuery('')}
                >
                  {content.search.clearLabel}
                </Button>
              ) : null}

              <FAQCategoryNav
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
                categoryIds={categoryIdsWithContent}
              />
            </aside>

            <div className="space-y-12">
              {grouped.length === 0 ? (
                <FAQEmptyState
                  title="No matching questions"
                  description={content.search.emptyState}
                />
              ) : (
                grouped.map((group) => (
                  <section
                    key={group.id}
                    id={group.anchor}
                    aria-labelledby={`faq-section-${group.id}`}
                    className="scroll-mt-28"
                  >
                    <Heading as="h2" size="h2" id={`faq-section-${group.id}`} className="mb-6">
                      {group.label}
                    </Heading>
                    <FAQAccordion
                      items={group.items}
                      onItemOpen={(faqId) =>
                        trackFaqPageEvent(faqPageAnalyticsEvents.faq_question_open, {
                          faqId,
                          categoryId: group.id,
                        })
                      }
                    />
                    {group.id === 'refunds' ? (
                      <div className="mt-4">
                        <Button asChild variant="link" className="min-h-11 px-0">
                          <Link href={content.refundPolicyCta.href}>
                            {content.refundPolicyCta.label}
                          </Link>
                        </Button>
                      </div>
                    ) : null}
                  </section>
                ))
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id={content.finalCta.id}
        spacing="lg"
        className="bg-brand/5"
        aria-labelledby="faq-final-cta-heading"
      >
        <Container size="xl">
          <FAQSupportCTA
            title={content.finalCta.title}
            description={content.finalCta.description}
          />
        </Container>
      </Section>
    </>
  );
}
