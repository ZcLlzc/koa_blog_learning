<template>
  <el-form :model="formData" :rules="formRules" ref="loginForm" class="login-form" status-icon>
    <el-form-item prop="username">
      <el-input type="text" v-model="formData.username" autocomplete="off" placeholder="您的账号">
        <template #prefix>
          <el-icon color="#409EFC"><i-ep-user /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="formData.password"
        autocomplete="off"
        placeholder="登录密码"
      >
        <template #prefix>
          <el-icon color="#409EFC"><i-ep-lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="captchaCode">
      <el-input
        type="text"
        v-model="formData.captchaCode"
        autocomplete="off"
        placeholder="图形验证码"
      >
        <template #prefix>
          <el-icon color="#409EFC"><i-ep-key></i-ep-key></el-icon>
        </template>
        <template #append>
          <img
            class="captcha"
            :src="captchaData.captchaImage"
            @click="refreshCaptcha"
            width="100"
          />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" round class="btn-login" @click="loginHandler"> 登 录 </el-button>
      <router-link to="/sign/register" class="msg-login"> 还没账号？免费注册 </router-link>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

// 状态：表单数据
const formData = reactive({
  username: '',
  password: '',
  captchaCode: ''
})

// 表单验证规则
const formRules = {
  username: { required: true, trigger: 'blur', message: '账号是必填项' },
  password: { required: true, trigger: 'blur', message: '密码是必填项' },
  captchaCode: { required: true, trigger: 'blur', message: '验证码是必填项' }
}

// 状态：验证码数据
const captchaData = reactive({
  captchaKey: '', // 验证码唯一识别
  captchaImage: '' // 验证码图片
})

// 状态：表单组件的引用（注意变量名要和组件标签的 ref 值相同）
const loginForm = ref<any>(null)

// 函数：刷新验证码数据
const refreshCaptcha = async () => {
  // TODO：请求并获取图形验证码数据
}

// 事件：点击登录按钮
const loginHandler = async () => {
  // TODO：登录逻辑
}
</script>
<style lang="scss" scoped>
.btn-login {
  width: 100%;
}
.msg-login {
  margin: 10px 0;
  padding: 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #969696;
}
.captcha {
  cursor: pointer;
}
:deep(.el-icon) {
  height: 40px;
  line-height: 40px;
}
</style>
