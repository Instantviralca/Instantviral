import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  // Vite 8 / oxc: Next.js tsconfig uses jsx: "preserve"; tests need transform.
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'react',
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next'],
    testTimeout: 15_000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'server-only': path.resolve(__dirname, './lib/test-stubs/server-only.ts'),
    },
  },
});
