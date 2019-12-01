import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录用户, 一个对象: 包含token信息
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新页面丢失state中的user状态, 将它放到本地存储中
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
