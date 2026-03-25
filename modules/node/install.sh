#!/usr/bin/env bash

echo "Setting up Node.js environment..."

# Evaluate fnm env so we can use it in the script
eval "$(fnm env)"

echo "Installing Node.js v22.22.2..."
fnm install 22.22.2
fnm use 22.22.2
fnm default 22.22.2

echo "Enabling Corepack for modern package managers..."
corepack enable pnpm
corepack prepare pnpm@latest --activate

echo "Node.js environment setup complete!"
