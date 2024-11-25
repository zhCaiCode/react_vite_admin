import axios from 'axios'
declare module 'axios' {
  export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
    isToken?: boolean
    repeatSubmit?: boolean
  }
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}

export interface ApiResponse<T = unknown> {
  code: number
  msg: string
  data: T
}

export interface ErrorCodeMap {
  [key: string]: string
  default: string
}
export interface BlobLike {
  text(): Promise<string>
}
export interface DownloadResponse extends Blob {
  text(): Promise<string>
}

export interface ErrorResponse {
  code: number
  msg: string
}