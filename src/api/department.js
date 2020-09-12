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
// 删除/批量删除 /department/delete/
export function DeleteDepartmentApi(data) {
  return request({
    url: `/department/delete/`,
    method: 'post',
    data
  })
}
// 部门详情
export function DetailedApi(data) {
  return request({
    url: `/department/detailed/`,
    method: 'post',
    data
  })
}

// 部门编辑
export function EditdApi(data) {
  return request({
    url: `/department/edit/`,
    method: 'post',
    data
  })
}
