import request from '@/utils/request'
// 用户组列表
export function getUserGroupList(data) {
  return request({
    url: 'userGroup/admin/getUserGroupList',
    method: 'post',
    data
  })
}

// 删除用户组
export function delUserGroup(data) {
  return request({
    url: 'userGroup/admin/delUserGroup',
    method: 'post',
    data
  })
}

// 修改用户组
export function editUserGroup(data) {
  return request({
    url: 'userGroup/admin/editUserGroup',
    method: 'post',
    data
  })
}

// 添加用户组
export function insertUserGroup(data) {
  return request({
    url: 'userGroup/admin/insertUserGroup',
    method: 'post',
    data
  })
}
