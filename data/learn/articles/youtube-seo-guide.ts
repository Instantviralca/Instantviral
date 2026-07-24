/**
 * Learn article — YouTube SEO Guide.
 * Editorial source: manually written production copy (YouTube Article #3).
 *
 * Related cluster: Growth Guide and Algorithm are live; remaining YouTube
 * Learn titles preserved as text until registered.
 * Commercial linking: subscribers and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'youtube-seo-guide';
const IMG = '/assets/images/learn/youtube-seo-guide' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    text: "Creating an excellent video is only the first step toward success on YouTube. Every day, thousands of new videos compete for viewers' attention, making discoverability just as important as content quality. Even the most informative or entertaining video may struggle to attract an audience if it is not properly optimised for YouTube Search and recommendations.",
    order: 1,
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    text: "YouTube functions as one of the world's largest search engines. People use it to solve problems, learn new skills, compare products and find answers to specific questions. This means creators and businesses should think beyond uploading videos and focus on making those videos easy to discover.",
    order: 2,
  },
  {
    id: 'b-intro-3',
    type: 'paragraph',
    text: 'Good YouTube SEO is not about tricking the algorithm or stuffing keywords into every field. Instead, it is about helping both viewers and YouTube understand what your video offers. Clear titles, relevant descriptions, strong thumbnails and well-structured content all contribute to better discoverability.',
    order: 3,
  },
  {
    id: 'b-intro-4',
    type: 'paragraph',
    text: 'This guide explains the essential elements of YouTube SEO and how to optimise your videos for sustainable long-term growth.',
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
    id: 'b-h2-what',
    type: 'heading',
    headingLevel: 2,
    text: 'What Is YouTube SEO?',
    anchorId: 'what-is-youtube-seo',
    order: 6,
  },
  {
    id: 'b-what-1',
    type: 'paragraph',
    text: 'YouTube SEO is the process of improving your videos and channel so they can be discovered more easily through YouTube Search, Suggested Videos and, in many cases, Google Search.',
    order: 7,
  },
  {
    id: 'b-what-2',
    type: 'paragraph',
    text: 'A good SEO strategy helps people:',
    order: 8,
  },
  {
    id: 'b-what-list',
    type: 'bulleted_list',
    items: [
      'Find your videos.',
      'Understand your content.',
      'Continue watching your channel.',
      'Discover related videos.',
      'Subscribe after receiving value.',
    ],
    order: 9,
  },
  {
    id: 'b-what-3',
    type: 'paragraph',
    text: 'Rather than focusing only on rankings, YouTube SEO improves the overall viewing experience.',
    order: 10,
  },
  {
    id: 'b-related-algorithm',
    type: 'related_article_card',
    articleSlug: 'how-the-youtube-algorithm-works',
    label: 'How the YouTube Algorithm Works',
    description:
      'Learn how the YouTube algorithm works and discover practical strategies to improve video recommendations, watch time, audience retention and long-term channel growth.',
    order: 11,
  },
  {
    id: 'b-h2-keywords',
    type: 'heading',
    headingLevel: 2,
    text: 'Start with Keyword Research',
    anchorId: 'start-with-keyword-research',
    order: 12,
  },
  {
    id: 'b-kw-1',
    type: 'paragraph',
    text: 'Every successful YouTube video begins with understanding what people are searching for.',
    order: 13,
  },
  {
    id: 'b-kw-2',
    type: 'paragraph',
    text: 'Look for topics that:',
    order: 14,
  },
  {
    id: 'b-kw-list',
    type: 'bulleted_list',
    items: [
      'Answer common questions.',
      'Solve specific problems.',
      "Match your audience's interests.",
      'Have long-term relevance.',
      'Align with your expertise.',
    ],
    order: 15,
  },
  {
    id: 'b-kw-3',
    type: 'paragraph',
    text: 'Long-tail search phrases often attract more targeted viewers than broad, highly competitive keywords.',
    order: 16,
  },
  {
    id: 'b-fig-keywords',
    type: 'figure',
    order: 17,
    image: {
      src: `${IMG}/youtube-keyword-research.png`,
      alt: 'YouTube keyword research with search intent analysis, content planning, topic clusters and video optimization.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-svc-subscribers',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-subscribers',
    label: 'Buy YouTube Subscribers Canada',
    description:
      'Compare real subscriber packages when you want to support channel growth alongside organic content.',
    order: 18,
  },
  {
    id: 'b-h2-titles',
    type: 'heading',
    headingLevel: 2,
    text: 'Write Clear, Search-Friendly Titles',
    anchorId: 'write-clear-search-friendly-titles',
    order: 19,
  },
  {
    id: 'b-titles-1',
    type: 'paragraph',
    text: 'Your title should immediately explain what viewers will learn.',
    order: 19,
  },
  {
    id: 'b-titles-2',
    type: 'paragraph',
    text: 'Effective titles are:',
    order: 20,
  },
  {
    id: 'b-titles-list',
    type: 'bulleted_list',
    items: [
      'Clear.',
      'Specific.',
      'Easy to understand.',
      'Relevant to the search query.',
      'Consistent with the video content.',
    ],
    order: 21,
  },
  {
    id: 'b-titles-3',
    type: 'paragraph',
    text: 'Avoid misleading titles that promise something the video does not deliver.',
    order: 22,
  },
  {
    id: 'b-h2-descriptions',
    type: 'heading',
    headingLevel: 2,
    text: 'Create Detailed Video Descriptions',
    anchorId: 'create-detailed-video-descriptions',
    order: 23,
  },
  {
    id: 'b-desc-1',
    type: 'paragraph',
    text: 'Descriptions provide additional context for both viewers and YouTube.',
    order: 24,
  },
  {
    id: 'b-desc-2',
    type: 'paragraph',
    text: 'Include:',
    order: 25,
  },
  {
    id: 'b-desc-list',
    type: 'bulleted_list',
    items: [
      'A summary of the video.',
      'Relevant keywords naturally.',
      'Helpful resources.',
      'Related videos.',
      'Website links (when appropriate).',
      'Chapter timestamps if applicable.',
    ],
    order: 26,
  },
  {
    id: 'b-desc-3',
    type: 'paragraph',
    text: 'Write descriptions for people first, then optimise them for search.',
    order: 27,
  },
  {
    id: 'b-fig-optimization',
    type: 'figure',
    order: 28,
    image: {
      src: `${IMG}/youtube-video-optimization.png`,
      alt: 'YouTube video optimization including title creation, thumbnail design, video description, playlists and publishing workflow.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-thumbnails',
    type: 'heading',
    headingLevel: 2,
    text: 'Design High-Quality Thumbnails',
    anchorId: 'design-high-quality-thumbnails',
    order: 29,
  },
  {
    id: 'b-thumb-1',
    type: 'paragraph',
    text: 'Your thumbnail influences whether viewers click your video.',
    order: 29,
  },
  {
    id: 'b-thumb-2',
    type: 'paragraph',
    text: 'Strong thumbnails are:',
    order: 30,
  },
  {
    id: 'b-thumb-list',
    type: 'bulleted_list',
    items: [
      'Easy to recognise.',
      'Visually clean.',
      'Consistent with your branding.',
      'Relevant to the topic.',
    ],
    order: 31,
  },
  {
    id: 'b-thumb-3',
    type: 'paragraph',
    text: 'Remember that a higher click-through rate often improves the chances of receiving additional recommendations.',
    order: 32,
  },
  {
    id: 'b-h2-playlists',
    type: 'heading',
    headingLevel: 2,
    text: 'Organise Videos with Playlists',
    anchorId: 'organise-videos-with-playlists',
    order: 33,
  },
  {
    id: 'b-play-1',
    type: 'paragraph',
    text: 'Playlists improve both navigation and watch time.',
    order: 34,
  },
  {
    id: 'b-play-2',
    type: 'paragraph',
    text: 'Benefits include:',
    order: 35,
  },
  {
    id: 'b-play-list',
    type: 'bulleted_list',
    items: [
      'Easier content discovery.',
      'Longer viewing sessions.',
      'Better topic organisation.',
      'Stronger internal video connections.',
    ],
    order: 36,
  },
  {
    id: 'b-play-3',
    type: 'paragraph',
    text: 'Group videos around related topics instead of creating random collections.',
    order: 37,
  },
  {
    id: 'b-h2-channel',
    type: 'heading',
    headingLevel: 2,
    text: 'Optimise Your Channel',
    anchorId: 'optimise-your-channel',
    order: 38,
  },
  {
    id: 'b-chan-1',
    type: 'paragraph',
    text: 'Your channel should clearly communicate what viewers can expect.',
    order: 39,
  },
  {
    id: 'b-chan-2',
    type: 'paragraph',
    text: 'Review:',
    order: 40,
  },
  {
    id: 'b-chan-list',
    type: 'bulleted_list',
    items: [
      'Channel description.',
      'Banner artwork.',
      'Profile image.',
      'Featured video.',
      'Playlists.',
      'Upload schedule.',
    ],
    order: 41,
  },
  {
    id: 'b-chan-3',
    type: 'paragraph',
    text: 'A well-organised channel encourages visitors to explore additional content.',
    order: 42,
  },
  {
    id: 'b-svc-views',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-views',
    label: 'Buy YouTube Views Canada',
    description:
      'Compare view packages when you want to support early traction on high-value uploads.',
    order: 43,
  },
  {
    id: 'b-h2-experience',
    type: 'heading',
    headingLevel: 2,
    text: 'Improve Viewer Experience',
    anchorId: 'improve-viewer-experience',
    order: 44,
  },
  {
    id: 'b-exp-1',
    type: 'paragraph',
    text: 'Good SEO goes beyond keywords.',
    order: 45,
  },
  {
    id: 'b-exp-2',
    type: 'paragraph',
    text: 'Focus on:',
    order: 46,
  },
  {
    id: 'b-exp-list',
    type: 'bulleted_list',
    items: [
      'Clear audio.',
      'Professional editing.',
      'Logical structure.',
      'Fast introductions.',
      'Accurate information.',
      'Consistent branding.',
    ],
    order: 47,
  },
  {
    id: 'b-exp-3',
    type: 'paragraph',
    text: 'Videos that satisfy viewers often perform better over time.',
    order: 48,
  },
  {
    id: 'b-related-views',
    type: 'related_article_card',
    articleSlug: 'how-to-get-more-youtube-views',
    label: 'How to Get More YouTube Views',
    description:
      'Learn how to get more YouTube views using proven strategies that improve click-through rate, watch time, audience retention and long-term channel growth.',
    order: 49,
  },
  {
    id: 'b-h2-studio',
    type: 'heading',
    headingLevel: 2,
    text: 'Monitor YouTube Studio',
    anchorId: 'monitor-youtube-studio',
    order: 50,
  },
  {
    id: 'b-studio-1',
    type: 'paragraph',
    text: 'Analytics help you improve future uploads.',
    order: 51,
  },
  {
    id: 'b-studio-2',
    type: 'paragraph',
    text: 'Review:',
    order: 52,
  },
  {
    id: 'b-studio-list',
    type: 'bulleted_list',
    items: [
      'Search traffic.',
      'Click-through rate.',
      'Watch time.',
      'Audience retention.',
      'Subscriber growth.',
      'Top-performing keywords.',
      'Returning viewers.',
    ],
    order: 53,
  },
  {
    id: 'b-studio-3',
    type: 'paragraph',
    text: 'These insights reveal which optimisation strategies are producing results.',
    order: 54,
  },
  {
    id: 'b-related-subscribers',
    type: 'related_article_card',
    articleSlug: 'how-to-get-more-youtube-subscribers',
    label: 'How to Get More YouTube Subscribers',
    description:
      'Learn how to get more YouTube subscribers with proven strategies that improve audience trust, video quality, watch time and long-term channel growth.',
    order: 55,
  },
  {
    id: 'b-h2-tips',
    type: 'heading',
    headingLevel: 2,
    text: 'Expert Tips',
    anchorId: 'expert-tips',
    order: 56,
  },
  {
    id: 'b-tips-1',
    type: 'paragraph',
    text: 'Channels with strong YouTube SEO usually:',
    order: 57,
  },
  {
    id: 'b-tips-list',
    type: 'bulleted_list',
    items: [
      'Research topics before recording.',
      'Optimise every upload.',
      'Update older videos.',
      'Improve thumbnails regularly.',
      'Build playlists.',
      'Monitor search performance every month.',
    ],
    order: 58,
  },
  {
    id: 'b-tips-2',
    type: 'paragraph',
    text: 'SEO is an ongoing process rather than a one-time task.',
    order: 59,
  },
  {
    id: 'b-related-mistakes',
    type: 'related_article_card',
    articleSlug: 'common-youtube-growth-mistakes',
    label: 'Common YouTube Growth Mistakes',
    description:
      'Discover the most common YouTube growth mistakes and learn how to improve your content strategy, audience retention, SEO and long-term channel performance.',
    order: 60,
  },
  {
    id: 'b-h2-example',
    type: 'heading',
    headingLevel: 2,
    text: 'Real-World Example',
    anchorId: 'real-world-example',
    order: 61,
  },
  {
    id: 'b-ex-1',
    type: 'paragraph',
    text: 'A Canadian accounting firm launched a YouTube channel to answer common tax questions for small businesses.',
    order: 62,
  },
  {
    id: 'b-ex-2',
    type: 'paragraph',
    text: 'Instead of using generic titles like "Tax Tips," the team created videos with clear search-focused titles such as "How to Prepare Business Taxes in Canada" and organised them into playlists covering bookkeeping, tax planning and deductions.',
    order: 63,
  },
  {
    id: 'b-ex-3',
    type: 'paragraph',
    text: 'Over time, the channel began receiving consistent search traffic because viewers could easily understand the purpose of each video.',
    order: 64,
  },
  {
    id: 'b-h2-wins',
    type: 'heading',
    headingLevel: 2,
    text: 'Quick Wins',
    anchorId: 'quick-wins',
    order: 65,
  },
  {
    id: 'b-wins-1',
    type: 'paragraph',
    text: 'Improve your YouTube SEO this week:',
    order: 66,
  },
  {
    id: 'b-wins-list',
    type: 'bulleted_list',
    items: [
      'Rewrite one older title.',
      'Update one video description.',
      'Improve one thumbnail.',
      'Create a new playlist.',
      'Review your top search keywords.',
    ],
    order: 67,
  },
  {
    id: 'b-h2-checklist',
    type: 'heading',
    headingLevel: 2,
    text: 'Monthly YouTube SEO Checklist',
    anchorId: 'monthly-youtube-seo-checklist',
    order: 68,
  },
  {
    id: 'b-check-1',
    type: 'paragraph',
    text: 'Review:',
    order: 69,
  },
  {
    id: 'b-check-list',
    type: 'bulleted_list',
    items: [
      '✔ Search traffic',
      '✔ Click-through rate',
      '✔ Watch time',
      '✔ Audience retention',
      '✔ Subscriber growth',
      '✔ Video descriptions',
      '✔ Playlists',
      '✔ Top-performing keywords',
    ],
    order: 70,
  },
  {
    id: 'b-check-2',
    type: 'paragraph',
    text: 'Use this information to refine your optimisation strategy every month.',
    order: 71,
  },
  {
    id: 'b-fig-analytics',
    type: 'figure',
    order: 72,
    image: {
      src: `${IMG}/youtube-seo-analytics-dashboard.png`,
      alt: 'Business analytics dashboard displaying YouTube search traffic, organic views, click-through rate, watch time, audience.',
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
    order: 73,
  },
  {
    id: 'b-take-1',
    type: 'paragraph',
    text: 'YouTube SEO helps viewers discover your content while improving the overall user experience.',
    order: 73,
  },
  {
    id: 'b-take-2',
    type: 'paragraph',
    text: 'Channels that combine valuable videos with clear titles, detailed descriptions, organised playlists and consistent optimisation are more likely to achieve sustainable long-term growth.',
    order: 74,
  },
  {
    id: 'b-take-3',
    type: 'paragraph',
    text: 'Focus on helping your audience find useful content rather than trying to manipulate search rankings.',
    order: 75,
  },
  {
    id: 'b-h2-conclusion',
    type: 'heading',
    headingLevel: 2,
    text: 'Conclusion',
    anchorId: 'conclusion',
    order: 76,
  },
  {
    id: 'b-conc-1',
    type: 'paragraph',
    text: 'Strong YouTube SEO begins long before a video is published and continues after it goes live.',
    order: 77,
  },
  {
    id: 'b-conc-2',
    type: 'paragraph',
    text: 'By researching topics, optimising every upload and regularly reviewing performance data, you can build a channel that attracts more viewers, earns more subscribers and continues generating organic traffic over time.',
    order: 78,
  },
  {
    id: 'b-conc-3',
    type: 'paragraph',
    text: 'Small optimisation improvements made consistently often produce significant long-term results.',
    order: 79,
  },
  {
    id: 'b-h2-related',
    type: 'heading',
    headingLevel: 2,
    text: 'Related Learn Articles',
    anchorId: 'related-learn-articles',
    order: 80,
  },
  {
    id: 'b-related-list',
    type: 'bulleted_list',
    items: [
      'Complete YouTube Growth Guide',
      'How the YouTube Algorithm Works',
      'How to Get More YouTube Subscribers',
      'How to Get More YouTube Views',
      'Common YouTube Growth Mistakes',
    ],
    order: 81,
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

export const YOUTUBE_SEO_GUIDE_ARTICLE: LearnArticleRecord = {
  id: 'learn-youtube-seo-guide',
  slug: SLUG,
  title:
    'YouTube SEO Guide: How to Optimise Your Videos for More Views and Subscribers',
  excerpt:
    'Learn how YouTube SEO works and discover practical strategies to optimise your videos, channel and content for better rankings, more views and long-term growth.',
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'youtube',
  tags: ['seo', 'marketing', 'video', 'strategy'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/youtube-seo-guide.png`,
    alt: 'YouTube SEO optimization with video metadata, keyword research, channel optimization, search visibility and long-term.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
  showModifiedDate: false,
  seo: {
    title: 'YouTube SEO Guide | Get More Views & Subscribers',
    description:
      'Learn how YouTube SEO works and discover practical strategies to optimise your videos, channel and content for better rankings, more views and long-term growth.',
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      'YouTube SEO Guide',
      'YouTube SEO',
      'YouTube Video SEO',
      'YouTube Search Optimization',
      'YouTube Ranking',
      'YouTube Marketing',
    ],
    ogImage: `${IMG}/youtube-seo-guide.png`,
  },
  relatedServices: ['buy-youtube-subscribers', 'buy-youtube-views'],
  relatedArticles: [
    'youtube-growth-guide',
    'how-the-youtube-algorithm-works',
    'how-to-get-more-youtube-subscribers',
    'how-to-get-more-youtube-views',
    'common-youtube-growth-mistakes',
  ],
  featured: true,
  published: true,
  status: 'published',
  editorialApproved: true,
  contentReviewed: true,
  seoReviewed: true,
  keyTakeaways: [
    'YouTube SEO helps viewers discover your content while improving the overall user experience.',
    'Channels that combine valuable videos with clear titles, detailed descriptions, organised playlists and consistent optimisation are more likely to achieve sustainable long-term growth.',
    'Focus on helping your audience find useful content rather than trying to manipulate search rankings.',
  ],
  faqs: [
    {
      id: 'faq-what-is-yt-seo',
      question: 'What is YouTube SEO?',
      answer:
        'YouTube SEO is the process of optimising videos and channels to improve visibility in YouTube Search, Suggested Videos and external search engines.',
      schemaEligible: true,
    },
    {
      id: 'faq-keywords',
      question: 'Are keywords still important on YouTube?',
      answer:
        'Yes, but they should be used naturally within titles, descriptions and relevant content rather than repeated excessively.',
      schemaEligible: true,
    },
    {
      id: 'faq-playlists',
      question: 'Do playlists improve YouTube SEO?',
      answer:
        'Playlists help organise videos, improve navigation and encourage longer viewing sessions.',
      schemaEligible: true,
    },
    {
      id: 'faq-update-older',
      question: 'How often should I update older videos?',
      answer:
        'Review your highest-performing videos every few months and update titles, descriptions or thumbnails where appropriate.',
      schemaEligible: true,
    },
    {
      id: 'faq-subscribers',
      question: 'Does YouTube SEO help gain subscribers?',
      answer:
        'Yes. Better discoverability often leads to more views, increased watch time and additional opportunities to earn subscribers.',
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
