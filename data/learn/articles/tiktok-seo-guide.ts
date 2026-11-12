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
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "People no longer use TikTok only to scroll. They search it for recipes, product reviews, travel ideas, local restaurants and step by step answers. When someone in Toronto types \"best brunch Toronto\" or \"how to winterize a car\", TikTok shows a list of videos, and the ones at the top can collect views for months.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "TikTok SEO means making your videos easy for TikTok to understand and match to those searches. It does not replace good content, but it gives good content a second way to be found beyond the For You feed. This guide explains how TikTok search works, how to find keywords and where to use them.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "How TikTok Search Works",
    anchorId: 'how-tiktok-search-works',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "TikTok search matches what someone types with videos and accounts that seem relevant, then ranks them based on how people respond. To understand what a video is about, TikTok can draw on:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 5,
    items: [
      "The words in your caption and hashtags.",
      "Text that appears on screen.",
      "What you say in the video, through speech recognition and captions.",
      "The sounds and effects you use.",
      "Your profile name, username and bio.",
      "How viewers who searched for that term engaged with your video.",
    ],
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 6,
    text: "Engagement still matters. A video that matches a search but loses viewers quickly will slip down the results, while one that answers the question clearly and keeps people watching can hold its place for a long time.",
  },
  {
    id: 'b-fig-search-optimization',
    type: 'figure',
    order: 7,
    image: {
      src: `${IMG}/tiktok-search-optimization.png`,
      alt: 'TikTok search optimization with captions, spoken keywords, hashtags, on-screen text and video categorization.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Find Keywords People Actually Search",
    anchorId: 'find-keywords-people-actually-search',
    order: 8,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 9,
    text: "Good TikTok SEO starts with knowing what your audience types. These sources help:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 10,
    items: [
      "Creator Search Insights in the TikTok app, which shows popular searches in your topic and highlights searches where there is little content yet.",
      "The search bar suggestions that appear as you type a term.",
      "The \"Others searched for\" suggestions under videos and in comment sections.",
      "Questions customers ask you in person, by email or in DMs.",
      "Comments on your own videos and on popular videos in your niche.",
    ],
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 11,
    text: "Look for specific phrases rather than single broad words. \"Skincare\" is crowded and vague. \"Skincare routine for dry skin in winter\" is specific, matches a real need and is easier to rank for, especially for Canadian audiences dealing with cold weather.",
  },
  {
    id: 'b-fig-keyword-research',
    type: 'figure',
    order: 12,
    image: {
      src: `${IMG}/tiktok-keyword-research.png`,
      alt: 'TikTok keyword research with search suggestions, keyword planning, audience intent and content topic discovery.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Where to Put Your Keywords",
    anchorId: 'where-to-put-your-keywords',
    order: 13,
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 14,
    text: "Once you have a target phrase, use it naturally in a few places:",
  },
  {
    id: 'b-list-3',
    type: 'numbered_list',
    order: 15,
    items: [
      "Say it out loud early in the video, ideally in the first few seconds.",
      "Show it as on-screen text in the opening frame.",
      "Include it in the first line of your caption, written as a normal sentence.",
      "Add two or three specific hashtags that relate to it.",
      "Turn on auto captions so your spoken words are visible and readable.",
    ],
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 16,
    text: "Avoid stuffing the same phrase into every line. TikTok and viewers both respond better to captions that read naturally. One clear phrase used in the right places is enough.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Make Videos That Answer the Search",
    anchorId: 'make-videos-that-answer-the-search',
    order: 17,
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 18,
    text: "Ranking well depends on satisfying the person who searched. If someone types \"how to remove a wine stain\", they want the method quickly, not a long introduction.",
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 19,
    items: [
      "Answer the question directly near the start.",
      "Show the steps clearly, with text for each one.",
      "Keep the video focused on that single query.",
      "Add a short summary or the key tip at the end.",
    ],
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 20,
    text: "Videos that solve the problem well get watched to the end, saved and shared, which helps them stay near the top of results.",
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 21,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Optimise Your Profile for Search",
    anchorId: 'optimise-your-profile-for-search',
    order: 22,
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 23,
    text: "Your account can appear in search results too. Put a keyword in your display name, such as \"Sam | Vancouver Home Organizing\", and write a bio that clearly says what you post. A consistent topic across your videos also helps TikTok connect your account with that subject.",
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Local SEO on TikTok",
    anchorId: 'local-seo-on-tiktok',
    order: 24,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 25,
    text: "Local businesses can benefit a lot from TikTok search. People search for places to eat, shop and visit in their own city. Mention your city or neighbourhood in what you say, in on-screen text and in the caption. Use location tags where available. A bakery in Montreal might target \"best croissants Montreal\", while a mechanic in Calgary might answer \"winter tires Calgary when to switch\".",
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 26,
    text: "If you serve French speaking customers, consider making some videos in French or adding French captions, since people search in the language they speak.",
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Build Series Around Search Topics",
    anchorId: 'build-series-around-search-topics',
    order: 27,
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 28,
    text: "One video rarely covers every question on a topic. A series of short videos, each targeting one related search, helps you rank for more terms and gives viewers a reason to follow. A plumber might make separate videos for \"why is my water heater making noise\", \"how to flush a water heater\" and \"how long do water heaters last\".",
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 29,
    text: "Plan these series in your calendar so search topics become a regular part of your content. Our guide to creating a TikTok content calendar shows how to fit them in.",
    inlineLinks: [
      { href: "/learn/how-to-create-a-tiktok-content-calendar", label: "TikTok content calendar" },
    ],
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Track Your Search Performance",
    anchorId: 'track-your-search-performance',
    order: 30,
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 31,
    text: "TikTok Studio shows where each video's views come from, including search. Review it every few weeks:",
  },
  {
    id: 'b-list-5',
    type: 'numbered_list',
    order: 32,
    items: [
      "Check which videos get the largest share of views from search.",
      "Note the keywords and topics they target.",
      "Look at watch time on those videos to see whether they answer the query well.",
      "Make follow up videos on related searches.",
      "Update your approach for topics that are not ranking.",
    ],
  },
  {
    id: 'b-fig-search-performance',
    type: 'figure',
    order: 33,
    image: {
      src: `${IMG}/tiktok-search-performance-dashboard.png`,
      alt: 'TikTok search performance dashboard displaying search traffic, keyword rankings, audience retention, video views and.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Common TikTok SEO Mistakes",
    anchorId: 'common-tiktok-seo-mistakes',
    order: 34,
  },
  {
    id: 'b-list-6',
    type: 'bulleted_list',
    order: 35,
    items: [
      "Using only broad hashtags like #fyp that tell TikTok nothing about your video.",
      "Stuffing captions with repeated keywords.",
      "Burying the answer after a long introduction.",
      "Targeting searches that do not match what your audience wants.",
      "Forgetting to say the keyword out loud or show it on screen.",
    ],
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "SEO Works Best With Strong Content",
    anchorId: 'seo-works-best-with-strong-content',
    order: 36,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 37,
    text: "TikTok SEO gives your videos a longer life, but it works best when the content is genuinely helpful. Combine search friendly topics with strong hooks and clear answers, and your videos can keep bringing in viewers long after the For You traffic fades. For more on reaching people through the For You feed, read our guide on how to get more TikTok views.",
    inlineLinks: [
      { href: "/learn/how-to-get-more-tiktok-views", label: "get more TikTok views" },
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

export const TIKTOK_SEO_GUIDE_ARTICLE: LearnArticleRecord = {
  id: 'learn-tiktok-seo-guide',
  slug: SLUG,
  title: "TikTok SEO: How to Rank Higher in TikTok Search",
  excerpt: "Many people now search TikTok like a search engine. Here is how TikTok search works, how to find keywords with Creator Search Insights and how to make videos that rank.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['views', 'marketing', 'creator', 'analytics'],
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
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "TikTok SEO: How to Rank in TikTok Search",
    description: "A practical TikTok SEO guide: how TikTok search works, how to find keywords with Creator Search Insights, and where to put them in videos, captions and text.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "tiktok seo",
      "tiktok seo guide",
      "how to rank on tiktok search",
      "tiktok keywords",
      "creator search insights",
      "tiktok search optimization",
    ],
    ogImage: `${IMG}/tiktok-seo-guide.png`,
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'how-to-get-more-tiktok-views',
    'how-to-get-more-tiktok-followers',
    'how-to-create-a-tiktok-content-calendar',
    'tiktok-for-business',
    'best-time-to-post-on-tiktok',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "TikTok search uses captions, on-screen text, speech, hashtags and engagement.",
    "Creator Search Insights shows popular searches and gaps in your topic.",
    "Target specific phrases instead of broad single words.",
    "Say your keyword, show it on screen and write it naturally in the caption.",
    "Answer the search quickly and clearly to keep viewers watching.",
    "Mention your city and use location tags for local searches.",
  ],
  faqs: [
    {
      id: 'faq-tiktok-seo-guide-1',
      question: "What is TikTok SEO?",
      answer: "TikTok SEO is the practice of making videos easy for TikTok to understand and match to searches, using keywords in speech, on-screen text, captions and hashtags, while keeping viewers engaged.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-seo-guide-2',
      question: "How do I find keywords for TikTok?",
      answer: "Use Creator Search Insights in the app, search bar suggestions, the \"Others searched for\" prompts, and questions from your customers and comments.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-seo-guide-3',
      question: "Where should I put keywords in a TikTok video?",
      answer: "Say the keyword early in the video, show it as on-screen text, include it in the first line of the caption and add a few related hashtags.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-seo-guide-4',
      question: "Do hashtags still matter for TikTok SEO?",
      answer: "Specific, relevant hashtags help TikTok categorise a video. Generic tags like #fyp add little.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-seo-guide-5',
      question: "Can local businesses use TikTok SEO?",
      answer: "Yes. Mention your city or neighbourhood in videos and captions and use location tags, so you appear when people search for local places.",
      schemaEligible: true,
    },
    {
      id: 'faq-tiktok-seo-guide-6',
      question: "How long does it take to rank in TikTok search?",
      answer: "It varies. Some videos appear in results within days, while others gain search views gradually over weeks.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-tiktok-followers',
    label: 'Explore TikTok Followers Packages',
    description: "Compare follower packages on InstantViral when you want to support a profile whose videos are already being found in search.",
  },
};
