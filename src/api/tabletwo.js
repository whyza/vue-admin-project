
import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: 'https://easy-mock.com/mock/5c243a9570af3b2779c46365/example/getUser',
    method: 'get',
    params
  })
}

export function getUserInfo(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function deleteUser(url,params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
