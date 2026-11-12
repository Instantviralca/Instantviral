/**
 * Learn article — How to Get More TikTok Views.
 * Editorial source: manually written production copy (TikTok Article #8).

 * Related cluster links: growth guide, engagement, SEO, algorithm, best time exist;
 * common mistakes, TikTok for Business, organic vs paid, build trust pending.
 * Commercial linking: single service card (Buy TikTok Views) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-get-more-tiktok-views';
const IMG = '/assets/images/learn/how-to-get-more-tiktok-views' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "TikTok is one of the few platforms where a brand new account can reach thousands of people with its first good video. That is because most views come from the For You feed, which picks videos for each viewer based on what they are likely to enjoy, not on who they follow.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "The same system explains why views can feel unpredictable. One video takes off, the next one stalls. This guide explains how TikTok decides which videos to show, then covers the practical changes that most often lead to more views over time.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "How the For You Feed Picks Videos",
    anchorId: 'how-the-for-you-feed-picks-videos',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "In its explanation of how TikTok recommends videos, TikTok describes three main groups of signals:",
    inlineLinks: [
      { href: "https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you", label: "how TikTok recommends videos", external: true },
    ],
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 5,
    items: [
      "User interactions, such as videos a person likes, shares, comments on, watches to the end or marks as not interested.",
      "Video information, such as captions, sounds and hashtags.",
      "Device and account settings, such as language and country, which carry less weight.",
    ],
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 6,
    text: "TikTok also says that follower count and previous high performing videos are not direct factors. Every video gets judged largely on how viewers respond to it. A strong indicator of interest is whether someone finishes a video, especially a longer one.",
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "In practice, a new video is shown to a small group of people likely to be interested. If they watch, rewatch, share and comment, TikTok shows it to a larger group, and so on. If they swipe away quickly, distribution slows down.",
  },
  {
    id: 'b-fig-video-discovery',
    type: 'figure',
    order: 8,
    image: {
      src: `${IMG}/tiktok-video-discovery.png`,
      alt: 'TikTok video discovery through the For You feed, search optimization, hashtags and audience recommendations.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Hook Viewers in the First Second",
    anchorId: 'hook-viewers-in-the-first-second',
    order: 9,
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 10,
    text: "The first second decides whether most people keep watching. Open with the most interesting part of the video, not a greeting or a logo.",
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 11,
    text: "Strong openings usually do one of these:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 12,
    items: [
      "Show the result first, then explain how you got there.",
      "Name a specific problem the viewer has.",
      "Make a clear promise, such as \"three mistakes that ruin homemade pizza\".",
      "Start in the middle of the action.",
    ],
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 13,
    text: "Add short on-screen text in the first frame so people who scroll with the sound off still understand what the video is about.",
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Keep People Watching to the End",
    anchorId: 'keep-people-watching-to-the-end',
    order: 14,
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 15,
    text: "Watch time and completion matter more than almost anything else. Once the hook has done its job, every second has to earn the next.",
  },
  {
    id: 'b-list-3',
    type: 'bulleted_list',
    order: 16,
    items: [
      "Cut pauses, repeated points and slow introductions.",
      "Change the shot, angle or text every few seconds to hold attention.",
      "Keep one idea per video and save extra points for a follow up.",
      "Match the length to the idea. A tip might need 15 seconds, a tutorial two minutes.",
      "End cleanly so the video loops naturally, which can lead to rewatches.",
    ],
  },
  {
    id: 'b-fig-video-retention',
    type: 'figure',
    order: 17,
    image: {
      src: `${IMG}/tiktok-video-retention.png`,
      alt: 'TikTok audience retention with watch time, video completion rate, replay rate and viewer engagement analytics.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 18,
    text: "Check average watch time and the retention graph in TikTok Studio. If most people leave at the same moment, that part of the video needs work.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Make Videos Worth Sharing",
    anchorId: 'make-videos-worth-sharing',
    order: 19,
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 20,
    text: "Shares send a video to new people directly and tell TikTok it is worth spreading. People share videos that are useful, funny or relatable enough to pass on. Ask yourself who a viewer would send this to. If there is no obvious answer, the video may not be shareable yet.",
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 21,
    text: "Comments help too. Ask a genuine question, share an opinion people can respond to or leave a small detail open for discussion. Replying to comments with video replies creates new content and keeps the conversation going.",
  },
  {
    id: 'b-svc-views',
    type: 'related_service_card',
    order: 22,
    serviceSlug: 'buy-tiktok-views',
    label: 'Buy TikTok Views Canada',
    description:
      'Compare view packages when you want to support early reach on high-value videos.',
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Use Search and Keywords",
    anchorId: 'use-search-and-keywords',
    order: 23,
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 24,
    text: "Many people use TikTok as a search engine for recipes, reviews, local places and how-to answers. Videos that clearly answer a search can keep gaining views for months.",
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 25,
    text: "Say your main keyword out loud, include it in on-screen text and write it naturally in the caption. Creator Search Insights shows what people are searching for in your topic. Our TikTok SEO guide explains how to find and use those keywords.",
    inlineLinks: [
      { href: "/learn/tiktok-seo-guide", label: "TikTok SEO guide" },
    ],
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Use Sounds and Trends Carefully",
    anchorId: 'use-sounds-and-trends-carefully',
    order: 26,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 27,
    text: "Trending sounds and formats can give a video extra reach, but only when they fit your content. A trend that has nothing to do with your topic may get views from people who never engage with your other videos. Pick trends you can adapt to your niche, and use original audio when your voice or explanation is the point of the video.",
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Post Consistently and at Sensible Times",
    anchorId: 'post-consistently-and-at-sensible-times',
    order: 28,
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 29,
    text: "Posting regularly gives TikTok more chances to find the right audience for your content and gives you more data to learn from. Three to five videos a week is a realistic target for many accounts.",
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 30,
    text: "Timing helps a video collect early reactions, so post when your audience is active. TikTok Studio shows when your followers are online. For Canadian accounts, remember the time difference between the coasts. Our guide on the best time to post on TikTok explains how to test it.",
    inlineLinks: [
      { href: "/learn/best-time-to-post-on-tiktok", label: "best time to post on TikTok" },
    ],
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Why Views Suddenly Drop",
    anchorId: 'why-views-suddenly-drop',
    order: 31,
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 32,
    text: "Views naturally go up and down between videos, so one weak result is not a sign of a problem. A sharp drop across many videos at once is worth investigating. Videos that break TikTok's Community Guidelines can be made ineligible for the For You feed, so start with these checks:",
    inlineLinks: [
      { href: "https://www.tiktok.com/community-guidelines/en", label: "Community Guidelines", external: true },
    ],
  },
  {
    id: 'b-list-4',
    type: 'numbered_list',
    order: 33,
    items: [
      "Check your inbox and Account status for notices about restricted content.",
      "Review recent videos against the Community Guidelines.",
      "Look at average watch time to see whether your hooks have weakened.",
      "Check whether your topic or format changed recently.",
      "Make sure you are not reposting the same clips or content from other apps with watermarks.",
    ],
  },
  {
    id: 'b-fig-video-performance',
    type: 'figure',
    order: 34,
    image: {
      src: `${IMG}/tiktok-video-performance-dashboard.png`,
      alt: 'TikTok analytics dashboard displaying video views, audience retention, traffic sources, watch time and long-term performance.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Myths About TikTok Views",
    anchorId: 'myths-about-tiktok-views',
    order: 35,
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 36,
    text: "A few ideas are repeated often but are not supported by what TikTok has said:",
  },
  {
    id: 'b-list-5',
    type: 'bulleted_list',
    order: 37,
    items: [
      "Deleting and reposting a video gives it a fresh start: it usually just loses the early engagement it had.",
      "Hashtags like #fyp put a video on the For You feed: they do not tell TikTok anything useful about your content.",
      "You need a big following to get views: follower count is not a direct factor.",
      "Posting many times a day always helps: rushed videos with weak retention can drag your average down.",
    ],
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Track Your Progress",
    anchorId: 'track-your-progress',
    order: 38,
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 39,
    text: "Review your videos every couple of weeks in TikTok Studio. Compare views, average watch time, completion, shares and traffic sources. Look for the topics, hooks and lengths that consistently perform above your average, and make more of them.",
  },
  {
    id: 'b-p-21',
    type: 'paragraph',
    order: 40,
    text: "More views come from making videos people want to finish and share, again and again. If your videos get views but few new followers, read our guide on how to get more TikTok followers.",
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

export const HOW_TO_GET_MORE_TIKTOK_VIEWS_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-get-more-tiktok-views',
  slug: SLUG,
  title: "How to Get More Views on TikTok: How the Algorithm Picks Videos",
  excerpt: "TikTok views depend on how people respond to each video, not on how many followers you have. Here is how the For You feed works and practical ways to get more views.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['views', 'marketing', 'creator', 'engagement'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-get-more-tiktok-views.png`,
    alt: 'Strategies to increase TikTok video views through engaging content, audience retention, watch time optimization and.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Get More Views on TikTok",
    description: "How to get more views on TikTok: how the For You algorithm picks videos, why watch time matters and practical fixes for hooks, length and search.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how to get more views on tiktok",
      "get more tiktok views",
      "how the tiktok algorithm works",
      "tiktok for you page",
      "tiktok watch time",
    ],
    ogImage: `${IMG}/how-to-get-more-tiktok-views.png`,
  },
  relatedServices: ['buy-tiktok-views'],
  relatedArticles: [
    'how-to-get-more-tiktok-followers',
    'how-to-get-more-tiktok-likes',
    'tiktok-seo-guide',
    'best-time-to-post-on-tiktok',
    'how-to-create-a-tiktok-content-calendar',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "Most TikTok views come from the For You feed, which is based on viewer interest.",
    "Follower count is not a direct factor in TikTok recommendations.",
    "The first second and overall watch time have the biggest effect on views.",
    "Shareable, searchable videos keep gaining views over time.",
    "Use trends only when they fit your topic.",
    "A drop across many videos is worth checking in Account status.",
  ],
  faqs: [
    {
      id: 'faq-how-to-get-more-tiktok-views-1',
      question: "How can I get more views on TikTok?",
      answer: "Hook viewers in the first second, keep videos tight so people watch to the end, make content worth sharing, use searchable keywords and post consistently when your audience is active.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-views-2',
      question: "How does the TikTok algorithm decide who sees my video?",
      answer: "It shows a new video to a small group likely to be interested, then to more people if they watch, rewatch, share and comment. Interactions, video details and account settings all play a part.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-views-3',
      question: "Does follower count affect TikTok views?",
      answer: "TikTok says follower count is not a direct factor in recommendations, so smaller accounts can still reach large audiences.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-views-4',
      question: "Why did my TikTok views suddenly drop?",
      answer: "Views vary naturally. If they drop across many videos, check Account status for restrictions, review the Community Guidelines and look at your watch time.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-views-5',
      question: "Do hashtags like #fyp help on TikTok?",
      answer: "Not really. Specific, relevant hashtags and keywords help TikTok understand your video better than generic ones.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-views-6',
      question: "Should I delete TikTok videos with low views?",
      answer: "Usually not. Deleting removes useful data and does not fix the cause. Some videos also gain views later through search.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-tiktok-views',
    label: 'Explore TikTok Views Packages',
    description: "Explore view packages on InstantViral when you want to support visibility on a TikTok that is already well made.",
  },
};
