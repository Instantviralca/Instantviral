import { AdminEmptyState, AdminPageHeader } from '@/components/admin';

export default function Page() {
  return (
    <div>
      <AdminPageHeader title="Settings" description="Site and admin settings." />
      <AdminEmptyState title="Settings module ready" description="Architecture placeholder." />
    </div>
  );
}
