<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import ThemeToggler from '@/components/themeToggler/ThemeToggler.vue'
import ThemeProvider from '@/components/themeToggler/ThemeProvider.vue'
</script>

<template>
  <ThemeProvider>
    <header class="sticky top-0 border-b border-b-border py-3">
      <div class="container flex justify-between items-center">
        <RouterLink class="flex items-center gap-3" to="/">
          <FontAwesomeIcon class="text-[1.5rem] md:text-[2rem]" :icon="faGithub" />
          <div class="tracking-tight inline font-semibold text-[1rem] md:text-[1.5rem]">
            Github
            <span class="from-blue-400 to-sky-400 bg-clip-text text-transparent bg-gradient-to-b"
              >Search</span
            >
          </div>
        </RouterLink>
        <ThemeToggler />
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </ThemeProvider>
</template>
