/**
 * Centralized Author registry — Document 15.03.
 * Only approved author profiles. Do not invent individual people or credentials.
 */

import { INSTANTVIRAL_EDITORIAL_TEAM } from '@/data/authors/instantviral-editorial-team';
import type { AuthorRecord } from '@/types/author';

/** Production registry — InstantViral Editorial Team. */
export const AUTHORS: readonly AuthorRecord[] = [INSTANTVIRAL_EDITORIAL_TEAM];
