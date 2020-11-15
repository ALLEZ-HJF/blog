import request from '@/utils/request'
// 用户登录
export function uploadFile(data) {
  return request({
    url: 'upload/uploadFile',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    transformRequest: [() => {
      const formData = new FormData()
      formData.append('file', data.file)
      return formData
    }]
  })
}
