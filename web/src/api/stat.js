import request from '@/utils/request'
// 访问记录
export function insertDayData() {
  return request({
    url: 'stat/web/insertDayData',
    method: 'post'
  })
}

export function getDayData() {
  return request({
    url: 'stat/admin/getDayData',
    method: 'get'
  })
}

export function getSummaryData() {
  return request({
    url: 'stat/admin/getSummaryData',
    method: 'get'
  })
}
