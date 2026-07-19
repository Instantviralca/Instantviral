/**
 * Next.js instrumentation — validate production env at startup.
 * Throws at runtime when critical secrets are missing (safe fail).
 * Skips throw during `next build` so CI can compile before secrets are injected.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnv, isProductionBuildPhase } = await import('@/lib/config/env');
    const skipThrow =
      process.env.IV_SKIP_ENV_GUARD === '1' || isProductionBuildPhase();

    const result = validateEnv({ throwOnProductionErrors: !skipThrow });
    if (!result.ok) {
      const keys = result.issues.filter((i) => i.level === 'error').map((i) => i.key);
      console.error('[env] Missing required production configuration:', keys.join(', '));
    } else if (result.issues.length) {
      for (const issue of result.issues) {
        console.warn(`[env] ${issue.key}: ${issue.message}`);
      }
    }
  }
}
