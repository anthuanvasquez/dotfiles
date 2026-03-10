# Dotfiles

## What is this?

A macOS setup guide and configuration repository for web development. This repository organizes dotfiles and provides automated scripts to bootstrap a new Mac quickly.

## Requirements

- Git: installed when you run `xcode-select --install` in terminal

## Quick Start

### 1. Download the repository

Clone this repository to your preferred location (e.g., `~/Sites/dotfiles`).

```bash
mkdir -p ~/Sites
cd ~/Sites
git clone git@github.com:anthuanvasquez/dotfiles.git
cd dotfiles
```

### 2. Run the main installer

This script will run everything in sequence:
- Install Homebrew and formulas/casks from the `Brewfile` (including `stow` for dotfiles)
- Setup Node.js environment (FNM, Node 22 via `.node-version`, pnpm)
- Setup Python environment (pyenv, Python 3.12)
- Configure VS Code extensions

To run the installation:

```bash
./installer/install.sh
```

**Note:** If you get a permission error, ensure the scripts are executable:
```bash
chmod +x installer/*.sh
```


## Manual Execution (Optional)

If you'd rather run steps individually, you can execute any script independently:

```bash
./installer/brew.sh       # Installs brew and Brewfile dependencies
./installer/node.sh       # Sets up FNM, Node, PNPM
./installer/python.sh     # Sets up Pyenv and Python 3.12
./installer/vscode.sh     # Installs VS Code extensions
./installer/macos.sh      # Applies sensible macOS defaults
```

## The Web Application (`/web`)

An interactive web interface built to display the setup instructions dynamically. It features copyable commands, a checklist for progress tracking, smooth navigation, and a responsive design out-of-the-box.

For instructions on how to run it locally, read [web/INSTALL.md](web/INSTALL.md).
