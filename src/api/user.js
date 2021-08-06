import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/badminton/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/badminton/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/badminton/user/logout',
    method: 'post'
  })
}
