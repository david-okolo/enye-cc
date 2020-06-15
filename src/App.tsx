import React, { FC, useState } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/Privateroute';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { Result } from 'antd';
import { useAuth0 } from './react-auth0-spa';
import history from './utils/history';
import { useLazyQuery } from '@apollo/react-hooks';
import { pastSearchQuery } from './utils/graphql/schemas';
import { Loading } from './components/Loading/Loading';


export const App: FC = () => {

    const [getPastSearches, { data } ] = useLazyQuery(pastSearchQuery);
    
    const [ pastSearchVisible, setPastSearchVisible ] = useState(false);

    const { loading } = useAuth0();

    if (loading) {
      return <Loading/>
    }

    return (
        <Router history={history}>
            <Navbar 
                setPastSearchVisible={setPastSearchVisible}
                getPastSearches={getPastSearches}
            />
            <Switch>
                <Route exact path='/'>
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page. Please Login"
                    />
                </Route>
                <PrivateRoute
                    pastSearches={data ? data.pastSearches : []}
                    setPastSearchVisible={setPastSearchVisible}
                    pastSearchVisible={pastSearchVisible}
                    path='/home' 
                    component={Home}
                    >
                </PrivateRoute>
                {/* <Route path='/account'>
                    <Accounts
                        setIsLoggedIn={setIsLoggedIn}
                    />
                </Route> */}
            </Switch>
        </Router>
    )
}