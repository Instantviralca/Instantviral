import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ArticlePage } from '@/components/learn/article';
import { LearnCategoryView } from '@/components/learn';
import { getLearnCategorySlugs, getPublishedLearnArticleSlugs } from '@/data/learn';
import {
  getPublishedArticleBySlug,
  prepareArticleForRender,
} from '@/lib/learn/article';
import {
  getLearnArticlePageMetadata,
  getLearnCategoryMetadata,
  resolveLearnSegment,
} from '@/lib/learn';
import { buildArticlePageJsonLd } from '@/lib/learn/article-seo';
import { getCategoryPageJsonLd } from '@/lib/learn/taxonomy';
import { parseLearnSearchParams } from '@/lib/learn/search';
import { asJsonLdGraph } from '@/lib/seo/schema';

type LearnSegmentPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Unified `/learn/[slug]` resolver — Documents 15.01 + 15.02 + 15.05.
 * Categories and published articles only. Drafts never render publicly.
 * Filtered category states keep the clean category canonical.
 *
 * force-static: articles/categories are prerendered. Category filter query
 * strings are applied client-side so searchParams does not force dynamic SSR.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  const categories = getLearnCategorySlugs(false).map((slug) => ({ slug }));
  const articles = getPublishedLearnArticleSlugs().map((slug) => ({ slug }));
  return [...categories, ...articles];
}

export async function generateMetadata({
  params,
}: LearnSegmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveLearnSegment(slug);
  if (resolved.kind === 'category') {
    // Clean category canonical even when filters are present in the URL.
    return getLearnCategoryMetadata(slug);
  }
  if (resolved.kind === 'article') {
    return getLearnArticlePageMetadata(slug);
  }
  return { robots: { index: false, follow: false } };
}

export default async function LearnSegmentPage({ params }: LearnSegmentPageProps) {
  const { slug } = await params;
  const resolved = resolveLearnSegment(slug);

  if (resolved.kind === 'category') {
    const graph = asJsonLdGraph(getCategoryPageJsonLd(resolved.category));
    // Default locked category; client hydrates additional filters from the URL.
    const initialState = parseLearnSearchParams(
      {},
      { lockedCategory: resolved.category.slug },
    ).state;

    return (
      <>
        <JsonLdScript id={`learn-category-jsonld-${slug}`} data={graph} />
        <LearnCategoryView
          category={resolved.category}
          initialState={initialState}
        />
      </>
    );
  }

  if (resolved.kind === 'article') {
    const article = getPublishedArticleBySlug(slug);
    if (!article) {
      notFound();
    }

    const prepared = prepareArticleForRender(article);
    const schemaFaqs = prepared.article.faqs.filter(
      (faq) => faq.schemaEligible === true,
    );
    const graph = asJsonLdGraph(
      buildArticlePageJsonLd(prepared.article, {
        visibleFaqs: schemaFaqs.map((faq) => ({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          schemaEligible: true,
        })),
      }),
    );

    return (
      <>
        <JsonLdScript id={`learn-article-jsonld-${slug}`} data={graph} />
        <ArticlePage article={prepared.article} />
      </>
    );
  }

  notFound();
}
