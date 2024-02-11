import { defineStore } from 'pinia'
import { ThemeEnum } from '@/components/themeToggle/enums/ThemeEnum'
import { ref } from 'vue'

export const THEME_KEY = 'theme'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = (localStorage.getItem(THEME_KEY) ?? ThemeEnum.LIGHT) as ThemeEnum

  const theme = ref<ThemeEnum>(currentTheme)

  const addThemeClass = (newTheme: ThemeEnum) => {
    document.documentElement.setAttribute('class', newTheme)
  }

  const changeTheme = (newTheme: ThemeEnum) => {
    theme.value = newTheme
    localStorage.setItem(THEME_KEY, newTheme)
    addThemeClass(newTheme)
  }

  return {
    theme,
    changeTheme,
    addThemeClass
  }
})
