import type { CtaProps } from '@/types/components';
import type { PackageBadgeId, PricingPackage } from '@/types/pricing';

export type PriceDisplayProps = {
  price: number;
  currency: PricingPackage['currency'];
  compareAtPrice?: number;
  className?: string;
};

export type DeliveryEstimateProps = {
  deliveryTime: string;
  className?: string;
};

export type PackageBadgeProps = {
  badge: PackageBadgeId;
  className?: string;
};

export type PackageFeaturesProps = {
  features: string[];
  className?: string;
};

export type PricingCTAProps = {
  cta: CtaProps;
  packageId: string;
  emphasized?: boolean;
  className?: string;
  onSelect?: (packageId: string) => void;
};

export type PricingCardModel = {
  package: PricingPackage;
  priceDisplay: string;
  compareAtDisplay?: string;
  badgeLabel?: string;
  primaryCta: CtaProps;
};

export type PricingCardProps = {
  model: PricingCardModel;
  onSelect?: (packageId: string) => void;
  className?: string;
  selected?: boolean;
};

export type PricingGridProps = {
  packages: PricingCardModel[];
  /** Package chip / tile selection (highlight only). */
  onSelect?: (packageId: string) => void;
  /** Primary CTA — open order details without scrolling. */
  onContinue?: (packageId: string) => void;
  className?: string;
  loading?: boolean;
  selectedPackageId?: string | null;
  platformId?: string;
  serviceName?: string;
  summaryBenefits?: readonly string[];
  infoPills?: readonly string[];
};

export type PricingPackagesSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  packages: PricingCardModel[];
  secondaryCta?: CtaProps;
  emptyMessage?: string;
  loading?: boolean;
  onSelectPackage?: (packageId: string) => void;
  onContinuePackage?: (packageId: string) => void;
  selectedPackageId?: string | null;
  platformId?: string;
  serviceName?: string;
  summaryBenefits?: readonly string[];
  infoPills?: readonly string[];
  className?: string;
};

/** @deprecated Alias for PricingCardModel during 09→10 migration */
export type PackageCardModel = PricingCardModel;
