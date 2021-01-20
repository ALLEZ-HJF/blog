import request from '@/utils/request'
// 用户登录
export function login(data) {
  return request({
    url: 'users/web/login',
    method: 'post',
    data
  })
}

// 发送验证码验证
export function sendCode(data) {
  return request({
    url: 'users/web/sendCode',
    method: 'post',
    data
  })
}

// 用户列表
export function getUserList(data) {
  return request({
    url: 'users/admin/getUserList',
    method: 'post',
    data
  })
}

// 删除用户
export function delUser(data) {
  return request({
    url: 'users/admin/delUser',
    method: 'post',
    data
  })
}

// 编辑用户
export function editUser(data) {
  return request({
    url: 'users/web/editUser',
    method: 'post',
    data
  })
}

// 编辑用户
export function register(data) {
  return request({
    url: 'users/web/register',
    method: 'post',
    data
  })
}

// 作者排行榜
export function getUserRankingList(data) {
  return request({
    url: 'users/web/getUserRankingList',
    method: 'post',
    data
  })
}

// 获取用户详情
export function getUserInfo(data) {
  return request({
    url: 'users/web/getUserInfo',
    method: 'post',
    data
  })
}
