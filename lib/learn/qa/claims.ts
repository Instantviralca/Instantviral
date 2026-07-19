/**
 * Unsupported claims & fake-statistics heuristics — Document 15.09.
 * Detection only — never invents replacement copy.
 */

const CLAIM_PATTERNS: Array<{ pattern: RegExp; label: string; severity: 'blocker' | 'error' | 'warning' }> = [
  {
    pattern: /\bguaranteed\s+ranking\b/i,
    label: 'ranking guarantee',
    severity: 'blocker',
  },
  {
    pattern: /\bguaranteed\s+monetization\b/i,
    label: 'monetization guarantee',
    severity: 'blocker',
  },
  {
    pattern: /\bguaranteed\s+\d[\d,]*/i,
    label: 'guaranteed numeric outcome',
    severity: 'blocker',
  },
  {
    pattern: /\bwill\s+count\s+toward\s+monetization\b/i,
    label: 'monetization claim',
    severity: 'blocker',
  },
  {
    pattern: /\binstant\s+refund\s+guaranteed\b/i,
    label: 'unsupported refund claim',
    severity: 'error',
  },
  {
    pattern: /\b100%\s+(real|safe|organic|guaranteed)\b/i,
    label: 'absolute safety/quality claim',
    severity: 'error',
  },
  {
    pattern: /\b\d+\+?\s+(real\s+)?(followers|likes|views|subscribers)\s+(overnight|instantly|in\s+minutes)\b/i,
    label: 'overnight growth claim',
    severity: 'blocker',
  },
  {
    pattern: /\bfake\s+statistics?\b/i,
    label: 'explicit fake statistics reference',
    severity: 'warning',
  },
];

const FAKE_STAT_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  {
    pattern: /\bstudies\s+show\s+\d{2,3}%\b/i,
    label: 'unsourced percentage study claim',
  },
  {
    pattern: /\baccording\s+to\s+(research|experts)\b(?![^.]*\b(source|according to|cited)\b)/i,
    label: 'vague unsourced research claim',
  },
  {
    pattern: /\b\d{2,3}%\s+of\s+(users|creators|people)\b/i,
    label: 'unsourced population statistic',
  },
];

export type DetectedClaim = {
  label: string;
  severity: 'blocker' | 'error' | 'warning';
};

export function findUnsupportedArticleClaims(text: string): DetectedClaim[] {
  const found: DetectedClaim[] = [];
  for (const item of CLAIM_PATTERNS) {
    if (item.pattern.test(text)) {
      found.push({ label: item.label, severity: item.severity });
    }
  }
  return found;
}

export function findFakeStatisticSignals(text: string): string[] {
  return FAKE_STAT_PATTERNS.filter(({ pattern }) => pattern.test(text)).map(
    ({ label }) => label,
  );
}

/** Lightweight grammar / spelling heuristics (not a full spellchecker). */
export function findGrammarHeuristics(text: string): string[] {
  const hits: string[] = [];
  if (/\s{3,}/.test(text)) {
    hits.push('excessive consecutive spaces');
  }
  if (/[!]{3,}|\?{3,}/.test(text)) {
    hits.push('excessive punctuation');
  }
  if (/\b([A-Z]{6,})\b/.test(text) && text === text.toUpperCase() && text.length > 40) {
    hits.push('all-caps body copy');
  }
  if (/\bteh\b|\brecieve\b|\boccurence\b|\bseperate\b/i.test(text)) {
    hits.push('common misspelling detected');
  }
  if (/\.\s*[a-z]/.test(text)) {
    hits.push('possible missing capitalization after sentence end');
  }
  return hits;
}
