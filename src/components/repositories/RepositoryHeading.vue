<script setup lang="ts">
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
  total: number
  loading: boolean
}>()
</script>

<template>
  <h3 class="text-center font-semibold text-md md:text-3xl mb-4 md:mb-8">
    We found
    <FontAwesomeIcon v-if="loading" :icon="faSpinner" spin class="mx-3 text-orange-400" />
    <span
      v-else
      class="from-orange-500 to-orange-300 bg-clip-text text-transparent bg-gradient-to-b"
    >
      {{ total }}
    </span>
    repositories
  </h3>
</template>
