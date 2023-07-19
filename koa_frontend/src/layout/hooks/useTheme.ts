import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useAppStoreHook } from '@/store/modules/app'

const app = useAppStoreHook()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const themeColor = computed(() => app.color)
const themeList = [
  '#0960BD',
  '#0084F4',
  '#009688',
  '#536DF3',
  '#FF5C93',
  '#EE4F12',
  '#0096C7',
  '#9C27B0',
  '#FF9800'
]
const changeTheme = (color: string) => {
  if (!color) return
  const el = document.documentElement
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color)
  useAppStoreHook().SET_COLOR(color)
}

export { isDark, toggleDark, themeColor, themeList, changeTheme }
