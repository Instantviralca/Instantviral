/**
 * Learn article — How to Grow Instagram Followers Organically.
 * Editorial source: manually written production copy (Article #1).
 * Images pending — publish after featured/inline assets are added.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-grow-instagram-followers-organically';
const IMG = '/assets/images/learn/how-to-grow-instagram-followers-organically' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "Organic growth means people choose to follow you because of what they see on your profile and in your posts, without paid ads pushing them there. It is slower than buying reach, but the followers it brings tend to stay, engage and eventually become customers or a loyal audience.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "There is no secret setting that unlocks growth. What works is a combination of a clear profile, content people want more of, being easy to find and showing up consistently. This guide brings all of those together, with examples you can apply to a personal brand, a creator account or a local business in Canada.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Decide Who the Account Is For",
    anchorId: 'decide-who-the-account-is-for',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "Every growth decision becomes easier once you know exactly who you want to follow you. \"Everyone interested in food\" is too broad. \"People in Calgary looking for quick weeknight dinners\" is specific enough to guide what you post, how you write and when you publish.",
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "Write one sentence that describes your ideal follower and what they get from you. A physiotherapy clinic in Ottawa might say: \"Desk workers in Ottawa who want simple ways to ease back and neck pain.\" Every post can then be checked against that sentence.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Make Your Profile Worth Following",
    anchorId: 'make-your-profile-worth-following',
    order: 6,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "When someone enjoys a post and taps through to your profile, they decide in a few seconds whether to follow. Your profile has to answer three questions quickly: who is this, what will I get, and is it for me?",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 8,
    items: [
      "Use a clear profile photo, such as your face for a personal brand or a simple logo for a business.",
      "Put a searchable keyword in your name field, for example \"Mia | Toronto Wedding Photographer\".",
      "Write a bio that says what you post and who it helps, in plain words.",
      "Add a link to your website, booking page or most useful resource.",
      "Use Story Highlights to answer common questions, show results and explain your services.",
      "Pin up to three posts that show your best work and what new followers can expect.",
    ],
  },
  {
    id: 'b-fig-profile',
    type: 'figure',
    order: 9,
    image: {
      src: `${IMG}/instagram-profile-optimization-guide.png`,
      alt: 'Instagram profile optimization with profile photo, bio, highlights and branding elements.',
      width: 1536,
      height: 1024,
    },
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 10,
    text: "The top row of your grid matters too. If your last nine posts cover nine unrelated topics, a new visitor cannot tell what following you will bring. Consistency in topic is more important than a perfectly matched colour scheme.",
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Choose Three to Five Content Pillars",
    anchorId: 'choose-three-to-five-content-pillars',
    order: 11,
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 12,
    text: "Content pillars are the main topics your account covers. They keep your posts focused while giving you enough variety to avoid repeating yourself. A home renovation company in Winnipeg might use four pillars: before and after projects, practical maintenance tips, behind the scenes with the team and answers to customer questions.",
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 13,
    text: "Rotate between your pillars across the week. Over time you will see which ones bring new followers and which ones keep existing followers engaged, and you can adjust the balance.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Use Reels to Reach People Who Do Not Follow You Yet",
    anchorId: 'use-reels-to-reach-people-who-do-not-follow-you-yet',
    order: 14,
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 15,
    text: "Reels are the format Instagram is most likely to recommend to people outside your current audience, which makes them the main engine for organic growth. A Reel that people watch through to the end and send to friends can put your account in front of thousands of new viewers.",
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 16,
    text: "What tends to work:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 17,
    items: [
      "Open with the point, the result or a clear question in the first second.",
      "Keep each Reel focused on one idea.",
      "Add short on-screen text so people can follow without sound.",
      "Show your face or voice where it fits, because people follow people.",
      "Make a series, such as \"Renovation mistakes, part 3\", so viewers know more is coming.",
    ],
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 18,
    text: "Professional accounts can also share trial reels, which Instagram shows to non-followers first. They are a low-risk way to test a new idea or style before showing it to your existing audience.",
  },
  {
    id: 'b-fig-content',
    type: 'figure',
    order: 19,
    image: {
      src: `${IMG}/instagram-content-strategy.png`,
      alt: 'Content planning dashboard for Instagram showing posts, reels, carousel ideas and publishing calendar.',
      width: 1536,
      height: 1024,
    },
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Make Your Account Easy to Find in Search",
    anchorId: 'make-your-account-easy-to-find-in-search',
    order: 20,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 21,
    text: "Many people find accounts through Instagram search rather than the Feed. Instagram uses your name, username, bio, captions and on-screen text to understand what you are about, so the words you use matter.",
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 22,
    text: "Write captions that include the terms your audience would actually search for. A caption that says \"Easy one-pan salmon dinner ready in 20 minutes\" is far more searchable than \"Tonight's vibes\". Add alt text to important images, and use location tags when your audience is local. A café in Victoria that tags its location and mentions the neighbourhood in captions is more likely to appear when people nearby search for coffee.",
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 23,
    text: "Hashtags still help Instagram categorise a post, but they are a minor factor. Use a few specific hashtags that describe the post, such as a local or niche tag, rather than a long block of the most popular ones.",
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Post Consistently, Not Constantly",
    anchorId: 'post-consistently-not-constantly',
    order: 24,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 25,
    text: "Posting every day is not required. Posting on a schedule you can keep up for months is. Two or three strong posts a week plus regular Stories will usually do more for growth than daily posts that feel rushed.",
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 26,
    text: "Batch your work. Plan a week of ideas at once, film several Reels in one session and schedule posts ahead of time. Our guide on building a content calendar shows a simple system that works for Instagram as well as TikTok.",
    inlineLinks: [
      { href: "/learn/how-to-create-a-tiktok-content-calendar", label: "content calendar" },
    ],
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Build Trust and Community",
    anchorId: 'build-trust-and-community',
    order: 27,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 28,
    text: "People follow accounts they trust. Trust grows when your content is consistent, honest and responsive. Answer comments and DMs, explain your process, show the people behind the account and share results without exaggerating them.",
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 29,
    text: "For businesses, customer stories and answers to real questions build confidence. For creators, being open about what you are learning and what did not work makes you relatable. If you work with brands, disclose paid partnerships clearly. In Canada, Ad Standards publishes influencer marketing disclosure guidelines that explain how to label sponsored content so your audience is never misled.",
    inlineLinks: [
      { href: "https://adstandards.ca/wp-content/uploads/Ad-Standards-Influencer-Marketing-Disclosure-Guidelines-2025-10-08.pdf", label: "influencer marketing disclosure guidelines", external: true },
    ],
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 30,
    text: "Engagement works both ways. Spend time each day commenting thoughtfully on posts from accounts in your niche and your local community. People notice, visit your profile and often follow back when your content suits them.",
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Collaborate With Others in Your Niche",
    anchorId: 'collaborate-with-others-in-your-niche',
    order: 31,
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 32,
    text: "Collaboration is one of the fastest organic ways to reach a relevant audience. Collab posts appear on both accounts at once. Guest appearances in each other's Reels, joint Lives and shared giveaways with clear rules all introduce you to people who already care about your topic.",
  },
  {
    id: 'b-p-21',
    type: 'paragraph',
    order: 33,
    text: "Look for partners with a similar audience size and a related, not identical, focus. A yoga studio and a healthy meal prep service in the same city share an audience without competing for it.",
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 34,
    serviceSlug: 'buy-instagram-followers',
    label: 'Buy Instagram Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Avoid the Mistakes That Stall Growth",
    anchorId: 'avoid-the-mistakes-that-stall-growth',
    order: 35,
  },
  {
    id: 'b-p-22',
    type: 'paragraph',
    order: 36,
    text: "Some common habits slow growth or even hurt your account:",
  },
  {
    id: 'b-list-3',
    type: 'bulleted_list',
    order: 37,
    items: [
      "Following and unfollowing large numbers of accounts to get follow backs.",
      "Using apps that ask for your password or promise free followers, which Instagram warns can lead to account limits.",
      "Reposting other people's content without adding anything, which Instagram is less likely to recommend.",
      "Changing your topic every few weeks, so followers lose track of why they followed.",
      "Deleting posts that underperformed instead of learning from them.",
      "Ignoring comments and messages from the people who already engage.",
    ],
  },
  {
    id: 'b-p-23',
    type: 'paragraph',
    order: 38,
    text: "Instagram's Community Guidelines also prohibit artificially collecting likes, followers or shares. Growth that comes from people choosing to follow you is the kind that lasts.",
    inlineLinks: [
      { href: "https://help.instagram.com/477434105621119", label: "Community Guidelines", external: true },
    ],
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Measure What Is Working",
    anchorId: 'measure-what-is-working',
    order: 39,
  },
  {
    id: 'b-p-24',
    type: 'paragraph',
    order: 40,
    text: "Professional accounts can see in Insights how many followers each post brought in, along with reach, saves and shares. Review your results every two to four weeks rather than every day.",
  },
  {
    id: 'b-list-4',
    type: 'numbered_list',
    order: 41,
    items: [
      "List the posts that brought in the most new followers.",
      "Note what they have in common: topic, format, hook and length.",
      "Check where new followers found you, such as Reels, Explore or your profile.",
      "Look at which posts lost followers or had low engagement.",
      "Make more of what worked and adjust or drop what did not.",
    ],
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 42,
    image: {
      src: `${IMG}/instagram-analytics-dashboard.png`,
      alt: 'Instagram analytics dashboard displaying follower growth, reach, engagement and audience insights.',
      width: 1536,
      height: 1024,
    },
  },
  {
    id: 'b-h-11',
    type: 'heading',
    headingLevel: 2,
    text: "How Long Organic Growth Takes",
    anchorId: 'how-long-organic-growth-takes',
    order: 43,
  },
  {
    id: 'b-p-25',
    type: 'paragraph',
    order: 44,
    text: "Most accounts grow slowly at first and faster once they find a format that works. It is normal to post for several months before a Reel takes off and brings a wave of new followers. Short spikes are common too, and the follower count may dip a little afterwards as some people who followed for one post move on.",
  },
  {
    id: 'b-p-26',
    type: 'paragraph',
    order: 45,
    text: "Measure progress over months, not days. If your followers, reach and engagement are trending up over a quarter, your strategy is working. For a closer look at how Instagram decides what to show, read our guide to the Instagram algorithm.",
    inlineLinks: [
      { href: "/learn/instagram-algorithm-explained", label: "Instagram algorithm" },
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

export const HOW_TO_GROW_INSTAGRAM_FOLLOWERS_ORGANICALLY_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-grow-instagram-followers-organically',
  slug: SLUG,
  title: "How to Grow Instagram Followers Organically: A Practical Guide",
  excerpt: "Organic Instagram growth comes from a clear profile, content people want more of and steady habits. Here is how to attract followers without ads, step by step.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['followers', 'engagement', 'marketing', 'creator'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-grow-instagram-followers-organically.png`,
    alt: 'Organic Instagram growth with profile optimization, content strategy, audience engagement and analytics dashboard.',
    width: 1536,
    height: 1024,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Grow Instagram Followers Organically",
    description: "How to grow Instagram followers organically without ads: fix your profile, pick content pillars, use Reels and search, and build trust with your audience.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how to grow instagram followers organically",
      "grow instagram followers without ads",
      "instagram growth",
      "instagram seo",
      "instagram hashtags",
      "organic instagram growth",
    ],
    ogImage: `${IMG}/how-to-grow-instagram-followers-organically.png`,
  },
  relatedServices: [
    'buy-instagram-followers',
    'buy-instagram-likes',
    'buy-instagram-views',
    'buy-instagram-comments',
  ],
  relatedArticles: [
    'how-to-get-more-instagram-likes',
    'instagram-algorithm-explained',
    'best-time-to-post-on-instagram',
    'instagram-marketing-for-small-businesses',
    'organic-vs-paid-social-media-growth',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "Know exactly who the account is for before deciding what to post.",
    "A clear profile, bio and pinned posts turn visitors into followers.",
    "Use three to five content pillars to stay focused without repeating yourself.",
    "Reels and trial reels are the main way to reach people who do not follow you yet.",
    "Searchable captions, alt text and location tags help people find you.",
    "Avoid follow and unfollow tactics and apps that ask for your password.",
  ],
  faqs: [
    {
      id: 'faq-how-to-grow-instagram-followers-organically-1',
      question: "How can I grow Instagram followers organically?",
      answer: "Make your profile clear, post focused content around a few pillars, use Reels to reach new people, write searchable captions, engage with your community and post on a schedule you can keep.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-grow-instagram-followers-organically-2',
      question: "Can you grow on Instagram without ads?",
      answer: "Yes. Many accounts grow entirely through Reels, search, collaborations and community engagement. Ads can speed things up, but they are not required.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-grow-instagram-followers-organically-3',
      question: "How often should I post to grow on Instagram?",
      answer: "Two to four quality posts a week plus regular Stories is a realistic starting point for most accounts. Consistency matters more than volume.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-grow-instagram-followers-organically-4',
      question: "Do hashtags still help Instagram growth?",
      answer: "A little. They help Instagram understand what a post is about, but searchable captions, on-screen text and strong content matter far more.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-grow-instagram-followers-organically-5',
      question: "What are trial reels on Instagram?",
      answer: "Trial reels are Reels that professional accounts can share with non-followers first, so you can test new ideas before showing them to your followers.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-grow-instagram-followers-organically-6',
      question: "How long does it take to grow followers organically?",
      answer: "It varies widely. Most accounts need several months of consistent posting before growth speeds up. Judge progress over months rather than days.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-instagram-followers',
    label: 'Explore Instagram Followers Packages',
    description: "Compare follower packages on InstantViral when you want to support a profile that is already posting consistently.",
  },
};
