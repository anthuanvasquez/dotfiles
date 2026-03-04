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
  // Automated Setup
  {
    id: 'automated-install',
    name: 'Automated Installer',
    description: 'Instala y configura todo con un solo script',
    category: 'Automated Setup',
    url: 'https://github.com/anthuanvasquez/dotfiles',
    commands: [
      'git clone git@github.com:anthuanvasquez/dotfiles.git ~/Sites/dotfiles',
      'cd ~/Sites/dotfiles',
      './installer/install.sh'
    ],
    icon: '🚀'
  },

  // Dotfiles Configuration
  {
    id: 'dotfiles-stow',
    name: 'Dotfiles (GNU Stow)',
    description: 'Gestiona tus archivos de configuración con symlinks',
    category: 'Automated Setup',
    url: 'https://www.gnu.org/software/stow/',
    commands: [
      'cd ~/Sites/dotfiles',
      'stow _Shell',
      'stow _Git',
      'stow _RClone'
    ],
    icon: '🔗',
    notes: [
      'Asegúrate de tener GNU Stow instalado (`brew install stow`)',
      'Esto creará symlinks desde la carpeta del repo a tu home (~/)'
    ]
  },

  // Initial Setup
  {
    id: 'sites-folder',
    name: 'Sites Folder',
    description: 'Crear carpeta para proyectos de desarrollo',
    category: 'Initial Setup',
    url: '',
    commands: ['mkdir -p ~/Sites'],
    icon: '📁'
  },
  {
    id: 'xcode-select',
    name: 'Xcode CLI Tools',
    description: 'Herramientas de línea de comandos de Xcode',
    category: 'Initial Setup',
    url: 'https://developer.apple.com/xcode/',
    commands: ['xcode-select --install'],
    icon: '🛠️'
  },
  {
    id: 'homebrew',
    name: 'Homebrew',
    description: 'Gestor de paquetes para macOS',
    category: 'Initial Setup',
    url: 'https://brew.sh/',
    commands: ['/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'],
    icon: '🍺'
  },

  // Development Tools
  {
    id: 'fnm',
    name: 'FNM (Fast Node Manager)',
    description: 'Gestor rápido de versiones de Node.js',
    category: 'Development Tools',
    url: 'https://github.com/Schniz/fnm',
    commands: ['brew install fnm'],
    icon: '⚡'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Runtime de JavaScript',
    category: 'Development Tools',
    url: 'https://nodejs.org/',
    commands: [
      'fnm install 22.14.0',
      'fnm use 22.14.0'
    ],
    icon: '🟢'
  },
  {
    id: 'pnpm',
    name: 'PNPM',
    description: 'Gestor de paquetes rápido y eficiente',
    category: 'Development Tools',
    url: 'https://pnpm.io/',
    commands: [
      'corepack enable pnpm',
      'corepack use pnpm@latest --activate'
    ],
    icon: '📦'
  },
  {
    id: 'github-cli',
    name: 'GitHub CLI',
    description: 'Herramienta de línea de comandos para GitHub',
    category: 'Development Tools',
    url: 'https://cli.github.com/',
    commands: ['brew install gh'],
    icon: '🐙'
  },
  {
    id: 'pyenv',
    name: 'pyenv',
    description: 'Gestor de versiones de Python',
    category: 'Development Tools',
    url: 'https://github.com/pyenv/pyenv',
    commands: ['brew install pyenv'],
    icon: '🐍'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Lenguaje de programación Python',
    category: 'Development Tools',
    url: 'https://www.python.org/',
    commands: [
      'pyenv install 3.12',
      'pyenv global 3.12'
    ],
    icon: '🐍',
    notes: [
      'echo \'export PYENV_ROOT="$HOME/.pyenv"\' >> ~/.zshrc',
      'echo \'[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"\' >> ~/.zshrc',
      'echo \'eval "$(pyenv init - zsh)"\' >> ~/.zshrc'
    ]
  },
  {
    id: 'zoxide',
    name: 'Zoxide',
    description: 'Navegación de directorios más inteligente y rápida',
    category: 'Development Tools',
    url: 'https://github.com/ajeetdsouza/zoxide',
    commands: ['brew install zoxide'],
    icon: '🚀',
    notes: [
      'echo \'eval "$(zoxide init zsh)"\' >> ~/.zshrc'
    ]
  },

  // Applications
  {
    id: 'google-chrome',
    name: 'Google Chrome',
    description: 'Navegador web para desarrollo y testing',
    category: 'Applications',
    url: 'https://www.google.com/chrome/',
    commands: ['brew install --cask google-chrome'],
    icon: '🌐'
  },
  {
    id: 'microsoft-edge',
    name: 'Microsoft Edge',
    description: 'Navegador web alternativo para testing',
    category: 'Applications',
    url: 'https://www.microsoft.com/edge',
    commands: ['brew install --cask microsoft-edge'],
    icon: '🌊'
  },
  {
    id: '1password',
    name: '1Password',
    description: 'Gestor de contraseñas seguro',
    category: 'Applications',
    url: 'https://1password.com/',
    commands: [
      'brew install --cask 1password',
      'brew install --cask 1password-cli'
    ],
    icon: '🔐'
  },
  {
    id: 'warp',
    name: 'Warp',
    description: 'Terminal moderna con AI y colaboración',
    category: 'Applications',
    url: 'https://www.warp.dev/',
    commands: ['brew install --cask warp'],
    icon: '⚡'
  },
  {
    id: 'orbstack',
    name: 'OrbStack',
    description: 'Alternativa rápida a Docker Desktop',
    category: 'Applications',
    url: 'https://www.orbstack.dev/',
    commands: ['brew install orbstack'],
    icon: '🚀'
  },
  {
    id: 'bruno',
    name: 'Bruno',
    description: 'Cliente API alternativo a Postman',
    category: 'Applications',
    url: 'https://www.usebruno.com/',
    commands: ['brew install --cask bruno'],
    icon: '🔥'
  },
  {
    id: 'raycast',
    name: 'Raycast',
    description: 'Launcher y herramienta de productividad',
    category: 'Applications',
    url: 'https://raycast.com/',
    commands: ['brew install --cask raycast'],
    icon: '🔍'
  },
  {
    id: 'wakatime',
    name: 'Wakatime',
    description: 'Tracking de tiempo de programación',
    category: 'Applications',
    url: 'https://wakatime.com/',
    commands: ['brew install --cask wakatime'],
    icon: '⏱️'
  },
  {
    id: 'ollama',
    name: 'Ollama',
    description: 'Ejecuta modelos de LLM localmente',
    category: 'Applications',
    url: 'https://ollama.com/',
    commands: ['brew install --cask ollama'],
    icon: '🤖',
    notes: [
      'ollama run qwen2.5-coder:1.5b',
      'ollama run deeseek-coder-v2:1.5b'
    ]
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    description: 'Gestión y organización de ventanas en macOS',
    category: 'Applications',
    url: 'https://rectangleapp.com/',
    commands: ['brew install --cask rectangle'],
    icon: '🪟'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Chat y comunicación para comunidades',
    category: 'Applications',
    url: 'https://discord.com/',
    commands: ['brew install --cask discord'],
    icon: '💬'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Reproductor de música para acompañar el código',
    category: 'Applications',
    url: 'https://www.spotify.com/',
    commands: ['brew install --cask spotify'],
    icon: '🎵'
  },

  // Code Editor
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Editor de código principal para desarrollo',
    category: 'Code Editor',
    url: 'https://code.visualstudio.com/',
    commands: ['brew install --cask visual-studio-code'],
    icon: '💻'
  }
];

