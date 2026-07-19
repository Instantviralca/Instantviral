/**
 * Content analytics report file writers — Document 16.10 (Node-only).
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { generateMonthlyContentReport } from '@/lib/content-analytics/core';
import type { MonthlyContentReport } from '@/types/content-analytics';

export function writeContentAnalyticsReports(
  monthly: MonthlyContentReport,
  cwd: string = process.cwd(),
): { jsonPath: string; mdPath: string } {
  const dir = path.join(cwd, 'content', 'reports');
  mkdirSync(dir, { recursive: true });
  const jsonPath = path.join(dir, 'analytics-report.json');
  const mdPath = path.join(dir, 'monthly-content-report.md');
  writeFileSync(jsonPath, `${JSON.stringify(monthly.report, null, 2)}\n`, 'utf8');
  writeFileSync(mdPath, monthly.markdown, 'utf8');
  return { jsonPath, mdPath };
}

export function generateAndWriteMonthlyContentReport(options: {
  month: string;
  cwd?: string;
}): MonthlyContentReport {
  const monthly = generateMonthlyContentReport({ month: options.month });
  writeContentAnalyticsReports(monthly, options.cwd ?? process.cwd());
  return monthly;
}
