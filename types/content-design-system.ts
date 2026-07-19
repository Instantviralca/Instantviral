/**
 * Content Design System — Document 16.00.
 * Editorial standard for every Learn Center article package.
 */

export type ContentToneOfVoice =
  | 'professional'
  | 'helpful'
  | 'honest'
  | 'beginner_friendly';

export type ContentCalloutType =
  | 'pro_tip'
  | 'important'
  | 'warning'
  | 'example';

export type ContentArticleSectionId =
  | 'seo_metadata'
  | 'hero'
  | 'quick_answer'
  | 'table_of_contents'
  | 'introduction'
  | 'main_sections'
  | 'key_takeaways'
  | 'faq'
  | 'conclusion'
  | 'cta';

export const CONTENT_TONE_RULES = [
  'Professional',
  'Helpful',
  'Honest',
  'Beginner-friendly',
  'No hype or exaggerated claims',
] as const;

export const CONTENT_ARTICLE_STRUCTURE: readonly {
  id: ContentArticleSectionId;
  label: string;
  order: number;
}[] = [
  { id: 'seo_metadata', label: 'SEO Metadata', order: 1 },
  { id: 'hero', label: 'Hero', order: 2 },
  { id: 'quick_answer', label: 'Quick Answer', order: 3 },
  { id: 'table_of_contents', label: 'Table of Contents', order: 4 },
  { id: 'introduction', label: 'Introduction', order: 5 },
  { id: 'main_sections', label: 'Main Sections (H2/H3)', order: 6 },
  { id: 'key_takeaways', label: 'Key Takeaways', order: 7 },
  { id: 'faq', label: 'FAQ', order: 8 },
  { id: 'conclusion', label: 'Conclusion', order: 9 },
  { id: 'cta', label: 'CTA', order: 10 },
] as const;

export const CONTENT_CALLOUT_TYPES: readonly {
  id: ContentCalloutType;
  label: string;
}[] = [
  { id: 'pro_tip', label: 'Pro Tip' },
  { id: 'important', label: 'Important' },
  { id: 'warning', label: 'Warning' },
  { id: 'example', label: 'Example' },
] as const;

export const CONTENT_DESIGN_CTA_RULES = {
  maxBodyCtas: 1,
  maxFinalCtas: 1,
  tone: 'helpful_never_pushy',
} as const;

export const CONTENT_DESIGN_LINK_RULES = {
  relatedArticlesMin: 2,
  relatedArticlesMax: 5,
  relatedServicesMin: 0,
  relatedServicesMax: 2,
  requireCategoryLink: true,
  neverForceLinks: true,
} as const;

export const CONTENT_DESIGN_FAQ_RULES = {
  minQuestions: 8,
  maxQuestions: 15,
  schemaOnlyForVisible: true,
} as const;

export const CONTENT_DESIGN_IMAGE_RULES = {
  featuredRequired: true,
  altTextRequired: true,
  preferredWidth: 1600,
  preferredHeight: 900,
} as const;

/** Standard article package filenames — Documents 16.00 / 16.01. */
export const ARTICLE_PACKAGE_FILES = [
  '00_README.md',
  '01_Research.md',
  '02_Article_Brief.md',
  '03_Article.mdx',
  '04_SEO.json',
  '05_FAQ.json',
  '06_JSON-LD.json',
  '07_Image_Brief.md',
  '08_Internal_Links.md',
  '09_External_Sources.md',
  '10_Social_Posts.md',
  '11_Email_Newsletter.md',
  '12_Content_Checklist.md',
  '13_Editor_Notes.md',
  '14_Changelog.md',
] as const;

export type ArticlePackageFileName = (typeof ARTICLE_PACKAGE_FILES)[number];

export type ContentRepositoryPlatformFolder =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'marketing';

export type ContentRepositoryIndexEntry = {
  slug: string;
  platformFolder: ContentRepositoryPlatformFolder;
  relativePath: string;
  workingTitle: string;
  status: string;
  hasArticleBody: boolean;
  missingFiles: ArticlePackageFileName[];
};

export type ContentRepositoryIssue = {
  severity: 'blocker' | 'error' | 'warning' | 'recommendation';
  code: string;
  path?: string;
  slug?: string;
  message: string;
};
