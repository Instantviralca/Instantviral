import { brand } from '@/config/brand';

export const APP_NAME = brand.name;

export const DEFAULT_LOCALE = 'en-CA';

export const SUPPORTED_LOCALES = ['en-CA'] as const;

/** Soft limits / architecture constants (not env secrets). */
export const CONSTANTS = {
  maxRelatedServices: 4,
  learnArticlesPerPage: 12,
} as const;
