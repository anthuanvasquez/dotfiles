# Anthuan.Env

## What is this?

A macOS setup guide and configuration repository for web development. This repository organizes dotfiles and provides automated scripts to bootstrap a new Mac quickly.

## Requirements

- Git: installed when you run `xcode-select --install` in terminal

## Quick Start

### 1. Download the repository

Clone this repository to your preferred location (e.g., `~/Sites/Anthuan.Env`).

```bash
mkdir -p ~/Sites
cd ~/Sites
git clone git@github.com:anthuanvasquez/Anthuan.Env.git
cd Anthuan.Env
```

### 2. Run the main installer

This script will run everything in sequence:
- Install Homebrew and formulas/casks from the `Brewfile` (including `stow` for dotfiles)
- Setup Node.js environment (FNM, Node 22 via `.node-version`, pnpm)
- Setup Python environment (pyenv, Python 3.12)
- Configure VS Code extensions

To run the installation:

```bash
./scripts/install.sh
```

**Note:** If you get a permission error, ensure the scripts are executable:
```bash
chmod +x scripts/*.sh
```

### 3. Apply Dotfiles with Stow

We use GNU Stow to manage symlinks cleanly from the root directory to your home directory (`~`).

```bash
cd ~/Sites/Anthuan.Env
stow shell
stow git
stow rclone
```

## Directory Structure

We keep things organized to make this scalable and maintainable:

- `shell/`: Zsh configurations, aliases, and functions.
- `git/`: Git global settings.
- `rclone/`: RClone exclusion patterns.
- `vscode/`: VS Code settings and extension installation scripts.
- `antigravity/`: Antigravity MCP configurations and AI skills.
- `gemini/`: Gemini AI settings.
- `scripts/`: Modular bash scripts that automate the installation steps.
- `Brewfile`: The central manifest for all Homebrew tools, apps, and fonts.
- `web/`: An interactive frontend application mapping out the setup visually.

## Manual Execution (Optional)

If you'd rather run steps individually, you can execute any script independently:

```bash
./scripts/brew.sh       # Installs brew and Brewfile dependencies
./scripts/node.sh       # Sets up FNM, Node, PNPM
./scripts/python.sh     # Sets up Pyenv and Python 3.12
./scripts/vscode.sh     # Installs VS Code extensions
./scripts/macos.sh      # Applies sensible macOS defaults
```

## The Web Application (`/web`)

An interactive web interface built to display the setup instructions dynamically. It features copyable commands, a checklist for progress tracking, smooth navigation, and a responsive design out-of-the-box.

For instructions on how to run it locally, read [web/INSTALL.md](web/INSTALL.md).
