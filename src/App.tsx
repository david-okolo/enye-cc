import React, { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { HashRouter, Link, Switch, Route } from 'react-router-dom';
import { PageHeader, Button } from 'antd';
import { LoginOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { Home } from './Home/Home';
import { PastSearch } from './lib/utils/interface';
import { backendUrl } from './lib/utils/constants';
import { Accounts } from './Accounts/Accounts';


export const App: FC = () => {

    const [isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ pastSearches, setPastSearches ]: [
        PastSearch[],
        Dispatch<SetStateAction<PastSearch[]>>
    ] = useState<PastSearch[]>([]);
    
    const [ pastSearchVisible, setPastSearchVisible ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(backendUrl+'/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.ok) {
                setIsLoggedIn(true);
            }
            return response.json()
        }).then((data) => {
            setPastSearches(data.pastSearches);
        }).catch(e => {
            console.log(e)
        });
    }, [isLoggedIn])
    return (
        <HashRouter basename='/'>
            <PageHeader
            title="nearst"
            extra={!isLoggedIn ? [
                <Link
                    key='login'
                    to="/account"
                >
                    <Button
                    type='link'
                    size="large"
                    icon={<LoginOutlined/>}
                    >Login</Button>
                </Link>
            ] : [
                    <Button
                        key='past-searches'
                        type='primary'
                        size="large"
                        icon={<SearchOutlined/>}
                        onClick={() => {
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
                            localStorage.removeItem('token');
                            setIsLoggedIn(false)
                        }}
                    >
                        Logout
                    </Button>
            ]}
            ></PageHeader>
            <Switch>
                <Route exact path='/'>
                    <Home
                        setPastSearches={setPastSearches}
                        setPastSearchVisible={setPastSearchVisible}
                        pastSearchVisible={pastSearchVisible}
                        isLoggedIn={isLoggedIn}
                        pastSearches={pastSearches}
                    />
                </Route>
                <Route path='/account'>
                    <Accounts
                        setIsLoggedIn={setIsLoggedIn}
                    />
                </Route>
            </Switch>
        </HashRouter>
    )
}