import { message } from 'antd'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { hideLoading, showLoading } from './loading'
// import env from "@/config";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 30000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true, // 跨域
  headers: {
    icode: ''
  }
})

instance.interceptors.request.use(
  config => {
    if (import.meta.env.VITE_MOCK === 'true') {
      config.baseURL = import.meta.env.VITE_MOCK_API
    }
    // if (env.mock) {
    //   config.baseURL = env.mockApi;
    // } else {
    //   config.baseURL = env.baseApi;
    // }
    if (config.showLoading) showLoading()
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = 'Token::' + token
    config.headers.icode = 'A7EEA094EAA44AF4'
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    hideLoading()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(response => {
  hideLoading()
  const data = response.data
  if (data.code === 500001) {
    message.error(data.msg)
    localStorage.removeItem('token')
    location.href = '/login?callback=' + encodeURIComponent(location.href)
  } else if (data.code < 1) {
    hideLoading()
    if (response.config.showError === true) {
      message.error(data.msg)
      return Promise.reject(data.msg)
    } else {
      return Promise.resolve(data)
    }
  }
  return data
})
export default {
  get<T>(
    url: string,
    params?: object,
    options: AxiosRequestConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, data: object, options: AxiosRequestConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, data, options)
  }
}
