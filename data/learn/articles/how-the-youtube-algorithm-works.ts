/**
 * Learn article — How the YouTube Algorithm Works.
 * Editorial source: manually written production copy (YouTube Article #2).
 *
 * Related cluster: Growth Guide and SEO Guide are live; remaining YouTube
 * Learn titles preserved as text until registered.
 * Commercial linking: subscribers and views service cards as instructed.
 */

import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';

const SLUG = 'how-the-youtube-algorithm-works';
const IMG = '/assets/images/learn/how-the-youtube-algorithm-works' as const;

const BLOCKS: ArticleContentBlock[] = [
  {
    id: 'b-intro-1',
    type: 'paragraph',
    text: "Many creators believe the YouTube algorithm is unpredictable or that it randomly decides which videos become successful. In reality, YouTube's recommendation system is designed to help viewers discover content they are most likely to enjoy. Its goal is not to promote the biggest channels automatically but to recommend videos that keep people watching and satisfied with their viewing experience.",
    order: 1,
  },
  {
    id: 'b-intro-2',
    type: 'paragraph',
    text: 'Every minute, hundreds of hours of video are uploaded to YouTube. Since no viewer can watch everything, the platform relies on machine learning to determine which videos should appear on the Home page, in Search results, within Suggested Videos and across other recommendation surfaces.',
    order: 2,
  },
  {
    id: 'b-intro-3',
    type: 'paragraph',
    text: 'Understanding how these recommendations work allows creators and businesses to build smarter content strategies instead of relying on guesswork. While the exact algorithm changes over time, YouTube consistently emphasizes viewer satisfaction, relevance and long-term engagement over shortcuts or artificial tactics.',
    order: 3,
  },
  {
    id: 'b-intro-4',
    type: 'paragraph',
    text: 'This guide explains the most important ranking signals and shows how to create videos that align with the way YouTube recommends content.',
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
    id: 'b-h2-why',
    type: 'heading',
    headingLevel: 2,
    text: 'Why the YouTube Algorithm Exists',
    anchorId: 'why-the-youtube-algorithm-exists',
    order: 6,
  },
  {
    id: 'b-why-1',
    type: 'paragraph',
    text: 'The algorithm exists to improve the viewing experience.',
    order: 7,
  },
  {
    id: 'b-why-2',
    type: 'paragraph',
    text: 'Its objectives include:',
    order: 8,
  },
  {
    id: 'b-why-list',
    type: 'bulleted_list',
    items: [
      'Recommending relevant videos.',
      'Keeping viewers satisfied.',
      'Helping people discover new creators.',
      'Encouraging longer viewing sessions.',
      'Personalising recommendations.',
    ],
    order: 9,
  },
  {
    id: 'b-why-3',
    type: 'paragraph',
    text: 'Rather than rewarding channels simply because they upload frequently, YouTube evaluates how viewers respond to individual videos.',
    order: 10,
  },
  {
    id: 'b-svc-subscribers',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-subscribers',
    label: 'Buy YouTube Subscribers Canada',
    description:
      'Compare real subscriber packages when you want to support channel growth alongside organic content.',
    order: 11,
  },
  {
    id: 'b-h2-where',
    type: 'heading',
    headingLevel: 2,
    text: 'Where the Algorithm Recommends Videos',
    anchorId: 'where-the-algorithm-recommends-videos',
    order: 12,
  },
  {
    id: 'b-where-1',
    type: 'paragraph',
    text: 'Many creators think only about Search results, but YouTube recommends videos across several areas.',
    order: 13,
  },
  {
    id: 'b-where-2',
    type: 'paragraph',
    text: 'These include:',
    order: 14,
  },
  {
    id: 'b-where-list',
    type: 'bulleted_list',
    items: [
      'Home page',
      'Suggested Videos',
      'YouTube Search',
      'Browse Features',
      'Subscriptions feed',
      'Shorts feed (where applicable)',
    ],
    order: 15,
  },
  {
    id: 'b-where-3',
    type: 'paragraph',
    text: 'Each recommendation surface uses slightly different ranking signals, but all focus on providing a positive viewer experience.',
    order: 16,
  },
  {
    id: 'b-fig-ranking',
    type: 'figure',
    order: 17,
    image: {
      src: `${IMG}/youtube-ranking-signals.png`,
      alt: 'Illustration showing YouTube ranking signals including click-through rate, audience retention, watch time, viewer satisfaction and engagement metrics.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-ctr',
    type: 'heading',
    headingLevel: 2,
    text: 'Click-Through Rate (CTR)',
    anchorId: 'click-through-rate-ctr',
    order: 18,
  },
  {
    id: 'b-ctr-1',
    type: 'paragraph',
    text: 'The first signal YouTube evaluates is whether people choose to click your video.',
    order: 18,
  },
  {
    id: 'b-ctr-2',
    type: 'paragraph',
    text: 'CTR is influenced by:',
    order: 19,
  },
  {
    id: 'b-ctr-list',
    type: 'bulleted_list',
    items: [
      'Thumbnail quality',
      'Video title',
      'Viewer interest',
      'Topic relevance',
    ],
    order: 20,
  },
  {
    id: 'b-ctr-3',
    type: 'paragraph',
    text: 'A high CTR tells YouTube that your video attracts attention, but clicks alone are not enough.',
    order: 21,
  },
  {
    id: 'b-ctr-4',
    type: 'paragraph',
    text: 'If viewers leave immediately, the algorithm receives negative feedback.',
    order: 22,
  },
  {
    id: 'b-h2-retention',
    type: 'heading',
    headingLevel: 2,
    text: 'Audience Retention',
    anchorId: 'audience-retention',
    order: 23,
  },
  {
    id: 'b-ret-1',
    type: 'paragraph',
    text: 'Audience retention measures how long people continue watching your video.',
    order: 24,
  },
  {
    id: 'b-ret-2',
    type: 'paragraph',
    text: 'Videos that maintain viewer interest are more likely to receive additional recommendations.',
    order: 25,
  },
  {
    id: 'b-ret-3',
    type: 'paragraph',
    text: 'Improve retention by:',
    order: 26,
  },
  {
    id: 'b-ret-list',
    type: 'bulleted_list',
    items: [
      'Starting with a strong hook.',
      'Removing unnecessary introductions.',
      'Maintaining a clear structure.',
      'Delivering on your title and thumbnail.',
      'Keeping viewers curious about what comes next.',
    ],
    order: 27,
  },
  {
    id: 'b-ret-4',
    type: 'paragraph',
    text: 'Retention is often a stronger long-term signal than simple view count.',
    order: 28,
  },
  {
    id: 'b-fig-retention',
    type: 'figure',
    order: 29,
    image: {
      src: `${IMG}/youtube-audience-retention.png`,
      alt: 'Illustration showing YouTube audience retention with viewer watch progression, engagement milestones, video timeline and watch time analytics.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'b-h2-watch',
    type: 'heading',
    headingLevel: 2,
    text: 'Watch Time',
    anchorId: 'watch-time',
    order: 30,
  },
  {
    id: 'b-watch-1',
    type: 'paragraph',
    text: 'Watch time represents the total amount of time viewers spend watching your content.',
    order: 30,
  },
  {
    id: 'b-watch-2',
    type: 'paragraph',
    text: 'Longer watch time benefits both creators and YouTube because it contributes to longer viewing sessions.',
    order: 31,
  },
  {
    id: 'b-watch-3',
    type: 'paragraph',
    text: 'Instead of making videos longer unnecessarily, focus on creating content that remains valuable from beginning to end.',
    order: 32,
  },
  {
    id: 'b-related-views',
    type: 'related_article_card',
    articleSlug: 'how-to-get-more-youtube-views',
    label: 'How to Get More YouTube Views',
    description:
      'Learn how to get more YouTube views using proven strategies that improve click-through rate, watch time, audience retention and long-term channel growth.',
    order: 33,
  },
  {
    id: 'b-svc-views',
    type: 'related_service_card',
    serviceSlug: 'buy-youtube-views',
    label: 'Buy YouTube Views Canada',
    description:
      'Compare view packages when you want to support early traction on high-value uploads.',
    order: 34,
  },
  {
    id: 'b-h2-satisfaction',
    type: 'heading',
    headingLevel: 2,
    text: 'Viewer Satisfaction',
    anchorId: 'viewer-satisfaction',
    order: 35,
  },
  {
    id: 'b-sat-1',
    type: 'paragraph',
    text: 'YouTube increasingly measures how satisfied viewers are after watching.',
    order: 36,
  },
  {
    id: 'b-sat-2',
    type: 'paragraph',
    text: 'Positive indicators include:',
    order: 37,
  },
  {
    id: 'b-sat-list',
    type: 'bulleted_list',
    items: [
      'Likes',
      'Comments',
      'Shares',
      'Subscribers gained',
      'Returning viewers',
      'Survey feedback',
      'Watching additional videos',
    ],
    order: 38,
  },
  {
    id: 'b-sat-3',
    type: 'paragraph',
    text: 'The algorithm aims to recommend videos that create a positive overall experience.',
    order: 39,
  },
  {
    id: 'b-related-subscribers',
    type: 'related_article_card',
    articleSlug: 'how-to-get-more-youtube-subscribers',
    label: 'How to Get More YouTube Subscribers',
    description:
      'Learn how to get more YouTube subscribers with proven strategies that improve audience trust, video quality, watch time and long-term channel growth.',
    order: 40,
  },
  {
    id: 'b-h2-consistency',
    type: 'heading',
    headingLevel: 2,
    text: 'Consistency Helps the Algorithm Understand Your Channel',
    anchorId: 'consistency-helps-the-algorithm-understand-your-channel',
    order: 41,
  },
  {
    id: 'b-cons-1',
    type: 'paragraph',
    text: 'Publishing videos around related topics helps YouTube understand your channel.',
    order: 42,
  },
  {
    id: 'b-cons-2',
    type: 'paragraph',
    text: 'For example, a channel focused on home renovation should consistently create videos related to DIY projects, tools and home improvement rather than uploading completely unrelated content every week.',
    order: 43,
  },
  {
    id: 'b-cons-3',
    type: 'paragraph',
    text: 'A clear content focus makes recommendations more accurate.',
    order: 44,
  },
  {
    id: 'b-h2-playlists',
    type: 'heading',
    headingLevel: 2,
    text: 'Build Playlists and Internal Video Paths',
    anchorId: 'build-playlists-and-internal-video-paths',
    order: 45,
  },
  {
    id: 'b-play-1',
    type: 'paragraph',
    text: 'YouTube encourages viewers to continue watching.',
    order: 46,
  },
  {
    id: 'b-play-2',
    type: 'paragraph',
    text: 'Help them by creating:',
    order: 47,
  },
  {
    id: 'b-play-list',
    type: 'bulleted_list',
    items: [
      'Topic-based playlists.',
      'End screens.',
      'Information cards.',
      'Related video recommendations.',
    ],
    order: 48,
  },
  {
    id: 'b-play-3',
    type: 'paragraph',
    text: 'These features improve session duration while helping viewers discover more of your content.',
    order: 49,
  },
  {
    id: 'b-h2-myths',
    type: 'heading',
    headingLevel: 2,
    text: 'Avoid Common Algorithm Myths',
    anchorId: 'avoid-common-algorithm-myths',
    order: 50,
  },
  {
    id: 'b-myths-1',
    type: 'paragraph',
    text: 'Many myths continue circulating online.',
    order: 51,
  },
  {
    id: 'b-myths-2',
    type: 'paragraph',
    text: 'Examples include:',
    order: 52,
  },
  {
    id: 'b-myths-list',
    type: 'bulleted_list',
    items: [
      'Uploading every day guarantees success.',
      'Keywords alone rank videos.',
      'Subscriber count determines recommendations.',
      'Longer videos always perform better.',
    ],
    order: 53,
  },
  {
    id: 'b-myths-3',
    type: 'paragraph',
    text: 'In reality, YouTube focuses primarily on viewer behaviour and satisfaction rather than isolated metrics.',
    order: 54,
  },
  {
    id: 'b-related-mistakes',
    type: 'related_article_card',
    articleSlug: 'common-youtube-growth-mistakes',
    label: 'Common YouTube Growth Mistakes',
    description:
      'Discover the most common YouTube growth mistakes and learn how to improve your content strategy, audience retention, SEO and long-term channel performance.',
    order: 55,
  },
  {
    id: 'b-h2-studio',
    type: 'heading',
    headingLevel: 2,
    text: 'Analyse YouTube Studio',
    anchorId: 'analyse-youtube-studio',
    order: 56,
  },
  {
    id: 'b-studio-1',
    type: 'paragraph',
    text: 'Instead of guessing, review your analytics regularly.',
    order: 57,
  },
  {
    id: 'b-studio-2',
    type: 'paragraph',
    text: 'Important metrics include:',
    order: 58,
  },
  {
    id: 'b-studio-list',
    type: 'bulleted_list',
    items: [
      'Click-through rate.',
      'Watch time.',
      'Audience retention.',
      'Returning viewers.',
      'Traffic sources.',
      'Subscriber growth.',
      'Average view duration.',
    ],
    order: 59,
  },
  {
    id: 'b-studio-3',
    type: 'paragraph',
    text: 'These reports help identify which videos deserve to be expanded into future content.',
    order: 60,
  },
  {
    id: 'b-related-seo',
    type: 'related_article_card',
    articleSlug: 'youtube-seo-guide',
    label: 'YouTube SEO Guide',
    description:
      'Learn how YouTube SEO works and discover practical strategies to optimise your videos, channel and content for better rankings, more views and long-term growth.',
    order: 61,
  },
  {
    id: 'b-h2-tips',
    type: 'heading',
    headingLevel: 2,
    text: 'Expert Tips',
    anchorId: 'expert-tips',
    order: 62,
  },
  {
    id: 'b-tips-1',
    type: 'paragraph',
    text: 'Successful creators usually:',
    order: 63,
  },
  {
    id: 'b-tips-list',
    type: 'bulleted_list',
    items: [
      'Improve thumbnails continuously.',
      'Write clearer titles.',
      'Focus on retention.',
      'Study audience behaviour.',
      'Publish consistently.',
      'Review analytics every month.',
    ],
    order: 64,
  },
  {
    id: 'b-tips-2',
    type: 'paragraph',
    text: 'The algorithm rewards creators who consistently improve viewer experience.',
    order: 65,
  },
  {
    id: 'b-h2-example',
    type: 'heading',
    headingLevel: 2,
    text: 'Real-World Example',
    anchorId: 'real-world-example',
    order: 66,
  },
  {
    id: 'b-ex-1',
    type: 'paragraph',
    text: 'A Canadian financial education channel noticed that viewers often left within the first minute of its videos.',
    order: 67,
  },
  {
    id: 'b-ex-2',
    type: 'paragraph',
    text: 'Instead of changing topics, the creator shortened introductions, moved the main lesson to the beginning of each video and improved thumbnail clarity.',
    order: 68,
  },
  {
    id: 'b-ex-3',
    type: 'paragraph',
    text: 'Within a few months, audience retention increased, watch time improved and several videos began appearing more frequently in Suggested Videos because viewers continued watching for longer.',
    order: 69,
  },
  {
    id: 'b-h2-wins',
    type: 'heading',
    headingLevel: 2,
    text: 'Quick Wins',
    anchorId: 'quick-wins',
    order: 70,
  },
  {
    id: 'b-wins-1',
    type: 'paragraph',
    text: 'Improve your channel this week:',
    order: 71,
  },
  {
    id: 'b-wins-list',
    type: 'bulleted_list',
    items: [
      'Update one older thumbnail.',
      'Rewrite one video title.',
      'Review audience retention graphs.',
      'Add end screens to older videos.',
      'Create one new playlist.',
    ],
    order: 72,
  },
  {
    id: 'b-h2-checklist',
    type: 'heading',
    headingLevel: 2,
    text: 'Monthly Algorithm Checklist',
    anchorId: 'monthly-algorithm-checklist',
    order: 73,
  },
  {
    id: 'b-check-1',
    type: 'paragraph',
    text: 'Review:',
    order: 74,
  },
  {
    id: 'b-check-list',
    type: 'bulleted_list',
    items: [
      '✔ Click-through rate',
      '✔ Watch time',
      '✔ Audience retention',
      '✔ Returning viewers',
      '✔ Subscribers gained',
      '✔ Traffic sources',
      '✔ Top-performing videos',
      '✔ Session duration',
    ],
    order: 75,
  },
  {
    id: 'b-fig-dashboard',
    type: 'figure',
    order: 76,
    image: {
      src: `${IMG}/youtube-algorithm-dashboard.png`,
      alt: 'Business analytics dashboard displaying YouTube recommendations, watch time, audience retention, click-through rate, traffic sources and overall channel performance.',
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
    text: 'The YouTube algorithm is designed to recommend videos that create a positive viewing experience.',
    order: 77,
  },
  {
    id: 'b-take-2',
    type: 'paragraph',
    text: 'Creators who produce valuable content, maintain strong audience retention and continually improve their videos are more likely to achieve sustainable long-term growth.',
    order: 78,
  },
  {
    id: 'b-take-3',
    type: 'paragraph',
    text: 'Rather than trying to manipulate the algorithm, focus on understanding your audience and delivering content that keeps viewers engaged.',
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
    text: 'The YouTube algorithm changes regularly, but its purpose remains consistent: helping viewers discover videos they are most likely to enjoy.',
    order: 81,
  },
  {
    id: 'b-conc-2',
    type: 'paragraph',
    text: 'By improving thumbnails, titles, watch time, audience retention and overall viewer satisfaction, you can increase your chances of appearing in recommendations while building a stronger channel over time.',
    order: 82,
  },
  {
    id: 'b-conc-3',
    type: 'paragraph',
    text: 'Sustainable YouTube growth comes from creating content that people genuinely want to watch and return to.',
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
      'YouTube SEO Guide',
      'How to Get More YouTube Subscribers',
      'How to Get More YouTube Views',
      'Common YouTube Growth Mistakes',
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

export const HOW_THE_YOUTUBE_ALGORITHM_WORKS_ARTICLE: LearnArticleRecord = {
  id: 'learn-how-the-youtube-algorithm-works',
  slug: SLUG,
  title:
    'How the YouTube Algorithm Works: A Complete Guide to Getting More Views and Watch Time',
  excerpt:
    'Learn how the YouTube algorithm works and discover practical strategies to improve video recommendations, watch time, audience retention and long-term channel growth.',
  content: PLAIN_CONTENT,
  blocks: BLOCKS,
  category: 'youtube',
  tags: ['algorithm', 'marketing', 'video', 'strategy'],
  authorId: 'author-instantviral-editorial',
  featuredImage: {
    src: `${IMG}/how-the-youtube-algorithm-works.png`,
    alt: 'Illustration showing how the YouTube algorithm recommends videos using audience retention, watch time, click-through rate, viewer satisfaction and recommendation analytics.',
    width: 1920,
    height: 1080,
    priority: true,
  },
  readingTime: READING_TIME,
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
  showModifiedDate: false,
  seo: {
    title: 'How the YouTube Algorithm Works | Complete Guide',
    description:
      'Learn how the YouTube algorithm works and discover practical strategies to improve video recommendations, watch time, audience retention and long-term channel growth.',
    canonicalPath: `/learn/${SLUG}`,
    keywords: [
      'How the YouTube Algorithm Works',
      'YouTube Algorithm',
      'YouTube Recommendations',
      'YouTube Watch Time',
      'YouTube Views',
      'YouTube Growth Tips',
    ],
    ogImage: `${IMG}/how-the-youtube-algorithm-works.png`,
  },
  relatedServices: ['buy-youtube-subscribers', 'buy-youtube-views'],
  relatedArticles: [
    'youtube-growth-guide',
    'youtube-seo-guide',
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
    'The YouTube algorithm is designed to recommend videos that create a positive viewing experience.',
    'Creators who produce valuable content, maintain strong audience retention and continually improve their videos are more likely to achieve sustainable long-term growth.',
    'Rather than trying to manipulate the algorithm, focus on understanding your audience and delivering content that keeps viewers engaged.',
  ],
  faqs: [
    {
      id: 'faq-large-channels',
      question: 'Does the YouTube algorithm favour large channels?',
      answer:
        'No. Individual video performance and viewer satisfaction are more important than channel size alone.',
      schemaEligible: true,
    },
    {
      id: 'faq-watch-vs-views',
      question: 'Is watch time more important than views?',
      answer:
        "Watch time is one of YouTube's key performance signals because it reflects how long viewers stay engaged.",
      schemaEligible: true,
    },
    {
      id: 'faq-thumbnails',
      question: 'Do thumbnails affect the algorithm?',
      answer:
        'Yes. Better thumbnails can improve click-through rate, which influences how many people initially watch your videos.',
      schemaEligible: true,
    },
    {
      id: 'faq-analytics',
      question: 'How often should I review YouTube analytics?',
      answer:
        'Monthly reviews are recommended, with weekly checks for active publishing schedules.',
      schemaEligible: true,
    },
    {
      id: 'faq-new-channels',
      question: 'Can new channels grow on YouTube?',
      answer:
        'Yes. High-quality videos that satisfy viewers can be recommended regardless of channel size.',
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
