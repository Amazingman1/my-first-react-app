import request from '@/utils/request'

// 登陆
export function AddDepartment(data) {
  return request({
    url: `/department/add/`,
    method: 'post',
    data
  })
}