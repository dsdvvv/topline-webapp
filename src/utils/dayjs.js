// 封装自定义dayjs日期处理模块
import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn' // 按需加载
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用西班牙语
// dayjs本身只处理日期格式化之类的核心功能
// 其他例如相对时间, 需要单独配置它自己的插件才可以使用
dayjs.extend(relativeTime)

// 扩展一个全局过滤器: 计算相对时间
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
