import React, { FC } from 'react';
import { PageHeader, Button } from "antd";
import { useAuth0 } from "../../react-auth0-spa";
import { LoginOutlined, SearchOutlined, LogoutOutlined } from "@ant-design/icons";
import { INavbarProps } from './navbar.interface';

export const Navbar: FC<INavbarProps> = (props) => {

  const { setPastSearchVisible } = props;

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <PageHeader
            title="nearst"
            extra={!isAuthenticated ? [
                    <Button
                      key="login"
                      onClick={() => loginWithRedirect({})}
                      type='link'
                      size="large"
                      icon={<LoginOutlined/>}
                    >Login</Button>
            ] : [
                    <Button
                        key='past-searches'
                        type='primary'
                        size="large"
                        icon={<SearchOutlined/>}
                        onClick={() => {
                          props.getPastSearches({
                            variables: {sub: user.sub}
                          });
                          setPastSearchVisible(true)
                        }}
                    >
                        Past Searches
                    </Button>,
                    <Button
                        key='logout'
                        type='link'
                        size="large"
                        shape='circle'
                        icon={<LogoutOutlined/>}
                        onClick={() => {
                            logout()
                        }}
                    >
                        Logout
                    </Button>
            ]}
            />
  )
}