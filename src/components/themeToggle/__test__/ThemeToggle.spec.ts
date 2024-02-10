import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import ThemeToggle from '@/components/themeToggle/ThemeToggle.vue'
import { useThemeStore } from '@/components/themeToggle/useThemeStore'
import { ThemeEnum } from '@/components/themeToggle/enums/ThemeEnum'

describe('Components - ThemeToggle', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render dark button', () => {
    const wrapper = mount(ThemeToggle)

    expect(wrapper.findAllComponents('button')).toHaveLength(1)
    expect(wrapper.find('[data-testid="theme-dark-btn"]')).toBeDefined()
  })

  it('should render light button', () => {
    const store = useThemeStore()

    const wrapper = mount(ThemeToggle)

    store.changeTheme(ThemeEnum.DARK)

    expect(wrapper.findAllComponents('button')).toHaveLength(1)
    expect(wrapper.find('[data-testid="theme-light-btn"]')).toBeDefined()
  })
})
