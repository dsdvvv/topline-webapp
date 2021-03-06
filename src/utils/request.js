// 封装axios请求模块
import axios from 'axios'
// 引入js后端返回数据超出 JS 安全整数范围问题文件
import jsonBig from 'json-bigint'
// 引入vuex文件
import store from '@/store'

// axios.create: 复制一个axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
// 配置处理后端返回数据超出js安全整数范围问题
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 统一添加token
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
