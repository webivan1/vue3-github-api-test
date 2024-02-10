<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import { useThemeStore } from '@/components/themeToggle/useThemeStore'
import { ThemeEnum } from '@/components/themeToggle/enums/ThemeEnum'
import type { ThemeButtonType } from '@/components/themeToggle/types/ThemeButtonType'

const store = useThemeStore()

const { changeTheme } = store

const buttons: ThemeButtonType[] = [
  {
    theme: ThemeEnum.DARK,
    icon: faSun,
    action: () => changeTheme(ThemeEnum.LIGHT)
  },
  {
    theme: ThemeEnum.LIGHT,
    icon: faMoon,
    action: () => changeTheme(ThemeEnum.DARK)
  }
]
</script>

<template>
  <template v-for="btn of buttons" :key="btn.theme">
    <Button
      v-if="store.theme === btn.theme"
      variant="outline"
      size="icon"
      :data-testid="`theme-${btn.theme}-btn`"
      @click="btn.action"
    >
      <FontAwesomeIcon :icon="btn.icon" />
    </Button>
  </template>
</template>
