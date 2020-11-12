import request from '@/utils/request'
// 获取分类列表
export function getCategoryList(data) {
  return request({
    url: 'category/getCategoryList',
    method: 'post',
    data
  })
}

// 删除分类
export function delCategory(data) {
  return request({
    url: 'category/delCategory',
    method: 'post',
    data
  })
}

// 修改分类
export function editCategory(data) {
  return request({
    url: 'category/editCategory',
    method: 'post',
    data
  })
}

// 添加分类
export function insertCategory(data) {
  return request({
    url: 'category/insertCategory',
    method: 'post',
    data
  })
}
