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

export namespace User {
  export interface UserInfoData {
    msg: string
    code: number
    permissions: string[]
    roles: string[]
    user: UserItem
  }

  export interface UserItem {
    createBy: string
    createTime: string
    updateBy: any
    updateTime: any
    remark: string
    params: Params
    userId: number
    deptId: number
    userName: string
    nickName: string
    email: string
    phonenumber: string
    sex: string
    avatar: string
    password: string
    status: string
    delFlag: string
    loginIp: string
    loginDate: string
    dept: Dept
    roles: Role[]
    roleIds: any
    postIds: any
    roleId: any
    admin: boolean
  }

  export interface Params {
    '@type': string
  }

  export interface Dept {
    createBy: any
    createTime: any
    updateBy: any
    updateTime: any
    remark: any
    params: Params2
    deptId: number
    parentId: number
    ancestors: string
    deptName: string
    orderNum: number
    leader: string
    phone: any
    email: any
    status: string
    delFlag: any
    parentName: any
    children: any[]
  }

  export interface Params2 {
    '@type': string
  }

  export interface Role {
    createBy: any
    createTime: any
    updateBy: any
    updateTime: any
    remark: any
    params: Params3
    roleId: number
    roleName: string
    roleKey: string
    roleSort: number
    dataScope: string
    menuCheckStrictly: boolean
    deptCheckStrictly: boolean
    status: string
    delFlag: any
    flag: boolean
    menuIds: any
    deptIds: any
    permissions: any
    admin: boolean
  }

  export interface Params3 {
    '@type': string
  }
}

export namespace Menu {
  export interface MenuData {
    msg: string
    code: number
    data: Daum[]
  }

  export interface Daum {
    name: string
    path: string
    hidden: boolean
    redirect: string
    component: string
    alwaysShow: boolean
    meta: Meta
    children: Children[]
  }

  export interface Meta {
    title: string
    icon: string
    noCache: boolean
    link: any
  }

  export interface Children {
    name: string
    path: string
    hidden: boolean
    component: string
    meta: Meta2
    redirect?: string
    alwaysShow?: boolean
    children?: Children2[]
  }

  export interface Meta2 {
    title: string
    icon: string
    noCache: boolean
    link: any
  }

  export interface Children2 {
    name: string
    path: string
    hidden: boolean
    component: string
    meta: Meta3
  }

  export interface Meta3 {
    title: string
    icon: string
    noCache: boolean
    link: any
  }
}
