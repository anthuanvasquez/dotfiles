<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
    <div class="flex items-start gap-4">
      <div class="flex flex-col items-center gap-2">
        <div class="text-3xl">{{ tool.icon }}</div>
        <!-- Progress Checkbox -->
        <label class="flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="isCompleted"
            @change="toggleCompleted"
            class="sr-only"
          >
          <div class="relative">
            <div class="w-5 h-5 border-2 border-gray-300 rounded transition-all duration-200"
                 :class="isCompleted ? 'bg-green-500 border-green-500' : 'hover:border-green-400'">
              <svg
                v-if="isCompleted"
                class="w-3 h-3 text-white absolute top-0.5 left-0.5"
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
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <h3 class="text-xl font-semibold text-gray-900">{{ tool.name }}</h3>
          <a
            v-if="tool.url"
            :href="tool.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
        <p class="text-gray-600 mb-4">{{ tool.description }}</p>

        <!-- Commands Section -->
        <div class="space-y-2">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Comandos de instalación:</h4>
          <div v-for="(command, index) in tool.commands" :key="index" class="relative">
            <div class="bg-gray-900 rounded-lg p-3 text-sm font-mono text-green-400 flex items-center justify-between group/command">
              <code class="flex-1">{{ command }}</code>
              <button
                @click="copyToClipboard(command)"
                class="ml-2 p-1 rounded hover:bg-gray-800 transition-colors opacity-0 group-hover/command:opacity-100"
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
        <div v-if="tool.notes && tool.notes.length > 0" class="mt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Configuración adicional:</h4>
          <div v-for="(note, index) in tool.notes" :key="index" class="relative">
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 text-sm font-mono text-amber-800 flex items-center justify-between group/note">
              <code class="flex-1">{{ note }}</code>
              <button
                @click="copyToClipboard(note)"
                class="ml-2 p-1 rounded hover:bg-amber-100 transition-colors opacity-0 group-hover/note:opacity-100"
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
