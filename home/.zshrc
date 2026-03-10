# FAANG-style .zshrc
# Minimal entry point. Logic lives in ~/dotfiles/config/shell/

# Base path
export DOTFILES="$HOME/dotfiles"

# 1. Load Path Configuration (CRITICAL FIRST STEP)
source "$DOTFILES/config/shell/path.zsh"

# 2. Load Environment Variables
source "$DOTFILES/config/shell/env.zsh"

# 3. Oh My Zsh Configuration
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
plugins=(git)
source "$ZSH/oh-my-zsh.sh"

# 4. Load Modules Logic
source "$DOTFILES/config/shell/aliases.zsh"
source "$DOTFILES/config/shell/functions.zsh"

# Load OS-specific configuration
if [[ "$OSTYPE" == "darwin"* ]]; then
  source "$DOTFILES/config/shell/macos_aliases.zsh"
fi

# 5. Tool Initializations
eval "$(starship init zsh)"
eval "$(fnm env --use-on-cd --shell zsh)"
eval "$(rbenv init -)"
eval "$(pyenv init - zsh)"

# Load Angular CLI autocompletion.
[[ -f "$HOME/.bash_completion" ]] && . "$HOME/.bash_completion"
source <(ng completion script)
