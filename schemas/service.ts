import { absoluteUrl } from '@/seo/canonical';
import { site } from '@/config/site';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import type { Service } from '@/types/service';
import type { JsonLd } from '@/schemas/organization';

/** Product/Service schema — offers only when real package pricing exists. */
export function serviceSchema(service: Service): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.url),
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: absoluteUrl('/'),
    },
    areaServed: 'CA',
    serviceType: service.primaryKeyword,
    category: service.category,
  };
}

/** Product schema — offers only when real package pricing exists. No fabricated AggregateRating. */
export function productSchema(service: Service): JsonLd {
  const packages = getActivePackagesByServiceSlug(service.slug);
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.url),
    brand: {
      '@type': 'Brand',
      name: site.name,
    },
    category: service.platform,
  };

  if (packages.length > 0) {
    const prices = packages.map((pkg) => pkg.price).filter((n) => Number.isFinite(n) && n > 0);
    if (prices.length > 0) {
      const low = Math.min(...prices);
      const high = Math.max(...prices);
      const currency = packages[0]?.currency ?? 'USD';
      schema.offers = {
        '@type': 'AggregateOffer',
        url: absoluteUrl(service.url),
        priceCurrency: currency,
        lowPrice: (low / 100).toFixed(2),
        highPrice: (high / 100).toFixed(2),
        offerCount: prices.length,
        availability: 'https://schema.org/InStock',
      };
    }
  }

  return schema;
}
