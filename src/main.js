import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入基准值文件, 基准值: html字体大小
import {
  Button,
  Switch
} from 'vant'

Vue
  .use(Button)
  .use(Switch)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
