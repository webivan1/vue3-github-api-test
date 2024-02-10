import { defineStore } from 'pinia'
import { ThemeEnum } from '@/components/themeToggle/enums/ThemeEnum'
import { onMounted, ref } from 'vue'

export const THEME_KEY = 'theme'

export const useThemeStore = defineStore(THEME_KEY, () => {
  const currentTheme = (localStorage.getItem(THEME_KEY) ?? ThemeEnum.LIGHT) as ThemeEnum

  console.log('THEME', currentTheme)

  const theme = ref<ThemeEnum>(currentTheme)

  const addThemeClass = (newTheme: ThemeEnum) => {
    document.documentElement.setAttribute('class', newTheme)
  }

  const changeTheme = (newTheme: ThemeEnum) => {
    theme.value = newTheme
    localStorage.setItem(THEME_KEY, newTheme)
    addThemeClass(newTheme)
  }

  onMounted(() => {
    console.log('MOUNTED', theme.value)
    addThemeClass(theme.value)
  })

  return {
    theme,
    changeTheme
  }
})
