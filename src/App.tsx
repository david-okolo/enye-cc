import React, { FC, useState } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/Privateroute';
import { Main } from './components/Main/Main';
import { Navbar } from './components/Navbar/Navbar';
import { Result } from 'antd';
import { useAuth0 } from './react-auth0-spa';
import history from './utils/history';
import { useLazyQuery } from '@apollo/react-hooks';
import { pastSearchQuery } from './utils/graphql/schemas';
import { Loading } from './components/Loading/Loading';
import { Home } from './components/Home/Home';


export const App: FC = () => {

    const [getPastSearches, { data } ] = useLazyQuery(pastSearchQuery);
    
    const [ pastSearchVisible, setPastSearchVisible ] = useState(false);

    const { loading } = useAuth0();

    if (loading) {
      return <Loading/>
    }

    return (
        <Router history={history}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}>
            <Navbar 
                setPastSearchVisible={setPastSearchVisible}
                getPastSearches={getPastSearches}
            />
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <PrivateRoute
                    pastSearches={data ? data.pastSearches : []}
                    setPastSearchVisible={setPastSearchVisible}
                    pastSearchVisible={pastSearchVisible}
                    path='/main' 
                    component={Main}
                    >
                </PrivateRoute>
                {/* <Route path='/account'>
                    <Accounts
                        setIsLoggedIn={setIsLoggedIn}
                    />
                </Route> */}
            </Switch>
            </div>
        </Router>
    )
}