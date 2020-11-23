import request from '@/utils/request'

// 添加评论
export function insertReply(data) {
  return request({
    method: 'post',
    url: 'replys/insertReply',
    data
  })
}

// 删除评论
export function delReply(data) {
  return request({
    method: 'post',
    url: 'replys/delReply',
    data
  })
}
