/**
 * Muhammad Tayyab, Learn Center author for InstantViral.
 * Keeps the original author id so every existing article points to him.
 * Profile text uses only details approved by the site owner.
 */

import type { AuthorRecord } from '@/types/author';

export const INSTANTVIRAL_EDITORIAL_TEAM: AuthorRecord = {
  id: 'author-instantviral-editorial',
  slug: 'tayyab',
  name: 'Muhammad Tayyab',
  role: 'Social Media Marketing Specialist at InstantViral',
  bio: 'Muhammad Tayyab is a social media marketing specialist with more than 10 years of experience. He writes the InstantViral Learn Center guides on Instagram, TikTok, Facebook and YouTube growth for creators and businesses in Canada, with a focus on how each platform actually works and what helps an account grow.',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/muhammad-tayyab-b4a08125b',
  },
  expertise: [
    'Social media marketing',
    'Instagram growth',
    'TikTok growth',
    'Facebook growth',
    'YouTube growth',
  ],
  joinedAt: '2018-01-01T00:00:00.000Z',
  active: true,
  featured: true,
  seo: {
    title: 'Muhammad Tayyab | InstantViral Authors',
    description:
      'Muhammad Tayyab is a social media marketing specialist with more than 10 years of experience, writing InstantViral guides on Instagram, TikTok, Facebook and YouTube growth.',
    canonicalPath: '/authors/tayyab',
  },
};
