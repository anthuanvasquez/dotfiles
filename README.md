# Dotfiles 🚀

This repository contains my personal, automated, and modular configuration. It is designed for extreme portability and declarative configuration on macOS.

## 🏗️ Structure

- `home/`: Files that are symlinked directly to your `$HOME`.
- `config/`: Modular logic (shell, git, vscode).
- `packages/`: Declarative package lists (Brewfile, etc).
- `os/`: OS-specific system adjustments for macOS.
- `bin/`: Personal binaries and scripts added to your `$PATH`.
- `modules/`: Modular installation and configuration for specific tools (Node, Docker, etc).
- `scripts/`: Internal logic for repository management (linking, backups).

## 🚀 Quick Install

To set up a new machine from scratch:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/anthuanvasquez/dotfiles/master/setup)"
```

## 🛠️ Local Execution

If you have already cloned the repository:

```bash
./install
```

## 🧩 Design Principles

1. **Portability**: Works perfectly on macOS.
2. **Modularity**: Clear separation between environment, aliases, functions, and tools.
3. **Automation**: A single command to recreate the entire environment.
4. **Declarative**: The repository is the source of truth for the machine's state.

## 📜 Personal Binaries (`bin/`)

The following scripts are automatically added to your `$PATH` and are used for machine maintenance, project orchestration, and productivity.

| Binary | Description | Commands / Arguments |
| :--- | :--- | :--- |
| `dev` | Project orchestrator (Stripe/Shopify flow). | `up` (start env), `down` (stop env), `db-reset` (reset DB), `clean` (delete artifacts), `test` (run tests) |
| `docker-reset` | Deep clean of Docker containers, images, and volumes. | *N/A* (requires interactive `y/N` confirmation) |
| `doctor` | Environment diagnostics for installed tools and runtimes. | *N/A* |
| `dot` | Quick access and management of dotfiles. | `cd` (go to dir), `edit` (open in VS Code), `reload` (source .zshrc), `install` (run installer) |
| `git-cleanup` | Maintain Git hygiene by removing merged branches. | `branches` (delete merged), `nuke` (reset to upstream) |
| `git-sync` | Sync local branches with origin and prune stale data. | *N/A* |
| `setup-project` | AI-Ready project scaffolding with Notion/GitHub integration. | `<project-name>` (creates structure + AGENTS.md) |
| `update` | Global machine update (Dotfiles, Homebrew, Node packages). | *N/A* |

---
Maintained by [Anthuan Vasquez](https://github.com/anthuanvasquez)
