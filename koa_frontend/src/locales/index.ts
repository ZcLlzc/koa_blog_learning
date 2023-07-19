import { createI18n } from 'vue-i18n'
import { storageLocal } from '@/utils/storage'
import zhCn from './zh-cn'
import en from './en'

// 语言配置整合
const messages = {
  zhCn,
  en
}

// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: storageLocal.getItem('app')?.locale || 'zhCn',
  messages: messages
})

export default i18n
