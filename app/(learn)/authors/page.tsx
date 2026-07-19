import type { Metadata } from 'next';

import { AuthorsIndexView } from '@/components/authors';
import { JsonLdScript } from '@/components/common/json-ld';
import {
  getActiveAuthors,
  getAuthorsIndexJsonLd,
  getAuthorsIndexMetadata,
} from '@/lib/authors';
import { asJsonLdGraph } from '@/lib/seo/schema';

/**
 * Authors index — Document 15.03.
 * Lists active authors only. Empty when registry has none (no placeholders).
 */
export function generateMetadata(): Metadata {
  return getAuthorsIndexMetadata();
}

export default function AuthorsIndexPage() {
  const authors = getActiveAuthors();
  const graph = asJsonLdGraph(getAuthorsIndexJsonLd());

  return (
    <>
      <JsonLdScript id="authors-index-jsonld" data={graph} />
      <AuthorsIndexView authors={authors} />
    </>
  );
}
