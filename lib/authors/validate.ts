/**
 * Author validation — Document 15.03.
 */

import type {
  AuthorRecord,
  AuthorValidationIssue,
  AuthorValidationResult,
} from '@/types/author';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateAuthor(author: AuthorRecord): AuthorValidationResult {
  const issues: AuthorValidationIssue[] = [];

  if (!author.id.trim()) {
    issues.push({ level: 'error', field: 'id', message: 'Author id is required.' });
  }
  if (!author.name.trim()) {
    issues.push({ level: 'error', field: 'name', message: 'Author name is required.' });
  }
  if (!author.slug.trim() || !SLUG_PATTERN.test(author.slug)) {
    issues.push({
      level: 'error',
      field: 'slug',
      message: 'Author slug must be lowercase kebab-case.',
    });
  }
  if (!author.role.trim()) {
    issues.push({ level: 'error', field: 'role', message: 'Author role is required.' });
  }
  if (!author.bio.trim() || author.bio.trim().length < 40) {
    issues.push({
      level: 'warning',
      field: 'bio',
      message: 'Author bio should be at least 40 characters for E-E-A-T.',
    });
  }
  if (!author.seo.title.trim() || !author.seo.description.trim()) {
    issues.push({
      level: 'error',
      field: 'seo',
      message: 'Author SEO title and description are required.',
    });
  }
  if (author.seo.canonicalPath !== `/authors/${author.slug}`) {
    issues.push({
      level: 'error',
      field: 'seo.canonicalPath',
      message: 'Canonical path must match /authors/{slug}.',
    });
  }
  if (Number.isNaN(Date.parse(author.joinedAt))) {
    issues.push({
      level: 'error',
      field: 'joinedAt',
      message: 'joinedAt must be a valid ISO date string.',
    });
  }

  return {
    valid: issues.every((issue) => issue.level !== 'error'),
    issues,
  };
}
