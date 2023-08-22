<template>
  <el-form :model="formData" :rules="formRules" ref="registerForm" class="login-form" status-icon>
    <!-- 用户名 -->
    <el-form-item prop="username">
      <el-input type="text" v-model="formData.username" autocomplete="off" placeholder="您的账号">
        <template #prefix>
          <el-icon color="#409EFC"><i-ep-user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="formData.password"
        autocomplete="off"
        placeholder="设置密码"
      >
        <template #prefix>
          <el-icon color="#409EFC"><i-ep-lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item prop="nickname">
      <el-input type="text" v-model="formData.nickname" autocomplete="off" placeholder="您的昵称">
        <template #prefix>
          <el-icon color="#409EFC"><i-ep-collection /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" round class="btn-register" @click="registerHandler">
        注 册
      </el-button>
      <router-link to="/sign/login" class="msg-register"> 已有账号？去登录 </router-link>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { register } from '@/apis/auth'
import { message, messageBox } from '@/utils/message'

// 状态：表单数据
const formData = reactive({
  username: '',
  password: '',
  nickname: ''
})

// 表单验证规则
const formRules = {
  username: { required: true, trigger: 'blur', message: '账号是必填项' },
  password: { required: true, trigger: 'blur', message: '密码是必填项' },
  nickname: { required: true, trigger: 'blur', message: '昵称是必填项' }
}

// 状态：表单组件的引用
const registerForm = ref<any>(null)

// 事件监听：点击注册按钮
const registerHandler = async () => {
  try {
    // 校验
    await registerForm.value.validate()
    let res = await register(formData)
    // 成功提示
    if (res.data.code === 200) {
      messageBox({ title: '消息', message: '账号注册成功，前往登录', type: 'success' })
    }
    // 跳转到登录页
  } catch (error) {
    message({ message: '注册失败!', type: 'error' })
  }
}
</script>
<style lang="scss" scoped>
.btn-register {
  width: 100%;
}
.msg-register {
  margin: 10px 0;
  padding: 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #969696;
}
:deep(.el-icon) {
  height: 40px;
  line-height: 40px;
}
</style>
