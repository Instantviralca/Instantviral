import { AnalyticsPage } from '@/components/admin/analytics/analytics-page';
import { getFunnelAnalyticsViewModel } from '@/lib/admin/funnel-analytics';

type AdminAnalyticsRouteProps = {
  searchParams?: Promise<{ range?: string }>;
};

export default async function AdminAnalyticsRoute({ searchParams }: AdminAnalyticsRouteProps) {
  const params = searchParams ? await searchParams : {};
  const data = await getFunnelAnalyticsViewModel(params.range);
  return <AnalyticsPage data={data} />;
}
