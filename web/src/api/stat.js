import request from '@/utils/request'
// 访问记录
export function insertDayData() {
  return request({
    url: 'stat/web/insertDayData',
    method: 'post'
  })
}

export function getVisitData(params) {
  return request({
    url: 'stat/admin/getVisitData',
    method: 'get',
    params
  })
}

export function getSummaryData() {
  return request({
    url: 'stat/admin/getSummaryData',
    method: 'get'
  })
}

// 访问列表
export function getVisitDataList(data) {
  return request({
    url: 'stat/admin/getVisitDataList',
    method: 'post',
    data
  })
}
