import request from '@/utils/request'

export function pageIntentOrderApi(query) {
  return request({
    url: '/website/intentOrder/page',
    method: 'get',
    params: query
  })
}

export function addIntentOrderApi(obj) {
  return request({
    url: '/website/intentOrder/add',
    method: 'post',
    data: obj
  })
}

export function getIntentOrderApi(id) {
  return request({
    url: '/website/intentOrder/get?id=' + id,
    method: 'get'
  })
}

export function delIntentOrderApi(id) {
  return request({
    url: '/website/intentOrder/delete?id=' + id,
    method: 'post'
  })
}

export function updateIntentOrderApi(obj) {
  return request({
    url: '/website/intentOrder/update',
    method: 'post',
    data: obj
  })
}

