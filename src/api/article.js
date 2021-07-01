import request from '@/utils/request'

export function fetchList(token) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    param: { token }
  })
}

export function fetchcomList(id) {
  return request({
    url: '/vue-element-admin/article/comlist',
    method: 'post',
    params: { id }
  })
}

export function fetchSubjectRate(id) {
  return request({
    url: '/vue-element-admin/article/subrate',
    method: 'post',
    params: { id }
  })
}
export function fetchAnalyse(id) {
  return request({
    url: '/vue-element-admin/article/analyse',
    method: 'post',
    params: { id }
  })
}
export function fetchDaily(token) {
  return request({
    url: '/vue-element-admin/article/daily',
    method: 'get',
    params: { token }
  })
}
export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

export function deleteList(taskID) {
  return request({
    url: '/vue-element-admin/article/delete',
    method: 'post',
    param: taskID
  })
}
