import request from '@/utils/request'
export function getRouters() {
  return request.get<object>('/getRouters')
}
