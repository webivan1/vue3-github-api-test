import { ThemeEnum } from '@/components/themeToggler/enums/ThemeEnum'
import { type InjectionKey, inject, type Ref } from 'vue'

export const THEME_KEY = Symbol() as InjectionKey<{ theme: Ref<ThemeEnum>, changeTheme: (theme: ThemeEnum) => void }>

export const useTheme = () => {
  return inject(THEME_KEY)
}
