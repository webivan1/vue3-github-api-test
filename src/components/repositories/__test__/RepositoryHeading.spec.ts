import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import RepositoryHeading from '@/components/repositories/RepositoryHeading.vue'

describe('Components - Repositories - RepositoryHeading', () => {
  it('should render text with dynamic count', () => {
    const wrapper = mount(RepositoryHeading, {
      props: {
        total: 345,
        loading: false
      }
    })

    expect(wrapper.findComponent('h3').text()).toContain('We found 345 repositories')
  })

  it('should render loading icon', () => {
    const wrapper = mount(RepositoryHeading, {
      props: {
        total: 0,
        loading: true
      }
    })

    expect(wrapper.findComponent('h3').text()).toContain('We found  repositories')
    expect(wrapper.find('.fa-spinner').exists()).toBeTruthy()
  })
})
