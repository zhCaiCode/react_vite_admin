import { App } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'

let message: MessageInstance

export default () => {
  const staticFunction = App.useApp()
  message = staticFunction.message
  return null
}

export { message }
