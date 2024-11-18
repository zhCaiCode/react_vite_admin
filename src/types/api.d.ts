export interface ResponseResult {
  code: number
  msg: string
}

export interface RsultVerify extends ResponseResult {
  token: string
  img: string
  captchaEnabled: boolean
  uuid: string
}

export interface LoginResult extends ResponseResult {
  token: string
}
