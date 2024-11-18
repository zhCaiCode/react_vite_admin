import axios from 'axios'
export interface ExtractAxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}
declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}
