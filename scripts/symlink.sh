#!/usr/bin/env bash

# This script creates symlinks from the local dotfiles directory to the user's home folder.
echo "Symlinking dotfiles to ~"

# Define variables
DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/dotfiles"

# Symlink Shell configs
ln -sf "$DOTFILES_DIR/shell/.zshrc" "$HOME/.zshrc"
ln -sf "$DOTFILES_DIR/shell/.aliases" "$HOME/.aliases"
ln -sf "$DOTFILES_DIR/shell/.functions" "$HOME/.functions"

echo "Symlinking complete!"
