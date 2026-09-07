# Dotfiles zshrc entry point
# Loaded by ~/.zshrc via: source "$DOTFILES/shell/zshrc.zsh"

# Base path: resolve the dotfiles directory
export DOTFILES="${DOTFILES:-$(cd "$(dirname "${(%):-%N}")/.." && pwd)}"

# 1. Load Path Configuration (CRITICAL FIRST STEP)
source "$DOTFILES/shell/path.zsh"

# 2. Load Environment Variables
source "$DOTFILES/shell/env.zsh"

# 3. Load Aliases and Functions
source "$DOTFILES/shell/aliases.zsh"
source "$DOTFILES/shell/functions.zsh"
source "$DOTFILES/shell/macos_aliases.zsh"

# 4. Prompt / Theme (Oh-My-Posh)
if command -v oh-my-posh &>/dev/null; then
  POSH_THEME="${POSH_THEME:-$DOTFILES/config/oh-my-posh/themes/tokyonight_storm.omp.json}"
  if [[ -f "$POSH_THEME" ]]; then
    eval "$(oh-my-posh init zsh --config "$POSH_THEME")"
  else
    eval "$(oh-my-posh init zsh)"
  fi
fi

# 5. Tool Initializations (guarded — only init if installed)
command -v fnm &>/dev/null && eval "$(fnm env --use-on-cd --shell zsh)"
command -v zoxide &>/dev/null && eval "$(zoxide init zsh)"
command -v atuin &>/dev/null && eval "$(atuin init zsh)"
command -v pyenv &>/dev/null && eval "$(pyenv init - zsh)"
command -v fzf &>/dev/null && eval "$(fzf --zsh)"
