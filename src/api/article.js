// 文章相关接口
import request from '@/utils/request'

// 用户登录
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
