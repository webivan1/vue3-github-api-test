import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { RepositoryType } from '@/components/repositories/types/RepositoryType'
import Repository from '@/components/repositories/Repository.vue'

describe('Components - Repositories - Repository', () => {
  const repositories = [
    {
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
    },
    {
      owner: {
        avatar_url: 'test url 2'
      },
      stargazers_count: 55,
      open_issues_count: 0,
      license: {
        spdx_id: 'TEST 2'
      },
      html_url: 'test url 2',
      topics: ['Python', 'PHP', 'GO', 'Rust', 'Java', 'NodeJS'],
      full_name: 'Mr Test 2',
      description: 'Some description'
    }
  ] as RepositoryType[]

  repositories.forEach((item) => {
    it(`should render repository ${item.full_name}`, () => {
      const wrapper = mount(Repository, {
        props: { item }
      })

      expect(wrapper.find('img').element.getAttribute('src')).toEqual(item.owner.avatar_url)
      expect(wrapper.find('[data-testid="title"]').text()).toContain(item.full_name)
      expect(wrapper.find('[data-testid="description"]').text()).toContain(item.description)
      expect(wrapper.find('[data-testid="stars"]').text()).toContain(item.stargazers_count)
      expect(wrapper.find('[data-testid="issues"]').text()).toContain(item.open_issues_count)
      expect(wrapper.find('a').element.getAttribute('href')).toEqual(item.html_url)

      if (item.license) {
        expect(wrapper.find('[data-testid="license"]').text()).toContain(item.license.spdx_id)
      }

      if (item.disabled || item.archived) {
        expect(wrapper.find('[data-testid="disabled"]').exists()).toBeTruthy()
      }
    })
  })
})
