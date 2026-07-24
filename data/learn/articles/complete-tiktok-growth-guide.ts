/**
 * Learn article — The Complete TikTok Growth Guide (Pillar).
 * Editorial source: manually written production copy (TikTok Article #1).
 *
 * Related TikTok cluster articles not yet published — relatedArticles left empty.
 * Commercial linking: single service card (Buy TikTok Followers) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'complete-tiktok-growth-guide';
const IMG = '/assets/images/learn/complete-tiktok-growth-guide' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    order: 1,
    text: "This complete TikTok growth guide is your roadmap: profile setup, content planning, optimization loops and scaling systems. Metric-specific tactics live in the follower, views, likes and engagement spokes linked below.",
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    order: 2,
    text: 'Sustainable growth is not luck. It comes from understanding how TikTok works, planning content, reviewing performance and improving each loop before you scale spend or posting volume.',
  },
  {
    id: 'b-intro-3',
    type: 'paragraph',
    order: 3,
    text: "Whether you're launching a brand-new account or improving an existing one, use this hub for the full roadmap—then open the followers, views, likes or engagement guides when one metric needs focused work.",
  },
  {
    id: 'b-h2-algorithm',
    type: 'heading',
    headingLevel: 2,
    text: 'Understand How TikTok Works',
    anchorId: 'understand-how-tiktok-works',
    order: 4,
  },
  {
    id: 'b-algorithm-1',
    type: 'paragraph',
    order: 5,
    text: 'TikTok recommends videos based on user behaviour rather than follower count alone. This means every video has an opportunity to reach new audiences if it captures attention and encourages meaningful engagement.',
  },
  {
    id: 'b-algorithm-2',
    type: 'paragraph',
    order: 6,
    text: 'The platform evaluates signals such as:',
  },
  {
    id: 'b-algorithm-list',
    type: 'bulleted_list',
    order: 7,
    items: [
      'Watch time',
      'Video completion rate',
      'Shares',
      'Comments',
      'Likes',
      'Saves',
      'User interests',
    ],
  },
  {
    id: 'b-algorithm-3',
    type: 'paragraph',
    order: 8,
    text: 'Rather than trying to "hack" the algorithm, focus on creating videos that people genuinely enjoy watching.',
  },
  {
    id: 'b-algorithm-continue',
    type: 'related_article_card',
    articleSlug: 'how-the-tiktok-algorithm-works',
    label: 'How the TikTok Algorithm Works',
    description:
      'Learn how the TikTok algorithm ranks videos using watch time, completion rate, engagement and relevance signals.',
    order: 9,
  },
  {
    id: 'b-h2-profile',
    type: 'heading',
    headingLevel: 2,
    text: 'Build a Strong Profile',
    anchorId: 'build-a-strong-profile',
    order: 10,
  },
  {
    id: 'b-profile-1',
    type: 'paragraph',
    order: 11,
    text: 'Your profile is often the first place people visit after discovering one of your videos.',
  },
  {
    id: 'b-profile-2',
    type: 'paragraph',
    order: 12,
    text: 'A professional profile should include:',
  },
  {
    id: 'b-profile-list',
    type: 'bulleted_list',
    order: 13,
    items: [
      'Clear profile photo',
      'Memorable username',
      'Informative bio',
      'Website link (when available)',
      'Consistent branding',
    ],
  },
  {
    id: 'b-profile-3',
    type: 'paragraph',
    order: 14,
    text: 'A complete profile increases credibility and encourages people to follow your account.',
  },
  {
    id: 'b-fig-roadmap',
    type: 'figure',
    order: 15,
    image: {
      src: `${IMG}/tiktok-growth-roadmap.png`,
      alt: 'TikTok growth roadmap with profile setup, content creation, publishing consistency, audience engagement and performance.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 16,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h2-content',
    type: 'heading',
    headingLevel: 2,
    text: 'Create Content People Want to Watch',
    anchorId: 'create-content-people-want-to-watch',
    order: 16,
  },
  {
    id: 'b-content-1',
    type: 'paragraph',
    order: 17,
    text: 'TikTok rewards videos that keep viewers interested.',
  },
  {
    id: 'b-content-2',
    type: 'paragraph',
    order: 18,
    text: 'Successful content often:',
  },
  {
    id: 'b-content-list',
    type: 'bulleted_list',
    order: 19,
    items: [
      'Solves a problem',
      'Educates',
      'Entertains',
      'Inspires',
      'Shows a process',
      'Answers common questions',
    ],
  },
  {
    id: 'b-content-3',
    type: 'paragraph',
    order: 20,
    text: 'Every video should give viewers a reason to keep watching until the end.',
  },
  {
    id: 'b-fig-content-strategy',
    type: 'figure',
    order: 21,
    image: {
      src: `${IMG}/tiktok-content-strategy-framework.png`,
      alt: 'TikTok content strategy framework showing short-form videos, content planning, publishing schedule and engagement.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-consistency',
    type: 'heading',
    headingLevel: 2,
    text: 'Consistency Beats Virality',
    anchorId: 'consistency-beats-virality',
    order: 22,
  },
  {
    id: 'b-consistency-1',
    type: 'paragraph',
    order: 22,
    text: 'Many creators chase one viral video.',
  },
  {
    id: 'b-consistency-2',
    type: 'paragraph',
    order: 23,
    text: 'Successful creators focus on publishing consistently.',
  },
  {
    id: 'b-consistency-3',
    type: 'paragraph',
    order: 24,
    text: 'A realistic publishing schedule helps:',
  },
  {
    id: 'b-consistency-list',
    type: 'bulleted_list',
    order: 25,
    items: [
      'Improve quality',
      'Build audience expectations',
      'Generate more data',
      'Identify successful content patterns',
    ],
  },
  {
    id: 'b-consistency-4',
    type: 'paragraph',
    order: 26,
    text: 'Long-term consistency usually produces better results than relying on occasional viral moments.',
  },
  {
    id: 'b-h2-analytics',
    type: 'heading',
    headingLevel: 2,
    text: 'Learn From Analytics',
    anchorId: 'learn-from-analytics',
    order: 27,
  },
  {
    id: 'b-analytics-1',
    type: 'paragraph',
    order: 28,
    text: 'TikTok Analytics provides valuable insights.',
  },
  {
    id: 'b-analytics-2',
    type: 'paragraph',
    order: 29,
    text: 'Review:',
  },
  {
    id: 'b-analytics-list',
    type: 'bulleted_list',
    order: 30,
    items: [
      'Video views',
      'Average watch time',
      'Audience retention',
      'Traffic sources',
      'Followers gained',
      'Engagement',
    ],
  },
  {
    id: 'b-analytics-3',
    type: 'paragraph',
    order: 31,
    text: 'Use these reports to improve future videos rather than guessing what works.',
  },
  {
    id: 'b-h2-seo',
    type: 'heading',
    headingLevel: 2,
    text: 'Optimise for TikTok Search',
    anchorId: 'optimise-for-tiktok-search',
    order: 32,
  },
  {
    id: 'b-seo-1',
    type: 'paragraph',
    order: 33,
    text: 'TikTok has become a search engine where users actively look for tutorials, reviews and recommendations.',
  },
  {
    id: 'b-seo-2',
    type: 'paragraph',
    order: 34,
    text: 'Improve discoverability by:',
  },
  {
    id: 'b-seo-list',
    type: 'bulleted_list',
    order: 35,
    items: [
      'Using descriptive captions',
      'Speaking important keywords naturally',
      'Including relevant hashtags',
      'Covering topics your audience searches for',
    ],
  },
  {
    id: 'b-seo-3',
    type: 'paragraph',
    order: 36,
    text: 'Search optimisation supports long-term visibility.',
  },
  {
    id: 'b-seo-related',
    type: 'paragraph',
    order: 37,
    text: 'Related Guide: TikTok SEO Guide',
  },
  {
    id: 'b-h2-engagement',
    type: 'heading',
    headingLevel: 2,
    text: 'Encourage Engagement',
    anchorId: 'encourage-engagement',
    order: 38,
  },
  {
    id: 'b-engagement-1',
    type: 'paragraph',
    order: 39,
    text: 'Every interaction sends positive signals.',
  },
  {
    id: 'b-engagement-2',
    type: 'paragraph',
    order: 40,
    text: 'Encourage viewers to:',
  },
  {
    id: 'b-engagement-list',
    type: 'bulleted_list',
    order: 41,
    items: [
      'Leave comments',
      'Share videos',
      'Save useful content',
      'Follow for future videos',
    ],
  },
  {
    id: 'b-engagement-3',
    type: 'paragraph',
    order: 42,
    text: 'Meaningful engagement helps build stronger audience relationships.',
  },
  {
    id: 'b-h2-mistakes',
    type: 'heading',
    headingLevel: 2,
    text: 'Common Growth Mistakes',
    anchorId: 'common-growth-mistakes',
    order: 43,
  },
  {
    id: 'b-mistakes-1',
    type: 'paragraph',
    order: 44,
    text: 'Avoid:',
  },
  {
    id: 'b-mistakes-list',
    type: 'bulleted_list',
    order: 45,
    items: [
      'Publishing inconsistently',
      'Copying trends without adding value',
      'Ignoring analytics',
      'Weak profile optimisation',
      'Low-quality videos',
      'Giving up too early',
    ],
  },
  {
    id: 'b-mistakes-2',
    type: 'paragraph',
    order: 46,
    text: 'Small improvements made consistently usually outperform dramatic changes.',
  },
  {
    id: 'b-mistakes-continue',
    type: 'paragraph',
    order: 47,
    text: 'Continue Reading: Common TikTok Growth Mistakes',
  },
  {
    id: 'b-h2-checklist',
    type: 'heading',
    headingLevel: 2,
    text: 'Growth Checklist',
    anchorId: 'growth-checklist',
    order: 48,
  },
  {
    id: 'b-checklist-1',
    type: 'paragraph',
    order: 49,
    text: 'Before publishing:',
  },
  {
    id: 'b-checklist-list',
    type: 'bulleted_list',
    order: 50,
    items: [
      '✔ Strong opening',
      '✔ Good lighting',
      '✔ Clear audio',
      '✔ Valuable content',
      '✔ Relevant caption',
      '✔ Natural keywords',
      '✔ Audience-focused topic',
      '✔ Clear call-to-action',
    ],
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 51,
    image: {
      src: `${IMG}/tiktok-growth-analytics-dashboard.png`,
      alt: 'TikTok analytics dashboard displaying video views, watch time, audience retention, follower growth and engagement metrics.',
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
    order: 52,
  },
  {
    id: 'b-takeaways-1',
    type: 'paragraph',
    order: 52,
    text: 'TikTok growth depends on consistency, creativity and understanding your audience.',
  },
  {
    id: 'b-takeaways-2',
    type: 'paragraph',
    order: 53,
    text: 'Focus on creating videos that provide value rather than chasing every trend.',
  },
  {
    id: 'b-takeaways-3',
    type: 'paragraph',
    order: 54,
    text: 'As your content library grows, your understanding of what works will improve, helping you build a stronger and more engaged audience over time.',
  },
  {
    id: 'b-h2-conclusion',
    type: 'heading',
    headingLevel: 2,
    text: 'Conclusion',
    anchorId: 'conclusion',
    order: 55,
  },
  {
    id: 'b-conclusion-1',
    type: 'paragraph',
    order: 56,
    text: 'Growing on TikTok requires more than posting videos randomly. Success comes from creating engaging content, understanding audience behaviour and continually improving based on performance data.',
  },
  {
    id: 'b-conclusion-2',
    type: 'paragraph',
    order: 57,
    text: 'By following a structured strategy and focusing on long-term consistency, you can build a TikTok account that attracts viewers, encourages engagement and supports your personal or business goals.',
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

export const COMPLETE_TIKTOK_GROWTH_GUIDE_ARTICLE: LearnArticleRecord = {
  id: 'learn-complete-tiktok-growth-guide',
  slug: SLUG,
  title:
    'The Complete TikTok Growth Guide: From Your First Video to Building a Loyal Audience',
  excerpt:
    'Learn how to grow on TikTok with this complete guide covering profile optimization, content strategy, the TikTok algorithm, audience engagement and long-term growth.',
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['marketing', 'creator', 'engagement', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/complete-tiktok-growth-guide.png`,
    alt: 'Complete TikTok growth strategy with profile optimization, video content planning, audience growth, engagement analytics and.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
  showModifiedDate: false,
  seo: {
    title: 'Complete TikTok Growth Guide | Build a Successful TikTok Presence',
    description:
      'Learn how to grow on TikTok with this complete guide covering profile optimization, content strategy, the TikTok algorithm, audience engagement and long-term growth.',
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      'TikTok Growth Guide',
      'Complete TikTok Roadmap',
      'TikTok Growth Plan',
      'How to Grow on TikTok',
      'TikTok Content Strategy',
      'TikTok Account Optimization',
    ],
    ogImage: `${IMG}/complete-tiktok-growth-guide.png`,
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'how-to-get-more-tiktok-followers',
    'how-the-tiktok-algorithm-works',
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
    'Use this hub as a full TikTok roadmap—profile, content systems, analytics reviews and scaling habits.',
    'Drill into metric spokes when followers, views, likes or engagement need targeted improvement.',
    'Consistency and iterative optimization beat one-off viral attempts for sustainable growth.',
  ],
  faqs: [
    {
      id: 'faq-how-long-tiktok',
      question: 'How long does it typically take to build momentum on TikTok?',
      answer:
        'Results vary by niche and publishing quality, but accounts that improve hooks and retention each week usually see clearer progress over several months.',
      schemaEligible: true,
    },
    {
      id: 'faq-new-accounts',
      question: 'Does TikTok give early distribution tests to newer creators?',
      answer:
        'TikTok can test new videos with fresh audiences regardless of account age, but sustained growth still depends on retention and engagement quality.',
      schemaEligible: true,
    },
    {
      id: 'faq-only-entertainment',
      question: 'Is TikTok only for entertainment?',
      answer:
        'No. Businesses, educators, creators and professionals all use TikTok to reach and engage their audiences.',
      schemaEligible: true,
    },
    {
      id: 'faq-post-every-day',
      question: 'How often should I publish new TikTok content for long-term growth?',
      answer:
        'Aim for a cadence you can keep for months—often several times a week—while still improving hooks, retention and topic clarity.',
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
