import { memo } from 'react'
import type { ReactNode, FC } from 'react'
import styles from './index.module.less'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, MenuProps, Space, Switch } from 'antd'

import { userLogout, useUser } from '@/store'
import { Link } from 'react-router-dom'
interface Iprops {
  children?: ReactNode
}
const items: MenuProps['items'] = [
  {
    key: 'profile',
    label: <Link to='/user/profile'>个人中心</Link>
  },
  {
    key: 'logout',
    label: '退出登录'
  }
]
const onClick: MenuProps['onClick'] = async ({ key }) => {
  try {
    if (key === 'logout') {
      await userLogout()
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
    if (key === 'profile') {
    }
  } catch (e) {
    console.log(e)
  }
}
const NavHeader: FC<Iprops> = () => {
  const { name } = useUser()
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Space>
          <div>
            <MenuFoldOutlined />
          </div>
          <Breadcrumb
            items={[
              {
                title: '首页'
              }
              // {
              //   title: <a href="">Application Center</a>,
              // },
              // {
              //   title: <a href="">Application List</a>,
              // },
              // {
              //   title: "An Application",
              // },
            ]}
          />
        </Space>
      </div>
      <div className={styles.right}>
        <Switch checkedChildren='夜间' unCheckedChildren='日常' style={{ marginRight: 20 }} />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{name}</span>
        </Dropdown>
      </div>
    </div>
  )
}
export default memo(NavHeader)
