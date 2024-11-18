import { Spin } from 'antd'

interface Iprops {
  tip?: string
  size?: 'large' | 'small' | 'default'
}
export default function Loading({ tip = 'loading', size = 'large' }: Iprops) {
  return (
    <Spin tip={tip} size={size} className='request-loading'>
      <p></p>
    </Spin>
  )
}
