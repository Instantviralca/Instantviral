import { brand } from '@/config/brand';
import { copywriting } from '@/config/copywriting';
import { countWords, validateCharCount } from '@/lib/copywriting/count';
import type { CopyValidationResult } from '@/types/copywriting';
import type { CTAContent } from '@/types/copywriting';

function okResult(rule: string, message: string): CopyValidationResult {
  return { ok: true, rule, actual: 0, message };
}

function failResult(
  rule: string,
  message: string,
  actual = 0,
): CopyValidationResult {
  return { ok: false, rule, actual, message };
}

/** Ensure CTA label is on the Brand Strategy approved list. */
export function validateApprovedCtaLabel(
  cta: CTAContent | string,
): CopyValidationResult {
  const label = typeof cta === 'string' ? cta : cta.label;
  const approved = [
    brand.ctaLabels.primary,
    ...brand.ctaLabels.secondary,
  ];
  const ok = approved.includes(label);

  return ok
    ? okResult('approved-cta', `CTA "${label}" is approved.`)
    : failResult(
        'approved-cta',
        `CTA "${label}" is not in approved labels: ${approved.join(', ')}.`,
      );
}

/** Flag restricted vocabulary from Brand Strategy. */
export function validateRestrictedVocabulary(text: string): CopyValidationResult {
  const lower = text.toLowerCase();
  const hits = brand.vocabulary.restricted.filter((term) => {
    const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i');
    return pattern.test(lower);
  });

  if (hits.length === 0) {
    return okResult('restricted-vocabulary', 'No restricted terms found.');
  }

  return failResult(
    'restricted-vocabulary',
    `Restricted vocabulary found: ${hits.join(', ')}.`,
    hits.length,
  );
}

/** Prefer brand vocabulary presence as a soft recommendation (not a hard fail). */
export function recommendPreferredVocabulary(text: string): CopyValidationResult {
  const lower = text.toLowerCase();
  const used = brand.vocabulary.preferred.filter((term) =>
    lower.includes(term.toLowerCase()),
  );

  return {
    ok: true,
    rule: 'preferred-vocabulary',
    actual: used.length,
    message:
      used.length > 0
        ? `Preferred terms used: ${used.join(', ')}.`
        : 'No preferred brand terms detected — consider natural use of growth, audience, creators, quality, support, or secure.',
  };
}

/**
 * Heading tone checks:
 * - length via copywriting ranges
 * - no restricted vocabulary
 * - avoid hype markers from brand.voice.avoid patterns
 */
export function validateHeadingTone(
  heading: string,
  level: 1 | 2 | 3 = 2,
): CopyValidationResult[] {
  const range =
    level === 1
      ? copywriting.headings.h1
      : level === 3
        ? copywriting.headings.h3
        : copywriting.headings.h2;

  const results: CopyValidationResult[] = [
    validateCharCount(heading, range, `heading-tone-h${level}-length`),
    validateRestrictedVocabulary(heading),
  ];

  const hypePatterns = [
    /\bguaranteed\b/i,
    /\bmagic\b/i,
    /\bexplode\b/i,
    /\bhack\b/i,
    /!!!/,
    /\bMUST CLICK\b/i,
  ];

  const hypeHit = hypePatterns.find((pattern) => pattern.test(heading));
  results.push(
    hypeHit
      ? failResult(
          'heading-tone-hype',
          'Heading uses hype / clickbait patterns — Brand Voice requires calm, honest confidence.',
        )
      : okResult('heading-tone-hype', 'Heading tone is free of hype markers.'),
  );

  return results;
}

/**
 * Brand consistency checklist for a content blob:
 * restricted vocab, approved CTAs (if provided), reading-level recommendation.
 */
export function validateBrandConsistency(input: {
  text: string;
  ctaLabels?: string[];
}): CopyValidationResult[] {
  const results: CopyValidationResult[] = [
    validateRestrictedVocabulary(input.text),
    recommendPreferredVocabulary(input.text),
    recommendReadingLevel(input.text),
  ];

  for (const label of input.ctaLabels ?? []) {
    results.push(validateApprovedCtaLabel(label));
  }

  return results;
}

/**
 * Soft reading-level recommendation based on average words-per-sentence.
 * Target ~grade 8 (Brand + copywriting config) — advisory, not a hard gate.
 */
export function recommendReadingLevel(text: string): CopyValidationResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return failResult('reading-level', 'Empty text — cannot assess reading level.');
  }

  const sentences = trimmed.split(/[.!?]+/).filter((part) => part.trim().length > 0);
  const words = countWords(trimmed);
  const avgWordsPerSentence = sentences.length > 0 ? words / sentences.length : words;
  const target = brand.readingLevel.targetGrade;

  // Heuristic: grade ~8 often lands near 12–18 words/sentence for web copy.
  const softMin = 8;
  const softMax = 22;
  const ok = avgWordsPerSentence >= softMin && avgWordsPerSentence <= softMax;

  return {
    ok,
    rule: 'reading-level',
    actual: Math.round(avgWordsPerSentence * 10) / 10,
    min: softMin,
    max: softMax,
    message: ok
      ? `Average ${avgWordsPerSentence.toFixed(1)} words/sentence aligns with ~grade ${target} guidance.`
      : `Average ${avgWordsPerSentence.toFixed(1)} words/sentence may be outside plain-language target (grade ${target}). ${brand.readingLevel.description}`,
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
