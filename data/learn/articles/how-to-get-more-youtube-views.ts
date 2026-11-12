/**
 * Learn article — How to Get More YouTube Views.
 * Editorial source: manually written production copy (YouTube Article #5).
 *
 * Related cluster: Growth Guide, Algorithm, SEO Guide, Subscribers and Mistakes
 * are live.
 * Commercial linking: subscribers and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-get-more-youtube-views';
const IMG = '/assets/images/learn/how-to-get-more-youtube-views' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "YouTube works differently from most social apps. People come to it to search for answers, to watch creators they like and to follow recommendations that keep them watching. A video that matches what viewers want can keep collecting views for years, not just days.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "Getting more views means understanding where those views come from and making videos that satisfy the people who click. This guide explains how YouTube recommends videos, then covers titles and thumbnails, video SEO, retention, Shorts and the mistakes that most often hold channels back.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Where YouTube Views Come From",
    anchorId: 'where-youtube-views-come-from',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "Most views come from a few main traffic sources, which you can see in YouTube Studio:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 5,
    items: [
      "Browse features, mainly the Home page.",
      "Suggested videos, shown next to and after other videos.",
      "YouTube search.",
      "The Shorts feed.",
      "External sources, such as websites, social media and messages.",
    ],
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 6,
    text: "Each source rewards slightly different things. Search rewards clear relevance to a query. Home and suggested videos reward videos that viewers are likely to click and enjoy. Knowing which sources drive your views tells you where to focus.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "How YouTube Recommends Videos",
    anchorId: 'how-youtube-recommends-videos',
    order: 7,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 8,
    text: "YouTube's own site, How YouTube Works, explains that recommendations aim to match each viewer with videos they are likely to watch and be satisfied with. Signals include what people click, how long they watch, whether they like or dislike a video, whether they share it and responses to viewer surveys.",
    inlineLinks: [
      { href: "https://www.youtube.com/howyoutubeworks/", label: "How YouTube Works", external: true },
    ],
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 9,
    text: "In practice, YouTube tests a new video with viewers who are likely to be interested. If they click and keep watching, it shows the video to more people. A video that gets clicks but is quickly abandoned will not be recommended widely, because it did not satisfy viewers.",
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 10,
    text: "That means two things matter most: getting the right people to click, and keeping them watching once they do.",
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Write Titles People Want to Click",
    anchorId: 'write-titles-people-want-to-click',
    order: 11,
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 12,
    text: "A good title tells viewers exactly what they will get and why it matters to them. It should be clear before it is clever.",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 13,
    items: [
      "Put the main topic near the start, such as \"How to Winterize a Bike\" rather than \"My Weekend Project\".",
      "Promise a specific outcome or answer.",
      "Keep it short enough to read on a phone.",
      "Make sure the video delivers what the title promises.",
    ],
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 14,
    text: "Misleading titles may win a click, but viewers leave quickly, which tells YouTube the video did not satisfy them.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Design Thumbnails That Stand Out",
    anchorId: 'design-thumbnails-that-stand-out',
    order: 15,
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 16,
    text: "Thumbnails often decide whether someone clicks. Strong thumbnails usually have one clear subject, high contrast, readable text of a few words at most and an expression or result that makes people curious.",
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 17,
    text: "YouTube Studio offers Test and Compare, which lets you try different thumbnails on the same video and see which one viewers watch more. Use it on important videos to learn what works for your audience.",
  },
  {
    id: 'b-fig-thumbnails',
    type: 'figure',
    order: 18,
    image: {
      src: `${IMG}/youtube-click-worthy-thumbnails.png`,
      alt: 'YouTube thumbnail optimization with attractive visuals, consistent branding, higher click-through rate and improved video.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Make Your Videos Easy to Find in Search",
    anchorId: 'make-your-videos-easy-to-find-in-search',
    order: 19,
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 20,
    text: "Many YouTube views come from people searching for something specific. Video SEO helps YouTube understand what your video covers:",
  },
  {
    id: 'b-list-3',
    type: 'numbered_list',
    order: 21,
    items: [
      "Choose a topic people actually search for, using YouTube's search suggestions and your audience's questions.",
      "Use the main phrase naturally in your title and the start of your description.",
      "Write a description that summarises the video in plain language.",
      "Add chapters with clear names so viewers and YouTube can see what each part covers.",
      "Say the main topic out loud early in the video, since spoken words are used in captions.",
      "Group related videos into playlists.",
    ],
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 22,
    text: "Local and Canadian topics can work well in search because there is often less competition. A video on \"best winter tires for Ontario driving\" or \"how to file a GST/HST return as a sole proprietor\" can reach a very specific audience that is actively looking.",
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Keep Viewers Watching",
    anchorId: 'keep-viewers-watching',
    order: 23,
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 24,
    text: "Watch time and retention are central to how YouTube judges a video. The retention graph in YouTube Studio shows exactly where viewers leave.",
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 25,
    items: [
      "Start with the value, not a long introduction or channel trailer.",
      "Tell viewers what they will learn and then deliver it in a clear order.",
      "Cut repetition, long pauses and tangents.",
      "Use visuals, B-roll and on-screen text to keep the pace up.",
      "Fix the moments where the retention graph drops sharply in your next video.",
    ],
  },
  {
    id: 'b-fig-retention',
    type: 'figure',
    order: 26,
    image: {
      src: `${IMG}/youtube-watch-time-retention.png`,
      alt: 'YouTube audience retention with watch time graphs, viewer journey, video timeline and engagement improvements.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Keep Viewers on Your Channel",
    anchorId: 'keep-viewers-on-your-channel',
    order: 27,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 28,
    text: "Views grow faster when one video leads to another. End screens and cards can point viewers to a related video or playlist. Series and playlists encourage binge watching. Mention related videos naturally, such as \"I covered the setup in my last video\".",
  },
  {
    id: 'b-svc-views',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-views',
    label: 'Buy YouTube Views Canada',
    description:
      'Compare view packages when you want to support early traction on high-value uploads.',
    order: 29,
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Use Shorts as a Discovery Tool",
    anchorId: 'use-shorts-as-a-discovery-tool',
    order: 30,
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 31,
    text: "YouTube Shorts can introduce your channel to many new viewers. Use them to share quick tips, highlights from longer videos or behind the scenes moments. Link Shorts to a related long video where possible, so interested viewers have somewhere to go next. Shorts and long videos are measured differently, so judge each format on its own results.",
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Post Consistently",
    anchorId: 'post-consistently',
    order: 32,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 33,
    text: "A regular upload schedule gives your audience a reason to return and gives you more data to learn from. One strong video a week will usually do more than three rushed ones. If you are a small team, consider a rhythm such as one long video a week plus two or three Shorts.",
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Mistakes That Hold Channels Back",
    anchorId: 'mistakes-that-hold-channels-back',
    order: 34,
  },
  {
    id: 'b-list-5',
    type: 'bulleted_list',
    order: 35,
    items: [
      "Choosing topics nobody is searching for or recommending.",
      "Using vague titles and cluttered thumbnails.",
      "Long introductions that lose viewers before the value.",
      "Uploading irregularly, then disappearing for months.",
      "Ignoring the retention graph and repeating the same drop offs.",
      "Chasing trends that do not fit your channel.",
    ],
  },
  {
    id: 'b-h-11',
    type: 'heading',
    headingLevel: 2,
    text: "Track What Works",
    anchorId: 'track-what-works',
    order: 36,
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 37,
    text: "YouTube Studio shows impressions, click through rate, average view duration, traffic sources and audience retention for every video. Review your recent uploads each month:",
  },
  {
    id: 'b-list-6',
    type: 'numbered_list',
    order: 38,
    items: [
      "Which videos had the highest click through rate from impressions?",
      "Which held viewers longest?",
      "Which traffic sources brought the most views?",
      "Which search terms led people to your videos?",
      "What will you make more of next month?",
    ],
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 39,
    image: {
      src: `${IMG}/youtube-views-analytics-dashboard.png`,
      alt: 'Business analytics dashboard displaying YouTube views, traffic sources, click-through rate, audience retention, watch time.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 40,
    text: "The YouTube Creators site also has free lessons on analytics, discovery and channel strategy.",
    inlineLinks: [
      { href: "https://www.youtube.com/creators/", label: "Creators site", external: true },
    ],
  },
  {
    id: 'b-h-12',
    type: 'heading',
    headingLevel: 2,
    text: "Building Views Over Time",
    anchorId: 'building-views-over-time',
    order: 41,
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 42,
    text: "YouTube growth often feels slow at first and then speeds up as your library grows, because older videos keep bringing in views from search and suggestions. Focus on clear topics, honest titles, strong thumbnails and videos that keep their promise. When views turn into regular viewers, read our guide on how to get more YouTube subscribers.",
    inlineLinks: [
      { href: "/learn/how-to-get-more-youtube-subscribers", label: "get more YouTube subscribers" },
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

export const HOW_TO_GET_MORE_YOUTUBE_VIEWS_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-get-more-youtube-views',
  slug: SLUG,
  title: "How to Get More YouTube Views: Search, Recommendations and Retention",
  excerpt: "YouTube views come from search, Home and suggested videos. Here is how the recommendation system works and practical ways to improve titles, thumbnails, retention and video SEO.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'youtube',
  tags: ['views', 'marketing', 'creator', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-get-more-youtube-views.png`,
    alt: 'YouTube creator increasing video views through SEO, engaging thumbnails, audience retention, content optimization and.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Get More YouTube Views (Practical Guide)",
    description: "How to get more YouTube views: how recommendations work, better titles and thumbnails, video SEO, watch time, Shorts and mistakes that hold channels back.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how to get more youtube views",
      "get more views on youtube",
      "how the youtube algorithm works",
      "youtube seo",
      "youtube growth guide",
      "youtube growth mistakes",
    ],
    ogImage: `${IMG}/how-to-get-more-youtube-views.png`,
  },
  relatedServices: ['buy-youtube-subscribers', 'buy-youtube-views'],
  relatedArticles: [
    'how-to-get-more-youtube-subscribers',
    'organic-vs-paid-social-media-growth',
    'social-media-marketing-mistakes',
    'how-to-get-more-tiktok-views',
    'tiktok-seo-guide',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "YouTube views come from Home, suggested videos, search, Shorts and external sources.",
    "Recommendations aim to show videos viewers will watch and be satisfied with.",
    "Clear titles and strong thumbnails earn the click, retention keeps it.",
    "Video SEO, chapters and playlists help people find your videos in search.",
    "End screens, series and Shorts keep viewers moving through your channel.",
    "Review click through rate, retention and traffic sources every month.",
  ],
  faqs: [
    {
      id: 'faq-how-to-get-more-youtube-views-1',
      question: "How can I get more views on YouTube?",
      answer: "Choose topics people search for or want to watch, write clear titles, design strong thumbnails, start with the value, keep viewers watching and link videos together with end screens and playlists.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-views-2',
      question: "How does the YouTube algorithm work?",
      answer: "YouTube recommends videos it predicts viewers will watch and be satisfied with, using signals such as clicks, watch time, likes, shares and survey responses.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-views-3',
      question: "Do YouTube Shorts help get more views?",
      answer: "Shorts can introduce your channel to new viewers. Link them to related long videos so interested viewers have somewhere to go next.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-views-4',
      question: "What is a good click through rate on YouTube?",
      answer: "It varies by channel and traffic source. Compare each video with your own average and focus on improving titles and thumbnails on the weakest ones.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-views-5',
      question: "How important is YouTube SEO?",
      answer: "Very important for search traffic. Clear titles, descriptions, chapters and spoken keywords help YouTube understand and match your videos to searches.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-get-more-youtube-views-6',
      question: "Why are my YouTube views going down?",
      answer: "Common reasons include weaker titles or thumbnails, lower retention, less frequent uploads or changes in what your audience is interested in. Check traffic sources and retention in YouTube Studio.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-youtube-views',
    label: 'Explore YouTube Views Packages',
    description: "Explore YouTube view packages on InstantViral when you want to support visibility on a video that is already well made.",
  },
};
