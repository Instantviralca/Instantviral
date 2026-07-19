import type { Stat } from '@/types/content';

/**
 * Shared stats pool. Pages reference by id.
 * Homepage trust metrics: Document 08.11 §9 (approved claims only).
 */
export const stats: Stat[] = [
  {
    id: 'stat-founded',
    label: 'Founded',
    value: '2018',
  },
  {
    id: 'stat-customers',
    label: 'Customers Served',
    value: '50,000+',
  },
  {
    id: 'stat-delivered',
    label: 'Services Delivered',
    value: 'Millions Delivered',
  },
  {
    id: 'stat-support',
    label: 'Customer Support',
    value: '24/7',
  },
];

export function getAllStats(): Stat[] {
  return stats;
}

export function getStatById(id: string): Stat | undefined {
  return stats.find((item) => item.id === id);
}

export function getStatsByIds(ids: string[]): Stat[] {
  return ids
    .map((id) => getStatById(id))
    .filter((item): item is Stat => Boolean(item));
}
