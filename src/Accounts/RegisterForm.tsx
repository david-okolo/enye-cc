import React, { FC } from 'react';
import { Form, Input, Button, Space } from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AiOutlineMail } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { IAccountFormProps } from './account-form.interface';
import { makeRequest, HTTPMethod } from '../lib/utils/request';

export const RegisterForm: FC<IAccountFormProps> = (props) => {

    const history = useHistory();

    const onFinish = async (values: any) => {
        const response:any = await makeRequest({
            path: '/user/register',
            method: HTTPMethod.POST,
            body: {
                name: values.name,
                email: values.username,
                password: values.password
            },
            auth: false
        });

        if (response.success) {
            history.push('/account');
        }
    }

    return (
        <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Space direction='vertical'>
            <Form.Item
                name="fullname"
                rules={[{ required: true, message: 'Please input your full name!' }]}
            >
                <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
            </Form.Item>
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
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Register
                </Button>
            </Form.Item>
            </Space>
        </Form>
    )
}