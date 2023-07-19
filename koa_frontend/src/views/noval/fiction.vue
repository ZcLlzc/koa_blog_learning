<template>
  <div>科幻</div>
  <el-button @click="goDetail">去详情</el-button>
</template>

<script setup lang="ts">
import router from '@/router'
const goDetail = () => {
  router.push('fictionDetail')
}
</script>
