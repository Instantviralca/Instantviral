/**
 * Unsupported marketing-claim detection for metadata — Document 14.07.
 */

const UNSUPPORTED_CLAIM_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\bguaranteed\s+ranking\b/i, label: 'ranking guarantee' },
  { pattern: /\bguaranteed\s+monetization\b/i, label: 'monetization guarantee' },
  { pattern: /\bwill\s+count\s+toward\s+monetization\b/i, label: 'monetization claim' },
  { pattern: /\byoutube\s+partner\s+program\s+approval\b/i, label: 'YPP approval claim' },
  { pattern: /\binstant\s+refund\s+guaranteed\b/i, label: 'unsupported refund claim' },
  { pattern: /\ball\s+packages\s+include\s+refill\b/i, label: 'unconditional refill claim' },
];

export function findUnsupportedMetadataClaims(text: string): string[] {
  return UNSUPPORTED_CLAIM_PATTERNS.filter(({ pattern }) => pattern.test(text)).map(
    ({ label }) => label,
  );
}

export function youtubeMetadataIsSafe(text: string): boolean {
  const lower = text.toLowerCase();
  const monetizationHits = [
    'monetization guaranteed',
    'guaranteed monetization',
    'counts toward monetization',
    'partner program approval',
    'watch hour requirement',
  ];
  return !monetizationHits.some((phrase) => lower.includes(phrase));
}
