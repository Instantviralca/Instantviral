/**
 * Content repository path helpers — Document 16.01.
 */

import path from 'node:path';

import type { ContentPlanPlatform } from '@/types/content-plan';
import type { ContentRepositoryPlatformFolder } from '@/types/content-design-system';
import { ARTICLE_PACKAGE_FILES } from '@/types/content-design-system';

export const CONTENT_REPOSITORY_ROOT = 'content';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function platformToFolder(
  platform: ContentPlanPlatform,
): ContentRepositoryPlatformFolder {
  if (platform === 'general') return 'marketing';
  return platform;
}

export function isValidArticleSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug.trim());
}

export function getArticlePackageRelativePath(
  platformFolder: ContentRepositoryPlatformFolder,
  slug: string,
): string {
  return path.posix.join(CONTENT_REPOSITORY_ROOT, platformFolder, slug);
}

export function getRequiredPackageFiles(): readonly string[] {
  return ARTICLE_PACKAGE_FILES;
}

export function resolveContentRoot(cwd = process.cwd()): string {
  return path.join(cwd, CONTENT_REPOSITORY_ROOT);
}
