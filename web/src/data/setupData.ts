export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  commands: string[];
  icon: string;
  notes?: string[];
}

export interface VSCodeExtension {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

export const setupData: Tool[] = [
  // Core Orchestrators
  {
    id: 'bootstrap',
    name: 'Bootstrap Script',
    description: 'The one-command entry point to set up any new machine from scratch.',
    category: 'Core Orchestrators',
    url: 'https://github.com/anthuanvasquez/dotfiles',
    commands: [
      '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/anthuanvasquez/dotfiles/master/bootstrap)"'
    ],
    icon: '🚀',
    notes: [
      'Installs Xcode CLI tools',
      'Clones the repository',
      'Runs the main installer'
    ]
  },
  {
    id: 'install-script',
    name: 'Install Orchestrator',
    description: 'The brain that coordinates symlinks, packages, and OS settings.',
    category: 'Core Orchestrators',
    url: 'https://github.com/anthuanvasquez/dotfiles',
    commands: ['./install'],
    icon: '🎯',
    notes: [
      'Creates symlinks using link-dotfiles',
      'Runs brew bundle',
      'Applies macOS settings'
    ]
  },

  // Productivity Tools (bin/)
  {
    id: 'bin-dev',
    name: 'dev command',
    description: 'Universal project manager: install deps, start docker, run dev servers.',
    category: 'Productivity Tools',
    url: '',
    commands: ['dev up', 'dev down', 'dev clean'],
    icon: '🏗️'
  },
  {
    id: 'bin-dot',
    name: 'dot command',
    description: 'Quick access to manage your dotfiles: edit, reload, or navigate.',
    category: 'Productivity Tools',
    url: '',
    commands: ['dot edit', 'dot reload', 'dot cd'],
    icon: '⚙️'
  },
  {
    id: 'bin-doctor',
    name: 'doctor command',
    description: 'Diagnose your system health and environment tools.',
    category: 'Productivity Tools',
    url: '',
    commands: ['doctor'],
    icon: '🔍'
  },
  {
    id: 'bin-update',
    name: 'update command',
    description: 'Keep your dotfiles, brew, and global packages in sync.',
    category: 'Productivity Tools',
    url: '',
    commands: ['update'],
    icon: '🔄'
  },

  // AI & Automation
  {
    id: 'setup-project',
    name: 'setup-project',
    description: 'Elite project scaffolding with AI context and GitHub integration.',
    category: 'AI & Automation',
    url: '',
    commands: ['setup-project my-new-app'],
    icon: '🧠',
    notes: [
      'Creates local structure and GitHub repo',
      'Generates gemini.md for AI context',
      'Initializes git with AI-ready commit'
    ]
  },
  {
    id: 'ai-prompts',
    name: 'AI Knowledge Base',
    description: 'Centralized directory for agent prompts and workflows.',
    category: 'AI & Automation',
    url: '',
    commands: ['ls ai/prompts'],
    icon: '🤖'
  },

  // Development Tools
  {
    id: 'fnm',
    name: 'FNM (Fast Node Manager)',
    description: 'Ultra-fast node version manager written in Rust.',
    category: 'Development Tools',
    url: 'https://github.com/Schniz/fnm',
    commands: ['brew install fnm'],
    icon: '⚡'
  },
  {
    id: 'pnpm',
    name: 'PNPM',
    description: 'Fast, disk space efficient package manager.',
    category: 'Development Tools',
    url: 'https://pnpm.io/',
    commands: ['corepack enable pnpm'],
    icon: '📦'
  },
  {
    id: 'github-cli',
    name: 'GitHub CLI',
    description: 'Official CLI tool for GitHub management.',
    category: 'Development Tools',
    url: 'https://cli.github.com/',
    commands: ['brew install gh'],
    icon: '🐙'
  },
  {
    id: 'pyenv',
    name: 'pyenv',
    description: 'Simple Python version management.',
    category: 'Development Tools',
    url: 'https://github.com/pyenv/pyenv',
    commands: ['brew install pyenv'],
    icon: '🐍'
  }
];

export const vscodeExtensions: VSCodeExtension[] = [
  {
    id: 'alefragnani.project-manager',
    name: 'Project Manager',
    description: 'Project management',
    category: 'Essentials',
    icon: '📁'
  },
  {
    id: 'eamodio.gitlens',
    name: 'GitLens',
    description: 'Git supercharged',
    category: 'Essentials',
    icon: '🔗'
  },
  {
    id: 'dbaeumer.vscode-eslint',
    name: 'ESLint',
    description: 'Linter for JS/TS',
    category: 'Linters & Formatters',
    icon: '🔍'
  },
  {
    id: 'vue.volar',
    name: 'Vue - Official',
    description: 'Official Vue support',
    category: 'Frameworks',
    icon: '💚'
  },
  {
    id: 'supermaven.supermaven',
    name: 'Supermaven',
    description: 'AI coding assistant',
    category: 'AI & Productivity',
    icon: '🤖'
  }
];

export const extensionCategories = [
  'Essentials',
  'Linters & Formatters',
  'Frameworks',
  'AI & Productivity'
];

export const categories = [
  'Core Orchestrators',
  'Productivity Tools',
  'AI & Automation',
  'Development Tools'
];
