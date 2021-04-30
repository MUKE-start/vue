import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: 'localhost:8888/addProduct',
    method: 'post',
    data
  })
}
