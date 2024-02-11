import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-github-api-test/',
  plugins: [
    vue(),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
