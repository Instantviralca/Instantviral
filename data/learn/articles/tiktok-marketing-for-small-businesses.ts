/**
 * Learn article — TikTok Marketing for Small Businesses.
 * Editorial source: manually written production copy (TikTok Business Article #2).

 * Related cluster links: TikTok for Business, growth guide, SEO, engagement, best time exist.
 * Commercial linking: followers, likes and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'tiktok-marketing-for-small-businesses';
const IMG = '/assets/images/learn/tiktok-marketing-for-small-businesses' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    order: 1,
    text: 'Small businesses can use TikTok without influencer budgets or large media teams. Phone videos, local proof and neighborhood offers already help shops reach nearby customers who never see traditional ads.',
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    order: 2,
    text: 'Unlike traditional marketing channels, TikTok allows businesses to compete based on creativity, authenticity and consistency rather than company size. A local coffee shop, clothing store, digital agency or online retailer can all reach thousands of potential customers by creating videos that educate, entertain or solve everyday problems.',
  },
  {
    id: 'b-intro-3',
    type: 'paragraph',
    order: 3,
    text: 'The biggest advantage is that customers increasingly want to see the people behind a business before making a purchase. TikTok gives small businesses an opportunity to show their expertise, products and personality in a way that feels genuine rather than promotional.',
  },
  {
    id: 'b-intro-4',
    type: 'paragraph',
    order: 4,
    text: 'This guide explains how small businesses can build an effective TikTok marketing strategy that supports long-term growth instead of chasing short-term trends.',
  },
  {
    id: 'b-related-business',
    type: 'related_article_card',
    order: 5,
    articleSlug: 'tiktok-for-business',
    label: 'TikTok for Business',
    description:
      'A complete guide to growing your brand on TikTok with goals, profile optimisation, educational content and analytics.',
  },
  {
    id: 'b-h2-why',
    type: 'heading',
    headingLevel: 2,
    text: 'Why Lean TikTok Marketing Works for Local and Neighborhood Brands',
    anchorId: 'why-lean-tiktok-marketing-works-for-local-and-neighborhood-brands',
    order: 6,
  },
  {
    id: 'b-why-1',
    type: 'paragraph',
    order: 7,
    text: 'Marketing budgets are often limited.',
  },
  {
    id: 'b-why-2',
    type: 'paragraph',
    order: 8,
    text: 'TikTok allows businesses to earn visibility through valuable content instead of relying entirely on paid advertising.',
  },
  {
    id: 'b-why-3',
    type: 'paragraph',
    order: 9,
    text: 'Benefits include:',
  },
  {
    id: 'b-why-list',
    type: 'bulleted_list',
    order: 10,
    items: [
      'Increased brand awareness',
      'Low-cost marketing',
      'New customer discovery',
      'Community building',
      'Website traffic',
      'Product education',
      'Stronger customer relationships',
    ],
  },
  {
    id: 'b-why-4',
    type: 'paragraph',
    order: 11,
    text: 'A single useful video can continue attracting viewers for weeks or even months.',
  },
  {
    id: 'b-related-pillar',
    type: 'related_article_card',
    order: 12,
    articleSlug: 'complete-tiktok-growth-guide',
    label: 'The Complete TikTok Growth Guide',
    description:
      'A full roadmap covering profile optimisation, content strategy, the TikTok algorithm, engagement and long-term growth.',
  },
  {
    id: 'b-h2-audience',
    type: 'heading',
    headingLevel: 2,
    text: 'Define Local and Neighborhood Customers First',
    anchorId: 'define-local-and-neighborhood-customers-first',
    order: 13,
  },
  {
    id: 'b-audience-1',
    type: 'paragraph',
    order: 14,
    text: 'Before recording your first video, decide exactly who you want to reach.',
  },
  {
    id: 'b-audience-2',
    type: 'paragraph',
    order: 15,
    text: 'Ask yourself:',
  },
  {
    id: 'b-audience-list',
    type: 'bulleted_list',
    order: 16,
    items: [
      'What problems do customers face?',
      'What questions do they ask?',
      'What products interest them most?',
      'Why would they choose your business?',
    ],
  },
  {
    id: 'b-audience-3',
    type: 'paragraph',
    order: 17,
    text: 'Understanding your audience makes content planning much easier.',
  },
  {
    id: 'b-h2-profile',
    type: 'heading',
    headingLevel: 2,
    text: 'Build a Lean Small-Business TikTok Profile',
    anchorId: 'build-a-lean-small-business-tiktok-profile',
    order: 18,
  },
  {
    id: 'b-profile-1',
    type: 'paragraph',
    order: 19,
    text: 'Your TikTok profile should quickly answer three questions:',
  },
  {
    id: 'b-profile-list-q',
    type: 'bulleted_list',
    order: 20,
    items: [
      'Who are you?',
      'What does your business do?',
      'Why should someone follow you?',
    ],
  },
  {
    id: 'b-profile-2',
    type: 'paragraph',
    order: 21,
    text: 'Include:',
  },
  {
    id: 'b-profile-list',
    type: 'bulleted_list',
    order: 22,
    items: [
      'Business logo or professional profile photo',
      'Clear business description',
      'Website link',
      'Consistent branding',
      'Recognisable username',
    ],
  },
  {
    id: 'b-profile-3',
    type: 'paragraph',
    order: 23,
    text: 'A complete profile increases credibility.',
  },
  {
    id: 'b-fig-profile',
    type: 'figure',
    order: 24,
    image: {
      src: `${IMG}/small-business-tiktok-profile.png`,
      alt: 'Optimized TikTok profile for a small business with branding, bio, website link and professional business identity.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-educational',
    type: 'heading',
    headingLevel: 2,
    text: 'Create Low-Cost Educational Clips',
    anchorId: 'create-low-cost-educational-clips',
    order: 25,
  },
  {
    id: 'b-educational-1',
    type: 'paragraph',
    order: 26,
    text: 'Many businesses make the mistake of posting only promotional videos.',
  },
  {
    id: 'b-educational-2',
    type: 'paragraph',
    order: 27,
    text: 'Instead, teach your audience.',
  },
  {
    id: 'b-educational-3',
    type: 'paragraph',
    order: 28,
    text: 'Examples include:',
  },
  {
    id: 'b-educational-list',
    type: 'bulleted_list',
    order: 29,
    items: [
      'Product tutorials',
      'Industry tips',
      'Frequently asked questions',
      'Buying guides',
      'Customer advice',
      'Problem-solving videos',
    ],
  },
  {
    id: 'b-educational-4',
    type: 'paragraph',
    order: 30,
    text: 'Educational content builds trust before asking people to buy.',
  },
  {
    id: 'b-fig-content-planning',
    type: 'figure',
    order: 31,
    image: {
      src: `${IMG}/small-business-content-planning.png`,
      alt: 'TikTok content planning workflow for small businesses including educational videos, publishing schedule and audience.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-related-seo',
    type: 'related_article_card',
    order: 32,
    articleSlug: 'tiktok-seo-guide',
    label: 'TikTok SEO Guide',
    description:
      'Practical strategies to optimize videos, captions, keywords and profile for better TikTok Search visibility.',
  },
  {
    id: 'b-h2-bts',
    type: 'heading',
    headingLevel: 2,
    text: 'Show Behind-the-Scenes Content',
    anchorId: 'show-behind-the-scenes-content',
    order: 33,
  },
  {
    id: 'b-bts-1',
    type: 'paragraph',
    order: 34,
    text: 'Customers enjoy seeing how businesses operate.',
  },
  {
    id: 'b-bts-2',
    type: 'paragraph',
    order: 35,
    text: 'Ideas include:',
  },
  {
    id: 'b-bts-list',
    type: 'bulleted_list',
    order: 36,
    items: [
      'Packaging orders',
      'Team introductions',
      'Daily operations',
      'Product creation',
      'Office tours',
      'Company milestones',
    ],
  },
  {
    id: 'b-bts-3',
    type: 'paragraph',
    order: 37,
    text: 'These videos make your business feel more authentic.',
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 38,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h2-questions',
    type: 'heading',
    headingLevel: 2,
    text: 'Answer Customer Questions',
    anchorId: 'answer-customer-questions',
    order: 39,
  },
  {
    id: 'b-questions-1',
    type: 'paragraph',
    order: 40,
    text: 'Every customer question can become a video.',
  },
  {
    id: 'b-questions-2',
    type: 'paragraph',
    order: 41,
    text: 'For example:',
  },
  {
    id: 'b-questions-list',
    type: 'bulleted_list',
    order: 42,
    items: [
      'How does this product work?',
      "What's included?",
      'How long does delivery take?',
      'Which option is best?',
      'What makes your business different?',
    ],
  },
  {
    id: 'b-questions-3',
    type: 'paragraph',
    order: 43,
    text: 'Answering common questions positions your business as a helpful resource.',
  },
  {
    id: 'b-h2-consistency',
    type: 'heading',
    headingLevel: 2,
    text: 'Build Trust Through Consistency',
    anchorId: 'build-trust-through-consistency',
    order: 44,
  },
  {
    id: 'b-consistency-1',
    type: 'paragraph',
    order: 45,
    text: 'Posting regularly is more effective than uploading many videos one week and disappearing the next.',
  },
  {
    id: 'b-consistency-2',
    type: 'paragraph',
    order: 46,
    text: 'Choose a realistic publishing schedule.',
  },
  {
    id: 'b-consistency-3',
    type: 'paragraph',
    order: 47,
    text: 'Examples:',
  },
  {
    id: 'b-consistency-list',
    type: 'bulleted_list',
    order: 48,
    items: [
      'Three videos each week',
      'Monday–Wednesday–Friday',
      'One short educational video every weekday',
    ],
  },
  {
    id: 'b-consistency-4',
    type: 'paragraph',
    order: 49,
    text: 'Consistency builds familiarity and helps your audience know when to expect new content.',
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
    id: 'b-h2-analytics',
    type: 'heading',
    headingLevel: 2,
    text: 'Track Results Without a Big Analytics Team',
    anchorId: 'track-results-without-a-big-analytics-team',
    order: 51,
  },
  {
    id: 'b-analytics-1',
    type: 'paragraph',
    order: 52,
    text: 'Instead of guessing, review your results.',
  },
  {
    id: 'b-analytics-2',
    type: 'paragraph',
    order: 53,
    text: 'Monitor:',
  },
  {
    id: 'b-analytics-list',
    type: 'bulleted_list',
    order: 54,
    items: [
      'Video views',
      'Audience retention',
      'Website clicks',
      'Follower growth',
      'Engagement rate',
      'Profile visits',
    ],
  },
  {
    id: 'b-analytics-3',
    type: 'paragraph',
    order: 55,
    text: 'Identify patterns in your strongest-performing content and apply those lessons to future videos.',
  },
  {
    id: 'b-related-engagement',
    type: 'related_article_card',
    order: 56,
    articleSlug: 'how-to-increase-tiktok-engagement',
    label: 'How to Increase TikTok Engagement',
    description:
      'Practical strategies that improve watch time, comments, shares, saves and audience interaction.',
  },
  {
    id: 'b-svc-likes',
    type: 'related_service_card',
    order: 57,
    serviceSlug: 'buy-tiktok-likes',
    label: 'Buy TikTok Likes Canada',
    description:
      'Review like packages when you want to strengthen early engagement on high-value videos.',
  },
  {
    id: 'b-h2-expert',
    type: 'heading',
    headingLevel: 2,
    text: 'Expert Tips',
    anchorId: 'expert-tips',
    order: 58,
  },
  {
    id: 'b-expert-1',
    type: 'paragraph',
    order: 59,
    text: 'Businesses that consistently grow on TikTok usually:',
  },
  {
    id: 'b-expert-list',
    type: 'bulleted_list',
    order: 60,
    items: [
      'Focus on customer problems.',
      'Publish educational content.',
      'Build a recognisable brand style.',
      'Reply to comments quickly.',
      'Improve one element of every new upload.',
    ],
  },
  {
    id: 'b-expert-2',
    type: 'paragraph',
    order: 61,
    text: 'Long-term consistency is more valuable than chasing every trend.',
  },
  {
    id: 'b-h2-example',
    type: 'heading',
    headingLevel: 2,
    text: 'Real-World Example',
    anchorId: 'real-world-example',
    order: 62,
  },
  {
    id: 'b-example-1',
    type: 'paragraph',
    order: 63,
    text: 'Imagine two local bakeries.',
  },
  {
    id: 'b-example-2',
    type: 'paragraph',
    order: 64,
    text: 'Bakery A uploads only promotional videos announcing discounts.',
  },
  {
    id: 'b-example-3',
    type: 'paragraph',
    order: 65,
    text: 'Bakery B shares baking tips, decorating tutorials, customer celebrations, behind-the-scenes preparation and answers common questions.',
  },
  {
    id: 'b-example-4',
    type: 'paragraph',
    order: 66,
    text: 'Both businesses sell similar products, but Bakery B gives viewers a reason to keep watching even when they are not ready to buy. Over time, this approach is more likely to build trust, increase followers and generate repeat customers.',
  },
  {
    id: 'b-svc-views',
    type: 'related_service_card',
    order: 67,
    serviceSlug: 'buy-tiktok-views',
    label: 'Buy TikTok Views Canada',
    description:
      'Compare view packages when you want to support early reach on high-value videos.',
  },
  {
    id: 'b-h2-wins',
    type: 'heading',
    headingLevel: 2,
    text: 'Quick Wins',
    anchorId: 'quick-wins',
    order: 68,
  },
  {
    id: 'b-wins-1',
    type: 'paragraph',
    order: 69,
    text: 'Improve your TikTok marketing this week:',
  },
  {
    id: 'b-wins-list',
    type: 'bulleted_list',
    order: 70,
    items: [
      'Update your business bio.',
      'Record one behind-the-scenes video.',
      'Turn a customer question into a tutorial.',
      'Reply to unanswered comments.',
      'Review your best-performing video.',
    ],
  },
  {
    id: 'b-h2-monthly',
    type: 'heading',
    headingLevel: 2,
    text: 'Monthly Low-Budget TikTok Checklist for Small Teams',
    anchorId: 'monthly-low-budget-tiktok-checklist-for-small-teams',
    order: 71,
  },
  {
    id: 'b-monthly-1',
    type: 'paragraph',
    order: 72,
    text: 'Review each month:',
  },
  {
    id: 'b-monthly-list',
    type: 'bulleted_list',
    order: 73,
    items: [
      '✔ Audience growth',
      '✔ Website clicks',
      '✔ Engagement rate',
      '✔ Best-performing topics',
      '✔ Video retention',
      '✔ Customer questions',
      '✔ Publishing consistency',
      '✔ Content ideas for next month',
    ],
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 74,
    image: {
      src: `${IMG}/small-business-tiktok-analytics.png`,
      alt: 'TikTok analytics dashboard for a small business displaying audience growth, engagement, website clicks, profile visits and.',
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
    order: 75,
  },
  {
    id: 'b-takeaways-1',
    type: 'paragraph',
    order: 76,
    text: 'TikTok gives small businesses an opportunity to compete through creativity and authenticity rather than advertising budgets.',
  },
  {
    id: 'b-takeaways-2',
    type: 'paragraph',
    order: 77,
    text: 'Businesses that consistently educate, communicate and provide value usually build stronger customer relationships than businesses focused only on promotion.',
  },
  {
    id: 'b-h2-conclusion',
    type: 'heading',
    headingLevel: 2,
    text: 'Conclusion',
    anchorId: 'conclusion',
    order: 78,
  },
  {
    id: 'b-conclusion-1',
    type: 'paragraph',
    order: 79,
    text: 'Small businesses no longer need large marketing budgets to build an online presence.',
  },
  {
    id: 'b-conclusion-2',
    type: 'paragraph',
    order: 80,
    text: 'By understanding your audience, publishing valuable content and improving your strategy through analytics, you can develop a TikTok presence that supports long-term business growth.',
  },
  {
    id: 'b-conclusion-3',
    type: 'paragraph',
    order: 81,
    text: 'Focus on helping your audience first. Sales and customer loyalty often follow naturally when your content consistently delivers value.',
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

export const TIKTOK_MARKETING_FOR_SMALL_BUSINESSES_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-tiktok-marketing-for-small-businesses',
    slug: SLUG,
    title:
      'TikTok Marketing for Small Businesses: A Complete Guide to Growing Your Brand',
    excerpt:
      'Learn how small businesses can use TikTok marketing to build brand awareness, attract customers and grow consistently with practical content strategies.',
    content: PLAIN_CONTENT,
    blocks: BLOCKS,
    category: 'tiktok',
    tags: ['business', 'marketing', 'growth', 'strategy'],
    authorId: 'author-instantviral-editorial',
    featuredImage: {
      src: `${IMG}/tiktok-marketing-for-small-businesses.png`,
      alt: 'Small business using TikTok marketing through educational content, customer engagement, analytics, content planning and.',
      width: 1920,
      height: 1080,
      priority: true,
    },
    readingTime: READING_TIME,
    publishedAt: '2026-07-16T00:00:00.000Z',
    updatedAt: '2026-07-16T00:00:00.000Z',
    showModifiedDate: false,
    seo: {
      title:
        'TikTok Marketing for Small Businesses | Complete Business Guide',
      description:
        'Learn how small businesses can use TikTok marketing to build brand awareness, attract customers and grow consistently with practical content strategies.',
      canonicalPath: `/learn/${SLUG}`,
      keywords: [
        'TikTok Marketing for Small Businesses',
        'Small Business TikTok Marketing',
        'Local Business TikTok Tips',
        'Low Cost TikTok Marketing',
        'Neighborhood Brand TikTok',
        'TikTok for Entrepreneurs',
      ],
      ogImage: `${IMG}/tiktok-marketing-for-small-businesses.png`,
    },
    relatedServices: [
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
    ],
    relatedArticles: [
      'tiktok-for-business',
      'complete-tiktok-growth-guide',
      'tiktok-seo-guide',
      'how-to-increase-tiktok-engagement',
      'best-time-to-post-on-tiktok',
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
      'TikTok lets small businesses compete through creativity and authenticity rather than advertising budgets.',
      'Businesses that educate, communicate and provide value build stronger customer relationships than promotion-only accounts.',
      'Audience understanding, valuable content and analytics-driven improvement support long-term growth.',
    ],
    faqs: [
      {
        id: 'faq-suitable-small-business',
        question: 'Can a neighborhood shop use TikTok with a tiny marketing budget?',
        answer:
          'Yes. Phone-shot tips, local proof and community replies can reach nearby customers without influencer retainers or heavy ad spend.',
        schemaEligible: true,
      },
      {
        id: 'faq-what-to-post',
        question: 'What should a small team post when they only have a few hours each week?',
        answer:
          'Short how-tos, FAQ answers, behind-the-scenes clips and local customer stories—formats that reuse one idea across multiple videos.',
        schemaEligible: true,
      },
      {
        id: 'faq-need-equipment',
        question: 'Do small businesses need studio gear for TikTok marketing?',
        answer:
          'No. A phone, natural light and clear audio are enough for lean local marketing until a format proves it converts.',
        schemaEligible: true,
      },
      {
        id: 'faq-how-often',
        question: 'What posting cadence fits a small business with limited staff?',
        answer:
          'Three solid videos a week is realistic for many shops. Protect quality and reply time before adding more volume.',
        schemaEligible: true,
      },
      {
        id: 'faq-generate-sales',
        question: 'Can lean TikTok content bring walk-ins or local enquiries?',
        answer:
          'Yes when videos show real offers, location proof and clear next steps such as a profile link, map pin or message CTA.',
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
