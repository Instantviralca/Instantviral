/**
 * Learn tag registry — Document 15.04.
 * Configurable tags. Articles reference tags by slug.
 */

import type { LearnTag } from '@/types/learn';

export const LEARN_TAGS: readonly LearnTag[] = [
  {
    id: 'tag-followers',
    slug: 'followers',
    name: 'Followers',
    description: 'Guides about growing and retaining followers.',
    active: true,
  },
  {
    id: 'tag-likes',
    slug: 'likes',
    name: 'Likes',
    description: 'Guides about likes, reactions, and social proof.',
    active: true,
  },
  {
    id: 'tag-views',
    slug: 'views',
    name: 'Views',
    description: 'Guides about video and content views.',
    active: true,
  },
  {
    id: 'tag-comments',
    slug: 'comments',
    name: 'Comments',
    description: 'Guides about comments and conversation.',
    active: true,
  },
  {
    id: 'tag-subscribers',
    slug: 'subscribers',
    name: 'Subscribers',
    description: 'Guides about channel and page subscribers.',
    active: true,
  },
  {
    id: 'tag-reels',
    slug: 'reels',
    name: 'Reels',
    description: 'Guides about Instagram Reels and short video.',
    active: true,
  },
  {
    id: 'tag-shorts',
    slug: 'shorts',
    name: 'Shorts',
    description: 'Guides about YouTube Shorts and short-form video.',
    active: true,
  },
  {
    id: 'tag-algorithm',
    slug: 'algorithm',
    name: 'Algorithm',
    description: 'Guides about platform algorithms and distribution.',
    active: true,
  },
  {
    id: 'tag-engagement',
    slug: 'engagement',
    name: 'Engagement',
    description: 'Guides about engagement rate and audience interaction.',
    active: true,
  },
  {
    id: 'tag-creator',
    slug: 'creator',
    name: 'Creator',
    description: 'Guides for creators and personal brands.',
    active: true,
  },
  {
    id: 'tag-business',
    slug: 'business',
    name: 'Business',
    description: 'Guides for business accounts and brands.',
    active: true,
  },
  {
    id: 'tag-marketing',
    slug: 'marketing',
    name: 'Marketing',
    description: 'Guides about marketing strategy and campaigns.',
    active: true,
  },
  {
    id: 'tag-analytics',
    slug: 'analytics',
    name: 'Analytics',
    description: 'Guides about analytics, metrics, and measurement.',
    active: true,
  },
];

export function getLearnTagBySlug(slug: string): LearnTag | undefined {
  return LEARN_TAGS.find((tag) => tag.slug === slug);
}

export function getLearnTagById(id: string): LearnTag | undefined {
  return LEARN_TAGS.find((tag) => tag.id === id);
}

export function getActiveLearnTags(): LearnTag[] {
  return LEARN_TAGS.filter((tag) => tag.active).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getLearnTagSlugs(includeInactive = false): string[] {
  return LEARN_TAGS.filter((tag) => includeInactive || tag.active).map(
    (tag) => tag.slug,
  );
}

export function isLearnTagSlug(slug: string): boolean {
  return LEARN_TAGS.some((tag) => tag.slug === slug);
}
