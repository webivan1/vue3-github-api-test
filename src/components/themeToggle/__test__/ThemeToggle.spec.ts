import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import ThemeToggle from '@/components/themeToggle/ThemeToggle.vue'
import { useThemeStore } from '@/components/themeToggle/useThemeStore'
import { ThemeEnum } from '@/components/themeToggle/enums/ThemeEnum'
import { nextTick } from 'vue'

describe('Components - ThemeToggle', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render dark button', () => {
    const wrapper = mount(ThemeToggle)

    expect(wrapper.findAllComponents('button')).toHaveLength(1)
    expect(wrapper.find('[data-testid="theme-light-btn"]').exists()).toBeTruthy()
  })

  it('should render light button', async () => {
    const store = useThemeStore()

    const wrapper = mount(ThemeToggle)

    store.changeTheme(ThemeEnum.DARK)

    await nextTick()

    expect(wrapper.findAllComponents('button')).toHaveLength(1)
    expect(wrapper.find('[data-testid="theme-dark-btn"]').exists()).toBeTruthy()
  })
})
