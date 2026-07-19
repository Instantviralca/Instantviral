/**
 * Author System public API — Document 15.03.
 */

export {
  getAuthorBySlug,
  getAuthorById,
  getAuthorRecordById,
  getAuthorRecordBySlug,
  getActiveAuthors,
  getFeaturedAuthors,
  getAuthorArticles,
  getAuthorRelatedCategories,
  getAuthorsForCategory,
  getAuthorProfilePath,
  getAllAuthorSlugsForStaticParams,
} from '@/lib/authors/getters';
export { toPublicAuthor, publicAuthorHasPrivateLeak } from '@/lib/authors/public';
export { validateAuthor } from '@/lib/authors/validate';
export { getAuthorMetadata, getAuthorsIndexMetadata } from '@/lib/authors/seo';
export {
  getAuthorSchema,
  getAuthorBreadcrumbs,
  getAuthorPageJsonLd,
  getAuthorsIndexJsonLd,
} from '@/lib/authors/schema';
export { authorPath, authorsIndexPath, authorArticlePath } from '@/lib/authors/paths';
