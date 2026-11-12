/**
 * Learn article — How to Get More Facebook Followers.
 * Editorial source: manually written production copy (Facebook Article #2).
 *
 * Related cluster: Complete Facebook Growth Guide is live; other Facebook
 * Learn titles preserved as text until registered.
 * Commercial linking: single service card (Buy Facebook Followers) only.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-get-more-facebook-followers';
const IMG = '/assets/images/learn/how-to-get-more-facebook-followers' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "Facebook is still one of the most used platforms in Canada, and for many local businesses, community organisations and creators, a Facebook Page remains the place where customers check opening hours, read updates and send messages. Growing the number of people who follow that Page means more of them see your posts.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "Growth on Facebook works a little differently than it used to. Pages now centre on followers rather than Page Likes, and Reels and recommendations play a much larger role. This guide explains what has changed, then covers practical ways to attract followers and keep them engaged.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Followers Have Replaced Page Likes",
    anchorId: 'followers-have-replaced-page-likes',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "Facebook has moved Pages from Likes to follows. Following is what puts your posts in someone's Feed, and it is the number Meta now treats as your audience. In 2025, Meta also announced it was retiring the old Page Likes metric from its Page Insights API, so follower counts are the figure to track.",
    inlineLinks: [
      { href: "https://developers.facebook.com/blog/post/2025/08/15/page-insights-api-updates/", label: "Page Insights API", external: true },
    ],
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "If you compare an old Page Like total with today's follower count, the numbers may not match. That is expected. Focus on follows going forward.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Set Up a Page People Want to Follow",
    anchorId: 'set-up-a-page-people-want-to-follow',
    order: 6,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "A visitor decides quickly whether your Page is worth following. Make the essentials clear:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 8,
    items: [
      "Use a recognisable profile picture, such as your logo or a clear photo of you.",
      "Choose a cover image or video that shows what you do.",
      "Pick the most accurate category so Facebook knows what kind of Page you are.",
      "Write an intro that explains what you offer and who it is for.",
      "Add your address, service area, hours, phone number and website.",
      "Set a call to action button such as Book Now, Send Message or Call.",
      "Claim a simple username so your Page link is easy to share.",
    ],
  },
  {
    id: 'b-fig-page-growth',
    type: 'figure',
    order: 9,
    image: {
      src: `${IMG}/facebook-page-growth-strategy.png`,
      alt: 'Facebook Page optimization with professional branding, profile setup, cover image, call-to-action button and business.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Make Your Page Easy to Find",
    anchorId: 'make-your-page-easy-to-find',
    order: 10,
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 11,
    text: "People find Pages through Facebook search and often through Google too. The words on your Page help both understand what you do.",
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 12,
    text: "Include your main service and location naturally in your Page name where it fits, your intro and your posts. A Page called \"Riverside Dental Saskatoon\" with a clear intro about family dentistry is far easier to find than one with a vague name and an empty About section. Keep your name, address and phone number consistent with your website and Google Business Profile, because customers often check more than one place.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Post Content People Want to Share",
    anchorId: 'post-content-people-want-to-share',
    order: 13,
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 14,
    text: "Followers come from people who see your content and want more. On Facebook, the most effective posts usually help, inform or entertain people in your community:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 15,
    items: [
      "Tips and answers to common customer questions.",
      "Behind the scenes of your business or work.",
      "Before and after results.",
      "Local news about your business, such as new hours, products or events.",
      "Customer stories shared with permission.",
      "Questions and polls that invite opinions.",
    ],
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 16,
    text: "Shares matter on Facebook because they put your post in front of the sharer's friends, many of whom do not follow you yet. Ask yourself whether someone would want to pass a post on before you publish it.",
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Use Reels to Reach New People",
    anchorId: 'use-reels-to-reach-new-people',
    order: 17,
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 18,
    text: "Facebook recommends Reels to people who do not follow your Page, which makes them one of the best ways to grow. Short, clear videos that show your work, answer a question or tell a quick story can reach a much wider local audience than standard posts.",
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 19,
    text: "Keep Reels focused on one idea, open with the most interesting moment and add captions so they work without sound. If you already make short videos for Instagram or TikTok, you can adapt them for Facebook, using the original file rather than a downloaded version with another app's watermark.",
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    serviceSlug: 'buy-facebook-followers',
    label: 'Buy Facebook Followers Canada',
    description:
      'Compare real follower packages when you want to support Page growth alongside organic content.',
    order: 20,
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Invite People Who Already Engage",
    anchorId: 'invite-people-who-already-engage',
    order: 21,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 22,
    text: "People who react to or comment on your posts but do not follow you are your easiest new followers. Facebook lets Pages invite people who engaged with a post to follow the Page. Use it after posts that do well, especially ones that reached beyond your current audience.",
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 23,
    text: "Also share your Page wherever customers already meet you: your website, email signature, receipts, in store signs and other social profiles. A simple \"Follow us on Facebook for weekly specials\" on a counter card can bring in followers who are already customers.",
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Be Active in Groups",
    anchorId: 'be-active-in-groups',
    order: 24,
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 25,
    text: "Facebook Groups are where many local conversations happen, from neighbourhood groups to hobby and parent communities. Taking part as a helpful member, while following each group's rules, introduces people to your expertise. Answer questions well and avoid posting adverts where they are not welcome. People who find your answers useful will often look up your Page.",
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 26,
    text: "Some businesses also start their own group around a shared interest, such as a gardening group run by a local nursery. It builds a community that naturally connects back to your Page.",
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Reply and Build Relationships",
    anchorId: 'reply-and-build-relationships',
    order: 27,
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 28,
    text: "Facebook gives weight to meaningful interactions. Replying to comments, answering questions and starting conversations helps your posts reach more people and makes visitors more likely to follow. Respond to messages quickly too. A Page that answers promptly earns trust from customers who are deciding whether to contact you.",
  },
  {
    id: 'b-fig-community-engagement',
    type: 'figure',
    order: 29,
    image: {
      src: `${IMG}/facebook-community-engagement.png`,
      alt: 'Facebook community engagement through educational posts, meaningful discussions, comments, reactions, Groups and audience.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Collaborate and Cross Promote",
    anchorId: 'collaborate-and-cross-promote',
    order: 30,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 31,
    text: "Work with businesses and creators who share your audience. Joint giveaways with clear rules, co-hosted events and tagging partners in posts can introduce your Page to new people. A café and a local bakery supplying it, or a gym and a nutritionist, can promote each other naturally.",
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Track Your Follower Growth",
    anchorId: 'track-your-follower-growth',
    order: 32,
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 33,
    text: "Your Page insights in the professional dashboard or Meta Business Suite show follows, unfollows, reach and engagement over time. Review them every month:",
  },
  {
    id: 'b-list-3',
    type: 'numbered_list',
    order: 34,
    items: [
      "Which posts and Reels brought the most new followers?",
      "Where did new followers find you?",
      "Did follower growth change after you changed your posting rhythm or content?",
      "Which posts led to unfollows?",
      "What will you make more of next month?",
    ],
  },
  {
    id: 'b-fig-followers-dashboard',
    type: 'figure',
    order: 35,
    image: {
      src: `${IMG}/facebook-followers-growth-dashboard.png`,
      alt: 'Business analytics dashboard displaying Facebook follower growth, Page reach, engagement rate, profile visits, audience.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 36,
    text: "Some unfollows are normal for every Page. Watch the overall trend over several months rather than daily changes.",
  },
  {
    id: 'b-h-11',
    type: 'heading',
    headingLevel: 2,
    text: "Mistakes That Slow Facebook Growth",
    anchorId: 'mistakes-that-slow-facebook-growth',
    order: 37,
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 38,
    items: [
      "Leaving the About section incomplete or out of date.",
      "Posting only promotions and links away from Facebook.",
      "Ignoring comments and messages.",
      "Posting in bursts and then going quiet.",
      "Spamming groups with adverts.",
      "Running like or follow exchanges that bring in people with no interest in your business.",
    ],
  },
  {
    id: 'b-h-12',
    type: 'heading',
    headingLevel: 2,
    text: "Keep It Steady",
    anchorId: 'keep-it-steady',
    order: 39,
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 40,
    text: "Facebook growth rarely happens overnight. A complete Page, useful posts, regular Reels, quick replies and a monthly review will bring steady progress for most businesses. Once people follow, keeping them engaged is the next step, and our guide on how to increase Facebook engagement covers that in detail.",
    inlineLinks: [
      { href: "/learn/how-to-increase-facebook-engagement", label: "increase Facebook engagement" },
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

export const HOW_TO_GET_MORE_FACEBOOK_FOLLOWERS_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-get-more-facebook-followers',
  slug: SLUG,
  title: "How to Get More Facebook Followers for Your Page",
  excerpt: "Facebook Pages now grow through follows rather than Page Likes. Here is how to set up a Page people want to follow, what to post, how to be found and how to track follower growth.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'facebook',
  tags: ['followers', 'marketing', 'engagement', 'business'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-get-more-facebook-followers.png`,
    alt: 'Strategies to grow Facebook followers through valuable content, Page optimization, audience engagement, community building.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Get More Facebook Followers for Your Page",
    description: "How to get more Facebook followers for your Page: optimise it for search, post content people share, use Reels, invite engaged people and track growth.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how to get more facebook followers",
      "get more facebook page followers",
      "facebook page likes",
      "facebook seo",
      "facebook growth guide",
      "grow facebook page",
    ],
    ogImage: `${IMG}/how-to-get-more-facebook-followers.png`,
  },
  relatedServices: ['buy-facebook-followers'],
  relatedArticles: [
    'how-to-increase-facebook-engagement',
    'social-media-marketing-mistakes',
    'organic-vs-paid-social-media-growth',
    'instagram-marketing-for-small-businesses',
    'how-to-create-a-tiktok-content-calendar',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "Facebook Pages now centre on followers rather than Page Likes.",
    "A complete Page with clear details and a call to action converts more visitors.",
    "Include your service and location naturally so people can find you in search.",
    "Reels and shareable posts reach people who do not follow you yet.",
    "Invite people who engage with your posts to follow your Page.",
    "Track follows and unfollows monthly in your Page insights.",
  ],
  faqs: [
    {
      id: 'faq-how-to-get-more-facebook-followers-1',
      question: "How can I get more followers on my Facebook Page?",
      answer: "Complete your Page details, post content people want to share, use Reels to reach new people, invite people who engage with your posts and reply to comments and messages quickly.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-facebook-followers-2',
      question: "Are Facebook Page Likes and followers the same?",
      answer: "No. Facebook has moved Pages from Likes to follows. Followers are the people who see your posts in their Feed and the number Meta now treats as your audience.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-facebook-followers-3',
      question: "Do Facebook Reels help grow a Page?",
      answer: "Yes. Facebook recommends Reels to people who do not follow your Page, which makes them one of the best ways to reach new audiences.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-facebook-followers-4',
      question: "How do I make my Facebook Page show up in search?",
      answer: "Use an accurate category, include your main service and location naturally in your Page name and intro, and keep your contact details complete and consistent.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-facebook-followers-5',
      question: "Can I invite people to follow my Facebook Page?",
      answer: "Facebook lets Pages invite people who engaged with a post to follow the Page. You can also promote your Page on your website and in store.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-facebook-followers-6',
      question: "Why is my Facebook follower count going down?",
      answer: "Some unfollows are normal. Drops can also come from content changes or fake accounts being removed. Check follows and unfollows in your Page insights.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-facebook-followers',
    label: 'Explore Facebook Followers Packages',
    description: "Compare Facebook follower packages on InstantViral when you want to support a Page that is already posting useful content.",
  },
};
