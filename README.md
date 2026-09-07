# Dotfiles

Personal, automated, and modular configuration designed exclusively for **macOS**. Built with a **Zero-Symlinks** philosophy using native platform features (`source`, `[include]`, and `$PATH`).

## Structure

| Path | Purpose |
| :--- | :--- |
| `bin/` | Personal CLI tools automatically added to `$PATH`. |
| `config/` | Static configuration files (Git configs, Oh-My-Posh themes, Rclone ignore). |
| `lib/utils.sh` | Shared shell helper functions (`info`, `warn`, `error`, `success`). |
| `modules/` | Modular runtime and app configurators (`git`, `macos`, `node`, `python`, `rclone`, `vscode`). |
| `shell/` | Modular Zsh configuration (`path.zsh`, `env.zsh`, `aliases.zsh`, `functions.zsh`, `macos_aliases.zsh`, `zshrc.zsh`). |
| `Brewfile` | Declarative Homebrew package list (CLI tools, casks, fonts). |
| `install.sh` | Unified entry point for fresh installs and updates. |

## Quick Install (New Machine)

To set up a fresh macOS machine from scratch:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/anthuanvasquez/dotfiles/master/install.sh)"
```

## Local Execution

If you have already cloned the repository:

```bash
./install.sh
```
*(or simply `./install`)*

## Installation Order

The `install.sh` orchestrator executes in a strict dependency order:

1. **Xcode Command Line Tools** — Prerequisite for Git, Homebrew, and compilers.
2. **Homebrew & Brewfile** — Installs package manager and bundles all tools/casks.
3. **Dotfiles & Shell (Zero Symlinks)** — Injects loader into `~/.zshrc` and configures Git `[include]`.
4. **macOS System Defaults** — Applies Finder, Dock, and keyboard settings.
5. **Runtime Modules** — Configures Node.js (`fnm`), Python (`pyenv`), Git LFS, and VS Code extensions.

## Zero-Symlinks Philosophy

Rather than maintaining symbolic links that can break or conflict:
- **Binaries (`bin/`)**: Reside in the repository and are directly added to `$PATH`.
- **Zsh**: `~/.zshrc` sources `$DOTFILES/shell/zshrc.zsh`.
- **Git**: `~/.gitconfig` uses native Git includes:
  ```ini
  [include]
      path = /path/to/dotfiles/config/git/.gitconfig
  ```
- **VS Code**: `settings.json` is synced cleanly to the User configuration folder.

## Personal Binaries (`bin/`)

The following scripts are automatically available in your terminal:

| Binary | Description | Commands / Arguments |
| :--- | :--- | :--- |
| `backup` | Rclone backup for `~/Sites` to cloud remote. | *N/A* |
| `dev` | Project orchestrator (Stripe/Shopify flow). | `up`, `down`, `db-reset`, `clean`, `test` |
| `docker-reset` | Deep clean of Docker containers, images, and volumes. | interactive `y/N` confirmation |
| `doctor` | Environment diagnostics for installed tools and runtimes. | *N/A* |
| `dot` | Quick access and management of dotfiles. | `cd`, `edit`, `reload`, `install` |
| `gen-ssh-key` | Generate modern SSH ed25519 keys with 1Password integration. | *N/A* |
| `git-cleanup` | Maintain Git hygiene by removing merged branches. | `branches`, `nuke` |
| `git-sync` | Sync local branches with origin and prune stale data. | *N/A* |
| `setup-project` | AI-Ready project scaffolding. | `<project-name>` |
| `update` | Global machine update (Dotfiles, Homebrew, Node packages). | *N/A* |

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
