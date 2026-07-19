/**
 * Editorial QA System — Document 15.09.
 */

export { runArticleQA, generateQAReport, qaStatusLabel } from '@/lib/learn/qa/run';
export { validateContent } from '@/lib/learn/qa/content';
export { validateSEO } from '@/lib/learn/qa/seo';
export { validateAccessibility } from '@/lib/learn/qa/accessibility';
export { validateLinks } from '@/lib/learn/qa/links';
export { validateImages } from '@/lib/learn/qa/images';
export {
  validateGrammar,
  validateReadability,
  validateMobile,
} from '@/lib/learn/qa/grammar-readability-mobile';
export { buildQAChecklist } from '@/lib/learn/qa/checklist';
export {
  findUnsupportedArticleClaims,
  findFakeStatisticSignals,
  findGrammarHeuristics,
} from '@/lib/learn/qa/claims';
export { collectArticlePlainText } from '@/lib/learn/qa/text';
