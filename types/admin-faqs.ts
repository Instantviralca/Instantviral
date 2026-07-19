/**
 * Admin FAQ list / editor models — Document 14.04.
 * Architecture only; backend CRUD is not implemented.
 */

import type {
  FAQCategoryId,
  FaqPageLocation,
  FaqRecord,
  FaqStatus,
} from '@/types/faq';
import type { PlatformId } from '@/types/platform';

export type AdminFaqRow = {
  id: string;
  question: string;
  category: FAQCategoryId;
  status: FaqStatus;
  featured: boolean;
  schemaEligible: boolean;
  platform?: PlatformId;
  serviceCount: number;
  updatedAt: string;
};

export type AdminFaqFilters = {
  query?: string;
  status?: FaqStatus | 'all';
  category?: FAQCategoryId | 'all';
  platform?: PlatformId | 'all';
  featured?: boolean | 'all';
  schemaEligible?: boolean | 'all';
  pageLocation?: FaqPageLocation | 'all';
  sort?: 'order' | 'newest' | 'oldest' | 'question';
};

export type AdminFaqEditorModel = {
  faq: FaqRecord;
};
