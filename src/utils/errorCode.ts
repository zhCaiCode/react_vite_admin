// 错误码
export enum ErrorCode {
  // 认证失败,无法访问系统资源
  NOT_LOGIN = '401',
  // 当前操作没有权限
  NO_PERMISSION = '403',
  // "访问资源不存在"
  NO_EXIST = '404',
  DEFAULT = 'default'
}

interface HttpErrorMessages {
  [key: number]: string
  default: string
}
const errorCode: HttpErrorMessages = {
  [ErrorCode.NOT_LOGIN]: '认证失败，无法访问系统资源',
  [ErrorCode.NO_PERMISSION]: '当前操作没有权限',
  [ErrorCode.NO_EXIST]: '访问资源不存在',
  [ErrorCode.DEFAULT]: '系统未知错误，请反馈给管理员'
}

export default errorCode
