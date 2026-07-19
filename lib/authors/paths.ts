import { AUTHOR_PATH_PREFIX } from '@/config/authors';
import { routes } from '@/config/routes';

export function authorPath(slug: string): string {
  return `${AUTHOR_PATH_PREFIX}/${slug}`;
}

export function authorArticlePath(articleSlug: string): string {
  return `${routes.learn}/${articleSlug}`;
}

export function authorsIndexPath(): string {
  return AUTHOR_PATH_PREFIX;
}
