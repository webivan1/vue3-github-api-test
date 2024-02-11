import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import axios, { AxiosError, CanceledError } from 'axios'
import type {
  RepositoryResponseType,
  RepositoryType
} from '@/components/repositories/types/RepositoryType'

export const useRepositoriesStore = defineStore('repositories', () => {
  const currentPage = ref<number>(1)
  const canLoadMore = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const query = ref<string>('')
  const repositories = ref<RepositoryType[]>([])
  const total = ref<number>(0)
  const perPage = ref<number>(30)
  const { toast } = useToast()

  let abortController = new AbortController()

  const fetchRepositories = async (query: string, page: number, merge: boolean = false) => {
    loading.value = true
    // cancel previous request
    abortController.abort()

    try {
      abortController = new AbortController()

      const { VITE_APP_GITHUB_API_URL, VITE_APP_GITHUB_ACCESS_TOKEN } = import.meta.env

      const { data } = await axios.get<RepositoryResponseType>(
        `${VITE_APP_GITHUB_API_URL}/search/repositories?q=${query}&page=${page}`,
        {
          signal: abortController.signal,
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: VITE_APP_GITHUB_ACCESS_TOKEN
              ? `Bearer ${VITE_APP_GITHUB_ACCESS_TOKEN}`
              : undefined
          }
        }
      )

      canLoadMore.value = data.items.length >= perPage.value
      total.value = data.total_count
      repositories.value = merge === false ? data.items : repositories.value.concat(data.items)
      loading.value = false
    } catch (err) {
      if (err instanceof CanceledError) {
        return
      }

      toast({
        title: 'Something went wrong',
        description: (err as AxiosError).message,
        variant: 'destructive'
      })

      canLoadMore.value = false
      loading.value = false
    }
  }

  const searchRepositories = async () => {
    if (query.value.trim() === '') {
      resetRepositories()
      return
    }

    currentPage.value = 1
    canLoadMore.value = false

    await fetchRepositories(query.value, currentPage.value)
  }

  const loadMoreRepositories = async () => {
    currentPage.value++
    await fetchRepositories(query.value, currentPage.value, true)
  }

  const resetRepositories = () => {
    query.value = ''
    currentPage.value = 1
    canLoadMore.value = false
    repositories.value = []
    total.value = 0
    loading.value = false
    abortController.abort()
  }

  return {
    query,
    repositories,
    loading,
    total,
    canLoadMore,
    searchRepositories,
    loadMoreRepositories,
    resetRepositories
  }
})
