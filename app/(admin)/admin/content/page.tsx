import { AdminEmptyState, AdminPageHeader } from '@/components/admin';

export default function Page() {
  return (
    <div>
      <AdminPageHeader title="Content" description="Marketing content management." />
      <AdminEmptyState title="Content module ready" description="Architecture placeholder." />
    </div>
  );
}
