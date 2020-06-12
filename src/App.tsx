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

        fetch(backendUrl+(token ? '/profile' : '/search/all'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.ok && !!token) {
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
            extra={[
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
                    <Link
                        key='login'
                        to={isLoggedIn ? '/' : "/account" }
                    >
                        <Button
                            key='logout'
                            type='link'
                            size="large"
                            shape='circle'
                            icon={isLoggedIn ? <LogoutOutlined/> : <LoginOutlined/>}
                            onClick={() => {
                                if(isLoggedIn) {
                                    localStorage.removeItem('token');
                                    setIsLoggedIn(false)
                                }  else {
                                    
                                }
                                
                            }}
                        >
                            {isLoggedIn ? 'Logout' : 'Login'}
                        </Button>
                    </Link>
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