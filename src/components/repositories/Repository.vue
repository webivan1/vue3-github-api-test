<script setup lang="ts">
import type { RepositoryType } from '@/components/repositories/types/RepositoryType'
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowUpRightFromSquare,
  faBug,
  faFileZipper,
  faScaleBalanced,
  faStar
} from '@fortawesome/free-solid-svg-icons'

defineProps<{ item: RepositoryType }>()
</script>

<template>
  <Card class="flex flex-col" data-testid="repository">
    <CardContent class="flex justify-center pt-5">
      <img :src="item.owner.avatar_url" class="w-3/4 h-auto rounded-full" />
    </CardContent>
    <CardContent class="flex gap-2 text-sm m-0">
      <div v-if="item.archived || item.disabled" data-testid="disabled">
        <FontAwesomeIcon class="text-red-600" :icon="faFileZipper" />
      </div>
      <div data-testid="stars">
        <FontAwesomeIcon class="text-yellow-400" :icon="faStar" />
        {{ item.stargazers_count ?? 0 }}
      </div>
      <div data-testid="issues">
        <FontAwesomeIcon class="text-red-400" :icon="faBug" />
        {{ item.open_issues_count ?? 0 }}
      </div>
      <div v-if="item.license" data-testid="license">
        <FontAwesomeIcon class="text-blue-400" :icon="faScaleBalanced" />
        {{ item.license.spdx_id }}
      </div>
    </CardContent>
    <CardContent class="flex gap-1 flex-wrap m-0 py-0">
      <Badge v-for="title of item.topics" :key="title">{{ title }}</Badge>
    </CardContent>
    <CardHeader class="flex-1">
      <CardTitle data-testid="title">{{ item.full_name }}</CardTitle>
      <CardDescription v-if="item.description" data-testid="description">{{
        item.description
      }}</CardDescription>
    </CardHeader>
    <CardFooter class="flex justify-end">
      <Button variant="outline" class="gap-3" as="a" :href="item.html_url" target="_blank">
        Visit
        <FontAwesomeIcon :icon="faArrowUpRightFromSquare" />
      </Button>
    </CardFooter>
  </Card>
</template>
