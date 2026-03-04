# Anva.Env - Project Context

## Overview
This repository (`Anva.Env`) is a comprehensive macOS setup guide and configuration repository for web development. It serves two main purposes:
1. Providing dotfiles and documentation to manually or semi-automatically configure a modern web development environment on macOS.
2. An interactive frontend web application (`/web`) that presents this guide in a user-friendly, responsive manner with features like progress tracking.

## Repository Structure

- **`README.md`**: The core documentation containing manual setup commands.
- **`Brewfile`**: The central manifest for all Homebrew tools, apps, and fonts.
- **`shell/`**: Shell aliases, functions, and Zsh environment configuration (`.zshrc`).
- **`git/`**: Git global settings (`.gitconfig`, `.gitignore_global`).
- **`rclone/`**: RClone exclusion patterns (`.rcloneignore`).
- **`vscode/`**: VS Code settings and extension installation scripts.
- **`antigravity/`**: Antigravity MCP configurations and AI skills.
- **`gemini/`**: Gemini AI settings.
- **`scripts/`**: Modular bash scripts that automate the installation steps:
  - `install.sh`: Master script that orchestrates the setup.
  - `brew.sh`: Installs Homebrew and dependencies from `Brewfile`.
  - `node.sh`: Sets up Node.js via FNM and enables Corepack.
  - `python.sh`: Sets up Python via pyenv.
  - `vscode.sh`: Installs recommended VS Code extensions.
  - `macos.sh`: Applies sensible macOS defaults.
  - `backup.sh`: RClone sync script for backing up Sites.
- **`docs/`**: Static build of the web application for deployment.
- **`web/`**: The frontend interactive web application (Vue 3, Vite, Tailwind).

## The Web Application (`/web`)

An interactive web interface built to display the setup instructions dynamically. It features copyable commands, a checklist for progress tracking, smooth navigation, and a responsive design.

### Tech Stack
- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v3) + `@tailwindcss/typography`
- **Language:** TypeScript
- **Package Manager:** `pnpm`

### Running the Web App Locally
```bash
cd web
pnpm install
pnpm run dev
```
Runs the development server usually accessible at `http://localhost:5173`.
