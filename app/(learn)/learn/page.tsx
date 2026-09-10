import { LearnIndexView } from '@/components/learn';
import { JsonLdScript } from '@/components/common/json-ld';
import { routes } from '@/config/routes';
import {
  buildLearnDiscoveryMetadata,
  parseLearnSearchParams,
} from '@/lib/learn/search';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { collectionPageSchema } from '@/schemas/website';
import { learnIndexMetadata } from '@/seo/metadata';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import type { Metadata } from 'next';

/**
 * Learn Center index — Documents 15.01 + 15.05.
 * Filtered query states keep the clean /learn canonical.
 * Client hydrates filters from the URL; server stays static-friendly.
 */
export const dynamic = 'force-static';

function resolveMetadataTitle(title: Metadata['title'], fallback: string): string {
  if (typeof title === 'string' && title.trim()) return title;
  if (title && typeof title === 'object') {
    if ('absolute' in title && typeof title.absolute === 'string' && title.absolute.trim()) {
      return title.absolute;
    }
    if ('default' in title && typeof title.default === 'string' && title.default.trim()) {
      return title.default;
    }
  }
  return fallback;
}

export async function generateMetadata() {
  const base = learnIndexMetadata();
  const title = resolveMetadataTitle(base.title, titles.learnIndex());
  const description =
    typeof base.description === 'string' && base.description.trim()
      ? base.description
      : descriptions.learnIndex();

  return buildLearnDiscoveryMetadata({
    title,
    description,
    basePath: routes.learn,
    pathname: routes.learn,
  });
}

export default async function LearnIndexPage() {
  const initialState = parseLearnSearchParams({}).state;
  const graph = asJsonLdGraph([
    collectionPageSchema({
      title: titles.learnIndex(),
      description: descriptions.learnIndex(),
      path: routes.learn,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: 'Learn', href: routes.learn },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="learn-index-jsonld" data={graph} />
      <LearnIndexView initialState={initialState} />
    </>
  );
}
