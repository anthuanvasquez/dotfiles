import { ref, onMounted } from 'vue'

const isDark = ref(false)

// Inicializar desde localStorage o preferencia del sistema
const initTheme = () => {
  const stored = localStorage.getItem('theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  updateTheme()
}

// Actualizar el tema en el DOM
const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Alternar tema
const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

export function useTheme() {
  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme
  }
}
