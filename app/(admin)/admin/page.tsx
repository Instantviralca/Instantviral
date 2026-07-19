import { DashboardPage } from '@/components/admin/dashboard';
import { getDashboardViewModel } from '@/lib/admin/dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardRoute() {
  const data = await getDashboardViewModel();
  return <DashboardPage data={data} />;
}
