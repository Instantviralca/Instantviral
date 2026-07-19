/**
 * Content package QA pipeline types — Document 16.08.
 */

export type ContentQASeverity =
  | 'blocker'
  | 'error'
  | 'warning'
  | 'recommendation';

export type ContentQAStage =
  | 'structure'
  | 'seo'
  | 'content'
  | 'accessibility'
  | 'links'
  | 'schema'
  | 'editorial';

export type ContentQAIssue = {
  severity: ContentQASeverity;
  stage: ContentQAStage;
  code: string;
  field?: string;
  path?: string;
  message: string;
};

export type ContentQAStageSummary = {
  stage: ContentQAStage;
  label: string;
  passed: boolean;
  issueCount: number;
  blockerCount: number;
  errorCount: number;
};

export type ContentQAStatus =
  | 'passed'
  | 'failed'
  | 'requires_review'
  | 'blocked_from_publish';

export type ContentQAReport = {
  slug: string;
  packagePath: string;
  generatedAt: string;
  status: ContentQAStatus;
  publishEligible: boolean;
  stages: ContentQAStageSummary[];
  counts: {
    blocker: number;
    error: number;
    warning: number;
    recommendation: number;
    total: number;
  };
  issues: ContentQAIssue[];
};

export type RunContentQAOptions = {
  /** When true, write qa-report.json and qa-summary.md into the package. */
  writeReports?: boolean;
  /** Expected platform folder name for path checks. */
  platformFolder?: string;
};
