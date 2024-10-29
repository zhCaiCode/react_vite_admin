import React, { memo } from "react";
import type { ReactNode, FC } from "react";
import styles from "./index.module.less";
import { DownOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Dropdown, MenuProps, Space } from "antd";
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
                title: "Home",
              },
              {
                title: <a href="">Application Center</a>,
              },
              {
                title: <a href="">Application List</a>,
              },
              {
                title: "An Application",
              },
            ]}
          />
        </Space>
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <span>设置</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};
export default memo(NavHeader);
