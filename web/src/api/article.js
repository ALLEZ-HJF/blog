import request from '@/utils/request'
// 文章列表
export function getArticleList(data) {
  return request({
    url: 'articles/getArticleList',
    method: 'post',
    data
  })
}

// 根据分类id查文章
export function getArticleByCid(data) {
  return request({
    url: 'articles/getArticleByCid',
    method: 'post',
    data
  })
}

export function getArticleByAid(data) {
  return request({
    url: 'articles/getArticleByAid',
    method: 'post',
    data
  })
}

// 添加文章
export function insertArticle(data) {
  return request({
    url: 'articles/insertArticle',
    method: 'post',
    data
  })
}

// 删除文章
export function delArticle(data) {
  return request({
    url: 'articles/delArticle',
    method: 'post',
    data
  })
}

// 修改文章
export function editArticle(data) {
  return request({
    url: 'articles/editArticle',
    method: 'post',
    data
  })
}

// 审核文章
export function articleVerify(data) {
  return request({
    url: 'articles/articleVerify',
    method: 'post',
    data
  })
}

// 添加浏览量
export function addArticleLookNum(data) {
  return request({
    url: 'articles/addArticleLookNum',
    method: 'post',
    data
  })
}
