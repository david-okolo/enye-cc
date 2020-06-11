import React, { FC } from 'react';
import { Form, Input, Checkbox, Button, Space } from "antd"
import { LockOutlined } from '@ant-design/icons';
import { AiOutlineMail } from 'react-icons/ai';
import { IAccountFormProps } from './account-form.interface';
import { makeRequest, HTTPMethod } from '../lib/utils/request'
import { useHistory } from 'react-router-dom';

export const LoginForm: FC<IAccountFormProps> = (props) => {

    const { setIsLoggedIn } = props;

    const history = useHistory();

    const onFinish = async (values: any) => {
        const response:any = await makeRequest({
            path: '/auth/login',
            method: HTTPMethod.POST,
            body: {
                username: values.username,
                password: values.password
            },
            auth: false
        });

        if (response.success) {
            localStorage.setItem('token', response.data.token)
            history.push('/');
            setIsLoggedIn(true);
        }
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Space direction='vertical'>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input size='large' prefix={<AiOutlineMail/>} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                size='large'
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
                </Button>
            </Form.Item>
            </Space>
        </Form>
    )
}