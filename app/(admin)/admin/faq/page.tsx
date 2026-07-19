import { AdminPageHeader } from '@/components/admin';
import { FaqsAdminPage } from '@/components/admin/faqs';

/** Admin FAQ management — Document 14.04 architecture (no backend CRUD). */
export default function Page() {
  return (
    <div>
      <AdminPageHeader
        title="FAQ"
        description="Shared FAQ data system — approve, assign, and preview. Persistence is not connected yet."
      />
      <FaqsAdminPage />
    </div>
  );
}
