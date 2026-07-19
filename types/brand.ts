/**
 * Brand Strategy types (Document 07.5).
 * Strongly typed — no `any`. Consumed by config/brand.ts and lib/brand helpers.
 */

export type BrandValue = {
  id: string;
  name: string;
  description: string;
};

export type MessagingPillar = {
  id: string;
  question: string;
  intent: string;
};

export type BrandVocabulary = {
  preferred: readonly string[];
  restricted: readonly string[];
};

export type BrandCtaLabels = {
  primary: string;
  secondary: readonly string[];
};

export type BrandVoiceProfile = {
  attributes: readonly string[];
  avoid: readonly string[];
  summary: string;
};

export type BrandToneProfile = {
  attributes: readonly string[];
  summary: string;
};

export type AudienceSegment = {
  id: string;
  label: string;
};

export type SearchIntentType = 'commercial' | 'informational' | 'navigational';

export type PageMessagingRules = {
  id: string;
  goals: readonly string[];
  sectionOrder?: readonly string[];
  principles: readonly string[];
};

export type BrandPrincipleSet = {
  id: string;
  principles: readonly string[];
};

export type BrandPositioning = {
  summary: string;
  competeOn: readonly string[];
  doNotCompeteOn: readonly string[];
};

export type BrandPromise = {
  summary: string;
  commitments: readonly string[];
};

export type BrandReadingGuidance = {
  targetGrade: number;
  description: string;
};

export type BrandConfig = {
  name: string;
  legalName: string;
  tagline: string;
  mission: string;
  vision: string;
  values: readonly BrandValue[];
  positioning: BrandPositioning;
  brandPromise: BrandPromise;
  audience: {
    summary: string;
    segments: readonly AudienceSegment[];
    intents: readonly SearchIntentType[];
  };
  messagingPillars: readonly MessagingPillar[];
  voice: BrandVoiceProfile;
  tone: BrandToneProfile;
  vocabulary: BrandVocabulary;
  ctaLabels: BrandCtaLabels;
  trustPrinciples: BrandPrincipleSet;
  eeatPrinciples: BrandPrincipleSet;
  aiSearchPrinciples: BrandPrincipleSet;
  homepageMessaging: PageMessagingRules;
  servicePageMessaging: PageMessagingRules;
  learnHubMessaging: PageMessagingRules;
  readingLevel: BrandReadingGuidance;
  governance: {
    authoritativeDocument: string;
    consistencyRequired: boolean;
    note: string;
  };
};
