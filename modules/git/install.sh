#!/usr/bin/env bash
# modules/git/install.sh: Git LFS setup.
# Static config lives in config/git/.gitconfig (included via ~/.gitconfig).

set -euo pipefail

DOTFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck source=lib/utils.sh
source "$DOTFILES_ROOT/lib/utils.sh"

info "Configuring Git..."

if command -v git-lfs &>/dev/null; then
  info "Setting up Git LFS..."
  git lfs install
else
  warn "git-lfs not found. Skipping."
fi

if [[ -z "$(git config --global --get user.name 2>/dev/null || true)" ]]; then
  warn "git user.name is not set in ~/.gitconfig"
  warn "  Run: git config --global user.name 'Your Name'"
fi

if [[ -z "$(git config --global --get user.email 2>/dev/null || true)" ]]; then
  warn "git user.email is not set in ~/.gitconfig"
  warn "  Run: git config --global user.email 'your@email.com'"
fi

success "Git configuration complete."
