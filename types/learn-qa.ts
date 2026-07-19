/**
 * Editorial QA System types — Document 15.09.
 */

export type QAStatus =
  | 'not_started'
  | 'in_progress'
  | 'passed'
  | 'failed'
  | 'requires_review';

export type QASeverity = 'blocker' | 'error' | 'warning' | 'recommendation';

export type QAArea =
  | 'content'
  | 'seo'
  | 'accessibility'
  | 'grammar'
  | 'links'
  | 'images'
  | 'metadata'
  | 'schema'
  | 'readability'
  | 'mobile';

export type QAIssue = {
  severity: QASeverity;
  area: QAArea;
  code: string;
  field?: string;
  message: string;
};

export type QAChecklistItem = {
  id: string;
  label: string;
  area: QAArea;
  required: boolean;
  passed: boolean;
  detail?: string;
};

export type QAAreaSummary = {
  area: QAArea;
  label: string;
  passed: boolean;
  issueCount: number;
  blockerCount: number;
  errorCount: number;
};

export type QAReport = {
  articleId: string;
  slug: string;
  status: QAStatus;
  generatedAt: string;
  /** True when there are no blocker or error findings. */
  passed: boolean;
  /** True when there are no blocker findings (publish gate). */
  canPublish: boolean;
  issues: QAIssue[];
  checklist: QAChecklistItem[];
  areas: QAAreaSummary[];
  counts: {
    blocker: number;
    error: number;
    warning: number;
    recommendation: number;
    total: number;
  };
};

export type RunArticleQAOptions = {
  /** Peer articles used for duplicate title/content detection. */
  peers?: readonly {
    id: string;
    slug: string;
    title: string;
    seo: { title: string; description: string };
  }[];
  /** ISO timestamp override for report generation. */
  generatedAt?: string;
};
