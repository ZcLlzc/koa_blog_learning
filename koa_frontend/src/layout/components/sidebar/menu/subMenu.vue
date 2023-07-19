<template>
  <el-sub-menu :index="menu.name" v-if="menu.childMenu">
    <template #title>
      <el-icon><i-ep-menu /></el-icon>
      <span>{{ app.locale === 'en' ? menu.name : menu.chineseName }}</span>
    </template>
    <sub-menu :menu="menuItem" v-for="menuItem in menu.childMenu" :key="menuItem.id"></sub-menu>
  </el-sub-menu>
  <el-menu-item :index="menu.name" v-else>
    <el-icon><i-ep-menu /></el-icon>
    <template #title>{{ app.locale === 'en' ? menu.name : menu.chineseName }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { useAppStoreHook } from '@/store/modules/app'

const app = useAppStoreHook()

interface Menu {
  id: number
  name: string
  chineseName: string
  childMenu?: Menu[] | undefined
}

defineProps<{
  menu: Menu
}>()
</script>
