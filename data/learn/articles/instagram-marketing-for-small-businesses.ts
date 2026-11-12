/**
 * Learn article — Instagram Marketing for Small Businesses.
 * Editorial source: manually written production copy (Article #12).
 *
 * Commercial linking: single service card (Buy Instagram Followers) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'instagram-marketing-for-small-businesses';
const IMG = '/assets/images/learn/instagram-marketing-for-small-businesses' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "For a small business, Instagram can work like a shop window, a portfolio and a customer service desk at the same time. People use it to discover local places, check whether a business looks trustworthy and see work before they book. A clear, active profile can bring in enquiries that would never have come from a website alone.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "This guide is written for owners and small teams who do not have time for complicated strategies. It covers setting up the account, what to post, a simple weekly plan, the mistakes that waste effort and how to tell whether Instagram is paying off.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Set Up the Account Properly",
    anchorId: 'set-up-the-account-properly',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "Start with a professional account. Instagram offers business and creator options, and both unlock Insights, contact options and scheduling. For most shops, restaurants, studios and service businesses, the business option is the natural fit because it supports contact buttons and categories.",
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "Then make the profile do its job:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 6,
    items: [
      "Use your logo or a clear photo of your storefront as the profile picture.",
      "Put what you do and where in the name field, such as \"Maple Paws | Dog Grooming Winnipeg\".",
      "Write a bio that explains what you offer, who it is for and your service area.",
      "Add contact buttons and an action button for booking, ordering or directions where available.",
      "Link to the page you most want people to visit, such as booking or your menu.",
      "Create Story Highlights for services, prices or menus, reviews and frequently asked questions.",
    ],
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "If you serve customers in Quebec, think about French captions or bilingual posts, and check the French language requirements that apply to commercial advertising there.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Know What You Want Instagram to Do",
    anchorId: 'know-what-you-want-instagram-to-do',
    order: 8,
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 9,
    text: "Decide what success looks like before you post. A café might want more weekday morning visits. A contractor might want more quote requests. An online shop might want more product page visits. That goal tells you what to post and which numbers to watch.",
  },
  {
    id: 'b-fig-strategy',
    type: 'figure',
    order: 10,
    image: {
      src: `${IMG}/small-business-instagram-strategy.png`,
      alt: 'Instagram strategy illustration for a small business showing marketing goals, audience planning and content organization.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Content Ideas That Work for Small Businesses",
    anchorId: 'content-ideas-that-work-for-small-businesses',
    order: 11,
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 12,
    text: "The best content for a small business usually shows your work, your people and your knowledge. Here are ideas that work across most industries:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 13,
    items: [
      "Before and after results, such as a renovated kitchen or a groomed dog.",
      "Short tutorials that answer common customer questions.",
      "Behind the scenes of making, preparing or packing an order.",
      "Meet the team posts that put faces to the business.",
      "Customer stories shared with permission.",
      "New products or seasonal menus shown in use.",
      "A day in the life of the owner.",
      "Myths in your industry and the facts behind them.",
      "Local events, partnerships and community causes you support.",
      "Answers to questions from comments and DMs.",
      "Tips for getting the most from your product or service.",
      "Your workspace, tools or ingredients up close.",
    ],
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 14,
    text: "A bakery in Kingston could post a Reel of the morning bake, a carousel explaining the difference between its breads, a Story poll asking which flavour to bring back and a photo of the team at a local market. That is a week of content without a single \"buy now\".",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Choose Formats for the Job",
    anchorId: 'choose-formats-for-the-job',
    order: 15,
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 16,
    text: "Each Instagram format has a different strength:",
  },
  {
    id: 'b-list-3',
    type: 'bulleted_list',
    order: 17,
    items: [
      "Reels reach people who do not follow you yet, so use them for discovery.",
      "Carousels hold attention and get saved, so use them for tips and guides.",
      "Photos work well for products, food and finished work.",
      "Stories keep you visible to followers every day with polls, questions and updates.",
      "Lives work for launches, Q and A sessions and events.",
    ],
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Follow a Simple Weekly Plan",
    anchorId: 'follow-a-simple-weekly-plan',
    order: 18,
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 19,
    text: "Small teams need a plan they can keep. Three posts a week plus a few Stories is a solid starting point for many businesses.",
  },
  {
    id: 'b-table-1',
    type: 'comparison_table',
    order: 20,
    caption: "A simple weekly Instagram plan for a small business",
    headers: ["Day", "Format", "Idea"],
    rows: [
      ["Monday", "Carousel", "Tips or answers to a common question"],
      ["Wednesday", "Reel", "Behind the scenes or a before and after"],
      ["Friday", "Photo or Reel", "Product, service or customer story"],
      ["Daily", "Stories", "Updates, polls, questions and shares"],
    ],
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 21,
    text: "Batch your work by taking photos and filming several clips in one session, then schedule posts in advance. Our guide to building a content calendar shows how to plan a month at once, and our guide on the best time to post on Instagram helps you choose when to publish.",
    inlineLinks: [
      { href: "/learn/how-to-create-a-tiktok-content-calendar", label: "content calendar" },
      { href: "/learn/best-time-to-post-on-instagram", label: "best time to post on Instagram" },
    ],
  },
  {
    id: 'b-fig-content-calendar',
    type: 'figure',
    order: 22,
    image: {
      src: `${IMG}/instagram-business-content-calendar.png`,
      alt: 'Instagram business content calendar displaying educational posts, product updates, customer stories and promotional content.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Get Found by Local Customers",
    anchorId: 'get-found-by-local-customers',
    order: 23,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 24,
    text: "People search Instagram for places and services near them. Help them find you:",
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 25,
    items: [
      "Tag your location on posts and Reels.",
      "Mention your neighbourhood or city naturally in captions.",
      "Use a few specific local hashtags rather than long lists of generic ones.",
      "Collaborate with nearby businesses through collab posts.",
      "Reshare customer posts that tag you, with permission.",
    ],
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 26,
    text: "Keep your Instagram profile consistent with your Google Business Profile and website, including your name, address, hours and phone number. Customers often check more than one place before visiting.",
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 27,
    serviceSlug: 'buy-instagram-followers',
    label: 'Buy Instagram Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Turn Followers Into Customers",
    anchorId: 'turn-followers-into-customers',
    order: 28,
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 29,
    text: "Followers are only useful if some of them become customers. Make the next step easy. Mention how to book or order in captions, answer DMs quickly, pin a post that explains your services and prices, and keep your link up to date. When someone asks a question in the comments, reply publicly so others with the same question see the answer.",
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Mistakes Small Businesses Should Avoid",
    anchorId: 'mistakes-small-businesses-should-avoid',
    order: 30,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 31,
    text: "These are the habits that waste the most effort:",
  },
  {
    id: 'b-list-5',
    type: 'bulleted_list',
    order: 32,
    items: [
      "Posting only promotions, so followers have no reason to engage.",
      "Posting in bursts and then going quiet for weeks.",
      "Leaving comments and DMs unanswered.",
      "Using low quality or stock images that do not show your actual business.",
      "Copying content from bigger brands that does not fit your customers.",
      "Ignoring Insights and guessing what works.",
      "Working with influencers without clear disclosure of the partnership.",
    ],
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 33,
    text: "In Canada, Ad Standards publishes influencer marketing disclosure guidelines that explain how sponsored posts should be labelled. Following them protects both your business and your audience's trust.",
    inlineLinks: [
      { href: "https://adstandards.ca/wp-content/uploads/Ad-Standards-Influencer-Marketing-Disclosure-Guidelines-2025-10-08.pdf", label: "influencer marketing disclosure guidelines", external: true },
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
    id: 'b-p-17',
    type: 'paragraph',
    order: 35,
    text: "Instagram Insights shows reach, engagement, follower growth and actions such as profile visits, website taps and button taps. Review it once a month and connect it to your goal.",
  },
  {
    id: 'b-list-6',
    type: 'numbered_list',
    order: 36,
    items: [
      "Which posts led to the most profile visits and link taps?",
      "Which formats reached the most people who do not follow you?",
      "Which topics got the most saves and shares?",
      "Did DMs or calls increase after certain posts?",
      "What will you post more of next month?",
    ],
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 37,
    image: {
      src: `${IMG}/instagram-small-business-analytics.png`,
      alt: 'Instagram analytics dashboard showing audience growth, website clicks, engagement, profile visits and marketing performance.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 38,
    text: "It also helps to ask new customers how they found you. If people keep saying \"I saw you on Instagram\", it is working, even if the follower count grows slowly.",
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Start Small and Stay Consistent",
    anchorId: 'start-small-and-stay-consistent',
    order: 39,
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 40,
    text: "You do not need a big budget or a full time social media manager. A clear profile, a few useful posts each week, quick replies and a monthly review will put most small businesses ahead of their local competitors. For more on growing the account itself, read our guide on how to grow Instagram followers organically.",
    inlineLinks: [
      { href: "/learn/how-to-grow-instagram-followers-organically", label: "grow Instagram followers organically" },
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

export const INSTAGRAM_MARKETING_FOR_SMALL_BUSINESSES_ARTICLE: LearnArticleRecord = {
  id: 'learn-instagram-marketing-for-small-businesses',
  slug: SLUG,
  title: "Instagram Marketing for Small Businesses: A Practical Guide",
  excerpt: "How small businesses can use Instagram to reach local customers: account setup, content ideas that work, a simple weekly plan, the mistakes to avoid and how to measure results.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['business', 'marketing', 'engagement', 'followers'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/instagram-marketing-for-small-businesses.png`,
    alt: 'Small business using Instagram marketing with content planning, customer engagement and business analytics dashboard.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "Instagram Marketing for Small Businesses",
    description: "Instagram marketing for small businesses in Canada: set up your account, use content ideas that work, follow a weekly plan and avoid common mistakes.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "instagram marketing for small businesses",
      "how to use instagram for business",
      "instagram content ideas for businesses",
      "instagram marketing mistakes",
      "instagram for local business",
    ],
    ogImage: `${IMG}/instagram-marketing-for-small-businesses.png`,
  },
  relatedServices: ['buy-instagram-followers'],
  relatedArticles: [
    'how-to-grow-instagram-followers-organically',
    'how-to-get-more-instagram-likes',
    'best-time-to-post-on-instagram',
    'social-media-marketing-mistakes',
    'organic-vs-paid-social-media-growth',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "Set up a professional account with a clear bio, contact options and Highlights.",
    "Decide what you want Instagram to achieve before choosing what to post.",
    "Show your work, your people and your knowledge rather than only promotions.",
    "Use Reels for discovery, carousels for tips and Stories for daily contact.",
    "Tag your location and keep details consistent with your Google Business Profile.",
    "Review Insights monthly and ask customers how they found you.",
  ],
  faqs: [
    {
      id: 'faq-instagram-marketing-for-small-businesses-1',
      question: "How should a small business use Instagram?",
      answer: "Set up a professional account, post useful content that shows your work and team, use Reels for discovery and Stories for daily updates, reply to messages quickly and review Insights monthly.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-marketing-for-small-businesses-2',
      question: "How often should a small business post on Instagram?",
      answer: "Three posts a week plus regular Stories is a good starting point. Consistency matters more than volume.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-marketing-for-small-businesses-3',
      question: "What should a small business post on Instagram?",
      answer: "Before and after results, tutorials, behind the scenes, team introductions, customer stories, product highlights and answers to common questions.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-marketing-for-small-businesses-4',
      question: "Business or creator account: which is better?",
      answer: "Most shops, restaurants and service businesses suit a business account. Creator accounts are designed for individuals and public figures.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-marketing-for-small-businesses-5',
      question: "How can a local business get found on Instagram?",
      answer: "Tag your location, mention your city in captions, use a few local hashtags and collaborate with nearby businesses.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-marketing-for-small-businesses-6',
      question: "How do I know if Instagram is working for my business?",
      answer: "Track profile visits, link taps, messages and enquiries in Insights, and ask new customers how they found you.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-instagram-followers',
    label: 'Explore Instagram Followers Packages',
    description: "Compare follower packages on InstantViral when you want to support a business profile that is already posting regularly.",
  },
};
