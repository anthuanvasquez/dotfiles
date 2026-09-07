#!/usr/bin/env bash
# install.sh: Unified entry point for dotfiles on macOS.
#
# Usage:
#   Remote: curl -fsSL https://raw.githubusercontent.com/anthuanvasquez/dotfiles/master/install.sh | bash
#   Local:  ./install.sh

set -euo pipefail

# ------------------------------------------------------------------------------
# 0. Remote Bootstrap Check
# ------------------------------------------------------------------------------
DOTFILES_DIR="${DOTFILES_DIR:-${DOTFILES:-$HOME/Sites/dotfiles}}"
REPO_URL="https://github.com/anthuanvasquez/dotfiles.git"

if [[ ! -d "$DOTFILES_DIR/.git" && ! -f "$(dirname "${BASH_SOURCE[0]:-$0}")/Brewfile" ]]; then
  echo "🚀 Bootstrapping dotfiles..."

  if [[ "$(uname -s)" != "Darwin" ]]; then
    echo "   [ERROR] This dotfiles setup is exclusively for macOS." >&2
    exit 1
  fi

  if ! xcode-select -p &>/dev/null; then
    echo "   [INFO] Installing Xcode Command Line Tools..."
    xcode-select --install
    echo "Please finish the Xcode Command Line Tools installation and rerun this script."
    exit 0
  fi

  echo "   [INFO] Cloning repository into $DOTFILES_DIR..."
  mkdir -p "$(dirname "$DOTFILES_DIR")"
  git clone "$REPO_URL" "$DOTFILES_DIR"
  cd "$DOTFILES_DIR"
  exec ./install.sh "$@"
fi

# ------------------------------------------------------------------------------
# Setup Root & Helpers
# ------------------------------------------------------------------------------
DOTFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DOTFILES_ROOT
export DOTFILES="$DOTFILES_ROOT"

# shellcheck source=lib/utils.sh
source "$DOTFILES_ROOT/lib/utils.sh"

echo "🎯 Dotfiles macOS Orchestrator"
echo "   Root: $DOTFILES_ROOT"

# ------------------------------------------------------------------------------
# 1. Platform Verification
# ------------------------------------------------------------------------------
if [[ "$(uname -s)" != "Darwin" ]]; then
  error "This repository is exclusively for macOS."
  exit 1
fi

# ------------------------------------------------------------------------------
# 2. Xcode Command Line Tools
# ------------------------------------------------------------------------------
if ! xcode-select -p &>/dev/null; then
  info "Installing Xcode Command Line Tools..."
  xcode-select --install
  warn "Please finish the Xcode Command Line Tools installation and rerun ./install.sh"
  exit 0
fi

# ------------------------------------------------------------------------------
# 3. Homebrew & Brewfile
# ------------------------------------------------------------------------------
info "Checking Homebrew..."
if ! command -v brew &>/dev/null; then
  info "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Ensure brew is loaded in current process PATH
if [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
elif [[ -x /usr/local/bin/brew ]]; then
  eval "$(/usr/local/bin/brew shellenv)"
fi

info "Installing dependencies from Brewfile..."
brew bundle --file="$DOTFILES_ROOT/Brewfile"

# ------------------------------------------------------------------------------
# 4. Dotfiles Configuration (Option A: Zero Symlinks)
# ------------------------------------------------------------------------------
info "Configuring environment (Zero Symlinks)..."

# 4.1 Shell: Ensure ~/.zshrc sources dotfiles shell config
ZSHRC="$HOME/.zshrc"
LOADER_TAG="# Dotfiles loader"

if [[ ! -f "$ZSHRC" ]] || ! grep -qF "$LOADER_TAG" "$ZSHRC" 2>/dev/null; then
  info "Adding dotfiles loader to $ZSHRC..."
  cat <<'EOF' >> "$ZSHRC"

# Dotfiles loader
export DOTFILES="${DOTFILES:-$HOME/Sites/dotfiles}"
if [[ -f "$DOTFILES/shell/zshrc.zsh" ]]; then
  source "$DOTFILES/shell/zshrc.zsh"
fi
EOF
  success "Configured $ZSHRC"
else
  info "$ZSHRC already configured."
fi

# 4.2 Git: Native include & global ignore
info "Configuring Git..."
git config --global include.path "$DOTFILES_ROOT/config/git/.gitconfig"
git config --global core.excludesfile "$DOTFILES_ROOT/config/git/.gitignore_global"
success "Git configured natively (include.path + core.excludesfile)."

# ------------------------------------------------------------------------------
# 5. Apply macOS System Defaults
# ------------------------------------------------------------------------------
info "Applying macOS defaults..."
bash "$DOTFILES_ROOT/modules/macos/install.sh"

# ------------------------------------------------------------------------------
# 6. Run Module Installers
# ------------------------------------------------------------------------------
info "Configuring modules..."
for module_script in "$DOTFILES_ROOT/modules"/*/install.sh; do
  [[ ! -f "$module_script" ]] && continue
  module_name="$(basename "$(dirname "$module_script")")"
  [[ "$module_name" == "macos" ]] && continue

  module_name_upper="$(echo "$module_name" | tr '[:lower:]' '[:upper:]')"
  info "[$module_name_upper] Running installer..."
  bash "$module_script"
done

# ------------------------------------------------------------------------------
# 7. Permissions Check
# ------------------------------------------------------------------------------
chmod +x "$DOTFILES_ROOT/install.sh" "$DOTFILES_ROOT/install" 2>/dev/null || true
chmod +x "$DOTFILES_ROOT/bin"/* 2>/dev/null || true
chmod +x "$DOTFILES_ROOT/modules"/*/install.sh 2>/dev/null || true

success "All done! Todo nítido. Open a new terminal or run 'dot reload' to enjoy your setup."
