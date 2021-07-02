import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'post',
    params: query
  })
}
export function createTask(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateTask(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
export function deleteTask(id) {
  return request({
    url: '/vue-element-admin/article/delete',
    method: 'delete',
    id
  })
}
