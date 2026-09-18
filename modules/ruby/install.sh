#!/usr/bin/env bash
# modules/ruby/install.sh: Ruby setup via rbenv.

set -euo pipefail

DOTFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck source=lib/utils.sh
source "$DOTFILES_ROOT/lib/utils.sh"

info "Setting up Ruby environment..."

if ! command -v rbenv &>/dev/null; then
  warn "rbenv not found. Skipping Ruby setup."
  exit 0
fi

export RBENV_ROOT="${RBENV_ROOT:-$HOME/.rbenv}"
export PATH="$RBENV_ROOT/bin:$PATH"
eval "$(rbenv init - zsh)"

RUBY_VERSION="3.3.8"

info "Installing Ruby ${RUBY_VERSION}..."
rbenv install -s "${RUBY_VERSION}"
rbenv global "${RUBY_VERSION}"

success "Ruby environment setup complete!"
