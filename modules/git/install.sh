#!/usr/bin/env bash
# modules/git/install.sh: Git LFS setup.
# Static config lives in home/.gitconfig (symlinked).

set -e

echo "📦 Configuring Git..."

if command -v git-lfs &>/dev/null; then
    echo "   Setting up Git LFS..."
    git lfs install
fi

echo "✅ Git configuration complete."
