<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolCard from '@/components/ToolCard.vue'
import CodeEditorSection from '@/components/CodeEditorSection.vue'
import DocumentationSection from '@/components/DocumentationSection.vue'
import { setupData, categories } from '@/data/setupData'
import { useTheme } from '@/composables/useTheme'

// State for progress tracking
const completedTools = ref(new Set<string>())

// Theme composable
const { isDark, toggleTheme } = useTheme()

const totalTools = computed(() => setupData.length)
const completedCount = computed(() => completedTools.value.size)
const progressPercentage = computed(() =>
  totalTools.value > 0 ? Math.round((completedCount.value / totalTools.value) * 100) : 0
)

const getToolsByCategory = (category: string) => {
  return setupData.filter(tool => tool.category === category)
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'Core Orchestrators': '🎯',
    'Productivity Tools': '🏗️',
    'AI & Automation': '🧠',
    'Development Tools': '🛠️'
  }
  return icons[category] || '📦'
}

const getCategoryDescription = (category: string) => {
  const descriptions: Record<string, string> = {
    'Core Orchestrators': 'Primary scripts to bootstrap and install the environment',
    'Productivity Tools': 'CLI tools in bin/ to speed up your daily development',
    'AI & Automation': 'Knowledge base and agents orchestration tools',
    'Development Tools': 'Essential runtimes and package managers'
  }
  return descriptions[category] || 'Development environment tools'
}

const handleToolCompleted = (toolId: string, completed: boolean) => {
  if (completed) {
    completedTools.value.add(toolId)
  } else {
    completedTools.value.delete(toolId)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-200">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="text-2xl grayscale">⚡</div>
            <h1 class="text-lg font-semibold tracking-tight">FAANG Dotfiles</h1>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <a
              v-for="category in categories"
              :key="category"
              :href="`#${category.toLowerCase().replace(/\s+/g, '-')}`"
              class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {{ category.split(' ')[0] }}
            </a>
            <a href="#usage-guide" class="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors">Guide</a>
            
            <div class="w-px h-4 bg-gray-200 dark:bg-gray-800"></div>

            <button
              @click="toggleTheme"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            >
              <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-24 sm:py-32 overflow-hidden">
      <div class="max-w-5xl mx-auto text-center px-6 lg:px-8 relative">
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full -z-10"></div>
        
        <div class="mb-8">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Principal Engineer Stack v2.0
          </div>
        </div>

        <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 leading-[0.9]">
          The ultimate<br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">environment.</span>
        </h1>

        <p class="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          A declarative, modular, and AI-first configuration repository. 
          Built for portability across macOS, Linux, and WSL.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#usage-guide"
            class="w-full sm:w-auto bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
          >
            <span>Read the Guide</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>

          <a
            href="https://github.com/anthuanvasquez/dotfiles"
            target="_blank"
            class="w-full sm:w-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-2xl font-bold transition-all inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <main class="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
      
      <!-- Progress and Stats -->
      <div class="grid md:grid-cols-3 gap-6 mb-24">
        <div class="md:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col justify-center">
          <div class="flex justify-between items-end mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Setup Progress</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Environment completeness</p>
            </div>
            <div class="text-3xl font-black text-blue-600">{{ progressPercentage }}%</div>
          </div>
          <div class="w-full bg-gray-100 dark:bg-black rounded-full h-3 overflow-hidden border border-gray-200 dark:border-gray-800">
            <div
              class="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-in-out"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
        </div>
        <div class="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-center">
          <div class="text-4xl font-black mb-1">{{ totalTools }}</div>
          <div class="text-sm font-bold uppercase tracking-widest opacity-80">Total Modules</div>
          <div class="mt-4 text-xs font-medium opacity-70">Everything you need for elite engineering.</div>
        </div>
      </div>

      <!-- Usage Guide Section -->
      <div id="usage-guide" class="scroll-mt-24 mb-24">
        <DocumentationSection />
      </div>

      <!-- Tool Categories -->
      <div
        v-for="category in categories"
        :key="category"
        :id="category.toLowerCase().replace(/\s+/g, '-')"
        class="mb-32 scroll-mt-24"
      >
        <div class="flex items-center gap-4 mb-12">
          <div class="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-2xl shadow-sm">
            {{ getCategoryIcon(category) }}
          </div>
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{{ category }}</h2>
            <p class="text-gray-500 dark:text-gray-400 font-medium">
              {{ getCategoryDescription(category) }}
            </p>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <ToolCard
            v-for="tool in getToolsByCategory(category)"
            :key="tool.id"
            :tool="tool"
            @tool-completed="handleToolCompleted"
          />
        </div>
      </div>

      <!-- Code Editor Section -->
      <div id="code-editor" class="mb-24 scroll-mt-24">
        <div class="flex items-center gap-4 mb-12">
          <div class="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-2xl shadow-sm">
            💻
          </div>
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Code Editor</h2>
            <p class="text-gray-500 dark:text-gray-400 font-medium">
              Visual Studio Code extensions for high-velocity coding.
            </p>
          </div>
        </div>
        <CodeEditorSection />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-20">
      <div class="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <div class="flex items-center justify-center gap-2 mb-8">
          <span class="text-2xl grayscale">⚡</span>
          <span class="text-xl font-black tracking-tighter">FAANG DOTFILES</span>
        </div>

        <div class="flex items-center justify-center gap-8 mb-12">
          <a href="https://github.com/anthuanvasquez/dotfiles" target="_blank" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">GitHub</a>
          <a href="https://github.com/anthuanvasquez" target="_blank" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Author</a>
        </div>

        <div class="pt-8 border-t border-gray-100 dark:border-gray-800/50 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Designed for elite engineering velocity. © 2026 MIT License.
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.scroll-mt-24 {
  scroll-margin-top: 6rem;
}
</style>
