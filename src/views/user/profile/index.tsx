import { memo } from 'react'
import type { ReactNode, FC } from 'react'
interface Iprops {
  children?: ReactNode
}
const Profile: FC<Iprops> = () => {
  return <div>Profile</div>
}
export default memo(Profile)
