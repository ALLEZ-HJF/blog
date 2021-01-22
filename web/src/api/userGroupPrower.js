import request from '@/utils/request'

export function getPowerByGid(data) {
  return request({
    url: 'userGroupPower/admin/getPowerByGid',
    method: 'post',
    data
  })
}

export function editPowerByGid(data) {
  return request({
    url: 'userGroupPower/admin/editPowerByGid',
    method: 'post',
    data
  })
}

