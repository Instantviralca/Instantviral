import { Features, type FeaturesProps } from '@/components/sections/service/features';

export type ServiceFeatureGridProps = FeaturesProps;

/**
 * Phase 18 VDS — ServiceFeatureGrid.
 * Thin alias over Features (Feature Card grid) for checklist naming.
 */
export function ServiceFeatureGrid(props: ServiceFeatureGridProps) {
  return <Features {...props} />;
}
