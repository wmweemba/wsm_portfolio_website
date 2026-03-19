#!/usr/bin/env bash
# lighthouse-check.sh — pre-deploy Lighthouse audit for animated sites
#
# Usage:
#   bash .github/skills/animated-website/scripts/lighthouse-check.sh
#   bash .github/skills/animated-website/scripts/lighthouse-check.sh http://localhost:3000
#
# Requirements: Node.js >= 16 (npx handles Lighthouse install automatically)
# Exit codes: 0 = all thresholds met, 1 = one or more failed

set -euo pipefail

# ── Config — edit these to match your targets ────────────────────────────────
URL="${1:-http://localhost:3000}"
THRESHOLD_PERF=95
THRESHOLD_A11Y=90
THRESHOLD_BEST=90
THRESHOLD_SEO=90
# ─────────────────────────────────────────────────────────────────────────────

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Lighthouse Audit"
echo "  URL: $URL"
echo "  Thresholds: Perf ≥ $THRESHOLD_PERF | A11y ≥ $THRESHOLD_A11Y | Best ≥ $THRESHOLD_BEST | SEO ≥ $THRESHOLD_SEO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verify the target is reachable before wasting 30s on a Lighthouse run
if ! curl --silent --max-time 5 --output /dev/null "$URL"; then
  echo "  ERROR: Could not reach $URL"
  echo "  Make sure your dev server is running first (e.g. npm run dev)"
  exit 1
fi

echo "  Running Lighthouse (this takes ~30s)..."
echo ""

# npx lighthouse outputs JSON to stdout when --output=json is set.
# --quiet suppresses the progress spinner so only the JSON lands on stdout.
REPORT=$(npx --yes lighthouse@12 "$URL" \
  --output=json \
  --quiet \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  2>/dev/null)

# Parse scores (Lighthouse returns 0–1; multiply to get 0–100)
parse_score() {
  echo "$REPORT" | python3 -c \
    "import sys,json; d=json.load(sys.stdin); print(int(d['categories']['$1']['score']*100))"
}

PERF=$(parse_score "performance")
A11Y=$(parse_score "accessibility")
BEST=$(parse_score "best-practices")
SEO=$(parse_score "seo")

FAILED=0

check() {
  local label="$1" score="$2" threshold="$3"
  if [ "$score" -ge "$threshold" ]; then
    printf "  ✅  %-20s %d\n" "$label" "$score"
  else
    printf "  ❌  %-20s %d  (need ≥ %d)\n" "$label" "$score" "$threshold"
    FAILED=1
  fi
}

check "Performance"    "$PERF" "$THRESHOLD_PERF"
check "Accessibility"  "$A11Y" "$THRESHOLD_A11Y"
check "Best Practices" "$BEST" "$THRESHOLD_BEST"
check "SEO"            "$SEO"  "$THRESHOLD_SEO"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAILED" -eq 0 ]; then
  echo "  All scores meet thresholds — safe to deploy."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 0
else
  echo "  One or more scores below threshold. Fix before deploying."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi
