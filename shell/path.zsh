# Global PATH configuration
# This file is sourced by .zshrc

# Personal binaries
export PATH="$HOME/bin:$HOME/.local/bin:$DOTFILES/bin:$PATH"

# Homebrew (macOS)
if [[ -d "/opt/homebrew/bin" ]]; then
    export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
elif [[ -d "/usr/local/bin" ]]; then
    export PATH="/usr/local/bin:/usr/local/sbin:$PATH"
fi

# Node.js (pnpm)
export PNPM_HOME="$HOME/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME/bin:"*) ;;
  *) export PATH="$PNPM_HOME/bin:$PATH" ;;
esac

# PYENV
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init - zsh)"

# Rust (cargo)
if [[ -d "$HOME/.cargo/bin" ]]; then
    export PATH="$HOME/.cargo/bin:$PATH"
fi

if [[ -d "/opt/homebrew/opt/rustup/bin" ]]; then
    export PATH="/opt/homebrew/opt/rustup/bin:$PATH"
fi

# LLVM & Others
if [[ -d "/opt/homebrew/opt/llvm/bin" ]]; then
    export PATH="/opt/homebrew/opt/llvm/bin:$PATH"
fi

# BUN
# bun completions
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Export unique paths only
typeset -U path PATH
