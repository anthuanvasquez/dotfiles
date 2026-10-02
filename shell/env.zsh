# Global Environment Variables
# This file is sourced by .zshrc after path.zsh

export EDITOR="code"
export VISUAL="code"
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"

# Tool-specific environment
export GPG_TTY=$(tty)
export EZA_CONFIG_DIR="${DOTFILES:-$HOME/Sites/dotfiles}/config/eza"

# Load local environment variables if the file exists
[[ -f "$HOME/.env.local" ]] && source "$HOME/.env.local"
