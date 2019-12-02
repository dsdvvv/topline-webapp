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
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { login } from '@/api/user.js'

export default {
  name: 'LoginPage', // 组件名称:便于调试
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
        // mobile: '',
        // code: ''
      }
    }
  },
  computed: {},
  created () {},
  methods: {
    async onLogin () {
      // const loginToast = this.$toast.loading({
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(this.user)
        // res.data.data: 存储着token和refresh_token
        this.$store.commit('setUser', res.data.data)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
        // 登录成功跳转首页(home.vue)
        this.$router.push('/')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
