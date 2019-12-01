import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Test from '@/views/test/test.vue' // 测试页面
import Tabbar from '@/views/tabbar/tabbar.vue' // 首页

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 登录页面
  {
    path: '/login',
    component: Login
  },
  // 首页
  {
    path: '/',
    component: Tabbar
  },
  // 测试页面
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
