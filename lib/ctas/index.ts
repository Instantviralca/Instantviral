/**
 * Global CTA System — Document 14.06.
 */

export {
  getActiveCtas,
  getCtasByPage,
  getCtasByService,
  getCtasByPlatform,
  getCtasByVariant,
  getCtaById,
} from '@/lib/ctas/getters';

export { selectPageCtas, selectFinalCtaPair } from '@/lib/ctas/selection';
export { sanitizeCtaForPublic, sanitizeCtasForPublic } from '@/lib/ctas/sanitize';
export { dedupeCtas, sortCtas } from '@/lib/ctas/dedupe';
export {
  validateCtaRegistry,
  getBlockingCtaIssues,
} from '@/lib/ctas/validate';

export {
  getCtaRegistry,
  getCtaRecordById,
  validateCtaDestination,
  isValidCtaDestination,
} from '@/data/ctas';
