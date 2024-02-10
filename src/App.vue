<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import ThemeToggle from '@/components/themeToggle/ThemeToggle.vue'
</script>

<template>
  <header
    class="sticky top-0 py-3 bg-background/70 inset-x-0 backdrop-blur-lg backdrop-saturate-150"
  >
    <div class="container flex justify-between items-center">
      <RouterLink class="flex items-center gap-3" to="/">
        <FontAwesomeIcon class="text-[1.5rem] md:text-[2rem]" :icon="faGithub" />
        <div class="tracking-tight inline font-semibold text-[1rem] md:text-[1.5rem]">
          Github<span
            class="from-blue-400 to-sky-400 bg-clip-text text-transparent bg-gradient-to-b"
            >Search</span
          >
        </div>
      </RouterLink>
      <ThemeToggle />
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
