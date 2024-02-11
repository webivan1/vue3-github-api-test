<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  loadMore: []
}>()
</script>

<template>
  <Button
    :disabled="loading"
    variant="outline"
    class="py-6 px-4 w-[180px] text-xl relative overflow-hidden"
    @click="emit('loadMore')"
  >
    <div
      v-if="loading"
      class="absolute flex justify-center items-center w-full h-full bg-background/80 pointer-events-none"
    >
      <FontAwesomeIcon :icon="faSpinner" spin class="w-7 h-7" />
    </div>
    Load more
  </Button>
</template>
