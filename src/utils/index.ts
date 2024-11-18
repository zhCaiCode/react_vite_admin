/*
 * 工具函数封装
 */

import { NestedObject } from '@/types'

export function formatMoney(num: number) {
  return num.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

export function formatNumber(num: string | number) {
  const a = num.toString()
  let reg = /(\d)(?=(\d{3})+$)/g
  if (a.indexOf('.') > -1) {
    reg = /(\d)(?=(\d{3})+\.)/g
  }
  return a.replace(reg, '$1,')
}

export function formatDate(date?: Date, rules?: string) {
  let curDate = new Date()
  if (date) curDate = date
  interface OTypes {
    [key: string]: number
  }
  const o: OTypes = {
    'y+': curDate.getFullYear(),
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  let fmt = rules || 'yyyy-MM-dd HH:mm:ss'
  for (const key in o) {
    const val = o[key].toString()
    fmt = fmt.replace(new RegExp(`(${key})`), ('00' + val).substring(val.length))
  }
  return fmt
}
export function tansParams(params: NestedObject) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const params = propName + '[' + key + ']'
            const subPart = encodeURIComponent(params) + '='
            result += `${subPart} + ${encodeURIComponent(`${value[key]}`)} + &`
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}
