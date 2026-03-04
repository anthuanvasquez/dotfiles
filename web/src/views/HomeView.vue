<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolCard from '@/components/ToolCard.vue'
import CodeEditorSection from '@/components/CodeEditorSection.vue'
import { setupData, categories } from '@/data/setupData'
import { useTheme } from '@/composables/useTheme'

// Estado para tracking de progreso
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
    'Initial Setup': '⚙️',
    'Development Tools': '🛠️',
    'Applications': '📱',
    'Code Editor': '💻'
  }
  return icons[category] || '📦'
}

const getCategoryDescription = (category: string) => {
  const descriptions: Record<string, string> = {
    'Initial Setup': 'Configuración básica del sistema y herramientas fundamentales',
    'Development Tools': 'Herramientas esenciales para desarrollo web moderno',
    'Applications': 'Aplicaciones que mejorarán tu flujo de trabajo diario',
    'Code Editor': 'VS Code y extensiones para maximizar tu productividad'
  }
  return descriptions[category] || 'Herramientas para desarrollo'
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
  <div class="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-soft">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="text-2xl animate-pulse-slow">🍎</div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Anva.Env</h1>
          </div>
          <nav class="flex items-center gap-6">
            <a
              v-for="category in categories"
              :key="category"
              :href="`#${category.toLowerCase().replace(/\s+/g, '-')}`"
              class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {{ category }}
            </a>
            <!-- Theme Toggle Button -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-gray-700 dark:text-gray-300"
              :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative py-24 overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute inset-0 opacity-30 dark:opacity-20">
        <div class="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
      </div>

      <div class="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div class="mb-8">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-6">
            <span class="mr-2">🚀</span>
            Configuración profesional para desarrolladores
          </div>
        </div>

        <h1 class="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
          <span class="bg-gradient-to-r from-primary-600 via-secondary-600 to-purple-600 bg-clip-text text-transparent">
            Anva.Env
          </span>
        </h1>

        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Una guía completa e interactiva para configurar tu Mac como un entorno de desarrollo web profesional.
          <span class="font-semibold text-primary-600 dark:text-primary-400">Todas las herramientas esenciales</span> con comandos copiables al instante.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#initial-setup"
            class="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-medium hover:shadow-hard transform hover:-translate-y-1 inline-flex items-center gap-3"
          >
            <span>Comenzar Setup</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 12h12"></path>
            </svg>
          </a>

          <a
            href="https://github.com/anthuanvasquez/Anva.Env"
            target="_blank"
            class="group border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Ver en GitHub</span>
          </a>
        </div>

        <!-- Statistics -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ totalTools }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Herramientas</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-secondary-600 dark:text-secondary-400">30+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Extensiones VS Code</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">4</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Categorías</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Gratis</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Progress Bar -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-none border border-gray-200 dark:border-gray-700 p-8 animate-slide-up">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Progreso del Setup</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Marca las herramientas que ya tienes instaladas</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ completedCount }}/{{ totalTools }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ progressPercentage }}% completado</div>
          </div>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            class="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
    </div>    <!-- Content Sections -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div
        v-for="category in categories"
        :key="category"
        :id="category.toLowerCase().replace(/\s+/g, '-')"
        class="mb-20 animate-slide-up"
      >
        <div class="flex items-center gap-4 mb-10">
          <div class="text-4xl">{{ getCategoryIcon(category) }}</div>
          <div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white">{{ category }}</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {{ getCategoryDescription(category) }}
            </p>
          </div>
        </div>

        <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <ToolCard
            v-for="tool in getToolsByCategory(category)"
            :key="tool.id"
            :tool="tool"
            @tool-completed="handleToolCompleted"
          />
        </div>
      </div>

      <!-- Code Editor Section -->
      <div id="code-editor" class="mb-20 animate-slide-up">
        <div class="flex items-center gap-4 mb-10">
          <div class="text-4xl">💻</div>
          <div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white">Editor de Código</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
              VS Code y todas las extensiones esenciales para desarrollo web
            </p>
          </div>
        </div>
        <CodeEditorSection />
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white py-20 overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div class="absolute bottom-0 right-0 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="text-4xl mb-6 animate-bounce">🚀</div>
          <h3 class="text-3xl font-bold mb-4">¡Listo para desarrollar!</h3>
          <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Ahora tienes todo lo necesario para comenzar a desarrollar aplicaciones web profesionales en tu Mac.
          </p>
        </div>

        <!-- Feature Highlights -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="text-center">
            <div class="text-2xl mb-3">⚡</div>
            <h4 class="font-semibold mb-2">Configuración Rápida</h4>
            <p class="text-gray-400 text-sm">Comandos copiables para instalación instantánea</p>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-3">🎯</div>
            <h4 class="font-semibold mb-2">Herramientas Curadas</h4>
            <p class="text-gray-400 text-sm">Solo las mejores herramientas para desarrollo web</p>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-3">📱</div>
            <h4 class="font-semibold mb-2">Siempre Actualizado</h4>
            <p class="text-gray-400 text-sm">Mantenemos las versiones más recientes</p>
          </div>
        </div>

        <!-- Links and Info -->
        <div class="border-t border-gray-700 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center gap-6 mb-4 md:mb-0">
              <a
                href="https://github.com/anthuanvasquez/Anva.Env"
                target="_blank"
                class="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Contribuir en GitHub
              </a>
              <a
                href="https://github.com/anthuanvasquez"
                target="_blank"
                class="text-gray-300 hover:text-white transition-colors duration-200"
              >
                @anthuanvasquez
              </a>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-sm">
                Hecho con <span class="text-red-400">❤️</span> para la comunidad dev
              </p>
              <p class="text-gray-500 text-xs mt-1">
                © 2026 Anva.Env. Código abierto bajo licencia MIT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
