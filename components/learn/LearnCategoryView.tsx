import { Suspense } from 'react';

import { AuthorCard } from '@/components/authors/AuthorCard';
import { FeaturedArticles } from '@/components/learn/FeaturedArticles';
import { NewsletterCTA } from '@/components/learn/NewsletterCTA';
import {
  CategoryHero,
  CategorySidebar,
  EmptyCategoryState,
} from '@/components/learn/taxonomy';
import { LearnDiscovery } from '@/components/learn/search/LearnDiscovery';
import { LearnSearchSkeleton } from '@/components/learn/search/LearnSearchSkeleton';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { getAuthorsForCategory } from '@/lib/authors';
import { learnCategoryPath } from '@/config/routes';
import { getBeginnerPublicArticles } from '@/lib/learn/contextual-links';
import {
  buildArticleSearchIndex,
  parseLearnSearchParams,
} from '@/lib/learn/search';
import {
  getArticlesByCategory,
  getCategoryBreadcrumbs,
  getCategoryRelatedServices,
  getPopularTags,
  getRelatedCategories,
  getTags,
  getCategories,
} from '@/lib/learn/taxonomy';
import type { PublicLearnArticle, PublicLearnCategory } from '@/types/learn';
import type { LearnSearchState } from '@/types/learn-search';

type LearnCategoryViewProps = {
  category: PublicLearnCategory;
  initialState?: LearnSearchState;
};

function dedupeArticles(groups: PublicLearnArticle[][]): {
  featured: PublicLearnArticle[];
  latest: PublicLearnArticle[];
  popular: PublicLearnArticle[];
  beginner: PublicLearnArticle[];
} {
  const seen = new Set<string>();
  const take = (list: PublicLearnArticle[], limit: number) => {
    const out: PublicLearnArticle[] = [];
    for (const article of list) {
      if (seen.has(article.slug)) continue;
      seen.add(article.slug);
      out.push(article);
      if (out.length >= limit) break;
    }
    return out;
  };

  const [featuredSource, latestSource, popularSource, beginnerSource] = groups;
  return {
    featured: take(featuredSource ?? [], 3),
    latest: take(latestSource ?? [], 3),
    popular: take(popularSource ?? [], 3),
    beginner: take(beginnerSource ?? [], 3),
  };
}

/**
 * Learn category page — Documents 15.01 + 15.04 + 15.05.
 * Search/filters scoped to the category; unpublished articles never appear.
 */
export function LearnCategoryView({
  category,
  initialState,
}: LearnCategoryViewProps) {
  const breadcrumbs = getCategoryBreadcrumbs(category);
  const articles = getArticlesByCategory(category.id);
  const documents = buildArticleSearchIndex(articles);
  const relatedCategories = getRelatedCategories(category.id);
  const relatedServices = getCategoryRelatedServices(category.slug);
  const authors = getAuthorsForCategory(category.id);
  const popularTags = getPopularTags(6);
  const tags = getTags();
  const categories = getCategories();
  const resolvedInitial =
    initialState ??
    parseLearnSearchParams({}, { lockedCategory: category.slug }).state;

  const featuredSource = articles.filter((article) => article.featured);
  const latestSource = articles
    .slice()
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  const popularSource = articles
    .slice()
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        b.relatedArticles.length - a.relatedArticles.length,
    );
  const beginnerSource = getBeginnerPublicArticles(category.slug, 8);

  const hub = dedupeArticles([
    featuredSource.length > 0 ? featuredSource : latestSource,
    latestSource,
    popularSource,
    beginnerSource,
  ]);

  return (
    <div className="overflow-x-hidden">
      <CategoryHero category={category} breadcrumbs={breadcrumbs} />

      <FeaturedArticles
        title="Featured Articles"
        description={`Editor-selected ${category.name} guides.`}
        articles={hub.featured}
      />
      <FeaturedArticles
        title="Latest Articles"
        description={`Recently updated ${category.name} Learn articles.`}
        articles={hub.latest}
      />
      <FeaturedArticles
        title="Most Popular"
        description={`Frequently referenced ${category.name} guides.`}
        articles={hub.popular}
      />
      <FeaturedArticles
        title="Beginner Guides"
        description={`Start here if you are new to ${category.name}.`}
        articles={hub.beginner}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="min-w-0 space-y-10">
              <section aria-labelledby="category-articles-heading">
                <Heading as="h2" id="category-articles-heading">
                  Articles in {category.name}
                </Heading>
                {documents.length === 0 ? (
                  <EmptyCategoryState
                    categoryName={category.name}
                    className="mt-4"
                  />
                ) : (
                  <div className="mt-6">
                    <Suspense fallback={<LearnSearchSkeleton />}>
                      <LearnDiscovery
                        documents={documents}
                        categories={categories}
                        tags={tags}
                        basePath={learnCategoryPath(category.slug)}
                        lockedCategory={category.slug}
                        initialState={resolvedInitial}
                      />
                    </Suspense>
                  </div>
                )}
              </section>

              {authors.length > 0 ? (
                <section aria-labelledby="category-authors-heading">
                  <Heading as="h2" id="category-authors-heading">
                    Authors in {category.name}
                  </Heading>
                  <MutedText className="mt-2 max-w-2xl">
                    Contributors with published articles in this category.
                  </MutedText>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {authors.map((author) => (
                      <li key={author.id}>
                        <AuthorCard author={author} showBio={false} />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <CategorySidebar
              category={category}
              relatedCategories={relatedCategories}
              relatedServices={relatedServices}
              popularTags={popularTags}
              className="lg:border-l lg:border-neutral-200 lg:pl-8"
            />
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
