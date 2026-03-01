# Anthuan.Env - Project Context

## Overview
This repository (`Anthuan.Env`) is a comprehensive macOS setup guide and configuration repository for web development. It serves two main purposes:
1. Providing dotfiles and documentation to manually or semi-automatically configure a modern web development environment on macOS.
2. An interactive frontend web application (`/web`) that presents this guide in a user-friendly, responsive manner with features like progress tracking.

## Repository Structure

- **`README.md`**: The core documentation containing manual setup commands (Homebrew, zsh, Node.js via FNM, Python via pyenv, GUI applications, and VS Code extensions).
- **`shell/.zshrc`, `shell/.aliases`, `shell/.functions`**: Shell configuration files (dotfiles) to customize the Zsh environment, aliases, and Git global settings.
- **`git/.gitconfig`**: Git global settings.
- **`editor/antigravity/mcp_config.json`, `editor/antigravity/skills.txt`**: AI Agents configurations.
- **`themes/`**: Contains terminal/editor themes (e.g., Tokyo Night).
- **`docs/`**: Additional documentation directories.
- **`web/`**: The frontend interactive web application for the setup guide.
- **`web/INSTALL.md`**: Instructions for installing and running the interactive web application locally.

## The Web Application (`/web`)

An interactive web interface built to display the setup instructions dynamically. It features copyable commands, a checklist for progress tracking, smooth navigation, and a responsive design out-of-the-box.

### Tech Stack
- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v3) + `@tailwindcss/typography` plugin for markdown/content styling
- **Language:** TypeScript
- **Router:** Vue Router (v4)
- **Package Manager:** `pnpm` (configured via corepack)

### Running the Web App Locally
```bash
cd web
pnpm install
pnpm run dev
```
Runs the development server usually accessible at `http://localhost:5173`.
