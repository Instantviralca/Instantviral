import type { EducationalGuideContent } from '@/data/content/instagram-educational-guides';

export const YOUTUBE_SUBSCRIBERS_EDUCATIONAL_GUIDE: EducationalGuideContent = {
  id: 'youtube-subscribers-growth-guide',
  serviceSlug: 'buy-youtube-subscribers',
  title: 'How YouTube Subscribers Support Long-Term Channel Growth',
  description:
    'Subscribers form the returning audience around a YouTube channel. They can receive new-upload notifications, discover future videos through their subscriptions and provide creators with a clearer picture of the audience interested in their content. A larger subscriber count can also strengthen the first impression of a channel, but sustainable growth still depends on useful videos, consistent publishing and an understanding of viewer behaviour.',
  blocks: [
    {
      type: 'prose',
      id: 'yt-s-credibility',
      heading: 'Why Channel Credibility Matters',
      paragraphs: [
        "New visitors often review a channel's subscriber count, recent uploads and overall presentation before deciding whether to explore more videos. An established audience can make the channel appear more active and encourage viewers to spend additional time reviewing its content.",
      ],
    },
    {
      type: 'prose',
      id: 'yt-s-roles',
      heading: 'Subscribers and Returning Viewers Serve Different Roles',
      paragraphs: [
        'A subscriber count shows how many users have chosen to follow a channel, while returning-viewer data shows how often people come back to watch. Both signals are useful. Subscriber growth can improve visible credibility, while consistent content gives viewers a reason to return.',
      ],
    },
    {
      type: 'prose',
      id: 'yt-s-package-fit',
      heading: 'Choose a Package That Fits the Channel',
      paragraphs: [
        "Package size should reflect the channel's present audience, publishing activity and growth objectives. A newer creator may prefer a smaller quantity, while an established business or media channel may select a larger package that better suits its current scale.",
      ],
    },
    {
      type: 'prose',
      id: 'yt-s-valuable-videos',
      heading: 'Continue Publishing Valuable Videos',
      paragraphs: [
        'Subscriber packages should complement a broader channel strategy rather than replace it. Publish videos that answer viewer questions, improve titles and thumbnails, organise related content into playlists and review analytics to understand what keeps people watching.',
      ],
    },
    {
      type: 'tips-grid',
      id: 'yt-s-practical-checklist',
      heading: 'Practical Ways to Strengthen Your YouTube Channel',
      intro:
        'Use the following actions alongside subscriber growth to create a more useful and consistent experience for viewers.',
      illustration: 'youtube-channel-planning',
      items: [
        {
          id: 'yt-s-pos',
          title: 'Improve Channel Positioning',
          description:
            'Make it immediately clear what the channel covers and who the videos are intended to help.',
          icon: 'compass',
        },
        {
          id: 'yt-s-titles',
          title: 'Use Clear Video Titles',
          description:
            'Write titles that accurately describe the topic and give viewers a reason to click without using misleading claims.',
          icon: 'quote',
        },
        {
          id: 'yt-s-thumbs',
          title: 'Create Strong Thumbnails',
          description:
            'Use readable text, clear visual focus and consistent branding so videos are easier to recognise.',
          icon: 'clapper',
        },
        {
          id: 'yt-s-publish',
          title: 'Publish Consistently',
          description:
            'Choose a realistic schedule that allows you to maintain quality instead of uploading irregularly.',
          icon: 'calendar',
        },
        {
          id: 'yt-s-playlists',
          title: 'Organise Videos Into Playlists',
          description:
            'Group related videos so viewers can discover additional content without leaving the channel.',
          icon: 'layers',
        },
        {
          id: 'yt-s-analytics',
          title: 'Review YouTube Analytics',
          description:
            'Monitor click-through rate, audience retention, traffic sources and returning viewers to improve future videos.',
          icon: 'chart',
        },
      ],
    },
    {
      type: 'mistakes',
      id: 'yt-s-mistakes',
      heading: 'Common Mistakes to Avoid When Choosing a Package',
      items: [
        {
          id: 'yt-s-m1',
          title: 'Selecting a Quantity Without Reviewing the Channel',
          description:
            "Choose a package that makes sense for the channel's current audience, upload history and wider promotion plan.",
        },
        {
          id: 'yt-s-m2',
          title: 'Submitting the Wrong Channel URL',
          description:
            'Check the public URL carefully before checkout so the selected package is assigned to the correct channel.',
        },
        {
          id: 'yt-s-m3',
          title: 'Making the Channel Difficult to Access',
          description:
            'The submitted channel must remain publicly accessible while the subscriber order is being processed.',
        },
        {
          id: 'yt-s-m4',
          title: 'Relying on Subscriber Count Alone',
          description:
            'Continue improving videos, thumbnails, titles and audience retention. Subscriber numbers are only one part of channel performance.',
        },
        {
          id: 'yt-s-m5',
          title: 'Ignoring Order Confirmation Details',
          description:
            'Keep the confirmation email and order ID available because they are required for order tracking and support enquiries.',
        },
      ],
    },
    {
      type: 'cards',
      id: 'yt-s-who-uses',
      heading: 'Who Uses YouTube Subscriber Packages?',
      intro:
        "Subscriber packages can support different channel types, provided the selected quantity fits the channel's goals and existing audience.",
      items: [
        {
          id: 'yt-s-who-creators',
          title: 'Independent Creators',
          description:
            'For creators developing an audience around entertainment, education, reviews or personal expertise.',
          icon: 'clapper',
        },
        {
          id: 'yt-s-who-business',
          title: 'Businesses',
          description:
            'For companies using YouTube to explain products, publish tutorials, share updates or support customers.',
          icon: 'building',
        },
        {
          id: 'yt-s-who-educators',
          title: 'Educators',
          description:
            'For teachers, coaches and course creators building libraries of useful learning content.',
          icon: 'award',
        },
        {
          id: 'yt-s-who-podcasters',
          title: 'Podcasters',
          description:
            'For podcast channels publishing full episodes, interviews, clips and recurring discussions.',
          icon: 'message',
        },
        {
          id: 'yt-s-who-stores',
          title: 'Online Stores',
          description:
            'For retailers using product demonstrations, comparisons, tutorials and customer-focused video content.',
          icon: 'store',
        },
        {
          id: 'yt-s-who-agencies',
          title: 'Agencies and Media Teams',
          description:
            'For teams managing branded channels, campaign content and ongoing video publishing.',
          icon: 'handshake',
        },
      ],
    },
  ],
};
