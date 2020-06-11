import React, { FC, useState } from 'react';
import { Form, Input, Button, Space, Alert } from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AiOutlineMail } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { IAccountFormProps } from './account-form.interface';
import { makeRequest, HTTPMethod } from '../lib/utils/request';

export const RegisterForm: FC<IAccountFormProps> = (props) => {

    const history = useHistory();
    const [ visible, setVisible ] = useState(false);

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
        } else {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 2000)
        }
    }

    return (
        <>
        <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Space direction='vertical'>
            <Form.Item
                name="name"
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
        {visible && <Alert message='Registration failed. Try again' type='error' showIcon></Alert>}
        </>
    )
}