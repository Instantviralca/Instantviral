import { Suspense } from 'react';

import { CategoryGrid } from '@/components/learn/CategoryGrid';
import { FeaturedArticles } from '@/components/learn/FeaturedArticles';
import { LearnHero } from '@/components/learn/LearnHero';
import { NewsletterCTA } from '@/components/learn/NewsletterCTA';
import { PopularTags } from '@/components/learn/taxonomy/PopularTags';
import { LearnDiscovery } from '@/components/learn/search/LearnDiscovery';
import { LearnSearchSkeleton } from '@/components/learn/search/LearnSearchSkeleton';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { routes } from '@/config/routes';
import {
  getLearnIndexBreadcrumbs,
  listFeaturedPublicLearnArticles,
  listPublicLearnArticles,
  listPublicLearnCategories,
} from '@/lib/learn';
import { getPopularTags, getTags } from '@/lib/learn/taxonomy';
import {
  buildArticleSearchIndex,
  parseLearnSearchParams,
} from '@/lib/learn/search';
import type { LearnSearchState } from '@/types/learn-search';

type LearnIndexViewProps = {
  initialState?: LearnSearchState;
};

/**
 * Learn Center index — Documents 15.01 + 15.04 + 15.05.
 */
export function LearnIndexView({ initialState }: LearnIndexViewProps) {
  const categories = listPublicLearnCategories();
  const featured = listFeaturedPublicLearnArticles();
  const articles = listPublicLearnArticles();
  const breadcrumbs = getLearnIndexBreadcrumbs();
  const popularTags = getPopularTags(10);
  const tags = getTags();
  const documents = buildArticleSearchIndex(articles);
  const resolvedInitial =
    initialState ?? parseLearnSearchParams({}).state;

  return (
    <div className="overflow-x-hidden">
      <LearnHero
        title="Learn Center"
        description="Practical guides for Instagram, TikTok, Facebook, YouTube, and social media marketing. New articles publish here as they are approved."
        breadcrumbs={breadcrumbs}
      />

      <CategoryGrid categories={categories} />

      {popularTags.length > 0 ? (
        <Section>
          <Container>
            <PopularTags tags={popularTags} />
          </Container>
        </Section>
      ) : null}

      <FeaturedArticles articles={featured} />

      <Section>
        <Container>
          <Heading as="h2">All articles</Heading>
          <div className="mt-6">
            <Suspense fallback={<LearnSearchSkeleton />}>
              <LearnDiscovery
                documents={documents}
                categories={categories}
                tags={tags}
                basePath={routes.learn}
                initialState={resolvedInitial}
              />
            </Suspense>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <NewsletterCTA />
        </Container>
      </Section>
    </div>
  );
}
