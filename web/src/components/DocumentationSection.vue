<script setup lang="ts">
const steps = [
  {
    title: 'New Machine Setup',
    description: 'Use the bootstrap script to initialize your environment in one command.',
    command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/anthuanvasquez/dotfiles/master/bootstrap)"',
    icon: '🚀'
  },
  {
    title: 'Project Scaffolding',
    description: 'Create a new AI-ready project with GitHub and Notion integration.',
    command: 'setup-project my-new-awesome-app',
    icon: '🏗️'
  },
  {
    title: 'Daily Workflow',
    description: 'Orchestrate your development environment with the dev command.',
    command: 'dev up',
    icon: '🏗️'
  },
  {
    title: 'Maintenance',
    description: 'Keep your environment healthy and up to date.',
    command: 'doctor && update',
    icon: '🔍'
  }
]
</script>

<template>
  <section class="py-12 border-t border-gray-200 dark:border-gray-800">
    <div class="mb-12">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Usage Guide
      </h2>
      <p class="text-lg text-gray-500 dark:text-gray-400">
        How to get the most out of your FAANG-style developer environment.
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div 
        v-for="step in steps" 
        :key="step.title"
        class="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col"
      >
        <div class="text-3xl mb-4 grayscale">{{ step.icon }}</div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{{ step.title }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
          {{ step.description }}
        </p>
        <div class="bg-gray-50 dark:bg-black p-3 rounded-lg border border-gray-100 dark:border-gray-800">
          <code class="text-xs font-mono text-blue-600 dark:text-blue-400 break-all">
            {{ step.command }}
          </code>
        </div>
      </div>
    </div>

    <!-- Architecture Explanation -->
    <div class="mt-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30">
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            FAANG Architecture Principles
          </h3>
          <ul class="space-y-3 text-blue-800/80 dark:text-blue-200/70 text-sm">
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Portability:</strong> Identical setup on macOS, Linux, and WSL.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Modularity:</strong> Shell logic is split into env, path, aliases, and functions.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600 dark:text-blue-400">•</span>
              <span><strong>Agent-First:</strong> Native support for AI orchestration via gemini.md.</span>
            </li>
          </ul>
        </div>
        <div class="hidden md:block w-px h-32 bg-blue-200 dark:bg-blue-800/50"></div>
        <div class="flex-1 text-center md:text-left">
          <p class="text-sm text-blue-800/60 dark:text-blue-200/50 mb-4 italic">
            "Your repository describes your entire environment, not just your shell."
          </p>
          <div class="flex items-center gap-3 justify-center md:justify-start">
            <div class="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
              AV
            </div>
            <div class="text-left">
              <div class="text-xs font-bold text-blue-900 dark:text-blue-100 uppercase tracking-widest">Anthuan Vasquez</div>
              <div class="text-[10px] text-blue-700 dark:text-blue-400 font-medium">Principal Engineer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
