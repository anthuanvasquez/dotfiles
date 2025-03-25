# Mac Dev Setup

A macOS setup guide for web development.

## Initial Setup

### Create `~/Sites` folder:

```bash
mkdir -p ~/Sites
```

### Install `xcode-select` (CLI tools):

```bash
xcode-select --install
```

### Install [Homebrew](https://brew.sh/):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Install Tools

Install [FNM](https://github.com/Schniz/fnm) (Fast Node Manager):

```bash
brew install fnm
```

Install [Node](https://nodejs.org/en)

```bash
fnm install 22.14.0
fnm use 22.14.0
```

Install [pnpm](https://pnpm.io/)

```bash
corepack enable pnpm
corepack use pnpm@latest --activate
```

GitHub

```bash
brew install gh
```


## Applications

Google Chrome

```bash
brew install --cask google-chrome
```

Microsoft Edge

```bash
brew install --cask microsoft-edge
```

1Password

```bash
brew install --cask warp
```

```bash
brew install --cask 1password
brew install --cask 1password-cli
```

OrbStack (Docker)

```bash
brew install orbstack
```

Install Bruno

```bash
brew install --cask bruno
```

## Visual Studio Code

```bash
brew install --cask visual-studio-code
```

Install extensions:

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
```

## Settings
