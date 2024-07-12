import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Router } from 'vue-router'

export const validateMessagesForm = {
  required: '${label} é obrigatório!',
  types: {
    email: '${label} não é um e-mail valido!',
    number: '${label} não é um numero valido!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutID: any | null = null

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}

export function lancarPaginaErro(router: Router, error: any) {
  router.push({
    name: 'error',
    query: {
      message: error.message,
      code: error.code,
      data: error.response?.data ? JSON.stringify(error.response?.data) : null
    }
  })
}

export enum MediaQuery {
  xs = 420,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  '2xl' = 1440,
  '3xl' = 1600,
  '4xl' = 1920
}

export function useBreakpoints() {
  const windowWidth = ref(window.innerWidth)

  const onWidthChange = () => (windowWidth.value = window.innerWidth)
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const mediaQuery = computed(() => {
    for (const query of Object.keys(MediaQuery)) {
      if (windowWidth.value < MediaQuery[query]) {
        return MediaQuery[query]
      }
    }

    return MediaQuery['4xl']
  })

  const width = computed(() => windowWidth.value)

  return { width, mediaQuery }
}
