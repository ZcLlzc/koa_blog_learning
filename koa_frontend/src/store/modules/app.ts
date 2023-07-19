import { defineStore } from 'pinia'
import { store } from '@/store'
import i18n from '@/locales'
import { storageLocal } from '@/utils/storage'
import { appType } from './types'

const useAppStore = defineStore('app', {
  state: (): appType => {
    const app = storageLocal.getItem('app')
    const el = document.documentElement
    const themeColor = getComputedStyle(el).getPropertyValue(`--el-color-primary`)
    return {
      sidebar: {
        opened: true
      },
      locale: app?.locale || 'zhCn',
      color: app?.color || themeColor
    }
  },
  getters: {
    getSidebarStatus(): boolean {
      return this.sidebar.opened
    }
  },
  actions: {
    TOGGLE_SIDEBAR() {
      this.sidebar.opened = !this.sidebar.opened
    },
    SET_LOCALE(locale: string) {
      this.locale = locale
      i18n.global.locale.value = locale
      storageLocal.setObjItem('app', { locale })
    },
    SET_COLOR(color: string) {
      this.color = color
      storageLocal.setObjItem('app', { color })
    }
  }
})

export function useAppStoreHook() {
  return useAppStore(store)
}
