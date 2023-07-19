<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group appear name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="index === levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)"> {{ item.meta.title }} </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'

const route = useRoute()
const router = useRouter()
const levelList = ref<RouteLocationMatched[]>([])

const handleLink = (item: RouteLocationMatched): any => {
  const { redirect, path } = item
  //是否设置重定向
  if (redirect) {
    router.push(redirect.toString())
    return
  }
  router.push(path)
}

const getBreadcrumb = () => {
  const matched = route.matched.filter((item) => item.name !== 'home' && item?.meta?.title)
  levelList.value = [
    {
      path: '/home',
      parentPath: '/',
      meta: { title: '首页' }
    } as unknown as RouteLocationMatched
  ].concat(matched)
}

getBreadcrumb()

watch(
  () => route.path,
  () => getBreadcrumb()
)
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  padding: 0 20px;
}
</style>