export const vscodeExtensions: VSCodeExtension[] = [
  {
    id: 'alefragnani.project-manager',
    name: 'Project Manager',
    description: 'Gestión de proyectos',
    category: 'Esenciales',
    icon: '📁'
  },
  {
    id: 'eamodio.gitlens',
    name: 'GitLens',
    description: 'Mejoras para Git',
    category: 'Esenciales',
    icon: '🔗'
  },
  {
    id: 'editorconfig.editorconfig',
    name: 'EditorConfig',
    description: 'Configuración de editor',
    category: 'Esenciales',
    icon: '⚙️'
  },
  {
    id: 'gruntfuggly.todo-tree',
    name: 'TODO Tree',
    description: 'Visualización de TODOs',
    category: 'Esenciales',
    icon: '📝'
  },
  {
    id: 'vscode-icons-team.vscode-icons',
    name: 'vscode-icons',
    description: 'Iconos para archivos',
    category: 'Esenciales',
    icon: '🎨'
  },
  {
    id: 'dbaeumer.vscode-eslint',
    name: 'ESLint',
    description: 'Linter de JavaScript/TypeScript',
    category: 'Linters & Formatters',
    icon: '🔍'
  },
  {
    id: 'esbenp.prettier-vscode',
    name: 'Prettier',
    description: 'Formateador de código',
    category: 'Linters & Formatters',
    icon: '✨'
  },
  {
    id: 'stylelint.vscode-stylelint',
    name: 'Stylelint',
    description: 'Linter de CSS',
    category: 'Linters & Formatters',
    icon: '🎨'
  },
  {
    id: 'yoavbls.pretty-ts-errors',
    name: 'Pretty TypeScript Errors',
    description: 'Errores de TS más legibles',
    category: 'Linters & Formatters',
    icon: '🚨'
  },
  {
    id: 'bradlc.vscode-tailwindcss',
    name: 'Tailwind CSS IntelliSense',
    description: 'Autocompletado para Tailwind',
    category: 'Frameworks',
    icon: '🌊'
  },
  {
    id: 'vue.volar',
    name: 'Vue - Official',
    description: 'Soporte oficial para Vue.js',
    category: 'Frameworks',
    icon: '💚'
  },
  {
    id: 'astro-build.astro-vscode',
    name: 'Astro',
    description: 'Soporte para Astro framework',
    category: 'Frameworks',
    icon: '🚀'
  },
  {
    id: 'dsznajder.es7-react-js-snippets',
    name: 'ES7+ React/Redux/React-Native snippets',
    description: 'Snippets para React',
    category: 'Frameworks',
    icon: '⚛️'
  },
  {
    id: 'unifiedjs.vscode-mdx',
    name: 'MDX',
    description: 'Soporte para archivos MDX',
    category: 'Frameworks',
    icon: '📄'
  },
  {
    id: 'redhat.vscode-yaml',
    name: 'YAML',
    description: 'Soporte para archivos YAML',
    category: 'Frameworks',
    icon: '📋'
  },
  {
    id: 'christian-kohler.npm-intellisense',
    name: 'npm IntelliSense',
    description: 'Autocompletado para imports npm',
    category: 'IntelliSense',
    icon: '📦'
  },
  {
    id: 'christian-kohler.path-intellisense',
    name: 'Path IntelliSense',
    description: 'Autocompletado de rutas',
    category: 'IntelliSense',
    icon: '📁'
  },
  {
    id: 'formulahendry.auto-rename-tag',
    name: 'Auto Rename Tag',
    description: 'Renombrado automático de tags HTML',
    category: 'IntelliSense',
    icon: '🏷️'
  },
  {
    id: 'github.vscode-github-actions',
    name: 'GitHub Actions',
    description: 'Soporte para GitHub Actions',
    category: 'Git & CI/CD',
    icon: '⚡'
  },
  {
    id: 'joshbolduc.commitlint',
    name: 'commitlint',
    description: 'Validación de commits',
    category: 'Git & CI/CD',
    icon: '✅'
  },
  {
    id: 'vivaxy.vscode-conventional-commits',
    name: 'Conventional Commits',
    description: 'Ayuda para commits convencionales',
    category: 'Git & CI/CD',
    icon: '📝'
  },
  {
    id: 'mikestead.dotenv',
    name: 'DotENV',
    description: 'Soporte para archivos .env',
    category: 'Utilidades',
    icon: '🔐'
  },
  {
    id: 'codeandstuff.package-json-upgrade',
    name: 'Package JSON Upgrade',
    description: 'Actualización de dependencias',
    category: 'Utilidades',
    icon: '⬆️'
  },
  {
    id: 'wakatime.vscode-wakatime',
    name: 'WakaTime',
    description: 'Tracking de tiempo',
    category: 'Utilidades',
    icon: '⏱️'
  },
  {
    id: '1password.op-vscode',
    name: '1Password',
    description: 'Integración con 1Password',
    category: 'Utilidades',
    icon: '🔑'
  },
  {
    id: 'enkia.tokyo-night',
    name: 'Tokyo Night',
    description: 'Tema oscuro popular',
    category: 'Tema & Apariencia',
    icon: '🌃'
  },
  {
    id: 'oderwat.indent-rainbow',
    name: 'Indent Rainbow',
    description: 'Colores para indentación',
    category: 'Tema & Apariencia',
    icon: '🌈'
  },
  {
    id: 'evondev.indent-rainbow-palettes',
    name: 'Indent Rainbow Palettes',
    description: 'Paletas para Indent Rainbow',
    category: 'Tema & Apariencia',
    icon: '🎨'
  },
  {
    id: 'tal7aouy.rainbow-bracket',
    name: 'Rainbow Bracket',
    description: 'Colores para brackets',
    category: 'Tema & Apariencia',
    icon: '🌈'
  },
  {
    id: 'supermaven.supermaven',
    name: 'Supermaven',
    description: 'AI coding assistant',
    category: 'AI & Productividad',
    icon: '🤖'
  }
];

export const extensionCategories = [
  'Esenciales',
  'Linters & Formatters',
  'Frameworks',
  'IntelliSense',
  'Git & CI/CD',
  'Utilidades',
  'Tema & Apariencia',
  'AI & Productividad'
];

export const categories = [
  'Automated Setup',
  'Initial Setup',
  'Development Tools',
  'Applications',
  'Code Editor'
];
