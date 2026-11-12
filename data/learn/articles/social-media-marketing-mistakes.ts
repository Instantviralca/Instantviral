/**
 * Learn article — Social Media Marketing Mistakes Businesses Should Avoid.
 * Editorial source: manually written production copy (Social Media Marketing Article #4).
 *
 * Related cluster: Guide, Strategy and Content Planning are live; remaining
 * Social Media Marketing Learn titles preserved as text until registered.
 * Commercial linking: Instagram, Facebook, TikTok and YouTube service cards
 * as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'social-media-marketing-mistakes';
const IMG = '/assets/images/learn/social-media-marketing-mistakes' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-p-1',
    type: 'paragraph',
    order: 1,
    text: "Plenty of businesses post on social media every week and see little in return. Usually the problem is not the platform or the algorithm. It is a few avoidable mistakes that quietly cancel out the effort: no clear goal, the wrong channels, inconsistent posting or content that talks only about the business.",
  },
  {
    id: 'b-p-2',
    type: 'paragraph',
    order: 2,
    text: "This guide walks through the mistakes we see most often, explains why each one hurts and shows what to do instead. It finishes with a simple strategy framework you can use to plan the next three months, whether you run a café in Halifax, a trades business in Surrey or an online shop that sells across Canada.",
  },
  {
    id: 'b-h-1',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 1: Posting Without a Clear Goal",
    anchorId: 'mistake-1-posting-without-a-clear-goal',
    order: 3,
  },
  {
    id: 'b-p-3',
    type: 'paragraph',
    order: 4,
    text: "\"We should be on social media\" is not a goal. Without one, it is impossible to know what to post or whether anything is working.",
  },
  {
    id: 'b-p-4',
    type: 'paragraph',
    order: 5,
    text: "Pick one main goal for the next quarter, such as more enquiries, more online sales, more foot traffic or a larger local audience. Then choose one or two numbers that show progress, like website clicks from Instagram or calls from your Google Business Profile after a campaign. Every post should support that goal in some way.",
  },
  {
    id: 'b-h-2',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 2: Trying to Be on Every Platform",
    anchorId: 'mistake-2-trying-to-be-on-every-platform',
    order: 6,
  },
  {
    id: 'b-p-5',
    type: 'paragraph',
    order: 7,
    text: "Opening accounts on Instagram, TikTok, Facebook, YouTube, LinkedIn and Pinterest at once usually leads to six neglected profiles. It is far better to do one or two platforms well.",
  },
  {
    id: 'b-p-6',
    type: 'paragraph',
    order: 8,
    text: "Choose based on where your customers spend time and what you can produce. A restaurant with strong visuals may focus on Instagram and TikTok. A B2B consultancy may get more from LinkedIn. A local service business with an older customer base may find Facebook groups and Pages more useful. Add a channel only when the first ones are running smoothly.",
  },
  {
    id: 'b-svc-instagram',
    type: 'related_service_card',
    serviceSlug: 'buy-instagram-followers',
    label: 'Buy Instagram Followers Canada',
    description:
      'Compare real follower packages when you want to support Instagram growth alongside organic content.',
    order: 9,
  },
  {
    id: 'b-h-3',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 3: Not Knowing the Audience",
    anchorId: 'mistake-3-not-knowing-the-audience',
    order: 10,
  },
  {
    id: 'b-p-7',
    type: 'paragraph',
    order: 11,
    text: "Content written for \"everyone\" rarely connects with anyone. Businesses that grow on social media know who they are talking to: their questions, their problems and the words they use.",
  },
  {
    id: 'b-p-8',
    type: 'paragraph',
    order: 12,
    text: "Write down your two or three most common customer types. Look at the questions they ask, the reviews they leave and the comments on your posts. Use their language in your captions and videos. A dental clinic that answers \"Does a filling hurt?\" in plain words will reach more people than one posting generic oral health facts.",
  },
  {
    id: 'b-h-4',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 4: Inconsistent Branding and Tone",
    anchorId: 'mistake-4-inconsistent-branding-and-tone',
    order: 13,
  },
  {
    id: 'b-p-9',
    type: 'paragraph',
    order: 14,
    text: "When your colours, logo, tone of voice and style change from post to post, people struggle to recognise you in a busy feed. Recognition builds trust, and trust is what turns followers into customers.",
  },
  {
    id: 'b-p-10',
    type: 'paragraph',
    order: 15,
    text: "Create a simple brand guide with your logo, two or three colours, fonts and a few notes on tone. It does not need to be fancy. It just needs to be used by everyone who posts for the business.",
  },
  {
    id: 'b-fig-brand',
    type: 'figure',
    order: 16,
    image: {
      src: `${IMG}/social-media-brand-consistency.png`,
      alt: 'Consistent social media branding with matching profile visuals, colours, messaging, design elements and brand identity.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-5',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 5: Posting Inconsistently",
    anchorId: 'mistake-5-posting-inconsistently',
    order: 17,
  },
  {
    id: 'b-p-11',
    type: 'paragraph',
    order: 18,
    text: "Posting ten times in one week and then disappearing for a month makes it hard to build an audience. Platforms favour accounts that people interact with regularly, and followers forget accounts that go quiet.",
  },
  {
    id: 'b-p-12',
    type: 'paragraph',
    order: 19,
    text: "Choose a rhythm you can keep for months, even if it is only two or three posts a week, and plan ahead with a calendar. Our guide on building a content calendar shows a simple system that works across platforms.",
    inlineLinks: [
      { href: "/learn/how-to-create-a-tiktok-content-calendar", label: "content calendar" },
    ],
  },
  {
    id: 'b-fig-inconsistent',
    type: 'figure',
    order: 20,
    image: {
      src: `${IMG}/inconsistent-social-media-posting.png`,
      alt: 'Inconsistent social media posting compared with a planned publishing schedule using a content calendar and organized.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-6',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 6: Only Talking About Yourself",
    anchorId: 'mistake-6-only-talking-about-yourself',
    order: 21,
  },
  {
    id: 'b-p-13',
    type: 'paragraph',
    order: 22,
    text: "If every post is a product photo, a discount or a \"book now\", followers tune out. People follow accounts that help, entertain or inspire them, and they buy from businesses they have come to trust.",
  },
  {
    id: 'b-p-14',
    type: 'paragraph',
    order: 23,
    text: "A good balance is to make most of your content useful or interesting and a smaller share directly promotional. Tips, behind the scenes, customer stories and answers to common questions all build the relationship that makes your offers land when you do share them.",
  },
  {
    id: 'b-h-7',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 7: Ignoring Comments and Messages",
    anchorId: 'mistake-7-ignoring-comments-and-messages',
    order: 24,
  },
  {
    id: 'b-p-15',
    type: 'paragraph',
    order: 25,
    text: "Social media is a two way channel. Unanswered comments and DMs tell customers you are not listening, and they also weaken the engagement signals that help your posts reach more people.",
  },
  {
    id: 'b-p-16',
    type: 'paragraph',
    order: 26,
    text: "Set aside time every day to reply. Answer questions properly, thank people for feedback and handle complaints calmly and publicly where appropriate, then move the details to a private message. A quick, helpful reply often does more for your reputation than a polished post.",
  },
  {
    id: 'b-svc-tiktok',
    type: 'related_service_card',
    serviceSlug: 'buy-tiktok-followers',
    label: 'Buy TikTok Followers Canada',
    description:
      'Compare real follower packages when you want to support TikTok growth alongside organic content.',
    order: 27,
  },
  {
    id: 'b-h-8',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 8: Ignoring Video",
    anchorId: 'mistake-8-ignoring-video',
    order: 28,
  },
  {
    id: 'b-p-17',
    type: 'paragraph',
    order: 29,
    text: "Short video now drives most discovery on Instagram, TikTok, Facebook and YouTube. Businesses that only post still images miss the format platforms are most likely to recommend to new people.",
  },
  {
    id: 'b-p-18',
    type: 'paragraph',
    order: 30,
    text: "You do not need professional equipment. A phone, natural light and a clear idea are enough. Show a process, answer a question or share a quick tip. Start with one short video a week and build from there.",
  },
  {
    id: 'b-h-9',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 9: Chasing Vanity Metrics",
    anchorId: 'mistake-9-chasing-vanity-metrics',
    order: 31,
  },
  {
    id: 'b-p-19',
    type: 'paragraph',
    order: 32,
    text: "Likes and follower counts feel good, but they do not pay the bills on their own. A post with modest reach that leads to ten enquiries is worth more than a viral video that brings nothing.",
  },
  {
    id: 'b-p-20',
    type: 'paragraph',
    order: 33,
    text: "Track the numbers that connect to your goal: profile visits, website clicks, messages, calls, bookings and sales. Use follower and engagement figures as early signals, not the final result.",
  },
  {
    id: 'b-h-10',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 10: Not Disclosing Partnerships",
    anchorId: 'mistake-10-not-disclosing-partnerships',
    order: 34,
  },
  {
    id: 'b-p-21',
    type: 'paragraph',
    order: 35,
    text: "Working with influencers or creators can be very effective, but sponsored content must be clearly labelled. In Canada, Ad Standards publishes influencer marketing disclosure guidelines explaining how material connections, such as payment, free products or affiliate links, should be disclosed.",
    inlineLinks: [
      { href: "https://adstandards.ca/wp-content/uploads/Ad-Standards-Influencer-Marketing-Disclosure-Guidelines-2025-10-08.pdf", label: "influencer marketing disclosure guidelines", external: true },
    ],
  },
  {
    id: 'b-p-22',
    type: 'paragraph',
    order: 36,
    text: "The same principle applies to reviews and testimonials. Never post fake reviews or present paid endorsements as independent opinions. If you market to customers in Quebec, also check the French language requirements that apply to commercial advertising there.",
  },
  {
    id: 'b-h-11',
    type: 'heading',
    headingLevel: 2,
    text: "Mistake 11: Never Reviewing Results",
    anchorId: 'mistake-11-never-reviewing-results',
    order: 37,
  },
  {
    id: 'b-p-23',
    type: 'paragraph',
    order: 38,
    text: "Many businesses post for months without looking at their analytics. Every platform offers free insights that show which posts reached people, which led to clicks and when your audience is online.",
  },
  {
    id: 'b-p-24',
    type: 'paragraph',
    order: 39,
    text: "Review your results monthly. Keep what works, adjust what does not and drop what clearly is not helping. Small changes based on data add up quickly.",
  },
  {
    id: 'b-fig-dashboard',
    type: 'figure',
    order: 40,
    image: {
      src: `${IMG}/social-media-improvement-dashboard.png`,
      alt: 'Business analytics dashboard displaying engagement improvements, audience growth, website traffic, conversions and social.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h-12',
    type: 'heading',
    headingLevel: 2,
    text: "A Simple Social Media Strategy Framework",
    anchorId: 'a-simple-social-media-strategy-framework',
    order: 41,
  },
  {
    id: 'b-p-25',
    type: 'paragraph',
    order: 42,
    text: "Avoiding mistakes is easier with a plan. This framework fits on one page and can be reviewed every quarter:",
  },
  {
    id: 'b-list-1',
    type: 'numbered_list',
    order: 43,
    items: [
      "Goal: one main business outcome for the next three months.",
      "Audience: the two or three customer types you want to reach.",
      "Platforms: one or two channels where those customers spend time.",
      "Content pillars: three to five themes, such as education, behind the scenes, proof and offers.",
      "Rhythm: how many posts and videos you can publish each week.",
      "Engagement: who replies to comments and messages, and how often.",
      "Measurement: the two or three numbers you will check every month.",
    ],
  },
  {
    id: 'b-svc-facebook',
    type: 'related_service_card',
    serviceSlug: 'buy-facebook-followers',
    label: 'Buy Facebook Followers Canada',
    description:
      'Compare real follower packages when you want to support Facebook Page growth alongside organic content.',
    order: 44,
  },
  {
    id: 'b-p-26',
    type: 'paragraph',
    order: 45,
    text: "Organic content and paid promotion can work together within this plan. Our guide on organic vs paid social media growth explains when each approach makes sense and how to combine them.",
    inlineLinks: [
      { href: "/learn/organic-vs-paid-social-media-growth", label: "organic vs paid social media growth" },
    ],
  },
  {
    id: 'b-h-13',
    type: 'heading',
    headingLevel: 2,
    text: "Putting It Into Practice",
    anchorId: 'putting-it-into-practice',
    order: 46,
  },
  {
    id: 'b-p-27',
    type: 'paragraph',
    order: 47,
    text: "Pick the two mistakes that sound most familiar and fix those first. For many businesses that means choosing one platform to focus on and committing to a realistic posting rhythm. Once those are in place, add regular replies, more short video and a monthly review.",
  },
  {
    id: 'b-p-28',
    type: 'paragraph',
    order: 48,
    text: "Social media rewards businesses that are clear, consistent and genuinely useful to their audience. None of that requires a large budget. It requires a plan you can stick to and the willingness to learn from your results.",
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

export const SOCIAL_MEDIA_MARKETING_MISTAKES_ARTICLE: LearnArticleRecord = {
  id: 'learn-social-media-marketing-mistakes',
  slug: SLUG,
  title: "Social Media Marketing Mistakes Businesses Should Avoid (and What to Do Instead)",
  excerpt: "Most social media problems come from a handful of avoidable mistakes. Here are the most common ones, why they hurt and a simple strategy framework to fix them.",
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'social-media-marketing',
  tags: ['marketing', 'business', 'engagement', 'analytics'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/social-media-marketing-mistakes.png`,
    alt: 'Common social media marketing mistakes such as inconsistent posting, poor branding, weak engagement, missing analytics and.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-11-12T10:00:00.000Z',
  showModifiedDate: true,
  seo: {
    title: "Social Media Marketing Mistakes Businesses Should Avoid",
    description: "The most common social media marketing mistakes businesses make, why they hurt reach and sales, and a simple strategy to fix them, with notes for Canada.",
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      "social media marketing mistakes",
      "social media mistakes businesses make",
      "social media marketing strategy",
      "social media marketing guide",
      "social media strategy for small business",
    ],
    ogImage: `${IMG}/social-media-marketing-mistakes.png`,
  },
  relatedServices: [
    'buy-instagram-followers',
    'buy-facebook-followers',
    'buy-tiktok-followers',
    'buy-youtube-subscribers',
  ],
  relatedArticles: [
    'organic-vs-paid-social-media-growth',
    'instagram-marketing-for-small-businesses',
    'tiktok-for-business',
    'how-to-create-a-tiktok-content-calendar',
    'how-to-get-more-facebook-followers',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    "Set one clear goal before deciding what to post.",
    "Focus on one or two platforms where your customers actually spend time.",
    "Keep branding, tone and posting rhythm consistent.",
    "Make most content useful or interesting and only some of it promotional.",
    "Reply to comments and messages, and use short video for discovery.",
    "Disclose partnerships clearly and review your results every month.",
  ],
  faqs: [
    {
      id: 'faq-social-media-marketing-mistakes-1',
      question: "What are the most common social media marketing mistakes?",
      answer: "Posting without a clear goal, trying to be on every platform, inconsistent posting, only promoting yourself, ignoring comments and never reviewing results are among the most common.",
      schemaEligible: true,
    },
    {
      id: 'faq-social-media-marketing-mistakes-2',
      question: "How many social media platforms should a small business use?",
      answer: "Start with one or two where your customers spend time. Add more only once those channels are running consistently.",
      schemaEligible: true,
    },
    {
      id: 'faq-social-media-marketing-mistakes-3',
      question: "How often should a business post on social media?",
      answer: "Choose a rhythm you can keep for months. Two to five posts a week on your main platform is realistic for many small businesses.",
      schemaEligible: true,
    },
    {
      id: 'faq-social-media-marketing-mistakes-4',
      question: "What should a social media marketing strategy include?",
      answer: "A clear goal, target audience, chosen platforms, content pillars, a posting rhythm, a plan for replies and a few metrics to review each month.",
      schemaEligible: true,
    },
    {
      id: 'faq-social-media-marketing-mistakes-5',
      question: "Do Canadian businesses need to disclose influencer partnerships?",
      answer: "Ad Standards guidelines say material connections, such as payment, free products or affiliate links, should be clearly disclosed in sponsored content.",
      schemaEligible: true,
    },
    {
      id: 'faq-social-media-marketing-mistakes-6',
      question: "Which social media metrics matter most?",
      answer: "The ones linked to your goal, such as website clicks, enquiries, bookings and sales. Likes and followers are useful early signals but not the end result.",
      schemaEligible: true,
    },
  ],
};
