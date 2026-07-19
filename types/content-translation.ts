/**
 * Translation-ready system types — Document 16.07.
 * One canonical source article; locales prepare multilingual publishing later.
 */

export type TranslationStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Reviewed'
  | 'Published'
  | 'Needs Update';

/** Fields that may receive locale-specific values. */
export type TranslatableFieldKey =
  | 'title'
  | 'metaTitle'
  | 'metaDescription'
  | 'slug'
  | 'articleBody'
  | 'faqs'
  | 'imageAltText'
  | 'socialPosts'
  | 'newsletterCopy';

export type TranslatableFields = Partial<
  Record<TranslatableFieldKey, string | string[]>
>;

export type LocaleTranslationEntry = {
  locale: string;
  status: TranslationStatus;
  fields: TranslatableFields;
  /** Fingerprint of the canonical source when this locale was last synced. */
  sourceFingerprint: string | null;
  updatedAt: string | null;
  notes?: string;
};

export type TranslationPackage = {
  slug: string;
  canonicalLocale: string;
  /** Hash of canonical English (or source) fields used for outdated detection. */
  sourceFingerprint: string;
  locales: Record<string, LocaleTranslationEntry>;
};

export type HreflangMapping = {
  locale: string;
  hreflang: string;
  /** Path template; `{slug}` is replaced with the localized slug when live. */
  pathTemplate: string;
  /** False until genuine alternate-language pages exist. */
  enabled: boolean;
};

export type LocaleMap = {
  slug: string;
  canonicalLocale: string;
  hreflang: HreflangMapping[];
  note: string;
};

export type LocaleIndexEntry = {
  slug: string;
  platformFolder: string;
  canonicalLocale: string;
  sourceFingerprint: string;
  locales: Array<{
    locale: string;
    status: TranslationStatus;
    outdated: boolean;
  }>;
};

export type LocaleIndex = {
  generatedAt: string;
  canonicalLocale: string;
  count: number;
  entries: LocaleIndexEntry[];
};

export type TranslationValidationIssue = {
  severity: 'blocker' | 'error' | 'warning' | 'recommendation';
  code: string;
  field?: string;
  locale?: string;
  message: string;
};
