import React from "react";
import { App as AntdApp, Button, Checkbox, Form, Input } from "antd";
import styles from "./login.module.scss";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../apis/accountApi";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loginFn, { isLoading }] = useLoginMutation();
    const { message, notification, modal } = AntdApp.useApp();
    const handlerSubmit = async (values: any) => {
        loginFn({
            account: values.username,
            password: values.password
        }).unwrap().then(data => {
            if (data.errorCode == 0) {
                dispatch(login({
                    jwt: data.jwt
                }))
                message.success("login successful")
                navigate("/index")
            } else {
                notification.error({
                    description: data.message,
                    message: 'error'
                });

                form.resetFields();
            }
        })
    };

    const showModal = () => {
        modal.success({
            title: 'Hey',
            content: 'This is just an example, you need to implement it yourself...',
        })
    }

    return (
        <div className={styles.container}>

            <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={handlerSubmit}
                style={{
                    width: "400px",
                    height: "400px",
                    marginTop: "15%",
                    background: "#fff",
                    padding: 50,
                    borderRadius: "6px"
                }}
            >

                <h1 style={{ marginBottom: '30px' }}>React-Better-Admin </h1>

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Account cannot be empty' }]}
                    extra="Test account: admin，password 123456"
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Account" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'password can not be blank' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>{'remember me'}</Checkbox>
                    </Form.Item>

                    <Button type={"link"} className="login-form-forgot" style={{ float: "right" }}
                        onClick={showModal}>
                        {'forget the password'}
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block loading={isLoading}>
                        {'Log in'}
                    </Button>
                    {'or'} <Button type={"link"} onClick={showModal}>{'register'}</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login;