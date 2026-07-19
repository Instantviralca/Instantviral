/**
 * Learn authors adapter — Document 15.01 / 15.03.
 * Learn consumers read from the centralized Author System.
 * Production registry stays empty until real authors are approved.
 */

import {
  getActiveAuthors,
  getAuthorById,
} from '@/lib/authors/getters';
import type { LearnAuthor } from '@/types/learn';
import type { PublicAuthor } from '@/types/author';

function toLearnAuthor(author: PublicAuthor): LearnAuthor {
  return {
    id: author.id,
    name: author.name,
    slug: author.slug,
    bio: author.bio,
    avatarSrc: author.avatar,
    role: author.role,
    active: author.active,
    profilePath: author.profilePath,
  };
}

/** @deprecated Prefer AUTHORS from `@/data/authors`. Kept for Learn compatibility. */
export const LEARN_AUTHORS: readonly LearnAuthor[] = [];

export function getLearnAuthorById(id: string): LearnAuthor | undefined {
  const author = getAuthorById(id);
  return author ? toLearnAuthor(author) : undefined;
}

export function getActiveLearnAuthors(): LearnAuthor[] {
  return getActiveAuthors().map(toLearnAuthor);
}
