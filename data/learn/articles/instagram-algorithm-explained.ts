/**
 * Learn article — Instagram Algorithm Explained.
 * Editorial source: manually written production copy (Article #2).
 * Images pending — publish after featured/inline assets are added.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'instagram-algorithm-explained';
const IMG = '/assets/images/learn/instagram-algorithm-explained' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "People often talk about \"the Instagram algorithm\" as if it were one switch that decides whether a post succeeds. In reality, Instagram uses several ranking systems, one for each part of the app, and each one is built around what people tend to do in that space.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "Understanding how these systems work will not give you a shortcut, but it will help you make posts that suit the way Instagram distributes content. This guide covers each surface in turn, explains the signals Instagram has described publicly, clears up a few common myths and briefly compares Instagram with TikTok, Facebook and YouTube.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "The Basic Idea Behind Every Ranking System",
    anchorId: 'the-basic-idea-behind-every-ranking-system',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "Every time you open the app, Instagram gathers posts you could see and predicts how likely you are to interact with each one. It then orders them so the posts you are most likely to care about appear first. In Instagram Ranking Explained, the company describes these predictions as estimates of actions such as spending time on a post, liking it, commenting, saving it or tapping on the profile.",
    inlineLinks: [
      { href: "https://about.instagram.com/blog/announcements/instagram-ranking-explained", label: "Instagram Ranking Explained", external: true },
    ],
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "The inputs fall into four broad groups:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 6,
    items: [
      "Your own activity, such as which posts you like, save, share and comment on.",
      "Information about the post, such as when it was posted, what it shows and how other people are responding to it.",
      "Information about the account that posted, such as how often people interact with it.",
      "Your history with that account, such as whether you comment on each other's posts or send messages.",
    ],
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "Instagram's leadership has also said publicly that three signals carry particular weight: how long people watch, how many people like a post relative to how many saw it, and how many people send it to someone else relative to how many saw it.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "How the Feed Works",
    anchorId: 'how-the-feed-works',
    order: 8,
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 9,
    text: "The Feed mostly shows posts from accounts you follow, plus suggested posts from accounts you do not follow yet. Ranking leans heavily on relationship. If you regularly like, comment on or message an account, its posts will usually appear higher for you.",
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 10,
    text: "For creators and businesses, that means the people who engage with you regularly are the ones most likely to see your next post. Replying to comments and starting conversations is not just good manners. It strengthens the signals that keep your posts visible to your existing audience.",
  },
  {
    id: 'b-fig-feed',
    type: 'figure',
    order: 11,
    image: {
      src: `${IMG}/instagram-feed-ranking.png`,
      alt: 'Instagram Feed ranking with engagement signals, user relationships and content freshness.',
      width: 1536,
      height: 1024,
    },
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "How Reels Are Ranked",
    anchorId: 'how-reels-are-ranked',
    order: 12,
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 13,
    text: "Most Reels people see come from accounts they do not follow. That makes Reels the main way to reach new people, and it changes what matters. Instagram looks at how likely a viewer is to watch a Reel all the way through, like it, share it and go to the audio page, which suggests they might make something similar.",
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 14,
    text: "Information about the Reel itself matters here, including the audio, the visuals and how other people have reacted. The account's size matters far less than in the Feed. A small account can reach a large audience with a Reel that holds attention, while a large account can post a Reel that few people watch.",
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 15,
    text: "Instagram also says it limits recommendations for low-quality Reels, such as videos with watermarks from other apps or content that has simply been reposted without anything new added. Original content gets priority.",
  },
  {
    id: 'b-svc-views',
    type: 'related_service_card',
    order: 16,
    serviceSlug: 'buy-instagram-views',
    label: 'Buy Instagram Views Canada',
    description:
      'Explore view packages when you want more visibility on Reels and video content.',
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "How Explore Works",
    anchorId: 'how-explore-works',
    order: 17,
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 18,
    text: "Explore is built for discovery. It shows photos, carousels and Reels from accounts you do not follow, chosen based on what you have engaged with before. The main signals are how popular a post is, how quickly people are engaging with it and whether it matches your past interests.",
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 19,
    text: "You cannot submit a post to Explore. Posts reach it when they perform well with people who share the interests of the viewer. Clear topics help, because Instagram has a better idea of who might enjoy a post when it is obviously about something specific.",
  },
  {
    id: 'b-fig-explore-reels',
    type: 'figure',
    order: 20,
    image: {
      src: `${IMG}/instagram-explore-reels.png`,
      alt: 'Instagram Explore and Reels dashboard showing content discovery, audience reach and recommendation signals.',
      width: 1536,
      height: 1024,
    },
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "How Stories Are Ordered",
    anchorId: 'how-stories-are-ordered',
    order: 21,
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 22,
    text: "Stories come almost entirely from accounts you follow. Instagram orders them based on how often you watch an account's Stories, how often you engage with them through replies and reactions, and how close you appear to be to that account.",
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 23,
    text: "For accounts that want to stay visible, interactive Stories help. Polls, quizzes, question stickers and emoji sliders give followers a quick way to engage, and each interaction strengthens the relationship signal for future posts.",
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "How Instagram Search Works",
    anchorId: 'how-instagram-search-works',
    order: 24,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 25,
    text: "When someone types into the search bar, Instagram looks at the words they use and matches them against usernames, names, bios, captions, hashtags and locations. It also considers the searcher's own activity and how popular each result is.",
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 26,
    text: "That makes Instagram behave more like a search engine than many people realise. Writing clear captions with the words your audience would actually type, putting a keyword in your name field and using location tags for local content all improve your chances of appearing in search results.",
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Signals That Matter Most for Your Posts",
    anchorId: 'signals-that-matter-most-for-your-posts',
    order: 27,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 28,
    text: "Pulling everything together, these signals do the most work across Instagram:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 29,
    items: [
      "Watch time and completion, especially for Reels.",
      "Shares through DMs and Stories, which suggest a post is worth passing on.",
      "Likes relative to how many people saw the post.",
      "Saves, which show content is useful enough to come back to.",
      "Comments and replies, particularly real conversations.",
      "Your existing relationship with the people who see the post.",
    ],
  },
  {
    id: 'b-fig-engagement',
    type: 'figure',
    order: 30,
    image: {
      src: `${IMG}/instagram-engagement-signals.png`,
      alt: 'Instagram engagement dashboard displaying likes, comments, shares, saves and audience interaction metrics.',
      width: 1536,
      height: 1024,
    },
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "When Instagram Will Not Recommend a Post",
    anchorId: 'when-instagram-will-not-recommend-a-post',
    order: 31,
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 32,
    text: "Instagram has published recommendation guidelines that describe content it will not recommend to people who do not follow you, even if it stays on your profile. This includes content that may be sensitive, misleading or low quality, as well as engagement bait.",
    inlineLinks: [
      { href: "https://help.instagram.com/313829416281232", label: "recommendation guidelines", external: true },
    ],
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 33,
    text: "Professional accounts can open Account Status in settings to see whether any posts have been marked as ineligible for recommendation. If your reach drops sharply, that is the first place to look before assuming anything else.",
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Common Myths About the Instagram Algorithm",
    anchorId: 'common-myths-about-the-instagram-algorithm',
    order: 34,
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 35,
    text: "A few ideas come up again and again but do not match what Instagram has said:",
  },
  {
    id: 'b-list-3',
    type: 'bulleted_list',
    order: 36,
    items: [
      "Shadowbans as a hidden punishment: Account Status shows recommendation limits, so they are not secret.",
      "Switching to a personal account to get more reach: account type does not change how posts are ranked.",
      "Deleting and reposting to reset a post: this usually just removes early engagement.",
      "Posting at an exact magic time: timing helps when it matches your audience, but there is no universal hour.",
      "Using thirty hashtags for more reach: a few relevant hashtags are enough.",
    ],
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "How Other Platforms Compare",
    anchorId: 'how-other-platforms-compare',
    order: 37,
  },
  {
    id: 'b-p-21',
    type: 'paragraph',
    order: 38,
    text: "Most major platforms follow the same basic logic: predict what each person will enjoy and rank content accordingly. The differences are in emphasis.",
  },
  {
    id: 'b-table-1',
    type: 'comparison_table',
    order: 39,
    caption: "How major platforms decide what to show",
    headers: ["Platform", "Main focus of recommendations", "What helps most"],
    rows: [
      ["Instagram", "Relationships in Feed and Stories, interest in Reels and Explore", "Watch time, sends and engagement relative to reach"],
      ["TikTok", "Interest based For You feed, mostly from accounts you do not follow", "Watch time, rewatches, shares and comments"],
      ["Facebook", "Friends, groups and Pages you engage with, plus suggested Reels", "Meaningful conversations and shares"],
      ["YouTube", "Viewer satisfaction across Home, Search and Suggested videos", "Clicks that lead to long, satisfied watch time"],
    ],
  },
  {
    id: 'b-p-22',
    type: 'paragraph',
    order: 40,
    text: "TikTok, for example, says in its explanation of how TikTok recommends videos that follower count is not a direct factor in recommendations. Instagram Reels has moved in a similar direction, which is why smaller accounts can now reach large audiences on both apps.",
    inlineLinks: [
      { href: "https://newsroom.tiktok.com/how-tiktok-recommends-videos-for-you?lang=en", label: "how TikTok recommends videos", external: true },
    ],
  },
  {
    id: 'b-h-11',
    type: 'heading',
    headingLevel: 2,
    text: "What This Means for Your Strategy",
    anchorId: 'what-this-means-for-your-strategy',
    order: 41,
  },
  {
    id: 'b-p-23',
    type: 'paragraph',
    order: 42,
    text: "You do not need to chase every update. The practical lessons stay the same:",
  },
  {
    id: 'b-list-4',
    type: 'numbered_list',
    order: 43,
    items: [
      "Make content people want to finish, save and send to a friend.",
      "Use Reels to reach new people and Stories to stay close to followers.",
      "Write captions and on-screen text that make your topic obvious.",
      "Post original content rather than reposts.",
      "Reply to comments and messages to strengthen relationships.",
      "Check Account Status and Insights before drawing conclusions from one bad week.",
    ],
  },
  {
    id: 'b-p-24',
    type: 'paragraph',
    order: 44,
    text: "When you build for viewers first, you are building for the algorithm too. Our guide on how to get more likes on Instagram puts these ideas into a step by step plan.",
    inlineLinks: [
      { href: "/learn/how-to-get-more-instagram-likes", label: "get more likes on Instagram" },
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

export const INSTAGRAM_ALGORITHM_EXPLAINED_ARTICLE: LearnArticleRecord = {
  id: 'learn-instagram-algorithm-explained',
  slug: SLUG,
  title: "How Does the Instagram Algorithm Work? Feed, Reels, Explore and Stories",
  excerpt: "Instagram uses separate ranking systems for Feed, Reels, Explore, Stories and search. Here is what each one looks at, what it means for your posts and how other platforms compare.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['algorithm', 'engagement', 'marketing', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/instagram-algorithm-explained.png`,
    alt: 'Illustration explaining how the Instagram algorithm ranks content using engagement, reach, audience interest and content.',
    width: 1536,
    height: 1024,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How Does the Instagram Algorithm Work?",
    description: "How the Instagram algorithm works in Feed, Reels, Explore, Stories and search, which signals matter most, and what creators and businesses can do with it.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "how does the instagram algorithm work",
      "instagram algorithm explained",
      "instagram reels algorithm",
      "instagram explore algorithm",
      "how social media algorithms work",
    ],
    ogImage: `${IMG}/instagram-algorithm-explained.png`,
  },
  relatedServices: [
    'buy-instagram-followers',
    'buy-instagram-likes',
    'buy-instagram-views',
    'buy-instagram-comments',
  ],
  relatedArticles: [
    'how-to-get-more-instagram-likes',
    'how-to-grow-instagram-followers-organically',
    'best-time-to-post-on-instagram',
    'how-to-get-more-tiktok-views',
    'instagram-marketing-for-small-businesses',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "Instagram uses separate ranking systems for Feed, Reels, Explore, Stories and search.",
    "The Feed and Stories lean on relationships, while Reels and Explore focus on interest.",
    "Watch time, sends and likes relative to reach are among the strongest signals.",
    "Original content is favoured, and reposts with watermarks are less likely to be recommended.",
    "Account Status shows whether posts are limited from recommendations.",
    "Other platforms use similar logic with different priorities.",
  ],
  faqs: [
    {
      id: 'faq-instagram-algorithm-explained-1',
      question: "How does the Instagram algorithm work?",
      answer: "Instagram uses separate ranking systems for Feed, Reels, Explore, Stories and search. Each predicts how likely you are to interact with a post, using your activity, information about the post and your history with the account.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-algorithm-explained-2',
      question: "What is the most important signal on Instagram?",
      answer: "Instagram has highlighted watch time, likes relative to reach and sends relative to reach as particularly important, especially for Reels.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-algorithm-explained-3',
      question: "Does the Instagram algorithm favour Reels?",
      answer: "Reels are the main way Instagram shows content to people who do not follow you, so they matter most for reaching new audiences.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-algorithm-explained-4',
      question: "Are shadowbans real on Instagram?",
      answer: "Instagram can stop recommending certain content to non-followers, but you can check this in Account Status. It is not a hidden penalty.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-algorithm-explained-5',
      question: "Does follower count affect reach on Reels?",
      answer: "Less than many people think. Reels are ranked mostly on how viewers respond, so small accounts can reach large audiences.",
      schemaEligible: true,
    },
    {
      id: 'faq-instagram-algorithm-explained-6',
      question: "How is the Instagram algorithm different from TikTok?",
      answer: "TikTok's For You feed is almost entirely interest based. Instagram mixes relationship based ranking in Feed and Stories with interest based ranking in Reels and Explore.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-instagram-followers',
    label: 'Explore Instagram Followers Packages',
    description: "Explore view packages on InstantViral when you want to support visibility on a Reel that is already well made.",
  },
};
