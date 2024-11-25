import { memo } from 'react'
import { Descriptions } from 'antd'
import styles from './index.module.less'
const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img className={styles.userImg} src='https://' alt='' />
        <Descriptions title='欢迎新同学'>
          <Descriptions.Item label='用户ID'>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label='邮箱'>1810000000</Descriptions.Item>
          <Descriptions.Item label='状态'>Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label='手机号'>empty</Descriptions.Item>
          <Descriptions.Item label='岗位'>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
          <Descriptions.Item label='部门'>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>10000元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>2000单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>
    </div>
  )
}

export default memo(Dashboard)
