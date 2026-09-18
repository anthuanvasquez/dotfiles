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
  1password.op-vscode
  aaron-bond.better-comments
  adpyke.codesnap
  alefragnani.bookmarks
  anthuanvasquez.vision-night
  astro-build.astro-vscode
  bradlc.vscode-tailwindcss
  christian-kohler.npm-intellisense
  christian-kohler.path-intellisense
  codeandstuff.package-json-upgrade
  dbaeumer.vscode-eslint
  eamodio.gitlens
  editorconfig.editorconfig
  enkia.tokyo-night
  esbenp.prettier-vscode
  esdete.tailwind-rainbow
  evondev.indent-rainbow-palettes
  formulahendry.auto-close-tag
  formulahendry.auto-rename-tag
  gruntfuggly.todo-tree
  igorsbitnev.error-gutters
  jeremyljackson.vs-docblock
  joshbolduc.commitlint
  kamikillerto.vscode-colorize
  mikestead.dotenv
  ms-vscode-remote.remote-containers
  ms-vscode-remote.remote-ssh
  ms-vscode-remote.remote-ssh-edit
  ms-vscode.live-server
  ms-vscode.remote-explorer
  oderwat.indent-rainbow
  ollama.ollama
  pkief.material-icon-theme
  prisma.prisma
  redhat.vscode-yaml
  usernamehw.errorlens
  vincaslt.highlight-matching-tag
  vivaxy.vscode-conventional-commits
  vue.volar
  wakatime.vscode-wakatime
  wayou.vscode-todo-highlight
  wix.vscode-import-cost
  wmaurer.change-case
  yoavbls.pretty-ts-errors
)

for extension in "${extensions[@]}"; do
  code --install-extension "$extension" --force || warn "Could not install extension: $extension (skipping)"
done

success "VS Code extensions installed successfully!"
