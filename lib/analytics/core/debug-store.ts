/**
 * Development-only analytics debug ring buffer — Document 14.09.
 */

import { isAnalyticsDebugEnabled } from '@/config/analytics';
import type { AnalyticsDebugRecord } from '@/types/analytics';

const MAX_RECORDS = 50;
const records: AnalyticsDebugRecord[] = [];
const listeners = new Set<(records: AnalyticsDebugRecord[]) => void>();

export function pushAnalyticsDebugRecord(record: AnalyticsDebugRecord): void {
  if (!isAnalyticsDebugEnabled()) return;
  records.unshift(record);
  if (records.length > MAX_RECORDS) records.length = MAX_RECORDS;
  listeners.forEach((listener) => listener([...records]));
}

export function getAnalyticsDebugRecords(): AnalyticsDebugRecord[] {
  if (!isAnalyticsDebugEnabled()) return [];
  return [...records];
}

export function subscribeAnalyticsDebug(
  listener: (records: AnalyticsDebugRecord[]) => void,
): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function clearAnalyticsDebugRecordsForTests(): void {
  records.length = 0;
}
