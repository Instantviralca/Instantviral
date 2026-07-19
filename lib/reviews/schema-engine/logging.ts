/**
 * Internal schema-engine logging — Document 14.03.
 * Never expose these logs on the public website.
 */

import type { SchemaEngineLogEntry, SchemaEngineLogEvent } from '@/types/review-schema';

const schemaEngineLogs: SchemaEngineLogEntry[] = [];
const MAX_LOGS = 500;

export function logSchemaEngineEvent(
  event: SchemaEngineLogEvent,
  message: string,
  meta?: Omit<SchemaEngineLogEntry, 'id' | 'event' | 'message' | 'createdAt'>,
): SchemaEngineLogEntry {
  const entry: SchemaEngineLogEntry = {
    id: `schema_log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    event,
    message,
    reviewId: meta?.reviewId,
    entityKind: meta?.entityKind,
    meta: meta?.meta,
    createdAt: new Date().toISOString(),
  };

  schemaEngineLogs.push(entry);
  if (schemaEngineLogs.length > MAX_LOGS) {
    schemaEngineLogs.splice(0, schemaEngineLogs.length - MAX_LOGS);
  }

  return entry;
}

/** Internal-only access for admin/debug. */
export function getSchemaEngineLogs(): readonly SchemaEngineLogEntry[] {
  return schemaEngineLogs;
}

export function clearSchemaEngineLogs(): void {
  schemaEngineLogs.length = 0;
}
