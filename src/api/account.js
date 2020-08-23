import request from '@/utils/request'

// 登陆
export function Login(data) {
  return request({
    url: `/login/`,
    method: 'post',
    data
  })
}