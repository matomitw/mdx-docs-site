#!/bin/bash
# Secret Scanner for TW MDX Docs Site
# Scans staged files for potential secrets before they go online.
# Used by: pre-commit hook, CI pipeline, and manual validation.

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

FOUND=0

# Patterns that indicate secrets or sensitive data
PATTERNS=(
  # API keys and tokens
  'AKIA[0-9A-Z]{16}'                          # AWS Access Key
  'sk-[a-zA-Z0-9]{20,}'                       # OpenAI / Stripe secret key
  'ghp_[a-zA-Z0-9]{36}'                       # GitHub personal access token
  'gho_[a-zA-Z0-9]{36}'                       # GitHub OAuth token
  'github_pat_[a-zA-Z0-9_]{82}'               # GitHub fine-grained PAT
  'xox[baprs]-[a-zA-Z0-9-]+'                  # Slack tokens
  'sk_live_[a-zA-Z0-9]+'                      # Stripe live key
  'rk_live_[a-zA-Z0-9]+'                      # Stripe restricted key
  'sq0[a-z]{3}-[a-zA-Z0-9_-]+'               # Square tokens

  # Generic patterns (quoted: password = "..." and unquoted: password 1235478d)
  'password\s*[:=]\s*["\x27][^"\x27]{4,}'     # password = "..." or password: "..."
  'password\s*[:=]?\s+[^"\x27\s][^\s]{3,}'    # password 1235478d (unquoted, no delimiter)
  '(^|\s)pass\s*[:=]?\s+[^"\x27\s][^\s]{3,}' # pass 478dlks (short alias, unquoted)
  'secret\s*[:=]\s*["\x27][^"\x27]{4,}'       # secret = "..."
  'secret\s*[:=]?\s+[^"\x27\s][^\s]{3,}'      # secret myvalue (unquoted)
  'api[_-]?key\s*[:=]\s*["\x27][^"\x27]{4,}'  # api_key = "..."
  'api[_-]?key\s*[:=]?\s+[^"\x27\s][^\s]{3,}' # api_key myvalue (unquoted)
  'token\s*[:=]\s*["\x27][^"\x27]{4,}'        # token = "..."
  'token\s*[:=]?\s+[^"\x27\s][^\s]{3,}'       # token myvalue (unquoted)
  'private[_-]?key'                            # private_key references
  'BEGIN (RSA|DSA|EC|OPENSSH) PRIVATE KEY'     # Private key blocks
  'jdbc:[a-z]+://[^\s]+'                       # Database connection strings

  # Common env patterns
  'DATABASE_URL\s*=\s*[^\s]+'
  'MONGO_URI\s*=\s*[^\s]+'
  'REDIS_URL\s*=\s*[^\s]+'
)

# Files to scan (all content files that could end up on the website)
SCAN_DIRS="pages/ components/ lib/ public/ styles/"
SCAN_EXTENSIONS="md mdx tsx jsx ts js json yaml yml"

echo -e "${YELLOW}Scanning for secrets in content files...${NC}"
echo ""

for pattern in "${PATTERNS[@]}"; do
  # Search across all relevant files
  results=$(grep -rniE "$pattern" $SCAN_DIRS 2>/dev/null | grep -v "node_modules" | grep -v ".next")

  if [ -n "$results" ]; then
    FOUND=1
    echo -e "${RED}POTENTIAL SECRET DETECTED:${NC}"
    echo -e "${RED}Pattern: $pattern${NC}"
    echo "$results" | head -5
    echo ""
  fi
done

# Also check for .env files that shouldn't be committed
if [ -f ".env" ] || [ -f ".env.local" ] || [ -f ".env.production" ]; then
  # Check if they're in .gitignore
  for envfile in .env .env.local .env.production .env.development; do
    if [ -f "$envfile" ]; then
      if ! grep -q "$envfile" .gitignore 2>/dev/null; then
        FOUND=1
        echo -e "${RED}WARNING: $envfile exists but is NOT in .gitignore${NC}"
        echo ""
      fi
    fi
  done
fi

if [ $FOUND -eq 0 ]; then
  echo -e "${GREEN}No secrets detected. All clear.${NC}"
  exit 0
else
  echo -e "${RED}========================================${NC}"
  echo -e "${RED}SECRETS FOUND - DO NOT PUSH${NC}"
  echo -e "${RED}Remove sensitive data before committing.${NC}"
  echo -e "${RED}========================================${NC}"
  exit 1
fi
