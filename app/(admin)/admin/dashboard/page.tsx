import { DashboardPage } from '@/components/admin/dashboard';
import { getDashboardViewModel } from '@/lib/admin/dashboard';

export const dynamic = 'force-dynamic';

/** Alias route — Document 12.02 allows /admin or /admin/dashboard. */
export default async function AdminDashboardAliasRoute() {
  const data = await getDashboardViewModel();
  return <DashboardPage data={data} />;
}
