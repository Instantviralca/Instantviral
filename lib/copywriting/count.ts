import type { CopyCharRange, CopyValidationResult, CopyWordRange } from '@/types/copywriting';

/** Count words using whitespace tokenization. */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/** Count characters (UTF-16 code units, matching typical meta limits). */
export function countChars(text: string): number {
  return text.trim().length;
}

function rangeResult(
  rule: string,
  actual: number,
  range: CopyWordRange | CopyCharRange,
  unit: 'words' | 'characters',
): CopyValidationResult {
  const ok = actual >= range.min && actual <= range.max;
  return {
    ok,
    rule,
    actual,
    min: range.min,
    max: range.max,
    message: ok
      ? `${rule}: ${actual} ${unit} (within ${range.min}–${range.max}).`
      : `${rule}: ${actual} ${unit} is outside ${range.min}–${range.max}.`,
  };
}

export function validateWordCount(
  text: string,
  range: CopyWordRange,
  rule = 'word-count',
): CopyValidationResult {
  return rangeResult(rule, countWords(text), range, 'words');
}

export function validateCharCount(
  text: string,
  range: CopyCharRange,
  rule = 'char-count',
): CopyValidationResult {
  return rangeResult(rule, countChars(text), range, 'characters');
}

export function allValid(results: CopyValidationResult[]): boolean {
  return results.every((result) => result.ok);
}

export function summarizeValidation(results: CopyValidationResult[]): {
  ok: boolean;
  passed: number;
  failed: number;
  results: CopyValidationResult[];
} {
  const failed = results.filter((result) => !result.ok).length;
  return {
    ok: failed === 0,
    passed: results.length - failed,
    failed,
    results,
  };
}
