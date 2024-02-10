<script setup lang="ts">
import { provide, ref, onMounted } from 'vue'
import { ThemeEnum } from '@/components/themeToggler/enums/ThemeEnum'
import { THEME_KEY } from '@/components/themeToggler/useTheme'

const currentTheme = (localStorage.getItem('theme') ?? ThemeEnum.LIGHT) as ThemeEnum

const theme = ref<ThemeEnum>(currentTheme)

const changeTheme = (newTheme: ThemeEnum) => {
  theme.value = newTheme
  document.documentElement.setAttribute('class', newTheme)
  localStorage.setItem('theme', newTheme)
}

onMounted(() => {
  changeTheme(theme.value)
})

provide(THEME_KEY, { theme, changeTheme })
</script>

<template>
  <slot />
</template>
