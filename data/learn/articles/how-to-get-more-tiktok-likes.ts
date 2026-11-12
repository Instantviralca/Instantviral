/**
 * Learn article — How to Get More TikTok Likes.
 * Editorial source: manually written production copy (TikTok Article #7).
 *
 * Related cluster links: growth guide, engagement, algorithm, SEO, best time exist;
 * views, common mistakes, TikTok for Business, organic vs paid pending.
 * Commercial linking: single service card (Buy TikTok Likes) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-get-more-tiktok-likes';
const IMG = '/assets/images/learn/how-to-get-more-tiktok-likes' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "A like on TikTok is a quick tap, but it means a viewer enjoyed a video enough to react. Likes sit alongside comments, shares, saves and watch time as signs that a video connects with people. Videos that collect them tend to be shown to more viewers, and more viewers bring more likes.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "This guide explains why people like videos, how likes fit into TikTok engagement as a whole and the practical changes that help a video earn more reactions.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Why People Like TikTok Videos",
    anchorId: 'why-people-like-tiktok-videos',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "People rarely like a video because they were asked to. They like it because it gave them something: a laugh, a useful tip, a satisfying result, a moment that felt relatable or a reaction to something they strongly agree with.",
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "Before you post, ask what feeling or value a viewer takes away. If you cannot name one, the video may get watched but not liked. If you can, make sure the video delivers it clearly and quickly.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Open With a Strong Hook",
    anchorId: 'open-with-a-strong-hook',
    order: 6,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "Likes start with attention. If people swipe away in the first second, they never reach the part worth liking. Show the result first, name a specific problem or start in the middle of the action. Add short on-screen text so viewers know what the video is about even with the sound off.",
  },
  {
    id: 'b-fig-video-hook',
    type: 'figure',
    order: 8,
    image: {
      src: `${IMG}/tiktok-video-hook-strategy.png`,
      alt: 'Effective TikTok video hooks with audience attention, watch time improvement and engagement optimization.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Deliver a Clear Payoff",
    anchorId: 'deliver-a-clear-payoff',
    order: 9,
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 10,
    text: "A strong hook promises something. The payoff is where you keep that promise, and it is usually the moment people tap like. A cleaning video pays off with the spotless result. A recipe pays off with the first bite. A tip pays off when the viewer understands something they did not before.",
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 11,
    text: "Make the payoff obvious and do not bury it under extra talking. Many videos lose likes because the best moment arrives after most viewers have already left.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Make It Relatable or Useful",
    anchorId: 'make-it-relatable-or-useful',
    order: 12,
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 13,
    text: "Two types of video tend to earn likes consistently:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 14,
    items: [
      "Relatable videos that show a shared experience, such as the struggle of a Canadian winter commute or the first week at a new job.",
      "Useful videos that solve a small problem quickly, such as a shortcut, a fix or a clear explanation.",
    ],
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 15,
    text: "Both work because viewers see themselves in the video or get something they value. The more specific the situation, the stronger the reaction tends to be.",
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Encourage Comments and Conversation",
    anchorId: 'encourage-comments-and-conversation',
    order: 16,
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 17,
    text: "Comments build engagement and often lead to more likes, because active conversations keep people on a video longer. End with a genuine question, share an opinion people can respond to or invite viewers to share their own experience.",
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 18,
    text: "Reply to comments quickly, especially in the first hours. Answer good questions with a video reply, which creates a new video, shows you listen and brings the original viewer back. Pinning a helpful comment can also steer the conversation.",
  },
  {
    id: 'b-fig-high-engagement',
    type: 'figure',
    order: 19,
    image: {
      src: `${IMG}/tiktok-high-engagement-content.png`,
      alt: 'High-engagement TikTok content including tutorials, educational videos, storytelling and audience interaction.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Use Formats That Invite Reactions",
    anchorId: 'use-formats-that-invite-reactions',
    order: 20,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 21,
    text: "Some TikTok formats naturally invite engagement:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 22,
    items: [
      "Duets and Stitches that react to or build on another video.",
      "Before and after reveals.",
      "Step by step tutorials with a satisfying finish.",
      "Quick lists, such as three tips or two mistakes.",
      "Polls and questions through stickers and captions.",
      "Series that keep people coming back for the next part.",
    ],
  },
  {
    id: 'b-svc-likes',
    type: 'related_service_card',
    order: 23,
    serviceSlug: 'buy-tiktok-likes',
    label: 'Buy TikTok Likes Canada',
    description:
      'Review like packages when you want to strengthen early engagement on high-value videos.',
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Post When Your Audience Is Active",
    anchorId: 'post-when-your-audience-is-active',
    order: 24,
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 25,
    text: "A video that goes out while your viewers are online collects early likes and comments, which helps TikTok show it to more people. TikTok Studio shows when your followers are most active. If your audience is spread across Canada, account for the time difference between the coasts. Our guide on the best time to post on TikTok explains how to test this.",
    inlineLinks: [
      { href: "/learn/best-time-to-post-on-tiktok", label: "best time to post on TikTok" },
    ],
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Read Likes Against Views",
    anchorId: 'read-likes-against-views',
    order: 26,
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 27,
    text: "Likes on their own can be misleading. A video with 2,000 likes from 20,000 views connected more strongly than one with 3,000 likes from 150,000 views. Comparing likes with views shows how well a video landed with the people who saw it.",
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 28,
    text: "In TikTok Studio, review your last ten to twenty videos together:",
  },
  {
    id: 'b-list-3',
    type: 'numbered_list',
    order: 29,
    items: [
      "Note the views and likes for each video.",
      "Compare likes relative to views to find your strongest videos.",
      "Look at comments, shares and saves for the same videos.",
      "Identify what the top performers have in common: topic, hook, length or format.",
      "Make more videos with those qualities and test one change at a time.",
    ],
  },
  {
    id: 'b-fig-likes-performance',
    type: 'figure',
    order: 30,
    image: {
      src: `${IMG}/tiktok-likes-performance-dashboard.png`,
      alt: 'TikTok analytics dashboard displaying likes, engagement rate, watch time, audience retention and video performance metrics.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 31,
    text: "There is no correct ratio for every account, because it varies by niche and format. Compare against your own average rather than someone else's numbers. If your videos get views but few reactions, our guide to getting more TikTok views explains how watch time and engagement work together.",
    inlineLinks: [
      { href: "/learn/how-to-get-more-tiktok-views", label: "getting more TikTok views" },
    ],
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Mistakes That Hold Likes Back",
    anchorId: 'mistakes-that-hold-likes-back',
    order: 32,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 33,
    text: "A few habits reduce likes without being obvious:",
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 34,
    items: [
      "Asking for likes in every video instead of giving people a reason.",
      "Long introductions that lose viewers before the payoff.",
      "Jumping on trends that do not fit your audience.",
      "Posting the same type of video until followers stop reacting.",
      "Ignoring comments, which slows conversations down.",
      "Using apps that promise free likes or ask for your login details.",
    ],
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 35,
    text: "TikTok's Community Guidelines do not allow artificially boosting engagement through schemes like these, and breaking them can put your account at risk.",
    inlineLinks: [
      { href: "https://www.tiktok.com/community-guidelines/en", label: "Community Guidelines", external: true },
    ],
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Keep Building Over Time",
    anchorId: 'keep-building-over-time',
    order: 36,
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 37,
    text: "Likes grow as you learn what your audience enjoys. Some videos will do better than others even when you follow every step, and that variation is normal. Focus on clear hooks, satisfying payoffs and real conversations, and review your results every few weeks. Over time, the trend matters far more than any single video.",
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

export const HOW_TO_GET_MORE_TIKTOK_LIKES_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-get-more-tiktok-likes',
  slug: SLUG,
  title: "How to Get More Likes on TikTok and Build Engagement",
  excerpt: "TikTok likes come from videos people enjoy enough to react to. Here is what makes viewers tap the heart, how likes fit into engagement and practical ways to earn more of both.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['likes', 'engagement', 'creator', 'marketing'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-get-more-tiktok-likes.png`,
    alt: 'Strategies to increase TikTok likes through engaging videos, audience interaction, content optimization and performance.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Get More Likes on TikTok",
    description: "How to get more likes on TikTok: stronger hooks, clear payoffs, relatable ideas, smart use of comments and a simple way to read likes against views.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how to get more likes on tiktok",
      "get more tiktok likes",
      "tiktok engagement",
      "increase tiktok engagement",
      "tiktok like to view ratio",
    ],
    ogImage: `${IMG}/how-to-get-more-tiktok-likes.png`,
  },
  relatedServices: ['buy-tiktok-likes'],
  relatedArticles: [
    'how-to-get-more-tiktok-views',
    'how-to-get-more-tiktok-followers',
    'tiktok-seo-guide',
    'best-time-to-post-on-tiktok',
    'tiktok-for-business',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "People like videos that entertain, help or feel relatable.",
    "A strong hook and a clear payoff are where most likes are earned.",
    "Comments and replies build engagement that supports likes.",
    "Formats like before and afters, tutorials and series invite reactions.",
    "Compare likes with views to see which videos truly connected.",
    "Avoid asking for likes and apps that promise free engagement.",
  ],
  faqs: [
    {
      id: 'faq-how-to-get-more-tiktok-likes-1',
      question: "How can I get more likes on TikTok?",
      answer: "Open with a strong hook, deliver a clear payoff, make videos relatable or useful, invite comments, reply quickly and post when your audience is active.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-likes-2',
      question: "Do likes help TikTok videos get more views?",
      answer: "Likes are one of several engagement signals, along with watch time, shares and comments, that help TikTok decide whether to show a video to more people.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-likes-3',
      question: "What is a good like to view ratio on TikTok?",
      answer: "It varies by niche and format. Compare each video against your own average and look for patterns in the ones that do best.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-likes-4',
      question: "Should I ask viewers to like my TikTok videos?",
      answer: "It is better to give them a reason through a strong payoff. Asking a genuine question usually drives more engagement than asking for likes.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-likes-5',
      question: "Why do my TikTok videos get views but no likes?",
      answer: "Viewers may be watching without feeling strongly about the video. Clearer payoffs, more relatable ideas and stronger endings usually help.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-tiktok-likes-6',
      question: "Does replying to comments help on TikTok?",
      answer: "Yes. Replies keep conversations going, and video replies create new content that brings viewers back.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-tiktok-likes',
    label: 'Explore TikTok Likes Packages',
    description: "Compare TikTok like packages on InstantViral when you want to support early engagement on a video that already deserves attention.",
  },
};
