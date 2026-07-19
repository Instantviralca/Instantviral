/**
 * Learn article — Instagram SEO Guide.
 * Editorial source: manually written production copy (Article #6).
 *
 * Commercial linking: single service card (Buy Instagram Followers) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'instagram-seo-guide';
const IMG = '/assets/images/learn/instagram-seo-guide' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    order: 1,
    text: "Instagram is no longer just a social networking platform—it has become a search platform where people actively look for businesses, creators, products and educational content. Whether someone searches for a topic, location or creator, Instagram aims to show the most relevant results based on the information available.",
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    order: 2,
    text: "Understanding how Instagram SEO works can help improve your profile's visibility and make it easier for the right audience to discover your content. While great content remains the foundation of growth, optimizing your profile and posts for search gives that content a better chance of being found.",
  },
  {
    id: 'b-related-organic',
    type: 'related_article_card',
    order: 3,
    articleSlug: 'how-to-grow-instagram-followers-organically',
    label: 'How to Grow Instagram Followers Organically',
    description:
      'A complete beginner guide to profile optimization, content planning and sustainable organic growth.',
  },
  {
    id: 'b-h2-what',
    type: 'heading',
    headingLevel: 2,
    text: 'What Is Instagram SEO?',
    anchorId: 'what-is-instagram-seo',
    order: 4,
  },
  {
    id: 'b-what-1',
    type: 'paragraph',
    order: 5,
    text: "Instagram SEO refers to the process of improving your profile and content so they are easier to discover through Instagram's search features.",
  },
  {
    id: 'b-what-2',
    type: 'paragraph',
    order: 6,
    text: "Unlike traditional search engines, Instagram evaluates signals such as profile information, captions, hashtags, user engagement and account relevance to decide which results appear first.",
  },
  {
    id: 'b-what-3',
    type: 'paragraph',
    order: 7,
    text: "The goal isn't to manipulate rankings but to clearly communicate what your account is about.",
  },
  {
    id: 'b-related-algorithm',
    type: 'related_article_card',
    order: 8,
    articleSlug: 'instagram-algorithm-explained',
    label: 'Instagram Algorithm Explained',
    description:
      'Learn how Feed, Reels, Explore and Stories recommendation systems affect content discovery.',
  },
  {
    id: 'b-h2-profile',
    type: 'heading',
    headingLevel: 2,
    text: 'Optimize Your Profile for Search',
    anchorId: 'optimize-your-profile-for-search',
    order: 9,
  },
  {
    id: 'b-profile-1',
    type: 'paragraph',
    order: 10,
    text: 'Your profile provides Instagram with important information about your account.',
  },
  {
    id: 'b-profile-2',
    type: 'paragraph',
    order: 11,
    text: 'Focus on:',
  },
  {
    id: 'b-profile-list',
    type: 'bulleted_list',
    order: 12,
    items: [
      'A recognizable username',
      'A clear display name',
      'A concise bio describing your niche',
      'A professional profile image',
      'A relevant website link',
    ],
  },
  {
    id: 'b-profile-3',
    type: 'paragraph',
    order: 13,
    text: 'When someone searches for topics related to your niche, these profile elements help Instagram understand your account.',
  },
  {
    id: 'b-fig-profile-seo',
    type: 'figure',
    order: 14,
    image: {
      src: `${IMG}/instagram-profile-seo.png`,
      alt: 'Instagram profile SEO illustration showing optimized username, display name, bio, profile photo and website link.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 15,
    serviceSlug: 'buy-instagram-followers',
    label: 'Buy Instagram Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h2-keywords',
    type: 'heading',
    headingLevel: 2,
    text: 'Use Natural Keywords',
    anchorId: 'use-natural-keywords',
    order: 15,
  },
  {
    id: 'b-keywords-1',
    type: 'paragraph',
    order: 16,
    text: 'Many creators overlook the importance of keywords.',
  },
  {
    id: 'b-keywords-2',
    type: 'paragraph',
    order: 17,
    text: 'Include relevant words naturally in:',
  },
  {
    id: 'b-keywords-list',
    type: 'bulleted_list',
    order: 18,
    items: [
      'Your display name',
      'Bio',
      'Captions',
      'Image descriptions (where appropriate)',
    ],
  },
  {
    id: 'b-keywords-3',
    type: 'paragraph',
    order: 19,
    text: 'Avoid repeating the same phrase excessively. Write naturally for readers first.',
  },
  {
    id: 'b-fig-keyword-strategy',
    type: 'figure',
    order: 20,
    image: {
      src: `${IMG}/instagram-keyword-strategy.png`,
      alt: 'Instagram keyword strategy dashboard showing captions, hashtags, search terms and content optimization.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-captions',
    type: 'heading',
    headingLevel: 2,
    text: 'Write Helpful Captions',
    anchorId: 'write-helpful-captions',
    order: 21,
  },
  {
    id: 'b-captions-1',
    type: 'paragraph',
    order: 21,
    text: 'Captions do more than encourage engagement—they also provide context.',
  },
  {
    id: 'b-captions-2',
    type: 'paragraph',
    order: 22,
    text: 'Instead of short generic captions, explain:',
  },
  {
    id: 'b-captions-list',
    type: 'bulleted_list',
    order: 23,
    items: [
      'What the post is about',
      'Why it matters',
      'What viewers can learn',
      'Any helpful tips or insights',
    ],
  },
  {
    id: 'b-captions-3',
    type: 'paragraph',
    order: 24,
    text: 'Clear, informative captions improve both user experience and content relevance.',
  },
  {
    id: 'b-related-best-time',
    type: 'related_article_card',
    order: 25,
    articleSlug: 'best-time-to-post-on-instagram',
    label: 'Best Time to Post on Instagram',
    description:
      'Identify the best posting times using Insights, testing and a consistent publishing schedule.',
  },
  {
    id: 'b-h2-hashtags',
    type: 'heading',
    headingLevel: 2,
    text: 'Use Relevant Hashtags',
    anchorId: 'use-relevant-hashtags',
    order: 26,
  },
  {
    id: 'b-hashtags-1',
    type: 'paragraph',
    order: 27,
    text: 'Hashtags continue to help organize content.',
  },
  {
    id: 'b-hashtags-2',
    type: 'paragraph',
    order: 28,
    text: 'Rather than choosing only the most popular hashtags, combine:',
  },
  {
    id: 'b-hashtags-list',
    type: 'bulleted_list',
    order: 29,
    items: [
      'Broad industry hashtags',
      'Topic-specific hashtags',
      'Niche community hashtags',
    ],
  },
  {
    id: 'b-hashtags-3',
    type: 'paragraph',
    order: 30,
    text: 'Only use hashtags that accurately describe the content.',
  },
  {
    id: 'b-h2-quality',
    type: 'heading',
    headingLevel: 2,
    text: 'Improve Content Quality',
    anchorId: 'improve-content-quality',
    order: 31,
  },
  {
    id: 'b-quality-1',
    type: 'paragraph',
    order: 32,
    text: 'Instagram aims to recommend content that people enjoy.',
  },
  {
    id: 'b-quality-2',
    type: 'paragraph',
    order: 33,
    text: 'Focus on creating posts that are:',
  },
  {
    id: 'b-quality-list',
    type: 'bulleted_list',
    order: 34,
    items: [
      'Original',
      'Helpful',
      'Easy to understand',
      'Visually appealing',
      'Relevant to your audience',
    ],
  },
  {
    id: 'b-quality-3',
    type: 'paragraph',
    order: 35,
    text: 'High-quality content often generates stronger engagement, which supports discoverability.',
  },
  {
    id: 'b-h2-engagement',
    type: 'heading',
    headingLevel: 2,
    text: 'Encourage Meaningful Engagement',
    anchorId: 'encourage-meaningful-engagement',
    order: 36,
  },
  {
    id: 'b-engagement-1',
    type: 'paragraph',
    order: 37,
    text: 'Comments, shares and saves provide useful feedback about how audiences interact with content.',
  },
  {
    id: 'b-engagement-2',
    type: 'paragraph',
    order: 38,
    text: 'Encourage discussion by:',
  },
  {
    id: 'b-engagement-list',
    type: 'bulleted_list',
    order: 39,
    items: [
      'Asking thoughtful questions',
      'Inviting opinions',
      'Responding to comments',
      'Creating educational content',
    ],
  },
  {
    id: 'b-engagement-3',
    type: 'paragraph',
    order: 40,
    text: 'Meaningful interactions are generally more valuable than surface-level engagement.',
  },
  {
    id: 'b-related-mistakes',
    type: 'related_article_card',
    order: 41,
    articleSlug: 'common-instagram-growth-mistakes',
    label: 'Common Instagram Growth Mistakes',
    description:
      'Avoid the most common Instagram growth mistakes and build a stronger long-term presence.',
  },
  {
    id: 'b-h2-branding',
    type: 'heading',
    headingLevel: 2,
    text: 'Keep Your Branding Consistent',
    anchorId: 'keep-your-branding-consistent',
    order: 42,
  },
  {
    id: 'b-branding-1',
    type: 'paragraph',
    order: 43,
    text: 'Consistency makes your content easier to recognize.',
  },
  {
    id: 'b-branding-2',
    type: 'paragraph',
    order: 44,
    text: 'Use a similar style across:',
  },
  {
    id: 'b-branding-list',
    type: 'bulleted_list',
    order: 45,
    items: [
      'Colours',
      'Visual design',
      'Editing style',
      'Tone of voice',
      'Content topics',
    ],
  },
  {
    id: 'b-branding-3',
    type: 'paragraph',
    order: 46,
    text: 'A consistent brand identity helps visitors quickly understand your content.',
  },
  {
    id: 'b-h2-insights',
    type: 'heading',
    headingLevel: 2,
    text: 'Review Instagram Insights',
    anchorId: 'review-instagram-insights',
    order: 47,
  },
  {
    id: 'b-insights-1',
    type: 'paragraph',
    order: 48,
    text: 'Analytics help identify what works.',
  },
  {
    id: 'b-insights-2',
    type: 'paragraph',
    order: 49,
    text: 'Monitor:',
  },
  {
    id: 'b-insights-list',
    type: 'bulleted_list',
    order: 50,
    items: [
      'Search discovery',
      'Reach',
      'Profile visits',
      'Saves',
      'Shares',
      'Engagement rate',
    ],
  },
  {
    id: 'b-insights-3',
    type: 'paragraph',
    order: 51,
    text: 'Reviewing this data regularly helps you refine your content strategy over time.',
  },
  {
    id: 'b-h2-mistakes',
    type: 'heading',
    headingLevel: 2,
    text: 'Common Instagram SEO Mistakes',
    anchorId: 'common-instagram-seo-mistakes',
    order: 52,
  },
  {
    id: 'b-mistakes-1',
    type: 'paragraph',
    order: 53,
    text: 'Avoid these common issues:',
  },
  {
    id: 'b-mistakes-list',
    type: 'bulleted_list',
    order: 54,
    items: [
      'Keyword stuffing',
      'Irrelevant hashtags',
      'Incomplete profiles',
      'Generic captions',
      'Inconsistent posting',
      'Ignoring analytics',
    ],
  },
  {
    id: 'b-mistakes-2',
    type: 'paragraph',
    order: 55,
    text: 'Improving these areas creates a stronger foundation for long-term visibility.',
  },
  {
    id: 'b-fig-search-analytics',
    type: 'figure',
    order: 56,
    image: {
      src: `${IMG}/instagram-search-analytics.png`,
      alt: 'Instagram search analytics dashboard displaying profile visits, search impressions, reach and engagement metrics.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-conclusion',
    type: 'heading',
    headingLevel: 2,
    text: 'Conclusion',
    anchorId: 'conclusion',
    order: 57,
  },
  {
    id: 'b-conclusion-1',
    type: 'paragraph',
    order: 58,
    text: 'Instagram SEO is about making your profile and content easier for both users and Instagram to understand. By optimizing your profile, using relevant keywords naturally, writing informative captions and publishing valuable content consistently, you improve your chances of being discovered through Instagram Search.',
  },
  {
    id: 'b-conclusion-2',
    type: 'paragraph',
    order: 59,
    text: 'Instead of chasing shortcuts, focus on creating a clear, helpful and well-structured presence that serves your audience over time.',
  },
];

const PLAIN_CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list') return block.items.join(' ');
  return '';
})
  .filter(Boolean)
  .join('\n\n');

function estimateWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const WORD_COUNT = estimateWords(PLAIN_CONTENT);
const READING_TIME = Math.max(1, Math.ceil(WORD_COUNT / 200));

export const INSTAGRAM_SEO_GUIDE_ARTICLE: LearnArticleRecord = {
  id: 'learn-instagram-seo-guide',
  slug: SLUG,
  title: 'Instagram SEO: How to Rank Higher in Instagram Search',
  excerpt:
    'Learn how Instagram SEO works and discover practical ways to improve your visibility in Instagram Search using profile optimization, keywords, captions and content strategy.',
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['algorithm', 'marketing', 'engagement', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/instagram-seo-guide.png`,
    alt: 'Illustration showing Instagram SEO with profile optimization, keyword strategy, search visibility and content discovery analytics.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
  showModifiedDate: false,
  seo: {
    title: 'Instagram SEO Guide | How to Rank Higher in Instagram Search',
    description:
      'Learn how Instagram SEO works and discover practical ways to improve your visibility in Instagram Search using profile optimization, keywords, captions and content strategy.',
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      'Instagram SEO Guide',
      'Instagram SEO',
      'Instagram Search',
      'Rank Higher on Instagram',
      'Instagram Keywords',
      'Instagram Discoverability',
    ],
    ogImage: `${IMG}/instagram-seo-guide.png`,
  },
  relatedServices: ['buy-instagram-followers'],
  relatedArticles: [
    'how-to-grow-instagram-followers-organically',
    'instagram-algorithm-explained',
    'best-time-to-post-on-instagram',
    'common-instagram-growth-mistakes',
    'how-to-use-instagram-hashtags-effectively',
    'how-to-increase-instagram-engagement',
    'how-to-get-more-instagram-likes',
    'complete-instagram-growth-guide',
    'how-to-use-instagram-for-business',
    'instagram-marketing-for-small-businesses',
    'how-to-create-an-instagram-content-calendar',
    'instagram-content-ideas-for-businesses',
    'organic-vs-paid-instagram-growth',
    'how-to-build-trust-on-instagram',
    'instagram-marketing-mistakes-businesses-should-avoid',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    'Instagram SEO is communicating your niche clearly through profile, captions and hashtags.',
    'Natural keywords and helpful captions beat keyword stuffing or irrelevant tags.',
    'Quality content plus meaningful engagement remain the foundation of search visibility.',
  ],
  faqs: [
    {
      id: 'faq-uses-keywords',
      question: 'Does Instagram use keywords?',
      answer:
        'Yes. Instagram uses information from profiles, captions and other signals to understand what content is about and help match it with relevant searches.',
      schemaEligible: true,
    },
    {
      id: 'faq-keywords-bio',
      question: 'Should I add keywords to my bio?',
      answer:
        "A clear bio with relevant, natural keywords can help explain your account's focus. Avoid stuffing your bio with repeated phrases.",
      schemaEligible: true,
    },
    {
      id: 'faq-hashtags-seo',
      question: 'Are hashtags still useful for Instagram SEO?',
      answer:
        'Relevant hashtags can still help categorize content, especially when they accurately reflect the topic of your post.',
      schemaEligible: true,
    },
    {
      id: 'faq-seo-vs-quality',
      question: 'Can Instagram SEO replace quality content?',
      answer:
        'No. SEO helps people discover your content, but long-term success still depends on creating valuable posts that people want to engage with.',
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-instagram-followers',
    label: 'Explore Instagram Followers Packages',
    description:
      'Compare real follower packages on InstantViral.ca when you are ready to support profile growth.',
  },
};
