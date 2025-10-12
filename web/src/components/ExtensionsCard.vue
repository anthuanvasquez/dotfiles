<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="text-2xl">💻</div>
      <h3 class="text-xl font-semibold text-gray-900">Extensiones de VS Code</h3>
    </div>

    <p class="text-gray-600 mb-6">
      Estas extensiones mejorarán significativamente tu experiencia de desarrollo en VS Code.
    </p>

    <!-- Install All Button -->
    <div class="mb-6">
      <button
        @click="copyAllExtensions"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        Copiar todas las extensiones
      </button>
    </div>

    <!-- Extensions Grid -->
    <div class="grid gap-3">
      <div
        v-for="extension in extensions"
        :key="extension.id"
        class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{{ extension.name }}</h4>
            <p class="text-sm text-gray-600 mt-1">{{ extension.description }}</p>
            <code class="text-xs text-gray-500 font-mono bg-gray-200 px-2 py-1 rounded mt-2 inline-block">
              {{ extension.id }}
            </code>
          </div>
          <button
            @click="copyExtension(extension.id)"
            class="ml-3 p-2 rounded hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
            title="Copiar comando de instalación"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Command to install all -->
    <div class="mt-6">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Comando para instalar todas:</h4>
      <div class="bg-gray-900 rounded-lg p-3 text-sm font-mono text-green-400 flex items-center justify-between group/all">
        <code class="flex-1 whitespace-pre-wrap">{{ allExtensionsCommand }}</code>
        <button
          @click="copyToClipboard(allExtensionsCommand)"
          class="ml-2 p-1 rounded hover:bg-gray-800 transition-colors opacity-0 group-hover/all:opacity-100"
          title="Copiar comando completo"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { vscodeExtensions } from '@/data/setupData'

const extensions = vscodeExtensions

const allExtensionsCommand = computed(() => {
  return extensions.map(ext => `code --install-extension ${ext.id}`).join(' && \\\n')
})

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const copyExtension = (extensionId: string) => {
  copyToClipboard(`code --install-extension ${extensionId}`)
}

const copyAllExtensions = () => {
  copyToClipboard(allExtensionsCommand.value)
}
</script>
