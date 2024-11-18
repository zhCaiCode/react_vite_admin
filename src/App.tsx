import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ConfigProvider, theme } from "antd";
import "@/assets/styles/index.less";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#409EFF",
          },
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </div>
  );
}

export default App;
