import request from '@/utils/request'
// 文章列表
export function getArticleList(data) {
  return request({
    url: 'articles/web/getArticleList',
    method: 'post',
    data
  })
}

// 根据分类id查文章
export function getArticleByCid(data) {
  return request({
    url: 'articles/web/getArticleByCid',
    method: 'post',
    data
  })
}

export function getArticleByAid(data) {
  return request({
    url: 'articles/web/getArticleByAid',
    method: 'post',
    data
  })
}

// 添加文章
export function insertArticle(data) {
  return request({
    url: 'articles/web/insertArticle',
    method: 'post',
    data
  })
}

// 删除文章
export function delArticle(data) {
  return request({
    url: 'articles/web/delArticle',
    method: 'post',
    data
  })
}

// 修改文章
export function editArticle(data) {
  return request({
    url: 'articles/web/editArticle',
    method: 'post',
    data
  })
}

// 添加浏览量
export function addArticleLookNum(data) {
  return request({
    url: 'articles/web/addArticleLookNum',
    method: 'post',
    data
  })
}

// 审核文章
export function adminArticleVerify(data) {
  return request({
    url: 'articles/admin/articleVerify',
    method: 'post',
    data
  })
}

// 文章列表
export function adminGetArticleList(data) {
  return request({
    url: 'articles/admin/getArticleList',
    method: 'post',
    data
  })
}

// 添加文章
export function adminInsertArticle(data) {
  return request({
    url: 'articles/admin/insertArticle',
    method: 'post',
    data
  })
}

// 删除文章
export function adminDelArticle(data) {
  return request({
    url: 'articles/admin/delArticle',
    method: 'post',
    data
  })
}

// 修改文章
export function adminEditArticle(data) {
  return request({
    url: 'articles/admin/editArticle',
    method: 'post',
    data
  })
}
