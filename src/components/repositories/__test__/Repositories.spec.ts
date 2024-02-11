import { mount } from '@vue/test-utils'
import { describe, it, beforeEach, vi, expect } from 'vitest'
import { useRepositoriesStore } from '@/components/repositories/useRepositoriesStore'
import Repositories from '@/components/repositories/Repositories.vue'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import type { RepositoryResponseType } from '@/components/repositories/types/RepositoryType'
import axios, { type AxiosResponse } from 'axios'
import { nextTick } from 'vue'

describe('Components - Repositories', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render a message when there are no repositories', () => {
    const wrapper = mount(Repositories)

    expect(wrapper.find('[data-testid="alert-title"]').text()).toContain(
      'Unfortunately, there is nothing here yet'
    )
    expect(wrapper.find('[data-testid="alert-desc"]').text()).toContain(
      'Please enter something in the search field'
    )
  })

  it('should display list of repositories', async () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        total_count: 1,
        items: [
          {
            id: 1,
            owner: {
              avatar_url: 'test url'
            },
            archived: true,
            stargazers_count: 20,
            open_issues_count: 0,
            license: {
              spdx_id: 'TEST'
            },
            html_url: 'test url',
            topics: ['Vue2', 'Vue3', 'React', 'Svelte', 'Angular'],
            full_name: 'Mr Test',
            description: 'Some description'
          }
        ]
      }
    } as AxiosResponse<RepositoryResponseType>)

    const wrapper = mount(Repositories)

    const store = useRepositoriesStore()
    const { query } = storeToRefs(store)

    query.value = 'Something'

    await nextTick()
    await store.searchRepositories()

    expect(wrapper.find('[data-testid="alert-title"]').exists()).toBeFalsy()
    expect(wrapper.findAll('[data-testid="repository"]')).toHaveLength(1)
  })
})
