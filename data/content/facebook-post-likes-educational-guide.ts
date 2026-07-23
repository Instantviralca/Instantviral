import type { EducationalGuideContent } from '@/data/content/instagram-educational-guides';

/**
 * Conceptual explain section only — actionable tips live in Best Practices.
 */
export const FACEBOOK_POST_LIKES_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'facebook-post-likes-engagement-guide',
  serviceSlug: 'buy-facebook-post-likes',
  title: 'How Facebook Post Likes Support Social Proof',
  description: '',
  blocks: [
    {
      type: 'prose-split',
      id: 'fb-post-discovery-body',
      illustration: 'facebook-post-likes-analytics',
      intro:
        'Facebook Post Likes act as a public signal that people are interacting with a specific piece of content. A stronger Like count can help important posts appear more active, improve first impressions and encourage additional users to pause, read or respond.',
      sections: [
        {
          id: 'fb-post-why-likes',
          heading: 'Why Post Likes Matter',
          paragraphs: [
            'People often judge a post quickly based on its message, presentation and existing interaction. A post with a clearer Like count may appear more established and can give new viewers greater confidence to review the content.',
          ],
        },
        {
          id: 'fb-post-social-proof',
          heading: 'Social Proof and First Impressions',
          paragraphs: [
            'When someone discovers your update in the feed, engagement metrics are one of the first cues they notice. Post Likes can strengthen that first impression without replacing useful captions, visuals or replies.',
          ],
        },
        {
          id: 'fb-post-vs-page',
          heading: 'How Post Likes Differ From Page Likes',
          paragraphs: [
            'Post Likes measure interaction with one individual post, while Page Likes reflect support for the Facebook page as a whole. This service is intended for specific public posts rather than increasing the page Like count.',
          ],
        },
      ],
    },
  ],
};
