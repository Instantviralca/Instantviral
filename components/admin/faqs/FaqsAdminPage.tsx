'use client';

import { useMemo, useState } from 'react';

import { FAQAssignmentPanel } from '@/components/admin/faqs/FAQAssignmentPanel';
import { FAQEditor } from '@/components/admin/faqs/FAQEditor';
import { FAQFilters } from '@/components/admin/faqs/FAQFilters';
import { FAQPreview } from '@/components/admin/faqs/FAQPreview';
import { FAQSearchAdmin } from '@/components/admin/faqs/FAQSearchAdmin';
import { FAQsTable } from '@/components/admin/faqs/FAQsTable';
import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { Button } from '@/components/ui/button';
import { getAllFaqRecords } from '@/data/faqs';
import { faqAnalyticsEvents, trackFaqEvent } from '@/lib/analytics/faq-events';
import {
  approveFaq,
  hideFaq,
} from '@/lib/faqs/actions';
import { detectDuplicateFaqs } from '@/lib/faqs/duplicates';
import {
  filterAdminFaqs,
  toAdminFaqRow,
} from '@/lib/faqs/moderation';
import type { AdminFaqFilters } from '@/types/admin-faqs';
import type { FaqRecord } from '@/types/faq';

/**
 * Admin FAQ management shell — Document 14.04.
 * Local state only; backend CRUD is not implemented.
 */
export function FaqsAdminPage() {
  const [faqs, setFaqs] = useState<FaqRecord[]>(() => getAllFaqRecords());
  const [filters, setFilters] = useState<AdminFaqFilters>({
    status: 'all',
    category: 'all',
    featured: 'all',
    schemaEligible: 'all',
    sort: 'order',
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterAdminFaqs(faqs, filters),
    [faqs, filters],
  );
  const rows = useMemo(() => filtered.map(toAdminFaqRow), [filtered]);
  const selected = faqs.find((faq) => faq.id === selectedId) ?? null;
  const duplicates = useMemo(() => detectDuplicateFaqs(faqs), [faqs]);

  function updateFaq(next: FaqRecord) {
    setFaqs((current) =>
      current.map((faq) => (faq.id === next.id ? next : faq)),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <FAQSearchAdmin
          value={filters.query ?? ''}
          onChange={(query) => setFilters((current) => ({ ...current, query }))}
        />
        <Button type="button" className="min-h-11" disabled>
          Create FAQ (coming soon)
        </Button>
      </div>

      <FAQFilters filters={filters} onChange={setFilters} />

      {duplicates.length > 0 ? (
        <div
          role="status"
          className="rounded-lg border border-border bg-muted/20 p-4 text-sm"
        >
          <p className="font-medium">
            Duplicate warnings: {duplicates.length} report
            {duplicates.length === 1 ? '' : 's'}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {duplicates.slice(0, 5).map((report, index) => (
              <li key={`${report.kind}-${index}`}>
                [{report.kind}] {report.detail}
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 min-h-11"
            onClick={() =>
              trackFaqEvent(faqAnalyticsEvents.faq_admin_duplicate_warning, {
                warningKind: 'summary',
                resultCount: duplicates.length,
              })
            }
          >
            Log duplicate warning event
          </Button>
        </div>
      ) : null}

      <FAQsTable
        rows={rows}
        onSelect={setSelectedId}
        onApprove={(id) => {
          const faq = faqs.find((item) => item.id === id);
          if (!faq) return;
          updateFaq(approveFaq(faq));
          trackFaqEvent(faqAnalyticsEvents.faq_admin_approve, { faqId: id });
        }}
        onHide={(id) => {
          const faq = faqs.find((item) => item.id === id);
          if (!faq) return;
          updateFaq(hideFaq(faq));
          trackFaqEvent(faqAnalyticsEvents.faq_admin_hide, { faqId: id });
        }}
      />

      {selected ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <FAQEditor faq={selected} onChange={updateFaq} />
          <div className="space-y-4">
            <FAQAssignmentPanel faq={selected} onChange={updateFaq} />
            <FAQPreview faq={selected} />
          </div>
        </div>
      ) : (
        <AdminEmptyState
          title="Select an FAQ"
          description="Choose a row to edit assignments, preview placement, and review schema eligibility. Changes stay in this session until backend CRUD is connected."
        />
      )}
    </div>
  );
}
