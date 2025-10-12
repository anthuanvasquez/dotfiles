<template>
  <div class="space-y-8">
    <!-- VS Code Installation Card -->
    <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-4xl">💻</div>
        <div>
          <h3 class="text-2xl font-bold">Visual Studio Code</h3>
          <p class="text-blue-100 text-lg">El editor de código más popular para desarrollo web</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h4 class="font-semibold mb-2 flex items-center gap-2">
            <span>🚀</span> Características principales
          </h4>
          <ul class="text-sm text-blue-100 space-y-1">
            <li>• IntelliSense avanzado</li>
            <li>• Debugging integrado</li>
            <li>• Terminal integrada</li>
            <li>• Control de versiones Git</li>
            <li>• Marketplace de extensiones</li>
          </ul>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h4 class="font-semibold mb-2 flex items-center gap-2">
            <span>⚡</span> Instalación rápida
          </h4>
          <div class="bg-black/30 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
            <code class="text-green-300">brew install --cask visual-studio-code</code>
            <button
              @click="copyToClipboard('brew install --cask visual-studio-code')"
              class="ml-2 p-1 rounded hover:bg-white/20 transition-colors"
              title="Copiar comando"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
          <a
            href="https://code.visualstudio.com/"
            target="_blank"
            class="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mt-2 transition-colors"
          >
            Sitio oficial
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Extensions Section -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span class="text-3xl">🔧</span>
              Extensiones Esenciales
            </h3>
            <p class="text-gray-600 mt-1">
              {{ totalExtensions }} extensiones organizadas por categoría para maximizar tu productividad
            </p>
          </div>
          <div class="text-right">
            <button
              @click="installAllExtensions"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
              Instalar Todas
            </button>
          </div>
        </div>
      </div>

      <!-- Category Tabs -->
      <div class="px-8 py-4 bg-gray-50 border-b border-gray-200">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in extensionCategories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            ]"
          >
            {{ category }}
            <span class="ml-1 text-xs opacity-75">({{ getExtensionsByCategory(category).length }})</span>
          </button>
        </div>
      </div>

      <!-- Extensions Grid -->
      <div class="p-8">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="extension in getExtensionsByCategory(selectedCategory)"
            :key="extension.id"
            class="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-blue-300 group cursor-pointer"
            @click="toggleExtensionSelection(extension.id)"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ extension.icon }}</span>
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {{ extension.name }}
                  </h4>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <!-- Selection checkbox -->
                <div
                  :class="[
                    'w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center',
                    selectedExtensions.has(extension.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 group-hover:border-blue-400'
                  ]"
                >
                  <svg
                    v-if="selectedExtensions.has(extension.id)"
                    class="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <!-- Copy button -->
                <button
                  @click.stop="copyExtensionCommand(extension.id)"
                  class="p-1 rounded hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                  title="Copiar comando de instalación"
                >
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-3">{{ extension.description }}</p>

            <div class="text-xs text-gray-500 font-mono bg-gray-200 px-2 py-1 rounded truncate">
              {{ extension.id }}
            </div>
          </div>
        </div>

        <!-- Selection Summary -->
        <div v-if="selectedExtensions.size > 0" class="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="font-semibold text-blue-900 flex items-center gap-2">
                <span>📦</span>
                Extensiones Seleccionadas ({{ selectedExtensions.size }})
              </h4>
              <p class="text-sm text-blue-700">Instala las extensiones que has seleccionado</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="clearSelection"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Limpiar selección
              </button>
              <button
                @click="installSelectedExtensions"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Instalar Seleccionadas
              </button>
            </div>
          </div>

          <!-- Command preview -->
          <div class="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="text-green-400">Comando para extensiones seleccionadas:</span>
              <button
                @click="copySelectedCommand"
                class="text-gray-400 hover:text-white transition-colors"
                title="Copiar comando completo"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
            <div class="text-green-300 whitespace-pre-wrap max-h-32 overflow-y-auto">{{ selectedExtensionsCommand }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips Section -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
      <h4 class="font-semibold text-amber-900 mb-3 flex items-center gap-2">
        <span>💡</span> Consejos Pro
      </h4>
      <div class="grid md:grid-cols-2 gap-4 text-sm text-amber-800">
        <div class="space-y-2">
          <p><strong>⚡ Atajos útiles:</strong></p>
          <ul class="space-y-1 ml-4">
            <li>• <code class="bg-amber-200 px-1 rounded">Cmd+Shift+P</code> - Paleta de comandos</li>
            <li>• <code class="bg-amber-200 px-1 rounded">Cmd+P</code> - Búsqueda rápida de archivos</li>
            <li>• <code class="bg-amber-200 px-1 rounded">Cmd+`</code> - Terminal integrada</li>
          </ul>
        </div>
        <div class="space-y-2">
          <p><strong>🔧 Configuración recomendada:</strong></p>
          <ul class="space-y-1 ml-4">
            <li>• Habilita el auto-save</li>
            <li>• Configura Prettier como formateador por defecto</li>
            <li>• Instala el tema Tokyo Night para mejor visibilidad</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { vscodeExtensions, extensionCategories } from '@/data/setupData'

const selectedCategory = ref('Esenciales')
const selectedExtensions = ref(new Set<string>())

const totalExtensions = computed(() => vscodeExtensions.length)

const getExtensionsByCategory = (category: string) => {
  return vscodeExtensions.filter(ext => ext.category === category)
}

const selectedExtensionsCommand = computed(() => {
  const extensions = Array.from(selectedExtensions.value)
  return extensions.map(id => `code --install-extension ${id}`).join(' && \\\n')
})

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // Aquí podrías mostrar una notificación de éxito
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const copyExtensionCommand = (extensionId: string) => {
  copyToClipboard(`code --install-extension ${extensionId}`)
}

const toggleExtensionSelection = (extensionId: string) => {
  if (selectedExtensions.value.has(extensionId)) {
    selectedExtensions.value.delete(extensionId)
  } else {
    selectedExtensions.value.add(extensionId)
  }
}

const clearSelection = () => {
  selectedExtensions.value.clear()
}

const installSelectedExtensions = () => {
  copyToClipboard(selectedExtensionsCommand.value)
}

const installAllExtensions = () => {
  const allCommand = vscodeExtensions.map(ext => `code --install-extension ${ext.id}`).join(' && \\\n')
  copyToClipboard(allCommand)
}

const copySelectedCommand = () => {
  copyToClipboard(selectedExtensionsCommand.value)
}
</script>
