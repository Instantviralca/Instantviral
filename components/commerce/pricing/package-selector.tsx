'use client';

import {
  PricingPackagesSection,
} from '@/components/commerce/pricing/pricing-packages-section';
import type { PricingPackagesSectionProps } from '@/components/commerce/pricing/types';

export type PackageSelectorProps = PricingPackagesSectionProps;

/**
 * Phase 18 VDS — PackageSelector.
 * Highest-priority conversion surface; wraps PricingPackagesSection.
 */
export function PackageSelector(props: PackageSelectorProps) {
  return <PricingPackagesSection {...props} />;
}
