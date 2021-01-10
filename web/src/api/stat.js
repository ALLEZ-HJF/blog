import request from '@/utils/request'
// 访问记录
export function insertDayData() {
  return request({
    url: 'stat/insertDayData',
    method: 'post'
  })
}

export function getDayData() {
  return request({
    url: 'stat/getDayData',
    method: 'get'
  })
}

export function getSummaryData() {
  return request({
    url: 'stat/getSummaryData',
    method: 'get'
  })
}
