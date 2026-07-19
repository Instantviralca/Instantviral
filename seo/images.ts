import { site } from '@/config/site';

/** Descriptive alt text helper — never empty for meaningful images. */
export function buildImageAlt(input: {
  subject: string;
  context?: string;
}): string {
  const base = input.subject.trim();
  if (!input.context) return base || site.name;
  return `${base} — ${input.context.trim()}`;
}

/** Prefer SEO-friendly filenames (lowercase, hyphenated). */
export function seoImageFilename(parts: string[], extension = 'webp'): string {
  const slug = parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug || 'image'}.${extension}`;
}

/** Default OG image path until brand assets are provided. */
export function defaultOgImagePath(): string {
  return '/og-default.png';
}

export function serviceOgFilename(platform: string, service: string): string {
  return seoImageFilename(['og', 'buy', platform, service], 'png');
}
