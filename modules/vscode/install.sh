#!/usr/bin/env bash
# modules/vscode/install.sh: Install VS Code extensions.

set -euo pipefail

DOTFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# shellcheck source=lib/utils.sh
source "$DOTFILES_ROOT/lib/utils.sh"

info "Setting up VS Code extensions..."

VSCODE_USER_DIR="$HOME/Library/Application Support/Code/User"
if [[ -d "$VSCODE_USER_DIR" ]]; then
  info "Applying VS Code settings..."
  cp "$DOTFILES_ROOT/modules/vscode/settings.json" "$VSCODE_USER_DIR/settings.json"
  cp "$DOTFILES_ROOT/modules/vscode/mcp.json" "$VSCODE_USER_DIR/mcp.json"
  cp "$DOTFILES_ROOT/modules/vscode/keybindings.json" "$VSCODE_USER_DIR/keybindings.json"
fi

if ! command -v code &>/dev/null; then
  warn "'code' CLI tool not found. Skipping VS Code extension setup."
  exit 0
fi

extensions=(
  alefragnani.project-manager
  bradlc.vscode-tailwindcss
  christian-kohler.npm-intellisense
  christian-kohler.path-intellisense
  dbaeumer.vscode-eslint
  eamodio.gitlens
  editorconfig.editorconfig
  esbenp.prettier-vscode
  formulahendry.auto-rename-tag
  github.vscode-github-actions
  gruntfuggly.todo-tree
  mikestead.dotenv
  unifiedjs.vscode-mdx
  vscode-icons-team.vscode-icons
  yoavbls.pretty-ts-errors
  enkia.tokyo-night
  1password.op-vscode
  astro-build.astro-vscode
  joshbolduc.commitlint
  vivaxy.vscode-conventional-commits
  dsznajder.es7-react-js-snippets
  oderwat.indent-rainbow
  evondev.indent-rainbow-palettes
  codeandstuff.package-json-upgrade
  tal7aouy.rainbow-bracket
  vue.volar
  wakatime.vscode-wakatime
  redhat.vscode-yaml
)

for extension in "${extensions[@]}"; do
  code --install-extension "$extension" --force
done

success "VS Code extensions installed successfully!"
