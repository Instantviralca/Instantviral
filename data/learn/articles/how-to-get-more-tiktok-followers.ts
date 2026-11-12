/**
 * Learn article — How to Get More TikTok Followers.
 * Editorial source: manually written production copy (TikTok Article #2).
 *
 * Related cluster links: only Complete TikTok Growth Guide exists so far.
 * Commercial linking: single service card (Buy TikTok Followers) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-get-more-tiktok-followers';
const IMG = '/assets/images/learn/how-to-get-more-tiktok-followers' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "On TikTok, a video can reach thousands of people on day one, even from a brand new account. Turning those viewers into followers is harder. Someone who enjoyed one video only follows when they believe your next videos will be worth seeing too.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "This guide covers what drives that decision: a profile that explains what you offer, videos that people finish, a recognisable direction, the habits that keep followers around and the mistakes that quietly hold accounts back. It applies to creators, small businesses and brands alike.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Why Views Do Not Automatically Become Followers",
    anchorId: 'why-views-do-not-automatically-become-followers',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "TikTok's For You feed shows videos based on what each viewer is likely to enjoy, not on who they already follow. In its explanation of how TikTok recommends videos, TikTok says follower count is not a direct factor in recommendations. That is good news for new accounts, because anyone can reach people.",
    inlineLinks: [
      { href: "https://newsroom.tiktok.com/how-tiktok-recommends-videos-for-you?lang=en", label: "how TikTok recommends videos", external: true },
    ],
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "The downside is that most viewers meet you through a single video, with no plan to come back. Following is a separate decision. It happens when the viewer understands what you post and wants more of it. Every tip in this guide is about making that decision easier.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Set Up a Profile That Explains Itself",
    anchorId: 'set-up-a-profile-that-explains-itself',
    order: 6,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "When a viewer taps your name, they look at your profile for a few seconds. Make those seconds count:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 8,
    items: [
      "Choose a username and display name that are easy to remember and hint at your topic.",
      "Use a clear profile photo, such as your face or a simple logo.",
      "Write a bio that says what you post and who it is for, for example \"Easy weeknight meals for busy families in Canada\".",
      "Pin your three best videos so new visitors see your strongest work first.",
      "Add a link once your account is eligible, pointing to your website, shop or most useful resource.",
    ],
  },
  {
    id: 'b-fig-profile',
    type: 'figure',
    order: 9,
    image: {
      src: `${IMG}/tiktok-profile-optimization.png`,
      alt: 'TikTok profile optimization with profile photo, bio, username, branding and account setup for better follower growth.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 10,
    text: "Then look at your grid as a stranger would. If the last nine videos cover nine unrelated topics, visitors cannot tell what following will bring. A focused grid turns more profile visits into follows.",
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Pick a Clear Direction",
    anchorId: 'pick-a-clear-direction',
    order: 11,
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 12,
    text: "You do not need an extremely narrow niche, but you do need a recognisable theme. Two or three related topics are enough. A personal trainer might post quick home workouts, simple high protein meals and answers to common beginner questions. A florist in Montreal might share arrangement tutorials, behind the scenes at the shop and care tips for seasonal flowers.",
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 13,
    text: "Followers know what they are signing up for, and TikTok gets a clearer picture of who might enjoy your videos.",
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 14,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Make Videos People Finish",
    anchorId: 'make-videos-people-finish',
    order: 15,
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 16,
    text: "Watch time and completion are among the strongest signals on TikTok. A video that people watch to the end, or rewatch, tends to be shown to more people. That starts with the first second.",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 17,
    items: [
      "Open with the result, the problem or a specific promise, not a greeting.",
      "Cut pauses and anything that does not move the video forward.",
      "Add on-screen text so people can follow without sound.",
      "Keep one idea per video, and save extra points for a follow up.",
      "End with a reason to stay connected, such as \"part two tomorrow\" or \"I answer these every week\".",
    ],
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 18,
    text: "Length should match the idea. A quick tip might need fifteen seconds. A tutorial might need two minutes. A short video that is finished is better than a long one that loses people halfway.",
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Give People a Reason to Come Back",
    anchorId: 'give-people-a-reason-to-come-back',
    order: 19,
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 20,
    text: "Series are one of the most reliable ways to turn viewers into followers. \"Day 12 of renovating our cabin\", \"Part 3 of beginner sourdough\" or a weekly \"customer question\" video all signal that more is coming. Viewers who enjoyed one episode follow so they do not miss the next.",
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 21,
    text: "Consistency helps in the same way. Posting on a schedule you can keep, even three or four times a week, gives followers a habit of seeing you. If you plan ahead with a TikTok content calendar, it becomes much easier to keep that rhythm.",
    inlineLinks: [
      { href: "/learn/how-to-create-a-tiktok-content-calendar", label: "TikTok content calendar" },
    ],
  },
  {
    id: 'b-fig-content-strategy',
    type: 'figure',
    order: 22,
    image: {
      src: `${IMG}/tiktok-content-strategy.png`,
      alt: 'TikTok content strategy with video planning, publishing schedule, content ideas and audience engagement workflow.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Use Search to Be Found",
    anchorId: 'use-search-to-be-found',
    order: 23,
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 24,
    text: "Many people search TikTok the way they search Google, for recipes, product reviews, local spots and how-to answers. Videos that clearly answer a search keep bringing in viewers for months.",
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 25,
    text: "Say your main keyword out loud in the video, include it in on-screen text and write it naturally in the caption. Creator Search Insights in the TikTok app shows what people are searching for in your topic, including searches where there is little content yet. Our TikTok SEO guide explains how to research and use these keywords.",
    inlineLinks: [
      { href: "/learn/tiktok-seo-guide", label: "TikTok SEO guide" },
    ],
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Talk With Your Audience",
    anchorId: 'talk-with-your-audience',
    order: 26,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 27,
    text: "TikTok rewards conversation, and conversation builds the trust that keeps followers around. Reply to comments, especially in the first hours after posting. Better still, answer good questions with a video reply. It creates new content, shows the person who asked that you listened and often brings new followers who had the same question.",
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 28,
    text: "Duets and Stitches let you respond to other creators' videos in your niche, adding your own view or expertise. Once your account meets TikTok's requirements, LIVE sessions are another way to answer questions and get to know your regular viewers.",
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Build Trust Over Time",
    anchorId: 'build-trust-over-time',
    order: 29,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 30,
    text: "People follow accounts they trust, and trust grows slowly. Be honest about results, show the people behind the account and avoid exaggerated claims. If you work with brands, label paid partnerships using TikTok's branded content tools. For businesses, showing your process, your team and genuine customer questions does more for trust than polished adverts.",
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 31,
    text: "Staying within TikTok's Community Guidelines matters too. Videos that break the rules can be removed or made ineligible for the For You feed, which cuts off the main source of new followers.",
    inlineLinks: [
      { href: "https://www.tiktok.com/community-guidelines/en/community-principles", label: "Community Guidelines", external: true },
    ],
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Mistakes That Slow TikTok Growth",
    anchorId: 'mistakes-that-slow-tiktok-growth',
    order: 32,
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 33,
    text: "Many accounts stall for reasons that are easy to fix:",
  },
  {
    id: 'b-list-3',
    type: 'bulleted_list',
    order: 34,
    items: [
      "Posting trends with no connection to your topic, so viewers who arrive do not stay.",
      "Using long introductions before getting to the point.",
      "Deleting videos that did not perform, which removes useful data without fixing the cause.",
      "Changing direction every week, so followers lose track of why they followed.",
      "Asking for follows in every video instead of giving people a reason.",
      "Reposting the same video repeatedly, which TikTok may treat as unoriginal.",
      "Using apps or schemes that promise free followers or ask for your login details.",
      "Judging success by one viral video rather than steady progress.",
    ],
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Track What Brings Followers",
    anchorId: 'track-what-brings-followers',
    order: 35,
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 36,
    text: "TikTok Studio shows how many followers each video brought in, along with views, watch time, traffic sources and profile views. Review your results every couple of weeks:",
  },
  {
    id: 'b-list-4',
    type: 'numbered_list',
    order: 37,
    items: [
      "Sort your recent videos by new followers, not views.",
      "Note the topic, hook, length and format of the top performers.",
      "Check average watch time to see where people stop watching.",
      "Look at traffic sources to see whether people found you through For You, search or your profile.",
      "Make more of what brings followers and adjust the rest.",
    ],
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 38,
    image: {
      src: `${IMG}/tiktok-followers-analytics-dashboard.png`,
      alt: 'TikTok analytics dashboard displaying follower growth, video views, watch time, engagement and audience insights.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-21',
    type: 'paragraph',
    order: 39,
    text: "A video with 4,000 views and 60 new followers may be more valuable than one with 40,000 views and 15 followers. Following is the number to watch. If you get plenty of views but few follows, our guide to getting more TikTok views explains how reach and follower growth fit together.",
    inlineLinks: [
      { href: "/learn/how-to-get-more-tiktok-views", label: "getting more TikTok views" },
    ],
  },
  {
    id: 'b-h-11',
    type: 'heading',
    headingLevel: 2,
    text: "What to Expect",
    anchorId: 'what-to-expect',
    order: 40,
  },
  {
    id: 'b-p-22',
    type: 'paragraph',
    order: 41,
    text: "Most accounts grow in steps rather than a smooth line. A video takes off, followers jump, and then growth settles until the next one. Some followers who arrive from a single viral video will leave again if your other content is different, and that is normal.",
  },
  {
    id: 'b-p-23',
    type: 'paragraph',
    order: 42,
    text: "Keep making focused videos, talk with the people who watch and review what works every few weeks. Followers come from viewers who believe your next video will be worth watching.",
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

export const HOW_TO_GET_MORE_TIKTOK_FOLLOWERS_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-get-more-tiktok-followers',
  slug: SLUG,
  title: "How to Get More TikTok Followers: A Practical Growth Guide",
  excerpt: "TikTok followers come from viewers who see a reason to come back. Here is how to set up your profile, plan videos, use search and series, and avoid the mistakes that stall growth.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'marketing', 'creator', 'engagement'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-get-more-tiktok-followers.png`,
    alt: 'Strategies to grow TikTok followers through engaging videos, profile optimization, audience interaction and analytics.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Get More TikTok Followers (Practical Guide)",
    description: "How to get more TikTok followers: set up a clear profile, make videos people finish, use series and search, reply with videos and avoid common growth mistakes.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how to get more tiktok followers",
      "get tiktok followers",
      "grow on tiktok",
      "tiktok growth guide",
      "tiktok growth mistakes",
      "build trust on tiktok",
    ],
    ogImage: `${IMG}/how-to-get-more-tiktok-followers.png`,
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'how-to-get-more-tiktok-views',
    'how-to-get-more-tiktok-likes',
    'tiktok-seo-guide',
    'how-to-create-a-tiktok-content-calendar',
    'tiktok-for-business',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "Follower count is not a direct factor in TikTok recommendations, so new accounts can reach people.",
    "A clear bio, pinned videos and a focused grid turn profile visits into follows.",
    "Strong hooks and high completion help videos reach more viewers.",
    "Series and a steady schedule give people a reason to come back.",
    "Search friendly videos keep bringing in viewers over time.",
    "Track new followers per video, not just views, in TikTok Studio.",
  ],
  faqs: [
    {
      id: 'faq-how-to-get-more-tiktok-followers-1',
      question: "How can I get more followers on TikTok?",
      answer: "Set up a clear profile, pick a recognisable direction, make videos people watch to the end, post series and reply to comments with videos. Track which videos bring followers and make more like them.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-followers-2',
      question: "Does TikTok show videos only to my followers?",
      answer: "No. Most views come from the For You feed, which shows videos to people based on their interests. TikTok says follower count is not a direct factor in recommendations.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-followers-3',
      question: "How often should I post on TikTok to grow?",
      answer: "A schedule you can keep matters more than volume. Three to five videos a week is a realistic target for many creators and businesses.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-followers-4',
      question: "Why do I get views but no followers on TikTok?",
      answer: "Viewers may enjoy one video without seeing why they should follow. A clearer profile, related videos and series usually help.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-followers-5',
      question: "Should I delete TikTok videos that did not perform?",
      answer: "Usually not. They can still bring in search traffic later, and their results show you what to change.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-followers-6',
      question: "Can I see who follows me from each video?",
      answer: "TikTok Studio shows how many new followers each video brought in, along with traffic sources and watch time.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-tiktok-followers',
    label: 'Explore TikTok Followers Packages',
    description: "Compare follower packages on InstantViral when you want to support a profile that is already posting consistently.",
  },
};
