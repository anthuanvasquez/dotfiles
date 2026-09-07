#!/usr/bin/env bash
# utils.sh: Shared helpers used across the dotfiles installer.

set -euo pipefail

# Resolve the dotfiles root from any script located under it.
export DOTFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Print helpers
info() { echo "   [INFO] $*"; }
success() { echo "   [OK] $*"; }
warn() { echo "   [WARN] $*" >&2; }
error() { echo "   [ERROR] $*" >&2; }

# Ensure a command exists.
require() {
  if ! command -v "$1" &>/dev/null; then
    error "$1 is required but not installed"
    return 1
  fi
}

# Ask for confirmation.
confirm() {
  local prompt="${1:-Are you sure?}"
  read -rp "$prompt [y/N] " answer
  [[ "$answer" =~ ^[Yy]$ ]]
}
