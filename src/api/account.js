import request from '@/utils/request'

// 登陆
export function Login(data) {
  return request({
    url: `/login/`,
    method: 'post',
    data
  })
}
// 获取验证码
export function GetCodeApi(data) {
  return request({
    url: `/getSms/`,
    method: 'post',
    data
  })
}
// 注册
export function RegisterApi(data) {
  return request({
    url: `/register/`,
    method: 'post',
    data
  })
}