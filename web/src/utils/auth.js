export function getToken() {
  return window.localStorage.getItem('token')
}
export function setToken(token) {
  return window.localStorage.setItem('token', token)
}
export function removeToken() {
  return window.localStorage.removeItem('token')
}

// 用户详情
export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem('userInfo'))
}
export function setUserInfo(userInfo) {
  return window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
}
export function removeUserInfo() {
  return window.localStorage.removeItem('userInfo')
}
