// import { getData } from "@/api/home";
// import { formatDate, formatNumber } from "@/utils";
import Login from '@/views/login/Login'

import { createBrowserRouter, useParams } from 'react-router-dom'
import { Redirect } from './util'
import Layout from '@/layout'
import Welcome from '@/views/welcome'
import Profile from '@/views/user/profile'
import Dashboard from '@/views/dashboard'

// const App = () => {
//   function loadSpin() {
//     //  (document.getElementById('loading') as HTMLDivElement)?.style.setProperty('display','flex')
//     const num = formatNumber("1231323232");
//     console.log(num);
//     console.log(formatDate(new Date(), "yyyy-MM-dd"));
//     getData({ userName: "", userPwd: "" });
//   }
//   return (
//     <div>
//       首页
//       <button
//         onClick={() => {
//           loadSpin();
//         }}
//       >
//         loading
//       </button>
//     </div>
//   );
// };

const Goods = () => {
  const params = useParams()
  return <div>商品列表,商品ID：{params.goodsId}</div>
}
const Order = () => {
  const params = useParams()
  return (
    <>
      <div>订单号：{params.orderId}</div>
      <div>商品列表,商品ID：{params.goodsId}</div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Redirect to='/login' />
  },
  {
    path: '/index',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Welcome />
      }
      // {
      //   path: '/system/user',
      //   element: <User />
      // }
    ]
  },
  {
    path: '/user',
    element: <Layout />,
    children: [
      {
        path: '/user/profile',
        element: <Profile></Profile>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Layout></Layout>,
    children: [
      {
        path: '',
        element: <Dashboard></Dashboard>
      },
      {
        path: 'goods/:goodsId',
        element: <Goods></Goods>
      },
      {
        path: 'order/:orderId/goods/:goodsId',
        element: <Order />
      }
    ]
  }
])

export default router
