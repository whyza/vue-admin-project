import request from '@/utils/request'

export function getMovieList(url,params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
