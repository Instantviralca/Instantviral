/**
 * Learn article — Common YouTube Growth Mistakes.
 * Editorial source: manually written production copy (YouTube Article #6).
 *
 * Related YouTube cluster articles are live.
 * Commercial linking: subscribers and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'common-youtube-growth-mistakes';
const IMG = '/assets/images/learn/common-youtube-growth-mistakes' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    text: 'Growing a YouTube channel takes more than uploading videos and hoping they gain traction. While every successful creator follows a different path, many struggling channels share the same avoidable mistakes. These issues often reduce visibility, lower audience retention and make it harder for viewers to return.',
    order: 1,
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    text: 'The good news is that most YouTube growth problems can be solved. Improving your content strategy, understanding your audience and making small but consistent changes often produces better long-term results than chasing quick wins or viral trends.',
    order: 2,
  },
  {
    id: 'b-intro-3',
    type: 'paragraph',
    text: 'Many creators focus only on increasing views or subscribers while overlooking the factors that influence sustainable growth. Strong channels are built through planning, consistency and continuous improvement.',
    order: 3,
  },
  {
    id: 'b-intro-4',
    type: 'paragraph',
    text: 'This guide highlights some of the most common YouTube growth mistakes and explains practical ways to avoid them so your channel can develop a stronger foundation for long-term success.',
    order: 4,
  },
  {
    id: 'b-related-growth',
    type: 'related_article_card',
    articleSlug: 'youtube-growth-guide',
    label: 'Complete YouTube Growth Guide',
    description:
      'Learn how to grow your YouTube channel with proven strategies for content creation, YouTube SEO, audience engagement, subscribers and long-term success.',
    order: 5,
  },
  {
    id: 'b-h2-m1',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 1: Publishing Without a Clear Niche',
    anchorId: 'mistake-1-publishing-without-a-clear-niche',
    order: 6,
  },
  {
    id: 'b-m1-1',
    type: 'paragraph',
    text: 'Many new creators upload videos on completely unrelated topics.',
    order: 7,
  },
  {
    id: 'b-m1-2',
    type: 'paragraph',
    text: 'For example:',
    order: 8,
  },
  {
    id: 'b-m1-list',
    type: 'bulleted_list',
    items: [
      'Technology one week.',
      'Cooking the next.',
      'Gaming after that.',
    ],
    order: 9,
  },
  {
    id: 'b-m1-3',
    type: 'paragraph',
    text: 'While experimenting is normal at the beginning, a consistent niche helps viewers understand what your channel offers and makes it easier for YouTube to recommend your content.',
    order: 10,
  },
  {
    id: 'b-h2-m2',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 2: Ignoring Audience Needs',
    anchorId: 'mistake-2-ignoring-audience-needs',
    order: 11,
  },
  {
    id: 'b-m2-1',
    type: 'paragraph',
    text: 'Successful videos solve problems, answer questions or entertain a specific audience.',
    order: 12,
  },
  {
    id: 'b-m2-2',
    type: 'paragraph',
    text: 'Before recording, ask yourself:',
    order: 13,
  },
  {
    id: 'b-m2-list',
    type: 'bulleted_list',
    items: [
      'Who is this video for?',
      'What problem does it solve?',
      'Why would someone watch until the end?',
    ],
    order: 14,
  },
  {
    id: 'b-m2-3',
    type: 'paragraph',
    text: 'Creating videos without considering audience needs often results in low engagement.',
    order: 15,
  },
  {
    id: 'b-svc-subscribers',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-subscribers',
    label: 'Buy YouTube Subscribers Canada',
    description:
      'Compare real subscriber packages when you want to support channel growth alongside organic content.',
    order: 16,
  },
  {
    id: 'b-h2-m3',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 3: Weak Thumbnails',
    anchorId: 'mistake-3-weak-thumbnails',
    order: 17,
  },
  {
    id: 'b-m3-1',
    type: 'paragraph',
    text: 'Your thumbnail creates the first impression.',
    order: 18,
  },
  {
    id: 'b-m3-2',
    type: 'paragraph',
    text: 'Common problems include:',
    order: 19,
  },
  {
    id: 'b-m3-list',
    type: 'bulleted_list',
    items: [
      'Cluttered designs.',
      'Low-quality images.',
      'Inconsistent branding.',
      'Misleading visuals.',
    ],
    order: 20,
  },
  {
    id: 'b-m3-3',
    type: 'paragraph',
    text: 'Simple, clear and professional thumbnails generally attract more clicks.',
    order: 21,
  },
  {
    id: 'b-fig-thumbnails',
    type: 'figure',
    order: 22,
    image: {
      src: `${IMG}/youtube-thumbnail-mistakes.png`,
      alt: 'Illustration comparing ineffective and optimized YouTube thumbnails, showing improvements in click-through rate, branding and visual clarity.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-related-views',
    type: 'related_article_card',
    articleSlug: 'how-to-get-more-youtube-views',
    label: 'How to Get More YouTube Views',
    description:
      'Learn how to get more YouTube views using proven strategies that improve click-through rate, watch time, audience retention and long-term channel growth.',
    order: 23,
  },
  {
    id: 'b-h2-m4',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 4: Confusing Titles',
    anchorId: 'mistake-4-confusing-titles',
    order: 24,
  },
  {
    id: 'b-m4-1',
    type: 'paragraph',
    text: 'Titles should explain exactly what viewers will receive.',
    order: 24,
  },
  {
    id: 'b-m4-2',
    type: 'paragraph',
    text: 'Avoid:',
    order: 25,
  },
  {
    id: 'b-m4-list',
    type: 'bulleted_list',
    items: [
      'Vague wording.',
      'Clickbait.',
      'Overly long titles.',
    ],
    order: 26,
  },
  {
    id: 'b-m4-3',
    type: 'paragraph',
    text: 'Instead, write titles that match search intent and accurately reflect your content.',
    order: 27,
  },
  {
    id: 'b-related-seo',
    type: 'related_article_card',
    articleSlug: 'youtube-seo-guide',
    label: 'YouTube SEO Guide',
    description:
      'Learn how YouTube SEO works and discover practical strategies to optimise your videos, channel and content for better rankings, more views and long-term growth.',
    order: 28,
  },
  {
    id: 'b-h2-m5',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 5: Long Introductions',
    anchorId: 'mistake-5-long-introductions',
    order: 29,
  },
  {
    id: 'b-m5-1',
    type: 'paragraph',
    text: 'Many creators spend the first minute introducing themselves.',
    order: 30,
  },
  {
    id: 'b-m5-2',
    type: 'paragraph',
    text: 'Most viewers want immediate value.',
    order: 31,
  },
  {
    id: 'b-m5-3',
    type: 'paragraph',
    text: 'Begin by:',
    order: 32,
  },
  {
    id: 'b-m5-list',
    type: 'bulleted_list',
    items: [
      'Explaining the topic.',
      'Showing the outcome.',
      'Introducing the main problem.',
    ],
    order: 33,
  },
  {
    id: 'b-m5-4',
    type: 'paragraph',
    text: 'A stronger opening usually improves audience retention.',
    order: 34,
  },
  {
    id: 'b-related-algorithm',
    type: 'related_article_card',
    articleSlug: 'how-the-youtube-algorithm-works',
    label: 'How the YouTube Algorithm Works',
    description:
      'Learn how the YouTube algorithm works and discover practical strategies to improve video recommendations, watch time, audience retention and long-term channel growth.',
    order: 35,
  },
  {
    id: 'b-h2-m6',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 6: Inconsistent Upload Schedule',
    anchorId: 'mistake-6-inconsistent-upload-schedule',
    order: 36,
  },
  {
    id: 'b-m6-1',
    type: 'paragraph',
    text: 'Publishing regularly helps viewers know when to expect new content.',
    order: 37,
  },
  {
    id: 'b-m6-2',
    type: 'paragraph',
    text: 'Choose a realistic schedule and maintain it rather than uploading several videos one week and disappearing for months.',
    order: 38,
  },
  {
    id: 'b-fig-improvement',
    type: 'figure',
    order: 39,
    image: {
      src: `${IMG}/youtube-channel-improvement.png`,
      alt: 'Illustration showing YouTube channel improvements through consistent publishing, organized playlists, audience engagement and better content planning.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-m7',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 7: Ignoring YouTube SEO',
    anchorId: 'mistake-7-ignoring-youtube-seo',
    order: 40,
  },
  {
    id: 'b-m7-1',
    type: 'paragraph',
    text: 'Uploading without optimising:',
    order: 40,
  },
  {
    id: 'b-m7-list',
    type: 'bulleted_list',
    items: [
      'Titles.',
      'Descriptions.',
      'Playlists.',
      'Thumbnails.',
      'Chapters.',
    ],
    order: 41,
  },
  {
    id: 'b-m7-2',
    type: 'paragraph',
    text: 'reduces discoverability.',
    order: 42,
  },
  {
    id: 'b-m7-3',
    type: 'paragraph',
    text: 'Every upload should be properly optimised before publication.',
    order: 43,
  },
  {
    id: 'b-h2-m8',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 8: Not Reviewing Analytics',
    anchorId: 'mistake-8-not-reviewing-analytics',
    order: 44,
  },
  {
    id: 'b-m8-1',
    type: 'paragraph',
    text: 'Many creators never check YouTube Studio.',
    order: 45,
  },
  {
    id: 'b-m8-2',
    type: 'paragraph',
    text: 'Important reports include:',
    order: 46,
  },
  {
    id: 'b-m8-list',
    type: 'bulleted_list',
    items: [
      'Audience retention.',
      'Watch time.',
      'Click-through rate.',
      'Traffic sources.',
      'Subscriber growth.',
    ],
    order: 47,
  },
  {
    id: 'b-m8-3',
    type: 'paragraph',
    text: 'Analytics help identify what deserves improvement.',
    order: 48,
  },
  {
    id: 'b-h2-m9',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 9: Creating Videos That End Abruptly',
    anchorId: 'mistake-9-creating-videos-that-end-abruptly',
    order: 49,
  },
  {
    id: 'b-m9-1',
    type: 'paragraph',
    text: 'Many videos finish without guiding viewers toward another piece of content.',
    order: 50,
  },
  {
    id: 'b-m9-2',
    type: 'paragraph',
    text: 'Instead:',
    order: 51,
  },
  {
    id: 'b-m9-list',
    type: 'bulleted_list',
    items: [
      'Add end screens.',
      'Recommend related videos.',
      'Link playlists.',
      'Encourage viewers to continue learning.',
    ],
    order: 52,
  },
  {
    id: 'b-m9-3',
    type: 'paragraph',
    text: 'Keeping viewers on your channel benefits both your audience and your long-term growth.',
    order: 53,
  },
  {
    id: 'b-svc-views',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-views',
    label: 'Buy YouTube Views Canada',
    description:
      'Compare view packages when you want to support early traction on high-value uploads.',
    order: 54,
  },
  {
    id: 'b-h2-m10',
    type: 'heading',
    headingLevel: 2,
    text: 'Mistake 10: Focusing Only on Subscriber Numbers',
    anchorId: 'mistake-10-focusing-only-on-subscriber-numbers',
    order: 55,
  },
  {
    id: 'b-m10-1',
    type: 'paragraph',
    text: 'Subscribers matter, but they are not the only indicator of success.',
    order: 56,
  },
  {
    id: 'b-m10-2',
    type: 'paragraph',
    text: 'Also monitor:',
    order: 57,
  },
  {
    id: 'b-m10-list',
    type: 'bulleted_list',
    items: [
      'Returning viewers.',
      'Watch time.',
      'Audience retention.',
      'Viewer satisfaction.',
      'Engagement.',
    ],
    order: 58,
  },
  {
    id: 'b-m10-3',
    type: 'paragraph',
    text: 'These metrics provide a more complete picture of channel performance.',
    order: 59,
  },
  {
    id: 'b-related-subscribers',
    type: 'related_article_card',
    articleSlug: 'how-to-get-more-youtube-subscribers',
    label: 'How to Get More YouTube Subscribers',
    description:
      'Learn how to get more YouTube subscribers with proven strategies that improve audience trust, video quality, watch time and long-term channel growth.',
    order: 60,
  },
  {
    id: 'b-h2-tips',
    type: 'heading',
    headingLevel: 2,
    text: 'Expert Tips',
    anchorId: 'expert-tips',
    order: 61,
  },
  {
    id: 'b-tips-1',
    type: 'paragraph',
    text: 'Growing channels usually:',
    order: 62,
  },
  {
    id: 'b-tips-list',
    type: 'bulleted_list',
    items: [
      'Review analytics monthly.',
      'Improve thumbnails regularly.',
      'Publish consistently.',
      'Stay focused on one niche.',
      'Listen to audience feedback.',
      'Continue learning from successful videos.',
    ],
    order: 63,
  },
  {
    id: 'b-tips-2',
    type: 'paragraph',
    text: 'Improvement is usually gradual rather than dramatic.',
    order: 64,
  },
  {
    id: 'b-h2-example',
    type: 'heading',
    headingLevel: 2,
    text: 'Real-World Example',
    anchorId: 'real-world-example',
    order: 65,
  },
  {
    id: 'b-ex-1',
    type: 'paragraph',
    text: 'A Canadian travel creator uploaded destination vlogs, restaurant reviews, product unboxings and gaming videos on one channel.',
    order: 66,
  },
  {
    id: 'b-ex-2',
    type: 'paragraph',
    text: 'Although individual videos occasionally performed well, subscribers rarely returned because the content lacked a clear focus.',
    order: 67,
  },
  {
    id: 'b-ex-3',
    type: 'paragraph',
    text: 'After restructuring the channel around Canadian travel guides, itineraries and budgeting advice, returning viewers increased and the channel began receiving more consistent recommendations.',
    order: 68,
  },
  {
    id: 'b-h2-wins',
    type: 'heading',
    headingLevel: 2,
    text: 'Quick Wins',
    anchorId: 'quick-wins',
    order: 69,
  },
  {
    id: 'b-wins-1',
    type: 'paragraph',
    text: 'Improve your channel this week:',
    order: 70,
  },
  {
    id: 'b-wins-list',
    type: 'bulleted_list',
    items: [
      'Audit your last ten thumbnails.',
      'Rewrite one weak title.',
      'Review audience retention graphs.',
      'Organise videos into playlists.',
      'Create a content calendar.',
    ],
    order: 71,
  },
  {
    id: 'b-h2-checklist',
    type: 'heading',
    headingLevel: 2,
    text: 'Monthly Improvement Checklist',
    anchorId: 'monthly-improvement-checklist',
    order: 72,
  },
  {
    id: 'b-check-1',
    type: 'paragraph',
    text: 'Review:',
    order: 73,
  },
  {
    id: 'b-check-list',
    type: 'bulleted_list',
    items: [
      '✔ Upload consistency',
      '✔ Audience retention',
      '✔ Watch time',
      '✔ Click-through rate',
      '✔ Subscriber growth',
      '✔ Search traffic',
      '✔ Top-performing videos',
      '✔ Returning viewers',
    ],
    order: 74,
  },
  {
    id: 'b-check-2',
    type: 'paragraph',
    text: 'Use these insights to improve your publishing strategy every month.',
    order: 75,
  },
  {
    id: 'b-fig-dashboard',
    type: 'figure',
    order: 76,
    image: {
      src: `${IMG}/youtube-growth-performance-dashboard.png`,
      alt: 'Business analytics dashboard displaying YouTube watch time, audience retention, click-through rate, subscriber growth, views and overall channel performance improvements.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-takeaways',
    type: 'heading',
    headingLevel: 2,
    text: 'Key Takeaways',
    anchorId: 'key-takeaways',
    order: 77,
  },
  {
    id: 'b-take-1',
    type: 'paragraph',
    text: 'Most YouTube growth problems are caused by strategy rather than luck.',
    order: 77,
  },
  {
    id: 'b-take-2',
    type: 'paragraph',
    text: 'Creators who publish consistently, understand their audience, optimise every upload and continually improve their content are more likely to achieve sustainable growth than those searching for shortcuts.',
    order: 78,
  },
  {
    id: 'b-take-3',
    type: 'paragraph',
    text: 'Long-term success comes from learning, testing and refining your approach over time.',
    order: 79,
  },
  {
    id: 'b-h2-conclusion',
    type: 'heading',
    headingLevel: 2,
    text: 'Conclusion',
    anchorId: 'conclusion',
    order: 80,
  },
  {
    id: 'b-conc-1',
    type: 'paragraph',
    text: 'Mistakes are a normal part of building a YouTube channel, but repeating the same mistakes can slow long-term progress.',
    order: 81,
  },
  {
    id: 'b-conc-2',
    type: 'paragraph',
    text: 'By focusing on audience value, strong optimisation, consistent publishing and regular performance reviews, you can build a channel that grows steadily while earning viewer trust.',
    order: 82,
  },
  {
    id: 'b-conc-3',
    type: 'paragraph',
    text: "Every improvement—whether it's a better thumbnail, a clearer title or stronger audience retention—contributes to long-term success.",
    order: 83,
  },
  {
    id: 'b-h2-related',
    type: 'heading',
    headingLevel: 2,
    text: 'Related Learn Articles',
    anchorId: 'related-learn-articles',
    order: 84,
  },
  {
    id: 'b-related-list',
    type: 'bulleted_list',
    items: [
      'Complete YouTube Growth Guide',
      'How the YouTube Algorithm Works',
      'YouTube SEO Guide',
      'How to Get More YouTube Subscribers',
      'How to Get More YouTube Views',
    ],
    order: 85,
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

export const COMMON_YOUTUBE_GROWTH_MISTAKES_ARTICLE: LearnArticleRecord = {
  id: 'learn-common-youtube-growth-mistakes',
  slug: SLUG,
  title:
    'Common YouTube Growth Mistakes: 15 Mistakes That Stop Channels from Growing',
  excerpt:
    'Discover the most common YouTube growth mistakes and learn how to improve your content strategy, audience retention, SEO and long-term channel performance.',
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'youtube',
  tags: ['growth', 'mistakes', 'marketing', 'video'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/common-youtube-growth-mistakes.png`,
    alt: 'Illustration showing common YouTube growth mistakes including poor thumbnails, inconsistent publishing, weak SEO, low audience retention and missed optimization opportunities.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
  showModifiedDate: false,
  seo: {
    title: 'Common YouTube Growth Mistakes | Avoid These Growth Errors',
    description:
      'Discover the most common YouTube growth mistakes and learn how to improve your content strategy, audience retention, SEO and long-term channel performance.',
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      'Common YouTube Growth Mistakes',
      'YouTube Growth Mistakes',
      'YouTube Channel Tips',
      'YouTube SEO Mistakes',
      'Grow on YouTube',
      'YouTube Creator Guide',
    ],
    ogImage: `${IMG}/common-youtube-growth-mistakes.png`,
  },
  relatedServices: ['buy-youtube-subscribers', 'buy-youtube-views'],
  relatedArticles: [
    'youtube-growth-guide',
    'how-the-youtube-algorithm-works',
    'youtube-seo-guide',
    'how-to-get-more-youtube-subscribers',
    'how-to-get-more-youtube-views',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    'Most YouTube growth problems are caused by strategy rather than luck.',
    'Creators who publish consistently, understand their audience, optimise every upload and continually improve their content are more likely to achieve sustainable growth than those searching for shortcuts.',
    'Long-term success comes from learning, testing and refining your approach over time.',
  ],
  faqs: [
    {
      id: 'faq-biggest-mistake',
      question: 'What is the biggest YouTube growth mistake?',
      answer:
        'One of the most common mistakes is creating content without understanding a specific audience or niche.',
      schemaEligible: true,
    },
    {
      id: 'faq-thumbnails',
      question: 'Do thumbnails really affect growth?',
      answer:
        'Yes. Thumbnails strongly influence click-through rate, which can impact how many people watch your videos.',
      schemaEligible: true,
    },
    {
      id: 'faq-upload-daily',
      question: 'Should I upload every day?',
      answer:
        'Not necessarily. A consistent schedule that you can maintain is usually more effective than uploading frequently with lower quality.',
      schemaEligible: true,
    },
    {
      id: 'faq-studio',
      question: 'Why should I check YouTube Studio?',
      answer:
        'Analytics help you understand what works, what needs improvement and how viewers interact with your content.',
      schemaEligible: true,
    },
    {
      id: 'faq-older-videos',
      question: 'Can older videos still grow?',
      answer:
        'Yes. Well-optimised videos can continue receiving search traffic and recommendations long after they are published.',
      schemaEligible: true,
    },
  ],
  serviceCta: {
    serviceSlug: 'buy-youtube-subscribers',
    label: 'Explore YouTube Subscribers Packages',
    description:
      'Compare real subscriber packages on InstantViral.ca when you are ready to support channel growth.',
  },
};
