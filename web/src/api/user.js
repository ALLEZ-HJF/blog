import request from '@/utils/request'
// 用户登录
export function login(data) {
  return request({
    url: 'users/login',
    method: 'post',
    data
  })
}

// 发送验证码验证
export function sendCode(data) {
  return request({
    url: 'users/sendCode',
    method: 'post',
    data
  })
}

// 用户列表
export function getUserList(data) {
  return request({
    url: 'users/getUserList',
    method: 'post',
    data
  })
}

// 删除用户
export function delUser(data) {
  return request({
    url: 'users/delUser',
    method: 'post',
    data
  })
}

// 编辑用户
export function editUser(data) {
  return request({
    url: 'users/editUser',
    method: 'post',
    data
  })
}
