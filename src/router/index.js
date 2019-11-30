import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  // 配置路由表
  routes
})

export default router
