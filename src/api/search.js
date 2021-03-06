/* 搜索联想建议接口 */
import request from '@/utils/request'

// 用户登录
export function getSuggestions (q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索结果
export function getSearch (params) {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
