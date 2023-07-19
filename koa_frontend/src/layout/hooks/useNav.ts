import { computed } from 'vue'
import { useAppStoreHook } from '@/store/modules/app'

const app = useAppStoreHook()
const toggleSideBar = app.TOGGLE_SIDEBAR
const isCollapse = computed(() => {
  return !app.getSidebarStatus
})

export function useNav() {
  return {
    toggleSideBar,
    isCollapse
  }
}
