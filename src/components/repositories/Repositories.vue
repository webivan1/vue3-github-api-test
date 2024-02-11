<script setup lang="ts">
import { toRefs } from 'vue'
import { useRepositoriesStore } from '@/components/repositories/useRepositoriesStore'
import { AlertTitle, Alert, AlertDescription } from '@/components/ui/alert'
import RepositoryHeading from '@/components/repositories/RepositoryHeading.vue'
import Repository from '@/components/repositories/Repository.vue'
import LoadMoreBtn from '@/components/repositories/LoadMoreBtn.vue'

const store = useRepositoriesStore()

const { total, loading, repositories, canLoadMore } = toRefs(store)
const { loadMoreRepositories } = store
</script>

<template>
  <div class="container">
    <div v-if="!loading && repositories.length === 0">
      <Alert>
        <AlertTitle>Unfortunately, there is nothing here yet</AlertTitle>
        <AlertDescription>Please enter something in the search field</AlertDescription>
      </Alert>
    </div>

    <div v-else>
      <RepositoryHeading :total :loading />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-7">
        <Repository v-for="item of repositories" :key="item.id" :item />
      </div>
      <div class="flex justify-center">
        <LoadMoreBtn v-if="canLoadMore" :loading @loadMore="loadMoreRepositories" />
      </div>
    </div>
  </div>
</template>
