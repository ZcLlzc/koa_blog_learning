<template>
  <el-icon class="icon-hover" @click="drawer = true"><i-ep-setting /></el-icon>

  <el-drawer v-model="drawer" :title="$t('txts.projectConfiguration')" direction="rtl">
    <template #default>
      <el-divider> 主题 </el-divider>
      <el-switch v-model="isDark" active-text="深色" inactive-text="浅色" @change="toggleDark" />
      <el-divider> 主题色 </el-divider>
      <div class="checkbox-row">
        <div
          class="checkbox-item"
          v-for="(item, index) in themeList"
          :key="index"
          :class="{ active: item === themeColor }"
          :style="{ backgroundColor: item }"
          @click="changeThemeColor(item)"
        ></div>
        <el-color-picker v-model="color" @active-change="changeThemeColor" />
      </div>
    </template>
    <template #footer>
      <el-button @click="logout" :auto-insert-space="true">{{ $t('buttons.logout') }}</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toggleDark, isDark, themeColor, themeList, changeTheme } from '@/layout/hooks/useTheme'
import { storageLocal } from '@/utils/storage'

const router = useRouter()
const drawer = ref(false)
const logout = () => router.push('login')
const color = ref(themeColor)
const changeThemeColor = (color: string) => {
  changeTheme(color)
  storageLocal.setObjItem('app', { color })
}
</script>
<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
}
.el-switch {
  display: block;
  width: 100%;
  text-align: center;
}
.el-button {
  width: 100%;
}
.checkbox-row {
  @include flex;
  .checkbox-item {
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 2px;
    cursor: pointer;
    position: relative;

    &.active {
      &::before {
        content: '\2713';
        font-size: 14px;
        color: #fff;
        position: absolute;
        top: -1px;
        left: 3px;
      }
    }
  }
}
</style>
