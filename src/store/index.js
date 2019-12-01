import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 如果window.localStorage.getItem('store-count')运算为true,则使用它
    // 如果window.localStorage.getItem('store-count')运算为fasle,则使用 || 后面的
    // count: Number(window.localStorage.getItem('store-count') || 5)
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
  },
  modules: {
  }
})
