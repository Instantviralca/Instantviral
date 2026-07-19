/**
 * Content asset generator types — Documents 16.02–16.06.
 */

export type ContentPublishState = 'draft' | 'scheduled' | 'published';

export type SeoAssets = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  canonicalUrl: string;
  robots: { index: boolean; follow: boolean };
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: 'article';
    image: string | null;
    imageWidth: number;
    imageHeight: number;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string | null;
  };
  primaryKeyword: string;
  secondaryKeywords: string[];
  readingTimeMinutes: number;
  category: string;
  tags: string[];
  publishState: ContentPublishState;
  sitemap: {
    eligible: boolean;
    lastModified: string | null;
    changefreq: 'weekly' | 'monthly';
    priority: number;
  };
};

export type GeneratedFaqItem = {
  id: string;
  question: string;
  answer: string;
  schemaEligible: boolean;
};

export type FaqAssets = {
  slug: string;
  items: GeneratedFaqItem[];
};

export type SchemaAssets = {
  slug: string;
  article: Record<string, unknown>;
  breadcrumb: Record<string, unknown>;
  faq: Record<string, unknown> | null;
};

export type ImageManifestAsset = {
  id: string;
  filename: string;
  role: 'featured' | 'og' | 'twitter' | 'diagram' | 'optional';
  width: number;
  height: number;
  format: 'webp' | 'svg';
  alt: string;
  caption?: string;
  required: boolean;
  status: 'planned' | 'generated' | 'missing';
  localPath: string;
};

export type ImageManifest = {
  slug: string;
  assets: ImageManifestAsset[];
  standards: {
    featured: { width: number; height: number };
    openGraph: { width: number; height: number };
    twitter: { width: number; height: number };
  };
};

export type SocialPlatform = 'facebook' | 'instagram' | 'x' | 'linkedin';

export type SocialPostVariant = {
  platform: SocialPlatform;
  kind: 'teaser' | 'standard' | 'long' | 'cta';
  text: string;
  characterCount: number;
  characterLimit: number;
  hashtags: string[];
  destinationUrl: string;
};

export type SocialCampaignAssets = {
  slug: string;
  destinationUrl: string;
  variants: SocialPostVariant[];
  hashtags: string[];
};

export type NewsletterCta = {
  label: string;
  url: string;
};

/** Newsletter-ready copy from a Learn article package — Document 16.06. */
export type NewsletterAssets = {
  slug: string;
  subjectLines: string[];
  previewText: string;
  intro: string;
  mainSummary: string;
  keyTakeaways: string[];
  primaryCta: NewsletterCta;
  secondaryCta: NewsletterCta | null;
  destinationUrl: string;
};

export type AssetValidationIssue = {
  severity: 'blocker' | 'error' | 'warning' | 'recommendation';
  code: string;
  field?: string;
  message: string;
};
