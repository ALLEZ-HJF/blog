import request from '@/utils/request'
// 获取路由
export function getWebRouterList() {
  return request({
    url: 'routers/web/getWebRouterList',
    method: 'post'
  })
}
// 根据用户组获取后台路由
export function getAdminRouterList(data) {
  return request({
    url: 'routers/web/getAdminRouterList',
    method: 'post',
    data
  })
}
// 后台路由
export function getRouterList(data) {
  return request({
    url: 'routers/admin/getRouterList',
    method: 'post',
    data
  })
}

export function insertRouter(data) {
  return request({
    url: 'routers/admin/insertRouter',
    method: 'post',
    data
  })
}

export function editRouter(data) {
  return request({
    url: 'routers/admin/editRouter',
    method: 'post',
    data
  })
}

export function delRouter(data) {
  return request({
    url: 'routers/admin/delRouter',
    method: 'post',
    data
  })
}
