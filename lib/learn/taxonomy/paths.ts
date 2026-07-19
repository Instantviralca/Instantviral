import { LEARN_TAG_PATH_PREFIX } from '@/config/learn-taxonomy';
import { learnCategoryPath, routes } from '@/config/routes';

export function categoryPath(slug: string): string {
  return learnCategoryPath(slug);
}

export function tagPath(slug: string): string {
  return `${LEARN_TAG_PATH_PREFIX}/${slug}`;
}

export function learnIndexPath(): string {
  return routes.learn;
}
