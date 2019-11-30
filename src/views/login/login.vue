<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 登录表单 -->
    <van-cell-group>
      <!-- 手机号 -->
      <van-field placeholder="请输入手机号" left-icon="contact" />

      <!-- 密码 -->
      <van-field type="password" placeholder="请输入密码" left-icon="bag-o" />
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="login-box">
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage', // 组件名称:便于调试
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () {},
  methods: {}
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
