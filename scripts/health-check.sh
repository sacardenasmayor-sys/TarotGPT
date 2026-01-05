#!/bin/bash
set -e

echo "🏥 Starting Health Check..."

# 1. Environment Verification
echo "🔍 Checking Environment..."
echo "Node Version: $(node -v)"
echo "PNPM Version: $(pnpm -v)"

# 2. Dependencies
echo "📦 Verifying Dependencies..."
pnpm install

# 3. Linting
echo "🧹 Running Linter..."
pnpm run lint

# 4. Formatting
echo "✨ Checking Formatting..."
npx prettier --check "**/*.{ts,tsx,md}"

echo "✅ Health Check Passed!"
