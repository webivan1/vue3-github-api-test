import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { ThemeEnum } from '@/components/themeToggle/enums/ThemeEnum'
import { useThemeStore } from '@/components/themeToggle/useThemeStore'

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should return a default theme', () => {
    const store = useThemeStore()

    expect(store.theme).toEqual(ThemeEnum.LIGHT)
    expect(typeof store.changeTheme).toEqual('function')
  })

  it('should change theme', () => {
    const store = useThemeStore()

    store.changeTheme(ThemeEnum.DARK)

    expect(store.theme).toEqual(ThemeEnum.DARK)
  })
})
