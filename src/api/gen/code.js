import request from '@/utils/request'

export const fetchTableList = (param) => {
  return request({
    url: '/gen/code/page',
    method: 'get',
    params: param
  })
}

export const exportCodeZip = (param) => {
  return request({
    url: '/gen/code/build',
    method: 'post',
    data: param,
    responseType: 'blob'
  })
}

export const buildCodeAll = (param) => {
  return request({
    url: '/gen/code/buildall',
    method: 'post',
    data: param
  })
}
