#!/usr/bin/env bash

# This script creates symlinks from the local dotfiles directory to the user's home folder.
echo "Symlinking dotfiles to ~"

# Define variables
DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/dotfiles"

# Symlink Shell configs
ln -sf "$DOTFILES_DIR/shell/.zshrc" "$HOME/.zshrc"
ln -sf "$DOTFILES_DIR/shell/.aliases" "$HOME/.aliases"
ln -sf "$DOTFILES_DIR/shell/.functions" "$HOME/.functions"

# Symlink Git configs
ln -sf "$DOTFILES_DIR/git/.gitconfig" "$HOME/.gitconfig"

# Symlink VS Code settings
mkdir -p "$HOME/Library/Application Support/Code/User/"
ln -sf "$DOTFILES_DIR/editor/vscode/settings.json" "$HOME/Library/Application Support/Code/User/settings.json"
ln -sf "$DOTFILES_DIR/editor/vscode/keybindings.json" "$HOME/Library/Application Support/Code/User/keybindings.json"

# Symlink AI Agents configs
mkdir -p "$HOME/.gemini/antigravity/"
ln -sf "$DOTFILES_DIR/ai/antigravity/mcp_config.json" "$HOME/.gemini/antigravity/mcp_config.json"
ln -sf "$DOTFILES_DIR/ai/antigravity/skills.txt" "$HOME/.gemini/antigravity/skills.txt"

echo "Symlinking complete!"
