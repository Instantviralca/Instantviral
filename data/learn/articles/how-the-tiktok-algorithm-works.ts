/**
 * Learn article — How the TikTok Algorithm Works.
 * Editorial source: manually written production copy (TikTok Article #3).
 *
 * Related cluster links: growth guide + followers article exist; others pending.
 * Commercial linking: single service card (Buy TikTok Followers) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-the-tiktok-algorithm-works';
const IMG = '/assets/images/learn/how-the-tiktok-algorithm-works' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    order: 1,
    text: "One of TikTok's biggest strengths is that every video has the opportunity to reach new viewers. Unlike platforms that depend heavily on follower count, TikTok evaluates how people respond to individual videos and decides whether those videos deserve wider distribution.",
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    order: 2,
    text: "This means a new creator and an established brand both have the opportunity to appear on the For You feed if their content performs well. However, this doesn't happen randomly. TikTok looks at a range of engagement and relevance signals to understand whether viewers find a video interesting, useful or entertaining.",
  },
  {
    id: 'b-intro-3',
    type: 'paragraph',
    order: 3,
    text: 'Understanding these signals helps creators and businesses build a strategy based on audience behaviour instead of myths or shortcuts.',
  },
  {
    id: 'b-intro-4',
    type: 'paragraph',
    order: 4,
    text: 'This guide explains how the TikTok algorithm works and how you can create videos that are more likely to earn attention over time.',
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
    text: 'What Is the TikTok Algorithm?',
    anchorId: 'what-is-the-tiktok-algorithm',
    order: 6,
  },
  {
    id: 'b-what-1',
    type: 'paragraph',
    order: 7,
    text: 'The TikTok algorithm is the recommendation system that decides which videos appear on each user\'s For You feed.',
  },
  {
    id: 'b-what-2',
    type: 'paragraph',
    order: 8,
    text: "Instead of showing the same content to everyone, TikTok builds a personalised feed based on each user's interests and behaviour.",
  },
  {
    id: 'b-what-3',
    type: 'paragraph',
    order: 9,
    text: 'It considers questions such as:',
  },
  {
    id: 'b-what-list',
    type: 'bulleted_list',
    order: 10,
    items: [
      'What topics does this person usually watch?',
      'Which creators do they engage with?',
      'Which videos do they finish watching?',
      'What do they like, save or share?',
    ],
  },
  {
    id: 'b-what-4',
    type: 'paragraph',
    order: 11,
    text: "Every user's feed is therefore unique.",
  },
  {
    id: 'b-h2-watch',
    type: 'heading',
    headingLevel: 2,
    text: 'Watch Time Is One of the Strongest Signals',
    anchorId: 'watch-time-is-one-of-the-strongest-signals',
    order: 12,
  },
  {
    id: 'b-watch-1',
    type: 'paragraph',
    order: 13,
    text: 'One of the clearest indicators that a video is interesting is whether people continue watching it.',
  },
  {
    id: 'b-watch-2',
    type: 'paragraph',
    order: 14,
    text: 'TikTok pays attention to:',
  },
  {
    id: 'b-watch-list',
    type: 'bulleted_list',
    order: 15,
    items: [
      'Average watch time',
      'Percentage of the video watched',
      'Replays',
      'Video completion rate',
    ],
  },
  {
    id: 'b-watch-3',
    type: 'paragraph',
    order: 16,
    text: 'Videos that keep viewers interested until the end often have a better chance of reaching larger audiences.',
  },
  {
    id: 'b-watch-4',
    type: 'paragraph',
    order: 17,
    text: 'Rather than making videos longer, focus on keeping every second valuable.',
  },
  {
    id: 'b-fig-watch-time',
    type: 'figure',
    order: 18,
    image: {
      src: `${IMG}/tiktok-watch-time-retention.png`,
      alt: 'TikTok watch time and audience retention dashboard showing video completion rate, replay rate and viewing duration analytics.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 19,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h2-engagement',
    type: 'heading',
    headingLevel: 2,
    text: 'Engagement Helps Expand Reach',
    anchorId: 'engagement-helps-expand-reach',
    order: 19,
  },
  {
    id: 'b-engagement-1',
    type: 'paragraph',
    order: 20,
    text: 'Viewer interaction provides additional feedback.',
  },
  {
    id: 'b-engagement-2',
    type: 'paragraph',
    order: 21,
    text: 'Examples include:',
  },
  {
    id: 'b-engagement-list',
    type: 'bulleted_list',
    order: 22,
    items: [
      'Likes',
      'Comments',
      'Shares',
      'Saves',
      'Profile visits',
      'New followers',
    ],
  },
  {
    id: 'b-engagement-3',
    type: 'paragraph',
    order: 23,
    text: 'Meaningful engagement suggests that people found the content useful or entertaining.',
  },
  {
    id: 'b-engagement-4',
    type: 'paragraph',
    order: 24,
    text: 'However, engagement works best when it happens naturally rather than being forced.',
  },
  {
    id: 'b-fig-engagement',
    type: 'figure',
    order: 25,
    image: {
      src: `${IMG}/tiktok-engagement-signals.png`,
      alt: 'Illustration showing TikTok engagement signals including likes, comments, shares, saves and profile visits.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-related-followers',
    type: 'related_article_card',
    order: 26,
    articleSlug: 'how-to-get-more-tiktok-followers',
    label: 'How to Get More TikTok Followers',
    description:
      'Fifteen practical strategies covering content creation, profile optimisation, consistency and analytics.',
  },
  {
    id: 'b-h2-relevance',
    type: 'heading',
    headingLevel: 2,
    text: 'Relevance Matters',
    anchorId: 'relevance-matters',
    order: 26,
  },
  {
    id: 'b-relevance-1',
    type: 'paragraph',
    order: 27,
    text: 'TikTok also tries to understand what your video is about.',
  },
  {
    id: 'b-relevance-2',
    type: 'paragraph',
    order: 28,
    text: 'It uses information from:',
  },
  {
    id: 'b-relevance-list',
    type: 'bulleted_list',
    order: 29,
    items: [
      'Captions',
      'Spoken words',
      'On-screen text',
      'Hashtags',
      'Video topics',
    ],
  },
  {
    id: 'b-relevance-3',
    type: 'paragraph',
    order: 30,
    text: 'The clearer your topic, the easier it is for TikTok to recommend your content to people who are interested in that subject.',
  },
  {
    id: 'b-h2-opening',
    type: 'heading',
    headingLevel: 2,
    text: 'Why the First Few Seconds Matter',
    anchorId: 'why-the-first-few-seconds-matter',
    order: 31,
  },
  {
    id: 'b-opening-1',
    type: 'paragraph',
    order: 32,
    text: 'Many viewers decide quickly whether to continue watching.',
  },
  {
    id: 'b-opening-2',
    type: 'paragraph',
    order: 33,
    text: 'A strong opening can increase:',
  },
  {
    id: 'b-opening-list',
    type: 'bulleted_list',
    order: 34,
    items: [
      'Watch time',
      'Completion rate',
      'Engagement',
    ],
  },
  {
    id: 'b-opening-3',
    type: 'paragraph',
    order: 35,
    text: 'Good hooks include:',
  },
  {
    id: 'b-opening-list-2',
    type: 'bulleted_list',
    order: 36,
    items: [
      'Asking an interesting question',
      'Showing the final result first',
      'Demonstrating something unexpected',
      'Introducing a common problem',
    ],
  },
  {
    id: 'b-opening-4',
    type: 'paragraph',
    order: 37,
    text: 'The goal is to give viewers a reason to stay.',
  },
  {
    id: 'b-h2-consistency',
    type: 'heading',
    headingLevel: 2,
    text: 'Consistency Builds Better Data',
    anchorId: 'consistency-builds-better-data',
    order: 38,
  },
  {
    id: 'b-consistency-1',
    type: 'paragraph',
    order: 39,
    text: "Publishing consistently doesn't automatically improve rankings, but it gives TikTok more opportunities to understand your content and audience.",
  },
  {
    id: 'b-consistency-2',
    type: 'paragraph',
    order: 40,
    text: 'Regular publishing also helps creators identify:',
  },
  {
    id: 'b-consistency-list',
    type: 'bulleted_list',
    order: 41,
    items: [
      'Successful topics',
      'Effective formats',
      'Audience preferences',
      'Better publishing times',
    ],
  },
  {
    id: 'b-consistency-3',
    type: 'paragraph',
    order: 42,
    text: 'Consistency supports long-term improvement.',
  },
  {
    id: 'b-h2-analytics',
    type: 'heading',
    headingLevel: 2,
    text: 'Learn From Analytics',
    anchorId: 'learn-from-analytics',
    order: 43,
  },
  {
    id: 'b-analytics-1',
    type: 'paragraph',
    order: 44,
    text: 'TikTok Analytics provides valuable information including:',
  },
  {
    id: 'b-analytics-list',
    type: 'bulleted_list',
    order: 45,
    items: [
      'Video views',
      'Watch time',
      'Audience retention',
      'Traffic sources',
      'Follower growth',
      'Engagement',
    ],
  },
  {
    id: 'b-analytics-2',
    type: 'paragraph',
    order: 46,
    text: 'Reviewing this data regularly helps you improve future videos instead of relying on assumptions.',
  },
  {
    id: 'b-h2-myths',
    type: 'heading',
    headingLevel: 2,
    text: 'Common Algorithm Myths',
    anchorId: 'common-algorithm-myths',
    order: 47,
  },
  {
    id: 'b-myths-1',
    type: 'paragraph',
    order: 48,
    text: 'Many myths continue to circulate.',
  },
  {
    id: 'b-myths-2',
    type: 'paragraph',
    order: 49,
    text: 'Examples include:',
  },
  {
    id: 'b-h3-myth-posting',
    type: 'heading',
    headingLevel: 3,
    text: 'Myth: You must post several times every day.',
    anchorId: 'myth-you-must-post-several-times-every-day',
    order: 50,
  },
  {
    id: 'b-myth-posting-1',
    type: 'paragraph',
    order: 51,
    text: 'Reality: Consistency and quality matter more than publishing excessive amounts of content.',
  },
  {
    id: 'b-h3-myth-hashtags',
    type: 'heading',
    headingLevel: 3,
    text: 'Myth: Hashtags alone make videos go viral.',
    anchorId: 'myth-hashtags-alone-make-videos-go-viral',
    order: 52,
  },
  {
    id: 'b-myth-hashtags-1',
    type: 'paragraph',
    order: 53,
    text: 'Reality: Hashtags provide context, but valuable content remains the most important factor.',
  },
  {
    id: 'b-h3-myth-large',
    type: 'heading',
    headingLevel: 3,
    text: 'Myth: Only large accounts reach the For You page.',
    anchorId: 'myth-only-large-accounts-reach-the-for-you-page',
    order: 54,
  },
  {
    id: 'b-myth-large-1',
    type: 'paragraph',
    order: 55,
    text: 'Reality: New accounts can also reach large audiences when individual videos perform well.',
  },
  {
    id: 'b-h2-tips',
    type: 'heading',
    headingLevel: 2,
    text: 'Practical Tips',
    anchorId: 'practical-tips',
    order: 56,
  },
  {
    id: 'b-tips-1',
    type: 'paragraph',
    order: 57,
    text: 'Improve your chances of success by:',
  },
  {
    id: 'b-tips-list',
    type: 'bulleted_list',
    order: 58,
    items: [
      'Creating strong openings.',
      'Keeping videos focused.',
      'Publishing consistently.',
      'Reviewing analytics.',
      'Responding to comments.',
      'Testing different formats.',
      'Improving with every upload.',
    ],
  },
  {
    id: 'b-tips-2',
    type: 'paragraph',
    order: 59,
    text: 'Small improvements across many videos usually produce better results than trying to create one viral video.',
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
      '✔ Strong hook',
      '✔ Clear topic',
      '✔ Good lighting',
      '✔ Clear audio',
      '✔ Helpful or entertaining content',
      '✔ Relevant caption',
      '✔ Natural hashtags',
      '✔ Review analytics later',
    ],
  },
  {
    id: 'b-fig-recommendation',
    type: 'figure',
    order: 63,
    image: {
      src: `${IMG}/tiktok-recommendation-system.png`,
      alt: 'TikTok recommendation system illustration showing content categorization, audience matching and For You feed distribution.',
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
    order: 64,
    text: 'The TikTok algorithm rewards content that people genuinely enjoy watching and interacting with.',
  },
  {
    id: 'b-takeaways-2',
    type: 'paragraph',
    order: 65,
    text: 'Instead of trying to outsmart the recommendation system, focus on creating videos that hold attention, encourage meaningful engagement and provide clear value.',
  },
  {
    id: 'b-takeaways-3',
    type: 'paragraph',
    order: 66,
    text: 'Creators who continuously learn from their analytics and improve their content often experience stronger long-term growth.',
  },
  {
    id: 'b-h2-conclusion',
    type: 'heading',
    headingLevel: 2,
    text: 'Conclusion',
    anchorId: 'conclusion',
    order: 67,
  },
  {
    id: 'b-conclusion-1',
    type: 'paragraph',
    order: 68,
    text: 'Understanding the TikTok algorithm is less about learning secret ranking factors and more about understanding your audience.',
  },
  {
    id: 'b-conclusion-2',
    type: 'paragraph',
    order: 69,
    text: 'Every video provides an opportunity to test ideas, learn from performance and improve future content. By creating valuable videos, maintaining consistency and reviewing your analytics, you build a stronger foundation for sustainable TikTok growth.',
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

export const HOW_THE_TIKTOK_ALGORITHM_WORKS_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-the-tiktok-algorithm-works',
  slug: SLUG,
  title:
    'How the TikTok Algorithm Works: A Practical Guide for Creators and Businesses',
  excerpt:
    'Learn how the TikTok algorithm works, what influences video distribution and practical ways to improve visibility through better content and audience engagement.',
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['algorithm', 'marketing', 'creator', 'engagement'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-the-tiktok-algorithm-works.png`,
    alt: 'Illustration explaining how the TikTok algorithm recommends videos using watch time, engagement, audience retention and content relevance.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
  showModifiedDate: false,
  seo: {
    title: 'How the TikTok Algorithm Works | Complete Guide',
    description:
      'Learn how the TikTok algorithm works, what influences video distribution and practical ways to improve visibility through better content and audience engagement.',
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      'How the TikTok Algorithm Works',
      'TikTok Algorithm',
      'TikTok For You Page',
      'TikTok Ranking Factors',
      'TikTok Growth Strategy',
      'TikTok Marketing',
    ],
    ogImage: `${IMG}/how-the-tiktok-algorithm-works.png`,
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'complete-tiktok-growth-guide',
    'how-to-get-more-tiktok-followers',
    'best-time-to-post-on-tiktok',
    'tiktok-seo-guide',
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
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    'The TikTok algorithm rewards content people genuinely enjoy watching and interacting with.',
    'Focus on attention, meaningful engagement and clear value—not trying to outsmart the system.',
    'Creators who learn from analytics and improve continuously often see stronger long-term growth.',
  ],
  faqs: [
    {
      id: 'faq-new-accounts',
      question: 'Does TikTok favour new accounts?',
      answer:
        'New accounts can gain visibility if individual videos perform well, but quality and audience response remain the key factors.',
      schemaEligible: true,
    },
    {
      id: 'faq-watch-time',
      question: 'Is watch time important?',
      answer:
        'Yes. Watch time and audience retention are among the strongest indicators that viewers find your content valuable.',
      schemaEligible: true,
    },
    {
      id: 'faq-hashtags',
      question: 'Should I use hashtags?',
      answer:
        'Relevant hashtags can help categorise content, but they should support quality videos rather than replace them.',
      schemaEligible: true,
    },
    {
      id: 'faq-without-viral',
      question: 'Can I grow without going viral?',
      answer:
        'Yes. Many successful accounts grow steadily through consistent publishing and continuous improvement.',
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
