import request from '@/utils/request'
// 草稿列表
export function getDraftArticleList(params) {
  return request({
    url: 'draftArticles/web/getDraftArticleList',
    method: 'get',
    params
  })
}

export function getDraftArticleInfo(params) {
  return request({
    url: 'draftArticles/web/getDraftArticleInfo',
    method: 'get',
    params
  })
}
// 添加草稿
export function insertDraftArticle(data) {
  return request({
    url: 'draftArticles/web/insertDraftArticle',
    method: 'post',
    data
  })
}

// 修改草稿
export function editDraftArticle(data) {
  return request({
    url: 'draftArticles/web/editDraftArticle',
    method: 'post',
    data
  })
}

// 删除草稿
export function delDraftArticle(data) {
  return request({
    url: 'draftArticles/web/delDraftArticle',
    method: 'post',
    data
  })
}
