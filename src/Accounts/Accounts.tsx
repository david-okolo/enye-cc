import React, { FC, useState } from "react";
import { Menu, Row, Col, Space } from "antd";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { IAccountsProps } from "./accounts.interface";

export const Accounts: FC<IAccountsProps> = (props) => {

    const { setIsLoggedIn } = props;

    const { path, url } = useRouteMatch();
    const [ selected, setSelected ] = useState<string>('signIn')

    return (
        <Row>
            <Col span={12} offset={6}>
                <Space direction='vertical'>
                <Menu
                    style={{
                        marginBottom: '30px'
                    }}
                    onClick={(item) => {
                        setSelected(item.key)
                    }}
                    mode="horizontal"
                    selectedKeys={[selected]}
                >
                    
                    <Menu.Item
                        key='signUp'
                    >
                        <Link to={`${url}/register`} />
                        Sign Up
                    </Menu.Item>
                    <Menu.Item
                        key='signIn'
                    >
                        <Link to={path} />
                        Sign In
                    </Menu.Item>
                </Menu>

                <Switch>
                    <Route exact path={path}>
                        <LoginForm
                            setIsLoggedIn={setIsLoggedIn}
                            setSelected={setSelected}
                        />
                    </Route>
                    <Route path={`${url}/register`}>
                        <RegisterForm
                            setIsLoggedIn={setIsLoggedIn}
                            setSelected={setSelected}
                        />
                    </Route>
                </Switch>
                </Space>
            </Col>
        </Row>
    )
}