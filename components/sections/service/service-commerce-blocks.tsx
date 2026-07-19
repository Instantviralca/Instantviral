'use client';

import { useEffect, useMemo, useState } from 'react';

import { PackageOrderDialog } from '@/components/commerce/order-configuration/package-order-dialog';
import { PackageSelector } from '@/components/commerce/pricing';
import { ServiceStickyOrderBar } from '@/components/commerce/pricing/service-sticky-order-bar';
import type { PricingCardModel } from '@/components/commerce/pricing/types';
import { getPlatformById } from '@/data/platforms';
import { getServicePageAnalytics } from '@/lib/analytics';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { findPackage } from '@/lib/pricing';
import { formatMoney } from '@/lib/pricing/format';
import type { CtaProps } from '@/types/components';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

type ServiceCommerceBlocksProps = {
  service: Service;
  pricing: {
    id?: string;
    title?: string;
    description?: string;
    packages: PricingCardModel[];
    secondaryCta?: CtaProps;
    emptyMessage?: string;
  };
  summaryBenefits?: readonly string[];
  infoPills?: readonly string[];
};

const USERNAME_ONLY_SLUGS = new Set(['buy-instagram-followers', 'buy-tiktok-followers']);

export function getDefaultSummaryBenefits(service: Service): string[] {
  const destination = USERNAME_ONLY_SLUGS.has(service.slug)
    ? 'Public Username Only'
    : 'Public URL Only';
  return [
    destination,
    'No Password Required',
    'Secure Checkout',
    '30-Day Money-Back Guarantee',
    'Order Tracking',
  ];
}

/**
 * Client boundary for package selection → order details dialog → cart.
 */
export function ServiceCommerceBlocks({
  service,
  pricing,
  summaryBenefits,
  infoPills,
}: ServiceCommerceBlocksProps) {
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const pricingSectionId = pricing.id ?? 'pricing-packages';

  useEffect(() => {
    const analytics = getServicePageAnalytics(service.slug);
    if (!analytics || pricing.packages.length === 0) return;
    analytics.viewPackages({ serviceSlug: service.slug });
    for (const model of pricing.packages) {
      analytics.packageImpression({
        packageId: model.package.id,
        serviceSlug: service.slug,
      });
    }
  }, [pricing.packages, service.slug]);

  const resolvedBenefits = useMemo(
    () => summaryBenefits ?? getDefaultSummaryBenefits(service),
    [summaryBenefits, service],
  );

  const handleSelect = (packageId: string) => {
    const pkg = findPackage(packageId) ?? null;
    setSelectedPackage(pkg);
    getServicePageAnalytics(service.slug)?.packageSelect({
      packageId,
      serviceSlug: service.slug,
    });
  };

  const handleContinue = (packageId: string) => {
    const pkg = findPackage(packageId) ?? null;
    setSelectedPackage(pkg);
    getServicePageAnalytics(service.slug)?.packageSelect({
      packageId,
      serviceSlug: service.slug,
    });
    emitLegacyAnalyticsEvent('order_details_open', {
      packageId,
      serviceSlug: service.slug,
    });
    setOrderOpen(true);
  };

  const stickyPrice =
    selectedPackage != null
      ? formatMoney(selectedPackage.price, selectedPackage.currency)
      : undefined;

  return (
    <>
      <PackageSelector
        {...pricing}
        id={pricingSectionId}
        platformId={service.platform}
        serviceName={`${getPlatformById(service.platform)?.name ?? ''} ${service.shortName}`.trim()}
        summaryBenefits={resolvedBenefits}
        infoPills={infoPills}
        onSelectPackage={handleSelect}
        onContinuePackage={handleContinue}
        selectedPackageId={selectedPackage?.id ?? null}
      />
      <ServiceStickyOrderBar
        pricingSectionId={pricingSectionId}
        ctaLabel="Order Now"
        priceLabel={stickyPrice}
        onOrder={() => {
          if (selectedPackage) {
            handleContinue(selectedPackage.id);
            return;
          }
          document
            .getElementById(pricingSectionId)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <PackageOrderDialog
        open={orderOpen}
        onOpenChange={setOrderOpen}
        service={service}
        selectedPackage={selectedPackage}
      />
      {/* No-JS / deep-link anchor — not part of the visual order flow */}
      <div id="order-configuration" className="sr-only" aria-hidden="true" />
    </>
  );
}
