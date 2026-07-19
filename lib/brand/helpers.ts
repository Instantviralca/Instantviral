import { brand } from '@/config/brand';
import { routes } from '@/config/routes';
import type { CTAContent } from '@/types/copywriting';
import type {
  BrandCtaLabels,
  BrandPrincipleSet,
  BrandToneProfile,
  BrandVocabulary,
  BrandVoiceProfile,
  MessagingPillar,
  PageMessagingRules,
} from '@/types/brand';

/** Primary CTA label + default href from Brand Strategy. */
export function getPrimaryCTA(href: string = routes.home): CTAContent {
  return {
    label: brand.ctaLabels.primary,
    href,
  };
}

/**
 * Secondary CTA by index into brand.ctaLabels.secondary.
 * 0 Learn More · 1 Explore Services · 2 Contact Us
 */
export function getSecondaryCTA(
  index: 0 | 1 | 2 = 0,
  href?: string,
): CTAContent {
  const label = brand.ctaLabels.secondary[index];
  const defaultHref =
    index === 1
      ? '/buy-instagram-followers'
      : index === 2
        ? routes.contact
        : routes.learn;

  return {
    label,
    href: href ?? defaultHref,
  };
}

export function getBrandCtaLabels(): BrandCtaLabels {
  return brand.ctaLabels;
}

export function getBrandVoice(): BrandVoiceProfile {
  return brand.voice;
}

export function getBrandTone(): BrandToneProfile {
  return brand.tone;
}

export function getMessagingPillars(): readonly MessagingPillar[] {
  return brand.messagingPillars;
}

export function getVocabularyRules(): BrandVocabulary {
  return brand.vocabulary;
}

export function getTrustPrinciples(): BrandPrincipleSet {
  return brand.trustPrinciples;
}

export function getEEATGuidelines(): BrandPrincipleSet {
  return brand.eeatPrinciples;
}

export function getAISearchGuidelines(): BrandPrincipleSet {
  return brand.aiSearchPrinciples;
}

export function getHomepageMessagingRules(): PageMessagingRules {
  return brand.homepageMessaging;
}

export function getServicePageMessagingRules(): PageMessagingRules {
  return brand.servicePageMessaging;
}

export function getLearnHubMessagingRules(): PageMessagingRules {
  return brand.learnHubMessaging;
}

export function getBrandName(): string {
  return brand.name;
}

export function getBrandTagline(): string {
  return brand.tagline;
}

export function getBrandMission(): string {
  return brand.mission;
}

export function getBrandVision(): string {
  return brand.vision;
}

export function getBrandPositioning() {
  return brand.positioning;
}

export function getBrandPromise() {
  return brand.brandPromise;
}

export function getBrandValues() {
  return brand.values;
}

export function getBrandAudience() {
  return brand.audience;
}

export function getBrandReadingLevel() {
  return brand.readingLevel;
}
