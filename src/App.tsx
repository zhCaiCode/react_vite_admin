import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import '@/assets/styles/index.less'
import AntdGlobal from './utils/AntdGlobal'
import Boundary from '@/components/errorView'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#409EFF'
          },
          algorithm: theme.defaultAlgorithm
        }}
      >
        <AntdApp>
          <AntdGlobal />
          <Boundary>
            <RouterProvider router={router} />
          </Boundary>
        </AntdApp>
      </ConfigProvider>
    </div>
  )
}

export default App
