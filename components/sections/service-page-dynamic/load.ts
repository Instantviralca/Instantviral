/**
 * Per-platform service illustration loaders.
 * ServicePageView imports only the active platform module — not every illustration.
 */

export async function loadServicePageVisuals(serviceSlug: string) {
  if (serviceSlug.startsWith('buy-facebook-')) {
    return import('@/components/sections/service-page-dynamic/facebook');
  }
  if (serviceSlug.startsWith('buy-tiktok-')) {
    return import('@/components/sections/service-page-dynamic/tiktok');
  }
  if (serviceSlug.startsWith('buy-youtube-')) {
    return import('@/components/sections/service-page-dynamic/youtube');
  }
  if (
    serviceSlug === 'buy-instagram-views' ||
    serviceSlug === 'buy-instagram-comments'
  ) {
    return import('@/components/sections/service-page-dynamic/instagram');
  }
  return {} as Record<string, never>;
}

export type ServicePageVisuals = Awaited<ReturnType<typeof loadServicePageVisuals>>;
