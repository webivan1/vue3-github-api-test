<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from '@/components/themeToggler/useTheme'
import { ThemeEnum } from '@/components/themeToggler/enums/ThemeEnum'

const { theme, changeTheme } = useTheme()
</script>

<template>
  <Button
    v-if="theme === ThemeEnum.DARK"
    variant="outline"
    size="icon"
    @click="changeTheme(ThemeEnum.LIGHT)"
  >
    <FontAwesomeIcon :icon="faSun" />
  </Button>
  <Button v-else variant="outline" size="icon" @click="changeTheme(ThemeEnum.DARK)">
    <FontAwesomeIcon :icon="faMoon" />
  </Button>
</template>
