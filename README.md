# Mac Dev Setup

A macOS setup guide for web development.

## Initial Setup

### Directory Structure

Create `~/Sites` folder:

```bash
mkdir -p ~/Sites
```

### Dependencies

Installing xcode-select (CLI tools):

```bash
xcode-select --install
```

Installing [Homebrew](https://brew.sh/):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install [Warp](https://www.warp.dev/)

```bash
brew install --cask warp
```

Switch to Warp as default terminal.

## Install Tools

### Development Tools

Installing [FNM](https://github.com/Schniz/fnm) (Fast Node Manager):

```bash
brew install fnm
```

Installing [Node](https://nodejs.org/en):

```bash
fnm install 22.14.0
fnm use 22.14.0
```

Installing [PNPM](https://pnpm.io/):

```bash
corepack enable pnpm
corepack use pnpm@latest --activate
```

Installing [GitHub CLI](https://cli.github.com/):

```bash
brew install gh
```

Installing [pyenv](https://github.com/pyenv/pyenv):

```bash
brew install pyenv
```

Installing [Python](https://www.python.org/):

```bash
pyenv install 3.12
pyenv global 3.12
```

### Shell Environment

Installing [Zsh](https://www.zsh.org/):

```bash
brew install zsh
```

Installing [Oh My Zsh](https://ohmyz.sh/):

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Add pyenv to zsh:

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init - zsh)"' >> ~/.zshrc
```

## Applications

Install [Google Chrome](https://www.google.com/chrome/)

```bash
brew install --cask google-chrome
```

Install [Microsoft Edge](https://www.microsoft.com/en-us/edge)

```bash
brew install --cask microsoft-edge
```

Install [1Password](https://1password.com/)

```bash
brew install --cask 1password
brew install --cask 1password-cli
```

Install [OrbStack](https://www.orbstack.dev/)

```bash
brew install orbstack
```

Install [Bruno](https://www.usebruno.com/)

```bash
brew install --cask bruno
```

Install [Raycast](https://raycast.com/)

```bash
brew install --cask raycast
```

Install [Wakatime](https://wakatime.com/)

```bash
brew install --cask wakatime
```

Install [Ollama](https://ollama.com/)

```bash
brew install --cask ollama
```

1. Install `Qwen2.5-Coder` model: `ollama run qwen2.5-coder:1.5b`
2. Install `Deeseek-Coder` model: `ollama run deeseek-coder-v2:1.5b`

## Visual Studio [Code](https://code.visualstudio.com/)

```bash
brew install --cask visual-studio-code
```

1. Install extensions:

```bash
code --install-extension alefragnani.project-manager
code --install-extension bradlc.vscode-tailwindcss
code --install-extension christian-kohler.npm-intellisense
code --install-extension christian-kohler.path-intellisense
code --install-extension dbaeumer.vscode-eslint
code --install-extension eamodio.gitlens
code --install-extension editorconfig.editorconfig
code --install-extension esbenp.prettier-vscode
code --install-extension formulahendry.auto-rename-tag
code --install-extension github.vscode-github-actions
code --install-extension gruntfuggly.todo-tree
code --install-extension mikestead.dotenv
code --install-extension stylelint.vscode-stylelint
code --install-extension unifiedjs.vscode-mdx
code --install-extension vscode-icons-team.vscode-icons
code --install-extension yoavbls.pretty-ts-errors
code --install-extension enkia.tokyo-night
code --install-extension 1password.op-vscode
code --install-extension astro-build.astro-vscode
code --install-extension joshbolduc.commitlint
code --install-extension vivaxy.vscode-conventional-commits
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension oderwat.indent-rainbow
code --install-extension evondev.indent-rainbow-palettes
code --install-extension codeandstuff.package-json-upgrade
code --install-extension tal7aouy.rainbow-bracket
code --install-extension supermaven.supermaven
code --install-extension vue.volar
code --install-extension wakatime.vscode-wakatime
code --install-extension redhat.vscode-yaml
```

## Settings
