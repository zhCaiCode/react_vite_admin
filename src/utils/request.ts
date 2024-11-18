import { message } from 'antd'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { hideLoading, showLoading } from './loading'
import { getToken } from './auth'
import { tansParams } from '.'
import cache from '@/plugins/cache'

// 是否显示重新登录
export const isRelogin = { show: false }

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

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

    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false

    // if (env.mock) {
    //   config.baseURL = env.mockApi;
    // } else {
    //   config.baseURL = env.baseApi;
    // }
    if (config.showLoading) showLoading()
    // const token = localStorage.getItem('token')
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      }
      const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
      const limitSize = 5 * 1024 * 1024 // 限制存放数据5M
      if (requestSize >= limitSize) {
        console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
        return config
      }
      const sessionObj = cache.session.getJSON('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj)
      } else {
        const s_url = sessionObj.url // 请求地址
        const s_data = sessionObj.data // 请求数据
        const s_time = sessionObj.time // 请求时间
        const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交'
          console.warn(`[${s_url}]: ` + message)
          return Promise.reject(new Error(message))
        } else {
          cache.session.setJSON('sessionObj', requestObj)
        }
      }
    }
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
