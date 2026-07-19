#!/usr/bin/env bash
# create-article <platform> <slug> [--force]
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="${HOME}/.local/node-v22.14.0-darwin-arm64/bin:${PATH}"

if [[ $# -lt 2 ]]; then
  echo "Usage: npm run create-article -- <platform> <slug> [--force]"
  echo "Platforms: instagram | tiktok | facebook | youtube | marketing"
  exit 1
fi

export CREATE_ARTICLE_PLATFORM="$1"
export CREATE_ARTICLE_SLUG="$2"
export CREATE_ARTICLE_FORCE="0"
if [[ "${3:-}" == "--force" ]]; then
  export CREATE_ARTICLE_FORCE="1"
fi

npx vitest run lib/content-generators/__tests__/create-article-cli.test.ts
