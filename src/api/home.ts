import request from '@/utils/request'
export function getData(data: object) {
  return request.post<object>('/users/login', data)
}
