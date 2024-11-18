import { memo } from 'react'
import type { ReactNode, FC } from 'react'
import styles from './index.module.less'
interface Iprops {
  children?: ReactNode
}
const User: FC<Iprops> = () => {
  return (
    <div className={styles.userWrapper}>
      <div className={styles.user}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            <span>用户名</span>
            <span>用户昵称</span>
          </div>
          <div className={styles.userLevel}>
            <span>用户等级</span>
            <span>用户积分</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(User)
