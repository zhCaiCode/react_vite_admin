import { memo } from "react";
import type { ReactNode, FC } from "react";
import styles from "./index.module.less";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Dropdown, MenuProps, Space, Switch } from "antd";
import storage from "@/utils/storage";
interface Iprops {
  children?: ReactNode;
}
const NavHeader: FC<Iprops> = () => {
  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      storage.remove("token");
      location.href = "/login?callback=" + encodeURIComponent(location.href);
    }
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Space>
          <div>
            <MenuFoldOutlined />
          </div>
          <Breadcrumb
            items={[
              {
                title: "首页",
              },
              // {
              //   title: <a href="">Application Center</a>,
              // },
              // {
              //   title: <a href="">Application List</a>,
              // },
              // {
              //   title: "An Application",
              // },
            ]}
          />
        </Space>
      </div>
      <div className={styles.right}>
        <Switch
          checkedChildren="夜间"
          unCheckedChildren="日常"
          style={{ marginRight: 20 }}
        />
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <span className={styles.nickName}>czh</span>
        </Dropdown>
      </div>
    </div>
  );
};
export default memo(NavHeader);
