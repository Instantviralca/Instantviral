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
    description:
      'Browse InstantViral Learn guides on growing and retaining followers with practical audience-building tips across major platforms.',
    active: true,
  },
  {
    id: 'tag-likes',
    slug: 'likes',
    name: 'Likes',
    description:
      'Browse InstantViral Learn guides on likes, reactions, and social proof that help posts make a stronger first impression.',
    active: true,
  },
  {
    id: 'tag-views',
    slug: 'views',
    name: 'Views',
    description:
      'Browse InstantViral Learn guides on video and content views, reach, and practical ways to improve watch performance.',
    active: true,
  },
  {
    id: 'tag-comments',
    slug: 'comments',
    name: 'Comments',
    description:
      'Browse InstantViral Learn guides on comments, conversation, and community interaction that supports healthier engagement.',
    active: true,
  },
  {
    id: 'tag-subscribers',
    slug: 'subscribers',
    name: 'Subscribers',
    description:
      'Browse InstantViral Learn guides on growing channel and page subscribers with clearer positioning and content habits.',
    active: true,
  },
  {
    id: 'tag-reels',
    slug: 'reels',
    name: 'Reels',
    description:
      'Browse InstantViral Learn guides on Instagram Reels and short video tactics that support discovery and engagement.',
    active: true,
  },
  {
    id: 'tag-shorts',
    slug: 'shorts',
    name: 'Shorts',
    description:
      'Browse InstantViral Learn guides on YouTube Shorts and short-form video strategy for channel discovery and retention.',
    active: true,
  },
  {
    id: 'tag-algorithm',
    slug: 'algorithm',
    name: 'Algorithm',
    description:
      'Browse InstantViral Learn guides explaining platform algorithms, distribution signals, and what creators can control.',
    active: true,
  },
  {
    id: 'tag-engagement',
    slug: 'engagement',
    name: 'Engagement',
    description:
      'Browse InstantViral Learn guides on engagement rate, audience interaction, and habits that support stronger content response.',
    active: true,
  },
  {
    id: 'tag-creator',
    slug: 'creator',
    name: 'Creator',
    description:
      'Browse InstantViral Learn guides for creators and personal brands covering content, consistency, and audience growth.',
    active: true,
  },
  {
    id: 'tag-business',
    slug: 'business',
    name: 'Business',
    description:
      'Browse InstantViral Learn guides for business accounts and brands covering presence, content planning, and social strategy.',
    active: true,
  },
  {
    id: 'tag-marketing',
    slug: 'marketing',
    name: 'Marketing',
    description:
      'Browse InstantViral Learn guides on marketing strategy, campaigns, and cross-platform tactics for social growth.',
    active: true,
  },
  {
    id: 'tag-analytics',
    slug: 'analytics',
    name: 'Analytics',
    description:
      'Browse InstantViral Learn guides on analytics, metrics, and measurement so you can track what growth work is working.',
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
