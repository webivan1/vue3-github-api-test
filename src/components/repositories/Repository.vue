<script setup lang="ts">
import type { RepositoryType } from '@/components/repositories/types/RepositoryType'

defineProps<{ item: RepositoryType }>()
</script>

<template>
  <pre>{{ item }}</pre>
</template>
