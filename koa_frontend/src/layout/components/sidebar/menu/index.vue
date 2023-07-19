<template>
  <div class="logo">
    <img src="/favicon.ico" />
  </div>
  <el-scrollbar>
    <el-menu :default-active="defaultActive" :collapse="isCollapse" router class="container">
      <sub-menu :menu="menu" v-for="menu in menuList" :key="menu.id"></sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNav } from '@/layout/hooks/useNav'
import SubMenu from './subMenu.vue'

const { isCollapse } = useNav()
const defaultActive = computed(() => useRoute().meta?.parentMenu || useRoute().name)

const menuList = [
  {
    id: 0,
    name: 'home',
    chineseName: '首页'
  },
  {
    id: 1,
    name: 'literature',
    chineseName: '文学',
    childMenu: [
      {
        id: 2,
        name: 'cartoon',
        chineseName: '动漫'
      },
      {
        id: 3,
        name: 'essay',
        chineseName: '散文随笔',
        childMenu: [
          {
            id: 4,
            name: 'youth_literature',
            chineseName: '青春文学'
          }
        ]
      },
      {
        id: 5,
        name: 'suspenseful_reasoning',
        chineseName: '悬疑推理',
        childMenu: [
          {
            id: 6,
            name: 'history',
            chineseName: '历史'
          },
          {
            id: 7,
            name: 'noval',
            chineseName: '小说',
            childMenu: [
              {
                id: 8,
                name: 'fiction',
                chineseName: '科幻'
              },
              {
                id: 9,
                name: 'martial_arts',
                chineseName: '武侠'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'psychology',
    chineseName: '心理学'
  }
]
</script>
<style lang="scss" scoped>
.logo {
  @include flex;
  height: 60px;
}
.el-scrollbar {
  height: calc(100% - 60px);
}
.container {
  user-select: none;
  &:not(.el-menu--collapse) {
    width: 210px;
  }
}
// 子菜单高亮时，使其父菜单也高亮
.el-menu ::v-deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--el-color-primary);
}
</style>
