import { ref } from 'vue'

export const useDebounce = <T extends Function>(func: T, delay: number) => {
  const timer = ref<ReturnType<typeof setTimeout>>()

  return (...args: any[]) => {
    clearTimeout(timer.value)

    timer.value = setTimeout(() => func(...args), delay)
  }
}
