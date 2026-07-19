/**
 * Topic clusters — Document 16.01.
 */

import type { TopicCluster } from '@/types/content-plan';

export const TOPIC_CLUSTERS: readonly TopicCluster[] = [
  {
    id: 'instagram-growth',
    name: 'Instagram Growth',
    platform: 'instagram',
    description:
      'Follower growth, profile setup, organic vs paid growth, and measurement on Instagram.',
    primaryCategory: 'instagram',
    pillarArticleSlugs: [
      'how-to-get-more-instagram-followers',
      'how-the-instagram-algorithm-works',
    ],
  },
  {
    id: 'instagram-engagement',
    name: 'Instagram Engagement',
    platform: 'instagram',
    description:
      'Likes, comments, views, posting cadence, and engagement quality on Instagram.',
    primaryCategory: 'instagram',
    pillarArticleSlugs: [
      'how-to-increase-instagram-engagement',
      'how-to-get-more-likes-on-instagram',
    ],
  },
  {
    id: 'tiktok-growth',
    name: 'TikTok Growth',
    platform: 'tiktok',
    description:
      'Follower growth, views, likes, and performance measurement on TikTok.',
    primaryCategory: 'tiktok',
    pillarArticleSlugs: [
      'how-to-get-more-tiktok-followers',
      'how-to-get-more-views-on-tiktok',
    ],
  },
  {
    id: 'tiktok-discovery',
    name: 'TikTok Discovery',
    platform: 'tiktok',
    description:
      'Algorithm, TikTok SEO, timing, and troubleshooting low reach.',
    primaryCategory: 'tiktok',
    pillarArticleSlugs: [
      'how-the-tiktok-algorithm-works',
      'tiktok-seo-guide',
    ],
  },
  {
    id: 'facebook-pages',
    name: 'Facebook Pages & Engagement',
    platform: 'facebook',
    description:
      'Page optimization, followers, page likes, post likes, and feed visibility.',
    primaryCategory: 'facebook',
    pillarArticleSlugs: [
      'how-to-get-more-facebook-followers',
      'facebook-page-optimization-guide',
    ],
  },
  {
    id: 'youtube-channel-growth',
    name: 'YouTube Channel Growth',
    platform: 'youtube',
    description:
      'Subscribers, views, SEO, packaging, retention, and channel optimization — without monetization guarantees.',
    primaryCategory: 'youtube',
    pillarArticleSlugs: [
      'how-to-get-more-youtube-subscribers',
      'how-to-get-more-views-on-youtube',
    ],
  },
  {
    id: 'social-media-fundamentals',
    name: 'Social Media Fundamentals',
    platform: 'general',
    description:
      'Beginner strategy, content planning, platform choice, and common growth mistakes.',
    primaryCategory: 'social-media-marketing',
    pillarArticleSlugs: [
      'social-media-growth-strategy-for-beginners',
      'how-to-build-a-social-media-content-plan',
    ],
  },
  {
    id: 'social-media-measurement',
    name: 'Social Media Measurement',
    platform: 'general',
    description:
      'Metrics that matter, ROI framing, and practical reporting without fake statistics.',
    primaryCategory: 'social-media-marketing',
    pillarArticleSlugs: [
      'social-media-metrics-that-matter',
      'how-to-measure-social-media-roi',
    ],
  },
] as const;

export function getTopicClusterById(id: string): TopicCluster | undefined {
  return TOPIC_CLUSTERS.find((cluster) => cluster.id === id);
}

export function getTopicClustersByPlatform(
  platform: TopicCluster['platform'],
): TopicCluster[] {
  return TOPIC_CLUSTERS.filter((cluster) => cluster.platform === platform);
}
