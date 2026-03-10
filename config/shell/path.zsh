# Global PATH configuration
# This file is sourced by .zshrc

# Reset PATH to system defaults + personal binaries
export PATH="$HOME/bin:$HOME/.local/bin:$DOTFILES/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Homebrew (macOS)
if [[ -d "/opt/homebrew/bin" ]]; then
    export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
fi

# Programming Languages
# Node.js (pnpm)
export PNPM_HOME="$HOME/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Python (pyenv)
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"

# Rust (cargo)
if [[ -d "$HOME/.cargo/bin" ]]; then
    export PATH="$HOME/.cargo/bin:$PATH"
fi

# LLVM & Others
if [[ -d "/opt/homebrew/opt/llvm/bin" ]]; then
    export PATH="/opt/homebrew/opt/llvm/bin:$PATH"
fi

# Antigravity (Local bin)
if [[ -d "$HOME/.antigravity/antigravity/bin" ]]; then
    export PATH="$HOME/.antigravity/antigravity/bin:$PATH"
fi

# Export unique paths only
typeset -U path
