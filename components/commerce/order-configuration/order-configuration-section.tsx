'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { AddToCartButton } from '@/components/commerce/order-configuration/add-to-cart-button';
import { DynamicOrderForm } from '@/components/commerce/order-configuration/dynamic-order-form';
import { OrderSummary } from '@/components/commerce/order-configuration/order-summary';
import { ValidationMessage } from '@/components/commerce/order-configuration/validation-message';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { getServiceOrderConfig } from '@/data/order-fields';
import { getServicePageAnalytics } from '@/lib/analytics';
import { useCart } from '@/lib/cart';
import {
  normalizeOrderConfigurationValues,
  validateOrderConfiguration,
} from '@/lib/order/validation';
import { cn } from '@/lib/utils';
import type { OrderConfigurationValues } from '@/types/order-fields';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

export type OrderConfigurationSectionProps = {
  service: Service;
  selectedPackage: PricingPackage | null;
  onBackToPackages?: () => void;
  className?: string;
};

export function OrderConfigurationSection({
  service,
  selectedPackage,
  onBackToPackages,
  className,
}: OrderConfigurationSectionProps) {
  const cart = useCart();
  const config = useMemo(
    () => getServiceOrderConfig(service.slug, selectedPackage),
    [service.slug, selectedPackage],
  );
  const [values, setValues] = useState<OrderConfigurationValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | undefined>();
  const [added, setAdded] = useState(false);

  // Drop values for fields that disappear when the package changes (e.g. custom comments).
  useEffect(() => {
    const allowed = new Set(config.fields.map((field) => field.name));
    setValues((prev) => {
      const next: OrderConfigurationValues = {};
      for (const [key, value] of Object.entries(prev)) {
        if (allowed.has(key)) next[key] = value;
      }
      return next;
    });
    setErrors({});
    setFormError(undefined);
    setAdded(false);
  }, [config.fields, selectedPackage?.id]);

  if (!selectedPackage) {
    return (
      <Section
        id="order-configuration"
        className={cn(className)}
        aria-label="Order configuration"
      >
        <Container size="xl">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <MutedText>Select a package above to continue with your order details.</MutedText>
          </div>
        </Container>
      </Section>
    );
  }

  const handleChange = (name: string, value: string | boolean | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setAdded(false);
  };

  const handleAddToCart = () => {
    const analytics = getServicePageAnalytics(service.slug);
    const normalized = normalizeOrderConfigurationValues(config.fields, values);
    const validationErrors = validateOrderConfiguration(config.fields, normalized);
    if (validationErrors.length > 0) {
      setErrors(
        Object.fromEntries(validationErrors.map((e) => [e.fieldId, e.message])),
      );
      setFormError('Please fix the highlighted fields.');
      return;
    }

    setErrors({});
    setFormError(undefined);
    setValues(normalized);

    analytics?.configurationSubmit({
      packageId: selectedPackage.id,
      serviceSlug: service.slug,
    });

    if (
      typeof normalized.customComments === 'string' &&
      normalized.customComments.length > 0
    ) {
      analytics?.customTextSubmit?.({
        packageId: selectedPackage.id,
        serviceSlug: service.slug,
      });
    }

    analytics?.checkoutStart({
      packageId: selectedPackage.id,
      serviceSlug: service.slug,
    });

    cart.addItem({
      packageId: selectedPackage.id,
      serviceId: service.id,
      serviceSlug: service.slug,
      serviceName: service.name,
      platformId: service.platform,
      packageTitle: selectedPackage.title,
      quantity: selectedPackage.quantity,
      quantityLabel: selectedPackage.quantityLabel,
      unitPrice: selectedPackage.price,
      currency: selectedPackage.currency,
      deliveryTime: selectedPackage.deliveryTime,
      configuration: normalized,
    });
    setAdded(true);
  };

  return (
    <Section
      id="order-configuration"
      className={cn(className)}
      aria-label="Order configuration"
      data-analytics="order-configuration"
    >
      <Container size="xl">
        <div className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2">
            Order details
          </Heading>
          <MutedText>
            Enter the information needed to fulfill {selectedPackage.quantityLabel}.
            {selectedPackage.commentType
              ? ` Comment type: ${selectedPackage.commentType}.`
              : ''}
          </MutedText>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4">
            <DynamicOrderForm
              fields={config.fields}
              values={values}
              errors={errors}
              onChange={handleChange}
            />
            <ValidationMessage message={formError} />
            <div className="flex flex-wrap gap-3">
              <AddToCartButton onClick={handleAddToCart} />
              {onBackToPackages ? (
                <Button type="button" variant="outline" size="lg" onClick={onBackToPackages}>
                  Back to Packages
                </Button>
              ) : null}
              {added ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={routes.cart}>View Cart</Link>
                </Button>
              ) : null}
            </div>
          </div>
          <OrderSummary pkg={selectedPackage} />
        </div>
      </Container>
    </Section>
  );
}
