import request from '@/utils/request'

// 登陆
export function AddDepartment(data) {
  return request({
    url: `/department/add/`,
    method: 'post',
    data
  })
}

// 获取
export function GetDepartmentApi(data) {
  return request({
    url: `/department/list/`,
    method: 'post',
    data
  })
}

// 禁用启用 /department/status/
export function ChangeStatustApi(data) {
  return request({
    url: `/department/status/`,
    method: 'post',
    data
  })
}