import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Test from '@/views/test/test.vue' // 测试页面
import Tabbar from '@/views/tabbar/tabbar.vue'
import Home from '@/views/home/home.vue'
import Search from '@/views/search/search.vue'
import SearchResult from '@/views/search-result'
import Article from '@/views/article/article.vue'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 登录页面
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  // 首页
  {
    path: '/',
    component: Tabbar,
    children: [
      // 首页子路由
      {
        name: 'home',
        path: '', // 默认子路由
        component: Home
      }
    ]
  },
  // 搜索
  {
    name: 'search',
    path: '/search',
    component: Search
  },
  {
    name: 'search-result',
    path: '/search/:q',
    component: SearchResult
  },
  {
    name: 'article',
    path: '/article',
    component: Article
  },
  // 测试页面
  {
    name: 'test',
    path: '/test',
    component: Test
  }
]

const router = new VueRouter({
  // 配置路由表
  routes
})

export default router
