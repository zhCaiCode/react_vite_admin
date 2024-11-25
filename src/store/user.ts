import { getToken, removeToken } from '@/utils/auth'
import { getUserInfo, logout } from '@/api/user'
import { message } from '@/utils/AntdGlobal'
import defAva from '@/assets/images/profile.jpg'
import { createStore } from './createStore'

export interface UserState {
  name: string
  token: string | undefined
  avatar: string
  roles: any[]
  permissions: any[]
}
export const [userStore, useUser] = createStore<UserState>({
  token: getToken(),
  name: '',
  avatar: '',
  roles: [] as any,
  permissions: [] as any
})

export const getInfo = async () => {
  try {
    const res = await getUserInfo()
    if (res.code === 200) {
      const data = res
      const user = data.user
      const avatar = user.avatar == '' || user.avatar == null ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar
      if (data.roles && data.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        userStore.roles = data.roles
        userStore.permissions = data.permissions
      } else {
        userStore.roles = ['ROLE_DEFAULT']
      }
      userStore.name = user.userName
      userStore.avatar = avatar
    }
    console.log('获取用户信息成功...', res.user)
    return res
  } catch (error) {
    console.log(error)
    message.error('获取用户信息失败')
    throw new Error('获取用户信息失败，' + error)
  }
}

export const userLogout = async () => {
  try {
    await logout()
    userStore.token = ''
    userStore.roles = []
    userStore.permissions = []
    removeToken()
  } catch (e) {
    message.error('退出登录失败')
    throw new Error('退出登录失败，' + e)
  }
}
