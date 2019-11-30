<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 登录表单 -->
    <van-cell-group>
      <!-- 手机号 -->
      <van-field v-model="user.mobile" placeholder="请输入手机号" left-icon="contact" />

      <!-- 密码 -->
      <van-field v-model="user.code" type="password" placeholder="请输入验证码" left-icon="bag-o" />
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="login-box">
      <van-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="onLogin"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
// import {login} from '@/api/user.js'

export default {
  name: 'LoginPage', // 组件名称:便于调试
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  computed: {},
  created () {},
  methods: {
    async onLogin () {
      try {
        const res = await request({
          method: 'POST',
          url: '/app/v1_0/authorizations',
          data: this.user
        })
        console.log('登录成功', res)
      } catch (error) {
        console.log('登录失败', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
    padding: 20px;
    .van-button {
        width: 100%
    }
}
</style>
