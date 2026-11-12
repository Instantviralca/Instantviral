/**
 * Learn article — TikTok for Business.
 * Editorial source: manually written production copy (TikTok Business Article #1).

 * Related cluster links: growth guide, SEO, algorithm, engagement, best time exist;
 * marketing for small businesses, content calendar, content ideas, organic vs paid pending.
 * Commercial linking: followers, likes and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'tiktok-for-business';
const IMG = '/assets/images/learn/tiktok-for-business' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "TikTok has become a place where people discover products, restaurants, services and local spots. For a small business, that means a chance to reach customers who have never heard of you, often without paying for ads. A short video of how your product is made or how you solve a common problem can reach thousands of people nearby.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "This guide covers what a business needs to get started on TikTok, the kinds of videos that work, how organic and paid options fit together, the mistakes that waste time and how to tell whether TikTok is helping your business.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Why TikTok Works for Businesses",
    anchorId: 'why-tiktok-works-for-businesses',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "On TikTok, most views come from the For You feed, which shows videos based on interest rather than follower count. A new business account with zero followers can still reach a large audience with one useful or entertaining video. That levels the playing field between small businesses and big brands in a way few platforms do.",
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "People also search TikTok for recommendations, reviews and how-to answers. Videos that answer those searches can keep sending customers your way for months.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Set Up a Business Account",
    anchorId: 'set-up-a-business-account',
    order: 6,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "Switching to a business account is free in the TikTok settings. It gives you analytics in TikTok Studio, a link in your bio, contact options and access to TikTok's advertising tools.",
  },
  {
    id: 'b-fig-profile-optimization',
    type: 'figure',
    order: 8,
    image: {
      src: `${IMG}/tiktok-business-profile-optimization.png`,
      alt: 'TikTok business profile optimization with professional branding, profile setup, bio optimization and website integration.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 9,
    text: "Then build a profile that explains you quickly:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 10,
    items: [
      "Use your logo or a clear photo as the profile picture.",
      "Choose a username that matches your business name.",
      "Write a bio that says what you do and where, such as \"Family run bakery in Moncton\".",
      "Add a link to your website, booking page or shop.",
      "Pin three videos that show your best work and what new followers can expect.",
    ],
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 11,
    text: "Business accounts use TikTok's Commercial Music Library, which contains music cleared for business use. Choose sounds from there rather than popular tracks that may not be licensed for commercial content.",
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Content Ideas That Work for Businesses",
    anchorId: 'content-ideas-that-work-for-businesses',
    order: 12,
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 13,
    text: "The best business content shows people something they cannot get from an advert. Ideas that work across many industries:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 14,
    items: [
      "Behind the scenes of making a product or preparing an order.",
      "Before and after transformations.",
      "Quick tutorials that answer common customer questions.",
      "Packing orders or setting up for the day.",
      "Meet the team and a day in the life of the owner.",
      "Myths in your industry and the facts.",
      "Customer stories, shared with permission.",
      "Video replies to comments and questions.",
      "How to choose the right product or service.",
      "Local moments, events and partnerships.",
    ],
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 15,
    text: "A furniture restorer in Halifax might show a chair from worn out to finished in 30 seconds. An accountant in Ottawa might answer \"what can I claim as a home office expense\" in plain words before tax season. Both build trust while showing exactly what the business does.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Plan a Consistent Rhythm",
    anchorId: 'plan-a-consistent-rhythm',
    order: 16,
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 17,
    text: "Consistency matters more than volume. Three to five videos a week is a realistic target for many small businesses. Choose a few content pillars, such as education, behind the scenes and customer stories, and rotate between them.",
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 18,
    text: "Batching makes this manageable. Film several videos in one session, edit them together and schedule them ahead in TikTok Studio. Our guide to creating a TikTok content calendar shows how to plan a month at once.",
    inlineLinks: [
      { href: "/learn/how-to-create-a-tiktok-content-calendar", label: "TikTok content calendar" },
    ],
  },
  {
    id: 'b-fig-content-strategy',
    type: 'figure',
    order: 19,
    image: {
      src: `${IMG}/tiktok-business-content-strategy.png`,
      alt: 'TikTok business content strategy with educational videos, product demonstrations, publishing calendar and customer.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Get Found by Local Customers",
    anchorId: 'get-found-by-local-customers',
    order: 20,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 21,
    text: "Many people search TikTok for places in their own city. Say your city or neighbourhood in videos, show it in on-screen text and include it in captions. Use location tags where available. Our TikTok SEO guide explains how to find and use the searches your customers make.",
    inlineLinks: [
      { href: "/learn/tiktok-seo-guide", label: "TikTok SEO guide" },
    ],
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 22,
    text: "If you serve French speaking customers, consider making some videos in French or adding French captions.",
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 23,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Organic Content and Paid Options",
    anchorId: 'organic-content-and-paid-options',
    order: 24,
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 25,
    text: "Organic videos are the foundation, but TikTok also offers paid tools that can help the right videos reach more people:",
  },
  {
    id: 'b-list-3',
    type: 'bulleted_list',
    order: 26,
    items: [
      "Promote lets you pay to show an existing video to more people, directly from the app.",
      "Spark Ads let you run an existing organic video as an ad, keeping its likes and comments.",
      "TikTok Ads Manager offers full campaigns with targeting by location, interests and behaviour.",
    ],
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 27,
    text: "A sensible approach is to post organically first, see which videos perform well and then put a small budget behind the winners. That way you are paying to extend something people already like, rather than guessing. Our guide on organic vs paid social media growth explains how to balance the two.",
    inlineLinks: [
      { href: "/learn/organic-vs-paid-social-media-growth", label: "organic vs paid social media growth" },
    ],
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Working With Creators",
    anchorId: 'working-with-creators',
    order: 28,
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 29,
    text: "Creators can introduce your business to an audience that already trusts them. Look for creators whose followers match your customers, not just those with the largest numbers. A local food creator with a loyal following in your city may bring more customers than a national account with millions of followers.",
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 30,
    text: "Paid partnerships and free products must be clearly disclosed. Use TikTok's branded content tools, and follow Ad Standards guidance on influencer disclosure in Canada.",
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Mistakes Businesses Make on TikTok",
    anchorId: 'mistakes-businesses-make-on-tiktok',
    order: 31,
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 32,
    text: "These are the habits that waste the most effort:",
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 33,
    items: [
      "Posting polished adverts that feel out of place in the feed.",
      "Copying trends that have nothing to do with the business.",
      "Posting in bursts and then disappearing for weeks.",
      "Ignoring comments and questions.",
      "Talking only about products instead of helping or entertaining.",
      "Using popular music that is not cleared for business use.",
      "Giving up after a few weeks without reviewing results.",
      "Measuring success by views alone instead of enquiries and sales.",
    ],
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Measure What Matters",
    anchorId: 'measure-what-matters',
    order: 34,
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 35,
    text: "TikTok Studio shows views, watch time, traffic sources, follower growth and profile activity. Connect those numbers to business results.",
  },
  {
    id: 'b-list-5',
    type: 'numbered_list',
    order: 36,
    items: [
      "Which videos led to the most profile visits and link clicks?",
      "Did enquiries, bookings or sales rise after certain videos?",
      "Which content pillars brought the most engaged viewers?",
      "Where did viewers find you: For You, search or your profile?",
      "What will you make more of next month?",
    ],
  },
  {
    id: 'b-fig-business-analytics',
    type: 'figure',
    order: 37,
    image: {
      src: `${IMG}/tiktok-business-analytics-dashboard.png`,
      alt: 'TikTok business analytics dashboard displaying audience growth, engagement, website clicks, conversions and content.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 38,
    text: "Ask new customers how they found you too. When people start mentioning TikTok, it is working.",
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Getting Started",
    anchorId: 'getting-started',
    order: 39,
  },
  {
    id: 'b-p-21',
    type: 'paragraph',
    order: 40,
    text: "You do not need a big budget or a studio. A phone, good light and a clear idea of what your customers want to know are enough. Start with one video a week if that is all you can manage, review what works and build from there. For more on turning viewers into a lasting audience, read our guide on how to get more TikTok followers.",
    inlineLinks: [
      { href: "/learn/how-to-get-more-tiktok-followers", label: "get more TikTok followers" },
    ],
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

export const TIKTOK_FOR_BUSINESS_ARTICLE: LearnArticleRecord = {
  id: 'learn-tiktok-for-business',
  slug: SLUG,
  title: "TikTok for Business: A Practical Guide for Small Businesses",
  excerpt: "How small businesses can use TikTok to reach new customers: setting up a business account, content ideas that work, organic and paid options, mistakes to avoid and how to measure results.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['business', 'marketing', 'engagement', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/tiktok-for-business.png`,
    alt: 'Business using TikTok for marketing with content planning, audience engagement, analytics, brand awareness and business.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "TikTok for Business: A Practical Guide",
    description: "TikTok for business explained: set up a business account, find content ideas that work, use Promote and Spark Ads wisely and track results.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "tiktok for business",
      "tiktok marketing for small businesses",
      "tiktok content ideas for businesses",
      "tiktok marketing mistakes",
      "tiktok business account",
    ],
    ogImage: `${IMG}/tiktok-for-business.png`,
  },
  relatedServices: [
    'buy-tiktok-followers',
    'buy-tiktok-likes',
    'buy-tiktok-views',
  ],
  relatedArticles: [
    'how-to-create-a-tiktok-content-calendar',
    'tiktok-seo-guide',
    'how-to-get-more-tiktok-followers',
    'how-to-get-more-tiktok-views',
    'social-media-marketing-mistakes',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "TikTok shows videos based on interest, so new business accounts can reach people.",
    "A business account unlocks analytics, a bio link and advertising tools.",
    "Behind the scenes, tutorials and customer questions work across most industries.",
    "Mention your city and use location tags to reach local customers.",
    "Post organically first, then use Promote or Spark Ads on proven videos.",
    "Measure enquiries and sales, not just views.",
  ],
  faqs: [
    {
      id: 'faq-tiktok-for-business-1',
      question: "Is TikTok good for small businesses?",
      answer: "Yes. TikTok shows videos based on interest rather than follower count, so small businesses can reach new customers without a large audience or ad budget.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-for-business-2',
      question: "How do I set up a TikTok business account?",
      answer: "Switch to a business account in your TikTok settings. It is free and unlocks analytics, a link in your bio and advertising tools.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-for-business-3',
      question: "What should a business post on TikTok?",
      answer: "Behind the scenes, before and after results, quick tutorials, answers to customer questions, team introductions and customer stories.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-for-business-4',
      question: "How often should a business post on TikTok?",
      answer: "Three to five videos a week is a realistic target for many small businesses. Choose a rhythm you can keep up.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-for-business-5',
      question: "Should a business pay for TikTok ads?",
      answer: "Start with organic content, then use Promote or Spark Ads to extend videos that already perform well.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-for-business-6',
      question: "Can businesses use any music on TikTok?",
      answer: "Business accounts should use the Commercial Music Library, which contains music cleared for business use.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-tiktok-followers',
    label: 'Explore TikTok Followers Packages',
    description: "Compare follower packages on InstantViral when you want to support a business profile that is already posting regularly.",
  },
};
