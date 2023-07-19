<template>
  <el-config-provider :locale="app.locale === 'zhCn' ? zhCn : en">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useAppStoreHook } from '@/store/modules/app'
import { changeTheme } from '@/layout/hooks/useTheme'

const app = useAppStoreHook()
changeTheme(app.color)
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
