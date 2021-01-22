import request from '@/utils/request'

export function getResourceList(data) {
  return request({
    url: 'resources/admin/getResourceList',
    method: 'post',
    data
  })
}

export function delResource(data) {
  return request({
    url: 'resources/admin/delResource',
    method: 'post',
    data
  })
}

