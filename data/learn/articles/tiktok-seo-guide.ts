/**
 * Learn article — TikTok SEO Guide.
 * Editorial source: manually written production copy (TikTok Article #5).
 *
 * Related cluster links: growth guide, algorithm, best time, followers exist;
 * engagement, common mistakes, likes, views pending.
 * Commercial linking: single service card (Buy TikTok Followers) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'tiktok-seo-guide';
const IMG = '/assets/images/learn/tiktok-seo-guide' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    order: 1,
    text: 'People search inside TikTok for tutorials, reviews and how-tos the same way they use a search engine. Optimizing captions, on-screen text and spoken keywords helps videos rank beyond the For You feed.',
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    order: 2,
    text: 'This shift means that creators and businesses should think about more than simply creating engaging videos. They also need to make their content easier to discover through TikTok Search.',
  },
  {
    id: 'b-intro-3',
    type: 'paragraph',
    order: 3,
    text: 'TikTok SEO is the process of helping the platform understand what your content is about so it can recommend your videos to the right audience. When your videos are clearly optimized, they have a better chance of appearing in relevant search results and continuing to attract viewers long after publication.',
  },
  {
    id: 'b-intro-4',
    type: 'paragraph',
    order: 4,
    text: 'This guide explains practical TikTok SEO techniques that support long-term visibility without relying on shortcuts.',
  },
  {
    id: 'b-related-pillar',
    type: 'related_article_card',
    order: 5,
    articleSlug: 'complete-tiktok-growth-guide',
    label: 'The Complete TikTok Growth Guide',
    description:
      'A full roadmap covering profile optimisation, content strategy, the TikTok algorithm, engagement and long-term growth.',
  },
  {
    id: 'b-h2-what',
    type: 'heading',
    headingLevel: 2,
    text: 'What Is TikTok SEO?',
    anchorId: 'what-is-tiktok-seo',
    order: 6,
  },
  {
    id: 'b-what-1',
    type: 'paragraph',
    order: 7,
    text: 'TikTok SEO is the process of optimizing your videos and profile so TikTok can better understand and categorize your content.',
  },
  {
    id: 'b-what-2',
    type: 'paragraph',
    order: 8,
    text: 'Instead of relying only on hashtags, TikTok evaluates multiple signals, including:',
  },
  {
    id: 'b-what-list',
    type: 'bulleted_list',
    order: 9,
    items: [
      'Spoken words',
      'On-screen text',
      'Video captions',
      'Hashtags',
      'User engagement',
      'Video topic',
      'Audience behaviour',
    ],
  },
  {
    id: 'b-what-3',
    type: 'paragraph',
    order: 10,
    text: 'These signals work together to determine when your videos may appear in search results.',
  },
  {
    id: 'b-related-algorithm',
    type: 'related_article_card',
    order: 11,
    articleSlug: 'how-the-tiktok-algorithm-works',
    label: 'How the TikTok Algorithm Works',
    description:
      'A practical guide to watch time, engagement signals, relevance and how videos reach the For You feed.',
  },
  {
    id: 'b-h2-research',
    type: 'heading',
    headingLevel: 2,
    text: 'Research Keywords Before Creating Videos',
    anchorId: 'research-keywords-before-creating-videos',
    order: 12,
  },
  {
    id: 'b-research-1',
    type: 'paragraph',
    order: 13,
    text: 'Every successful SEO strategy begins with understanding what people are searching for.',
  },
  {
    id: 'b-research-2',
    type: 'paragraph',
    order: 14,
    text: 'Look for questions your audience asks, such as:',
  },
  {
    id: 'b-research-list',
    type: 'bulleted_list',
    order: 15,
    items: [
      'How to...',
      'Best way to...',
      'Beginner guide...',
      'Tips for...',
      'Common mistakes...',
    ],
  },
  {
    id: 'b-research-3',
    type: 'paragraph',
    order: 16,
    text: 'Choosing topics based on search intent helps your content remain useful over time.',
  },
  {
    id: 'b-fig-keyword-research',
    type: 'figure',
    order: 17,
    image: {
      src: `${IMG}/tiktok-keyword-research.png`,
      alt: 'TikTok keyword research with search suggestions, keyword planning, audience intent and content topic discovery.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-spoken',
    type: 'heading',
    headingLevel: 2,
    text: 'Say Your Keywords Naturally',
    anchorId: 'say-your-keywords-naturally',
    order: 18,
  },
  {
    id: 'b-spoken-1',
    type: 'paragraph',
    order: 19,
    text: 'TikTok can recognize spoken language.',
  },
  {
    id: 'b-spoken-2',
    type: 'paragraph',
    order: 20,
    text: 'Mention your primary topic naturally during the video instead of relying only on captions or hashtags.',
  },
  {
    id: 'b-spoken-3',
    type: 'paragraph',
    order: 21,
    text: 'For example, if your video explains TikTok SEO, clearly introduce the topic within the first few seconds.',
  },
  {
    id: 'b-spoken-4',
    type: 'paragraph',
    order: 22,
    text: "This reinforces the video's subject.",
  },
  {
    id: 'b-h2-onscreen',
    type: 'heading',
    headingLevel: 2,
    text: 'Add Relevant On-Screen Text',
    anchorId: 'add-relevant-on-screen-text',
    order: 23,
  },
  {
    id: 'b-onscreen-1',
    type: 'paragraph',
    order: 24,
    text: 'Many successful educational videos include titles or key points directly on screen.',
  },
  {
    id: 'b-onscreen-2',
    type: 'paragraph',
    order: 25,
    text: 'Examples include:',
  },
  {
    id: 'b-onscreen-list',
    type: 'bulleted_list',
    order: 26,
    items: [
      'Step 1',
      'Beginner Guide',
      'Common Mistakes',
      'Tips',
      'Tutorial',
    ],
  },
  {
    id: 'b-onscreen-3',
    type: 'paragraph',
    order: 27,
    text: 'On-screen text helps viewers understand your content while also providing additional context.',
  },
  {
    id: 'b-h2-captions',
    type: 'heading',
    headingLevel: 2,
    text: 'Write Helpful Captions',
    anchorId: 'write-helpful-captions',
    order: 28,
  },
  {
    id: 'b-captions-1',
    type: 'paragraph',
    order: 29,
    text: 'Captions should describe the value of your video.',
  },
  {
    id: 'b-captions-2',
    type: 'paragraph',
    order: 30,
    text: 'Rather than writing only a few emojis, explain:',
  },
  {
    id: 'b-captions-list',
    type: 'bulleted_list',
    order: 31,
    items: [
      'What viewers will learn',
      'Who the video is for',
      'Why it matters',
    ],
  },
  {
    id: 'b-captions-3',
    type: 'paragraph',
    order: 32,
    text: 'Natural language often performs better than keyword stuffing.',
  },
  {
    id: 'b-fig-search-optimization',
    type: 'figure',
    order: 33,
    image: {
      src: `${IMG}/tiktok-search-optimization.png`,
      alt: 'TikTok search optimization with captions, spoken keywords, hashtags, on-screen text and video categorization.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 34,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h2-hashtags',
    type: 'heading',
    headingLevel: 2,
    text: 'Use Hashtags Carefully',
    anchorId: 'use-hashtags-carefully',
    order: 35,
  },
  {
    id: 'b-hashtags-1',
    type: 'paragraph',
    order: 36,
    text: 'Hashtags still help categorize content, but they should support your topic rather than dominate it.',
  },
  {
    id: 'b-hashtags-2',
    type: 'paragraph',
    order: 37,
    text: 'Instead of using every trending hashtag, choose a small number of relevant hashtags that accurately describe your content.',
  },
  {
    id: 'b-hashtags-3',
    type: 'paragraph',
    order: 38,
    text: 'Quality and relevance matter more than quantity.',
  },
  {
    id: 'b-h2-one-topic',
    type: 'heading',
    headingLevel: 2,
    text: 'Create Videos Around One Topic',
    anchorId: 'create-videos-around-one-topic',
    order: 39,
  },
  {
    id: 'b-one-topic-1',
    type: 'paragraph',
    order: 40,
    text: 'Trying to cover multiple unrelated ideas in one video makes it harder for both viewers and TikTok to understand your content.',
  },
  {
    id: 'b-one-topic-2',
    type: 'paragraph',
    order: 41,
    text: 'Each video should answer one primary question or explain one specific topic.',
  },
  {
    id: 'b-one-topic-3',
    type: 'paragraph',
    order: 42,
    text: 'Focused content usually performs better in search.',
  },
  {
    id: 'b-related-followers',
    type: 'related_article_card',
    order: 43,
    articleSlug: 'how-to-get-more-tiktok-followers',
    label: 'How to Get More TikTok Followers',
    description:
      'Fifteen practical strategies covering content creation, profile optimisation, consistency and analytics.',
  },
  {
    id: 'b-h2-authority',
    type: 'heading',
    headingLevel: 2,
    text: 'Build Topic Authority',
    anchorId: 'build-topic-authority',
    order: 44,
  },
  {
    id: 'b-authority-1',
    type: 'paragraph',
    order: 45,
    text: 'TikTok recognizes patterns over time.',
  },
  {
    id: 'b-authority-2',
    type: 'paragraph',
    order: 46,
    text: 'Publishing several videos about the same subject helps establish topical relevance.',
  },
  {
    id: 'b-authority-3',
    type: 'paragraph',
    order: 47,
    text: 'For example:',
  },
  {
    id: 'b-authority-list',
    type: 'bulleted_list',
    order: 48,
    items: [
      'TikTok SEO',
      'TikTok Algorithm',
      'TikTok Analytics',
      'TikTok Growth',
      'TikTok Marketing',
    ],
  },
  {
    id: 'b-authority-4',
    type: 'paragraph',
    order: 49,
    text: 'A content series often performs better than isolated uploads.',
  },
  {
    id: 'b-related-best-time',
    type: 'related_article_card',
    order: 50,
    articleSlug: 'best-time-to-post-on-tiktok',
    label: 'Best Time to Post on TikTok',
    description:
      'How to find the right posting schedule using analytics, audience behaviour and testing.',
  },
  {
    id: 'b-h2-review',
    type: 'heading',
    headingLevel: 2,
    text: 'Review Search Performance',
    anchorId: 'review-search-performance',
    order: 51,
  },
  {
    id: 'b-review-1',
    type: 'paragraph',
    order: 52,
    text: 'Regularly review your analytics.',
  },
  {
    id: 'b-review-2',
    type: 'paragraph',
    order: 53,
    text: 'Look for:',
  },
  {
    id: 'b-review-list',
    type: 'bulleted_list',
    order: 54,
    items: [
      'Search traffic',
      'Watch time',
      'Audience retention',
      'Engagement',
      'Follower growth',
    ],
  },
  {
    id: 'b-review-3',
    type: 'paragraph',
    order: 55,
    text: 'Identify which search-focused videos continue attracting views over time and create similar content.',
  },
  {
    id: 'b-h2-mistakes',
    type: 'heading',
    headingLevel: 2,
    text: 'Common TikTok SEO Mistakes',
    anchorId: 'common-tiktok-seo-mistakes',
    order: 56,
  },
  {
    id: 'b-mistakes-1',
    type: 'paragraph',
    order: 57,
    text: 'Avoid:',
  },
  {
    id: 'b-mistakes-list',
    type: 'bulleted_list',
    order: 58,
    items: [
      'Keyword stuffing',
      'Misleading captions',
      'Irrelevant hashtags',
      'Covering too many topics',
      'Ignoring audience intent',
      'Copying competitors without adding value',
    ],
  },
  {
    id: 'b-mistakes-2',
    type: 'paragraph',
    order: 59,
    text: 'Good SEO improves discoverability, but helpful content remains the foundation.',
  },
  {
    id: 'b-h2-checklist',
    type: 'heading',
    headingLevel: 2,
    text: 'Action Checklist',
    anchorId: 'action-checklist',
    order: 60,
  },
  {
    id: 'b-checklist-1',
    type: 'paragraph',
    order: 61,
    text: 'Before publishing:',
  },
  {
    id: 'b-checklist-list',
    type: 'bulleted_list',
    order: 62,
    items: [
      '✔ Clear topic',
      '✔ Primary keyword spoken naturally',
      '✔ Relevant on-screen text',
      '✔ Helpful caption',
      '✔ Relevant hashtags',
      '✔ Focused video',
      '✔ Review analytics later',
    ],
  },
  {
    id: 'b-fig-search-performance',
    type: 'figure',
    order: 63,
    image: {
      src: `${IMG}/tiktok-search-performance-dashboard.png`,
      alt: 'TikTok search performance dashboard displaying search traffic, keyword rankings, audience retention, video views and.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-takeaways',
    type: 'heading',
    headingLevel: 2,
    text: 'Key Takeaways',
    anchorId: 'key-takeaways',
    order: 64,
  },
  {
    id: 'b-takeaways-1',
    type: 'paragraph',
    order: 65,
    text: 'TikTok SEO is about making your content easier to understand for both viewers and the platform.',
  },
  {
    id: 'b-takeaways-2',
    type: 'paragraph',
    order: 66,
    text: 'When you consistently publish videos around topics your audience actively searches for, you increase the likelihood of long-term visibility.',
  },
  {
    id: 'b-takeaways-3',
    type: 'paragraph',
    order: 67,
    text: 'Search optimization works best when combined with engaging content, strong audience retention and consistent publishing.',
  },
  {
    id: 'b-h2-conclusion',
    type: 'heading',
    headingLevel: 2,
    text: 'Conclusion',
    anchorId: 'conclusion',
    order: 68,
  },
  {
    id: 'b-conclusion-1',
    type: 'paragraph',
    order: 69,
    text: 'TikTok has become an important discovery platform where search plays a growing role in how people find useful content.',
  },
  {
    id: 'b-conclusion-2',
    type: 'paragraph',
    order: 70,
    text: 'By researching topics, creating focused videos and using keywords naturally throughout your content, you can improve your chances of appearing in relevant search results.',
  },
  {
    id: 'b-conclusion-3',
    type: 'paragraph',
    order: 71,
    text: 'Rather than chasing trends alone, build a library of helpful videos that continue attracting viewers long after they are published.',
  },
];

const PLAIN_CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list') return block.items.join(' ');
  if (block.type === 'numbered_list') return block.items.join(' ');
  return '';
})
  .filter(Boolean)
  .join('\n\n');

function estimateWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const WORD_COUNT = estimateWords(PLAIN_CONTENT);
const READING_TIME = Math.max(1, Math.ceil(WORD_COUNT / 200));

export const TIKTOK_SEO_GUIDE_ARTICLE: LearnArticleRecord = {
  id: 'learn-tiktok-seo-guide',
  slug: SLUG,
  title: 'TikTok SEO Guide: How to Rank Higher in TikTok Search',
  excerpt:
    'Learn how TikTok SEO works and discover practical strategies to optimize your videos, captions, keywords and profile for better search visibility.',
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['seo', 'search', 'marketing', 'growth'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/tiktok-seo-guide.png`,
    alt: 'TikTok SEO optimization with keyword research, search rankings, video optimization, captions and analytics dashboard.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
  showModifiedDate: false,
  seo: {
    title: 'TikTok SEO Guide | How to Rank Higher in TikTok Search',
    description:
      'Learn how TikTok SEO works and discover practical strategies to optimize your videos, captions, keywords and profile for better search visibility.',
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      'TikTok SEO',
      'TikTok Search SEO',
      'TikTok Search Ranking',
      'TikTok Keywords',
      'Rank on TikTok',
      'TikTok Search Optimization',
    ],
    ogImage: `${IMG}/tiktok-seo-guide.png`,
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'complete-tiktok-growth-guide',
    'how-the-tiktok-algorithm-works',
    'best-time-to-post-on-tiktok',
    'how-to-get-more-tiktok-followers',
    'how-to-increase-tiktok-engagement',
    'how-to-get-more-tiktok-likes',
    'how-to-get-more-tiktok-views',
    'common-tiktok-growth-mistakes',
    'tiktok-for-business',
    'tiktok-marketing-for-small-businesses',
    'how-to-create-a-tiktok-content-calendar',
    'tiktok-content-ideas-for-businesses',
    'organic-vs-paid-tiktok-growth',
    'how-to-build-trust-on-tiktok',
    'tiktok-marketing-mistakes-businesses-should-avoid'
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    'TikTok SEO is about making your content easier to understand for both viewers and the platform.',
    'Consistently publishing around topics your audience searches for supports long-term visibility.',
    'Search optimization works best with engaging content, strong retention and consistent publishing.',
  ],
  faqs: [
    {
      id: 'faq-tiktok-has-seo',
      question: 'Does TikTok have SEO?',
      answer:
        'Yes. TikTok uses information such as captions, spoken words, on-screen text and engagement signals to understand and recommend videos.',
      schemaEligible: true,
    },
    {
      id: 'faq-hashtags-enough',
      question: 'Are hashtags enough for TikTok SEO?',
      answer:
        'No. Hashtags help categorize content, but video quality, relevance and audience engagement remain equally important.',
      schemaEligible: true,
    },
    {
      id: 'faq-repeat-keywords',
      question: 'Should I repeat keywords many times?',
      answer:
        'No. Use keywords naturally. Overusing them can reduce the quality of your content.',
      schemaEligible: true,
    },
    {
      id: 'faq-older-videos-search',
      question: 'Can older TikTok videos appear in search?',
      answer:
        'Yes. Helpful videos can continue appearing in TikTok search results long after publication if they remain relevant.',
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-tiktok-followers',
    label: 'Explore TikTok Followers Packages',
    description:
      'Compare real follower packages on InstantViral.ca when you are ready to support profile growth.',
  },
};
