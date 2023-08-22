<template>
  <div class="sign-container">
    <div class="main">
      <div class="left-content"></div>
      <div class="right-content">
        <el-tabs v-model="activeName" class="demo-tabs" stretch @tab-click="handleClick">
          <el-tab-pane label="登录" name="first">
            <login></login>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <register></register>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import login from '@/views/components/login.vue'
import register from '@/views/components/register.vue'
import { ref } from 'vue'
const activeName = ref('first')

const handleClick = () => {
  console.log(1)
}
</script>
<style lang="scss" scoped>
.sign-container {
  @include flex;
  font-size: 14px;
  min-width: 900px;
  height: 100vh;
  text-align: center;

  .main {
    @include flex;
    box-sizing: border-box;
    width: 40%;
    height: 40%;
    padding: 50px 50px 30px;
    background: url('../assets/login.jpg') no-repeat center center;
    background-size: 100% 100%;
    border-radius: 4px;
    box-shadow: 0 0 8px rgb(0 0 0 / 10%);

    .left-content {
      width: 70%;
      height: 100%;
    }
    .right-content {
      width: 30%;
      height: 100%;
      padding: 30px 20px;
      background: rgba($color: #ffffff, $alpha: 0.8);
      .demo-tabs {
        :deep(.el-tabs__item) {
          padding: 0;
        }
      }
    }
  }
}
</style>
