/**
 * Public author projection — strips private/admin fields — Document 15.03.
 */

import { authorPath } from '@/lib/authors/paths';
import type { AuthorRecord, PublicAuthor } from '@/types/author';

export function toPublicAuthor(
  record: AuthorRecord,
  articleCount: number,
): PublicAuthor {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    role: record.role,
    bio: record.bio,
    avatar: record.avatar,
    coverImage: record.coverImage,
    socialLinks: record.socialLinks,
    website: record.website,
    expertise: record.expertise,
    joinedAt: record.joinedAt,
    active: record.active,
    featured: record.featured,
    seo: record.seo,
    articleCount,
    profilePath: authorPath(record.slug),
  };
}

/** True if a value looks like a private email leaked into a public payload. */
export function publicAuthorHasPrivateLeak(author: PublicAuthor): boolean {
  const json = JSON.stringify(author);
  return (
    Object.prototype.hasOwnProperty.call(author, 'email') ||
    Object.prototype.hasOwnProperty.call(author, 'internalNotes') ||
    /"email"\s*:/.test(json) ||
    /"internalNotes"\s*:/.test(json)
  );
}
