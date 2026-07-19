import dynamic from 'next/dynamic';

export const PackagesFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/packages-final-cta-aside').then((m) => ({
    default: m.PackagesFinalCtaAside,
  })),
);
