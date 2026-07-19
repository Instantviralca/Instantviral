/**
 * Reading time helper — Document 15.01.
 */

import { learnConfig } from '@/config/learn';

export function estimateReadingTimeMinutes(
  text: string,
  wordsPerMinute: number = learnConfig.defaultReadingWordsPerMinute,
): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
