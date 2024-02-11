import type { ThemeEnum } from '@/components/themeToggle/enums/ThemeEnum'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type ThemeButtonType = {
  theme: ThemeEnum
  icon: IconDefinition
  action: () => void
}
