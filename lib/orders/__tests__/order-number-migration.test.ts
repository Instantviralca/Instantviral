/**
 * Contract tests for drizzle/0008_order_number.sql + schema alignment.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const migration = readFileSync(
  path.join(ROOT, 'drizzle', '0008_order_number.sql'),
  'utf8',
);
const schema = readFileSync(path.join(ROOT, 'lib', 'db', 'schema.ts'), 'utf8');

describe('drizzle/0008_order_number.sql live-safety contract', () => {
  it('uses a Postgres sequence starting at 1000 with no wrap', () => {
    expect(migration).toContain('CREATE SEQUENCE IF NOT EXISTS orders_order_number_seq');
    expect(migration).toContain('START WITH 1000');
    expect(migration).toContain('MINVALUE 1000');
    expect(migration).toContain('NO MAXVALUE');
    expect(migration).toContain('nextval(');
    expect(migration).not.toMatch(/MAX\s*\(\s*order_number\s*\)\s*\+\s*1/i);
    expect(migration).not.toMatch(/Date\.now|Math\.random/);
  });

  it('sets permanent DEFAULT before NOT NULL so old app inserts remain safe', () => {
    const defaultIdx = migration.indexOf(
      "ALTER COLUMN order_number SET DEFAULT nextval('orders_order_number_seq')",
    );
    const notNullIdx = migration.indexOf('ALTER COLUMN order_number SET NOT NULL');
    expect(defaultIdx).toBeGreaterThan(-1);
    expect(notNullIdx).toBeGreaterThan(-1);
    expect(defaultIdx).toBeLessThan(notNullIdx);
  });

  it('backfills NULL rows by created_at ASC, id ASC without sequence rewind', () => {
    expect(migration).toContain('WHERE order_number IS NULL');
    expect(migration).toContain('ORDER BY created_at ASC, id ASC');
    // No executable setval — strip SQL comments first so prose cannot false-positive.
    const executable = migration
      .split('\n')
      .filter((line) => !line.trimStart().startsWith('--'))
      .join('\n');
    expect(executable).not.toMatch(/\bsetval\s*\(/i);
  });

  it('documents zero-row and N-row nextval outcomes via sequence start + nextval-only assignment', () => {
    // Zero rows: sequence untouched at START 1000 → first nextval = 1000.
    expect(migration).toContain('START WITH 1000');
    // N rows / concurrent: every assignment uses nextval on the same sequence.
    const nextvalAssigns = migration.match(/nextval\('orders_order_number_seq'\)/g) ?? [];
    expect(nextvalAssigns.length).toBeGreaterThanOrEqual(2); // DEFAULT + backfill
    expect(migration).toContain('SET order_number = nextval(');
  });

  it('enforces uniqueness and keeps sequence-based concurrency unique', () => {
    expect(migration).toContain(
      'CREATE UNIQUE INDEX IF NOT EXISTS orders_order_number_uidx ON orders (order_number)',
    );
    expect(migration).toMatch(/concurrency-safe \(nextval\)|same sequence/i);
  });
});

describe('Drizzle schema matches migration', () => {
  it('declares order_number notNull + nextval default + unique index', () => {
    expect(schema).toContain("integer('order_number')");
    expect(schema).toContain('.notNull()');
    expect(schema).toContain("nextval('orders_order_number_seq')");
    expect(schema).toContain("uniqueIndex('orders_order_number_uidx')");
  });
});
