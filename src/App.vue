<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/ui/header/AppHeader.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import Gradient from '@/components/ui/background/Gradient.vue'
</script>

<template>
  <Gradient />
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <Toaster />
</template>
