#!/usr/bin/env bash
# modules/espanso/install.sh: Sync Espanso configuration and match files.

set -euo pipefail

DOTFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck source=lib/utils.sh
source "$DOTFILES_ROOT/lib/utils.sh"

info "Setting up Espanso..."

if ! command -v espanso &>/dev/null; then
  warn "espanso not found. Skipping Espanso setup."
  exit 0
fi

ESPANSO_CONFIG_SRC="$DOTFILES_ROOT/config/espanso"
ESPANSO_USER_DIR="$HOME/Library/Application Support/espanso"

mkdir -p "$ESPANSO_USER_DIR/config" "$ESPANSO_USER_DIR/match"

info "Copying Espanso configs and match rules..."
cp -R "$ESPANSO_CONFIG_SRC/config/"* "$ESPANSO_USER_DIR/config/"
cp -R "$ESPANSO_CONFIG_SRC/match/"* "$ESPANSO_USER_DIR/match/"

if espanso status &>/dev/null; then
  info "Restarting Espanso service to apply changes..."
  espanso restart &>/dev/null || true
fi

success "Espanso configured."
