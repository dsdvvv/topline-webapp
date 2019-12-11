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

// 获取文章详情
export function getArticle (articleId) {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 文章点赞
export function addLike (articleId) {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

// 取消文章点赞
export function deleteLike (articleId) {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
