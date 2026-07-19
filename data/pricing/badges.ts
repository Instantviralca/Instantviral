import type { PackageBadgeDefinition, PackageBadgeId } from '@/types/pricing';

/** Configurable package badges — Document 10.01 / 10.02. */
export const packageBadges: PackageBadgeDefinition[] = [
  { id: 'most-popular', label: 'Most Popular' },
  { id: 'best-value', label: 'Best Value' },
  { id: 'recommended', label: 'Recommended' },
  { id: 'starter', label: 'Starter' },
  { id: 'premium', label: 'Premium' },
  { id: 'business', label: 'Business' },
  { id: 'agency', label: 'Agency' },
];

export function getBadgeLabel(id: PackageBadgeId): string {
  return packageBadges.find((b) => b.id === id)?.label ?? id;
}

export function getPackageBadges(): PackageBadgeDefinition[] {
  return packageBadges;
}
