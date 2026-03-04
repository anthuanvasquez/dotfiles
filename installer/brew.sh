#!/usr/bin/env bash

# This script installs Homebrew and runs `brew bundle` to install all
# packages listed in `Brewfile`.

echo "Starting Homebrew installation..."

# Install Homebrew if it isn't installed
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Run brew in current shell to proceed with the rest of the script
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    echo "Homebrew is already installed. Updating..."
    brew update
fi

echo "Installing dependencies from Brewfile..."
brew bundle --file="$(dirname "$0")/../Brewfile"

echo "Brew installation complete!"
