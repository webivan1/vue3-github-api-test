<script setup lang="ts">
import { toRefs } from 'vue'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/composables/useDebounce'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { useRepositoriesStore } from '@/components/repositories/useRepositoriesStore'

const store = useRepositoriesStore()

const { query, loading } = toRefs(store)
const { searchRepositories, resetRepositories } = store

const handleChangeInput = useDebounce(searchRepositories, 300)
</script>

<template>
  <div class="container py-10 md:py-40">
    <label class="block relative">
      <FontAwesomeIcon
        :icon="faMagnifyingGlass"
        class="absolute h-4 w-4 md:h-6 md:w-6 left-3 top-1/2 -translate-y-1/2 text-border"
        :class="{
          'text-orange-400 animate-pulse': loading
        }"
      />
      <Input
        v-model="query"
        class="m-0 px-9 md:px-12 rounded-full md:h-14 md:text-xl"
        placeholder="Search repositories"
        @update:model-value="handleChangeInput"
      />
      <FontAwesomeIcon
        v-if="query.length > 0"
        :icon="faTimesCircle"
        class="absolute h-4 w-4 md:h-6 md:w-6 cursor-pointer right-3 top-1/2 -translate-y-1/2 text-red-400"
        data-testid="reset-input"
        @click.stop="resetRepositories"
      />
    </label>
  </div>
</template>
