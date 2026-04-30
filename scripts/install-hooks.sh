#!/bin/bash
# Installs git hooks for the project
# Run once after cloning: bash scripts/install-hooks.sh

HOOK_DIR=".git/hooks"

echo "Installing git hooks..."

# Pre-commit hook
cat > "$HOOK_DIR/pre-commit" << 'EOF'
#!/bin/bash
# Pre-commit hook: scan for secrets before allowing commit

echo "Running secret scanner..."
bash scripts/scan-secrets.sh

if [ $? -ne 0 ]; then
  echo ""
  echo "Commit blocked: secrets detected in your files."
  echo "Remove the sensitive data and try again."
  exit 1
fi
EOF

chmod +x "$HOOK_DIR/pre-commit"

echo "Done. Pre-commit hook installed."
echo "Secrets will be scanned automatically before every commit."
