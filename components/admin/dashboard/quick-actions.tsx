import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { DashboardQuickAction } from '@/types/admin-dashboard';

type QuickActionsProps = {
  actions: DashboardQuickAction[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section aria-label="Quick actions">
      <h2 className="mb-3 text-sm font-semibold">Quick actions</h2>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button key={action.id} asChild variant="outline" size="sm">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
