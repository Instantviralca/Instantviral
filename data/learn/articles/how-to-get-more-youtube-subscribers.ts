/**
 * Learn article — How to Get More YouTube Subscribers.
 * Editorial source: manually written production copy (YouTube Article #4).
 *
 * Related cluster: Growth Guide, Algorithm and SEO Guide are live; remaining
 * YouTube Learn titles preserved as text until registered.
 * Commercial linking: subscribers and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-get-more-youtube-subscribers';
const IMG = '/assets/images/learn/how-to-get-more-youtube-subscribers' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "Views tell you people watched a video. Subscribers tell you they want to see what you make next. A growing subscriber base means more people notified about new uploads, more returning viewers and a more stable channel.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "People subscribe when three things are true: they enjoyed a video, they understand what your channel is about and they believe more good videos are coming. This guide covers how to make all three clear, from channel setup to content planning, community and analytics.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Make It Obvious What Your Channel Offers",
    anchorId: 'make-it-obvious-what-your-channel-offers',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "When someone enjoys a video and visits your channel, they decide in seconds whether to subscribe. Your channel page has to answer one question quickly: what will I get if I subscribe?",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 5,
    items: [
      "Use a clear profile picture and a banner that states your topic, such as \"Easy home repairs every Thursday\".",
      "Write a short channel description that explains who the channel is for and what you post.",
      "Add a channel trailer that introduces you to people who have not subscribed yet.",
      "Organise videos into playlists by topic so visitors can find more of what brought them in.",
      "Feature your best or most popular video on the home tab.",
    ],
  },
  {
    id: 'b-fig-branding',
    type: 'figure',
    order: 6,
    image: {
      src: `${IMG}/youtube-channel-branding.png`,
      alt: 'YouTube channel branding with banner artwork, profile image, playlists, consistent visual identity and professional channel.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Choose a Clear Focus",
    anchorId: 'choose-a-clear-focus',
    order: 7,
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 8,
    text: "Channels with a clear focus tend to turn more viewers into subscribers, because people know what to expect. That does not mean you can only cover one narrow topic, but your videos should feel connected. A channel about budget travel in Canada might cover road trips, affordable places to stay, national parks and packing tips. A channel that jumps from travel to gaming to recipes makes it hard for viewers to know why they should subscribe.",
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 9,
    text: "If you want to explore a new topic, introduce it gradually and watch how your audience responds.",
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Plan Series and Return Visits",
    anchorId: 'plan-series-and-return-visits',
    order: 10,
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 11,
    text: "Series are one of the most effective ways to win subscribers. When viewers see \"Part 1 of 6\" or a recurring weekly format, they subscribe so they do not miss the rest. Examples include a renovation series following one project, a monthly budget update or a weekly question and answer episode.",
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 12,
    text: "A consistent upload schedule supports this. If viewers know a new video arrives every Tuesday, subscribing makes sense. Choose a rhythm you can keep for months, even if that is one video a week.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Make Videos That Earn the Subscribe",
    anchorId: 'make-videos-that-earn-the-subscribe',
    order: 13,
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 14,
    text: "Subscribers come from videos that deliver real value. The basics matter:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 15,
    items: [
      "Start with the value, not a long introduction.",
      "Deliver what the title and thumbnail promised.",
      "Keep the pace tight so people watch to the end.",
      "Show your personality, because people subscribe to people.",
      "End by pointing to a related video so viewers keep watching.",
    ],
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 16,
    text: "Our guide on how to get more YouTube views covers titles, thumbnails and retention in more detail.",
    inlineLinks: [
      { href: "/learn/how-to-get-more-youtube-views", label: "get more YouTube views" },
    ],
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Ask at the Right Moment",
    anchorId: 'ask-at-the-right-moment',
    order: 17,
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 18,
    text: "Asking viewers to subscribe still works, but timing matters. Asking in the first ten seconds, before you have given anything, feels pushy. Asking after you have delivered value feels natural, for example \"If this saved you a trip to the mechanic, subscribe for a new repair guide every week.\"",
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 19,
    text: "Be specific about what they get. \"Subscribe for more\" is weaker than telling viewers exactly what the next video or series will cover. You can also add a branding watermark in YouTube Studio, which shows a subscribe option on your videos.",
  },
  {
    id: 'b-svc-subscribers',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-subscribers',
    label: 'Buy YouTube Subscribers Canada',
    description:
      'Compare real subscriber packages when you want to support channel growth alongside organic content.',
    order: 20,
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Use Shorts to Reach New Viewers",
    anchorId: 'use-shorts-to-reach-new-viewers',
    order: 21,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 22,
    text: "Shorts can bring your channel in front of many people who have never seen it. Use them for quick tips, highlights and previews of longer videos. Viewers who enjoy a Short can subscribe directly from the Shorts player, so make sure your Shorts reflect what the channel is about. A Short that goes viral on an unrelated topic may bring views but few lasting subscribers.",
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Build Community",
    anchorId: 'build-community',
    order: 23,
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 24,
    text: "Subscribers stay when they feel connected. Reply to comments, especially early after an upload. Pin a helpful comment or a question for discussion. Use community posts to share updates, polls and behind the scenes moments between videos. Live streams and premieres let you talk with viewers in real time.",
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 25,
    text: "Mentioning viewer questions or comments in your videos shows people they are heard, and it often encourages more viewers to join in.",
  },
  {
    id: 'b-fig-community',
    type: 'figure',
    order: 26,
    image: {
      src: `${IMG}/youtube-community-growth.png`,
      alt: 'YouTube community growth through audience engagement, comments, subscribers, returning viewers and valuable educational.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Collaborate With Other Creators",
    anchorId: 'collaborate-with-other-creators',
    order: 27,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 28,
    text: "Collaborations introduce your channel to an audience that already enjoys similar content. Look for creators with a related focus and a similar audience size. Guest appearances, joint videos and shout outs work best when both channels benefit and the content feels natural to each audience.",
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Track What Brings Subscribers",
    anchorId: 'track-what-brings-subscribers',
    order: 29,
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 30,
    text: "YouTube Studio shows how many subscribers each video gained and lost, where those subscribers came from and how your audience is growing. Review it monthly:",
  },
  {
    id: 'b-list-3',
    type: 'numbered_list',
    order: 31,
    items: [
      "Which videos gained the most subscribers?",
      "Were they search driven, suggested or from Shorts?",
      "What topics, formats or series do they share?",
      "Which videos led to unsubscribes?",
      "What will you make more of next month?",
    ],
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 32,
    image: {
      src: `${IMG}/youtube-subscriber-analytics-dashboard.png`,
      alt: 'Business analytics dashboard displaying YouTube subscriber growth, watch time, audience retention, returning viewers.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 33,
    text: "A video with modest views but a high number of new subscribers is often more valuable than a viral video that gains few. The YouTube Creators site has free lessons on growing an audience and using analytics.",
    inlineLinks: [
      { href: "https://www.youtube.com/creators/", label: "Creators site", external: true },
    ],
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Mistakes That Slow Subscriber Growth",
    anchorId: 'mistakes-that-slow-subscriber-growth',
    order: 34,
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 35,
    items: [
      "Uploading without a clear focus, so viewers do not know what to expect.",
      "Long gaps between videos with no explanation.",
      "Asking for subscriptions before giving any value.",
      "Ignoring comments from the people already watching.",
      "Using misleading titles or thumbnails that disappoint viewers.",
      "Judging the channel by one video rather than the trend over months.",
    ],
  },
  {
    id: 'b-h-11',
    type: 'heading',
    headingLevel: 2,
    text: "Growth Takes Time",
    anchorId: 'growth-takes-time',
    order: 36,
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 37,
    text: "Most channels grow slowly at first and speed up as their library grows and older videos keep bringing in new viewers. Keep your focus clear, upload on a steady schedule, give viewers a reason to come back and learn from your analytics. Subscribers follow channels that consistently deliver what they promise.",
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

export const HOW_TO_GET_MORE_YOUTUBE_SUBSCRIBERS_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-get-more-youtube-subscribers',
  slug: SLUG,
  title: "How to Get More YouTube Subscribers: A Practical Channel Guide",
  excerpt: "Viewers subscribe when they expect your next video to be worth watching. Here is how to set up your channel, plan content, ask at the right moment and track what brings subscribers.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'youtube',
  tags: ['subscribers', 'marketing', 'creator', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-get-more-youtube-subscribers.png`,
    alt: 'YouTube creator growing subscribers through valuable content, audience engagement, channel optimization, consistent.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Get More YouTube Subscribers",
    description: "How to get more YouTube subscribers: set up a clear channel, plan series viewers want, ask at the right moment, use Shorts and track what works.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how to get more youtube subscribers",
      "get more subscribers on youtube",
      "grow youtube channel",
      "youtube subscribers tips",
      "youtube channel growth",
    ],
    ogImage: `${IMG}/how-to-get-more-youtube-subscribers.png`,
  },
  relatedServices: ['buy-youtube-subscribers', 'buy-youtube-views'],
  relatedArticles: [
    'how-to-get-more-youtube-views',
    'organic-vs-paid-social-media-growth',
    'social-media-marketing-mistakes',
    'how-to-get-more-tiktok-followers',
    'how-to-grow-instagram-followers-organically',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "People subscribe when they enjoyed a video and expect more like it.",
    "A clear banner, description, trailer and playlists explain what you offer.",
    "Series and a steady schedule give viewers a reason to subscribe.",
    "Ask for the subscribe after delivering value, and say what viewers will get.",
    "Shorts, community posts and collaborations bring in new viewers.",
    "Track subscribers gained per video in YouTube Studio every month.",
  ],
  faqs: [
    {
      id: 'faq-how-to-get-more-youtube-subscribers-1',
      question: "How can I get more subscribers on YouTube?",
      answer: "Make your channel focus clear, upload on a steady schedule, create series, ask viewers to subscribe after delivering value, reply to comments and track which videos bring subscribers.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-subscribers-2',
      question: "When should I ask viewers to subscribe?",
      answer: "After you have delivered value, not in the first seconds. Tell viewers specifically what they will get from future videos.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-subscribers-3',
      question: "Do YouTube Shorts help gain subscribers?",
      answer: "Yes. Viewers can subscribe directly from the Shorts player. Make sure your Shorts reflect your channel topic so new subscribers stay.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-subscribers-4',
      question: "How often should I upload to grow subscribers?",
      answer: "A schedule you can keep matters more than frequency. One quality video a week is a realistic target for many creators.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-subscribers-5',
      question: "How do I see which videos bring subscribers?",
      answer: "YouTube Studio shows subscribers gained and lost for each video, along with where they came from.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-subscribers-6',
      question: "Why am I losing subscribers on YouTube?",
      answer: "Common reasons include changes in topic, long gaps between uploads or videos that do not match what subscribers expected. Check unsubscribes per video in YouTube Studio.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-youtube-subscribers',
    label: 'Explore YouTube Subscribers Packages',
    description: "Compare YouTube subscriber packages on InstantViral when you want to support a channel that is already uploading regularly.",
  },
};
