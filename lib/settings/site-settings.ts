/**
 * Site settings — admin-editable key/value store.
 * Postgres when DATABASE_URL is set; otherwise in-memory (+ optional env fallback).
 */

import { eq } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';

export const SETTING_PAYMENT_WEBSITE = 'payment_website' as const;
export const SETTING_MOLLIE_SHARED_SECRET = 'mollie_shared_secret' as const;
export const SETTING_MOLLIE_PRODUCT_NAME = 'mollie_product_name' as const;
export const SETTING_ADMIN_EMAIL = 'admin_notification_email' as const;

const DEFAULT_MOLLIE_SERVER_URL = 'https://carrycubes.com';
const DEFAULT_MOLLIE_PRODUCT_NAME = 'Cubes';

const memoryStore = new Map<string, string>();

function trimUrl(value: string | undefined | null): string {
  return (value ?? '').trim().replace(/\/$/, '');
}

function trimEmail(value: string | undefined | null): string {
  return (value ?? '').trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readFromDb(key: string): Promise<string | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(tables.siteSettings)
      .where(eq(tables.siteSettings.key, key))
      .limit(1);
    return row?.value ?? null;
  } catch {
    return null;
  }
}

async function writeToDb(key: string, value: string): Promise<void> {
  if (!isDatabaseConfigured()) {
    memoryStore.set(key, value);
    return;
  }
  const db = getDb();
  const now = new Date();
  await db
    .insert(tables.siteSettings)
    .values({ key, value, updatedAt: now })
    .onConflictDoUpdate({
      target: tables.siteSettings.key,
      set: { value, updatedAt: now },
    });
  memoryStore.set(key, value);
}

/** Payment collection website URL (Woo remote-payment client setting). */
export async function getPaymentWebsiteUrl(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_PAYMENT_WEBSITE);
  if (fromMemory) return trimUrl(fromMemory);

  const fromDb = await readFromDb(SETTING_PAYMENT_WEBSITE);
  if (fromDb) {
    const trimmed = trimUrl(fromDb);
    memoryStore.set(SETTING_PAYMENT_WEBSITE, trimmed);
    return trimmed;
  }

  const fromEnv = trimUrl(process.env.REMOTE_PAYMENT_WEBSITE_URL);
  if (fromEnv) {
    memoryStore.set(SETTING_PAYMENT_WEBSITE, fromEnv);
    return fromEnv;
  }

  return '';
}

export async function setPaymentWebsiteUrl(url: string): Promise<string> {
  const trimmed = trimUrl(url);
  if (!trimmed) {
    throw new Error('Payment website URL is required.');
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error('Payment website URL must be http(s).');
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('http')) throw error;
    throw new Error('Enter a valid payment website URL (without trailing slash).');
  }
  await writeToDb(SETTING_PAYMENT_WEBSITE, trimmed);
  return trimmed;
}

export async function isRemotePaymentConfigured(): Promise<boolean> {
  return Boolean(await getPaymentWebsiteUrl());
}

/** Mollie collector base URL (carrycubes.com by default). */
export async function getMollieRemoteServerUrl(): Promise<string> {
  const fromPaymentWebsite = trimUrl(await getPaymentWebsiteUrl());
  if (fromPaymentWebsite) return fromPaymentWebsite;

  const fromEnv = trimUrl(process.env.MOLLIE_REMOTE_SERVER_URL);
  if (fromEnv) return fromEnv;

  return DEFAULT_MOLLIE_SERVER_URL;
}

export async function getMollieSharedSecret(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_MOLLIE_SHARED_SECRET);
  if (fromMemory) return fromMemory;

  const fromDb = await readFromDb(SETTING_MOLLIE_SHARED_SECRET);
  if (fromDb) {
    memoryStore.set(SETTING_MOLLIE_SHARED_SECRET, fromDb);
    return fromDb;
  }

  return (process.env.MOLLIE_REMOTE_SHARED_SECRET ?? '').trim();
}

export async function setMollieSharedSecret(secret: string): Promise<string> {
  const trimmed = secret.trim();
  if (trimmed.length < 16) {
    throw new Error('Mollie shared secret must be at least 16 characters.');
  }
  await writeToDb(SETTING_MOLLIE_SHARED_SECRET, trimmed);
  return trimmed;
}

export async function getMollieProductName(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_MOLLIE_PRODUCT_NAME);
  if (fromMemory) return fromMemory;

  const fromDb = await readFromDb(SETTING_MOLLIE_PRODUCT_NAME);
  if (fromDb) {
    memoryStore.set(SETTING_MOLLIE_PRODUCT_NAME, fromDb);
    return fromDb;
  }

  const fromEnv = (process.env.MOLLIE_PRODUCT_NAME ?? '').trim();
  return fromEnv || DEFAULT_MOLLIE_PRODUCT_NAME;
}

export async function setMollieProductName(name: string): Promise<string> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error('Mollie product name is required.');
  }
  await writeToDb(SETTING_MOLLIE_PRODUCT_NAME, trimmed);
  return trimmed;
}

export async function isMollieRemoteConfigured(): Promise<boolean> {
  const secret = await getMollieSharedSecret();
  return Boolean(await getMollieRemoteServerUrl()) && secret.length >= 16;
}

/** Admin inbox for new orders + contact form (settings override → env). */
export async function getAdminNotificationEmail(): Promise<string> {
  const fromMemory = memoryStore.get(SETTING_ADMIN_EMAIL);
  if (fromMemory) return fromMemory;

  const fromDb = await readFromDb(SETTING_ADMIN_EMAIL);
  if (fromDb) {
    const trimmed = trimEmail(fromDb);
    if (trimmed) {
      memoryStore.set(SETTING_ADMIN_EMAIL, trimmed);
      return trimmed;
    }
  }

  const fromEnv =
    trimEmail(process.env.EMAIL_ADMIN_TO) ||
    trimEmail(process.env.EMAIL_FROM) ||
    trimEmail(process.env.RESEND_FROM_EMAIL);
  if (fromEnv) {
    memoryStore.set(SETTING_ADMIN_EMAIL, fromEnv);
    return fromEnv;
  }
  return '';
}

export async function setAdminNotificationEmail(email: string): Promise<string> {
  const trimmed = trimEmail(email);
  if (!trimmed) {
    throw new Error('Admin notification email is required.');
  }
  if (!isValidEmail(trimmed)) {
    throw new Error('Enter a valid admin notification email.');
  }
  await writeToDb(SETTING_ADMIN_EMAIL, trimmed);
  return trimmed;
}
