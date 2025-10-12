<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolCard from '@/components/ToolCard.vue'
import CodeEditorSection from '@/components/CodeEditorSection.vue'
import { setupData, categories } from '@/data/setupData'

// Estado para tracking de progreso
const completedTools = ref(new Set<string>())

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
    'Initial Setup': '⚙️',
    'Development Tools': '🛠️',
    'Applications': '📱',
    'Code Editor': '💻'
  }
  return icons[category] || '📦'
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
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="text-2xl">🍎</div>
            <h1 class="text-xl font-bold text-gray-900">Mac Dev Setup</h1>
          </div>
          <nav class="flex items-center gap-6">
            <a
              v-for="category in categories"
              :key="category"
              :href="`#${category.toLowerCase().replace(/\s+/g, '-')}`"
              class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {{ category }}
            </a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mac Dev Setup
          </span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Una guía completa e interactiva para configurar tu Mac como un entorno de desarrollo web profesional.
          Todas las herramientas esenciales con comandos copiables.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#initial-setup"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <span>Comenzar Setup</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 12h12"></path>
            </svg>
          </a>
          <a
            href="https://github.com/anthuanvasquez/mac-dev-setup"
            target="_blank"
            class="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Ver en GitHub</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Progress Bar -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-600">Progreso del Setup</span>
          <span class="text-sm font-medium text-gray-900">{{ completedCount }}/{{ totalTools }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          Marca las herramientas que ya tienes instaladas para hacer seguimiento de tu progreso
        </p>
      </div>
    </div>

    <!-- Content Sections -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div
        v-for="category in categories"
        :key="category"
        :id="category.toLowerCase().replace(/\s+/g, '-')"
        class="mb-16"
      >
        <div class="flex items-center gap-3 mb-8">
          <div class="text-3xl">{{ getCategoryIcon(category) }}</div>
          <h2 class="text-3xl font-bold text-gray-900">{{ category }}</h2>
        </div>

        <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <ToolCard
            v-for="tool in getToolsByCategory(category)"
            :key="tool.id"
            :tool="tool"
            @tool-completed="handleToolCompleted"
          />
        </div>
      </div>

      <!-- Code Editor Section -->
      <div id="code-editor" class="mb-16">
        <div class="flex items-center gap-3 mb-8">
          <div class="text-3xl">💻</div>
          <h2 class="text-3xl font-bold text-gray-900">Editor de Código</h2>
        </div>
        <CodeEditorSection />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div class="text-2xl mb-4">🚀</div>
        <h3 class="text-xl font-semibold mb-2">¡Listo para desarrollar!</h3>
        <p class="text-gray-400 mb-6">
          Ahora tienes todo lo necesario para comenzar a desarrollar aplicaciones web en tu Mac.
        </p>
        <div class="flex justify-center gap-6 text-sm text-gray-400">
          <span>Hecho con ❤️ para la comunidad dev</span>
        </div>
      </div>
    </footer>
  </div>
</template>
