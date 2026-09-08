#!/usr/bin/env bash
# modules/1password/install.sh: 1Password CLI, SSH agent socket, and completion setup.

set -euo pipefail

DOTFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# shellcheck source=lib/utils.sh
source "$DOTFILES_ROOT/lib/utils.sh"

info "Configuring 1Password..."

if ! command -v op &>/dev/null; then
  warn "1Password CLI (op) not found. Skipping."
  exit 0
fi

# 1. Standard Unix socket symlink for Docker/containers
OP_SOCK_MACOS="$HOME/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"
OP_SOCK_STD="$HOME/.1password/agent.sock"

if [[ -d "$HOME/Library/Group Containers/2BUA8C4S2C.com.1password/t" ]]; then
  info "Linking standard SSH agent socket path (~/.1password/agent.sock)..."
  mkdir -p "$HOME/.1password"
  ln -sf "$OP_SOCK_MACOS" "$OP_SOCK_STD"
  success "Linked 1Password SSH agent socket."
fi

# 2. Configure SSH IdentityAgent in ~/.ssh/config
SSH_CONFIG="$HOME/.ssh/config"
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

if [[ ! -f "$SSH_CONFIG" ]] || ! grep -q "IdentityAgent.*2BUA8C4S2C.com.1password" "$SSH_CONFIG" 2>/dev/null; then
  info "Configuring 1Password SSH IdentityAgent in $SSH_CONFIG..."
  cat <<'EOF' >> "$SSH_CONFIG"

Host *
  IdentityAgent "~/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"
EOF
  chmod 600 "$SSH_CONFIG"
  success "Configured SSH IdentityAgent."
else
  info "SSH IdentityAgent already configured in $SSH_CONFIG."
fi

# 3. Static completion cache (avoids 6s overhead on shell startup)
OP_CONFIG_DIR="$HOME/.config/op"
mkdir -p "$OP_CONFIG_DIR"
if command -v op &>/dev/null; then
  info "Generating static shell completion for 1Password CLI..."
  op completion zsh > "$OP_CONFIG_DIR/completion.zsh" 2>/dev/null || warn "Could not generate 1Password CLI completions."
fi

# 4. Check desktop integration status
if ! op whoami &>/dev/null; then
  warn "1Password CLI is not yet connected to the desktop app."
  warn "Make sure these settings are enabled in 1Password Desktop:"
  warn "  1. Settings -> Developer -> 'Integrate with 1Password CLI'"
  warn "  2. Settings -> Developer -> 'Use the SSH agent'"
fi

success "1Password configuration complete."
