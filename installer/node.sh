#!/usr/bin/env bash

echo "Setting up Node.js environment..."

# Evaluate fnm env so we can use it in the script
eval "$(fnm env)"

echo "Installing Node.js v22.14.0..."
fnm install 22.14.0
fnm use 22.14.0
fnm default 22.14.0

echo "Enabling Corepack for modern package managers..."
corepack enable pnpm
corepack use pnpm@latest --activate

echo "Node.js environment setup complete!"
