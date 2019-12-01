// 用户相关的请求模块
import request from '@/utils/request'

// 用户登录
export function login (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取用户频道列表
/*
  1.如果已登录: 获取用户频道列表
  2.如果未登录: 获取默认推荐的频道列表
*/
export function getUserChannels (data) {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
