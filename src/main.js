import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入基准值文件, 基准值: html字体大小
import '@/utils/register-vant'
import './styles/index.less'
import '@/utils/dayjs' // 引入日期处理文件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
