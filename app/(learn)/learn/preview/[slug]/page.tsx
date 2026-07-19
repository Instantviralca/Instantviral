import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ArticleNotFound, ArticlePage } from '@/components/learn/article';
import { getLearnArticleRecordBySlug, getLearnCategoryById } from '@/data/learn';
import {
  canAccessArticlePreview,
  getDraftArticleMetadata,
  prepareArticleForRender,
} from '@/lib/learn/article';
import { learnArticlePath } from '@/config/routes';
import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';

type PreviewPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
};

/**
 * Authorized article preview — Document 15.02.
 * Requires LEARN_ARTICLE_PREVIEW_SECRET. Always noindex. Never in sitemap.
 */
export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  return getDraftArticleMetadata(slug);
}

function asPreviewProjection(record: LearnArticleRecord): PublicLearnArticle {
  const category = getLearnCategoryById(record.category);
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt,
    content: record.content,
    blocks: [...record.blocks],
    category: record.category,
    categoryName: category?.name ?? record.category,
    tags: [...record.tags],
    authorId: record.authorId,
    featuredImage: record.featuredImage,
    readingTime: record.readingTime,
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt,
    showModifiedDate: record.showModifiedDate,
    seo: record.seo,
    relatedServices: [...record.relatedServices],
    relatedArticles: [...record.relatedArticles],
    featured: record.featured,
    href: learnArticlePath(record.slug),
    keyTakeaways: [...(record.keyTakeaways ?? [])],
    faqs: [...(record.faqs ?? [])],
    serviceCta: record.serviceCta,
    status: 'published',
  };
}

export default async function LearnArticlePreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!canAccessArticlePreview(token)) {
    notFound();
  }

  const record = getLearnArticleRecordBySlug(slug);
  if (!record) {
    return <ArticleNotFound reason="missing" />;
  }

  const prepared = prepareArticleForRender(asPreviewProjection(record));

  return (
    <>
      <JsonLdScript
        id={`learn-preview-jsonld-${slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: prepared.article.title,
          description: 'Authorized article preview',
        }}
      />
      <ArticlePage article={prepared.article} preview />
    </>
  );
}
