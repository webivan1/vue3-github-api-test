import { describe, expect, it } from 'vitest'
import LoadMoreBtn from '@/components/repositories/LoadMoreBtn.vue'
import { mount } from '@vue/test-utils'

describe('Components - Repositories - LoadMoreBtn', () => {
  it('should emit event click', async () => {
    const wrapper = mount(LoadMoreBtn, {
      props: {
        loading: false
      }
    })

    await wrapper.findComponent('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('loadMore')
  })

  it('should display loading icon', async () => {
    const wrapper = mount(LoadMoreBtn, {
      props: {
        loading: true
      }
    })

    expect(wrapper.find('button[disabled]').exists()).toBeTruthy()
    expect(wrapper.find('.fa-spinner').exists()).toBeTruthy()
  })
})
