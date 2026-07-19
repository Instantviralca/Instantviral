#!/usr/bin/env bash
# Scaffold all 50 planned Learn article packages under ./content
set -euo pipefail
cd "$(dirname "$0")/.."
export SCAFFOLD_CONTENT=1
export PATH="${HOME}/.local/node-v22.14.0-darwin-arm64/bin:${PATH}"
npx vitest run lib/content-repository/__tests__/scaffold-workspace.test.ts
