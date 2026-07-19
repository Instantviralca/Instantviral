import { AdminPageHeader } from '@/components/admin';
import {
  ArticleWorkflowTimeline,
  EditorialChecklist,
  EditorialStatusBadge,
  PublishingValidationSummary,
  ScheduledPublishNotice,
} from '@/components/learn/editorial';
import {
  EditorialWarnings,
  QAIssueList,
  QAStatusBadge,
  QASummaryCard,
  QAValidationChecklist,
} from '@/components/learn/qa';
import { getPublishingChecklist } from '@/lib/learn/editorial';
import { runArticleQA } from '@/lib/learn/qa';

/**
 * Learn editorial surface — Documents 15.08 / 15.09.
 * Workflow + QA architecture only (not a CMS). Registry stays empty until content is approved.
 */
export default function Page() {
  const emptyArticle = {
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    blocks: [],
    category: 'guides' as const,
    tags: [],
    authorId: '',
    readingTime: 0,
    publishedAt: '',
    updatedAt: '',
    showModifiedDate: false,
    seo: { title: '', description: '' },
    relatedServices: [],
    relatedArticles: [],
    featured: false,
    published: false,
    status: 'draft' as const,
  };
  const emptyChecklist = getPublishingChecklist(emptyArticle);
  const qaReport = runArticleQA(emptyArticle);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Learn editorial"
        description="Publishing workflow and Editorial QA for Learn Center articles. Content lives in the article registry — this surface documents status, validation, scheduling, and QA gates."
      />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Status model
        </h2>
        <div className="flex flex-wrap gap-2">
          {(
            [
              'draft',
              'in_review',
              'approved',
              'scheduled',
              'published',
              'updated',
              'archived',
            ] as const
          ).map((status) => (
            <EditorialStatusBadge key={status} status={status} />
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Lifecycle
          </h2>
          <ArticleWorkflowTimeline status="approved" />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Scheduling
          </h2>
          <ScheduledPublishNotice scheduledAt="2099-01-15T12:00:00.000Z" />
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Editorial QA
        </h2>
        <div className="flex flex-wrap gap-2">
          {(
            [
              'not_started',
              'in_progress',
              'passed',
              'failed',
              'requires_review',
            ] as const
          ).map((status) => (
            <QAStatusBadge key={status} status={status} />
          ))}
        </div>
        <QASummaryCard report={qaReport} />
        <EditorialWarnings issues={qaReport.issues} />
        <QAIssueList issues={qaReport.issues} minSeverity="error" />
        <QAValidationChecklist items={qaReport.checklist} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Publishing validation
        </h2>
        <PublishingValidationSummary
          ok={false}
          issues={[
            {
              severity: 'blocker',
              code: 'registry_empty',
              message:
                'No Learn articles in registry yet — add approved content before publishing.',
            },
          ]}
          checklist={emptyChecklist}
        />
        <EditorialChecklist items={emptyChecklist} />
      </section>
    </div>
  );
}
