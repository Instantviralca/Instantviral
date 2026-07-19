import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { TagPageView } from '@/components/learn/taxonomy';
import { JsonLdScript } from '@/components/common/json-ld';
import { LEARN_TAG_PAGES_ENABLED } from '@/config/learn-taxonomy';
import {
  getActiveTagSlugsForStaticParams,
  getArticlesByTag,
  getTagBreadcrumbs,
  getTagBySlug,
  getTagMetadata,
  getTagPageJsonLd,
} from '@/lib/learn/taxonomy';
import { asJsonLdGraph } from '@/lib/seo/schema';

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

/**
 * Tag archive — Document 15.04.
 * Architecture prepared for V1. Only active tags render.
 */
export function generateStaticParams() {
  if (!LEARN_TAG_PAGES_ENABLED) return [];
  return getActiveTagSlugsForStaticParams();
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return getTagMetadata(tag);
}

export default async function LearnTagPage({ params }: TagPageProps) {
  if (!LEARN_TAG_PAGES_ENABLED) {
    notFound();
  }

  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag) {
    notFound();
  }

  const articles = getArticlesByTag(tag.slug);
  const breadcrumbs = getTagBreadcrumbs(tag);
  const graph = asJsonLdGraph(getTagPageJsonLd(tag));

  return (
    <>
      <JsonLdScript id={`learn-tag-jsonld-${tag.slug}`} data={graph} />
      <TagPageView tag={tag} articles={articles} breadcrumbs={breadcrumbs} />
    </>
  );
}
