import { getData } from "@/api/home";
import { formatDate, formatNumber } from "@/utils";
import Login from "@/views/login/Login";

import { createBrowserRouter, Outlet, useParams } from "react-router-dom";
// import { Redirect } from "./util";
import Layout from "@/layout";

const App = () => {
  function loadSpin() {
    //  (document.getElementById('loading') as HTMLDivElement)?.style.setProperty('display','flex')
    const num = formatNumber("1231323232");
    console.log(num);
    console.log(formatDate(new Date(), "yyyy-MM-dd"));
    getData({ userName: "", userPwd: "" });
  }
  return (
    <div>
      首页
      <button
        onClick={() => {
          loadSpin();
        }}
      >
        loading
      </button>
    </div>
  );
};

const Goods = () => {
  const params = useParams();
  return <div>商品列表,商品ID：{params.goodsId}</div>;
};
const Order = () => {
  const params = useParams();
  return (
    <>
      <div>订单号：{params.orderId}</div>
      <div>商品列表,商品ID：{params.goodsId}</div>
    </>
  );
};
const Dashboard = () => {
  return (
    <div>
      <h1>首页</h1>
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "goods/:goodsId",
        element: <Goods></Goods>,
      },
      {
        path: "order/:orderId/goods/:goodsId",
        element: <Order />,
      },
    ],
  },
]);

export default router;
