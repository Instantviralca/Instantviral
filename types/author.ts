/**
 * Author System types — Document 15.03.
 * Private fields must never leak into PublicAuthor or UI props.
 */

export type AuthorSocialLinks = {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
};

export type AuthorSeoFields = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
};

/**
 * Full author record (registry / server-only).
 * `email` and `internalNotes` are never public.
 */
export type AuthorRecord = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  socialLinks?: AuthorSocialLinks;
  website?: string;
  /** Private — never expose in UI, metadata, or schema. */
  email?: string;
  expertise: readonly string[];
  joinedAt: string;
  active: boolean;
  featured: boolean;
  seo: AuthorSeoFields;
  /** Optional internal-only notes — never public. */
  internalNotes?: string;
};

/**
 * Safe author projection for components, JSON-LD, and client boundaries.
 * Excludes email, internalNotes, and other admin metadata.
 */
export type PublicAuthor = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  socialLinks?: AuthorSocialLinks;
  website?: string;
  expertise: readonly string[];
  joinedAt: string;
  active: boolean;
  featured: boolean;
  seo: AuthorSeoFields;
  /** Computed from published articles only. */
  articleCount: number;
  profilePath: string;
};

export type AuthorValidationIssue = {
  level: 'error' | 'warning';
  field: string;
  message: string;
};

export type AuthorValidationResult = {
  valid: boolean;
  issues: AuthorValidationIssue[];
};
