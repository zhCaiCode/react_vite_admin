import { message } from './AntdGlobal'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CustomAxiosRequestConfig } from 'axios'
import { hideLoading, showLoading } from './loading'
import { getToken } from './auth'
import { blobValidate, tansParams } from '.'
import cache from '@/plugins/cache'
import errorCode from '@/utils/errorCode'
import storage from './storage'
import { NestedObject } from '@/types'
import { saveAs } from 'file-saver'
import { ErrorResponse } from '@/types/axios'
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

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    hideLoading()
    const code: number = response.data.code || 200
    const msg = response?.data?.msg || errorCode[`${code}`] || errorCode['default']
    // 二进制数据则直接返回
    // prettier-ignore
    if (response.request.responseType === "blob" || response.request.responseType === "arraybuffer") {
			return response.data;
		}
    const data = response.data
    if (code === 401) {
      // hideLoading()
      if (!isRelogin.show) {
        message.error(msg)
        storage.remove('token')
        // 如果store 有存用户信息 把store信息清除下，并且调用接口
        // useUserStore().logOut().then(() => {
        //                 location.href = "/index";
        //             });
        // location.href = '/login?callback=' + encodeURIComponent(location.href)
      }
      // prettier-ignore
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      message.error(msg)
      return Promise.reject(new Error(msg || 'Error'))
    } else if (code !== 200) {
      message.error(msg)
      return Promise.reject(data)
    } else {
      return data
    }
  },
  error => {
    console.log('err', error)
    let msg = error.message || 'error'
    if (msg == 'Network Error') {
      msg = '后端接口连接异常'
    } else if (msg.includes('timeout')) {
      msg = '系统接口请求超时'
    } else if (msg.includes('Request failed with status code')) {
      msg = '系统接口' + msg.substr(msg.length - 3) + '异常'
    }
    message.error(msg)
    return Promise.reject(error)
  }
)

export const download = async (url: string, params: NestedObject, filename: string): Promise<void> => {
  // prettier-ignore
  // const downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", spinner: "loading", background: "rgba(0, 0, 0, 0.7)", });
  showLoading()
  try {
    const config: CustomAxiosRequestConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob'
    }
    let req: AxiosResponse<Blob>

    if (params) {
      req = await instance.post<Blob>(url, params, {
        transformRequest: [
          params => {
            return tansParams(params)
          }
        ],
        ...config
      })
    } else {
      req = await instance.get<Blob>(url, config)
    }
    const blobData = req.data
    const isLogin = await blobValidate(blobData)

    if (isLogin) {
      const blob = new Blob([blobData])

      saveAs(blob, filename)
      console.log('%s ====>>>导出成功', filename)
    } else {
      const resText = await blobData.text()
      const rspObj = JSON.parse(resText) as ErrorResponse
      // prettier-ignore
      const errMsg = errorCode[`${rspObj.code}`] || rspObj.msg || errorCode['default']
      message.error(errMsg)
    }
  } catch (error) {
    console.error(error)
    message.error('下载文件出现错误，请联系管理员！')
  } finally {
    hideLoading()
  }
}

export default {
  get<T>(
    url: string,
    params?: object,
    options: AxiosRequestConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(
    url: string,
    data?: object,
    options: AxiosRequestConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.post(url, data, options)
  }
}
