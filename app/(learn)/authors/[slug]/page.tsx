import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AuthorPageView } from '@/components/authors';
import { JsonLdScript } from '@/components/common/json-ld';
import {
  getAllAuthorSlugsForStaticParams,
  getAuthorArticles,
  getAuthorBySlug,
  getAuthorMetadata,
  getAuthorPageJsonLd,
  getAuthorRelatedCategories,
} from '@/lib/authors';
import { asJsonLdGraph } from '@/lib/seo/schema';

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Author profile — Document 15.03.
 * Only active authors from the shared registry. No fake pages.
 */
export function generateStaticParams() {
  return getAllAuthorSlugsForStaticParams();
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = getAuthorMetadata(slug);
  if (!metadata) {
    return { robots: { index: false, follow: false } };
  }
  return metadata;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const articles = getAuthorArticles(author.id);
  const relatedCategories = getAuthorRelatedCategories(author.id);
  const graph = asJsonLdGraph(getAuthorPageJsonLd(author));

  return (
    <>
      <JsonLdScript id={`author-jsonld-${author.slug}`} data={graph} />
      <AuthorPageView
        author={author}
        articles={articles}
        relatedCategories={relatedCategories}
      />
    </>
  );
}
