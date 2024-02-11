import { mount } from '@vue/test-utils'
import axios from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import SearchInput from '@/components/searchInput/SearchInput.vue'

describe('Components - SearchInput', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.clearAllMocks()
  })

  it('should be empty', () => {
    const wrapper = mount(SearchInput)

    const input = wrapper.findComponent('input').element as HTMLInputElement

    expect(input).toBeInstanceOf(HTMLInputElement)
    expect(input.value).toEqual('')
    expect(wrapper.find('[data-testid="reset-input"]').exists()).toBeFalsy()
  })

  it('should call api request', async () => {
    const mockApi = vi.spyOn(axios, 'get').mockResolvedValueOnce([])

    const wrapper = mount(SearchInput)

    await wrapper.findComponent('input').setValue('Test input')

    const input = wrapper.findComponent('input').element as HTMLInputElement

    expect(input.value).toEqual('Test input')

    await vi.runAllTimersAsync()

    expect(mockApi).toHaveBeenCalledOnce()
    expect(wrapper.find('[data-testid="reset-input"]').exists()).toBeTruthy()
  })
})
