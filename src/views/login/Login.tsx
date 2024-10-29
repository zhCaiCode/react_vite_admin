import React, { memo, useCallback, useEffect, useState } from "react";
import type { ReactNode, FC } from "react";
import {
  LockOutlined,
  UserOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import styles from "./login.module.less";
import { getCodeImg, login } from "@/api/user";
import { setToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
interface Iprops {
  children?: ReactNode;
}
const Login: FC<Iprops> = () => {
  const [codeUrl, setCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uuid, setUuid] = useState("");
  const navigate = useNavigate();
  const getCode = useCallback(async () => {
    const res = await getCodeImg();
    console.log("getCode...", res);
    const { img, uuid } = res;
    if (img) setCodeUrl(`data:image/png;base64,${img}`);
    setUuid(uuid);
    // setCodeUrl(
    //   "data:image/png;base64,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"
    // );
  }, []);
  const onFinish = async (values: { username: string; password: string }) => {
    console.log("finish...", values);
    try {
      setLoading(true);
      const formData = {
        ...values,
        uuid,
      };
      const data = await login(formData);
      console.log(formData, data);
      const { code, msg, token } = data;
      if (code > 0) {
        if (token) setToken(token);
        // 写一份数据到redux
        /* 代码... */
        // 登录成功
        const search = location.search;
        const params = new URLSearchParams(search);
        const href = params.get("callback");
        if (href) {
          setTimeout(() => {
            location.href = href || "/";
          });
        } else {
          navigate("/");
        }
      } else {
        message.error(msg);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getCode();
  }, [getCode]);

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>后台管理系统</div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-start" align="center" gap={10}>
              <Form.Item
                name="code"
                rules={[{ required: true, message: "Please input your Code!" }]}
              >
                <Input prefix={<VerifiedOutlined />} placeholder="Code" />
              </Form.Item>
              <Form.Item>
                <img src={codeUrl} alt="验证码" onClick={getCode} />
              </Form.Item>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default memo(Login);
