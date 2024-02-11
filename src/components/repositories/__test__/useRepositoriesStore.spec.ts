import { describe, it, beforeEach, vi, expect } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { useRepositoriesStore } from '@/components/repositories/useRepositoriesStore'
import axios, { type AxiosResponse } from 'axios'
import type {
  RepositoryResponseType,
  RepositoryType
} from '@/components/repositories/types/RepositoryType'
import { nextTick } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'

describe('Repositories Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should check default values', () => {
    const store = useRepositoriesStore()

    expect(store.query).toEqual('')
    expect(store.loading).toEqual(false)
    expect(store.repositories).toEqual([])
    expect(store.total).toEqual(0)
    expect(store.canLoadMore).toEqual(false)
    expect(typeof store.searchRepositories).toEqual('function')
    expect(typeof store.loadMoreRepositories).toEqual('function')
    expect(typeof store.resetRepositories).toEqual('function')
  })

  it('should make request', async () => {
    const mockRepositories = [{ id: 1 }, { id: 2 }, { id: 3 }]

    const mockApi = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        total_count: mockRepositories.length,
        items: mockRepositories
      }
    } as AxiosResponse<RepositoryResponseType>)

    const store = useRepositoriesStore()
    const { query, repositories, total } = storeToRefs(store)

    query.value = 'Test Search'

    await nextTick()
    await store.searchRepositories()

    expect(mockApi).toHaveBeenCalledOnce()
    expect(repositories.value).toEqual(mockRepositories)
    expect(query.value).toEqual('Test Search')
    expect(total.value).toEqual(mockRepositories.length)
  })

  it('should load more', async () => {
    const mockDefaultRepositories = [{ id: 1 }] as RepositoryType[]
    const mockNewRepositories = [{ id: 2 }, { id: 3 }]

    const mockApi = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        total_count: 3,
        items: mockNewRepositories
      }
    } as AxiosResponse<RepositoryResponseType>)

    const store = useRepositoriesStore()
    const { query, repositories } = storeToRefs(store)

    query.value = 'Test Search'
    repositories.value = mockDefaultRepositories

    await nextTick()
    await store.loadMoreRepositories()

    expect(repositories.value).toEqual([...mockDefaultRepositories, ...mockNewRepositories])
    expect(mockApi).toHaveBeenCalledOnce()
  })

  it('should call toast function if request is failed', async () => {
    const mockApi = vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Test error'))

    const { toasts } = useToast()
    const store = useRepositoriesStore()
    const { query } = storeToRefs(store)

    query.value = 'Test Search'

    await nextTick()
    await store.searchRepositories()

    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]?.title).toEqual('Something went wrong')
    expect(toasts.value[0]?.description).toEqual('Test error')
    expect(toasts.value[0]?.variant).toEqual('destructive')
    expect(mockApi).toHaveBeenCalledOnce()
  })

  it('should reset values', async () => {
    const store = useRepositoriesStore()
    const { query, repositories, loading, total, canLoadMore } = storeToRefs(store)

    query.value = 'Test...'
    repositories.value = [{ id: 1 }] as RepositoryType[]
    loading.value = true
    total.value = 100
    canLoadMore.value = true

    store.resetRepositories()

    expect(store.query).toEqual('')
    expect(store.loading).toEqual(false)
    expect(store.repositories).toEqual([])
    expect(store.total).toEqual(0)
    expect(store.canLoadMore).toEqual(false)
  })
})
