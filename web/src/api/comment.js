import request from '@/utils/request'

// 根据文章id获取评论列表
export function getCommentByAid(data) {
  return request({
    method: 'post',
    url: 'comments/getCommentByAid',
    data
  })
}

// 添加评论
export function insertComment(data) {
  return request({
    method: 'post',
    url: 'comments/insertComment',
    data
  })
}

// 删除评论
export function delComment(data) {
  return request({
    method: 'post',
    url: 'comments/delComment',
    data
  })
}
