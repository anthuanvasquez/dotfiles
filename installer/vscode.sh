#!/usr/bin/env bash

echo "Setting up VS Code extensions..."

# Verify that code CLI is installed/accessible
if command -v code > /dev/null; then
    extensions=(
        alefragnani.project-manager
        bradlc.vscode-tailwindcss
        christian-kohler.npm-intellisense
        christian-kohler.path-intellisense
        dbaeumer.vscode-eslint
        eamodio.gitlens
        editorconfig.editorconfig
        esbenp.prettier-vscode
        formulahendry.auto-rename-tag
        github.vscode-github-actions
        gruntfuggly.todo-tree
        mikestead.dotenv
        unifiedjs.vscode-mdx
        vscode-icons-team.vscode-icons
        yoavbls.pretty-ts-errors
        enkia.tokyo-night
        1password.op-vscode
        astro-build.astro-vscode
        joshbolduc.commitlint
        vivaxy.vscode-conventional-commits
        dsznajder.es7-react-js-snippets
        oderwat.indent-rainbow
        evondev.indent-rainbow-palettes
        codeandstuff.package-json-upgrade
        tal7aouy.rainbow-bracket
        vue.volar
        wakatime.vscode-wakatime
        redhat.vscode-yaml
        google.geminicodeassist
        google.gemini-cli-vscode-ide-companion
    )

    for extension in "${extensions[@]}"; do
        code --install-extension "$extension" --force
    done
    echo "VS Code extensions installed successfully!"
else
    echo "Error: 'code' CLI tool not found. Please install VS Code and ensure it is in your PATH."
fi
