/**
 * Learn article — How to Create a TikTok Content Calendar.
 * Editorial source: manually written production copy (TikTok Business Article #3).
 *
 * Related cluster links: TikTok for Business, small businesses, best time, SEO, engagement.
 * Commercial linking: followers and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-to-create-a-tiktok-content-calendar';
const IMG = '/assets/images/learn/how-to-create-a-tiktok-content-calendar' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "Most accounts that stop posting do not run out of talent. They run out of time and ideas. A content calendar fixes both. It tells you what to post, when to post it and what needs to be filmed this week, so you are not staring at a blank screen every morning.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "This guide shows how to build a TikTok content calendar from scratch, keep it full of ideas and review it so it improves every month. The same system works for Instagram Reels and other short video platforms, so one plan can serve all your channels.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "What a Content Calendar Actually Is",
    anchorId: 'what-a-content-calendar-actually-is',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "A content calendar is a simple schedule of the videos you plan to publish, with enough detail that anyone on your team could make them. It can live in a spreadsheet, a shared document, a project tool or a paper planner. The format matters far less than using it every week.",
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "A useful calendar usually includes:",
  },
  {
    id: 'b-list-1',
    type: 'bulleted_list',
    order: 6,
    items: [
      "The publishing date and time.",
      "The content pillar the video belongs to.",
      "A working title or hook.",
      "The format, such as tutorial, behind the scenes, answer to a comment or trend.",
      "The keyword the video targets in search.",
      "The status: idea, scripted, filmed, edited or scheduled.",
      "A notes column for sounds, props, locations or captions.",
    ],
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Step 1: Set a Goal for the Month",
    anchorId: 'step-1-set-a-goal-for-the-month',
    order: 7,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 8,
    text: "Start with one main goal. A new account might focus on reach and followers. A shop might focus on product discovery before a busy season. A service business might want more enquiries from local customers. The goal decides what your calendar should contain.",
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 9,
    text: "For example, a bike repair shop in Edmonton preparing for spring could set a goal of \"Become the account people in Edmonton think of for bike tune ups\", then plan a month of maintenance tips, before and after repairs and answers to common customer questions.",
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Step 2: Choose Your Content Pillars",
    anchorId: 'step-2-choose-your-content-pillars',
    order: 10,
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 11,
    text: "Content pillars are the three to five themes your account returns to again and again. They keep your calendar focused while giving you enough variety to avoid repeating yourself.",
  },
  {
    id: 'b-fig-pillars',
    type: 'figure',
    order: 12,
    image: {
      src: `${IMG}/tiktok-content-pillars.png`,
      alt: 'TikTok content pillars for businesses including educational videos, product demonstrations, customer stories.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 13,
    text: "Common pillars include:",
  },
  {
    id: 'b-list-2',
    type: 'bulleted_list',
    order: 14,
    items: [
      "Education: tips, tutorials and explainers.",
      "Behind the scenes: how you make things, your team and your workspace.",
      "Proof: results, customer stories and before and after videos.",
      "Community: answers to comments, questions and local moments.",
      "Personality: light, relatable videos that show who you are.",
    ],
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 15,
    text: "Assign each video in your calendar to a pillar. After a month, you will see which pillars bring views, which bring followers and which bring enquiries.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Step 3: Decide on a Realistic Rhythm",
    anchorId: 'step-3-decide-on-a-realistic-rhythm',
    order: 16,
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 17,
    text: "Consistency beats volume. Choose a number of videos you can make every week for months, not just the first fortnight. For many small businesses that is three to five TikToks a week. For a solo creator it might be daily, if the format is simple.",
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 18,
    text: "A weekly rhythm makes planning faster because each day has a job:",
  },
  {
    id: 'b-table-1',
    type: 'comparison_table',
    order: 19,
    caption: "Example weekly TikTok rhythm",
    headers: ["Day", "Pillar", "Example video"],
    rows: [
      ["Monday", "Education", "One quick tip that answers a common question"],
      ["Tuesday", "Behind the scenes", "How an order, project or recipe comes together"],
      ["Thursday", "Community", "Video reply to a comment from last week"],
      ["Friday", "Proof", "Before and after result or customer story"],
      ["Sunday", "Personality", "A light, relatable moment from the week"],
    ],
  },
  {
    id: 'b-fig-weekly',
    type: 'figure',
    order: 20,
    image: {
      src: `${IMG}/tiktok-weekly-content-calendar.png`,
      alt: 'Weekly TikTok content calendar with scheduled videos, publishing workflow, campaign planning and marketing organization.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 21,
    text: "Check when your audience is most active in TikTok Studio and set publishing times around that. If your viewers are spread across Canada, remember the time difference between the coasts. Our guide on the best time to post on TikTok explains how to test it.",
    inlineLinks: [
      { href: "/learn/best-time-to-post-on-tiktok", label: "best time to post on TikTok" },
    ],
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Step 4: Fill the Calendar With Ideas",
    anchorId: 'step-4-fill-the-calendar-with-ideas',
    order: 22,
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 23,
    text: "The best ideas usually come from your audience. Keep a running list and pull from it when you plan each week.",
  },
  {
    id: 'b-list-3',
    type: 'bulleted_list',
    order: 24,
    items: [
      "Questions customers ask in person, by email or in DMs.",
      "Comments on your existing videos.",
      "Searches shown in Creator Search Insights for your topic.",
      "Your best performing videos, which can be turned into part two or a new angle.",
      "Seasonal moments and local events.",
      "Trends that genuinely fit your pillars.",
    ],
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 25,
    text: "Search driven ideas are especially valuable because they keep bringing in viewers long after posting. Our TikTok SEO guide covers how to find and use those keywords.",
    inlineLinks: [
      { href: "/learn/tiktok-seo-guide", label: "TikTok SEO guide" },
    ],
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Step 5: Add Key Dates for Your Audience",
    anchorId: 'step-5-add-key-dates-for-your-audience',
    order: 26,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 27,
    text: "Plan around the moments your audience cares about. For Canadian audiences that might include Family Day in February, Victoria Day, Canada Day on July 1, back to school, Thanksgiving in October and the holiday season. The Government of Canada keeps a list of important and commemorative days that can help with planning.",
    inlineLinks: [
      { href: "https://www.canada.ca/en/canadian-heritage/services/important-commemorative-days.html", label: "important and commemorative days", external: true },
    ],
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 28,
    text: "Holidays vary by province, so check the dates that apply to your customers. If you serve Quebec, consider whether some videos should be in French or include French captions.",
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 29,
    text: "Leave gaps in the calendar too. Around one in five slots should stay open for trends, news and ideas that come up during the week.",
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Step 6: Batch Your Production",
    anchorId: 'step-6-batch-your-production',
    order: 30,
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 31,
    text: "Batching means doing similar tasks together. Instead of scripting, filming and editing one video every day, you might script five videos on Monday, film them all on Tuesday and edit on Wednesday. It saves setup time and keeps quality more consistent.",
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 32,
    text: "Once videos are ready, schedule them. TikTok lets you schedule posts ahead from TikTok Studio on desktop, and Instagram lets professional accounts schedule posts and Reels in the app or through Meta Business Suite. Scheduling means your calendar runs even on busy days.",
  },
  {
    id: 'b-svc-followers',
    type: 'related_service_card',
    order: 33,
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support profile growth alongside organic content.',
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Use the Same Calendar for Instagram",
    anchorId: 'use-the-same-calendar-for-instagram',
    order: 34,
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 35,
    text: "Most short videos you make for TikTok can also work as Instagram Reels, which makes one shared calendar the easiest way to stay consistent on both apps. A few adjustments help:",
  },
  {
    id: 'b-list-4',
    type: 'bulleted_list',
    order: 36,
    items: [
      "Upload the original file rather than a downloaded TikTok with a watermark, which Instagram is less likely to recommend.",
      "Rewrite captions and hashtags for each platform rather than copying them.",
      "Add carousels and Stories to the Instagram side of the plan, since TikTok does not use them the same way.",
      "Track results separately, because the same video can perform very differently on each app.",
    ],
  },
  {
    id: 'b-p-21',
    type: 'paragraph',
    order: 37,
    text: "A simple way to set this up is to add a \"platform\" column to your calendar and mark each item as TikTok, Instagram or both.",
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Step 7: Review Every Month",
    anchorId: 'step-7-review-every-month',
    order: 38,
  },
  {
    id: 'b-p-22',
    type: 'paragraph',
    order: 39,
    text: "At the end of each month, look at your results in TikTok Studio and Instagram Insights and compare them with your goal.",
  },
  {
    id: 'b-list-5',
    type: 'numbered_list',
    order: 40,
    items: [
      "Which pillars brought the most views and followers?",
      "Which hooks kept people watching past the first few seconds?",
      "Which videos led to profile visits, link clicks or enquiries?",
      "Which days and times performed best?",
      "What will you make more of next month, and what will you drop?",
    ],
  },
  {
    id: 'b-fig-dashboard',
    type: 'figure',
    order: 41,
    image: {
      src: `${IMG}/tiktok-content-planning-dashboard.png`,
      alt: 'TikTok content planning dashboard displaying publishing consistency, campaign performance, engagement metrics and monthly.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-p-23',
    type: 'paragraph',
    order: 42,
    text: "Use the answers to plan the next month. Over time, your calendar becomes a record of what works for your audience, not just a list of dates.",
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Common Content Calendar Mistakes",
    anchorId: 'common-content-calendar-mistakes',
    order: 43,
  },
  {
    id: 'b-p-24',
    type: 'paragraph',
    order: 44,
    text: "A few habits make calendars harder to stick to:",
  },
  {
    id: 'b-list-6',
    type: 'bulleted_list',
    order: 45,
    items: [
      "Planning more videos than you can actually make.",
      "Filling every slot in advance, leaving no room for trends.",
      "Copying the same caption across every platform.",
      "Never reviewing results, so the plan never improves.",
      "Treating the calendar as fixed instead of a working document.",
    ],
  },
  {
    id: 'b-p-25',
    type: 'paragraph',
    order: 46,
    text: "A calendar is a tool, not a rulebook. Adjust it as you learn. For a wider look at building a business presence on the app, read our guide to TikTok for business.",
    inlineLinks: [
      { href: "/learn/tiktok-for-business", label: "TikTok for business" },
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

export const HOW_TO_CREATE_A_TIKTOK_CONTENT_CALENDAR_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-to-create-a-tiktok-content-calendar',
  slug: SLUG,
  title: "How to Create a TikTok Content Calendar (That Also Works for Instagram)",
  excerpt: "A content calendar turns random posting into a steady plan. Here is how to build a TikTok content calendar step by step, fill it with ideas and reuse it for Instagram.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['business', 'marketing', 'engagement', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-to-create-a-tiktok-content-calendar.png`,
    alt: 'TikTok content calendar for businesses with weekly planning, content pillars, publishing schedule, analytics and campaign.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "How to Create a TikTok Content Calendar",
    description: "Build a TikTok content calendar step by step: choose content pillars, plan a weekly rhythm, batch filming, add Canadian dates and reuse the plan for Instagram.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "tiktok content calendar",
      "how to create a tiktok content calendar",
      "instagram content calendar",
      "social media content planning",
      "monthly content calendar",
    ],
    ogImage: `${IMG}/how-to-create-a-tiktok-content-calendar.png`,
  },
  relatedServices: ['buy-tiktok-followers', 'buy-tiktok-views'],
  relatedArticles: [
    'tiktok-for-business',
    'how-to-get-more-tiktok-followers',
    'best-time-to-post-on-tiktok',
    'tiktok-seo-guide',
    'how-to-grow-instagram-followers-organically',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "A content calendar shows what to post, when and what needs to be filmed.",
    "Set one main goal each month and choose three to five content pillars.",
    "A realistic weekly rhythm matters more than posting every day.",
    "Fill the calendar with audience questions, search ideas and Canadian dates.",
    "Batch scripting, filming and editing, then schedule posts ahead.",
    "One calendar can serve TikTok and Instagram with small adjustments.",
  ],
  faqs: [
    {
      id: 'faq-how-to-create-a-tiktok-content-calendar-1',
      question: "How do I create a TikTok content calendar?",
      answer: "Set a monthly goal, choose three to five content pillars, decide how many videos you can post each week, fill the slots with ideas, batch your filming and review results every month.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-create-a-tiktok-content-calendar-2',
      question: "How far ahead should I plan TikTok content?",
      answer: "Planning two to four weeks ahead works well for most accounts. Leave some open slots for trends and timely ideas.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-create-a-tiktok-content-calendar-3',
      question: "Can I use the same content calendar for Instagram?",
      answer: "Yes. Most short videos work on both apps. Upload the original file to Instagram, rewrite captions for each platform and track results separately.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-create-a-tiktok-content-calendar-4',
      question: "How many TikToks should a business post each week?",
      answer: "Three to five videos a week is a realistic target for many small businesses. Choose a number you can keep up for months.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-create-a-tiktok-content-calendar-5',
      question: "Can you schedule TikTok videos?",
      answer: "Yes. TikTok lets you schedule posts ahead from TikTok Studio on desktop, which helps you keep a steady rhythm.",
      schemaEligible: true,
    },
    {
      id: 'faq-how-to-create-a-tiktok-content-calendar-6',
      question: "What tools can I use for a content calendar?",
      answer: "A spreadsheet, a shared document or a project tool all work. The best tool is the one your team will actually update every week.",
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-tiktok-followers',
    label: 'Explore TikTok Followers Packages',
    description: "Compare follower packages on InstantViral when you want to support a profile that is already posting on a steady schedule.",
  },
};
