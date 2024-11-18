import { memo } from 'react'
import type { ReactNode, FC } from 'react'
import styles from './index.module.less'
interface Iprops {
  children?: ReactNode
}
const Welcome: FC<Iprops> = () => {
  return (
    <div className={styles.welcome}>
      <div className='content'>
        <h1>欢迎使用后台管理系统</h1>
        <p className={styles.desc}>
          这是一个基于 React18 + ReactRouter6.0 + AntD5.2 + TypeScript + Vite 的后台管理系统模板。
        </p>
      </div>
      <div className={styles.img} />
    </div>
  )
}
export default memo(Welcome)
