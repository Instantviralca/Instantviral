import { AdminEmptyState, AdminPageHeader } from '@/components/admin';

export default function Page() {
  return (
    <div>
      <AdminPageHeader title="Profile" description="Administrator profile." />
      <AdminEmptyState title="Profile module ready" description="Architecture placeholder." />
    </div>
  );
}
