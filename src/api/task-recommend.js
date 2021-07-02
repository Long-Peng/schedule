import request from '@/utils/request'

export function fetchTheme(query) {
  return request({
    url: '/t',
    method: 'post',
    params: query
  })
}
export function addTask(query) {
  return request({
    url: '/t',
    method: 'post',
    params: query
  })
}
