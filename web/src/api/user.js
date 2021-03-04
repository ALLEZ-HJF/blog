import request from '@/utils/request'
import qs from 'qs'

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

// 添加管理员账号
export function addUser(data) {
  return request({
    url: 'users/admin/addUser',
    method: 'post',
    data
  })
}

// 修改用户后台
export function updateUser(data) {
  return request({
    url: 'users/admin/updateUser',
    method: 'post',
    data,
    transformRequest: [(data) => {
      for (const key in data) {
        if (data[key] === '') {
          delete data[key]
        }
      }
      if (data) {
        return qs.stringify(data)
      }
    }]
  })
}

// 忘记密码
export function forgetPassword(data) {
  return request({
    url: 'users/web/forgetPassword',
    method: 'post',
    data
  })
}