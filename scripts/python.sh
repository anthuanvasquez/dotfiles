#!/usr/bin/env bash

echo "Setting up Python environment..."

# The pyenv binary is installed via brew, need to export its path for the script
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

echo "Installing Python 3.12..."
pyenv install -s 3.12
pyenv global 3.12

echo "Python environment setup complete!"
