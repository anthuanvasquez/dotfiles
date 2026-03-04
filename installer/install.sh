#!/usr/bin/env bash

set -e

echo "======================================"
echo "    Mac Dev Setup Installation Tool    "
echo "======================================"

# Determine directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "1. Installing via Homebrew..."
bash "$DIR/brew.sh"

echo "2. Setting up Node.js..."
bash "$DIR/node.sh"

echo "3. Setting up Python..."
bash "$DIR/python.sh"

echo "4. Setting up VS Code..."
bash "$DIR/vscode.sh"

echo "======================================"
echo "    Installation Complete! 🚀         "
echo "======================================"
echo "Please restart your terminal."
