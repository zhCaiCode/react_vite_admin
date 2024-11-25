import { memo, useState, Suspense, useEffect } from 'react'
import type { ReactNode, FC } from 'react'
import { Layout, theme } from 'antd'
import { Watermark } from 'antd'
import styles from './index.module.less'
import NavHeader from './navHeader'
import Menu from '@/components/Menu'
import { Outlet } from 'react-router-dom'
import { getInfo } from '@/store'
import Boundary from '@/components/errorView'

const { Header, Sider, Content } = Layout
interface Iprops {
  children?: ReactNode
}
const LayoutWrapper: FC<Iprops> = () => {
  const [collapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <Watermark className={styles.watermarkWrapper} content={'czh'}>
      <Layout className={styles.layoutWrapper}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {/* <div className='demo-logo-vertical' /> */}
          <Menu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, height: 50 }}>
            {/* <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      /> */}
            <NavHeader />
          </Header>
          <div style={{ backgroundColor: '#fff', height: '60px' }}></div>
          <Content className={styles.content}>
            <div className={styles.appWrapper}>
              <Suspense fallback={<div>loading...</div>}>
                <Boundary>
                  <Outlet />
                </Boundary>
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}
export default memo(LayoutWrapper)
