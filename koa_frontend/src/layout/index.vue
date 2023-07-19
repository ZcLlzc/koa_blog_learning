<template>
  <el-container class="container">
    <el-aside>
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <div class="float-left">
          <!-- 菜单控制器 -->
          <Hamburger />
          <!-- 面包屑 -->
          <BreadCrumb />
        </div>
        <div class="float-right">
          <!-- 国际化 -->
          <Language />
          <!-- 设置 -->
          <Setting />
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from './components/sidebar/menu/index.vue'
import Hamburger from './components/sidebar/hamburger.vue'
import BreadCrumb from './components/sidebar/breadCrumb.vue'
import Language from './components/language/index.vue'
import Setting from './components/setting/index.vue'
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .el-header {
    @include flex(space-between);
    border-bottom: solid 1px var(--el-menu-border-color);
    .float-left {
      @include flex(flex-start);
    }
    .float-right {
      @include flex(flex-end);
    }
  }
  .el-aside {
    width: auto;
  }
}
</style>
