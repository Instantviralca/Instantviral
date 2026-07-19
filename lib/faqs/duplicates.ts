/**
 * FAQ duplicate detection — Document 14.04.
 * Reports only; never auto-deletes.
 */

import type { FaqDuplicateReport, FaqRecord } from '@/types/faq';

function normalizeQuestion(question: string): string {
  return question
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
}

function tokenSet(question: string): Set<string> {
  return new Set(
    normalizeQuestion(question)
      .split(' ')
      .filter((token) => token.length > 2),
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Detect duplicate IDs, exact/near-duplicate questions, conflicting answers,
 * and service-specific questions mirrored as general FAQs.
 */
export function detectDuplicateFaqs(faqs: FaqRecord[]): FaqDuplicateReport[] {
  const reports: FaqDuplicateReport[] = [];

  // Duplicate IDs
  const byId = new Map<string, FaqRecord[]>();
  for (const faq of faqs) {
    const list = byId.get(faq.id) ?? [];
    list.push(faq);
    byId.set(faq.id, list);
  }
  for (const [id, list] of byId) {
    if (list.length > 1) {
      reports.push({
        kind: 'duplicate_id',
        faqIds: list.map((faq) => faq.id),
        detail: `Duplicate FAQ id "${id}" appears ${list.length} times.`,
      });
    }
  }

  // Question groups
  const byNormalizedQuestion = new Map<string, FaqRecord[]>();
  for (const faq of faqs) {
    const key = normalizeQuestion(faq.question);
    const list = byNormalizedQuestion.get(key) ?? [];
    list.push(faq);
    byNormalizedQuestion.set(key, list);
  }

  for (const [normalized, list] of byNormalizedQuestion) {
    if (list.length < 2) continue;
    const uniqueIds = [...new Set(list.map((faq) => faq.id))];
    reports.push({
      kind: 'exact_question',
      faqIds: uniqueIds,
      detail: `Exact duplicate question "${normalized}" across ${uniqueIds.length} FAQ ids.`,
    });

    const answers = new Set(list.map((faq) => faq.answer.trim().toLowerCase()));
    if (answers.size > 1) {
      reports.push({
        kind: 'conflicting_answer',
        faqIds: uniqueIds,
        detail: `Conflicting answers for the same question "${normalized}".`,
      });
    }
  }

  // Near-duplicates (pairwise Jaccard on token sets)
  const nearSeen = new Set<string>();
  for (let i = 0; i < faqs.length; i += 1) {
    for (let j = i + 1; j < faqs.length; j += 1) {
      const a = faqs[i]!;
      const b = faqs[j]!;
      if (normalizeQuestion(a.question) === normalizeQuestion(b.question)) continue;

      const similarity = jaccardSimilarity(tokenSet(a.question), tokenSet(b.question));
      if (similarity < 0.72) continue;

      const pairKey = [a.id, b.id].sort().join('|');
      if (nearSeen.has(pairKey)) continue;
      nearSeen.add(pairKey);

      reports.push({
        kind: 'near_duplicate_question',
        faqIds: [a.id, b.id],
        detail: `Near-duplicate questions (${Math.round(similarity * 100)}% token overlap).`,
      });
    }
  }

  // Service-specific mirrored as general
  for (const serviceFaq of faqs) {
    if (serviceFaq.serviceSlugs.length === 0) continue;
    const serviceNorm = normalizeQuestion(serviceFaq.question);
    for (const generalFaq of faqs) {
      if (generalFaq.id === serviceFaq.id) continue;
      if (generalFaq.serviceSlugs.length > 0) continue;
      if (
        generalFaq.category !== 'general' &&
        generalFaq.category !== 'ordering' &&
        generalFaq.category !== 'delivery' &&
        generalFaq.category !== 'refunds' &&
        generalFaq.category !== 'tracking'
      ) {
        continue;
      }
      if (normalizeQuestion(generalFaq.question) !== serviceNorm) continue;
      reports.push({
        kind: 'service_as_general_duplicate',
        faqIds: [serviceFaq.id, generalFaq.id],
        detail: `Service FAQ "${serviceFaq.id}" duplicates general FAQ "${generalFaq.id}".`,
      });
    }
  }

  return reports;
}
