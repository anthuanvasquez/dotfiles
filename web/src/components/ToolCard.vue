<template>
  <div class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-none border border-gray-200 dark:border-gray-700 p-8 hover:shadow-medium dark:hover:border-gray-600 transition-all duration-300 overflow-hidden">
    <!-- Gradient Border Effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

    <div class="relative flex items-start gap-6">
      <div class="flex flex-col items-center gap-3">
        <div class="text-4xl transform group-hover:scale-110 transition-transform duration-300">{{ tool.icon }}</div>
        <!-- Progress Checkbox -->
        <label class="flex items-center cursor-pointer group/checkbox">
          <input
            type="checkbox"
            :checked="isCompleted"
            @change="toggleCompleted"
            class="sr-only"
          >
          <div class="relative">
            <div class="w-6 h-6 border-2 rounded-lg transition-all duration-200 group-hover/checkbox:scale-110"
                 :class="isCompleted
                   ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg shadow-green-500/25'
                   : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 bg-white dark:bg-gray-700'">
              <svg
                v-if="isCompleted"
                class="w-4 h-4 text-white absolute top-0.5 left-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </label>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3 flex-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              {{ tool.name }}
            </h3>
            <a
              v-if="tool.url"
              :href="tool.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
              title="Abrir sitio oficial"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>

        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{{ tool.description }}</p>

        <!-- Commands Section -->
        <div class="space-y-3 mb-6">
          <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span class="text-primary-500">⚡</span>
            Comandos de instalación
          </h4>
          <div v-for="(command, index) in tool.commands" :key="index" class="relative group/command">
            <div class="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 text-sm font-mono text-green-400 flex items-center justify-between border border-gray-800 dark:border-gray-700 hover:border-primary-500/50 transition-all duration-200">
              <code class="flex-1 pr-3 break-all">{{ command }}</code>
              <button
                @click="copyToClipboard(command)"
                class="flex-shrink-0 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 opacity-0 group-hover/command:opacity-100 text-gray-400 hover:text-green-400"
                title="Copiar comando"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div v-if="tool.notes && tool.notes.length > 0" class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span class="text-amber-500">⚙️</span>
            Configuración adicional
          </h4>
          <div v-for="(note, index) in tool.notes" :key="index" class="relative group/note">
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 dark:border-amber-500 p-4 text-sm font-mono text-amber-800 dark:text-amber-200 flex items-center justify-between rounded-r-lg hover:shadow-md transition-all duration-200">
              <code class="flex-1 pr-3 break-all">{{ note }}</code>
              <button
                @click="copyToClipboard(note)"
                class="flex-shrink-0 p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-all duration-200 opacity-0 group-hover/note:opacity-100 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200"
                title="Copiar comando"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Tool } from '@/data/setupData'

const props = defineProps<{
  tool: Tool
}>()

const emit = defineEmits<{
  'tool-completed': [toolId: string, completed: boolean]
}>()

const isCompleted = ref(false)

const toggleCompleted = () => {
  isCompleted.value = !isCompleted.value
  emit('tool-completed', props.tool.id, isCompleted.value)
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // Aquí podrías mostrar una notificación de éxito
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>
