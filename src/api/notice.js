import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/test',
    method: 'post',
    params: query
  })
}

