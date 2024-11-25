import { LoginResult, RsultVerify, User } from '@/types/api'
import request from '@/utils/request'

export function login(data: object) {
  return request.post<LoginResult>('/login', data, { showLoading: false })
}
export function logout() {
  return request.post<LoginResult>('/logout')
}
export function getCodeImg(params?: object) {
  return request.get<RsultVerify>('/captchaImage', params, {
    headers: {
      isToken: false,
      noLoading: true
    }
  })
}

export const getUserInfo = () => {
  return request.get<User.UserInfoData>('/getInfo')
}
