# Global Environment Variables
# This file is sourced by .zshrc after path.zsh

export EDITOR="code"
export VISUAL="code"
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"

# Tool-specific environment
export STARSHIP_CONFIG="$DOTFILES/home/.config/starship.toml"
export GPG_TTY=$(tty)

# Ensure Antigravity/AI tools have necessary context if needed
# export ANTIGRAVITY_SKILLS="$DOTFILES/modules/antigravity/skills.txt"
