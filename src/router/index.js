import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Test from '@/views/test/test.vue'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 登录页面
  {
    path: '/login',
    component: Login
  },
  {
    path: '/test',
    component: Test
  }
]

const router = new VueRouter({
  // 配置路由表
  routes
})

export default router
